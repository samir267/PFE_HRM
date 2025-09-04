// import { Request, Response } from 'express';
// import { EmergencyContactService } from '../../service/family-situation/emergency-contact.service';
// import logger from '../../configs/logger.config';
// import { KafkaConnector } from '../../service/kafkaConnector';

// // Get the singleton Kafka instance
// const kafka = KafkaConnector.getInstance();

// export class EmergencyContactController {
//   static async addEmergencyContact(req: Request, res: Response) {
//     try {
//       const { employeeId, ...data } = req.body;
//       const modifiedBy = 'system';
//       logger.info('Ajout d\'un contact d\'urgence : %j', req.body);

//       const result = await EmergencyContactService.addEmergencyContact(employeeId, data, modifiedBy);

//       kafka
//         .produce('family-situation-events', {
//           type: 'EMERGENCY_CONTACT_ADDED',
//           data: { employeeId, ...result },
//         })
//         .catch((error) => logger.error('Erreur Kafka lors de l\'ajout du contact d\'urgence:', error));

//       res.status(201).json({ message: 'Emergency contact added successfully', data: result });
//     } catch (error: any) {
//       logger.error('Erreur lors de l\'ajout du contact d\'urgence:', error);
//       res.status(400).json({ message: error.message });
//     }
//   }

//   static async getEmergencyContact(req: Request, res: Response) {
//     try {
//       const { emergencyContactId } = req.params;
//       logger.info('Récupération du contact d\'urgence avec ID: %s', emergencyContactId);

//       const result = await EmergencyContactService.getEmergencyContact(emergencyContactId);

//       kafka
//         .produce('family-situation-events', {
//           type: 'EMERGENCY_CONTACT_RETRIEVED',
//           data: { emergencyContactId, ...result },
//         })
//         .catch((error) => logger.error('Erreur Kafka lors de la récupération du contact d\'urgence:', error));

//       res.status(200).json({ message: 'Emergency contact retrieved successfully', data: result });
//     } catch (error: any) {
//       logger.error('Erreur lors de la récupération du contact d\'urgence:', error);
//       res.status(400).json({ message: error.message });
//     }
//   }

//   static async getEmergencyContactsByPersonalIdentity(req: Request, res: Response) {
//     try {
//       const { employeeId } = req.params;
//       logger.info('Récupération des contacts d\'urgence pour employeeId: %s', employeeId);

//       const result = await EmergencyContactService.getEmergencyContactsByPersonalIdentity(employeeId);

//       kafka
//         .produce('family-situation-events', {
//           type: 'EMERGENCY_CONTACTS_RETRIEVED',
//           data: { employeeId, count: result.length },
//         })
//         .catch((error) => logger.error('Erreur Kafka lors de la récupération des contacts d\'urgence:', error));

//       res.status(200).json({ message: 'Emergency contacts retrieved successfully', data: result });
//     } catch (error: any) {
//       logger.error('Erreur lors de la récupération des contacts d\'urgence:', error);
//       res.status(400).json({ message: error.message });
//     }
//   }

//   static async updateEmergencyContact(req: Request, res: Response) {
//     try {
//       const { emergencyContactId } = req.params;
//       const data = req.body;
//       const modifiedBy = 'system';
//       logger.info('Mise à jour du contact d\'urgence avec ID: %s, données: %j', emergencyContactId, data);

//       const result = await EmergencyContactService.updateEmergencyContact(emergencyContactId, data, modifiedBy);

//       kafka
//         .produce('family-situation-events', {
//           type: 'EMERGENCY_CONTACT_UPDATED',
//           data: { emergencyContactId, ...result },
//         })
//         .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du contact d\'urgence:', error));

//       res.status(200).json({ message: 'Emergency contact updated successfully', data: result });
//     } catch (error: any) {
//       logger.error('Erreur lors de la mise à jour du contact d\'urgence:', error);
//       res.status(400).json({ message: error.message });
//     }
//   }

//   static async deleteEmergencyContact(req: Request, res: Response) {
//     try {
//       const { emergencyContactId } = req.params;
//       const modifiedBy = 'system';
//       logger.info('Suppression du contact d\'urgence avec ID: %s', emergencyContactId);

//       await EmergencyContactService.deleteEmergencyContact(emergencyContactId, modifiedBy);

//       kafka
//         .produce('family-situation-events', {
//           type: 'EMERGENCY_CONTACT_DELETED',
//           data: { emergencyContactId },
//         })
//         .catch((error) => logger.error('Erreur Kafka lors de la suppression du contact d\'urgence:', error));

//       res.status(200).json({ message: 'Emergency contact deleted successfully' });
//     } catch (error: any) {
//       logger.error('Erreur lors de la suppression du contact d\'urgence:', error);
//       res.status(400).json({ message: error.message });
//     }
//   }
// }