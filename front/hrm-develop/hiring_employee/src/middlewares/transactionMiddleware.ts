import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { MongoServerError } from 'mongodb'
import logger from '../configs/logger.config'

declare module 'express-serve-static-core' {
  interface Request {
    session?: mongoose.ClientSession
  }
}

const transactionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  req.session = session

  res.on('finish', async () => {
    try {
      if (res.statusCode < 400) {
        await session.commitTransaction()
        logger.info('Transaction committed successfully.')
      } else {
        await session.abortTransaction()
        logger.warn(`Transaction aborted due to status ${res.statusCode}`)
      }
    } catch (error) {
      logger.error(`Transaction error: ${String(error)}`)
    } finally {
      session.endSession()
    }
  })

  // Gestion des erreurs MongoDB (E11000 - Duplicate key error)
  res.on('error', (err: unknown) => {
    if (err instanceof MongoServerError && err.code === 11000) {
      logger.warn('Duplicate key error detected', { details: err.keyValue })
      return res.status(409).json({
        message: 'Conflict: Duplicate key error',
        details: err.keyValue, // Renvoie l'email dupliqué dans la réponse
      })
    }

    if (typeof err === 'object' && err !== null) {
      const errorObj = err as { status?: number; message?: string }

      return res.status(errorObj.status ?? 500).json({
        message: errorObj.message ?? 'Internal Server Error',
        error: errorObj,
      })
    }

    return res.status(500).json({
      message: 'Internal Server Error',
      error: String(err),
    })
  })

  next()
}

export default transactionMiddleware
