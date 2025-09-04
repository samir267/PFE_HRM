import { UniformAssignmentModel } from "../../models/Equipment_Uniform/UniformAssignment.model";
import { IUniformAssignment } from "../../types/Equipment_Uniform/IUniformAssignment.type";
import { uniformAssignmentValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class UniformAssignmentService {
  async create(data: IUniformAssignment) {
    const {error} = await uniformAssignmentValidator.validate(data);
    if (error) throw new Error(error.message);
    const existing = await UniformAssignmentModel.findOne({ uniformInventoryId: data.uniformInventoryId });
    if (existing) {
      throw new Error('Assignment already exists for this inventory');
    }
    return await UniformAssignmentModel.create(data);
  }

  async findAll() {
    return await UniformAssignmentModel.find();
  }

  async findById(id: string) {
    return await UniformAssignmentModel.findById(id);
  }

  async update(id: string, data: IUniformAssignment) {
    const {error} = await uniformAssignmentValidator.validate(data);
    if (error) throw new Error(error.message);
    return await UniformAssignmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await UniformAssignmentModel.findByIdAndDelete(id);
  }
}