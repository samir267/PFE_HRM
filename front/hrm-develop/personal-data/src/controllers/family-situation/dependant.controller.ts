import { Request, Response } from 'express';
import { DependantService } from '../../service/family-situation/dependant.service';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class DependantController {
  static async addDependant(req: Request, res: Response) {
    try {
      const { employeeId, ...data } = req.body;
      const modifiedBy = 'system';
      logger.info('Ajout d\'un dépendant : %j', req.body);

      const result = await DependantService.addDependant(employeeId, data, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_ADDED',
          data: { employeeId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de l\'ajout du dépendant:', error));

      res.status(201).json({ message: 'Dependant added successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de l\'ajout du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      logger.info('Récupération du dépendant avec ID: %s', dependantId);

      const result = await DependantService.getDependant(dependantId);

      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_RETRIEVED',
          data: { dependantId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération du dépendant:', error));

      res.status(200).json({ message: 'Dependant retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors supplied by user de la récupération du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getDependantsByPersonalIdentity(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      logger.info('Récupération des dépendants pour employeeId: %s', employeeId);

      const result = await DependantService.getDependantsByPersonalIdentity(employeeId);

      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANTS_RETRIEVED',
          data: { employeeId, count: result.length },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération des dépendants:', error));

      res.status(200).json({ message: 'Dependants retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des dépendants:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async updateDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour du dépendant avec ID: %s, données: %j', dependantId, data);

      const result = await DependantService.updateDependant(dependantId, data, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_UPDATED',
          data: { dependantId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du dépendant:', error));

      res.status(200).json({ message: 'Dependant updated successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la mise à jour du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      const modifiedBy = 'system';
      logger.info('Suppression du dépendant avec ID: %s', dependantId);

      await DependantService.deleteDependant(dependantId, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_RETRIEVED',
          data: { dependantId },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du dépendant:', error));

      res.status(200).json({ message: 'Dependant deleted successfully' });
    } catch (error: any) {
      logger.error('Erreur lors de la suppression du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }
}