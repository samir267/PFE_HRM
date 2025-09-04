import EmployeeAssignmentModel from "../../models/Affectation/employeeAssignment.model";
import { IAssignment } from "../../types/Affectation/employeeAssignment.type";
import { Types } from "mongoose";
import {employeeassignmentSchema } from "../../validator/Affectation/affectation.validator";

class EmployeeAssignmentService {


  async createAssignment(data: Omit<IAssignment,  "createdAt" | "updatedAt">): Promise<IAssignment> {
  // Valider les données
  const { error } = employeeassignmentSchema.validate(data, { abortEarly: false });

  if (error) {
    throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
  }

  // Créer l'affectation dans la base
  return await EmployeeAssignmentModel.create(data);
}

  async getAllAssignments(filter: Partial<IAssignment> = {}): Promise<IAssignment[]> {
    return await EmployeeAssignmentModel.find(filter)
    // .populate('employeeId positionId createdBy approvedBy')
    .exec();
  }

  async getAssignmentById(id: string): Promise<IAssignment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    return await EmployeeAssignmentModel.findById(id)
    // .populate('employeeId positionId createdBy approvedBy')
    .exec();
  }

  async updateAssignment(id: string, data: Partial<IAssignment>): Promise<IAssignment | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
     const { error } = employeeassignmentSchema.validate(data, { abortEarly: false });

  if (error) {
    throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
  }

    const updated = await EmployeeAssignmentModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error("Assignment not found");
    return updated;
  }

async deleteAssignment(id: string): Promise<IAssignment | null> {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  return await EmployeeAssignmentModel.findByIdAndDelete(id); // renvoie le doc supprimé ou null
}


  async getAssignmentsByEmployee(employeeId: string): Promise<IAssignment[]> {
    if (!Types.ObjectId.isValid(employeeId)) throw new Error("Invalid Employee ID format");
    return await EmployeeAssignmentModel.find({ employeeId })
    // .populate('positionId')
    .exec();
  }

  async isAssignmentActive(assignmentId: string): Promise<boolean> {
    const assignment = await this.getAssignmentById(assignmentId);
    if (!assignment) throw new Error("Assignment not found");
    return assignment.assignmentStatus === 'ACTIVE';
  }
}

export default new EmployeeAssignmentService();
