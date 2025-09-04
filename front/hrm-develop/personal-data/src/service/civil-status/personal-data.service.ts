import { Types } from 'mongoose';
import { CountryReferenceModel } from '../../models/civilStatus/countryReference.model';
import { NationalityModel } from '../../models/civilStatus/nationality.model';
import { PersonalIdentityModel } from '../../models/civilStatus/personalIdentity.model';
import { IPersonalIdentity } from '../../types/personalData/personalIdentity.type';
import { personalIdentitySchema, partialPersonalIdentitySchema } from '../../validator/personalDataValidator';
import { DataHistoryService } from './data-history.service';
import { BirthInformationModel } from '../../models/civilStatus/birthInformation.model';
import { DataHistoryModel } from '../../models/civilStatus/dataHistory.model';
import logger from '../../configs/logger.config';

export class PersonalIdentityService {
  // Create PersonalIdentity


   static async generateRegistrationNumber(): Promise<string> {
  const prefix = 'PD-';
  const lastEntry = await PersonalIdentityModel
    .findOne({ registrationNumber: { $regex: `^${prefix}\\d+$` } })
    .sort({ registrationNumber: -1 })
    .lean();

  let nextNumber = 1;
  if (lastEntry?.registrationNumber) {
    const lastNumber = parseInt(lastEntry.registrationNumber.replace(prefix, ''), 10);
    nextNumber = lastNumber + 1;
  }

  const registrationNumber = `${prefix}${String(nextNumber).padStart(4, '0')}`;
  const exists = await PersonalIdentityModel.findOne({ registrationNumber });
  if (exists) {
    throw new Error('Generated registration number already exists');
  }

  return registrationNumber;
}


static async createPersonalIdentity(
    data: {
      personalIdentity: Partial<IPersonalIdentity>;
      birthInformation: {
        dateOfBirth: string;
        placeOfBirth: string;
        countryOfBirthCode: string;
      };
      nationalities: Array<{ nationalityId: string; isPrimary?: boolean; isResident?: boolean }>;
    },
    modifiedBy: string
  ) {
    try {
      logger.info('Input received in PersonalIdentityService: %j', data);

      // Validate input
      const validation = personalIdentitySchema.validate(data, { abortEarly: false });
      if (validation.error) {
        throw new Error(`Validation failed: ${validation.error.details.map(detail => detail.message).join(', ')}`);
      }

      

      // Process nationalities
      const nationalityEntries: Array<{ nationalityId: Types.ObjectId; isPrimary: boolean; isResident: boolean }> = [];
      const uniqueNationalityIds = new Set<string>();

      const nationalityIds = data.nationalities.map(nat => {
        if (!Types.ObjectId.isValid(nat.nationalityId)) {
          console.log(`Invalid ObjectId: ${nat.nationalityId}`);
          throw new Error(`Invalid ObjectId for nationalityId: ${nat.nationalityId}`);
        }
        console.log(`Valid nationalityId: ${nat.nationalityId}`);
        return new Types.ObjectId(nat.nationalityId);
      });

      const nationalities = await NationalityModel.find({ _id: { $in: nationalityIds } });
      const nationalityMap = new Map(nationalities.map(n => [n._id.toString(), n]));

      for (const nat of data.nationalities || []) {
        if (uniqueNationalityIds.has(nat.nationalityId)) {
          throw new Error(`Duplicate nationality ID: ${nat.nationalityId}`);
        }
        uniqueNationalityIds.add(nat.nationalityId);

        const nationality = nationalityMap.get(nat.nationalityId);
        if (!nationality) {
          throw new Error(`Nationality not found for nationalityId: ${nat.nationalityId}`);
        }

        nationalityEntries.push({
          nationalityId: nationality._id,
          isPrimary: nat.isPrimary || false,
          isResident: nat.isResident || false,
        });
      }

      // Validate exactly one primary nationality
      const primaryCount = nationalityEntries.filter(n => n.isPrimary).length;
      if (primaryCount !== 1) {
        throw new Error('Exactly one nationality must be marked as primary');
      }

      // Validate countryOfBirthCode
      const countryOfBirth = await CountryReferenceModel.findOne({
        countryCode: data.birthInformation.countryOfBirthCode,
      });
      if (!countryOfBirth) {
        throw new Error(`Country not found for countryOfBirthCode: ${data.birthInformation.countryOfBirthCode}`);
      }

      // Prepare personal identity data
      const personalIdentityData = {
        title: data.personalIdentity.title,
        lastName: data.personalIdentity.lastName,
        firstName: data.personalIdentity.firstName,
        middleName: data.personalIdentity.middleName,
        suffix: data.personalIdentity.suffix,
        gender: data.personalIdentity.gender,
        isActive: data.personalIdentity.isActive ?? true,
        deletedAt: undefined,
        archiveReason: undefined,
        nationalities: nationalityEntries,
        identityDocuments: data.personalIdentity.identityDocuments,
        registrationNumber: await this.generateRegistrationNumber(),
      };

      // Create personal identity
      let identity;
      try {
        identity = await PersonalIdentityModel.create(personalIdentityData);
      } catch (error: any) {
        throw new Error(`Failed to create personal identity: ${error.message}`);
      }

      // Create birth information
      // try {
      //   await BirthInformationModel.create({
      //     personalIdentityId: identity._id,
      //     dateOfBirth: new Date(data.birthInformation.dateOfBirth),
      //     placeOfBirth: data.birthInformation.placeOfBirth,
      //     countryOfBirthCode: data.birthInformation.countryOfBirthCode,
      //   });
      // } catch (error: any) {
      //   await PersonalIdentityModel.deleteOne({ _id: identity._id });
      //   throw new Error(`Failed to create birth information: ${error.message}`);
      // }
const birthInfo = await BirthInformationModel.create({
      personalIdentityId: identity._id,
      dateOfBirth: new Date(data.birthInformation.dateOfBirth),
      placeOfBirth: data.birthInformation.placeOfBirth,
      countryOfBirthCode: data.birthInformation.countryOfBirthCode,
    });
      // Log history
      try {
        await DataHistoryModel.create({
          entityId: identity._id.toString(),
          entityType: 'PersonalIdentity',
          previousState: {},
          currentState: identity.toObject(),
          modifiedBy,
          modificationType: 'CREATE',
        });
      } catch (error: any) {
        await PersonalIdentityModel.deleteOne({ _id: identity._id });
        await BirthInformationModel.deleteOne({ personalIdentityId: identity._id });
        throw new Error(`Failed to log history: ${error.message}`);
      }

      const identityWithBirthInfo = {
      ...identity.toObject(),
      birthInformation: {
        dateOfBirth: birthInfo.dateOfBirth,
        placeOfBirth: birthInfo.placeOfBirth,
        countryOfBirthCode: birthInfo.countryOfBirthCode,
      },
    };

    return identityWithBirthInfo;
    } catch (error: any) {
      logger.error('Error creating personal identity:', error);
      throw error;
    }
  }

