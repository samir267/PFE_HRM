import mongoose, { Schema } from "mongoose";
import { ICompensation } from "../../types/Affectation/compensation.type";

const CompensationSchema: Schema = new Schema({
  assignmentId: { type: Schema.Types.ObjectId, ref: 'EmployeeAssignment', required: true },
  effectiveDate: { type: Date, required: true },
  endDate: Date,
  baseSalary: { type: Number, required: true },
  salaryCurrency: { type: String, required: true, maxlength: 3 },
  payFrequency: { type: String, enum: ['MONTHLY','BIWEEKLY','WEEKLY','HOURLY'], required: true },
  hourlyRate: Number,
  salaryGrade: { type: Number, required: true },
  salaryStep: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model<ICompensation>('Compensation', CompensationSchema);