import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NationalityController } from '../../../../../src/controllers/civil-status/nationality.controller'; // Adjust path
import { NationalityService } from '../../../../../src/service/civil-status/nationality.service';
import { BirthInformationService } from '../../../../../src/service/civil-status/birth-information.service';
import logger from '../../../../../src/configs/logger.config';
import { KafkaConnector } from '../../../../../src/service/kafkaConnector';
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

// Mock services
jest.mock('../../../../../src/service/civil-status/nationality.service', () => ({
  NationalityService: {
    updateNationalities: jest.fn(),
    readNationalities: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/birth-information.service', () => ({
  BirthInformationService: {
    readBirthInformation: jest.fn(),
  },
}));

describe('NationalityController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let personalIdentityId: string;

  // Configuration initiale avant tous les tests
  beforeAll(async () => {
    jest.setTimeout(10000);
    // Connect to MongoDB (optional for mocked tests, kept for consistency)
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

  describe('updateNationalities', () => {
    it('should update nationalities successfully', async () => {
      // Arrange
      const data = {
        nationalities: [
          { nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
          { nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
        ],
      };
      const modifiedBy = 'system';
      const mockBirthInfo = {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FRA',
        dateOfBirth: new Date('1990-01-01'),
      };
      const mockResult = [
        { personalIdentityId, nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
        { personalIdentityId, nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
      ];
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);
      (NationalityService.updateNationalities as jest.Mock).mockResolvedValue(mockResult);
      (KafkaConnector.getInstance().produce as jest.Mock).mockResolvedValue(undefined);

      req.params = { personalIdentityId };
      req.body = data;

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(NationalityService.updateNationalities).toHaveBeenCalledWith(personalIdentityId, data.nationalities, modifiedBy);
      expect(KafkaConnector.getInstance().produce).toHaveBeenCalledWith('personal-data-events', {
        type: 'NATIONALITIES_UPDATED',
        data: { personalIdentityId, nationalities: mockResult },
      });
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Nationalities updated',
        data: mockResult,
      });
      expect(logger.info).toHaveBeenCalledWith('Mise à jour des nationalités pour personalIdentityId: %s, données: %j', personalIdentityId, data.nationalities);
    });

    it('should return 400 if nationalities is not an array', async () => {
      // Arrange
      req.params = { personalIdentityId };
      req.body = { nationalities: { nationalityCountryCode: 'FRA' } }; // Not an array

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Nationalities must be an array' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la mise à jour des nationalités:', expect.any(Error));
      expect(BirthInformationService.readBirthInformation).not.toHaveBeenCalled();
      expect(NationalityService.updateNationalities).not.toHaveBeenCalled();
    });

    it('should return 400 if birth information not found', async () => {
      // Arrange
      const data = {
        nationalities: [
          { nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
        ],
      };
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(null);

      req.params = { personalIdentityId };
      req.body = data;

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Birth information not found for this personalIdentityId' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la mise à jour des nationalités:', expect.any(Error));
      expect(NationalityService.updateNationalities).not.toHaveBeenCalled();
    });

    it('should return 400 if no primary nationality specified', async () => {
      // Arrange
      const data = {
        nationalities: [
          { nationalityCountryCode: 'FRA', isPrimary: false, isResident: true },
          { nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
        ],
      };
      const mockBirthInfo = {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FRA',
        dateOfBirth: new Date('1990-01-01'),
      };
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);

      req.params = { personalIdentityId };
      req.body = data;

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'No primary nationality specified in the updated nationalities' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la mise à jour des nationalités:', expect.any(Error));
      expect(NationalityService.updateNationalities).not.toHaveBeenCalled();
    });

    it('should return 400 if primary nationality does not match country of birth', async () => {
      // Arrange
      const data = {
        nationalities: [
          { nationalityCountryCode: 'USA', isPrimary: true, isResident: true },
          { nationalityCountryCode: 'FRA', isPrimary: false, isResident: false },
        ],
      };
      const mockBirthInfo = {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FRA',
        dateOfBirth: new Date('1990-01-01'),
      };
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);

      req.params = { personalIdentityId };
      req.body = data;

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Primary nationality (USA) must match country of birth (FRA)',
      });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la mise à jour des nationalités:', expect.any(Error));
      expect(NationalityService.updateNationalities).not.toHaveBeenCalled();
    });

    it('should log Kafka error but still return 200 on successful update', async () => {
      // Arrange
      const data = {
        nationalities: [
          { nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
          { nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
        ],
      };
      const modifiedBy = 'system';
      const mockBirthInfo = {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FRA',
        dateOfBirth: new Date('1990-01-01'),
      };
      const mockResult = [
        { personalIdentityId, nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
        { personalIdentityId, nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
      ];
      (BirthInformationService.readBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);
      (NationalityService.updateNationalities as jest.Mock).mockResolvedValue(mockResult);
      (KafkaConnector.getInstance().produce as jest.Mock).mockRejectedValue(new Error('Kafka error'));

      req.params = { personalIdentityId };
      req.body = data;

      // Act
      await NationalityController.updateNationalities(req as Request, res as Response);

      // Assert
      expect(BirthInformationService.readBirthInformation).toHaveBeenCalledWith(personalIdentityId);
      expect(NationalityService.updateNationalities).toHaveBeenCalledWith(personalIdentityId, data.nationalities, modifiedBy);
      expect(KafkaConnector.getInstance().produce).toHaveBeenCalledWith('personal-data-events', {
        type: 'NATIONALITIES_UPDATED',
        data: { personalIdentityId, nationalities: mockResult },
      });
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Nationalities updated',
        data: mockResult,
      });
      expect(logger.error).toHaveBeenCalledWith('Erreur Kafka lors de la mise à jour des nationalités:', expect.any(Error));
    });
  });

  describe('readNationalities', () => {
    it('should retrieve nationalities successfully', async () => {
      // Arrange
      const mockResult = [
        { personalIdentityId, nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
        { personalIdentityId, nationalityCountryCode: 'USA', isPrimary: false, isResident: false },
      ];
      (NationalityService.readNationalities as jest.Mock).mockResolvedValue(mockResult);

      req.params = { personalIdentityId };

      // Act
      await NationalityController.readNationalities(req as Request, res as Response);

      // Assert
      expect(NationalityService.readNationalities).toHaveBeenCalledWith(personalIdentityId);
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Nationalities retrieved',
        data: mockResult,
      });
      expect(logger.info).toHaveBeenCalledWith('Récupération des nationalités pour personalIdentityId: %s', personalIdentityId);
    });

    it('should return 404 if nationalities not found', async () => {
      // Arrange
      (NationalityService.readNationalities as jest.Mock).mockRejectedValue(new Error('Nationalities not found'));

      req.params = { personalIdentityId };

      // Act
      await NationalityController.readNationalities(req as Request, res as Response);

      // Assert
      expect(NationalityService.readNationalities).toHaveBeenCalledWith(personalIdentityId);
      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Nationalities not found' });
      expect(logger.error).toHaveBeenCalledWith('Erreur lors de la récupération des nationalités:', expect.any(Error));
    });
  });
});