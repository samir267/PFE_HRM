import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { PersonalIdentityController } from '../../../../../src/controllers/civil-status/personal-identity.controller';
import { PersonalIdentityService } from '../../../../../src/service/civil-status/personal-data.service';
import { BirthInformationService } from '../../../../../src/service/civil-status/birth-information.service';
import { NationalityService } from '../../../../../src/service/civil-status/nationality.service';
import { DataHistoryService } from '../../../../../src/service/civil-status/data-history.service';
import logger from '../../../../../src/configs/logger.config';
import { KafkaConnector } from '../../../../../src/service/kafkaConnector';
import { personalIdentitySchema, birthInformationSchema, nationalitySchema, partialPersonalIdentitySchema } from '../../../../../src/validator/personalDataValidator';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Mock logger
jest.mock('../../../../../src/configs/logger.config', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

// Mock KafkaConnector
jest.mock('../../../../../src/service/kafkaConnector', () => ({
  KafkaConnector: {
    getInstance: jest.fn().mockReturnValue({
      produce: jest.fn().mockResolvedValue(undefined),
    }),
  },
}));

// Mock Joi schemas
jest.mock('../../../../../src/validator/personalDataValidator', () => ({
  personalIdentitySchema: {
    validate: jest.fn().mockImplementation((data) => ({ value: data, error: null })),
  },
  birthInformationSchema: {
    validate: jest.fn().mockImplementation((data) => ({ value: data, error: null })),
  },
  nationalitySchema: {
    validate: jest.fn().mockImplementation((data) => ({ value: data, error: null })),
  },
  partialPersonalIdentitySchema: {
    validate: jest.fn().mockImplementation((data) => ({ value: data, error: null })),
  },
}));

// Mock services
jest.mock('../../../../../src/service/civil-status/personal-data.service', () => ({
  PersonalIdentityService: {
    updatePersonalIdentity: jest.fn(),
    readPersonalIdentity: jest.fn(),
    readAllPersonalIdentities: jest.fn(),
    readAllPersonalIdentitiesDeleted: jest.fn(),
    deletePersonalIdentity: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/birth-information.service', () => ({
  BirthInformationService: {
    readBirthInformation: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/nationality.service', () => ({
  NationalityService: {
    readNationalities: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/data-history.service', () => ({
  DataHistoryService: {
    logHistory: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('PersonalIdentityController', () => {
  let req: Partial<Request>;
  let res: any;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let personalIdentityId: string;

  // Configuration initiale avant tous les tests
  beforeAll(async () => {
    jest.setTimeout(10000);
    // Connect to MongoDB (optional for mocked tests, kept for consistency with example)
    const mongoUri = process.env.DATABASE_BASE_URL || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });

  // Nettoyage des mocks après chaque test
  afterEach(async () => {
    jest.clearAllMocks();
  });

  // Déconnexion de MongoDB après tous les tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Configuration avant chaque test
  beforeEach(() => {
    // Initialize req and res for controller tests
    req = {
      params: {},
      query: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    statusSpy = jest.spyOn(res, 'status');
    jsonSpy = jest.spyOn(res, 'json');

    // Set mock personal identity ID
    personalIdentityId = new mongoose.Types.ObjectId().toString();
  });

  describe('updatePersonalIdentity', () => {
    it('should update personal identity successfully', async () => {
      // Arrange
      const data = {
        personalIdentity: {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MR',
        },
      };
      const modifiedBy = 'system';
      const mockResult = {
        _id: personalIdentityId,
        ...data.personalIdentity,
        registrationNumber: 'PD-0001',
        isActive: true,
        updatedAt: new Date(),
      };
      
      (PersonalIdentityService.updatePersonalIdentity as jest.Mock).mockResolvedValue(mockResult);
      (KafkaConnector.getInstance().produce as jest.Mock).mockResolvedValue(undefined);

      req.params = { id: personalIdentityId };
      req.body = data;

      // Act
      await PersonalIdentityController.updatePersonalIdentity(req as Request, res as Response);

      // Assert
      expect(PersonalIdentityService.updatePersonalIdentity).toHaveBeenCalledWith(personalIdentityId, data.personalIdentity, modifiedBy);
      expect(KafkaConnector.getInstance().produce).toHaveBeenCalledWith('personal-data-events', {
        type: 'PERSONAL_IDENTITY_UPDATED',
        data: { id: personalIdentityId, ...mockResult },
      });
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Personal identity updated',
        data: mockResult,
      });
      expect(logger.info).toHaveBeenCalledWith('Mise à jour de l\'identité personnelle pour id: %s, données: %j', personalIdentityId, data.personalIdentity);
    });

    it('should return 400 if update fails', async () => {
      // Arrange
      const data = {
        personalIdentity: {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MS',
        },
      };
      (PersonalIdentityService.updatePersonalIdentity as jest.Mock).mockRejectedValue(new Error('PersonalIdentity not found or inactive'));

      req.params = { id: personalIdentityId };
      req.body = data;

      // Act
      await PersonalIdentityController.updatePersonalIdentity(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'PersonalIdentity not found or inactive' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la mise à jour de l\'identité personnelle:', expect.any(Error));
    });
  });

  describe('readPersonalIdentity', () => {
    it('should read personal identity with related data successfully', async () => {
      // Arrange
      const mockIdentity = {
        _id: personalIdentityId,
        firstName: 'John',
        lastName: 'Doe',
        gender: 'MALE',
        title: 'MR',
        registrationNumber: 'PD-0001',
        isActive: true,
      };
      const mockBirthInfo = {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FR',
        dateOfBirth: new Date('1990-01-01'),
      };
      const mockNationalities = [
        { nationalityCountryCode: 'FR', isPrimary: true, isResident: true },
      ];
      (PersonalIdentityService.readPersonalIdentity as jest.Mock).mockResolvedValue(mockIdentity);
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);
      (NationalityService.readNationalities as jest.Mock).mockResolvedValue(mockNationalities);

      req.params = { id: personalIdentityId };

      // Act
      await PersonalIdentityController.readPersonalIdentity(req as Request, res as Response);

      // Assert
      expect(PersonalIdentityService.readPersonalIdentity).toHaveBeenCalledWith(personalIdentityId);
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(NationalityService.readNationalities).toHaveBeenCalledWith(personalIdentityId);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Personal identity retrieved',
        data: {
          registrationNumber: mockIdentity.registrationNumber,
          identity: mockIdentity,
          birthInfo: mockBirthInfo,
          nationalities: mockNationalities,
        },
      });
      expect(logger.info).toHaveBeenCalledWith('Récupération de l\'identité personnelle pour id: %s', personalIdentityId);
    });

    it('should return 404 if personal identity not found', async () => {
      // Arrange
      (PersonalIdentityService.readPersonalIdentity as jest.Mock).mockRejectedValue(new Error('PersonalIdentity not found or inactive'));

      req.params = { id: personalIdentityId };

      // Act
      await PersonalIdentityController.readPersonalIdentity(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'PersonalIdentity not found or inactive' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la récupération de l\'identité personnelle:', expect.any(Error));
    });
  });

  describe('readAllPersonalIdentities', () => {
    it('should read all active personal identities with pagination', async () => {
      // Arrange
      const mockResult = {
        identities: [
          {
            _id: personalIdentityId,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'MALE',
            title: 'MR',
            registrationNumber: 'PD-0001',
            isActive: true,
          },
        ],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };
      (PersonalIdentityService.readAllPersonalIdentities as jest.Mock).mockResolvedValue(mockResult);

      req.query = { page: '1', limit: '10' };

      // Act
      await PersonalIdentityController.readAllPersonalIdentities(req as Request, res as Response);

      // Assert
      expect(PersonalIdentityService.readAllPersonalIdentities).toHaveBeenCalledWith(1, 10);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Personal identities retrieved',
        data: mockResult.identities,
        pagination: mockResult.pagination,
      });
      expect(logger.info).toHaveBeenCalledWith('Récupération de toutes les identités personnelles, page: %d, limit: %d', 1, 10);
    });

    it('should return 500 if retrieval fails', async () => {
      // Arrange
      (PersonalIdentityService.readAllPersonalIdentities as jest.Mock).mockRejectedValue(new Error('Retrieval failed'));

      req.query = { page: '1', limit: '10' };

      // Act
      await PersonalIdentityController.readAllPersonalIdentities(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Retrieval failed' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la récupération des identités personnelles:', expect.any(Error));
    });
  });

  describe('readAllPersonalIdentitiesDeleted', () => {
    it('should read all deleted personal identities with pagination', async () => {
      // Arrange
      const mockResult = {
        identities: [
          {
            _id: personalIdentityId,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'MALE',
            title: 'MR',
            registrationNumber: 'PD-0001',
            isActive: false,
            deletedAt: new Date(),
          },
        ],
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };
      (PersonalIdentityService.readAllPersonalIdentitiesDeleted as jest.Mock).mockResolvedValue(mockResult);

      req.query = { page: '1', limit: '10' };

      // Act
      await PersonalIdentityController.readAllPersonalIdentitiesDeleted(req as Request, res as Response);

      // Assert
      expect(PersonalIdentityService.readAllPersonalIdentitiesDeleted).toHaveBeenCalledWith(1, 10);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Personal identities retrieved',
        data: mockResult.identities,
        pagination: mockResult.pagination,
      });
      expect(logger.info).toHaveBeenCalledWith('Récupération des identités personnelles supprimées, page: %d, limit: %d', 1, 10);
    });

    it('should return 500 if retrieval fails', async () => {
      // Arrange
      (PersonalIdentityService.readAllPersonalIdentitiesDeleted as jest.Mock).mockRejectedValue(new Error('Retrieval failed'));

      req.query = { page: '1', limit: '10' };

      // Act
      await PersonalIdentityController.readAllPersonalIdentitiesDeleted(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Retrieval failed' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la récupération des identités personnelles supprimées:', expect.any(Error));
    });
  });

//   describe('deletePersonalIdentity', () => {
//     it('should soft delete personal identity successfully', async () => {
//       // Arrange
//       const mockResult = {
//         _id: personalIdentityId,
//         firstName: 'John',
//         lastName: 'Doe',
//         gender: 'MALE',
//         title: 'MR',
//         registrationNumber: 'PD-0001',
//         isActive: false,
//         deletedAt: new Date(),
//       };
//       (PersonalIdentityService.deletePersonalIdentity as jest.Mock).mockResolvedValue(mockResult);
//       (KafkaConnector.getInstance().produce as jest.Mock).mockResolvedValue(undefined);

//       req.params = { id: personalIdentityId };

//       // Act
//       await PersonalIdentityController.deletePersonalIdentity(req as Request, res as Response);

//       // Assert
//       expect(PersonalIdentityService.deletePersonalIdentity).toHaveBeenCalledWith(personalIdentityId, 'system');
//       expect(KafkaConnector.getInstance().produce).toHaveBeenCalledWith('personal-data-events', {
//         type: 'PERSONAL_IDENTITY_DELETED',
//         data: expect.objectContaining({
//     id: personalIdentityId,
//     registrationNumber: 'PD-0001',
//     deletedAt: expect.any(Date), // ou expect.any(String) si c'est une chaîne
//     isActive: false,
//     firstName: 'John',
//     lastName: 'Doe',
//     gender: 'MALE',
//     title: 'MR',
//   }),
//       });
//       expect(statusSpy).toHaveBeenCalledWith(200);
//       expect(jsonSpy).toHaveBeenCalledWith({
//         message: 'Personal identity soft deleted successfully',
//         data: mockResult,
//       });
//       expect(logger.info).toHaveBeenCalledWith('Initiating soft delete for PersonalIdentity with id: %s by user: %s', personalIdentityId, 'system');
//     });

//     it('should return 404 if identity not found', async () => {
//       // Arrange
//       (PersonalIdentityService.deletePersonalIdentity as jest.Mock).mockRejectedValue(new Error('PersonalIdentity not found or inactive'));

//       req.params = { id: personalIdentityId };

//       // Act
//       await PersonalIdentityController.deletePersonalIdentity(req as Request, res as Response);

//       // Assert
//       expect(statusSpy).toHaveBeenCalledWith(404);
//       expect(jsonSpy).toHaveBeenCalledWith({ message: 'PersonalIdentity not found or inactive' });
//       expect(logger.error).toHaveBeenCalledWith('Error during PersonalIdentity deletion (id: %s): %s', personalIdentityId, 'PersonalIdentity not found or inactive', expect.objectContaining({
//         stack: expect.any(String)
//       }));
//     });

//     it('should log Kafka error but still return 200 on successful delete', async () => {
//       // Arrange
//       const mockResult = {
//         _id: personalIdentityId,
//         firstName: 'John',
//         lastName: 'Doe',
//         gender: 'MALE',
//         title: 'MR',
//         registrationNumber: 'PD-0001',
//         isActive: false,
//         deletedAt: new Date(),
//       };
//       (PersonalIdentityService.deletePersonalIdentity as jest.Mock).mockResolvedValue(mockResult);
//       (KafkaConnector.getInstance().produce as jest.Mock).mockRejectedValue(new Error('Kafka error'));

//       req.params = { id: personalIdentityId };

//       // Act
//       await PersonalIdentityController.deletePersonalIdentity(req as Request, res as Response);

//       // Assert
//       expect(statusSpy).toHaveBeenCalledWith(200);
//       expect(jsonSpy).toHaveBeenCalledWith({
//         message: 'Personal identity soft deleted successfully',
//         data: mockResult,
//       });
//       expect(logger.error).toHaveBeenCalledWith('Failed to publish Kafka event for PersonalIdentity deletion (id: %s): %s', personalIdentityId, expect.any(Error));
//     });
//   });
});