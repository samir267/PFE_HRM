import express, { Request, Response } from 'express'
import User from '../models/user.model'
import { withTransaction } from '../service/transactionManager'
import logger from '../configs/logger.config'

const router = express.Router()

// Define an error type for MongoDB errors
interface MongoError extends Error {
  code?: number
  keyValue?: Record<string, unknown>
}

// Route to create a user
router.post('/create-user', async (req: Request, res: Response) => {
  try {
    await withTransaction(async (session) => {
      const { name, email } = req.body
      const user = new User({ name, email })
      await user.save({ session })
    })

    res.status(201).json({ message: 'User successfully created' })
  } catch (error: unknown) {
    if (error instanceof Error && (error as MongoError).code) {
      const mongoError = error as MongoError

      if (mongoError.code === 11000) {
        logger.warn('Duplicate key error detected', { details: mongoError.keyValue })
        return res.status(409).json({
          message: 'Credentials already in use',
        })
      }

      res.status(500).json({ message: mongoError.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
})

// Route to create multiple users
router.post('/create-multiple-users', async (req: Request, res: Response) => {
  try {
    await withTransaction(async (session) => {
      const { users } = req.body
      for (const userData of users) {
        const user = new User(userData)
        await user.save({ session })
      }
    })

    res.status(201).json({ message: 'All users have been created' })
  } catch (error: unknown) {
    if (error instanceof Error && (error as MongoError).code) {
      const mongoError = error as MongoError

      if (mongoError.code === 11000) {
        logger.warn('Duplicate key error detected for multiple users', {
          details: mongoError.keyValue,
        })
        return res.status(409).json({
          message: 'Credentials already in use',
        })
      }

      res.status(500).json({ message: mongoError.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
})

export default router
