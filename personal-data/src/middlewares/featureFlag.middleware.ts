import { Request, Response, NextFunction } from 'express'
import { featureFlagService } from '../service/featureFlag.service'
import logger from '../configs/logger.config'

export const featureFlagMiddleware = (flagName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id // Assumes auth middleware sets req.user
      const tenantId = (req as any).tenant?.id // Assumes tenant middleware
      const isEnabled = await featureFlagService.getFlag(flagName, userId, tenantId)

      if (!isEnabled) {
        logger.warn(`Feature ${flagName} disabled for user ${userId || 'unknown'}`)
        return res.status(403).json({ message: `Feature ${flagName} is disabled` })
      }

      next()
    } catch (error) {
      logger.error(`Error checking flag ${flagName}: ${error}`)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
