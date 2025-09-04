import { BirthInformationModel } from '../../models/civilStatus/birthInformation.model';
import { CountryReferenceModel } from '../../models/civilStatus/countryReference.model';
import { birthInformationSchema } from '../../validator/personalDataValidator';
import { DataHistoryService } from './data-history.service';

export class BirthInformationService {
  // Create BirthInformation
  static async createBirthInformation(birthInformation: any, personalIdentityId: string, modifiedBy: string) {
    const validation = birthInformationSchema.validate(birthInformation, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for birthInformation: ${errors.join(', ')}`);
    }

    const country = await CountryReferenceModel.findOne({ countryCode: birthInformation.countryOfBirthCode });
    if (!country) {
      throw new Error('Invalid countryOfBirthCode');
    }

    const birthInfo = await BirthInformationModel.create({
      ...birthInformation,
      personalIdentityId,
    });

    await DataHistoryService.logHistory({
      entityId: birthInfo._id.toString(),
      entityType: 'BirthInformation',
      previousState: {},
      currentState: birthInfo.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });

    return birthInfo;
  }

  // Update BirthInformation
  static async updateBirthInformation(personalIdentityId: string, birthInformation: any, modifiedBy: string) {
    const validation = birthInformationSchema.validate(birthInformation, { abortEarly: false });
    if (validation.error) {
      throw new Error(`Validation failed for birthInformation: ${validation.error.details.map(d => d.message).join(', ')}`);
    }

    const country = await CountryReferenceModel.findOne({ countryCode: birthInformation.countryOfBirthCode });
    if (!country) {
      throw new Error('Invalid countryOfBirthCode');
    }

    const previousState = await BirthInformationModel.findOne({ personalIdentityId });
    if (!previousState) {
      throw new Error('BirthInformation not found');
    }

    const updatedBirthInfo = await BirthInformationModel.findOneAndUpdate(
      { personalIdentityId },
      { $set: { ...birthInformation, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedBirthInfo) {
      throw new Error('Failed to update BirthInformation');
    }

    await DataHistoryService.logHistory({
      entityId: updatedBirthInfo._id.toString(),
      entityType: 'BirthInformation',
      previousState: previousState.toObject(),
      currentState: updatedBirthInfo.toObject(),
      modifiedBy,
      modificationType: 'PARTIAL_UPDATE',
    });

    return updatedBirthInfo;
  }

  // Read BirthInformation
  static async readBirthInformation(personalIdentityId: string) {
    const birthInfo = await BirthInformationModel.findOne({ personalIdentityId });
    if (!birthInfo) {
      throw new Error('BirthInformation not found');
    }
    return birthInfo;
  }
}