  static async updatePersonalIdentity(
  id: string,
  data: {
    personalIdentity?: any;
    nationalities?: Array<{ nationalityId: string; isPrimary?: boolean; isResident?: boolean }>;
  },
  modifiedBy: string
) {
  try {
    // Validate personalIdentity input
    const validation = partialPersonalIdentitySchema.validate(data.personalIdentity || {}, { abortEarly: false });
    if (validation.error) {
      throw new Error(`Validation failed for personalIdentityy: ${validation.error.details.map(d => d.message).join(', ')}`);
    }

    // Check if the PersonalIdentity exists
    const previousState = await PersonalIdentityModel.findById(id);
    if (!previousState) {
      throw new Error('PersonalIdentity not found or inactive');
    }

    // Process nationalities if provided
    let nationalityEntries: Array<{ nationalityId: Types.ObjectId; isPrimary: boolean; isResident: boolean }> = previousState.nationalities;
    if (data.nationalities) {
      // Get existing nationality IDs from the PersonalIdentity document
      const existingNationalityIds = new Set(previousState.nationalities.map(n => n.nationalityId.toString()));
      const inputNationalityIds = new Set(data.nationalities.map(n => n.nationalityId));

      // Check if input nationalities exactly match existing nationalities (no additions or removals)
      if (inputNationalityIds.size !== existingNationalityIds.size || 
          ![...inputNationalityIds].every(id => existingNationalityIds.has(id))) {
        throw new Error('Provided nationality IDs must exactly match the existing nationality IDs in PersonalIdentity');
      }

      // Validate nationality IDs
      const nationalityIds = data.nationalities.map((nat) => {
        if (!Types.ObjectId.isValid(nat.nationalityId)) {
          throw new Error(`Invalid ObjectId for nationalityId: ${nat.nationalityId}`);
        }
        return new Types.ObjectId(nat.nationalityId);
      });

      // Validate nationalities against NationalityModel
      const nationalities = await NationalityModel.find({ _id: { $in: nationalityIds } });
      const nationalityMap = new Map(nationalities.map(n => [n._id.toString(), n]));

      // Update isPrimary and isResident for existing nationality IDs
      nationalityEntries = data.nationalities.map((nat: { nationalityId: string; isPrimary?: boolean; isResident?: boolean }) => {
        const nationality = nationalityMap.get(nat.nationalityId);
        if (!nationality) {
          throw new Error(`Nationality not found for nationalityId: ${nat.nationalityId}`);
        }

        return {
          nationalityId: nationality._id,
          isPrimary: nat.isPrimary ?? false,
          isResident: nat.isResident ?? false,
        };
      });

      // Validate exactly one primary nationality
      const primaryCount = nationalityEntries.filter(n => n.isPrimary).length;
      if (primaryCount !== 1) {
        throw new Error('Exactly one nationality must be marked as primary');
      }
    }

    // Prepare update data
    const updateData = {
      ...data.personalIdentity,
      nationalities: nationalityEntries, // Include nationalities (updated or existing)
      updatedAt: new Date(),
    };

    // Update PersonalIdentity
    const updatedIdentity = await PersonalIdentityModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedIdentity) {
      throw new Error('Failed to update PersonalIdentity');
    }

    // Log history
    await DataHistoryService.logHistory({
      entityId: id,
      entityType: 'PersonalIdentity',
      previousState: previousState.toObject(),
      currentState: updatedIdentity.toObject(),
      modifiedBy,
      modificationType: 'PARTIAL_UPDATE',
    });

    return updatedIdentity;
  } catch (error: any) {
    logger.error('Error updating personal identity:', error);
    throw error;
  }
}


  // Read PersonalIdentity
  static async readPersonalIdentity(id: string) {
    const identity = await PersonalIdentityModel.findById(id).where('isActive').equals(true);
    if (!identity) {
      throw new Error('PersonalIdentity not found or inactive');
    }
    return identity;
  }

  // Read All PersonalIdentities
  static async readAllPersonalIdentities(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const identities = await PersonalIdentityModel.find({ isActive: true })
      .skip(skip)
      .limit(limit);

    const total = await PersonalIdentityModel.countDocuments({ isActive: true });

    return { identities, pagination: { page, limit, total } };
  }

  // Read All Deleted PersonalIdentities
  static async readAllPersonalIdentitiesDeleted(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const identities = await PersonalIdentityModel.find({ isActive: false })
      .skip(skip)
      .limit(limit);

    const total = await PersonalIdentityModel.countDocuments({ isActive: false });

    return { identities, pagination: { page, limit, total } };
  }

  // Delete PersonalIdentity (soft delete)
  static async deletePersonalIdentity(id: string, modifiedBy: string) {
    const identity = await PersonalIdentityModel.findById(id);
    if (!identity || !identity.isActive) {
      throw new Error('PersonalIdentity not found or inactive');
    }

    identity.isActive = false;
    identity.deletedAt = new Date();
    const updatedIdentity = await identity.save();

    await DataHistoryService.logHistory({
      entityId: id,
      entityType: 'PersonalIdentity',
      previousState: identity.toObject(),
      currentState: updatedIdentity.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    

    return updatedIdentity;
  }
}

