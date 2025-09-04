import mongoose, { Schema } from "mongoose";
import { ISalaryGrade } from "../../types/Salaires/ISalaryGrade.type";

const SalaryGradeSchema: Schema = new Schema({
  positionfamily: { type: String, required: true },
  positiontitle: { type: String, required: true },
  gradelevel: { type: String, required: true },
  experiencerange: {
    minyears: Number,
    maxyears: Number,
  },
  salaryrange: {
    minsalary: Number,
    maxsalary: Number,
    mediansalary: Number,
    currencycode: String,
  },
  locationadjustments: [
    {
      location: String,
      adjustmentpercentage: Number,
    }
  ],
  marketdata: {
    lastupdated: Date,
    source: String,
    percentile25: Number,
    percentile75: Number,
  },
  validfrom: { type: Date, required: true },
  validto: { type: Date, required: true },
 
}, { timestamps: true });

export const SalaryGradeModel = mongoose.model<ISalaryGrade>('SalaryGrade', SalaryGradeSchema);
