import mongoose, { Schema } from "mongoose";
import { IEmploymentContract } from "../../types/Affectation/employeeContract.type";

const EmploymentContractSchema: Schema = new Schema(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    contractType: {
      type: String,
      enum: ['PERMANENT', 'FIXED_TERM', 'TEMPORARY', 'INTERNSHIP'],
      required: true,
    },
    contractReference: { type: String, required: true },
    signatureDate: { type: Date, required: true },
    effectiveDate: { type: Date, required: true },
    endDate: { type: Date },
    documentPath: { type: String, required: true },
    collectiveAgreementId: { type: Schema.Types.ObjectId,  ref: 'CollectiveAgreement' },
    noticePeriodDays: { type: Number, required: true },
    nonCompeteClause: { type: Boolean, required: true },
    nonCompeteDurationMonths: { type: Number },
    confidentialityClause: { type: Boolean, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, 
  }
);

export const EmploymentContractModel = mongoose.model<IEmploymentContract>(
  'EmploymentContract',
  EmploymentContractSchema
);