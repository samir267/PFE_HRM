import { FamilySituationService } from '../../../../src/service/familySituation.service';
import * as Joi from 'joi';
import { PersonalIdentityModel } from '../../../../src/models/civilStatus/personalIdentity.model';
// import { EmergencyContactModel } from '../../../../src/models/familySituation/emergency-contact.model';
import { MaritalStatusModel, MaritalStatusType } from '../../../../src/models/familySituation/marital-status.model';
import { DependantModel, RelationshipType } from '../../../../src/models/familySituation/dependant.model';
import { DataHistoryModel } from '../../../../src/models/civilStatus/dataHistory.model';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Mock Joi schemas
jest.mock('../../../../src/validator/family-situation.validator', () => ({
  emergencyContactSchema: {
    validate: jest.fn().mockImplementation((data, options) => {
      if (options?.abortEarly === false) {
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          return { error: { details: [{ message: 'Invalid email format' }] } };
        }
        if (data.lastName && data.lastName.length > 100) {
          return { error: { details: [{ message: 'Last name exceeds 100 characters' }] } };
        }
      }
      return { value: data, error: null };
    }),
  },
  maritalStatusSchema: {
    validate: jest.fn().mockImplementation((data, options) => {
      if (options?.abortEarly === false && data.documentReference && data.documentReference.length > 100) {
        return { error: { details: [{ message: 'Document reference exceeds 100 characters' }] } };
      }
      return { value: data, error: null };
    }),
  },
  dependantSchema: {
    validate: jest.fn().mockImplementation((data, options) => {
      if (options?.abortEarly === false && data.lastName && data.lastName.length > 100) {
        return { error: { details: [{ message: 'Last name exceeds 100 characters' }] } };
      }
      return { value: data, error: null };
    }),
  },
}));

