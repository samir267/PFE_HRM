import { CareerPositionModel } from '../../models/Career&SalaryManagement/CareerPosition.model';
import { ICareerPosition } from '../../types/Career&SalaryManagement/careerPosition.type';
import { careerPositionValidator } from '../../validator/Career&SalaryManagement/career_salary.validator';
import { Types } from 'mongoose';

export class CareerPositionService {
  // CREATE
  static async createCareerPosition(data: ICareerPosition): Promise<ICareerPosition> {
    const { error } = careerPositionValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);

    if (new Date(data.startdate) > new Date()) {
      throw new Error('La date de début ne peut pas être dans le futur.');
    }

    const existingActive = await CareerPositionModel.findOne({
      personalIdentityId: data.personalidentityid,
      isCurrent: true,
    });

    if (existingActive) {
      throw new Error('Un poste actif existe déjà pour cet employé.');
    }

    return await CareerPositionModel.create(data);
  }

  // CLOSE current position (set isCurrent: false)
  static async closeCurrentPosition(personalIdentityId: string): Promise<void> {
    await CareerPositionModel.updateMany(
      { personalIdentityId, isCurrent: true },
      { isCurrent: false, endDate: new Date() }
    );
  }

  // READ - Get all career positions of an employee
  static async getCareerHistory(personalIdentityId: string): Promise<ICareerPosition[]> {
    return await CareerPositionModel.find({ personalIdentityId }).sort({ startDate: 1 });
  }

  // READ - Get by ID
  static async getById(id: string): Promise<ICareerPosition | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return await CareerPositionModel.findById(id);
  }

  // UPDATE - Modify a specific career position
  static async updateCareerPosition(id: string, updateData: Partial<ICareerPosition>): Promise<ICareerPosition | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    const { error } = careerPositionValidator.validate(updateData, { allowUnknown: true });
    if (error) throw new Error(`Validation error: ${error.message}`);

    return await CareerPositionModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // DELETE
  static async deleteCareerPosition(id: string): Promise<ICareerPosition | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return await CareerPositionModel.findByIdAndDelete(id);
  }
}
