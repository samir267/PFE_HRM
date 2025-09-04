import { Request, Response } from 'express';
import { PersonalIdentityService } from '../../service/civil-status/personal-data.service';
import logger from '../../configs/logger.config';
import { KafkaConnector } from '../../service/kafkaConnector';

// Get the singleton Kafka instance
const kafka = KafkaConnector.getInstance();

export class PersonalIdentityController {
  /**
   * PATCH /personal-identity/:id
   * Mettre à jour une identité personnelle.
   */
  // static async updatePersonalIdentity(req: Request, res: Response) {
  //   try {
  //     const id = req.params.id;
  //     const data = req.body.personalIdentity; // On s'attend à ce que les données soient dans req.body.personalIdentity
  //     const modifiedBy = 'system';
  //     logger.info('Mise à jour de l\'identité personnelle pour id: %s, données: %j', id, data);

  //     const result = await PersonalIdentityService.updatePersonalIdentity(id, data, modifiedBy);

  //     // Produce Kafka event
  //     kafka
  //       .produce('personal-data-events', {
  //         type: 'PERSONAL_IDENTITY_UPDATED',
  //         data: { id, ...result },
  //       })
  //       .catch((error) => logger.error('Erreur Kafka lors de la mise à jour de l\'identité personnelle:', error));

  //     res.json({
  //       message: 'Personal identity updated',
  //       data: result,
  //     });
  //   } catch (error: any) {
  //     logger.error('Erreur lors de la mise à jour de l\'identité personnelle:', error);
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  static async updatePersonalIdentity(req: Request, res: Response) {
    try {
      logger.info('Données reçues dans le contrôleur pour mise à jour : %j', req.body);
      const { id } = req.params; // Assume ID is passed as a URL parameter
      const { personalIdentity, nationalities } = req.body as {
        personalIdentity?: {
          title?: 'MR' | 'MME' | 'MLLE' | 'DR' | 'PR';
          lastName?: string;
          firstName?: string;
          middleName?: string;
          suffix?: string;
          gender?: 'MALE' | 'FEMALE' | 'OTHER';
          isActive?: boolean;
        };
        nationalities?: Array<{
          nationalityId: string;
          isPrimary?: boolean;
          isResident?: boolean;
        }>;
      };

      const modifiedBy = 'system';

      const validCountryCodes = [
        'TUN', 'FRA', 'GBR', 'USA', 'CAN', 'DEU', 'JPN', 'AUS', 'BRA', 'CHN',
        'RUS', 'IND', 'EGY', 'ZAF', 'ITA', 'AFG', 'ALB', 'DZA', 'AND', 'ZWE',
      ];

      // Validate nationalities if provided
      if (nationalities) {
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
            if (!validCountryCodes.includes(countryCode)) {
              throw new Error(`Invalid nationality countryCode: ${countryCode}`);
            }
            return {
              nationalityId: nationality.nationalityId,
              isPrimary: nationality.isPrimary,
              isResident: nationality.isResident,
              countryCode,
          };
          })
        );

        // Validate primary nationality
        const primaryNationality = resolvedNationalities.find(n => n.isPrimary === true);
        if (!primaryNationality) {
          throw new Error('No primary nationality specified');
        }
      }

      // Prepare update data
      const updateData: any = { personalIdentity: personalIdentity || {}, nationalities };

      // Log before calling service
      logger.info('Passing to PersonalIdentityService: %j', updateData);

      // Update PersonalIdentity
      const updatedIdentity = await PersonalIdentityService.updatePersonalIdentity(id, updateData, modifiedBy);

      try {
        await kafka.produce('personal-data-events', {
          type: 'EMPLOYEE_UPDATED',
          data: { identity: updatedIdentity },
        });
      } catch (kafkaError) {
        logger.error('Erreur Kafka lors de la mise à jour de l\'employé:', kafkaError);
      }

      res.status(200).json({
        message: 'Employee updated successfully',
        data: { identity: updatedIdentity },
      });
    } catch (error: any) {
      logger.error('Erreur dans le contrôleur : %s', error.message, { stack: error.stack });
      const statusCode = error.message.includes('Invalid') ||
                        error.message.includes('Duplicate') ||
                        error.message.includes('Nationality not found') ||
                        error.message.includes('Country code not found') ||
                        error.message.includes('Validation failed') ||
                        error.message.includes('PersonalIdentity not found') ? 400 : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
  /**
   * GET /personal-identity/:id
   * Récupérer une identité personnelle spécifique.
   */
  static async readPersonalIdentity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      logger.info('Récupération de l\'identité personnelle pour id: %s', id);

      const identity = await PersonalIdentityService.readPersonalIdentity(id);
      const birthInfo = await BirthInformationService.readBirthInformation(id);
      // const nationalities = await NationalityService.readNationalities(id);

      const result = {
        registrationNumber: identity.registrationNumber,
        identity,
        birthInfo,
        // nationalities,
      };

      res.json({
        message: 'Personal identity retrieved',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la récupération de l\'identité personnelle:', error);
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * GET /personal-identities
   * Récupérer toutes les identités actives avec pagination.
   */
  static async readAllPersonalIdentities(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info('Récupération de toutes les identités personnelles, page: %d, limit: %d', page, limit);

      const result = await PersonalIdentityService.readAllPersonalIdentities(page, limit);

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

  /**
   * GET /personal-identities/deleted
   * Récupérer toutes les identités supprimées avec pagination.
   */
  static async readAllPersonalIdentitiesDeleted(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      logger.info('Récupération des identités personnelles supprimées, page: %d, limit: %d', page, limit);

      const result = await PersonalIdentityService.readAllPersonalIdentitiesDeleted(page, limit);

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

  /**
   * DELETE /personal-identity/:id
   * Supprimer (soft delete) une identité personnelle.
   */
  static async deletePersonalIdentity(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const modifiedBy = 'system';
      logger.info('Suppression de l\'identité personnelle pour id: %s', id);

      const result = await PersonalIdentityService.deletePersonalIdentity(id, modifiedBy);

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

// Importer BirthInformationService et NationalityService pour readPersonalIdentity
import { BirthInformationService } from '../../service/civil-status/birth-information.service';
import { NationalityService } from '../../service/civil-status/nationality.service';
import { Types } from 'mongoose';import { NationalityModel } from '../../models/civilStatus/nationality.model';

