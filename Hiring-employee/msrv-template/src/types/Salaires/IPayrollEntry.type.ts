import mongoose from "mongoose";

export interface IPayrollEntry extends Document {
  personalidentityid: mongoose.Types.ObjectId;
  payrollperiodid: mongoose.Types.ObjectId;
  salaryrecordid: mongoose.Types.ObjectId;
  grosssalary: number;
  netsalary: number;
  workeddays: number;
  totaldays: number;
  overtimehours: number;
  salarycomponents: Array<{
    componenttype: string;
    componentname: string;
    amount: number;
    taxable: boolean;
  }>;
  deductions: Array<{
    deductiontype: string;
    description: string;
    amount: number;
  }>;
  benefitscost: number;
  employercharges: number;
  paymentmethod: string;
  bankaccount: {
    iban: string;
    bankname: string;
  };
  createdat: Date;
  updatedat: Date;
}