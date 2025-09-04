import { Request, Response } from 'express';
import { BirthInformationService } from '../../service/civil-status/birth-information.service';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class BirthInformationController {
  /**
   * PATCH /birth-information/:personalIdentityId
   * Mettre à jour les informations de naissance pour un personalIdentityId donné.
   */
  static async updateBirthInformation(req: Request, res: Response) {
    try {
      const personalIdentityId = req.params.personalIdentityId;
      const data = req.body.birthInformation;
      const modifiedBy = 'system';
      logger.info('Mise à jour des informations de naissance pour personalIdentityId: %s, données: %j', personalIdentityId, data);

      // Validation géographique (comme dans EmployeeController)
      const cityToCountryMap: Record<string, string> = {
        tunis: 'TUN',
        paris: 'FRA',
        london: 'GBR',
        washington: 'USA',
        ottawa: 'CAN',
        berlin: 'DEU',
        tokyo: 'JPN',
        canberra: 'AUS',
        brasilia: 'BRA',
        beijing: 'CHN',
        moscow: 'RUS',
        newdelhi: 'IND',
        cairo: 'EGY',
        pretoria: 'ZAF',
        rome: 'ITA',
        kaboul: 'AFG',
        tirana: 'ALB',
        alger: 'DZA',
        andorrelavieille: 'AND',
        harare: 'ZWE',
        // Ajouter les autres pays et capitales
      };

      const validCountryCodes = [
        'TUN', 'FRA', 'GBR', 'USA', 'CAN', 'DEU', 'JPN', 'AUS', 'BRA', 'CHN',
        'RUS', 'IND', 'EGY', 'ZAF', 'ITA', 'AFG', 'ALB', 'DZA', 'AND', 'ZWE',
        // Ajouter les autres codes ISO 3166-1 alpha-3
      ];

      if (!data.countryOfBirthCode || !validCountryCodes.includes(data.countryOfBirthCode)) {
        throw new Error(`Invalid countryOfBirthCode: ${data.countryOfBirthCode}`);
      }

      const { placeOfBirth, countryOfBirthCode } = data;
      const normalizedPlaceOfBirth = placeOfBirth.toLowerCase().replace(/\s+/g, '');
      const expectedCountryCode = cityToCountryMap[normalizedPlaceOfBirth];

      if (expectedCountryCode && expectedCountryCode !== countryOfBirthCode) {
        throw new Error(
          `Inconsistent data: ${placeOfBirth} is in ${expectedCountryCode}, but countryOfBirthCode is ${countryOfBirthCode}`
        );
      } else if (!expectedCountryCode) {
        throw new Error(`Unknown placeOfBirth: ${placeOfBirth}`);
      }

      // Mise à jour via le service
      const result = await BirthInformationService.updateBirthInformation(personalIdentityId, data, modifiedBy);

      // Produce Kafka event (éviter le doublon de personalIdentityId)
      kafka
        .produce('personal-data-events', {
          type: 'BIRTH_INFORMATION_UPDATED',
          data: result, // Utiliser uniquement result, qui contient déjà personalIdentityId via le service
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour des informations de naissance:', error));

      res.json({
        message: 'Birth information updated',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la mise à jour des informations de naissance:', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * GET /birth-information/:personalIdentityId
   * Récupérer les informations de naissance pour un personalIdentityId donné.
   */
  static async readBirthInformation(req: Request, res: Response) {
    try {
      const personalIdentityId = req.params.personalIdentityId;
      logger.info('Récupération des informations de naissance pour personalIdentityId: %s', personalIdentityId);

      const result = await BirthInformationService.readBirthInformation(personalIdentityId);

      res.json({
        message: 'Birth information retrieved',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération des informations de naissance:', error);
      res.status(404).json({ message: error.message });
    }
  }
}