import { Types } from "mongoose";

export interface ISkillAssessment {
  personalIdentityId: Types.ObjectId;
  skillName: string;
  skillCategory: string;
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  assessmentDate: Date;
  assessedBy?: Types.ObjectId;
  certificationName?: string;
  certificationAuthority?: string;
  certificationDate?: Date;
  expirationDate?: Date;
  verificationStatus?: 'VERIFIED' | 'PENDING' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}
