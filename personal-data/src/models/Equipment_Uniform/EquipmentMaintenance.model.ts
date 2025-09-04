import mongoose, { Schema } from "mongoose";
import { IEquipmentMaintenance } from "../../types/Equipment_Uniform/IEquipmentMaintenance.type";

const EquipmentMaintenanceSchema = new Schema<IEquipmentMaintenance>({
  inventoryId: { type: String, required: true },
  assignmentId: { type: String, required: true },
  maintenanceType: String,
  scheduledDate: Date,
  actualDate: Date,
  maintenanceDetails: {
    description: String,
    technician: String,
    duration: Number,
    cost: Number,
    partsReplaced: [{
      partName: String,
      partNumber: String,
      cost: Number
    }]
  },
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const EquipmentMaintenanceModel = mongoose.model('EquipmentMaintenance', EquipmentMaintenanceSchema);
