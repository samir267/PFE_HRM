import mongoose from "mongoose";

export interface IPerformanceReview extends Document {
  personalidentityid: mongoose.Types.ObjectId;
  reviewperiod: {
    startdate: Date;
    enddate: Date;
  };
  reviewtype: 'ANNUAL' | 'SEMIANNUAL' | 'QUARTERLY' | 'PROBATION';
  reviewerid: mongoose.Types.ObjectId;
  reviewdate: Date;
  overallrating: number;
  ratingscale: {
    min: number;
    max: number;
    description: string;
  };
  objectives: Array<{
    objectiveid: string;
    description: string;
    targetvalue: number;
    actualvalue: number;
    weight: number;
    rating: number;
    comments: string;
  }>;
  competencies: Array<{
    competencyname: string;
    rating: number;
    comments: string;
  }>;
  developmentplan: Array<{
    developmentarea: string;
    plannedactions: string[];
    timeline: string;
  }>;
  salaryreviewrecommendation: {
    recommendedincreasepercentage: number;
    justification: string;
    effectivedate: Date;
  };
  createdat: Date;
  updatedat: Date;
}