import mongoose, { Schema } from "mongoose";
import { IEquipmentType } from "../../types/Equipment_Uniform/IEquipmentType.type";

const EquipmentTypeSchema = new Schema<IEquipmentType>({
  name: String,
  category: String,
  subcategory: String,
  description: String,
  serialNumber: String,
  specifications: {
    brand: String,
    model: String,
    warranty: String
  },
  requiresSerial: Boolean,
  trackLocation: Boolean,
  isUniform: Boolean,
  defaultValue: Number,
  maintenanceSchedule: {
    frequency: String,
    reminderDays: Number
  },

  status: { type: String, default: 'ACTIVE' }
},
  { timestamps: true });

export const EquipmentTypeModel = mongoose.model('EquipmentType', EquipmentTypeSchema);
