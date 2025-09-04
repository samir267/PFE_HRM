import mongoose, { Schema } from "mongoose";
import { IWorkSchedule } from "../../types/Affectation/workSchedule.type";

const WorkScheduleSchema: Schema = new Schema(
  {
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    scheduleType: {
      type: String,
      enum: ['FIXED', 'FLEXIBLE', 'SHIFT_BASED', 'CUSTOM'],
      required: true,
    },
    hoursPerWeek: { type: Number, required: true },
    mondayHours: { type: Number },
    tuesdayHours: { type: Number },
    wednesdayHours: { type: Number },
    thursdayHours: { type: Number },
    fridayHours: { type: Number },
    saturdayHours: { type: Number },
    sundayHours: { type: Number },
    shiftPatternId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShiftPattern' },
    effectiveDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  {
    timestamps: true, 
  }
);

export const WorkScheduleModel = mongoose.model<IWorkSchedule>('WorkSchedule', WorkScheduleSchema);