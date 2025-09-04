import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { EmployeeController } from '../../../../../src/controllers/civil-status/employee.controller'; // Adjust path
import { PersonalIdentityService } from '../../../../../src/service/civil-status/personal-data.service';
import { BirthInformationService } from '../../../../../src/service/civil-status/birth-information.service';
import { NationalityService } from '../../../../../src/service/civil-status/nationality.service';
import { CountryReferenceService } from '../../../../../src/service/civil-status/country-reference.service';
import logger from '../../../../../src/configs/logger.config';
import { KafkaConnector } from '../../../../../src/service/kafkaConnector';
import { CountryReferenceModel } from '../../../../../src/models/civilStatus/countryReference.model';
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
jest.mock('../../../../../src/service/civil-status/personal-data.service', () => ({
  PersonalIdentityService: {
    createPersonalIdentity: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/birth-information.service', () => ({
  BirthInformationService: {
    createBirthInformation: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/nationality.service', () => ({
  NationalityService: {
    createNationalities: jest.fn(),
  },
}));
jest.mock('../../../../../src/service/civil-status/country-reference.service', () => ({
  CountryReferenceService: {
    validateCountryCodes: jest.fn(),
  },
}));

describe('EmployeeController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;

  // Setup MongoDB connection before all tests
  beforeAll(async () => {
    jest.setTimeout(10000);
    const mongoUri = process.env.DATABASE_BASE_URL || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });

  // Clear collections after each test
  afterEach(async () => {
    await CountryReferenceModel.deleteMany({});
    jest.clearAllMocks();
  });

  // Close MongoDB connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Setup request and response mocks before each test
  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    statusSpy = jest.spyOn(res, 'status');
    jsonSpy = jest.spyOn(res, 'json');
  });

  describe('createEmployee', () => {
    const validData = {
      personalIdentity: {
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'FEMALE',
        title: 'MS',
      },
      birthInformation: {
        placeOfBirth: 'Paris',
        countryOfBirthCode: 'FRA',
        dateOfBirth: '1990-01-01',
      },
      nationalities: [
        { nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
      ],
    };

    it('should create an employee successfully', async () => {
      // Arrange
      req.body = validData;
      const mockIdentity = { _id: new mongoose.Types.ObjectId(), ...validData.personalIdentity };
      const mockBirthInfo = { ...validData.birthInformation };
      const mockNationalities = [{ ...validData.nationalities[0] }];

      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);
      (PersonalIdentityService.createPersonalIdentity as jest.Mock).mockResolvedValue(mockIdentity);
      (BirthInformationService.createBirthInformation as jest.Mock).mockResolvedValue(mockBirthInfo);
      (NationalityService.createNationalities as jest.Mock).mockResolvedValue(mockNationalities);
      (KafkaConnector.getInstance().produce as jest.Mock).mockResolvedValue(undefined);

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(CountryReferenceService.validateCountryCodes).toHaveBeenCalledWith(['FRA', 'FRA']);
      expect(PersonalIdentityService.createPersonalIdentity).toHaveBeenCalledWith(validData.personalIdentity, 'system');
      expect(BirthInformationService.createBirthInformation).toHaveBeenCalledWith(
        validData.birthInformation,
        mockIdentity._id.toString(),
        'system'
      );
      expect(NationalityService.createNationalities).toHaveBeenCalledWith(
        validData.nationalities,
        mockIdentity._id.toString(),
        'system'
      );
      expect(KafkaConnector.getInstance().produce).toHaveBeenCalledWith('personal-data-events', {
        type: 'EMPLOYEE_CREATED',
        data: {
          identity: mockIdentity,
          birthInfo: mockBirthInfo,
          nationalities: mockNationalities,
        },
      });
      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Employee created successfully',
        data: {
          identity: mockIdentity,
          birthInfo: mockBirthInfo,
          nationalities: mockNationalities,
        },
      });
      expect(logger.info).toHaveBeenCalledWith('Données reçues dans le contrôleur : %j', validData);
    });

    it('should return 400 if countryOfBirthCode is invalid', async () => {
      // Arrange
      req.body = {
        ...validData,
        birthInformation: { ...validData.birthInformation, countryOfBirthCode: 'XXX' },
      };

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Invalid countryOfBirthCode: XXX' });
      expect(logger.error).toHaveBeenCalledWith('Erreur dans le contrôleur : %s', 'Invalid countryOfBirthCode: XXX', expect.any(Object));
    });

    it('should return 400 if placeOfBirth and countryOfBirthCode are inconsistent', async () => {
      // Arrange
      req.body = {
        ...validData,
        birthInformation: { ...validData.birthInformation, placeOfBirth: 'Tunis', countryOfBirthCode: 'FRA' },
      };
      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Inconsistent data: Tunis is in TUN, but countryOfBirthCode is FRA',
      });
      expect(logger.error).toHaveBeenCalledWith(
        'Erreur dans le contrôleur : %s',
        'Inconsistent data: Tunis is in TUN, but countryOfBirthCode is FRA',
        expect.any(Object)
      );
    });

    it('should return 400 if placeOfBirth is unknown', async () => {
      // Arrange
      req.body = {
        ...validData,
        birthInformation: { ...validData.birthInformation, placeOfBirth: 'UnknownCity' },
      };
      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Unknown placeOfBirth: UnknownCity' });
      expect(logger.error).toHaveBeenCalledWith(
        'Erreur dans le contrôleur : %s',
        'Unknown placeOfBirth: UnknownCity',
        expect.any(Object)
      );
    });

    it('should return 400 if no primary nationality is specified', async () => {
      // Arrange
      req.body = {
        ...validData,
        nationalities: [{ nationalityCountryCode: 'FRA', isPrimary: false }],
      };
      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'No primary nationality specified' });
      expect(logger.error).toHaveBeenCalledWith(
        'Erreur dans le contrôleur : %s',
        'No primary nationality specified',
        expect.any(Object)
      );
    });

    it('should return 400 if primary nationality does not match country of birth', async () => {
      // Arrange
      req.body = {
        ...validData,
        nationalities: [{ nationalityCountryCode: 'USA', isPrimary: true }],
      };
      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Primary nationality (USA) must match country of birth (FRA)',
      });
      expect(logger.error).toHaveBeenCalledWith(
        'Erreur dans le contrôleur : %s',
        'Primary nationality (USA) must match country of birth (FRA)',
        expect.any(Object)
      );
    });

    it('should return 400 if PersonalIdentityService throws an error', async () => {
      // Arrange
      req.body = validData;
      (CountryReferenceService.validateCountryCodes as jest.Mock).mockResolvedValue(undefined);
      (PersonalIdentityService.createPersonalIdentity as jest.Mock).mockRejectedValue(new Error('Identity creation failed'));

      // Act
      await EmployeeController.createEmployee(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Identity creation failed' });
      expect(logger.error).toHaveBeenCalledWith(
        'Erreur dans le contrôleur : %s',
        'Identity creation failed',
        expect.any(Object)
      );
    });
  });
});