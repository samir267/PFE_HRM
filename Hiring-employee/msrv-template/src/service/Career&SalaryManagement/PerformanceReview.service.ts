import { Types } from 'mongoose';
import { PerformanceReviewModel } from '../../models/Career&SalaryManagement/performanceReview.model';
import { IPerformanceReview } from '../../types/Career&SalaryManagement/performanceReview.type';
import { performanceReviewValidator } from '../../validator/Career&SalaryManagement/career_salary.validator';

export class PerformanceReviewService {
  // CREATE avec validation Joi
  async create(data: IPerformanceReview): Promise<IPerformanceReview> {
    const { error } = performanceReviewValidator.validate(data);
    if (error) throw new Error(`Validation error: ${error.message}`);
    const review = new PerformanceReviewModel(data);
    return review.save();
  }

  // Lister toutes les évaluations (admin)
  async findAll(): Promise<IPerformanceReview[]> {
    return PerformanceReviewModel.find().exec();
  }

  // Récupérer les évaluations d’un employé donné, triées par date descendante
  async findByEmployee(personalidentityid: string): Promise<IPerformanceReview[]> {
    if (!Types.ObjectId.isValid(personalidentityid)) {
      throw new Error('ID employé invalide');
    }
    return PerformanceReviewModel.find({ personalidentityid })
      .sort({ reviewdate: -1 })
      .exec();
  }

  // Trouver une évaluation par son ID
  async findById(id: string): Promise<IPerformanceReview | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return PerformanceReviewModel.findById(id).exec();
  }

  // Mettre à jour une évaluation avec validation partielle
  async update(id: string, data: Partial<IPerformanceReview>): Promise<IPerformanceReview | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');

    const { error } = performanceReviewValidator.validate(data, {
      allowUnknown: true,
      presence: 'optional',
    });
    if (error) throw new Error(`Validation error: ${error.message}`);

    return PerformanceReviewModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  // Supprimer une évaluation
  async delete(id: string): Promise<IPerformanceReview | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error('ID invalide');
    return PerformanceReviewModel.findByIdAndDelete(id).exec();
  }
}
