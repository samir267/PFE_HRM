import { Request, Response } from 'express';
import { PersonalDataService } from '../service/personalDataService';
import logger from '../configs/logger.config';
import { KafkaConnector } from '../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class PersonalDataController {
 // Dans le contrôleur
static async createEmployee(req: Request, res: Response) {
    try {
      logger.info('Données reçues dans le contrôleur : %j', req.body);
        const { personalIdentity, birthInformation, nationalities } = req.body;
        const modifiedBy = 'system';

        const result = await PersonalDataService.createEmployee(
            { personalIdentity, birthInformation, nationalities },
            modifiedBy
        );

        kafka
            .produce('personal-data-events', {
                type: 'EMPLOYEE_CREATED',
                data: result,
            })
            .catch((error) => logger.error('Erreur Kafka lors de la création de l\'employé:', error));

        res.status(201).json({
            message: 'Employee created successfully',
            data: result,
        });
    } catch (error: any) {
        logger.error('Erreur dans le contrôleur : %s', error.message, { stack: error.stack });
        res.status(400).json({ message: error.message });
    }
}
  static async updatePersonalIdentity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour de l\'identité personnelle pour id: %s, données: %j', id, data);

      const result = await PersonalDataService.updatePersonalIdentity(id, data, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('personal-data-events', {
          type: 'PERSONAL_IDENTITY_UPDATED',
          data: { id, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour de l\'identité personnelle:', error));

      res.json({
        message: 'Personal identity updated',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la mise à jour de l\'identité personnelle:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async readPersonalIdentity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      logger.info('Récupération de l\'identité personnelle pour id: %s', id);

      const result = await PersonalDataService.readPersonalIdentity(id);

      res.json({
        message: 'Personal identity retrieved',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération de l\'identité personnelle:', error);
      res.status(404).json({ message: error.message });
    }
  }

  static async readAllPersonalIdentities(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info('Récupération de toutes les identités personnelles, page: %d, limit: %d', page, limit);

      const result = await PersonalDataService.readAllPersonalIdentities(page, limit);

      res.json({
        message: 'Personal identities retrieved',
        data: result.identities,
        pagination: result.pagination,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des identités personnelles:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async readAllPersonalIdentitiesDeleted(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info('Récupération des identités personnelles supprimées, page: %d, limit: %d', page, limit);

      const result = await PersonalDataService.readAllPersonalIdentitiesDeleted(page, limit);

      res.json({
        message: 'Personal identities retrieved',
        data: result.identities,
        pagination: result.pagination,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des identités personnelles supprimées:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deletePersonalIdentity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const modifiedBy = 'system';
      logger.info('Suppression de l\'identité personnelle pour id: %s', id);

      const result = await PersonalDataService.deletePersonalIdentity(id, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('personal-data-events', {
          type: 'PERSONAL_IDENTITY_DELETED',
          data: { id, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression de l\'identité personnelle:', error));

      res.json({
        message: 'Personal identity deleted',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la suppression de l\'identité personnelle:', error);
      res.status(404).json({ message: error.message });
    }
  }
}