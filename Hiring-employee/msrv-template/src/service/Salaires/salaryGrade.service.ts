import { SalaryGradeModel } from '../../models/Salaires/SalaryGrade.model';
import { ISalaryGrade } from '../../types/Salaires/ISalaryGrade.type';
import { salaryGradeValidator } from '../../validator/Salaires/salaires.validator';

export class SalaryGradeService {
  async create(data: ISalaryGrade): Promise<ISalaryGrade> {
    const { error } = salaryGradeValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const grade = new SalaryGradeModel(data);
    return grade.save();
  }

  async findAll(): Promise<ISalaryGrade[]> {
    return SalaryGradeModel.find().exec();
  }

  async findById(id: string): Promise<ISalaryGrade | null> {
    return SalaryGradeModel.findById(id).exec();
  }

  async update(id: string, data: Partial<ISalaryGrade>): Promise<ISalaryGrade | null> {
    const { error } = salaryGradeValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    return SalaryGradeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<ISalaryGrade | null> {
    return SalaryGradeModel.findByIdAndDelete(id).exec();
  }
}
