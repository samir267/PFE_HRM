import mongoose, { Schema } from "mongoose";
import { IEmployeeBenefit } from "../../types/Salaires/IEmployeeBenefit.type";

const EmployeeBenefitSchema: Schema = new Schema({
  personalidentityid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  benefitid: { type: Schema.Types.ObjectId, ref: 'BenefitCatalog', required: true },
  enrollmentdate: { type: Date, required: true },
  effectivedate: { type: Date, required: true },
  enddate: { type: Date },
  enrollmentstatus: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'TERMINATED', 'PENDING'], required: true },
  employeecontribution: { type: Number, required: true },
  employercontribution: { type: Number, required: true },
  beneficiaries: [
    {
      name: String,
      relationship: String,
      dateofbirth: Date,
    }
  ],
  coveragedetails: {
    coveragelevel: String,
    deductible: Number,
    annualmaximum: Number,
  },
}, { timestamps: true });

export const EmployeeBenefitModel = mongoose.model<IEmployeeBenefit>('EmployeeBenefit', EmployeeBenefitSchema);
