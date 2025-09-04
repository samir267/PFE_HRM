import { Request, Response } from 'express';
import { FamilySituationValidationService } from '../../service/family-situation/family-situation-validation';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class FamilySituationValidationController {
  static async validateFamilySituation(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      logger.info('Validation de la situation familiale pour employeeId: %s', employeeId);

      const result = await FamilySituationValidationService.validateFamilySituation(employeeId);

      kafka
        .produce('family-situation-events', {
          type: 'FAMILY_SITUATION_VALIDATED',
          data: { employeeId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la validation de la situation familiale:', error));

      res.status(200).json(result);
    } catch (error: any) {
      logger.error('Erreur lors de la validation de la situation familiale:', error);
      res.status(400).json({ message: error.message });
    }
  }
}