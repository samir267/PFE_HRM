import { Request, Response, NextFunction } from 'express';

// Simple in-memory metrics storage
interface Metrics {
  httpRequestsTotal: { [key: string]: number };
  httpRequestDuration: { [key: string]: number[] };
  activeConnections: number;
  startTime: number;
}

const metrics: Metrics = {
  httpRequestsTotal: {},
  httpRequestDuration: {},
  activeConnections: 0,
  startTime: Date.now()
};

// Helper function to create metric key
const createMetricKey = (method: string, route: string, status: string) => 
  `${method}_${route}_${status}`;

// Helper function to create duration key
const createDurationKey = (method: string, route: string) => 
  `${method}_${route}`;

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Increment active connections
  metrics.activeConnections++;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Record request metrics
    const metricKey = createMetricKey(req.method, req.route?.path || req.path || 'unknown', res.statusCode.toString());
    metrics.httpRequestsTotal[metricKey] = (metrics.httpRequestsTotal[metricKey] || 0) + 1;
    
    // Record response time
    const durationKey = createDurationKey(req.method, req.route?.path || req.path || 'unknown');
    if (!metrics.httpRequestDuration[durationKey]) {
      metrics.httpRequestDuration[durationKey] = [];
    }
    metrics.httpRequestDuration[durationKey].push(duration);
    
    // Keep only last 1000 measurements to prevent memory issues
    if (metrics.httpRequestDuration[durationKey].length > 1000) {
      metrics.httpRequestDuration[durationKey] = metrics.httpRequestDuration[durationKey].slice(-1000);
    }
    
    // Decrement active connections
    metrics.activeConnections--;
  });
  
  next();
};

export const recordPersonalDataOperation = (operation: string, status: 'success' | 'error') => {
  const key = `personal_data_${operation}_${status}`;
  metrics.httpRequestsTotal[key] = (metrics.httpRequestsTotal[key] || 0) + 1;
};

export const getMetrics = () => {
  const uptime = Date.now() - metrics.startTime;
  const memoryUsage = process.memoryUsage();
  
  let metricsText = '';
  
  // Add basic metrics
  metricsText += `# HELP nodejs_uptime_seconds Node.js uptime in seconds\n`;
  metricsText += `# TYPE nodejs_uptime_seconds gauge\n`;
  metricsText += `nodejs_uptime_seconds ${uptime / 1000}\n\n`;
  
  // Add memory metrics
  metricsText += `# HELP nodejs_memory_usage_bytes Node.js memory usage in bytes\n`;
  metricsText += `# TYPE nodejs_memory_usage_bytes gauge\n`;
  metricsText += `nodejs_memory_usage_bytes{type="rss"} ${memoryUsage.rss}\n`;
  metricsText += `nodejs_memory_usage_bytes{type="heapTotal"} ${memoryUsage.heapTotal}\n`;
  metricsText += `nodejs_memory_usage_bytes{type="heapUsed"} ${memoryUsage.heapUsed}\n`;
  metricsText += `nodejs_memory_usage_bytes{type="external"} ${memoryUsage.external}\n\n`;
  
  // Add HTTP request metrics
  metricsText += `# HELP http_requests_total Total number of HTTP requests\n`;
  metricsText += `# TYPE http_requests_total counter\n`;
  Object.entries(metrics.httpRequestsTotal).forEach(([key, value]) => {
    const [method, route, status] = key.split('_', 3);
    metricsText += `http_requests_total{method="${method}",route="${route}",status="${status}"} ${value}\n`;
  });
  metricsText += '\n';
  
  // Add active connections
  metricsText += `# HELP active_connections Number of active connections\n`;
  metricsText += `# TYPE active_connections gauge\n`;
  metricsText += `active_connections ${metrics.activeConnections}\n\n`;
  
  // Add response time metrics (average)
  metricsText += `# HELP http_request_duration_seconds HTTP request duration in seconds\n`;
  metricsText += `# TYPE http_request_duration_seconds gauge\n`;
  Object.entries(metrics.httpRequestDuration).forEach(([key, durations]) => {
    if (durations.length > 0) {
      const [method, route] = key.split('_', 2);
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      metricsText += `http_request_duration_seconds{method="${method}",route="${route}"} ${avgDuration / 1000}\n`;
    }
  });
  
  return metricsText;
};

export const getHealth = () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: (Date.now() - metrics.startTime) / 1000,
    version: process.env.npm_package_version || '1.0.0',
    memory: process.memoryUsage(),
    pid: process.pid,
    activeConnections: metrics.activeConnections
  };
};
