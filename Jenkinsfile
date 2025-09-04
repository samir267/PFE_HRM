pipeline {
    agent any

    environment {
        IMAGE_NAME = 'personal-data'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'personal-data'
        MONGO_CONTAINER = 'mongo'
        DOCKER_NETWORK = 'msrv-net'
        APP_PORT = '4000'
        HOST_PORT = '4000'
        DB_NAME = 'personaldata'
        JWT_SECRET = 'devsecret'
        DB_USER = 'dev'
        DB_PASSWORD = 'dev'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                powershell '''
                docker version
                docker build -t "$($env:IMAGE_NAME):$($env:IMAGE_TAG)" personal-data
                '''
            }
        }

        stage('Test') {
            steps {
                powershell '''
                $ErrorActionPreference = 'Continue'
                $testName = "personal-data-test"
                $testMongo = "mongo-test"
                $specPath = 'tests/unit/src/peronalData/FamilySituation.service.spec.ts'

                if (-not (docker network ls --format '{{.Name}}' | Select-String -SimpleMatch $env:DOCKER_NETWORK)) {
                  docker network create $env:DOCKER_NETWORK | Out-Null
                }

                docker rm -f $testName 2>$null | Out-Null
                docker rm -f $testMongo 2>$null | Out-Null

                docker run -d --name $testMongo --network $env:DOCKER_NETWORK -p 27018:27017 mongo:6 | Out-Null

                Write-Host "[Test] Waiting for test MongoDB to be ready..."
                $maxWait = 120
                $ready = $false
                for ($i = 0; $i -lt $maxWait; $i++) {
                  $logs = docker logs $testMongo 2>&1 | Out-String
                  if ($logs -match 'Waiting for connections') { $ready = $true; break }
                  Start-Sleep -Seconds 1
                }
                if (-not $ready) {
                  Write-Host "[Test][Error] Test MongoDB did not become ready. Logs:"
                  (docker logs --tail 200 $testMongo 2>&1 | Out-String) | Write-Host
                  docker rm -f $testMongo 2>$null | Out-Null
                  exit 1
                }

                # Use literal host name to avoid interpolation issues
                $dbUrlLiteral = 'mongodb://mongo-test:27017/test_db'
                docker run --rm --init --name $testName --network $env:DOCKER_NETWORK -e CI=true -e DATABASE_BASE_URL="$dbUrlLiteral" `
                  "$($env:IMAGE_NAME):$($env:IMAGE_TAG)" npm test -- --runInBand "$specPath"
                $code = $LASTEXITCODE

                docker rm -f $testMongo 2>$null | Out-Null

                if ($code -ne 0) { exit $code }
                '''
            }
        }

        stage('Deploy to Docker Desktop') {
            steps {
                powershell '''
                Write-Host "[Deploy] Preparing Docker network and containers..."

                if (-not (docker network ls --format '{{.Name}}' | Select-String -SimpleMatch $env:DOCKER_NETWORK)) {
                  docker network create $env:DOCKER_NETWORK | Out-Null
                }

                docker rm -f $env:CONTAINER_NAME 2>$null | Out-Null
                docker rm -f $env:MONGO_CONTAINER 2>$null | Out-Null

                if (-not (docker volume ls --format '{{.Name}}' | Select-String -SimpleMatch 'mongo_data')) {
                  docker volume create mongo_data | Out-Null
                }

                Write-Host "[Deploy] Starting MongoDB..."
                docker run -d --name $env:MONGO_CONTAINER --network $env:DOCKER_NETWORK -p 27017:27017 -v mongo_data:/data/db mongo:6 | Out-Null

                Write-Host "[Deploy] Waiting for MongoDB to be ready..."
                $maxWait = 120
                $ready = $false
                for ($i = 0; $i -lt $maxWait; $i++) {
                  $logs = docker logs $env:MONGO_CONTAINER 2>&1 | Out-String
                  if ($logs -match 'Waiting for connections') { $ready = $true; break }
                  Start-Sleep -Seconds 1
                }
                if (-not $ready) {
                  Write-Host "[Deploy][Error] MongoDB did not become ready in time. Showing last logs:"
                  (docker logs --tail 200 $env:MONGO_CONTAINER 2>&1 | Out-String) | Write-Host
                  throw "MongoDB not ready"
                }

                Write-Host "[Deploy] Starting backend container..."
                docker run -d --name $env:CONTAINER_NAME --network $env:DOCKER_NETWORK -p "$($env:HOST_PORT):$($env:APP_PORT)" `
                  -e NODE_ENV=dev `
                  -e DATABASE_BASE_URL="mongodb://$($env:MONGO_CONTAINER):27017/" `
                  -e DB_NAME=$env:DB_NAME `
                  -e DB_USER=$env:DB_USER `
                  -e DB_PASSWORD=$env:DB_PASSWORD `
                  -e JWT_SECRET=$env:JWT_SECRET `
                  "$($env:IMAGE_NAME):$($env:IMAGE_TAG)" | Out-Null

                Write-Host "[Deploy] Backend started. Showing first logs:"
                Start-Sleep -Seconds 2
                (docker logs --tail 100 $env:CONTAINER_NAME 2>&1 | Out-String) | Write-Host
                '''
            }
        }

        stage('Start Monitoring') {
            steps {
                powershell '''
                Write-Host "[Monitoring] Starting monitoring stack..."

                # Stop any existing monitoring containers
                docker stop prometheus grafana node-exporter 2>$null | Out-Null
                docker rm prometheus grafana node-exporter 2>$null | Out-Null

                # Create monitoring network
                if (-not (docker network ls --format '{{.Name}}' | Select-String -SimpleMatch 'monitoring-net')) {
                  docker network create monitoring-net | Out-Null
                }

                # Connect personal-data and mongo to monitoring network
                docker network connect monitoring-net $env:CONTAINER_NAME 2>$null | Out-Null
                docker network connect monitoring-net $env:MONGO_CONTAINER 2>$null | Out-Null

                # Start monitoring stack
                cd monitoring
                docker-compose -f docker-compose.monitoring.yml up -d | Out-Null

                # Wait for services to be ready
                Write-Host "[Monitoring] Waiting for services to start..."
                Start-Sleep -Seconds 10

                # Test Prometheus
                $prometheusReady = $false
                for ($i = 0; $i -lt 30; $i++) {
                  try {
                    $response = Invoke-WebRequest -Uri "http://localhost:9090/-/healthy" -TimeoutSec 5 -ErrorAction SilentlyContinue
                    if ($response.StatusCode -eq 200) { $prometheusReady = $true; break }
                  } catch {}
                  Start-Sleep -Seconds 2
                }

                if ($prometheusReady) {
                  Write-Host "[Monitoring] ✅ Prometheus is ready"
                } else {
                  Write-Host "[Monitoring] ⚠️ Prometheus may not be ready yet"
                }

                Write-Host "[Monitoring] Monitoring stack started!"
                Write-Host "[Monitoring] Grafana: http://localhost:3000 (admin/admin123)"
                Write-Host "[Monitoring] Prometheus: http://localhost:9090"
                Write-Host "[Monitoring] Node Exporter: http://localhost:9100/metrics"
                Write-Host "[Monitoring] If Grafana shows 'datasource not found', wait 1-2 minutes and refresh"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            powershell '''
            Write-Host "=== Container Status ==="
            (docker ps -a --filter "name=$($env:CONTAINER_NAME)|$($env:MONGO_CONTAINER)" --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}" 2>&1 | Out-String) | Write-Host
            
            Write-Host "=== Monitoring Status ==="
            (docker ps -a --filter "name=prometheus|grafana|node-exporter" --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}" 2>&1 | Out-String) | Write-Host
            '''
        }
    }
}
