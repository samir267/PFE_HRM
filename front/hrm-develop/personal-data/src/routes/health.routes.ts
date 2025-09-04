import express from 'express'
import { healthCheck, readinessCheck, livenessCheck } from '../controllers/health.controller'
import { featureFlagMiddleware } from '../middlewares/featureFlag.middleware'

const router = express.Router()

// Health endpoint
router.get('/health', healthCheck)

// Readiness endpoint
router.get('/health/ready', readinessCheck)

// Liveness endpoint
router.get('/health/live', livenessCheck)

export { router as healthRouter }
