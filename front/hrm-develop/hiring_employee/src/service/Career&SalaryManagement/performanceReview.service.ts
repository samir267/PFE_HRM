import { PerformanceReviewModel } from '../../models/Salaires/PerformanceReview.model';
import { IPerformanceReview } from '../../types/Career&SalaryManagement/performanceReview.type';
import { performanceReviewValidator } from '../../validator/Salaires/salaires.validator';

export class PerformanceReviewService {
  async create(data: IPerformanceReview): Promise<IPerformanceReview> {
    const { error } = performanceReviewValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const review = new PerformanceReviewModel(data);
    return review.save();
  }

  async findAll(): Promise<IPerformanceReview[]> {
    return PerformanceReviewModel.find().exec();
  }

  async findById(id: string): Promise<IPerformanceReview | null> {
    return PerformanceReviewModel.findById(id).exec();
  }

  async update(id: string, data: Partial<IPerformanceReview>): Promise<IPerformanceReview | null> {
    return PerformanceReviewModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IPerformanceReview | null> {
    return PerformanceReviewModel.findByIdAndDelete(id).exec();
  }
}
