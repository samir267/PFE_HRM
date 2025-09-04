Swagger Path :
Le chemin Swagger (http://localhost:4000/api-docs/) 

🚀 **Architecture Kafka** – Gestion de flux de données en temps réel

Kafka, c’est l'un des systèmes de messagerie les plus utilisés pour gérer des flux de données massifs. On va le configurer avec quelques composants clés qui permettent à notre système de fonctionner de manière fluide et performante !

### **Composants principaux :**
1. **Zookeeper** – Le chef d'orchestre 🎵  
   - Il gère la configuration et la synchronisation des brokers Kafka. C'est un peu le directeur de l'orchestre !
   - **Variables essentielles :**
     - `ZOOKEEPER_CLIENT_PORT`: Port de communication
     - `ZOOKEEPER_TICK_TIME`: Durée des ticks pour les maintenances internes

2. **Kafka Broker** – L'acteur principal 🎬  
   - C'est là où la magie opère ! Kafka Broker gère l'envoi et la réception des messages.
   - **Port externe**: 9092, pour communiquer avec l'extérieur.
   - **Port interne**: 19092, pour la communication interne.
   - **Variables clés** :
     - `KAFKA_BROKER_ID`: Identifiant unique du broker
     - `KAFKA_ZOOKEEPER_CONNECT`: Connexion à Zookeeper pour la gestion des configurations
     - **Multiples listeners et mappages de protocoles de sécurité** – sécurité avant tout !

3. **Kafdrop** – Le tableau de bord 🖥️  
   - C'est l'outil de monitoring pour suivre l'activité de nos topics Kafka.
   - Port : 9000, facile d'accès pour surveiller tout ce qui se passe !

---

### **Configuration Docker Compose** – Simplification des services 🛠️

On utilise **Docker Compose** pour configurer et orchestrer nos services Kafka et Zookeeper. Voici un aperçu de notre config :

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"
      - "19092:19092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENERS: INSIDE://kafka:19092,OUTSIDE://localhost:9092
      KAFKA_ADVERTISED_LISTENERS: OUTSIDE://localhost:9092
    depends_on:
      - zookeeper

  kafdrop:
    image: obsidiandynamics/kafdrop:latest
    ports:
      - "9000:9000"
    environment:
      KAFKA_BROKERCONNECT: kafka:9092
```

---

### **Sécurisation et Meilleures Pratiques 🔐**

Ne négligeons pas la sécurité ! Voici quelques mécanismes à intégrer :
- **Authentification SASL** – Pour des échanges sécurisés entre les clients et les brokers.
  - **Mécanismes supportés** : `plain`, `scram-sha-256`, `scram-sha-512`.
- **SSL** – Le chiffrement des communications, pour garder vos données à l’abri.
  - Activation via des variables d'environnement.

**Best practices** :  
- Utilisez des **variables d'environnement** pour une config flexible et sécurisée.
- **Limitez la taille des messages** pour éviter la surcharge.
- Configurez des **timeouts** adaptés pour une gestion optimale des ressources.

# Logger for Express API

This project uses **Winston** for structured logging, ensuring clear and consistent logs for debugging and monitoring.

## 📝 Logging Features
- **Levels**: Supports `info`, `error`, `http`, and more.
- **Formats**: Logs in JSON format for easy parsing.
- **Log Rotation**: Manages log file sizes and rotations.
- **Middleware Integration**: Logs incoming requests automatically.

## 📌 Log Usage
### Import and Use Logger
```ts
import logger from './utils/logger';

logger.info('Server started');
logger.error('An error occurred');
logger.http('HTTP request logged');

# Database Migrations

## Creating Migrations
Run `npm run migration generate <name>` to create a new migration file in `db/migrations/`.
Example: `npm run migration generate user`

## Running Migrations
- `npm run migration up`: Apply all pending migrations.
- `npm run migrate down <name>`: Roll back a specific migration.

## Naming Convention
Files follow `YYYYMMDDHHMM_name.ts` format (e.g., `202503211230_create-users.ts`).
### Locking Mechanism

To prevent concurrent migration runs, a locking mechanism is implemented. When migrations start, a lock is acquired in the `MigrationLock` collection. If another instance tries to run migrations while a lock is held, it will fail with an error.

- **Lock Timeout**: Locks are automatically released after time saved in .env.dev minutes if the migration process crashes or gets stuck.
- **Manual Lock Release**: If needed, you can manually delete the lock document from the `MigrationLock` collection.


# Database Seeding Guide

## Purpose
This tool seeds the MongoDB database with test data for development and testing.
""run a seeding: npm run migration seed seederName
## How to Create and Run a Seeder
1. Add a file in `src/db/seeds/` (e.g., `my-seeder.ts`).
2. Use this template:
 `  import mongoose from 'mongoose';
import { Seeder, SeedDataFactory } from './seeding.utility';
import logger from '../logger';

export default class DevUsersSeeder implements Seeder {
  name = 'dev-users';
  dependencies = [];
  description = 'Seeds initial development users';

  async seed(db: mongoose.Connection): Promise<void> {
    const collection = db.collection('users');
    logger.info('Clearing users collection for dev seeding');
    await collection.deleteMany({});
    const users = Array.from({ length: 5 }, (_, i) => SeedDataFactory.generateUser('dev', i + 1));
    logger.info('Inserting dev users', { count: users.length });
    await collection.insertMany(users);
  }
}`

```
---
## Setting Up Semgrep Token in GitLab CI/CD Pipeline 🛠️

See documentation [More Details](docs/semgrep/README.md)

Vault System Documentation
🚀 Vault Integration – Gestion sécurisée des secrets

Vault est intégré dans src/configs/env.config.ts pour gérer les secrets sensibles (base de données, JWT).

Utilisation
Appel : envConfig est une Promise, donc utilisez await :
typescript


import envConfig from "./configs/env.config";
const config = await envConfig;
console.log(config.database.dbUrl);
Setup Vault : Exécutez ./setup-vault.sh pour configurer Vault localement.
Test
URL : Accédez à http://localhost:8200/ui pour voir les données dans l’interface Vault.
Secrets : Stockés à secret/data/myapp (e.g., db_url, jwt_secret_encrypted).

🚀 Feature Flags

📝 Ajouts 
🛠️ FeatureFlagService : Gère les drapeaux (mémoire/MongoDB) pour activer/désactiver les endpoints.
🔒 featureFlagMiddleware : Protège les endpoints (/api/samples, /health) via drapeaux.
🌐 Endpoints :
GET /api/feature-flags : Liste les drapeaux.
POST /api/feature-flags : Crée/met à jour un drapeau.
GET /api/feature-flags/metrics : Affiche les métriques.
📊 Métriques : Suivi des vérifications (checks, lastChecked).
📋 Ciblage : Restriction via users, tenants, percentage.
🧪 Tester
Activer sample_feature :
curl -X POST http://localhost:5000/api/feature-flags -H "Content-Type: application/json" -d '{"name":"sample_feature","enabled":true,"targeting":{"users":[],"tenants":[],"percentage":100}}'
Attendu : {"message":"Flag sample_feature updated"}
Tester /api/samples :
curl -v http://localhost:5000/api/samples
Attendu : 200 OK, [{...}]
Vérifier les métriques :
curl http://localhost:5000/api/feature-flags/metrics
Attendu : [{"flagName":"sample_feature","checks":3,"lastChecked":"2025-04-17T..."}]
Désactiver :
curl -X POST http://localhost:5000/api/feature-flags -H "Content-Type: application/json" -d '{"name":"sample_feature","enabled":false}'
curl -v http://localhost:5000/api/samples
Attendu : 403, {"message":"Feature sample_feature is disabled"}
🔍 Entrées/Sorties
GET /api/feature-flags
Entrée : Aucune.
Sortie :
200 : [{"name":"sample_feature","enabled":true,"targeting":{"users":[],"tenants":[],"percentage":100}},...]
500 : {"message":"Internal server error"}
POST /api/feature-flags
Entrée :
{
  "name": "sample_feature",
  "enabled": true,
  "targeting": {
    "users": [],
    "tenants": [],
    "percentage": 100
  }
}
Sortie :
200 : {"message":"Flag sample_feature updated"}
400 : {"message":"Invalid request body"}
500 : {"message":"Internal server error"}
GET /api/feature-flags/metrics
Entrée : Aucune.
Sortie :
200 : [{"flagName":"sample_feature","checks":10,"lastChecked":"2025-04-17T..."},...]
500 : {"message":"Internal server error"}