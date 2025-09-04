import mongoose, { Schema } from "mongoose";
import { IPosition } from "../../types/Affectation/position.type";

const PositionSchema: Schema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  jobClassificationId: { type: Schema.Types.ObjectId, ref: 'JobClassification', required: true },
  reportingPositionId: { type: Schema.Types.ObjectId, ref: 'Position' },
  positionType: { type: String, enum: ['PERMANENT', 'TEMPORARY', 'PROJECT_BASED'], required: true },
  minSalaryGrade: { type: Number, required: true },
  maxSalaryGrade: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  budgetCode: { type: String, required: true, maxlength: 50 },
  headcountLimit: { type: Number, required: true },
}, { timestamps: true });
export default mongoose.model<IPosition>('Position', PositionSchema);