import { model, Schema } from "mongoose";
import { ISalaryRecordModel } from "../../types/Career&SalaryManagement/salaryRecord.type";

const SalaryRecordSchema = new Schema<ISalaryRecordModel>({
 personalidentityid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity' },
  careerpositionid: { type: Schema.Types.ObjectId, ref: 'CareerPosition' },
  basesalaryamount: Number,
  currencycode: String,
  paymentfrequency: { type: String, enum: ['MONTHLY', 'BIWEEKLY', 'WEEKLY', 'ANNUAL'] },
  effectivedate: Date,
  enddate: Date,
  changereason: { type: String, enum: ['HIRING', 'PROMOTION', 'ANNUALREVIEW', 'ADJUSTMENT', 'DEMOTION', 'TRANSFER'] },
  changedetails: {
    previoussalary: Number,
    increasepercentage: Number,
    justification: String,
  },
  approvedby: { type: Schema.Types.ObjectId, ref: 'User' },
  approvaldate: Date,
  approvalworkflow: [
    {
      approverid: { type: Schema.Types.ObjectId, ref: 'User' },
      approvallevel: String,
      approvedat: Date,
      comments: String,
    },
  ],
  salarygrade: {
    gradelevel: String,
    minsalary: Number,
    maxsalary: Number,
    marketreference: String,
  },
  
}, { timestamps: true });

export const SalaryRecordModel = model<ISalaryRecordModel>('SalaryRecord', SalaryRecordSchema);
