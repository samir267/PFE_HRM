# Monitoring Stack for Personal Data App

This folder contains the monitoring infrastructure for the Personal Data application using Prometheus, Grafana, and Node Exporter.

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Grafana   │    │ Prometheus  │    │Node Exporter│
│   Port 3000 │    │  Port 9090  │    │  Port 9100  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌─────────────┐
                    │Personal Data│
                    │  Port 4000  │
                    └─────────────┘
```

## Quick Start

### 1. Start the Monitoring Stack

```bash
cd monitoring
docker-compose -f docker-compose.monitoring.yml up -d
```

### 2. Access Services

- **Grafana Dashboard**: http://localhost:3000
  - Username: `admin`
  - Password: `admin123`
- **Prometheus**: http://localhost:9090
- **Node Exporter**: http://localhost:9100/metrics

### 3. Import Dashboard

The dashboard is automatically loaded. If you need to import manually:
1. Go to Grafana → Dashboards → Import
2. Copy the content of `grafana/dashboards/app-health-dashboard.json`
3. Click "Load" and then "Import"

## Dashboard Panels

The **Personal Data App Health Dashboard** includes:

### Application Metrics
- **Request Rate**: HTTP requests per second
- **Response Time**: 95th percentile response time
- **Error Rate**: 5xx errors per second
- **Memory Usage**: Application memory consumption

### System Metrics
- **CPU Usage**: System CPU utilization
- **Available Memory**: System memory availability

## Configuration

### Prometheus (`prometheus/prometheus.yml`)

Scrapes metrics from:
- Personal Data App (port 4000)
- MongoDB (port 27017)
- Node Exporter (port 9100)
- Jenkins (port 8080)

### Grafana

- **Datasource**: Automatically configured to connect to Prometheus
- **Dashboards**: Auto-loaded from `grafana/dashboards/`
- **Provisioning**: Automatic setup from `grafana/provisioning/`

## Health Check Endpoints

Your Personal Data app should expose these endpoints:

### 1. Health Check
```typescript
// Add to your app.ts or routes
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});
```

### 2. Metrics Endpoint (for Prometheus)
```typescript
// Install prom-client: npm install prom-client
import { register, collectDefaultMetrics } from 'prom-client';

// Collect default metrics
collectDefaultMetrics();

// Add metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Integration with Jenkins Pipeline

Add this stage to your Jenkinsfile to start monitoring:

```groovy
stage('Start Monitoring') {
  steps {
    powershell '''
      cd monitoring
      docker-compose -f docker-compose.monitoring.yml up -d
      Write-Host "Monitoring stack started"
      Write-Host "Grafana: http://localhost:3000 (admin/admin123)"
      Write-Host "Prometheus: http://localhost:9090"
    '''
  }
}
```

## Custom Metrics

### Business Metrics
```typescript
import { Counter, Histogram, Gauge } from 'prom-client';

// Request counter
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Response time histogram
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route']
});

// Active connections gauge
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});
```

### Usage in Routes
```typescript
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
    
    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path
    }, duration);
  });
  
  next();
});
```

## Troubleshooting

### Common Issues

1. **Prometheus can't scrape metrics**
   - Check if your app exposes `/metrics` endpoint
   - Verify network connectivity between containers
   - Check Prometheus targets page: http://localhost:9090/targets

2. **Grafana shows "No data"**
   - Verify Prometheus datasource is working
   - Check if metrics are being collected
   - Review Prometheus query syntax

3. **Port conflicts**
   - Change ports in `docker-compose.monitoring.yml`
   - Update Prometheus targets accordingly

### Logs
```bash
# View Prometheus logs
docker logs prometheus

# View Grafana logs
docker logs grafana

# View Node Exporter logs
docker logs node-exporter
```

## Scaling

### Multiple App Instances
Update Prometheus config to scrape multiple targets:

```yaml
- job_name: 'personal-data-app'
  static_configs:
    - targets: 
      - 'personal-data-1:4000'
      - 'personal-data-2:4000'
      - 'personal-data-3:4000'
```

### High Availability
- Use external Prometheus storage (e.g., Thanos)
- Set up Grafana clustering
- Use load balancers for multiple instances

## Security

### Default Credentials
- **Grafana**: admin/admin123 (change in production)
- **Prometheus**: No authentication by default

### Production Recommendations
- Use environment variables for sensitive data
- Enable authentication for Prometheus
- Use reverse proxy with SSL
- Restrict network access to monitoring ports

## Maintenance

### Backup
```bash
# Backup Grafana dashboards
docker cp grafana:/var/lib/grafana/dashboards ./backup/

# Backup Prometheus data
docker cp prometheus:/prometheus ./backup/
```

### Updates
```bash
# Update monitoring stack
docker-compose -f docker-compose.monitoring.yml pull
docker-compose -f docker-compose.monitoring.yml up -d
```

## Support

For issues or questions:
1. Check container logs
2. Verify network connectivity
3. Review Prometheus targets status
4. Check Grafana datasource configuration
