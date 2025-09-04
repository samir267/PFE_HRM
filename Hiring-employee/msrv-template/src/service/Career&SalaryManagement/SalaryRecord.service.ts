import { SalaryRecordModel } from '../../models/Career&SalaryManagement/SalaryRecord.model';
import { ISalaryRecordModel } from '../../types/Career&SalaryManagement/salaryRecord.type';
import { salaryRecordValidator } from '../../validator/Career&SalaryManagement/career_salary.validator';
import { Types } from 'mongoose';

export class SalaryRecordService {
  // CREATE
  static async createSalaryRecord(data: ISalaryRecordModel): Promise<ISalaryRecordModel> {
    const { error } = salaryRecordValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);

    const existing = await SalaryRecordModel.findOne({
      careerPositionId: data.careerpositionid,
      endDate: { $exists: false },
    });

    if (existing) {
      throw new Error('Une rémunération active existe déjà pour ce poste.');
    }

    return await SalaryRecordModel.create(data);
  }

  // SPECIAL CASE: Promotion (clôture des anciens enregistrements + création du nouveau)
  static async updateSalaryOnPromotion(personalIdentityId: string, newRecord: ISalaryRecordModel): Promise<ISalaryRecordModel> {
    const { error } = salaryRecordValidator.validate(newRecord);
    if (error) throw new Error(`Validation error: ${error.message}`);

    // Close current active salary records
    await SalaryRecordModel.updateMany(
      { personalIdentityId, endDate: { $exists: false } },
      { endDate: newRecord.effectivedate }
    );

    newRecord.changereason = 'PROMOTION';
    return await SalaryRecordModel.create(newRecord);
  }

  // READ: Get all records by employee
  static async getHistory(personalIdentityId: string): Promise<ISalaryRecordModel[]> {
    return await SalaryRecordModel.find({ personalIdentityId }).sort({ effectiveDate: -1 });
  }

  // READ: Get one by ID
  static async getById(id: string): Promise<ISalaryRecordModel | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return await SalaryRecordModel.findById(id);
  }

  // UPDATE (standard)
  static async update(id: string, updateData: Partial<ISalaryRecordModel>): Promise<ISalaryRecordModel | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    const { error } = salaryRecordValidator.validate(updateData, { allowUnknown: true });
    if (error) throw new Error(`Validation error: ${error.message}`);

    return await SalaryRecordModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  static async delete(id: string): Promise<ISalaryRecordModel | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return await SalaryRecordModel.findByIdAndDelete(id);
  }
}
