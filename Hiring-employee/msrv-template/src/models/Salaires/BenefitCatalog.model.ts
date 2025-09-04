import mongoose, { Schema } from "mongoose";
import { IBenefitCatalog } from "../../types/Salaires/IBenefitCatalog.type";

const BenefitCatalogSchema: Schema = new Schema({
  benefitcode: { type: String, required: true },
  benefitname: { type: String, required: true },
  benefitcategory: { type: String, enum: ['HEALTH', 'TRANSPORT', 'MEAL', 'TECHNOLOGY', 'WELLNESS'], required: true },
  description: { type: String },
  eligibilitycriteria: {
    employmenttype: [String],
    minimumtenuredays: Number,
    positionlevels: [String],
  },
  coststructure: {
    employercontributionpercentage: Number,
    employeecontributionpercentage: Number,
    monthlycost: Number,
    currencycode: String,
  },
  providerinfo: {
    providername: String,
    contractnumber: String,
    contactemail: String,
  },
  taxtreatment: {
    taxableforemployee: Boolean,
    socialchargesexempt: Boolean,
  },
  effectivedate: { type: Date, required: true },
  expirationdate: { type: Date, required: true },
  
}, { timestamps: true });

export const BenefitCatalogModel = mongoose.model<IBenefitCatalog>('BenefitCatalog', BenefitCatalogSchema);
