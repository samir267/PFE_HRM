import cors from 'cors'
import helmet from 'helmet'
import express, { Application, Request, Response } from 'express'
import { setupSwagger } from './configs/swagger.config'
import { loggerMiddleware } from './middlewares/loggerMiddleware'
import { metricsMiddleware } from './middlewares/metrics.middleware'
import { KafkaConnector } from './service/kafkaConnector'
import CircuitBreakerService from './service/CircuitBreaker.service'
import { sampleRouter } from './routes/smaple.routes'
import { healthRouter } from './routes/health.routes'
import metricsRoutes from './routes/metrics.routes'
import { errorHandler } from './middlewares/errorHandler.middleware'
import logger from './utils/logger'
import userRoutes from './routes/user.routes'
import transactionMiddleware from './middlewares/transactionMiddleware'
import { seedOnStartup } from './utils/db/seeding.utility'
import './utils/db/seeds/dev-users'
import './utils/db/seeds/test-users'
import mongoose from 'mongoose'
import { runMigrations } from './db/migrationConfig'
import connectDB from './configs/db.config'
import { AppConfig } from './types/config.type'
import featureFlagRoutes from './routes/featureFlag.routes'
import { featureFlagService } from './service/featureFlag.service'

import { initTracing } from './utils/tracer/tracer';
import personalDataRoutes from './routes/personalDataRoutes'
import familySituation from './routes/familySituation.routes';
import contact from './routes/contact.routes';
import officialDocumentsRoutes from './routes/documents/officialDocuments.routes'
import attachedDocumentsRoutes from './routes/documents/attachedDocuments.routes'
import medicalConditionRoutes from './routes/MedicalExpenses/medicalCondition.routes'
import equipmentTypeRoutes from './routes/Equipment_Uniform/equipmentType.routes'
import auditLogRoutes from './routes/Equipment_Uniform/auditLog.routes'
import equipmentAssignmentRoutes from './routes/Equipment_Uniform/equipmentAssignment.routes'
import equipmentInventoryRoutes from './routes/Equipment_Uniform/equipmentInventory.routes'
import equipmentMaintenanceRoutes from './routes/Equipment_Uniform/equipmentMaintenance.routes'
import equipmentReturnRoutes from './routes/Equipment_Uniform/equipmentReturn.routes'
import uniformAssignmentRoutes from './routes/Equipment_Uniform/uniformAssignment.routes'
import uniformTypeRoutes from './routes/Equipment_Uniform/uniformType.routes'
import uniformInventoryRoutes from './routes/Equipment_Uniform/uniformInventory.routes'
import uniformReturnRoutes from './routes/Equipment_Uniform/uniformReturn.routes'
import employeeInformationRoutes from './routes/civil-status/employeeInformation.routes'
import memberRoutes from './routes/GymChildCare/member.routes'
import { Vehicle } from './models/Vehicle/Vehicle.model'
import vehicleRoutes from './routes/vehicle/vehicle.routes'
initTracing('msrv-template', 1.0);
// Async function to start the server and initialize everything
export async function startApp(config: unknown): Promise<Application> {
  try {
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid configuration: config must be an object')
    }

    // Type assertion after validation
    const typedConfig = config as AppConfig
    const app: Application = express()

    // Use resolved config values
    const corsOptions = {
      origin: typedConfig.cors.origin || 'http://localhost:3001',
      optionsSuccessStatus: 200,
    }
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(helmet())
    app.use(loggerMiddleware)
    
    // Add metrics middleware before other middleware
    app.use(metricsMiddleware)
    
    app.use('/api', healthRouter)
    app.use('/api', metricsRoutes) // Add metrics routes
    logger.info('Serveur Express initialisé')
    logger.info('Test INFO log')
    logger.error('Test ERROR log')
    logger.http('Test HTTP log')
    logger.info('Test log rotation')
    app.use(transactionMiddleware)

    // Configuration de Swagger
    setupSwagger(app)

    // Ajout des routes
    app.use(sampleRouter)
    app.use('/api/users', userRoutes)
    app.use(transactionMiddleware)
    app.use('/users', userRoutes)
    app.use('/api', personalDataRoutes);
    app.use('/api', familySituation);
    app.use('/api',contact)
    app.use('/api',officialDocumentsRoutes)
    app.use('/api',attachedDocumentsRoutes)
    app.use('/api',medicalConditionRoutes)
    app.use('/api',equipmentTypeRoutes)
    app.use('/api',equipmentInventoryRoutes)
    app.use('/api',equipmentAssignmentRoutes)
    app.use('/api',uniformAssignmentRoutes)
    app.use('/api',equipmentMaintenanceRoutes)
    app.use('/api',equipmentReturnRoutes)
    app.use('/api',auditLogRoutes)
    app.use('/api',uniformTypeRoutes)
    app.use('/api',uniformInventoryRoutes)
    app.use('/api',uniformReturnRoutes)
    app.use('/api',employeeInformationRoutes)
    app.use('/api/member', memberRoutes)
    app.use('/api/',vehicleRoutes)
    app.use('/api/feature-flags', featureFlagRoutes)
    await featureFlagService.initialize()

    // Route pour tester le circuit breaker
    app.get('/', async (req: Request, res: Response) => {
      try {
        const url = typeof req.query.url === 'string' ? req.query.url : 'https://example.com'
        const result = await CircuitBreakerService.fetchData(url)
        res.json(result)
      } catch (error) {
        logger.error('Erreur lors de la récupération des données', { error })
        res.status(500).json({ message: 'Erreur interne du serveur' })
      }
    })

    // Route pour récupérer l'état du circuit breaker
    app.get('/circuit-breaker-state', (req: Request, res: Response) => {
      res.json({ state: CircuitBreakerService.state })
    })

    // Initialisation de Kafka (uniquement hors environnement de test)
    if (typedConfig.env !== 'test') {
      async function startKafka() {
        const kafka = KafkaConnector.getInstance()
        await kafka.connect()
        await kafka.produce('user-events', {
          eventType: 'USER_CREATED',
          data: { userId: '123', email: 'user@example.com' },
        })
        await kafka.consume('notification-events', async (message) => {
          logger.info('Notification reçue:', message)
        })
        process.on('SIGTERM', async () => {
          logger.info('Arrêt détecté, fermeture propre...')
          await kafka.disconnect()
          process.exit(0)
        })
      }
      startKafka().catch(logger.error)
    }

    // Use boolean values directly from resolved config
    const RUN_MIGRATIONS_ON_STARTUP = typedConfig.runMigrationsOnStartup
    const RUN_SEEDING_ON_STARTUP = typedConfig.seedOnStartup

    async function initializeDatabase() {
      let db: mongoose.Connection | undefined

      try {
        if (!RUN_MIGRATIONS_ON_STARTUP && !RUN_SEEDING_ON_STARTUP) {
          logger.info('No database initialization required; migrations and seeding are disabled', {
            RUN_MIGRATIONS_ON_STARTUP,
            RUN_SEEDING_ON_STARTUP,
          })
          return
        }

        logger.info('Initializing database connection')
        await connectDB()
        db = mongoose.connection

        if (RUN_MIGRATIONS_ON_STARTUP) {
          logger.info('Running migrations on startup')
          await runMigrations()
          logger.info('Migrations completed successfully')
        } else {
          logger.info('Skipping migrations on startup', { RUN_MIGRATIONS_ON_STARTUP })
        }

        if (RUN_SEEDING_ON_STARTUP) {
          logger.info('Running seeders on startup')
          await seedOnStartup(db)
          logger.info('Seeding completed successfully')
        } else {
          logger.info('Skipping seeding on startup', { RUN_SEEDING_ON_STARTUP })
        }
      } catch (error) {
        logger.error('Database initialization failed', {
          error:
            error instanceof Error ? { message: error.message, stack: error.stack } : String(error),
        })
        if (db && mongoose.connection.readyState !== 0) {
          logger.info('Closing connection due to error')
          await mongoose.connection.close()
          logger.info('Database connection closed after error')
        }
        throw error
      }
    }

    // Start database initialization and server
    await initializeDatabase()
    app.use(errorHandler)

    return app
  } catch (error) {
    logger.error('🚨 Failed to start server:', error)
    process.exit(1)
  }
}
