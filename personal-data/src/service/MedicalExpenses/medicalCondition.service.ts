import logger from "../../configs/logger.config";
import { MedicalConditionModel } from "../../models/MedicalExpenses/medicalCondition.model";
import { IMedicalCondition } from "../../types/MedicalExpenses/IMedicalCondition.type";
import { medicalConditionValidator } from "../../validator/MedicalExpenses/medicalCondition.validator";


export class MedicalConditionService {
  async create(data: IMedicalCondition) {
    const { error } = await medicalConditionValidator.validate(data);
    if (error) throw new Error(error.message);
    return await MedicalConditionModel.create(data);
  }

  async getAllByEmployee(employeeId: string) {
    return await MedicalConditionModel.find({ employeeid: employeeId });
  }

  async getById(id: string) {
    return await MedicalConditionModel.findById(id);
  }

  async update(id: string, data: Partial<IMedicalCondition>) {
    const { error } = await medicalConditionValidator.validate(data);
    if (error) throw new Error(error.message);
    return await MedicalConditionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await MedicalConditionModel.findByIdAndDelete(id);
  }
}
