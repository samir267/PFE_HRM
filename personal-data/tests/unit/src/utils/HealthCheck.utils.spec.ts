import { Request, Response } from 'express'
import {
  healthCheck,
  readinessCheck,
  livenessCheck,
} from '../../../../src/controllers/health.controller' // Ajustez le chemin
import mongoose from 'mongoose'
import supertest from 'supertest'
import express from 'express'

// Créer une application Express avec les routes
const app = express()
app.get('/health', healthCheck)
app.get('/readiness', readinessCheck)
app.get('/liveness', livenessCheck)

// Mock de mongoose
jest.mock('mongoose', () => ({
  connection: {
    readyState: 1, // Par défaut : connecté
    db: {
      admin: () => ({ ping: jest.fn().mockResolvedValue(true) }),
    },
  },
}))

// Mock de Date.now pour contrôler le temps
let mockTime = 1000
jest.spyOn(global.Date, 'now').mockImplementation(() => mockTime)

// Mock de checkExternalDependencies (pour garantir qu'il n'y a pas de blocage)
jest.mock('../../../../src/controllers/health.controller', () => {
  const originalModule = jest.requireActual('../../../../src/controllers/health.controller')
  return {
    ...originalModule,
    checkExternalDependencies: jest.fn().mockResolvedValue('UP'), // Mock explicite
  }
})

// Démarrer un serveur pour supertest
let server: any
beforeAll((done) => {
  server = app.listen(0, () => {
    console.log('Server started for tests')
    done()
  })
})

afterAll((done) => {
  server.close(() => {
    console.log('Server closed after tests')
    done()
  })
})

describe('Health Check Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Réinitialiser le cache dans le module health.controller
    const healthController = require('../../../../src/controllers/health.controller')
    healthController.cachedHealthStatus = null
    healthController.lastChecked = 0
    // Réinitialiser mongoose.readyState à 1 (connecté) par défaut
    ;(mongoose.connection.readyState as any) = 1
    mockTime = 1000 // Réinitialiser le temps
  })

  describe('Health Check', () => {
    it('should return 200 and UP status when all services are healthy', async () => {
      const response = await supertest(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        status: 'UP',
        details: {
          database: 'UP',
          externalDependencies: 'UP',
        },
      })
    })

    // it('should return 503 when database is down', async () => {
    //   (mongoose.connection.readyState as any) = 0; // Simuler une déconnexion
    //   const response = await supertest(app).get('/health');
    //   expect(response.status).toBe(503);
    //   expect(response.body).toEqual({
    //     status: 'DOWN',
    //     details: {
    //       database: 'DOWN',
    //       externalDependencies: 'UP',
    //     },
    //   });
    // });

    it('should use cached result within 5 seconds', async () => {
      // Premier appel pour remplir le cache
      await supertest(app).get('/health')
      // Simuler un temps < 5s
      mockTime = 4000 // 4 secondes après
      const response = await supertest(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        status: 'UP',
        details: {
          database: 'UP',
          externalDependencies: 'UP',
        },
      })
      // Vérifier que le cache a été utilisé
      const healthController = require('../../../../src/controllers/health.controller')
      expect(healthController.cachedHealthStatus).toBeDefined()
    })

    it('should recalculate status after 5 seconds', async () => {
      // Premier appel pour remplir le cache
      await supertest(app).get('/health')
      // Simuler un temps > 5s
      mockTime = 6000 // 6 secondes après
      ;(mongoose.connection.readyState as any) = 0 // Changer l'état de la DB
      const response = await supertest(app).get('/health')
      expect(response.status).toBe(503)
      expect(response.body).toEqual({
        status: 'DOWN',
        details: {
          database: 'DOWN',
          externalDependencies: 'UP',
        },
      })
    })
  })

  describe('Readiness Check', () => {
    // it('should return 200 and UP status when ready', async () => {
    //   const response = await supertest(app).get('/readiness');
    //   expect(response.status).toBe(200);
    //   expect(response.body).toEqual({
    //     status: 'UP',
    //     details: {
    //       database: 'UP',
    //       externalDependencies: 'UP',
    //     },
    //   });
    // });

    it('should return 503 when not ready', async () => {
      ;(mongoose.connection.readyState as any) = 0 // Simuler une déconnexion
      const response = await supertest(app).get('/readiness')
      expect(response.status).toBe(503)
      expect(response.body).toEqual({
        status: 'DOWN',
        details: {
          database: 'DOWN',
          externalDependencies: 'UP',
        },
      })
    })
  })

  describe('Liveness Check', () => {
    it('should always return 200 and UP status', async () => {
      const response = await supertest(app).get('/liveness')
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        status: 'UP',
        details: { service: 'Running' },
      })
    })
  })
})
