import Joi from 'joi';
import { maritalStatusSchema } from '../../validator/family-situation.validator';
import { MaritalStatusModel } from '../../models/familySituation/marital-status.model';
import { PersonalIdentityModel } from '../../models/civilStatus/personalIdentity.model';
import { DataHistoryModel } from '../../models/civilStatus/dataHistory.model';
import { IMaritalStatus } from '../../types/familySituation/IMaritalStatus.type';
import mongoose from 'mongoose';

export class MaritalStatusService {
  static async registerMaritalStatus(personalIdentityId: string, data: Partial<IMaritalStatus>, modifiedBy: string): Promise<IMaritalStatus> {
    const validation = maritalStatusSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for maritalStatus: ${errors.join(', ')}`);
    }

    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
    });
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    const previousStatus = await MaritalStatusModel.findOne({
      personalIdentityId: personalIdentity._id,
      endDate: null,
    });
    if (previousStatus && data.effectiveDate) {
      previousStatus.endDate = new Date(data.effectiveDate);
      await previousStatus.save();

      await DataHistoryModel.create({
        entityId: previousStatus._id.toString(),
        entityType: 'MaritalStatus',
        previousState: { ...previousStatus.toObject(), endDate: null },
        currentState: previousStatus.toObject(),
        modifiedBy,
        modificationType: 'UPDATE',
      });
    }

    const maritalStatus = await MaritalStatusModel.create({
      personalIdentityId: personalIdentity._id,
      statusType: data.statusType,
      effectiveDate: new Date(data.effectiveDate!),
      documentReference: data.documentReference,
    });

    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState: {},
      currentState: maritalStatus.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });

    return maritalStatus;
  }

  static async getMaritalStatus(maritalStatusId: string): Promise<IMaritalStatus> {
    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }
    return maritalStatus;
  }

  static async getMaritalStatusesByPersonalIdentity(personalIdentityId: string): Promise<IMaritalStatus[]> {
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }
    return MaritalStatusModel.find({ personalIdentityId: personalIdentity._id });
  }

  static async updateMaritalStatus(maritalStatusId: string, data: Partial<IMaritalStatus>, modifiedBy: string): Promise<IMaritalStatus> {
    const validation = maritalStatusSchema.validate(data, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for maritalStatus: ${errors.join(', ')}`);
    }

    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }

    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: maritalStatus.personalIdentityId,
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }

    const previousState = maritalStatus.toObject();

    Object.assign(maritalStatus, {
      statusType: data.statusType ?? maritalStatus.statusType,
      effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : maritalStatus.effectiveDate,
      documentReference: data.documentReference ?? maritalStatus.documentReference,
      endDate: data.endDate ? new Date(data.endDate) : maritalStatus.endDate,
    });

    await maritalStatus.save();

    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState,
      currentState: maritalStatus.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    return maritalStatus;
  }

  static async deleteMaritalStatus(maritalStatusId: string, modifiedBy: string): Promise<void> {
    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }

    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState: maritalStatus.toObject(),
      currentState: {},
      modifiedBy,
      modificationType: 'DELETE',
    });

    await maritalStatus.deleteOne();
  }
}