// import mongoose, { Schema } from "mongoose";
// import { IPosition } from "../../types/Affectation/position.type";

// const PositionSchema: Schema = new Schema({
//   title: { type: String, required: true, maxlength: 100 },
//   departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
//   locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
//   jobClassificationId: { type: Schema.Types.ObjectId, ref: 'JobClassification', required: true },
//   reportingPositionId: { type: Schema.Types.ObjectId, ref: 'Position' },
//   positionType: { type: String, enum: ['PERMANENT', 'TEMPORARY', 'PROJECT_BASED'], required: true },
//   minSalaryGrade: { type: Number, required: true },
//   maxSalaryGrade: { type: Number, required: true },
//   isActive: { type: Boolean, default: true },
//   budgetCode: { type: String, required: true, maxlength: 50 },
//   headcountLimit: { type: Number, required: true },
// }, { timestamps: true });
// export default mongoose.model<IPosition>('Position', PositionSchema);

// models/StaffingRequest.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStaffingRequest extends Document {
  // id: string; 
  requestTitle: string;
  department: string;
  position: string;
  numberOfVacancies: number;
  employmentType: string;
  expectedStartDate?: Date;
  selectedSkillCategory: string[];
  requiredSkills: string[];
  experienceLevel: string;
  justification?: string;
  hiringManager: string;
  status: string;
  jobObjectives?: string;
  mainResponsibilities?: string;
  workLocation?: string;
  remoteWorkOptions?: string;
  salaryRange?: string;
  budget?: number;
  budgetApproval?: boolean;
  reportingStructure?: string;
  attachedDocuments?: string[];
}

const StaffingRequestSchema = new Schema<IStaffingRequest>(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   index: true,
    //   match: /^REQ-\d{10}$/ // ex: REQ-1234567890
    // },
    requestTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140,
      index: "text"
    },
    department: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    numberOfVacancies: {
      type: Number,
      required: true,
      min: [1, "numberOfVacancies must be at least 1"]
    },
    employmentType: { type: String, required: true, trim: true },
    expectedStartDate: { type: Date },

    // SkillCategory → liste vide (array)
    selectedSkillCategory: {
      type: [String],
      default: []
    },

    requiredSkills: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: unknown[]) => Array.isArray(arr) && arr.length > 0,
        message: "requiredSkills must contain at least one skill"
      }
    },
    experienceLevel: { type: String, required: true, trim: true },
    justification: { type: String, trim: true, maxlength: 2000 },
    hiringManager: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true, index: true },
    jobObjectives: { type: String, trim: true, maxlength: 2000 },
    mainResponsibilities: { type: String, trim: true, maxlength: 3000 },
    workLocation: { type: String, trim: true },

    // RemoteWorkOptions → simple string
    remoteWorkOptions: { type: String, trim: true },

    salaryRange: { type: String, trim: true },
    budget: { type: Number, min: 0 },
    budgetApproval: { type: Boolean, default: false },
    reportingStructure: { type: String, trim: true },
    attachedDocuments: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: unknown[]) =>
          Array.isArray(arr) && arr.every((v) => typeof v === "string"),
        message: "attachedDocuments must be an array of strings"
      }
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret._id = ret._id?.toString?.();
        return ret;
      }
    }
  }
);

// petite règle : si budgetApproval = true → budget obligatoire
StaffingRequestSchema.pre("validate", function (next) {
  if (this.budgetApproval && (this.budget === undefined || this.budget === null)) {
    this.invalidate("budget", "budget is required when budgetApproval is true");
  }
  next();
});

export const StaffingRequest: Model<IStaffingRequest> =
  mongoose.models.StaffingRequest ||
  mongoose.model<IStaffingRequest>("StaffingRequest", StaffingRequestSchema);
