import { UniformInventoryModel } from '../../models/Equipment_Uniform/UniformInventory.model';
import { IUniformInventory } from '../../types/Equipment_Uniform/IUniformInventory.type';
import { uniformInventoryValidator } from '../../validator/Equipment_Uniform/EquipmentUniform.validator';

export class UniformInventoryService {
  async create(data: IUniformInventory) {
    const { error } = uniformInventoryValidator.validate(data);
    if (error) throw new Error(error.message);

    const exists = await UniformInventoryModel.findOne({
      uniformTypeId: data.uniformTypeId,
      size: data.size,
      color: data.color,
    });

    if (exists) throw new Error('Inventory already exists for this size and color');

    return await UniformInventoryModel.create(data);
  }

  async getAll() {
    return await UniformInventoryModel.find().populate('uniformTypeId');
  }

  async update(id: string, data: IUniformInventory) {
    const { error } = uniformInventoryValidator.validate(data);
    if (error) throw new Error(error.message);
    return await UniformInventoryModel.findByIdAndUpdate(id, data, { new: true });
  }
  async getById(id: string) {
    const item = await UniformInventoryModel.findById(id).populate('uniformTypeId');
    if (!item) throw new Error('Inventory item not found');
    return item;
  }

  async delete(id: string) {
    return await UniformInventoryModel.findByIdAndDelete(id);
  }
}
