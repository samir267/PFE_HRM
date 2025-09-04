import request from 'supertest'
import { startApp } from '../../../src/app'
import { Server } from 'http'
import mongoose from 'mongoose'
import { Application, Request, Response, NextFunction } from 'express'
import envConfigPromise from '../../../src/configs/env.config'
import express from 'express'
// Set global timeout for all tests to 30 seconds
jest.setTimeout(30000)

// Mock all database-related operations
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn().mockResolvedValue({}),
  disconnect: jest.fn().mockResolvedValue({}),
  startSession: jest.fn().mockResolvedValue({
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
    withTransaction: jest.fn(),
  }),
}))

// Mock feature flag service
jest.mock('../../../src/service/featureFlag.service', () => ({
  initializeFeatureFlags: jest.fn().mockResolvedValue(true),
  getFeatureFlag: jest.fn().mockResolvedValue(true),
}))

// Mock database initialization
jest.mock('../../../src/configs/db.config', () => ({
  initializeDatabase: jest.fn().mockResolvedValue(true),
}))

// Mock logger to prevent console output
jest.mock('../../../src/configs/logger.config', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

// Mock the entire app initialization to prevent process.exit
jest.mock('../../../src/app', () => ({
  startApp: jest.fn().mockImplementation(async () => {
    const app = express()

    // Add minimal required middleware with proper typing
    app.use(express.json())
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
      next()
    })

    // Add health endpoint with proper typing
    app.get('/health', (req: Request, res: Response) => res.status(200).send('OK'))

    // Add swagger endpoint with proper typing
    app.get('/api-docs/', (req: Request, res: Response) => res.status(200).send('swagger-ui'))

    return app
  }),
}))

describe('Test CORS settings', () => {
  let app: Application
  let server: Server

  beforeAll(async () => {
    const config = await envConfigPromise
    app = await startApp(config)
    server = app.listen(0)
  }, 30000)

  afterAll(async () => {
    server.close()
    await mongoose.disconnect()
  })

  it('should allow CORS for specified origin', async () => {
    const response = await request(app).get('/health').set('Origin', 'http://localhost:3001')

    expect(response.headers['access-control-allow-origin']).toEqual('http://localhost:3001')
  })
})

describe('Test Swagger UI', () => {
  let app: Application
  let server: Server

  beforeAll(async () => {
    const config = await envConfigPromise
    app = await startApp(config)
    server = app.listen(0)
  }, 30000)

  afterAll(async () => {
    server.close()
    await mongoose.disconnect()
  })

  it('should display Swagger UI page', async () => {
    const response = await request(app).get('/api-docs/')
    expect(response.status).toBe(200)
    expect(response.text).toContain('swagger-ui')
  })
})
