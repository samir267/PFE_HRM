import { Schema, model } from "mongoose";
import { ICareerDevelopment } from "../../types/Career&SalaryManagement/careerDevelopment.type";

const CareerDevelopmentSchema = new Schema<ICareerDevelopment>({
  personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  discussionDate: { type: Date, required: true },
  careerGoals: { type: String },
  desiredPositions: { type: String, maxlength: 200 },
  mobilityPreferences: { type: String, enum: ['LOCAL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'REMOTE'], required: true },
  developmentAreas: { type: String },
  actionPlan: { type: String },
  timeframe: { type: String, maxlength: 50 },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nextReviewDate: { type: Date },
}, { timestamps: true });

export const CareerDevelopmentModel = model<ICareerDevelopment>('CareerDevelopment', CareerDevelopmentSchema);
