import mongoose from "mongoose";

export interface IEmployeeBenefit extends Document {
  personalidentityid: mongoose.Types.ObjectId;
  benefitid: mongoose.Types.ObjectId;
  enrollmentdate: Date;
  effectivedate: Date;
  enddate?: Date;
  enrollmentstatus: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'PENDING';
  employeecontribution: number;
  employercontribution: number;
  beneficiaries?: Array<{
    name: string;
    relationship: string;
    dateofbirth: Date;
  }>;
  coveragedetails?: {
    coveragelevel: string;
    deductible: number;
    annualmaximum: number;
  };
  createdat: Date;
  updatedat: Date;
}