import { Request, Response } from 'express'

import logger from '../configs/logger.config'
import { featureFlagService } from '../service/featureFlag.service'
import { IFeatureFlag } from '../types/featureFlag.type'

export class FeatureFlagController {
  async getFlags(req: Request, res: Response): Promise<void> {
    try {
      const flags = await featureFlagService.getAllFlags();
      res.status(200).json(flags);
    } catch (error) {
      logger.error(`Error fetching flags: ${error}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async setFlag(req: Request, res: Response): Promise<void> {
    try {
      const flag: IFeatureFlag = req.body;
      if (!flag.name) {
        res.status(400).json({ message: 'Flag name is required' }); // Removed return
        return;
      }
      await featureFlagService.setFlag(flag);
      res.status(200).json({ message: `Flag ${flag.name} updated` });
    } catch (error) {
      logger.error(`Error setting flag: ${error}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      const metrics = featureFlagService.getMetrics();
      res.status(200).json(metrics);
    } catch (error) {
      logger.error(`Error fetching metrics: ${error}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const featureFlagController = new FeatureFlagController();