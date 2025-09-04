import { Types } from "mongoose";

export interface ICareerPosition {
  personalidentityid: Types.ObjectId;
  positiontitle: string;
  department: string;
  team: string;
  level: string;
  grade: string;
  managerid: Types.ObjectId;
  startdate: Date;
  enddate: Date | null;
  employmenttype: 'FULLTIME' | 'PARTTIME' | 'CONTRACT' | 'INTERN';
  worklocation: string;
  workmodel: 'REMOTE' | 'ONSITE' | 'HYBRID';
  jobdescription: string;
  responsibilities: string[];
  requiredskills: string[];
  reportingstructure: {
    directreports: Types.ObjectId[];
    dottedlinereports: Types.ObjectId[];
  };
  createdat: Date;
  updatedat: Date;
}