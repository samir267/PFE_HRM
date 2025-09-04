import { SkillAssessmentModel } from '../../models/Career&SalaryManagement/skillAssessment.model';
import { ISkillAssessment } from '../../types/Career&SalaryManagement/skillAssessment.type';
import { skillAssessmentValidator } from '../../validator/Career&SalaryManagement/career_salary.validator';
import { Types } from 'mongoose';

export class SkillAssessmentService {
  // CREATE
  static async addSkillAssessment(data: ISkillAssessment): Promise<ISkillAssessment> {
    const { error } = skillAssessmentValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);

    if (data.certificationDate && data.expirationDate && new Date(data.certificationDate) > new Date(data.expirationDate)) {
      throw new Error('La date de certification ne peut pas être après la date d’expiration.');
    }

    return await SkillAssessmentModel.create(data);
  }

  // READ - Get expiring certifications in next month
  static async getExpiringCertifications(personalIdentityId: Types.ObjectId): Promise<ISkillAssessment[]> {
    const today = new Date();
    return await SkillAssessmentModel.find({
      personalIdentityId,
      expirationDate: { 
        $exists: true, 
        $gte: today, 
        $lte: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()) 
      }
    });
  }

  // READ - Get by ID
  static async getById(id: string): Promise<ISkillAssessment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return await SkillAssessmentModel.findById(id);
  }

  // UPDATE - Modify skill assessment
  static async updateSkillAssessment(id: string, updateData: Partial<ISkillAssessment>): Promise<ISkillAssessment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');

    const { error } = skillAssessmentValidator.validate(updateData, { allowUnknown: true });
    if (error) throw new Error(`Validation error: ${error.message}`);

    if (
      updateData.certificationDate && updateData.expirationDate &&
      new Date(updateData.certificationDate) > new Date(updateData.expirationDate)
    ) {
      throw new Error('La date de certification ne peut pas être après la date d’expiration.');
    }

    return await SkillAssessmentModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  static async deleteSkillAssessment(id: string): Promise<ISkillAssessment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return await SkillAssessmentModel.findByIdAndDelete(id);
  }

  // VERIFY - Update verification status
  static async verifySkill(id: string, status: 'VERIFIED' | 'PENDING' | 'REJECTED'): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    await SkillAssessmentModel.findByIdAndUpdate(id, { verificationStatus: status });
  }
}
