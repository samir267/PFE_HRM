import { EquipmentAssignmentModel } from "../../models/Equipment_Uniform/EquipmentAssignment.model";
import { IEquipmentAssignment } from "../../types/Equipment_Uniform/IEquipmentAssignment.type";
import { equipmentAssignmentValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class EquipmentAssignmentService {
  async create(data: IEquipmentAssignment) {
    const {error}=await equipmentAssignmentValidator.validate(data);
    if (error) throw new Error(error.message);
    const existing = await EquipmentAssignmentModel.findOne({ inventoryId: data.inventoryId });
if (existing) {
  throw new Error('Assignment already exists for this inventory');
}

    return await EquipmentAssignmentModel.create(data);
  }

  async findAll() {
    return await EquipmentAssignmentModel.find();
  }

  async findById(id: string) {
    return await EquipmentAssignmentModel.findById(id);
  }

  async update(id: string, data: IEquipmentAssignment) {
    const {error}=await equipmentAssignmentValidator.validate(data);
    if (error) throw new Error(error.message);
    return await EquipmentAssignmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await EquipmentAssignmentModel.findByIdAndDelete(id);
  }
}