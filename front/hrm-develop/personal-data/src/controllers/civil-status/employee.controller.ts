import { Request, Response } from 'express';
import { PersonalIdentityService } from '../../service/civil-status/personal-data.service';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';
import { NationalityModel } from '../../models/civilStatus/nationality.model';
import { Types } from 'mongoose';

const kafka = KafkaConnector.getInstance();

export class EmployeeController {
  static async createEmployee(req: Request, res: Response) {
    try {
      logger.info('Données reçues dans le contrôleur : %j', req.body);
     const { personalIdentity, birthInformation, nationalities } = req.body as {
  personalIdentity: {
    title: 'MR' | 'MME' | 'MLLE' | 'DR' | 'PR';
    lastName: string;
    firstName: string;
    middleName?: string;
    suffix?: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    isActive?: boolean;
    identityDocuments?: {
      nationalIdCard?: {
        number: string;
        placeOfIssue: string;
        dateOfIssue: Date;
      };
      passport?: {
        number: string;
        placeOfIssue: string;
        dateOfIssue: Date;
      };
    };
  };
  birthInformation: {
    placeOfBirth: string;
    countryOfBirthCode: string;
    dateOfBirth: string;
  };
  nationalities: Array<{
    nationalityId: string;
    isPrimary?: boolean;
    isResident?: boolean;
  }>;
};


      const modifiedBy = 'system';

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
      };

      const validCountryCodes = [
        'TUN', 'FRA', 'GBR', 'USA', 'CAN', 'DEU', 'JPN', 'AUS', 'BRA', 'CHN',
        'RUS', 'IND', 'EGY', 'ZAF', 'ITA', 'AFG', 'ALB', 'DZA', 'AND', 'ZWE',
      ];

      // Validate nationalityId and resolve to countryCode for validation
      const resolvedNationalities = await Promise.all(
        nationalities.map(async (nationality) => {
          if (!Types.ObjectId.isValid(nationality.nationalityId)) {
            throw new Error(`Invalid ObjectId for nationalityId: ${nationality.nationalityId}`);
          }
          const nationalityDoc = await NationalityModel.findById(nationality.nationalityId)
            .populate('nationalityCountryCode')
            .exec();
          if (!nationalityDoc) {
            throw new Error(`Nationality not found for ID: ${nationality.nationalityId}`);
          }
          const countryCode = (nationalityDoc.nationalityCountryCode as any)?.countryCode;
          if (!countryCode) {
            throw new Error(`Country code not found for nationality ID: ${nationality.nationalityId}`);
          }
          return {
            nationalityId: nationality.nationalityId, // Retain nationalityId
            isPrimary: nationality.isPrimary,
            isResident: nationality.isResident,
            countryCode, // For validation only
          };
        })
      );

      const countryCodes = [
        birthInformation.countryOfBirthCode,
        ...resolvedNationalities.map(n => n.countryCode),
      ];

      // Validate countryOfBirthCode
      if (!validCountryCodes.includes(birthInformation.countryOfBirthCode)) {
        throw new Error(`Invalid countryOfBirthCode: ${birthInformation.countryOfBirthCode}`);
      }

      // Validate placeOfBirth
      const normalizedPlaceOfBirth = birthInformation.placeOfBirth.toLowerCase().replace(/\s+/g, '');
      const expectedCountryCode = cityToCountryMap[normalizedPlaceOfBirth];

      if (expectedCountryCode && expectedCountryCode !== birthInformation.countryOfBirthCode) {
        throw new Error(
          `Inconsistent data: ${birthInformation.placeOfBirth} is in ${expectedCountryCode}, but countryOfBirthCode is ${birthInformation.countryOfBirthCode}`
        );
      } else if (!expectedCountryCode) {
        throw new Error(`Unknown placeOfBirth: ${birthInformation.placeOfBirth}`);
      }

      // Validate primary nationality
      const primaryNationality = resolvedNationalities.find(n => n.isPrimary === true);
      if (!primaryNationality) {
        throw new Error('No primary nationality specified');
      }

      if (!validCountryCodes.includes(primaryNationality.countryCode)) {
        throw new Error(`Invalid nationality countryCode: ${primaryNationality.countryCode}`);
      }

      if (primaryNationality.countryCode !== birthInformation.countryOfBirthCode) {
        throw new Error(
          `Primary nationality (${primaryNationality.countryCode}) must match country of birth (${birthInformation.countryOfBirthCode})`
        );
      }

      // Log before calling सेवा
      logger.info('Passing to PersonalIdentityService: %j', { personalIdentity, birthInformation, nationalities });

      // Pass original nationalities with nationalityId to service
      const identity = await PersonalIdentityService.createPersonalIdentity(
        { personalIdentity, birthInformation, nationalities },
        modifiedBy
      );

      try {
        await kafka.produce('personal-data-events', {
          type: 'EMPLOYEE_CREATED',
          data: { identity },
        });
      } catch (kafkaError) {
        logger.error('Erreur Kafka lors de la création de l\'employé:', kafkaError);
      }

      res.status(201).json({
        message: 'Employee created successfully',
        data: { identity },
      });
    } catch (error: any) {
      logger.error('Erreur dans le contrôleur : %s', error.message, { stack: error.stack });
      const statusCode = error.message.includes('Invalid') ||
                        error.message.includes('Duplicate') ||
                        error.message.includes('Inconsistent data') ||
                        error.message.includes('Unknown placeOfBirth') ||
                        error.message.includes('Nationality not found') ||
                        error.message.includes('Country code not found') ||
                        error.message.includes('Validation failed') ? 400 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
}