import mongoose from 'mongoose';
import ContactInformationService from '../../../../src/service/ContactInformation.service';
import PostalAddress from '../../../../src/models/contact/postalAddress.model';
import PhoneContact from '../../../../src/models/contact/phoneContact.model';
import ElectronicContact from '../../../../src/models/contact/ElectronicContact.model';
import EmergencyContact from '../../../../src/models/contact/EmergencyContact.model';
import ContactPreference from '../../../../src/models/contact/ContactPreference.model';
import { AddressType, PhoneType, ElectronicContactType, ContactPurpose, VerificationStatus, NotificationProtocol, PreferredContactMethod } from '../../../../src/types/contact/contactTypes.type';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

describe('ContactInformationService', () => {
  let employeeId: string;

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
    await PostalAddress.deleteMany({});
    await PhoneContact.deleteMany({});
    await ElectronicContact.deleteMany({});
    await EmergencyContact.deleteMany({});
    await ContactPreference.deleteMany({});
  });

  // Déconnexion de MongoDB après tous les tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Configuration avant chaque test
  beforeEach(async () => {
    employeeId = new mongoose.Types.ObjectId().toString();
  });

  describe('registerAddress', () => {
    it('should register an address successfully', async () => {
      const addressData = {
        addressType: AddressType.HOME,
        isPrimary: true,
        streetLine1: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        countryCode: 'FR',
        addressVerificationStatus: VerificationStatus.VERIFIED,
        effectiveDate: new Date('2025-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await ContactInformationService.registerAddress(employeeId, addressData);

      expect(result).toHaveProperty('streetLine1', '123 Main St');
      expect(result.personalIdentityId.toString()).toBe(employeeId);
      expect(result).toHaveProperty('addressVerificationStatus', VerificationStatus.VERIFIED);

      const savedAddress = await PostalAddress.findOne({ personalIdentityId: employeeId });
      expect(savedAddress).toHaveProperty('streetLine1', '123 Main St');
    });
  });

  describe('updateAddress', () => {
    it('should update an address successfully', async () => {
      const address = await PostalAddress.create({
        personalIdentityId: employeeId,
        addressType: AddressType.HOME,
        isPrimary: true,
        streetLine1: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        countryCode: 'FR',
        addressVerificationStatus: VerificationStatus.VERIFIED,
        effectiveDate: new Date('2025-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const addressId = (address as any)._id.toString();
      const updateData = {
        streetLine1: '456 New St',
        city: 'Lyon',
        postalCode: '69001',
        addressVerificationStatus: VerificationStatus.VERIFIED,
      };

      const result = await ContactInformationService.updateAddress(addressId, updateData);

      expect(result).toHaveProperty('streetLine1', '456 New St');
      expect(result).toHaveProperty('city', 'Lyon');
      expect(result).toHaveProperty('addressVerificationStatus', VerificationStatus.VERIFIED);

      const updatedAddress = await PostalAddress.findById(addressId);
      expect(updatedAddress).toHaveProperty('streetLine1', '456 New St');
    });

    it('should throw error if address not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { streetLine1: '456 New St' };

      await expect(
        ContactInformationService.updateAddress(invalidId, updateData)
      ).rejects.toThrow('Address not found');
    });
  });

  describe('getAllAddresses', () => {
    it('should retrieve all addresses for an employee', async () => {
      await PostalAddress.create([
        {
          personalIdentityId: employeeId,
          addressType: AddressType.HOME,
          isPrimary: true,
          streetLine1: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          countryCode: 'FR',
          effectiveDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          personalIdentityId: employeeId,
          addressType: AddressType.WORK,
          isPrimary: false,
          streetLine1: '456 New St',
          city: 'Lyon',
          postalCode: '69001',
          countryCode: 'FR',
          effectiveDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      const result = await ContactInformationService.getAllAddresses(employeeId);
      const sortedResult = result.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));

      expect(sortedResult).toHaveLength(2);
      expect(sortedResult[0]).toHaveProperty('streetLine1', '123 Main St');
      expect(sortedResult[1]).toHaveProperty('streetLine1', '456 New St');
    });

    it('should return empty array if no addresses exist', async () => {
      const result = await ContactInformationService.getAllAddresses(employeeId);

      expect(result).toHaveLength(0);
    });
  });

  describe('getAddressById', () => {
    it('should retrieve an address by ID', async () => {
      const address = await PostalAddress.create({
        personalIdentityId: employeeId,
        addressType: AddressType.HOME,
        isPrimary: true,
        streetLine1: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        countryCode: 'FR',
        effectiveDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const addressId = (address as any)._id.toString();

      const result = await ContactInformationService.getAddressById(addressId);

      expect(result).toHaveProperty('streetLine1', '123 Main St');
      expect(result).toHaveProperty('city', 'Paris');
    });

    it('should throw error if address not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();

      await expect(
        ContactInformationService.getAddressById(invalidId)
      ).rejects.toThrow('Address not found');
    });
  });

  describe('registerPhoneContact', () => {
    it('should register a phone contact successfully', async () => {
      const phoneData = {
        phoneType: PhoneType.MOBILE,
        isPrimary: true,
        countryCode: '+33',
        phoneNumber: 123456789, // Changed to Number
        isMessagingEnabled: true,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await ContactInformationService.registerPhoneContact(employeeId, phoneData);

      expect(result).toHaveProperty('phoneNumber', 123456789);
      expect(result.personalIdentityId.toString()).toBe(employeeId);
      expect(result).toHaveProperty('verificationStatus', VerificationStatus.VERIFIED);

      const savedPhone = await PhoneContact.findOne({ personalIdentityId: employeeId });
      expect(savedPhone).toHaveProperty('phoneNumber', 123456789);
    });
  });

  describe('updatePhoneContact', () => {
    it('should update a phone contact successfully', async () => {
      const phone = await PhoneContact.create({
        personalIdentityId: employeeId,
        phoneType: PhoneType.MOBILE,
        isPrimary: true,
        countryCode: '+33',
        phoneNumber: 123456789, // Changed to Number
        isMessagingEnabled: true,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const phoneId = (phone as any)._id.toString();
      const updateData = {
        phoneNumber: 987654321, // Changed to Number
        verificationStatus: VerificationStatus.VERIFIED,
        isMessagingEnabled: false,
      };

      const result = await ContactInformationService.updatePhoneContact(phoneId, updateData);

      expect(result).toHaveProperty('phoneNumber', 987654321);
      expect(result).toHaveProperty('verificationStatus', VerificationStatus.VERIFIED);
      expect(result).toHaveProperty('isMessagingEnabled', false);

      const updatedPhone = await PhoneContact.findById(phoneId);
      expect(updatedPhone).toHaveProperty('phoneNumber', 987654321);
    });

    it('should throw error if phone contact not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { phoneNumber: 987654321 }; // Changed to Number

      await expect(
        ContactInformationService.updatePhoneContact(invalidId, updateData)
      ).rejects.toThrow('Phone contact not found');
    });
  });

  

   describe('getAllPhoneContacts', () => {
  it('should retrieve all phone contacts for an employee', async () => {
    await PhoneContact.create([
      {
        personalIdentityId: employeeId,
        phoneType: PhoneType.MOBILE,
        countryCode: '+33',
        phoneNumber: 123456789,
        isMessagingEnabled: true,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personalIdentityId: employeeId,
        phoneType: PhoneType.HOME,
        countryCode: '+33',
        phoneNumber: 987654321,
        isMessagingEnabled: false,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await ContactInformationService.getAllPhoneContacts(employeeId);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ phoneNumber: 123456789, phoneType: PhoneType.MOBILE }),
        expect.objectContaining({ phoneNumber: 987654321, phoneType: PhoneType.HOME }),
      ])
    );
  });

  it('should return empty array if no phone contacts exist', async () => {
    const result = await ContactInformationService.getAllPhoneContacts(employeeId);

    expect(result).toHaveLength(0);
  });
});

  describe('setElectronicContact', () => {
    it('should set an electronic contact successfully', async () => {
      const electronicData = {
        contactType: ElectronicContactType.EMAIL,
        isPrimary: true,
        contactValue: 'test@example.com',
        purpose: ContactPurpose.GENERAL,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await ContactInformationService.setElectronicContact(employeeId, electronicData);
      expect(result).toHaveProperty('contactValue', 'test@example.com');
      expect(result.personalIdentityId.toString()).toBe(employeeId);
      expect(result).toHaveProperty('contactType', ElectronicContactType.EMAIL);
      const savedElectronic = await ElectronicContact.findOne({ personalIdentityId: employeeId });
      expect(savedElectronic).toHaveProperty('contactValue', 'test@example.com');
    });
  });

  describe('updateElectronicContact', () => {
    it('should update an electronic contact successfully', async () => {
      const electronic = await ElectronicContact.create({
        personalIdentityId: employeeId,
        contactType: ElectronicContactType.EMAIL,
        isPrimary: true,
        contactValue: 'test@example.com',
        purpose: ContactPurpose.GENERAL,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const contactId = (electronic as any)._id.toString();
      const updateData = {
        contactValue: 'new@example.com',
        verificationStatus: VerificationStatus.VERIFIED,
        purpose: ContactPurpose.OFFICIAL_COMMUNICATIONS,
      };

      const result = await ContactInformationService.updateElectronicContact(contactId, updateData);

      expect(result).toHaveProperty('contactValue', 'new@example.com');
      expect(result).toHaveProperty('verificationStatus', VerificationStatus.VERIFIED);
      expect(result).toHaveProperty('purpose', ContactPurpose.OFFICIAL_COMMUNICATIONS);

      const updatedElectronic = await ElectronicContact.findById(contactId);
      expect(updatedElectronic).toHaveProperty('contactValue', 'new@example.com');
    });

    it('should throw error if electronic contact not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { contactValue: 'new@example.com' };

      await expect(
        ContactInformationService.updateElectronicContact(invalidId, updateData)
      ).rejects.toThrow('Electronic contact not found');
    });
  });

  describe('setEmergencyContacts', () => {
    it('should set an emergency contact successfully', async () => {
      const emergencyData = {
        lastName: 'Doe',
        firstName: 'Jane',
        relationship: 'Spouse',
        priorityLevel: 1,
        phonePrimary: '+33123456789',
        notificationProtocol: NotificationProtocol.CALL_ONLY,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await ContactInformationService.setEmergencyContacts(employeeId, emergencyData);
      expect(result).toHaveProperty('lastName', 'Doe');
      expect(result).toHaveProperty('firstName', 'Jane');
      expect(result.personalIdentityId.toString()).toBe(employeeId);
      const savedEmergency = await EmergencyContact.findOne({ personalIdentityId: employeeId });
      expect(savedEmergency).toHaveProperty('firstName', 'Jane');
    });
  });

  describe('updateEmergencyContact', () => {
    it('should update an emergency contact successfully', async () => {
      const emergency = await EmergencyContact.create({
        personalIdentityId: employeeId,
        lastName: 'Doe',
        firstName: 'Jane',
        relationship: 'Spouse',
        priorityLevel: 1,
        phonePrimary: '+33123456789',
        notificationProtocol: NotificationProtocol.CALL_ONLY,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const contactId = (emergency as any)._id.toString();
      const updateData = {
        firstName: 'John',
        lastName: 'Smith',
        phonePrimary: '+33987654321',
        notificationProtocol: NotificationProtocol.ALL_METHODS,
      };

      const result = await ContactInformationService.updateEmergencyContact(contactId, updateData);

      expect(result).toHaveProperty('firstName', 'John');
      expect(result).toHaveProperty('lastName', 'Smith');
      expect(result).toHaveProperty('phonePrimary', '+33987654321');

      const updatedEmergency = await EmergencyContact.findById(contactId);
      expect(updatedEmergency).toHaveProperty('firstName', 'John');
    });

    it('should throw error if emergency contact not found', async () => {
      const invalidId = new mongoose.Types.ObjectId().toString();
      const updateData = { firstName: 'John' };

      await expect(
        ContactInformationService.updateEmergencyContact(invalidId, updateData)
      ).rejects.toThrow('Emergency contact not found');
    });
  });

  describe('updateContactPreferences', () => {
    it('should update contact preferences successfully', async () => {
      const preferencesData = {
        preferredContactMethod: PreferredContactMethod.EMAIL,
        preferredLanguage: 'fr',
        optOutMarketing: false,
        optOutNonEssential: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await ContactInformationService.updateContactPreferences(employeeId, preferencesData);

      expect(result).toHaveProperty('preferredContactMethod', PreferredContactMethod.EMAIL);
      expect(result).toHaveProperty('preferredLanguage', 'fr');

      const savedPreference = await ContactPreference.findOne({ personalIdentityId: employeeId });
      expect(savedPreference).toHaveProperty('preferredContactMethod', PreferredContactMethod.EMAIL);
    });

    it('should create contact preferences if none exist (upsert)', async () => {
      const preferencesData = {
        preferredContactMethod: PreferredContactMethod.PHONE,
        preferredLanguage: 'en',
        optOutMarketing: true,
        optOutNonEssential: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await ContactInformationService.updateContactPreferences(employeeId, preferencesData);
      expect(result).toHaveProperty('preferredContactMethod', PreferredContactMethod.PHONE);
      expect(result.personalIdentityId.toString()).toBe(employeeId);
      const savedPreference = await ContactPreference.findOne({ personalIdentityId: employeeId });
      expect(savedPreference).toHaveProperty('preferredContactMethod', PreferredContactMethod.PHONE);
    });
  });

  describe('getContactPreferences', () => {
    it('should retrieve contact preferences successfully', async () => {
      await ContactPreference.create({
        personalIdentityId: employeeId,
        preferredContactMethod: PreferredContactMethod.EMAIL,
        preferredLanguage: 'fr',
        optOutMarketing: false,
        optOutNonEssential: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await ContactInformationService.getContactPreferences(employeeId);

      expect(result).toHaveProperty('preferredContactMethod', PreferredContactMethod.EMAIL);
      expect(result).toHaveProperty('preferredLanguage', 'fr');
    });

    it('should return null if no preferences exist', async () => {
      const result = await ContactInformationService.getContactPreferences(employeeId);

      expect(result).toBeNull();
    });
  });

  describe('validateContactInformation', () => {
    it('should validate contact information correctly', async () => {
      await PostalAddress.create({
        personalIdentityId: employeeId,
        addressType: AddressType.HOME,
        isPrimary: true,
        streetLine1: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        countryCode: 'FR',
        addressVerificationStatus: VerificationStatus.VERIFIED,
        effectiveDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await PhoneContact.create({
        personalIdentityId: employeeId,
        phoneType: PhoneType.MOBILE,
        isPrimary: true,
        countryCode: '+33',
        phoneNumber: 123456789, // Changed to Number
        isMessagingEnabled: true,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await ElectronicContact.create({
        personalIdentityId: employeeId,
        contactType: ElectronicContactType.EMAIL,
        isPrimary: true,
        contactValue: 'test@example.com',
        purpose: ContactPurpose.GENERAL,
        verificationStatus: VerificationStatus.VERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await EmergencyContact.create({
        personalIdentityId: employeeId,
        lastName: 'Doe',
        firstName: 'Jane',
        relationship: 'Spouse',
        priorityLevel: 1,
        phonePrimary: '+33123456789',
        notificationProtocol: NotificationProtocol.CALL_ONLY,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await ContactPreference.create({
        personalIdentityId: employeeId,
        preferredContactMethod: PreferredContactMethod.EMAIL,
        preferredLanguage: 'fr',
        optOutMarketing: false,
        optOutNonEssential: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await ContactInformationService.validateContactInformation(employeeId);

      expect(result).toEqual({
        hasValidAddress: true,
        hasValidPhone: true,
        hasValidEmail: true,
        hasEmergencyContact: true,
        hasPreferences: true,
      });
    });

    it('should return false for validations when no valid data exists', async () => {
      const result = await ContactInformationService.validateContactInformation(employeeId);

      expect(result).toEqual({
        hasValidAddress: false,
        hasValidPhone: false,
        hasValidEmail: false,
        hasEmergencyContact: false,
        hasPreferences: false,
      });
    });
  });

  describe('initiateContactVerification', () => {
    it('should initiate contact verification successfully', async () => {
      const contactType = ElectronicContactType.EMAIL;
      const contactId = new mongoose.Types.ObjectId().toString();

      const result = await ContactInformationService.initiateContactVerification(employeeId, contactType, contactId);

      expect(result).toEqual({ status: 'Verification initiated' });
    });
  });

  describe('recordVerificationResult', () => {
    it('should record verification result successfully', async () => {
      const verificationId = new mongoose.Types.ObjectId().toString();
      const status = VerificationStatus.VERIFIED;

      const result = await ContactInformationService.recordVerificationResult(verificationId, status);

      expect(result).toEqual({ status: 'Verification recorded' });
    });
  });
});