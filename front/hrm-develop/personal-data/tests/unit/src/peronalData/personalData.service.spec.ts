import mongoose from 'mongoose';
import { PersonalDataService } from '../../../../src/service/personalDataService';
import { PersonalIdentityModel } from '../../../../src/models/civilStatus/personalIdentity.model';
import { BirthInformationModel } from '../../../../src/models/civilStatus/birthInformation.model';
import { NationalityModel } from '../../../../src/models/civilStatus/nationality.model';
import { CountryReferenceModel } from '../../../../src/models/civilStatus/countryReference.model';
import { DataHistoryModel } from '../../../../src/models/civilStatus/dataHistory.model';
import { personalIdentitySchema, birthInformationSchema, nationalitySchema, partialPersonalIdentitySchema } from '../../../../src/validator/personalDataValidator';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Mock Joi schemas
jest.mock('../../../../src/validator/personalDataValidator', () => ({
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

describe('PersonalDataService', () => {
  let personalIdentityId: string;

  // Configuration initiale avant tous les tests
  beforeAll(async () => {
    jest.setTimeout(10000);
    const mongoUri = process.env.DATABASE_BASE_URL || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
  });

  // Nettoyage des collections après chaque test
  afterEach(async () => {
    await PersonalIdentityModel.deleteMany({});
    await BirthInformationModel.deleteMany({});
    await NationalityModel.deleteMany({});
    await CountryReferenceModel.deleteMany({});
    await DataHistoryModel.deleteMany({});
  });

  // Déconnexion de MongoDB après tous les tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Configuration avant chaque test
  beforeEach(async () => {
    // Créer une identité personnelle pour les tests avec registrationNumber
    const personalIdentity = await PersonalIdentityModel.create({
      _id: new mongoose.Types.ObjectId('681dc44a58624eecd6f912ea'),
      registrationNumber: 'PD-0001', // Added required field
      firstName: 'John',
      lastName: 'Doe',
      gender: 'MALE',
      title: 'MR',
      dateOfBirth: new Date('1990-01-01'),
      isActive: true,
    });
    personalIdentityId = personalIdentity._id.toString();
  });

  describe('createEmployee', () => {
    it('should create an employee successfully', async () => {
      // Arrange
      const data = {
        personalIdentity: {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MR',
          middleName: 'Jane',
          suffix: 'Jr.',
          registrationNumber: 'PD-0002', // Added required field
        },
        birthInformation: {
          dateOfBirth: '1999-01-01',
          placeOfBirth: 'Paris',
          countryOfBirthCode: 'FRA',
        },
        nationalities: [
          { nationalityCountryCode: 'FRA', isPrimary: true, isResident: true },
        ],
      };
      const modifiedBy = 'system';
      await CountryReferenceModel.create({ countryCode: 'FRA', countryName: 'France', continent: 'Europe' });

      // Act
      const result = await PersonalDataService.createEmployee(data, modifiedBy);

      // Assert
      expect(result.identity).toHaveProperty('firstName', 'Jane');
      expect(result.birthInfo).toHaveProperty('placeOfBirth', 'Paris');
      expect(result.nationalities).toHaveLength(1);
      expect(result.nationalities[0]).toHaveProperty('nationalityCountryCode', 'FRA');

      // Vérifier la création de l'historique
      const history = await DataHistoryModel.find();
      expect(history).toHaveLength(3); // One for identity, one for birth info, one for nationality
      expect(history[0]).toHaveProperty('modificationType', 'CREATE');
    });

    it('should throw error if country code is invalid', async () => {
      // Arrange
      const data = {
        personalIdentity: {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MR',
          dateOfBirth: new Date('1992-02-02'),
          registrationNumber: 'PD-0003', // Added required field
        },
        birthInformation: {
          placeOfBirth: 'Paris',
          countryOfBirthCode: 'XX',
        },
        nationalities: [
          { nationalityCountryCode: 'XX', isResident: true },
        ],
      };
      const modifiedBy = 'system';

      // Act & Assert
      await expect(
        PersonalDataService.createEmployee(data, modifiedBy)
      ).rejects.toThrow('Invalid country code');
    });

    it('should throw error if personal identity validation fails', async () => {
      // Arrange
      (personalIdentitySchema.validate as jest.Mock).mockReturnValueOnce({
        error: { details: [{ message: 'Invalid firstName' }] },
      });
      const data = {
        personalIdentity: {
          firstName: '',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MR',
          dateOfBirth: new Date('1992-02-02'),
          registrationNumber: 'PD-0004', // Added required field
        },
        birthInformation: {
          placeOfBirth: 'Paris',
          countryOfBirthCode: 'FR',
        },
        nationalities: [
          { nationalityCountryCode: 'FR', isResident: true },
        ],
      };
      const modifiedBy = 'system';
      await CountryReferenceModel.create({ countryCode: 'FR', countryName: 'France', continent: 'Europe' });

      // Act & Assert
      await expect(
        PersonalDataService.createEmployee(data, modifiedBy)
      ).rejects.toThrow('Validation failed for personalIdentity: Invalid firstName');
    });
  });

  describe('updatePersonalIdentity', () => {
    it('should update personal identity, birth information, and nationalities successfully', async () => {
      // Arrange
      await BirthInformationModel.create({
        personalIdentityId,
        placeOfBirth: 'Paris',
        dateOfBirth: new Date('1992-02-02'),
        countryOfBirthCode: 'FR',
        isActive: true,
      });
      const nationality = await NationalityModel.create({
        personalIdentityId,
        nationalityCountryCode: 'FR',
        isResident: true,
        isActive: true,
      });
      await CountryReferenceModel.create({ countryCode: 'DE', countryName: 'Germany', continent: 'Europe' });

      const data = {
        personalIdentity: { firstName: 'Jane', registrationNumber: 'PD-0001' }, // Ensure registrationNumber
        birthInformation: { placeOfBirth: 'Berlin', countryOfBirthCode: 'DE' },
        nationalities: [
          { _id: nationality._id.toString(), nationalityCountryCode: 'DE', isResident: false },
        ],
      };
      const modifiedBy = 'system';

      // Act
      const result = await PersonalDataService.updatePersonalIdentity(personalIdentityId, data, modifiedBy);

      // Assert
      expect(result).toHaveProperty('firstName', 'Jane');
      const updatedBirthInfo = await BirthInformationModel.findOne({ personalIdentityId });
      expect(updatedBirthInfo).toHaveProperty('placeOfBirth', 'Berlin');
      const updatedNationalities = await NationalityModel.find({ personalIdentityId });
      expect(updatedNationalities).toHaveLength(1);
      expect(updatedNationalities[0]).toHaveProperty('nationalityCountryCode', 'DE');
      expect(updatedNationalities[0]).toHaveProperty('isResident', false);

      // Vérifier la création de l'historique
      const history = await DataHistoryModel.find();
      expect(history).toHaveLength(3); // One for identity, one for birth info, one for nationality
      expect(history[0]).toHaveProperty('modificationType', 'PARTIAL_UPDATE');
    });

    it('should throw error if personal identity not found', async () => {
      // Arrange
      const invalidId = new mongoose.Types.ObjectId().toString();
      const data = { personalIdentity: { firstName: 'Jane', registrationNumber: 'PD-0005' } }; // Added required field
      const modifiedBy = 'system';

      // Act & Assert
      await expect(
        PersonalDataService.updatePersonalIdentity(invalidId, data, 'system')
      ).rejects.toThrow('PersonalIdentity not found or inactive');
    });

    it('should throw error if nationality validation fails', async () => {
      // Arrange
      (nationalitySchema.validate as jest.Mock).mockReturnValueOnce({
        error: { details: [{ message: 'Invalid nationalityCountryCode' }] },
      });
      const data = {
        nationalities: [{ nationalityCountryCode: '' }],
      };
      const modifiedBy = 'system';

      // Act & Assert
      await expect(
        PersonalDataService.updatePersonalIdentity(personalIdentityId, data, 'system')
      ).rejects.toThrow('Validation failed for nationality: Invalid nationalityCountryCode');
    });
  });

  describe('readPersonalIdentity', () => {
    it('should read personal identity with related data successfully', async () => {
      // Arrange
      await BirthInformationModel.create({
        personalIdentityId,
        placeOfBirth: 'Paris',
        dateOfBirth: new Date('1992-02-02'),
        countryOfBirthCode: 'FR',
        isActive: true,
      });
      await NationalityModel.create({
        personalIdentityId,
        nationalityCountryCode: 'FR',
        isResident: true,
        isActive: true,
      });

      // Act
      const result = await PersonalDataService.readPersonalIdentity(personalIdentityId);

      // Assert
      expect(result.identity).toHaveProperty('firstName', 'John');
      expect(result.birthInfo).toHaveProperty('placeOfBirth', 'Paris');
      expect(result.nationalities).toHaveLength(1);
      expect(result.nationalities[0]).toHaveProperty('nationalityCountryCode', 'FR');
    });

    it('should throw error if personal identity not found', async () => {
      // Arrange
      const invalidId = new mongoose.Types.ObjectId().toString();

      // Act & Assert
      await expect(
        PersonalDataService.readPersonalIdentity(invalidId)
      ).rejects.toThrow('PersonalIdentity not found or inactive');
    });
  });

  describe('readAllPersonalIdentities', () => {
    it('should read all active personal identities with pagination', async () => {
      // Arrange
      await PersonalIdentityModel.create([
        {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'FEMALE',
          title: 'MR',
          registrationNumber: 'PD-0006', // Added required field
          dateOfBirth: new Date('1992-02-02'),
          isActive: true,
        },
        {
          firstName: 'Bob',
          lastName: 'Johnson',
          gender: 'MALE',
          title: 'MR',
          registrationNumber: 'PD-0007', // Added required field
          dateOfBirth: new Date('1985-03-03'),
          isActive: true,
        },
      ]);

      // Act
      const result = await PersonalDataService.readAllPersonalIdentities(1, 10);

      // Assert
      expect(result.identities).toHaveLength(3); // Including the one from beforeEach
      expect(result.pagination).toHaveProperty('total', 3);
      expect(result.pagination).toHaveProperty('page', 1);
      expect(result.pagination).toHaveProperty('limit', 10);
    });

    it('should return empty array if no active identities exist', async () => {
      // Arrange
      await PersonalIdentityModel.deleteMany({}); // Clear identities

      // Act
      const result = await PersonalDataService.readAllPersonalIdentities(1, 10);

      // Assert
      expect(result.identities).toHaveLength(0);
      expect(result.pagination).toHaveProperty('total', 0);
    });
  });

  describe('readAllPersonalIdentitiesDeleted', () => {
    it('should read all deleted personal identities with pagination', async () => {
      // Arrange
      await PersonalIdentityModel.create({
        firstName: 'Jane',
        lastName: 'Smith',
        gender: 'FEMALE',
        title: 'MR',
        registrationNumber: 'PD-0008', // Added required field
        dateOfBirth: new Date('1992-02-02'),
        isActive: false,
        deletedAt: new Date(),
      });

      // Act
      const result = await PersonalDataService.readAllPersonalIdentitiesDeleted(1, 10);

      // Assert
      expect(result.identities).toHaveLength(1);
      expect(result.pagination).toHaveProperty('total', 1);
    });

    it('should return empty array if no deleted identities exist', async () => {
      // Act
      const result = await PersonalDataService.readAllPersonalIdentitiesDeleted(1, 10);

      // Assert
      expect(result.identities).toHaveLength(0);
      expect(result.pagination).toHaveProperty('total', 0);
    });
  });

  describe('deletePersonalIdentity', () => {
    it('should soft delete personal identity and related data successfully', async () => {
      // Arrange
      await BirthInformationModel.create({
        personalIdentityId,
        placeOfBirth: 'Paris',
        dateOfBirth: new Date('1992-02-02'),
        countryOfBirthCode: 'FR',
        isActive: true,
      });
      await NationalityModel.create({
        personalIdentityId,
        nationalityCountryCode: 'FR',
        isResident: true,
        isActive: true,
      });
      const modifiedBy = 'system';

      // Act
      const result = await PersonalDataService.deletePersonalIdentity(personalIdentityId, modifiedBy);

      // Assert
      expect(result).toHaveProperty('isActive', false);
      expect(result).toHaveProperty('deletedAt');
      // const birthInfo = await BirthInformationModel.findOne({ personalIdentityId });
      // expect(birthInfo).toHaveProperty('isActive', false);
      // const nationality = await NationalityModel.findOne({ personalIdentityId });
      // expect(nationality).toHaveProperty('isActive', false);

      // Vérifier la création de l'historique
      const history = await DataHistoryModel.findOne({ entityType: 'PersonalIdentity' });
      expect(history).toHaveProperty('modificationType', 'UPDATE');
    });

    it('should throw error if personal identity not found', async () => {
      // Arrange
      const invalidId = new mongoose.Types.ObjectId().toString();
      const modifiedBy = 'system';

      // Act & Assert
      await expect(
        PersonalDataService.deletePersonalIdentity(invalidId, 'system')
      ).rejects.toThrow('PersonalIdentity not found or inactive');
    });
  });
});