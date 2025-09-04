import { UniformTypeModel } from '../../models/Equipment_Uniform/UniformType.model';
import { IUniformType } from '../../types/Equipment_Uniform/IUniformType.type';
import { uniformTypeValidator } from '../../validator/Equipment_Uniform/EquipmentUniform.validator';

export class UniformTypeService {
  async create(data: IUniformType) {
    const { error } = uniformTypeValidator.validate(data);
    if (error) throw new Error(error.message);

    const exists = await UniformTypeModel.findOne({ name: data.name });
    if (exists) throw new Error('Uniform type already exists');

    return await UniformTypeModel.create(data);
  }

  async getAll() {
    return await UniformTypeModel.find();
  }

  async update(id: string, data: IUniformType) {
    const { error } = uniformTypeValidator.validate(data);
    if (error) throw new Error(error.message);
    return await UniformTypeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getById(id: string) {
    const uniform = await UniformTypeModel.findById(id);
    if (!uniform) throw new Error('Uniform type not found');
    return uniform;
  }
}
