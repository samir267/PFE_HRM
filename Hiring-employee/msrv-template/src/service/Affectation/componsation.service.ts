import CompensationModel from "../../models/Affectation/compensation.model";
import { ICompensation } from "../../types/Affectation/compensation.type";
import { Types } from "mongoose";
import { compensationSchema } from "../../validator/Affectation/affectation.validator";
import logger from "../../configs/logger.config";

class CompensationService {
async createCompensation(data: Omit<ICompensation, "createdAt" | "updatedAt">): Promise<ICompensation> {
  const { error } = compensationSchema.validate(data);
  if (error) throw new Error(`Validation error: ${error.message}`);
  return await CompensationModel.create(data);

}


  async getAllCompensations(filter: Partial<ICompensation> = {}): Promise<ICompensation[]> {
    const compensation = await CompensationModel.find(filter).exec();
    // console.log("aaaaaaa",compensation);
    return compensation;
  }

  async getCompensationById(id: string): Promise<ICompensation | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    return await CompensationModel.findById(id)
      .exec();
  }

  async updateCompensation(id: string, data: Partial<ICompensation>): Promise<ICompensation | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
   const { error } = compensationSchema.validate(data);
  if (error) throw new Error(`Validation error: ${error.message}`);
    if (data.baseSalary !== undefined && data.baseSalary <= 0) {
      throw new Error("baseSalary must be positive");
    }

    const updated = await CompensationModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("Compensation not found");
    return updated;
  }

  async deleteCompensation(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try{
      const deleted=await CompensationModel.findByIdAndDelete(id);
      if(!deleted) throw new Error("Compensation not found");
      
    } catch (error) {
      logger.error("Error deleting compensation:", error);
      throw error;
    }
  }
}

export default new CompensationService();
