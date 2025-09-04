import { CareerDevelopmentModel } from '../../models/Career&SalaryManagement/careerDevelopment.model';
import { ICareerDevelopment } from '../../types/Career&SalaryManagement/careerDevelopment.type';
import { careerDevelopmentValidator } from '../../validator/Career&SalaryManagement/career_salary.validator';
import { Types } from 'mongoose';

export class CareerDevelopmentService {
  // CREATE
  static async createCareerDevelopment(data: ICareerDevelopment): Promise<ICareerDevelopment> {
    const { error } = careerDevelopmentValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    return await CareerDevelopmentModel.create(data);
  }

  // READ: Get All by personalIdentityId
  static async getDevelopmentPlan(personalIdentityId: string): Promise<ICareerDevelopment[]> {
    return await CareerDevelopmentModel.find({ personalIdentityId });
  }

  // READ: Get by ID
  static async getById(id: string): Promise<ICareerDevelopment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID format');
    return await CareerDevelopmentModel.findById(id);
  }

  // UPDATE
  static async updateCareerDevelopment(id: string, updateData: Partial<ICareerDevelopment>): Promise<ICareerDevelopment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID format');
    const { error } = careerDevelopmentValidator.validate(updateData, { allowUnknown: true });
    if (error) throw new Error(`Validation error: ${error.message}`);

    return await CareerDevelopmentModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  static async deleteCareerDevelopment(id: string): Promise<ICareerDevelopment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID format');
    return await CareerDevelopmentModel.findByIdAndDelete(id);
  }
}
