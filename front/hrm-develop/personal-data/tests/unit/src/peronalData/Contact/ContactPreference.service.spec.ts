import mongoose from 'mongoose';
import ContactPreferenceService from '../../../../../src/service/contact/contact-preference.service';
import ContactPreference from '../../../../../src/models/contact/ContactPreference.model';
import { ContactPreference as ContactPreferenceType, PreferredContactMethod } from '../../../../../src/types/contact/contactTypes.type';
import { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


describe('ContactPreferenceService', () => {
  let mongoServer: MongoMemoryServer;
  let employeeId: Types.ObjectId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    employeeId = new mongoose.Types.ObjectId();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await ContactPreference.deleteMany({});
  });

  it('should create new contact preferences if none exist', async () => {
    const preferencesData = {
      personalIdentityId: employeeId,
        preferredContactMethod: PreferredContactMethod.EMAIL, 
    preferredLanguage: 'fr',
      optOutMarketing: false,
      optOutNonEssential: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ContactPreferenceService.updateContactPreferences(
      employeeId.toString(),
      preferencesData
    );

    expect(result).toBeDefined();
    expect(result?.preferredLanguage).toBe('fr');
    expect(result?.optOutNonEssential).toBe(true);
  });

  it('should update existing contact preferences', async () => {
    await ContactPreference.create({
      personalIdentityId: employeeId,
      preferredContactMethod: 'PHONE',
      preferredLanguage: 'en',
      optOutMarketing: false,
      optOutNonEssential: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const updated = await ContactPreferenceService.updateContactPreferences(employeeId.toString(), {
      preferredLanguage: 'ar',
      optOutNonEssential: true,
    });

    expect(updated).toBeDefined();
    expect(updated?.preferredLanguage).toBe('ar');
    expect(updated?.optOutNonEssential).toBe(true);
  });

  it('should get contact preferences by employee ID', async () => {
    await ContactPreference.create({
      personalIdentityId: employeeId,
      preferredContactMethod: 'PHONE',
      preferredLanguage: 'en',
      optOutMarketing: false,
      optOutNonEssential: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await ContactPreferenceService.getContactPreferences(employeeId.toString());

    expect(result).not.toBeNull();
    expect(result?.preferredLanguage).toBe('en');
  });
});