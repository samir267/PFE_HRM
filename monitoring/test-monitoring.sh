#!/bin/bash

echo "🔍 Testing Monitoring Setup..."
echo "================================"

# Test 1: Check if Personal Data app is running
echo "1. Testing Personal Data App..."
if curl -s http://localhost:4000/api/health > /dev/null; then
    echo "✅ Personal Data App is running"
    echo "   Health: $(curl -s http://localhost:4000/api/health | jq -r '.status' 2>/dev/null || echo 'OK')"
else
    echo "❌ Personal Data App is not responding"
fi

# Test 2: Check metrics endpoint
echo ""
echo "2. Testing Metrics Endpoint..."
if curl -s http://localhost:4000/api/metrics > /dev/null; then
    echo "✅ Metrics endpoint is working"
    echo "   Sample metrics:"
    curl -s http://localhost:4000/api/metrics | head -5
else
    echo "❌ Metrics endpoint is not working"
fi

# Test 3: Check Prometheus
echo ""
echo "3. Testing Prometheus..."
if curl -s http://localhost:9090/-/healthy > /dev/null; then
    echo "✅ Prometheus is running"
else
    echo "❌ Prometheus is not responding"
fi

# Test 4: Check Prometheus targets
echo ""
echo "4. Checking Prometheus Targets..."
echo "   Go to: http://localhost:9090/targets"
echo "   Look for 'personal-data-app' target status"

# Test 5: Check Grafana
echo ""
echo "5. Testing Grafana..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Grafana is running"
    echo "   Dashboard: http://localhost:3000 (admin/admin123)"
else
    echo "❌ Grafana is not responding"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Go to Prometheus: http://localhost:9090/targets"
echo "2. Go to Grafana: http://localhost:3000 (admin/admin123)"
echo "3. Check if 'personal-data-app' target is UP in Prometheus"
echo "4. If no data in Grafana, wait 1-2 minutes for metrics to populate"
