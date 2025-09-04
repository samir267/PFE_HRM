import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace, Tracer, SamplingDecision, SamplingResult } from '@opentelemetry/api';

export const initTracing = (serviceName: string, samplingRate: number = 1.0) => {
  // Resource configuration
  const resource = resourceFromAttributes({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
  });

  // Configure Jaeger exporter
  const exporter = new JaegerExporter({
    endpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
  });

  // Choisir le span processor selon l'environnement
  const spanProcessor =
    process.env.NODE_ENV === 'production'
      ? new BatchSpanProcessor(exporter, { maxQueueSize: 1000, scheduledDelayMillis: 5000 })
      : new SimpleSpanProcessor(exporter);

  // Tracer provider avec sampling et span processor
  const provider = new NodeTracerProvider({
    resource,
    sampler: {
      shouldSample: (): SamplingResult => {
        const shouldSample = Math.random() < samplingRate;
        return {
          decision: shouldSample ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
        };
      },
    },
    spanProcessors: [spanProcessor], // Passer le span processor via le constructeur
  });

  // Register the provider
  provider.register();

  // Register instrumentations
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(), // Auto-traces HTTP requests
      new PgInstrumentation(),   // Auto-traces PostgreSQL queries
      new FetchInstrumentation(), // Auto-traces fetch API calls
    ],
  });

  console.log(`✅ Tracing initialisé pour ${serviceName} avec un taux d'échantillonnage de ${samplingRate}`);
};

// Utility to get the tracer for custom spans
export const getTracer = (): Tracer => trace.getTracer('custom-tracer');


