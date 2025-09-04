import mongoose, { Schema } from "mongoose";
import { IPayrollPeriod } from "../../types/Salaires/IPayrollPeriod.types";

const PayrollPeriodSchema: Schema = new Schema({
  periodname: String,
  periodtype: { type: String, enum: ['MONTHLY', 'BIWEEKLY', 'WEEKLY'], required: true },
  startdate: Date,
  enddate: Date,
  paydate: Date,
  status: { type: String, enum: ['OPEN', 'PROCESSING', 'PROCESSED', 'CLOSED'], required: true },
  totalemployees: Number,
  totalgrossamount: Number,
  totalnetamount: Number,
  totaltaxes: Number,
  currencycode: String,
 
},  {
    timestamps: true,
  });

export const PayrollPeriodModel = mongoose.model<IPayrollPeriod>('PayrollPeriod', PayrollPeriodSchema);
