import { EmployeeBenefitModel } from '../../models/Salaires/EmployeeBenefit.model';
import { IEmployeeBenefit } from '../../types/Salaires/IEmployeeBenefit.type';
import { employeeBenefitValidator } from '../../validator/Salaires/salaires.validator';

export class EmployeeBenefitService {
  async create(data: IEmployeeBenefit): Promise<IEmployeeBenefit> {
    const { error } = employeeBenefitValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const benefit = new EmployeeBenefitModel(data);
    return benefit.save();
  }

  async findAll(): Promise<IEmployeeBenefit[]> {
    return EmployeeBenefitModel.find().exec();
  }

  async findById(id: string): Promise<IEmployeeBenefit | null> {
    return EmployeeBenefitModel.findById(id).exec();
  }

  async update(id: string, data: Partial<IEmployeeBenefit>): Promise<IEmployeeBenefit | null> {
    const { error } = employeeBenefitValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    return EmployeeBenefitModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IEmployeeBenefit | null> {
    return EmployeeBenefitModel.findByIdAndDelete(id).exec();
  }
}
