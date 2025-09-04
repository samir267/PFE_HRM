import mongoose, { Schema } from "mongoose";
import { IPerformanceReview } from "../../types/Career&SalaryManagement/performanceReview.type";

const PerformanceReviewSchema: Schema = new Schema({
  personalidentityid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  reviewperiod: {
    startdate: Date,
    enddate: Date,
  },
  reviewtype: { type: String, enum: ['ANNUAL', 'SEMIANNUAL', 'QUARTERLY', 'PROBATION'], required: true },
  reviewerid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewdate: Date,
  overallrating: Number,
  ratingscale: {
    min: Number,
    max: Number,
    description: String,
  },
  objectives: [
    {
      objectiveid: String,
      description: String,
      targetvalue: Number,
      actualvalue: Number,
      weight: Number,
      rating: Number,
      comments: String,
    }
  ],
  competencies: [
    {
      competencyname: String,
      rating: Number,
      comments: String,
    }
  ],
  developmentplan: [
    {
      developmentarea: String,
      plannedactions: [String],
      timeline: String,
    }
  ],
  salaryreviewrecommendation: {
    recommendedincreasepercentage: Number,
    justification: String,
    effectivedate: Date,
  },
 
}, { timestamps: true });

export const PerformanceReviewModel = mongoose.model<IPerformanceReview>('PerformanceReview', PerformanceReviewSchema);
