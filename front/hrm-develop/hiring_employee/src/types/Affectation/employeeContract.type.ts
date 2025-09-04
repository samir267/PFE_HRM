import { Types } from "mongoose";

export interface IEmploymentContract {
  assignmentId: Types.ObjectId; 
  contractType: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERNSHIP';
  contractReference: string;
  signatureDate: Date;
  effectiveDate: Date;
  endDate?: Date;
  documentPath: string;
  collectiveAgreementId?: Types.ObjectId; 
  noticePeriodDays: number;
  nonCompeteClause: boolean;
  nonCompeteDurationMonths?: number;
  confidentialityClause: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
