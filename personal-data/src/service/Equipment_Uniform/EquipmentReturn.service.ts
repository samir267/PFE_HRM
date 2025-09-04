import { EquipmentReturnModel } from "../../models/Equipment_Uniform/EquipmentReturn.model";
import { IEquipmentReturn } from "../../types/Equipment_Uniform/IEquipmentReturn.type";
import { equipmentReturnValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class EquipmentReturnService {
  async create(data: IEquipmentReturn) {
    const {error}=await equipmentReturnValidator.validate(data);
    if (error) throw new Error(error.message);
    const existing = await EquipmentReturnModel.findOne({ assignmentId: data.assignmentId });
if (existing) {
  throw new Error('EquipmentReturn already exist for this assignment');
}

    return await EquipmentReturnModel.create(data);
  }

  async findAll() {
    return await EquipmentReturnModel.find();
  }

  async findById(id: string) {
    return await EquipmentReturnModel.findById(id);
  }

  async update(id: string, data: IEquipmentReturn) {
    const {error}=await equipmentReturnValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentReturnModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await EquipmentReturnModel.findByIdAndDelete(id);
  }
}