import { Request, Response } from 'express';
import { MaritalStatusService } from '../../service/family-situation/marital-status.service';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class MaritalStatusController {
  static async registerMaritalStatus(req: Request, res: Response) {
    try {
      const { employeeId, ...data } = req.body;
      const modifiedBy = 'system';
      logger.info('Enregistrement du statut marital : %j', req.body);

      const result = await MaritalStatusService.registerMaritalStatus(employeeId, data, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'MARITAL_STATUS_REGISTERED',
          data: { employeeId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de l\'enregistrement du statut marital:', error));

      res.status(201).json({ message: 'Marital status registered successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de l\'enregistrement du statut marital:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      logger.info('Récupération du statut marital avec ID: %s', maritalStatusId);

      const result = await MaritalStatusService.getMaritalStatus(maritalStatusId);

      kafka
        .produce('family-situation-events', {
          type: 'MARITAL_STATUS_RETRIEVED',
          data: { maritalStatusId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération du statut marital:', error));

      res.status(200).json({ message: 'Marital status retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération du statut marital:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getMaritalStatusesByPersonalIdentity(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      logger.info('Récupération des statuts matrimoniaux pour employeeId: %s', employeeId);

      const result = await MaritalStatusService.getMaritalStatusesByPersonalIdentity(employeeId);

      kafka
        .produce('family-situation-events', {
          type: 'MARITAL_STATUSES_RETRIEVED',
          data: { employeeId, count: result.length },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération des statuts matrimoniaux:', error));

      res.status(200).json({ message: 'Marital statuses retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des statuts matrimoniaux:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async updateMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour du statut marital avec ID: %s, données: %j', maritalStatusId, data);

      const result = await MaritalStatusService.updateMaritalStatus(maritalStatusId, data, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'MARITAL_STATUS_UPDATED',
          data: { maritalStatusId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du statut marital:', error));

      res.status(200).json({ message: 'Marital status updated successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la mise à jour du statut marital:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      const modifiedBy = 'system';
      logger.info('Suppression du statut marital avec ID: %s', maritalStatusId);

      await MaritalStatusService.deleteMaritalStatus(maritalStatusId, modifiedBy);

      kafka
        .produce('family-situation-events', {
          type: 'MARITAL_STATUS_DELETED',
          data: { maritalStatusId },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du statut marital:', error));

      res.status(200).json({ message: 'Marital status deleted successfully' });
    } catch (error: any) {
      logger.error('Erreur lors de la suppression du statut marital:', error);
      res.status(400).json({ message: error.message });
    }
  }
}