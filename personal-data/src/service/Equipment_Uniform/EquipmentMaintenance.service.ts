import { EquipmentMaintenanceModel } from "../../models/Equipment_Uniform/EquipmentMaintenance.model";
import { IEquipmentMaintenance } from "../../types/Equipment_Uniform/IEquipmentMaintenance.type";
import { equipmentMaintenanceValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class EquipmentMaintenanceService {
  async create(data: IEquipmentMaintenance) {
    const {error}=await equipmentMaintenanceValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentMaintenanceModel.create(data);
  }

  async findAll() {
    return await EquipmentMaintenanceModel.find();
  }

  async findById(id: string) {
    return await EquipmentMaintenanceModel.findById(id);
  }

  async update(id: string, data: IEquipmentMaintenance) {
    const {error}=await equipmentMaintenanceValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentMaintenanceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await EquipmentMaintenanceModel.findByIdAndDelete(id);
  }
}