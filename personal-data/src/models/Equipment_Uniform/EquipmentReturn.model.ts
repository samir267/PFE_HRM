import mongoose, { Schema } from "mongoose";
import { IEquipmentReturn } from "../../types/Equipment_Uniform/IEquipmentReturn.type";

const EquipmentReturnSchema = new Schema<IEquipmentReturn>({
  assignmentId: { type: String, required: true },
  employeeId: { type: String, required: true },
  returnDetails: {
    initiatedDate: Date,
    initiatedBy: String,
    reason: String,
    expectedReturnDate: Date,
    actualReturnDate: Date
  },
  inspection: {
    inspectedBy: String,
    inspectionDate: Date,
    condition: String,
    damages: [String],
    cleaningRequired: Boolean,
    repairRequired: Boolean,
    notes: String
  },
  processing: {
    cleaned: Boolean,
    cleanedBy: String,
    cleanedDate: Date,
    tested: Boolean,
    testedBy: String,
    testedDate: Date,
    readyForReassignment: Boolean
  },
  currentStatus: String,
  statusHistory: [{
    status: String,
    date: Date,
    changedBy: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const EquipmentReturnModel = mongoose.model('EquipmentReturn', EquipmentReturnSchema);
