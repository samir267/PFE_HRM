# Documentation du traçage avec Jaeger (tracer.md)

Ce document explique comment le traçage distribué est implémenté dans le projet `MSRV-TEMPLATE` en utilisant OpenTelemetry et Jaeger. Le dossier `tracer` contient la configuration principale pour initialiser le traçage.

## 1. Présentation
Jaeger est un outil de traçage distribué qui permet de suivre les requêtes à travers différents services dans une architecture de microservices. Dans ce projet, nous utilisons OpenTelemetry pour générer des traces et les exporter vers Jaeger pour visualisation et analyse.

### Fonctionnement global
1. **Instrumentation** : Les requêtes HTTP, les appels à la base de données, et les opérations personnalisées sont tracées automatiquement ou manuellement.
2. **Exportation** : Les traces sont envoyées à Jaeger via un exportateur (`JaegerExporter`).
3. **Visualisation** : Les traces sont visualisées dans l’interface web de Jaeger pour analyser les performances et diagnostiquer les problèmes.

## 2. Configuration dans le projet

### 2.1. Fichier `tracer.ts`
Le fichier `tracer.ts` (dans le dossier `tracer`) configure le traçage avec OpenTelemetry. Voici les étapes principales :

- **Initialisation** : La fonction `initTracing(serviceName, samplingRate)` configure le traçage pour un service donné.
  - `serviceName` : Nom du service (ex. "my-service").
  - `samplingRate` : Taux d’échantillonnage (par défaut 1.0, soit 100 % des requêtes tracées).
- **Exportateur** : Les traces sont envoyées à Jaeger via l’endpoint `http://localhost:14268/api/traces` (configurable via `JAEGER_ENDPOINT`).
- **Instrumentation automatique** :
  - `HttpInstrumentation` : Trace les requêtes HTTP (ex. Express).
  - `MongoDBInstrumentation` : Trace les requêtes MongoDB (via Mongoose).
  - `FetchInstrumentation` : Trace les appels HTTP avec `fetch`.
- **Spans manuels** : La fonction `getTracer()` permet de créer des spans personnalisés (ex. `health-check`, `get-health-status`).

### 2.2 Fonctionnement du conteneur Docker
sudo docker run -d --name jaeger   -p 16686:16686   -p 14268:14268   jaegertracing/all-in-one:latest

### 2.3. Exemple d’utilisation
Dans `healthController.ts`, les endpoints comme `/health`, `/readiness`, et `/liveness` créent des spans manuels pour suivre les vérifications de santé :

```javascript
export const healthCheck = async (req: Request, res: Response) => {
  return tracer.startActiveSpan('health-check', async (span: Span) => {
    try {
      span.setAttribute('http.method', req.method);
      span.setAttribute('http.url', req.url);
      const status = await getHealthStatus();
      const response = status.status === 'UP' ? 200 : 503;
      res.status(response).json(status);
      span.setAttribute('health.status', status.status);
      span.setAttribute('response.status', response);
      return { status: response, body: status };
    } catch (error: any) {
      span.recordException(error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      const errorResponse = { status: 'DOWN', error: error.message };
      res.status(503).json(errorResponse);
      return { status: 503, body: errorResponse };
    } finally {
      span.end();
    }
  });
};

