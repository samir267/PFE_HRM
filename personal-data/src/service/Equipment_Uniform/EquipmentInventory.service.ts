import { EquipmentInventoryModel } from "../../models/Equipment_Uniform/EquipmentInventory.model";
import { IEquipmentInventory } from "../../types/Equipment_Uniform/IEquipmentInventory.type";
import { equipmentInventoryValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class EquipmentInventoryService {
  async create(data: IEquipmentInventory) {
    const {error}=await equipmentInventoryValidator.validate(data);
    if (error) throw new Error(error.message);
    const existing = await EquipmentInventoryModel.findOne({ equipmentTypeId: data.equipmentTypeId });
if (existing) {
  throw new Error('Equipment type already exists in inventory');
}

    return await EquipmentInventoryModel.create(data);
  }

  async findAll() {
    return await EquipmentInventoryModel.find();
  }

  async findById(id: string) {
    return await EquipmentInventoryModel.findById(id);
  }

  async update(id: string, data: IEquipmentInventory) {
     const {error}=await equipmentInventoryValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentInventoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await EquipmentInventoryModel.findByIdAndDelete(id);
  }
}