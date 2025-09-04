import { model, Schema } from "mongoose";
import { ISkillAssessment } from "../../types/Career&SalaryManagement/skillAssessment.type";

const SkillAssessmentSchema = new Schema<ISkillAssessment>({
  personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  skillName: { type: String, required: true, maxlength: 100 },
  skillCategory: { type: String, required: true, maxlength: 50 },
  proficiencyLevel: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'], required: true },
  assessmentDate: { type: Date, required: true },
  assessedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  certificationName: { type: String, maxlength: 200 },
  certificationAuthority: { type: String, maxlength: 100 },
  certificationDate: { type: Date },
  expirationDate: { type: Date },
  verificationStatus: { type: String, enum: ['VERIFIED', 'PENDING', 'REJECTED'] },
}, { timestamps: true });

export const SkillAssessmentModel = model<ISkillAssessment>('SkillAssessment', SkillAssessmentSchema);
