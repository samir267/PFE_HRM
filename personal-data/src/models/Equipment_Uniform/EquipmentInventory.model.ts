import mongoose, { Schema } from "mongoose";
import { IEquipmentInventory } from "../../types/Equipment_Uniform/IEquipmentInventory.type";

const EquipmentInventorySchema = new Schema<IEquipmentInventory>({
  equipmentTypeId: { type: String, required: true },
  serialNumber: String,
  assetTag: String,
  purchaseInfo: {
    purchaseDate: Date,
    vendor: String,
    purchasePrice: Number,
    warranty: {
      startDate: Date,
      endDate: Date,
      type: { type: String, enum: ['MANUFACTURER', 'EXTENDED', 'NONE'], required: true },    }
  },
  currentStatus: String,
  condition: String,
  location: {
    building: String,
    floor: String,
    room: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const EquipmentInventoryModel = mongoose.model('EquipmentInventory', EquipmentInventorySchema);
