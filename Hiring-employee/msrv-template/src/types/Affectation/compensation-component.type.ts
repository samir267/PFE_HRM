import mongoose from "mongoose";

export interface ICompensationComponent extends Document {
  salaryrecordid: mongoose.Types.ObjectId;
  componenttype: 'BONUS' | 'COMMISSION' | 'ALLOWANCE' | 'BENEFIT' | 'STOCKOPTION';
  componentname: string;
  amountvalue?: number;
  amountpercentage?: number;
  calculationbasis?: string;
  paymentfrequency: 'HALFYEARLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONETIME';
  effectivedate: Date;
  enddate?: Date;
  conditions?: {
    performancethreshold?: string;
    eligibilitycriteria?: string;
    calculationmethod?: string;
  };
  taxtreatment: {
    taxable: boolean;
    socialcharges: boolean;
    specialregime?: string;
  };
  createdat: Date;
  updatedat: Date;
}
export {};
