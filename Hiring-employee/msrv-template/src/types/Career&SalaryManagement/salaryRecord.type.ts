import { Types } from "mongoose";

export interface ISalaryRecordModel extends Document {
  personalidentityid: Types.ObjectId;
  careerpositionid: Types.ObjectId;
  basesalaryamount: number;
  currencycode: string;
  paymentfrequency: 'MONTHLY' | 'BIWEEKLY' | 'WEEKLY' | 'ANNUAL';
  effectivedate: Date;
  enddate: Date | null;
  changereason: 'HIRING' | 'PROMOTION' | 'ANNUALREVIEW' | 'ADJUSTMENT' | 'DEMOTION' | 'TRANSFER';
  changedetails: {
    previoussalary: number | null;
    increasepercentage: number | null;
    justification: string;
  };
  approvedby: Types.ObjectId;
  approvaldate: Date;
  approvalworkflow: {
    approverid: Types.ObjectId;
    approvallevel: string;
    approvedat: Date;
    comments: string;
  }[];
  salarygrade: {
    gradelevel: string;
    minsalary: number;
    maxsalary: number;
    marketreference: string;
  };
  createdat: Date;
  updatedat: Date;
}