import { Request, Response } from 'express';
import { NationalityService } from '../../service/civil-status/nationality.service';
import { BirthInformationService } from '../../service/civil-status/birth-information.service'; // Importer BirthInformationService
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class NationalityController {



  /**
   * POST /nationalities
   * Créer des nouvelles nationalité.
   */
  static async createNationalities(req: Request, res: Response) {
  try {
    const result = await NationalityService.populateNationalities();
    res.status(200).json({
      success: true,
      message: result.message,
      data: { count: result.count },
    });
  } catch (error) {
    console.error('Erreur lors du remplissage des nationalités:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du remplissage des nationalités',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
}

  
  // /**
  //  * PATCH /nationalities/:personalIdentityId
  //  * Mettre à jour les nationalités pour un personalIdentityId donné.
  //  */
  // static async updateNationalities(req: Request, res: Response) {
  //   try {
  //     const personalIdentityId = req.params.personalIdentityId;
  //     const data = req.body.nationalities; // Liste de nationalités
  //     const modifiedBy = 'system';
  //     logger.info('Mise à jour des nationalités pour personalIdentityId: %s, données: %j', personalIdentityId, data);

  //     // Vérifier que data est bien un tableau
  //     if (!Array.isArray(data)) {
  //       throw new Error('Nationalities must be an array');
  //     }

  //     // Récupérer les informations de naissance pour obtenir le countryOfBirthCode
  //     const birthInfo = await BirthInformationService.readBirthInformation(personalIdentityId);
  //     if (!birthInfo) {
  //       throw new Error('Birth information not found for this personalIdentityId');
  //     }
  //     const countryOfBirthCode = birthInfo.countryOfBirthCode;

  //     // Identifier la nationalité avec "isPrimary": true
  //     const primaryNationality = data.find((n: { isPrimary: boolean }) => n.isPrimary === true);
  //     if (!primaryNationality) {
  //       throw new Error('No primary nationality specified in the updated nationalities');
  //     }

  //     // Vérifier que le countryOfBirthCode correspond au nationalityCountryCode de la nationalité primaire
  //     if (primaryNationality.nationalityCountryCode !== countryOfBirthCode) {
  //       throw new Error(
  //         `Primary nationality (${primaryNationality.nationalityCountryCode}) must match country of birth (${countryOfBirthCode})`
  //       );
  //     }

  //     // Si la validation passe, procéder à la mise à jour des nationalités
  //     const result = await NationalityService.updateNationalities(personalIdentityId, data, modifiedBy);

  //     // Produce Kafka event
  //     kafka
  //       .produce('personal-data-events', {
  //         type: 'NATIONALITIES_UPDATED',
  //         data: { personalIdentityId, nationalities: result },
  //       })
  //       .catch((error) => logger.error('Erreur Kafka lors de la mise à jour des nationalités:', error));

  //     res.json({
  //       message: 'Nationalities updated',
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     logger.error('Erreur lors de la mise à jour des nationalités:', error);
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // /**
  //  * GET /nationalities/:personalIdentityId
  //  * Récupérer les nationalités pour un personalIdentityId donné.
  //  */
  // static async readNationalities(req: Request, res: Response) {
  //   try {
  //     const personalIdentityId = req.params.personalIdentityId;
  //     logger.info('Récupération des nationalités pour personalIdentityId: %s', personalIdentityId);

  //     const result = await NationalityService.readNationalities(personalIdentityId);

  //     res.json({
  //       message: 'Nationalities retrieved',
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     logger.error('Erreur lors de la récupération des nationalités:', error);
  //     res.status(404).json({ message: error.message });
  //   }
  // }
}