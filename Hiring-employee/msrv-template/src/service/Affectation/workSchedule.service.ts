import { WorkScheduleModel } from "../../models/Affectation/workSchedule.model";
import { IWorkSchedule } from "../../types/Affectation/workSchedule.type";
import { workScheduleSchema } from "../../validator/Affectation/affectation.validator";
import { Types } from "mongoose";

class WorkScheduleService {
  async createSchedule(data: Omit<IWorkSchedule,  "createdAt" | "updatedAt">): Promise<IWorkSchedule> {
    const { error } = workScheduleSchema.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    if (data.hoursPerWeek <= 0) throw new Error("hoursPerWeek must be positive");
    return await WorkScheduleModel.create(data);
  }

  async getAllSchedules(filter: Partial<IWorkSchedule> = {}): Promise<IWorkSchedule[]> {
    return await WorkScheduleModel.find(filter).exec();
  }

  async getScheduleById(id: string): Promise<IWorkSchedule | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    return await WorkScheduleModel.findById(id).exec();
  }

  async updateSchedule(id: string, data: Partial<IWorkSchedule>): Promise<IWorkSchedule | null> {
    const { error } = workScheduleSchema.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    if (data.hoursPerWeek !== undefined && data.hoursPerWeek <= 0) throw new Error("hoursPerWeek must be positive");

    const updated = await WorkScheduleModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("WorkSchedule not found");
    return updated;
  }

  async deleteSchedule(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    await WorkScheduleModel.findByIdAndDelete(id);
  }

  async getSchedulesByAssignment(assignmentId: string): Promise<IWorkSchedule[]> {
    if (!Types.ObjectId.isValid(assignmentId)) throw new Error("Invalid Assignment ID");
    return await WorkScheduleModel.find({ assignmentId }).exec();
  }
}

export default new WorkScheduleService();
