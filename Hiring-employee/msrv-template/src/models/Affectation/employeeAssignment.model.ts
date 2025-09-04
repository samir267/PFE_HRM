import mongoose, { Schema } from "mongoose";
import { IAssignment } from "../../types/Affectation/employeeAssignment.type";

const AssignmentSchema: Schema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, required: true },
  positionId: { type: Schema.Types.ObjectId, ref: 'Position', required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  assignmentType: { type: String, enum: ['PRIMARY','SECONDARY','TEMPORARY'], required: true },
  employmentType: { type: String, enum: ['FULLTIME','PARTTIME','CONTRACTOR','INTERN'], required: true },
  fteRatio: { type: Number, required: true, min: 0, max: 1 },
  probationPeriodMonths: { type: Number, required: true },
  probationEndDate: Date,
  assignmentStatus: { type: String, enum: ['ACTIVE','PLANNED','TERMINATED','SUSPENDED'], required: true },
  terminationReason: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model<IAssignment>('EmployeeAssignment', AssignmentSchema);