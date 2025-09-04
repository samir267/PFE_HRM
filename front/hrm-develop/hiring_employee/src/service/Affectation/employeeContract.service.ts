import { EmploymentContractModel } from "../../models/Affectation/employeeContract.model";
import { IEmploymentContract } from "../../types/Affectation/employeeContract.type";
import { Types } from "mongoose";
import { employmentContractSchema } from "../../validator/Affectation/affectation.validator";

class EmploymentContractService {
  async createContract(data: Omit<IEmploymentContract, "_id" | "createdAt" | "updatedAt">): Promise<IEmploymentContract> {
     const { error } = employmentContractSchema.validate(data, { abortEarly: false });
    
      if (error) {
        throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
      }
    // Validation exemple : noticePeriodDays >= 0
    if (data.noticePeriodDays < 0) throw new Error("noticePeriodDays must be >= 0");
    return await EmploymentContractModel.create(data);
  }


  async getAllContracts(filter: Partial<IEmploymentContract> = {}): Promise<IEmploymentContract[]> {
    return await EmploymentContractModel.find(filter)
      // .populate('assignmentId collectiveAgreementId createdBy')
      .exec();
  }

  async getContractById(id: string): Promise<IEmploymentContract | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    return await EmploymentContractModel.findById(id)
      // .populate('assignmentId collectiveAgreementId createdBy')
      .exec();
  }

  async updateContract(id: string, data: Partial<IEmploymentContract>): Promise<IEmploymentContract | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    if (data.noticePeriodDays !== undefined && data.noticePeriodDays < 0) throw new Error("noticePeriodDays must be >= 0");

    const updated = await EmploymentContractModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("EmploymentContract not found");
    return updated;
  }

  async deleteContract(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    await EmploymentContractModel.findByIdAndDelete(id);
  }

  async getContractsByAssignment(assignmentId: string): Promise<IEmploymentContract[]> {
    if (!Types.ObjectId.isValid(assignmentId)) throw new Error("Invalid Assignment ID");
    return await EmploymentContractModel.find({ assignmentId }).exec();
  }
}

export default new EmploymentContractService();
