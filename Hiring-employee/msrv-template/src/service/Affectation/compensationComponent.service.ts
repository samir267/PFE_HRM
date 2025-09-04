import CompensationComponentModel from "../../models/Affectation/compensationComponent.model";
import { Types } from "mongoose";
import { compensationComponentSchema } from "../../validator/Affectation/affectation.validator";
import { ICompensationComponent } from "../../types/Affectation/compensation-component.type";

class CompensationComponentService {
  async createComponent(data: Omit<ICompensationComponent, "createdAt" | "updatedAt">): Promise<ICompensationComponent> {
    const { error } = compensationComponentSchema.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    if (data.amountvalue !== undefined && data.amountvalue < 0) throw new Error("amountvalue must be non-negative");
    if (data.amountpercentage !== undefined && data.amountpercentage < 0) throw new Error("amount_percentage must be non-negative");
    return await CompensationComponentModel.create(data);
  }

  async getAllComponents(filter: Partial<ICompensationComponent> = {}): Promise<ICompensationComponent[]> {
    return await CompensationComponentModel.find(filter).exec();
  }

  async getComponentById(id: string): Promise<ICompensationComponent | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    return await CompensationComponentModel.findById(id).exec();
  }

  async updateComponent(id: string, data: Partial<ICompensationComponent>): Promise<ICompensationComponent | null> {
    const { error } = compensationComponentSchema.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    if (data.amountvalue !== undefined && data.amountvalue < 0) throw new Error("amountvalue must be non-negative");
    if (data.amountpercentage !== undefined && data.amountpercentage < 0) throw new Error("amount_percentage must be non-negative");

    const updated = await CompensationComponentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new Error("CompensationComponent not found");
    return updated;
  }

  async deleteComponent(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    const result = await CompensationComponentModel.findByIdAndDelete(id).exec();
    if (!result) throw new Error("CompensationComponent not found");
  }

  async getComponentsBySalaryRecord(salaryRecordId: string): Promise<ICompensationComponent[]> {
    if (!Types.ObjectId.isValid(salaryRecordId)) throw new Error("Invalid Salary Record ID");
    return await CompensationComponentModel.find({ salary_record_id: salaryRecordId }).exec();
  }
}

export default new CompensationComponentService();