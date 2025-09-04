import { PayrollEntryModel } from '../../models/Salaires/PayrollEntry.model';
import { IPayrollEntry } from '../../types/Salaires/IPayrollEntry.type';
import { payrollEntryValidator } from '../../validator/Salaires/salaires.validator';

export class PayrollEntryService {
  async create(data: IPayrollEntry): Promise<IPayrollEntry> {
    const { error } = payrollEntryValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const entry = new PayrollEntryModel(data);
    return entry.save();
  }

  async findAll(): Promise<IPayrollEntry[]> {
    return PayrollEntryModel.find().exec();
  }

  async findById(id: string): Promise<IPayrollEntry | null> {
    return PayrollEntryModel.findById(id).exec();
  }

  async update(id: string, data: Partial<IPayrollEntry>): Promise<IPayrollEntry | null> {
     const { error } = payrollEntryValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    return PayrollEntryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IPayrollEntry | null> {
    return PayrollEntryModel.findByIdAndDelete(id).exec();
  }
}
