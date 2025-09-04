import { Types } from "mongoose";

export interface ICareerDevelopment {
  personalIdentityId: Types.ObjectId;
  discussionDate: Date;
  careerGoals?: string;
  desiredPositions?: string;
  mobilityPreferences: 'LOCAL' | 'REGIONAL' | 'NATIONAL' | 'INTERNATIONAL' | 'REMOTE';
  developmentAreas?: string;
  actionPlan?: string;
  timeframe?: string;
  reviewedBy: Types.ObjectId;
  nextReviewDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}