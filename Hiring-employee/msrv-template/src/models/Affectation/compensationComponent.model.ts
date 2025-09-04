import mongoose, { Schema } from "mongoose";
import { ICompensationComponent } from "../../types/Affectation/compensation-component.type";


const CompensationComponentSchema: Schema = new Schema({
  salaryrecordid: { type: Schema.Types.ObjectId, ref: 'SalaryRecord', required: true },
  componenttype: { type: String, enum: ['BONUS', 'COMMISSION', 'ALLOWANCE', 'BENEFIT', 'STOCKOPTION'], required: true },
  componentname: { type: String, required: true },
  amountvalue: { type: Number },
  amountpercentage: { type: Number },
  calculationbasis: { type: String },
  paymentfrequency: { type: String, enum: ['HALFYEARLY','MONTHLY', 'QUARTERLY', 'ANNUAL', 'ONETIME'], required: true },
  effectivedate: { type: Date, required: true },
  enddate: { type: Date },
  conditions: {
    performancethreshold: String,
    eligibilitycriteria: String,
    calculationmethod: String,
  },
  taxtreatment: {
    taxable: { type: Boolean, required: true },
    socialcharges: { type: Boolean, required: true },
    specialregime: String,
  },
  
}, { timestamps: true });
export default mongoose.model<ICompensationComponent>('CompensationComponent', CompensationComponentSchema);