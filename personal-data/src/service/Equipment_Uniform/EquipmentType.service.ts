import { EquipmentTypeModel } from "../../models/Equipment_Uniform/EquipmentType.model";
import { IEquipmentType } from "../../types/Equipment_Uniform/IEquipmentType.type";
import { equipmentTypeValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class EquipmentTypeService {
  async create(data: IEquipmentType) {
    const {error}=await equipmentTypeValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentTypeModel.create(data);
  }

  async findAll() {
    return await EquipmentTypeModel.find();
  }

  async findById(id: string) {
    return await EquipmentTypeModel.findById(id);
  }

  async update(id: string, data: IEquipmentType) {
     const {error}=await equipmentTypeValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentTypeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await EquipmentTypeModel.findByIdAndDelete(id);
  }
}