import cors from 'cors'
import helmet from 'helmet'
import express, { Application, Request, Response } from 'express'
import { setupSwagger } from './configs/swagger.config'
import { loggerMiddleware } from './middlewares/loggerMiddleware'
import { KafkaConnector } from './service/kafkaConnector'
import CircuitBreakerService from './service/CircuitBreaker.service'
import { sampleRouter } from './routes/smaple.routes'
import { healthRouter } from './routes/health.routes'
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
import positionRoute from './routes/Affectation/position.routes';
import employeeAssignment from './routes/Affectation/employeeAssignment.routes';
import compensationRoutes from './routes/Affectation/compensation.routes';
import compensationComponentRoutes from './routes/Affectation/compensationComponent.routes';
import workScheduleRoutes from './routes/Affectation/workSchedule.routes';
import employmentContractRoutes from './routes/Affectation/employeeContract.routes';
import CareerPositionRoutes from './routes/Career&SalaryManagement/CareerPosition.routes';
import performancereviewRoutes from './routes/Career&SalaryManagement/performanceReview.routes';
import kafkaRoutes from './routes/kafkaConsumer/kafka.routes';

import { initTracing } from './utils/tracer/tracer';
import { startKafkaConsumer } from './controllers/kafkaConsumer/kafka.controller'
import SalaryRecordRoutes from './routes/Career&SalaryManagement/SalaryRecord.routes'
import careerDevelopmentRoutes from './routes/Career&SalaryManagement/careerDevelopment.routes'
import skillAssessmentRoutes from './routes/Career&SalaryManagement/skillAssessment.routes'
import benefitCatalogRoutes from './routes/Salaires/benefitCatalog.routes'
import employeeBenefitRoutes from './routes/Salaires/employeeBenefit.routes'
import payrollEntryRoutes from './routes/Salaires/payrollEntry.routes'
import payrollPeriodRoutes from './routes/Salaires/payrollPeriod.routes'
import salaryGradeRoutes from './routes/Salaires/salaryGrade.routes'
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

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(helmet())
    app.use(loggerMiddleware)
    app.use('/api', healthRouter)
    startKafkaConsumer();
    
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
    app.use('/api/feature-flags', featureFlagRoutes)
    app.use('/api/v1/kafka',kafkaRoutes)
    app.use('/api/v1',positionRoute)
    app.use('/api/v1',employeeAssignment)
    app.use('/api/v1',compensationRoutes)
    app.use('/api/v1',compensationComponentRoutes)
    app.use('/api/v1',workScheduleRoutes)
    app.use('/api/v1',employmentContractRoutes)
    app.use('/api/v1',CareerPositionRoutes)
    app.use('/api/v1',SalaryRecordRoutes)
    app.use('/api/v1',performancereviewRoutes)
    app.use('/api/v1',careerDevelopmentRoutes)
    app.use('/api/v1',skillAssessmentRoutes)
    app.use('/api/v1',benefitCatalogRoutes)
    app.use('/api/v1',employeeBenefitRoutes)
    app.use('/api/v1',payrollEntryRoutes)
    app.use('/api/v1',payrollPeriodRoutes)
    app.use('/api/v1',salaryGradeRoutes)
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
