import { PayrollPeriodModel } from '../../models/Salaires/PayrollPeriod.model';
import { IPayrollPeriod } from '../../types/Salaires/IPayrollPeriod.types';
import { payrollPeriodValidator } from '../../validator/Salaires/salaires.validator';

export class PayrollPeriodService {
  async create(data: IPayrollPeriod): Promise<IPayrollPeriod> {
    const { error } = payrollPeriodValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const period = new PayrollPeriodModel(data);
    return period.save();
  }

  async findAll(): Promise<IPayrollPeriod[]> {
    return PayrollPeriodModel.find().exec();
  }

  async findById(id: string): Promise<IPayrollPeriod | null> {
    return PayrollPeriodModel.findById(id).exec();
  }

  async update(id: string, data: Partial<IPayrollPeriod>): Promise<IPayrollPeriod | null> {
     const { error } = payrollPeriodValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    return PayrollPeriodModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IPayrollPeriod | null> {
    return PayrollPeriodModel.findByIdAndDelete(id).exec();
  }
}
