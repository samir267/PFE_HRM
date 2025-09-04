import  { Schema, model } from 'mongoose';
import { ICareerPosition } from '../../types/Career&SalaryManagement/careerPosition.type';



export const CareerPositionSchema = new Schema<ICareerPosition>({
  personalidentityid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  positiontitle: String,
  department: String,
  team: String,
  level: String,
  grade: String,
  managerid: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity' },
  startdate: Date,
  enddate: Date,
  employmenttype: { type: String, enum: ['FULLTIME', 'PARTTIME', 'CONTRACT', 'INTERN'] },
  worklocation: String,
  workmodel: { type: String, enum: ['REMOTE', 'ONSITE', 'HYBRID'] },
  jobdescription: String,
  responsibilities: [String],
  requiredskills: [String],
  reportingstructure: {
    directreports: [{ type: Schema.Types.ObjectId, ref: 'PersonalIdentity' }],
    dottedlinereports: [{ type: Schema.Types.ObjectId, ref: 'PersonalIdentity' }],
  }},
 { timestamps: true });



export const CareerPositionModel = model<ICareerPosition>('CareerPosition', CareerPositionSchema);
