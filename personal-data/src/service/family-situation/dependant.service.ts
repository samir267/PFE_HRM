import Joi from 'joi';
import { dependantSchema } from '../../validator/family-situation.validator';
import { DependantModel } from '../../models/familySituation/dependant.model';
import { PersonalIdentityModel } from '../../models/civilStatus/personalIdentity.model';
import { DataHistoryModel } from '../../models/civilStatus/dataHistory.model';
import { IDependant } from '../../types/familySituation/IDependant.type';
import { MaritalStatusModel } from '../../models/familySituation/marital-status.model';
import mongoose from 'mongoose';

export class DependantService {
  static async addDependant(personalIdentityId: string, data: Partial<IDependant>, modifiedBy: string): Promise<IDependant> {
    const validation = dependantSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for dependant: ${errors.join(', ')}`);
    }
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
    });
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    const dateOfBirth = new Date(data.dateOfBirth!);

    const date_marital_status = await MaritalStatusModel.findOne({
      personalIdentityId: personalIdentity._id,
    });
    if(validation.value.relationshipType === 'CHILD') {
      
   
    if (date_marital_status) {
      const effectiveDate = new Date(date_marital_status.effectiveDate);
      const diffInMs = dateOfBirth.getTime() - effectiveDate.getTime();
      const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.42);

      if (diffInMonths < 7) {
        throw new Error('Child date of birth must be more than 7 months after effective date');
      }
    }
  }

    if (data.relationshipType === 'CHILD') {
      const age = (new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 0 || age > 25) {
        throw new Error('Child must be between 0 and 25 years old');
      }
    }

    const dependant = await DependantModel.create({
      personalIdentityId: personalIdentity._id,
      relationshipType: data.relationshipType,
      lastName: data.lastName,
      firstName: data.firstName,
      dateOfBirth,
      isFiscallyDependent: data.isFiscallyDependent,
      isPrimaryBeneficiary: data.isPrimaryBeneficiary,
      startDate: new Date(data.startDate!),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });

    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState: {},
      currentState: dependant.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });

    return dependant;
  }

  static async getDependant(dependantId: string): Promise<IDependant> {
    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }
    return dependant;
  }

  static async getDependantsByPersonalIdentity(personalIdentityId: string): Promise<IDependant[]> {
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }
    return DependantModel.find({ personalIdentityId: personalIdentity._id });
  }

  static async updateDependant(dependantId: string, data: Partial<IDependant>, modifiedBy: string): Promise<IDependant> {
    const validation = dependantSchema.validate(data, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for dependant: ${errors.join(', ')}`);
    }

    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }

    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: dependant.personalIdentityId,
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }

    if (data.dateOfBirth && data.relationshipType === 'CHILD') {
      const dateOfBirth = new Date(data.dateOfBirth);
      const age = (new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 0 || age > 25) {
        throw new Error('Child must be between 0 and 25 years old');
      }
    }

    const previousState = dependant.toObject();

    Object.assign(dependant, {
      relationshipType: data.relationshipType ?? dependant.relationshipType,
      lastName: data.lastName ?? dependant.lastName,
      firstName: data.firstName ?? dependant.firstName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : dependant.dateOfBirth,
      isFiscallyDependent: data.isFiscallyDependent ?? dependant.isFiscallyDependent,
      isPrimaryBeneficiary: data.isPrimaryBeneficiary ?? dependant.isPrimaryBeneficiary,
      startDate: data.startDate ? new Date(data.startDate) : dependant.startDate,
      endDate: data.endDate ? new Date(data.endDate) : dependant.endDate,
    });

    await dependant.save();

    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState,
      currentState: dependant.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    return dependant;
  }

  static async deleteDependant(dependantId: string, modifiedBy: string): Promise<void> {
    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }

    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState: dependant.toObject(),
      currentState: {},
      modifiedBy,
      modificationType: 'DELETE',
    });

    await dependant.deleteOne();
  }
}