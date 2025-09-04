import mongoose, { Schema } from "mongoose";
import { IEquipmentAssignment } from "../../types/Equipment_Uniform/IEquipmentAssignment.type";

const EquipmentAssignmentSchema = new Schema<IEquipmentAssignment>({
  employeeId: { type: String, required: true ,ref:'PersonalIdentity'},
  inventoryId: { type: String, required: true ,ref:'UniformInventory'},
  equipmentTypeId: { type: String, required: true ,ref:'EquipmentType'},
  assignmentDetails: {
    assignedDate: Date,
    assignedBy: String,
    expectedReturnDate: Date,
    purpose: String,
    location: {
      type: { type: String, enum: ['OFFICE', 'WAREHOUSE', 'REMOTE'], required: true },      building: String,
      floor: String,
      desk: String
    }
  },
  currentStatus: String,
  statusHistory: [{
    status: String,
    date: Date,
    changedBy: String,
    reason: String,
    location: {
      building: String,
      floor: String,
      desk: String
    }
  }],
  conditions: {
    initialCondition: String,
    currentCondition: String,
    lastInspection: Date,
    inspectedBy: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const EquipmentAssignmentModel = mongoose.model('EquipmentAssignment', EquipmentAssignmentSchema);
