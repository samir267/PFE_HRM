import { Types } from "mongoose";

export interface IPosition {
  title: string;
  departmentId: Types.ObjectId;
  locationId: Types.ObjectId;
  jobClassificationId: Types.ObjectId;
  reportingPositionId?: Types.ObjectId;
  positionType: 'PERMANENT' | 'TEMPORARY' | 'PROJECT_BASED';
  minSalaryGrade: number;
  maxSalaryGrade: number;
  isActive: boolean;
  budgetCode: string;
  headcountLimit: number;
  createdAt?: Date;
  updatedAt?: Date;
}
