import mongoose from 'mongoose'
import { startApp } from '../../../src/app' // Import the actual app
import connectDB from '../../../src/configs/db.config'
import envConfig from '../../../src/configs/env.config' // Access mocked envConfig
import logger from '../../../src/configs/logger.config'
import { AppConfig } from '../../../src/types/config.type'

// Mock connectDB as a function
const mockedConnectDB = jest.fn(() => Promise.resolve()) // Mock connectDB as a function (alternative)

describe('server.ts', () => {
  let config: AppConfig

  beforeAll(async () => {
    config = await envConfig
  })

  beforeEach(() => {
    // Set up mocks before each test
    config.port = 4500 // Set a default port for testing
  })
  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks()
  })
  it('should log an error on failed DB connection', () => {
    const mockError = new Error('DB connection failed')
    // Mock connectDB to reject with an error (if using option 2)
    mockedConnectDB.mockRejectedValueOnce(mockError)
    return connectDB().catch(() => {
      expect(logger.error).toHaveBeenCalledWith(' Failed to connect to MongoDB:', mockError) // Expect error message in logger.error
    })
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})