describe('FamilySituationService', () => {
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
    // await EmergencyContactModel.deleteMany({});
    await MaritalStatusModel.deleteMany({});
    await DependantModel.deleteMany({});
    await DataHistoryModel.deleteMany({});
  });

  // Déconnexion de MongoDB après tous les tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Configuration avant chaque test
  beforeEach(async () => {
    // Créer une identité personnelle pour les tests
    const personalIdentity = await PersonalIdentityModel.create({
      _id: new mongoose.Types.ObjectId('681dc44a58624eecd6f912ea'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'MALE',
      title: 'MR',
      registrationNumber: 'PD-0001', // Added required field
    });
    personalIdentityId = personalIdentity._id.toString();
  });

  // describe('addEmergencyContact', () => {
  //   it('should add an emergency contact successfully', async () => {
  //     const data = {
  //       lastName: 'Smith',
  //       firstName: 'Jane',
  //       relationship: 'SPOUSE',
  //       phoneNumber: '+1234567890',
  //       alternativePhone: '+1987654321',
  //       email: 'jane.smith@example.com',
  //       isPrimaryContact: true,
  //     };
  //     const modifiedBy = 'system';

  //     const result = await FamilySituationService.addEmergencyContact(personalIdentityId, data, modifiedBy);

  //     expect(result).toHaveProperty('lastName', 'Smith');
  //     expect(result).toHaveProperty('firstName', 'Jane');
  //     expect(result).toHaveProperty('relationship', 'SPOUSE');
  //     expect(result).toHaveProperty('phoneNumber', '+1234567890');
  //     expect(result).toHaveProperty('alternativePhone', '+1987654321');
  //     expect(result).toHaveProperty('email', 'jane.smith@example.com');
  //     expect(result).toHaveProperty('isPrimaryContact', true);

  //     // Vérifier la création de l'historique
  //     const history = await DataHistoryModel.findOne({ entityType: 'EmergencyContact' });
  //     expect(history).toHaveProperty('modificationType', 'CREATE');
  //   });

  //   it('should throw error if personal identity not found', async () => {
  //     const invalidId = new mongoose.Types.ObjectId().toString();
  //     const data = {
  //       lastName: 'Smith',
  //       firstName: 'Jane',
  //       relationship: 'SPOUSE',
  //       phoneNumber: '+1234567890',
  //     };

  //     await expect(
  //       FamilySituationService.addEmergencyContact(invalidId, data, 'system')
  //     ).rejects.toThrow('Employee not found');
  //   });

  //   it('should throw validation error for invalid email', async () => {
  //     const data = {
  //       lastName: 'Smith',
  //       firstName: 'Jane',
  //       relationship: 'SPOUSE',
  //       phoneNumber: '+1234567890',
  //       email: 'invalid',
  //     };

  //     await expect(
  //       FamilySituationService.addEmergencyContact(personalIdentityId, data, 'system')
  //     ).rejects.toThrow('Validation failed for emergencyContact: Invalid email format');
  //   });

  //   it('should throw validation error for lastName exceeding 100 characters', async () => {
  //     const data = {
  //       lastName: 'A'.repeat(101),
  //       firstName: 'Jane',
  //       relationship: 'SPOUSE',
  //       phoneNumber: '+1234567890',
  //     };

  //     await expect(
  //       FamilySituationService.addEmergencyContact(personalIdentityId, data, 'system')
  //     ).rejects.toThrow('Validation failed for emergencyContact: Last name exceeds 100 characters');
  //   });
  // });

  describe('registerMaritalStatus', () => {
    it('should register a marital status successfully', async () => {
      const data = {
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
        documentReference: 'marriage_cert_123',
      };
      const modifiedBy = 'system';

      const result = await FamilySituationService.registerMaritalStatus(personalIdentityId, data, modifiedBy);

      expect(result).toHaveProperty('statusType', 'MARRIED');
      expect(result.effectiveDate).toEqual(new Date('2025-01-01'));
      expect(result).toHaveProperty('documentReference', 'marriage_cert_123');

      // Vérifier la création de l'historique
      const history = await DataHistoryModel.findOne({ entityType: 'MaritalStatus', modificationType: 'CREATE' });
      expect(history).toHaveProperty('modificationType', 'CREATE');
    });

    it('should end previous active marital status', async () => {
      await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.SINGLE,
        effectiveDate: new Date('2022-01-01'),
      });

      const data = {
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
      };

      await FamilySituationService.registerMaritalStatus(personalIdentityId, data, 'system');

      const oldStatus = await MaritalStatusModel.findOne({ statusType: 'SINGLE' });
      expect(oldStatus?.endDate).toEqual(new Date('2025-01-01'));

      const history = await DataHistoryModel.findOne({ entityType: 'MaritalStatus', modificationType: 'UPDATE' });
      expect(history).toHaveProperty('modificationType', 'UPDATE');
    });

    it('should throw error if personal identity not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const data = { statusType: MaritalStatusType.MARRIED, effectiveDate: new Date('2025-01-01') };

      await expect(
        FamilySituationService.registerMaritalStatus(invalidId, data, 'system')
      ).rejects.toThrow('Employee not found');
    });

    it('should throw validation error for documentReference exceeding 100 characters', async () => {
      const data = {
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
        documentReference: 'A'.repeat(101),
      };

      await expect(
        FamilySituationService.registerMaritalStatus(personalIdentityId, data, 'system')
      ).rejects.toThrow('Validation failed for maritalStatus: Document reference exceeds 100 characters');
    });
  });

  describe('getMaritalStatus', () => {
    it('should retrieve a marital status by ID', async () => {
      const maritalStatus = await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
        documentReference: 'marriage_cert_123',
      });

      const result = await FamilySituationService.getMaritalStatus(maritalStatus._id.toString());

      expect(result).toHaveProperty('statusType', 'MARRIED');
      expect(result.effectiveDate).toEqual(new Date('2025-01-01'));
      expect(result).toHaveProperty('documentReference', 'marriage_cert_123');
    });

    it('should throw error if marital status not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.getMaritalStatus(invalidId)
      ).rejects.toThrow('Marital status not found');
    });
  });

  describe('getMaritalStatusesByPersonalIdentity', () => {
    it('should retrieve all marital statuses for a personal identity', async () => {
      await MaritalStatusModel.create([
        {
          personalIdentityId,
          statusType: MaritalStatusType.SINGLE,
          effectiveDate: new Date('2022-01-01'),
          endDate: new Date('2024-12-31'),
        },
        {
          personalIdentityId,
          statusType: MaritalStatusType.MARRIED,
          effectiveDate: new Date('2025-01-01'),
          documentReference: 'marriage_cert_123',
        },
      ]);

      const result = await FamilySituationService.getMaritalStatusesByPersonalIdentity(personalIdentityId);

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ statusType: 'SINGLE' }),
          expect.objectContaining({ statusType: 'MARRIED' }),
        ])
      );
    });

    it('should throw error if personal identity not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.getMaritalStatusesByPersonalIdentity(invalidId)
      ).rejects.toThrow('Employee not found');
    });
  });

  describe('updateMaritalStatus', () => {
    it('should update a marital status successfully', async () => {
      const maritalStatus = await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.SINGLE,
        effectiveDate: new Date('2022-01-01'),
      });

      const updateData = {
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
        documentReference: 'marriage_cert_123',
      };
      const modifiedBy = 'system';

      const result = await FamilySituationService.updateMaritalStatus(maritalStatus._id.toString(), updateData, modifiedBy);

      expect(result).toHaveProperty('statusType', 'MARRIED');
      expect(result.effectiveDate).toEqual(new Date('2025-01-01'));
      expect(result).toHaveProperty('documentReference', 'marriage_cert_123');

      const history = await DataHistoryModel.findOne({ entityType: 'MaritalStatus', modificationType: 'UPDATE' });
      expect(history).toHaveProperty('modificationType', 'UPDATE');
    });

    it('should throw error if marital status not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { statusType: MaritalStatusType.MARRIED };

      await expect(
        FamilySituationService.updateMaritalStatus(invalidId, updateData, 'system')
      ).rejects.toThrow('Marital status not found');
    });

    it('should throw validation error for documentReference exceeding 100 characters', async () => {
      const maritalStatus = await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.SINGLE,
        effectiveDate: new Date('2022-01-01'),
      });

      const updateData = { documentReference: 'A'.repeat(101) };

      await expect(
        FamilySituationService.updateMaritalStatus(maritalStatus._id.toString(), updateData, 'system')
      ).rejects.toThrow('Validation failed for maritalStatus: Document reference exceeds 100 characters');
    });
  });

  describe('deleteMaritalStatus', () => {
    it('should delete a marital status successfully', async () => {
      const maritalStatus = await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
      });

      await FamilySituationService.deleteMaritalStatus(maritalStatus._id.toString(), 'system');

      const deletedStatus = await MaritalStatusModel.findById(maritalStatus._id);
      expect(deletedStatus).toBeNull();

      const history = await DataHistoryModel.findOne({ entityType: 'MaritalStatus', modificationType: 'DELETE' });
      expect(history).toHaveProperty('modificationType', 'DELETE');
    });

    it('should throw error if marital status not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.deleteMaritalStatus(invalidId, 'system')
      ).rejects.toThrow('Marital status not found');
    });
  });

  describe('addDependant', () => {
    it('should add a dependant successfully', async () => {
      const data = {
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        isFiscallyDependent: true,
        isPrimaryBeneficiary: false,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2030-12-31'),
      };
      const modifiedBy = 'system';

      const result = await FamilySituationService.addDependant(personalIdentityId, data, modifiedBy);

      expect(result).toHaveProperty('relationshipType', 'CHILD');
      expect(result).toHaveProperty('firstName', 'John');
      expect(result.dateOfBirth).toEqual(new Date('2005-06-15'));
      expect(result.endDate).toEqual(new Date('2030-12-31'));

      const history = await DataHistoryModel.findOne({ entityType: 'Dependant' });
      expect(history).toHaveProperty('modificationType', 'CREATE');
    });

    it('should throw error if child age is invalid', async () => {
      const data = {
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('1990-01-01'),
        startDate: new Date('2025-01-01'),
      };

      await expect(
        FamilySituationService.addDependant(personalIdentityId, data, 'system')
      ).rejects.toThrow('Child must be between 0 and 25 years old');
    });

    it('should throw error if personal identity not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const data = {
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
      };

      await expect(
        FamilySituationService.addDependant(invalidId, data, 'system')
      ).rejects.toThrow('Employee not found');
    });

    it('should throw validation error for lastName exceeding 100 characters', async () => {
      const data = {
        relationshipType: RelationshipType.CHILD,
        lastName: 'A'.repeat(101),
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        startDate: new Date('2025-01-01'),
      };

      await expect(
        FamilySituationService.addDependant(personalIdentityId, data, 'system')
      ).rejects.toThrow('Validation failed for dependant: Last name exceeds 100 characters');
    });
  });

  describe('getDependant', () => {
    it('should retrieve a dependant by ID', async () => {
      const dependant = await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        isFiscallyDependent: true,
        isPrimaryBeneficiary: false,
        startDate: new Date('2025-01-01'),
      });

      const result = await FamilySituationService.getDependant(dependant._id.toString());

      expect(result).toHaveProperty('relationshipType', 'CHILD');
      expect(result).toHaveProperty('firstName', 'John');
      expect(result.dateOfBirth).toEqual(new Date('2005-06-15'));
    });

    it('should throw error if dependant not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.getDependant(invalidId)
      ).rejects.toThrow('Dependant not found');
    });
  });

  describe('getDependantsByPersonalIdentity', () => {
    it('should retrieve all dependants for a personal identity', async () => {
      await DependantModel.create([
        {
          personalIdentityId,
          relationshipType: RelationshipType.CHILD,
          lastName: 'Doe',
          firstName: 'John',
          dateOfBirth: new Date('2005-06-15'),
          isFiscallyDependent: true,
          isPrimaryBeneficiary: false,
          startDate: new Date('2025-01-01'),
        },
        {
          personalIdentityId,
          relationshipType: RelationshipType.SPOUSE,
          lastName: 'Smith',
          firstName: 'Jane',
          dateOfBirth: new Date('1980-01-01'),
          isFiscallyDependent: false,
          isPrimaryBeneficiary: true,
          startDate: new Date('2025-01-01'),
        },
      ]);

      const result = await FamilySituationService.getDependantsByPersonalIdentity(personalIdentityId);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('relationshipType', 'CHILD');
      expect(result[1]).toHaveProperty('relationshipType', 'SPOUSE');
    });

    it('should throw error if personal identity not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.getDependantsByPersonalIdentity(invalidId)
      ).rejects.toThrow('Employee not found');
    });
  });

  describe('updateDependant', () => {
    it('should update a dependant successfully', async () => {
      const dependant = await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        isFiscallyDependent: true,
        isPrimaryBeneficiary: false,
        startDate: new Date('2025-01-01'),
      });

      const updateData = {
        lastName: 'Johnson',
        firstName: 'Johnny',
        dateOfBirth: new Date('2006-06-15'),
        isFiscallyDependent: false,
        isPrimaryBeneficiary: true,
        startDate: new Date('2025-02-01'),
        endDate: new Date('2031-12-31'),
      };
      const modifiedBy = 'system';

      const result = await FamilySituationService.updateDependant(dependant._id.toString(), updateData, modifiedBy);

      expect(result).toHaveProperty('lastName', 'Johnson');
      expect(result).toHaveProperty('firstName', 'Johnny');
      expect(result.dateOfBirth).toEqual(new Date('2006-06-15'));
      expect(result).toHaveProperty('isFiscallyDependent', false);
      expect(result).toHaveProperty('isPrimaryBeneficiary', true);
      expect(result.endDate).toEqual(new Date('2031-12-31'));

      const history = await DataHistoryModel.findOne({ entityType: 'Dependant', modificationType: 'UPDATE' });
      expect(history).toHaveProperty('modificationType', 'UPDATE');
    });

    it('should throw error if child age is invalid', async () => {
      const dependant = await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        startDate: new Date('2025-01-01'),
      });

      const updateData = {
        relationshipType: RelationshipType.CHILD,
        dateOfBirth: new Date('1990-01-01'),
      };

      await expect(
        FamilySituationService.updateDependant(dependant._id.toString(), updateData, 'system')
      ).rejects.toThrow('Child must be between 0 and 25 years old');
    });

    it('should throw error if dependant not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { lastName: 'Johnson' };

      await expect(
        FamilySituationService.updateDependant(invalidId, updateData, 'system')
      ).rejects.toThrow('Dependant not found');
    });

    it('should throw validation error for lastName exceeding 100 characters', async () => {
      const dependant = await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        startDate: new Date('2025-01-01'),
      });

      const updateData = { lastName: 'A'.repeat(101) };

      await expect(
        FamilySituationService.updateDependant(dependant._id.toString(), updateData, 'system')
      ).rejects.toThrow('Validation failed for dependant: Last name exceeds 100 characters');
    });
  });

  describe('deleteDependant', () => {
    it('should delete a dependant successfully', async () => {
      const dependant = await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        isFiscallyDependent: true,
        isPrimaryBeneficiary: false,
        startDate: new Date('2025-01-01'),
      });

      await FamilySituationService.deleteDependant(dependant._id.toString(), 'system');

      const deletedDependant = await DependantModel.findById(dependant._id);
      expect(deletedDependant).toBeNull();

      const history = await DataHistoryModel.findOne({ entityType: 'Dependant', modificationType: 'DELETE' });
      expect(history).toHaveProperty('modificationType', 'DELETE');
    });

    it('should throw error if dependant not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.deleteDependant(invalidId, 'system')
      ).rejects.toThrow('Dependant not found');
    });
  });

  describe('validateFamilySituation', () => {
    it('should validate family situation with no issues', async () => {
      await MaritalStatusModel.create({
        personalIdentityId,
        statusType: MaritalStatusType.MARRIED,
        effectiveDate: new Date('2025-01-01'),
        documentReference: 'marriage_cert_123',
      });
      await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        isFiscallyDependent: true,
        isPrimaryBeneficiary: false,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2030-12-31'),
      });

      const result = await FamilySituationService.validateFamilySituation(personalIdentityId);

      expect(result.isCompliant).toBe(true);
      expect(result.issues).toEqual([]);
      expect(result.maritalStatuses).toHaveLength(1);
      expect(result.dependants).toHaveLength(1);
      expect(result.maritalStatuses[0]).toHaveProperty('statusType', 'MARRIED');
      expect(result.dependants[0]).toHaveProperty('relationshipType', 'CHILD');
    });

    it('should detect invalid dependant date of birth', async () => {
      await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2026-01-01'),
        startDate: new Date('2025-01-01'),
      });

      const result = await FamilySituationService.validateFamilySituation(personalIdentityId);

      expect(result.isCompliant).toBe(false);
      expect(result.issues).toContain('Invalid date of birth for dependant John Doe');
    });

    it('should detect invalid dependant end date', async () => {
      await DependantModel.create({
        personalIdentityId,
        relationshipType: RelationshipType.CHILD,
        lastName: 'Doe',
        firstName: 'John',
        dateOfBirth: new Date('2005-06-15'),
        startDate: new Date('2025-01-01'),
        endDate: new Date('2024-12-31'),
      });

      const result = await FamilySituationService.validateFamilySituation(personalIdentityId);

      expect(result.isCompliant).toBe(false);
      expect(result.issues).toContain('Invalid endDate for dependant John Doe');
    });

    it('should throw error if personal identity not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        FamilySituationService.validateFamilySituation(invalidId)
      ).rejects.toThrow('Employee not found');
    });
  });
});