import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getTracer } from '../utils/tracer/tracer'; // Importer le tracer

// Initialiser le tracer
const tracer = getTracer();

// Cache health check results
let cachedHealthStatus: any = null;
let lastChecked: number = 0;
const CACHE_DURATION = 5000; // Cache results for 5 seconds

// Check database connection
const checkDatabase = () => {
  const span = tracer.startSpan('checkDatabase');
  try {
    const status = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';
    span.setAttribute('database.status', status);
    span.addEvent('Database check completed');
    return status;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error checking database' });
    throw error;
  } finally {
    span.end();
  }
};

// Check external dependencies (example: an external API)
const checkExternalDependencies = async () => {
  const span = tracer.startSpan('checkExternalDependencies');
  try {
    // Example: Ping an external service
    // const response = await fetch('https://api.example.com/health');
    // const status = response.ok ? 'UP' : 'DOWN';
    const status = 'UP'; // Mocked for now
    span.setAttribute('external.status', status);
    span.addEvent('External dependencies check completed');
    return status;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error checking external dependencies' });
    return 'DOWN';
  } finally {
    span.end();
  }
};

// Generate health status
const getHealthStatus = async () => {
  const span = tracer.startSpan('getHealthStatus');
  try {
    const now = Date.now();
    if (cachedHealthStatus && now - lastChecked < CACHE_DURATION) {
      span.addEvent('Cache hit');
      return cachedHealthStatus;
    }

    span.addEvent('Cache miss, checking status');
    const databaseStatus = checkDatabase();
    const externalDependenciesStatus = await checkExternalDependencies();

    const status = {
      status: databaseStatus === 'UP' && externalDependenciesStatus === 'UP' ? 'UP' : 'DOWN',
      details: {
        database: databaseStatus,
        externalDependencies: externalDependenciesStatus,
      },
    };

    cachedHealthStatus = status;
    lastChecked = now;

    span.setAttribute('health.status', status.status);
    span.addEvent('Health status generated');
    return status;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error generating health status' });
    throw error;
  } finally {
    span.end();
  }
};

// Health endpoint
export const healthCheck = async (req: Request, res: Response) => {
  const span = tracer.startSpan('healthCheck');
  try {
    span.setAttribute('http.method', req.method);
    span.setAttribute('http.url', req.url);
    const status = await getHealthStatus();
    const httpStatus = status.status === 'UP' ? 200 : 503;
    res.status(httpStatus).json(status);
    span.setAttribute('http.status_code', httpStatus);
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error in health check' });
    res.status(500).json({ status: 'ERROR', details: { error: (error as Error).message } });
  } finally {
    span.end();
  }
};

// Readiness endpoint
export const readinessCheck = async (req: Request, res: Response) => {
  const span = tracer.startSpan('readinessCheck');
  try {
    span.setAttribute('http.method', req.method);
    span.setAttribute('http.url', req.url);
    const status = await getHealthStatus();
    const httpStatus = status.status === 'UP' ? 200 : 503;
    res.status(httpStatus).json(status);
    span.setAttribute('http.status_code', httpStatus);
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error in readiness check' });
    res.status(500).json({ status: 'ERROR', details: { error: (error as Error).message } });
  } finally {
    span.end();
  }
};

// Liveness endpoint
export const livenessCheck = async (req: Request, res: Response) => {
  const span = tracer.startSpan('livenessCheck');
  try {
    span.setAttribute('http.method', req.method);
    span.setAttribute('http.url', req.url);
    const status = { status: 'UP', details: { service: 'Running' } };
    res.status(200).json(status);
    span.setAttribute('http.status_code', 200);
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ code: 2, message: 'Error in liveness check' });
    res.status(500).json({ status: 'ERROR', details: { error: (error as Error).message } });
  } finally {
    span.end();
  }
};