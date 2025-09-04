import mongoose, { Schema } from "mongoose";
import { IPayrollEntry } from "../../types/Salaires/IPayrollEntry.type";

const PayrollEntrySchema: Schema = new Schema({
  personalidentityid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  payrollperiodid: { type: Schema.Types.ObjectId, ref: 'PayrollPeriod', required: true },
  salaryrecordid: { type: Schema.Types.ObjectId, ref: 'SalaryRecord', required: true },
  grosssalary: Number,
  netsalary: Number,
  workeddays: Number,
  totaldays: Number,
  overtimehours: Number,
  salarycomponents: [
    {
      componenttype: String,
      componentname: String,
      amount: Number,
      taxable: Boolean,
    }
  ],
  deductions: [
    {
      deductiontype: String,
      description: String,
      amount: Number,
    }
  ],
  benefitscost: Number,
  employercharges: Number,
  paymentmethod: String,
  bankaccount: {
    iban: String,
    bankname: String,
  },
  
},  {
    timestamps: true,
  });

export const PayrollEntryModel = mongoose.model<IPayrollEntry>('PayrollEntry', PayrollEntrySchema);
