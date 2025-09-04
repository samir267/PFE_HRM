import mongoose from 'mongoose'
import loadConfig from './env.config'
import logger from './logger.config'

const connectDB = async () => {
  try {
    const envConfig = await loadConfig
    const dbUri = envConfig.database.dbUrl + envConfig.database.dbName
    await mongoose.connect(dbUri) // No auth for fresh dev DB
    logger.info('MongoDB connected')
  } catch (error) {
    logger.error('MongoDB connection error:', error)
    throw error // Re-throw to handle in app.ts
  }
}

export default connectDB
