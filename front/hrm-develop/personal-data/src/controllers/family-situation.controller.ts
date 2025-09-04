import { Request, Response } from 'express';
import { FamilySituationService } from '../service/familySituation.service';
import logger from '../configs/logger.config';
import { KafkaConnector } from '../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class FamilySituationController {
  /**
   * Enregistre un statut matrimonial.
   */
  static async registerMaritalStatus(req: Request, res: Response) {
    try {
      const { employeeId, ...data } = req.body;
      const modifiedBy = 'system'; // À adapter selon votre système d'authentification
      logger.info('Enregistrement du statut marital : %j', req.body);

      const result = await FamilySituationService.registerMaritalStatus(employeeId, data, modifiedBy);

      // Produce Kafka event
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

  /**
   * Récupère un statut matrimonial par son identifiant.
   */
  static async getMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      logger.info('Récupération du statut marital avec ID: %s', maritalStatusId);

      const result = await FamilySituationService.getMaritalStatus(maritalStatusId);

      // Produce Kafka event
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

  /**
   * Récupère tous les statuts matrimoniaux pour un employé.
   */
  static async getMaritalStatusesByPersonalIdentity(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      logger.info('Récupération des statuts matrimoniaux pour employeeId: %s', employeeId);

      const result = await FamilySituationService.getMaritalStatusesByPersonalIdentity(employeeId);

      // Produce Kafka event
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

  /**
   * Met à jour un statut matrimonial.
   */
  static async updateMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour du statut marital avec ID: %s, données: %j', maritalStatusId, data);

      const result = await FamilySituationService.updateMaritalStatus(maritalStatusId, data, modifiedBy);

      // Produce Kafka event
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

  /**
   * Supprime un statut matrimonial.
   */
  static async deleteMaritalStatus(req: Request, res: Response) {
    try {
      const { maritalStatusId } = req.params;
      const modifiedBy = 'system';
      logger.info('Suppression du statut marital avec ID: %s', maritalStatusId);

      await FamilySituationService.deleteMaritalStatus(maritalStatusId, modifiedBy);

      // Produce Kafka event
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

  /**
   * Ajoute une personne à charge.
   */
  static async addDependant(req: Request, res: Response) {
    try {
      const { employeeId, ...data } = req.body;
      const modifiedBy = 'system';
      logger.info('Ajout d\'un dépendant : %j', req.body);

      const result = await FamilySituationService.addDependant(employeeId, data, modifiedBy);

      // Produce Kafka event
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

  /**
   * Récupère une personne à charge par son identifiant.
   */
  static async getDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      logger.info('Récupération du dépendant avec ID: %s', dependantId);

      const result = await FamilySituationService.getDependant(dependantId);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_RETRIEVED',
          data: { dependantId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération du dépendant:', error));

      res.status(200).json({ message: 'Dependant retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Récupère toutes les personnes à charge pour un employé.
   */
  static async getDependantsByPersonalIdentity(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      logger.info('Récupération des dépendants pour employeeId: %s', employeeId);

      const result = await FamilySituationService.getDependantsByPersonalIdentity(employeeId);

      // Produce Kafka event
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

  /**
   * Met à jour une personne à charge.
   */
  static async updateDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour du dépendant avec ID: %s, données: %j', dependantId, data);

      const result = await FamilySituationService.updateDependant(dependantId, data, modifiedBy);

      // Produce Kafka event
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

  /**
   * Supprime une personne à charge.
   */
  static async deleteDependant(req: Request, res: Response) {
    try {
      const { dependantId } = req.params;
      const modifiedBy = 'system';
      logger.info('Suppression du dépendant avec ID: %s', dependantId);

      await FamilySituationService.deleteDependant(dependantId, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'DEPENDANT_DELETED',
          data: { dependantId },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du dépendant:', error));

      res.status(200).json({ message: 'Dependant deleted successfully' });
    } catch (error: any) {
      logger.error('Erreur lors de la suppression du dépendant:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Ajoute un contact d'urgence.
   */
  static async addEmergencyContact(req: Request, res: Response) {
    try {
      const { employeeId, ...data } = req.body;
      const modifiedBy = 'system';
      logger.info('Ajout d\'un contact d\'urgence : %j', req.body);

      const result = await FamilySituationService.addEmergencyContact(employeeId, data, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'EMERGENCY_CONTACT_ADDED',
          data: { employeeId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de l\'ajout du contact d\'urgence:', error));

      res.status(201).json({ message: 'Emergency contact added successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de l\'ajout du contact d\'urgence:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Récupère un contact d'urgence par son identifiant.
   */
  static async getEmergencyContact(req: Request, res: Response) {
    try {
      const { emergencyContactId } = req.params;
      logger.info('Récupération du contact d\'urgence avec ID: %s', emergencyContactId);

      const result = await FamilySituationService.getEmergencyContact(emergencyContactId);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'EMERGENCY_CONTACT_RETRIEVED',
          data: { emergencyContactId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération du contact d\'urgence:', error));

      res.status(200).json({ message: 'Emergency contact retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération du contact d\'urgence:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Récupère tous les contacts d'urgence pour un employé.
   */
  static async getEmergencyContactsByPersonalIdentity(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      logger.info('Récupération des contacts d\'urgence pour employeeId: %s', employeeId);

      const result = await FamilySituationService.getEmergencyContactsByPersonalIdentity(employeeId);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'EMERGENCY_CONTACTS_RETRIEVED',
          data: { employeeId, count: result.length },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la récupération des contacts d\'urgence:', error));

      res.status(200).json({ message: 'Emergency contacts retrieved successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des contacts d\'urgence:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Met à jour un contact d'urgence.
   */
  static async updateEmergencyContact(req: Request, res: Response) {
    try {
      const { emergencyContactId } = req.params;
      const data = req.body;
      const modifiedBy = 'system';
      logger.info('Mise à jour du contact d\'urgence avec ID: %s, données: %j', emergencyContactId, data);

      const result = await FamilySituationService.updateEmergencyContact(emergencyContactId, data, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'EMERGENCY_CONTACT_UPDATED',
          data: { emergencyContactId, ...result },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du contact d\'urgence:', error));

      res.status(200).json({ message: 'Emergency contact updated successfully', data: result });
    } catch (error: any) {
      logger.error('Erreur lors de la mise à jour du contact d\'urgence:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Supprime un contact d'urgence.
   */
  static async deleteEmergencyContact(req: Request, res: Response) {
    try {
      const { emergencyContactId } = req.params;
      const modifiedBy = 'system';
      logger.info('Suppression du contact d\'urgence avec ID: %s', emergencyContactId);

      await FamilySituationService.deleteEmergencyContact(emergencyContactId, modifiedBy);

      // Produce Kafka event
      kafka
        .produce('family-situation-events', {
          type: 'EMERGENCY_CONTACT_DELETED',
          data: { emergencyContactId },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du contact d\'urgence:', error));

      res.status(200).json({ message: 'Emergency contact deleted successfully' });
    } catch (error: any) {
      logger.error('Erreur lors de la suppression du contact d\'urgence:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Valide la situation familiale d'un employé.
   */
  static async validateFamilySituation(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      logger.info('Validation de la situation familiale pour employeeId: %s', employeeId);

      const result = await FamilySituationService.validateFamilySituation(employeeId);

      // Produce Kafka event
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