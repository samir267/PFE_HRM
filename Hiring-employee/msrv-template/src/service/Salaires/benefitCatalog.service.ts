import { BenefitCatalogModel } from '../../models/Salaires/BenefitCatalog.model';
import { IBenefitCatalog } from '../../types/Salaires/IBenefitCatalog.type';
import { benefitCatalogValidator } from '../../validator/Salaires/salaires.validator';

export class BenefitCatalogService {
  async create(data: IBenefitCatalog): Promise<IBenefitCatalog> {
    const { error } = benefitCatalogValidator.validate(data);
        if (error) throw new Error(`Validation error: ${error.message}`);
    const benefit = new BenefitCatalogModel(data);
    return benefit.save();
  }

  async findAll(): Promise<IBenefitCatalog[]> {
    return BenefitCatalogModel.find().exec();
  }

  async findById(id: string): Promise<IBenefitCatalog | null> {
    return BenefitCatalogModel.findById(id).exec();
  }

  async update(id: string, data: Partial<IBenefitCatalog>): Promise<IBenefitCatalog | null> {
     const { error } = benefitCatalogValidator.validate(data);
        if (error) throw new Error(`Validation error: ${error.message}`);
    return BenefitCatalogModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IBenefitCatalog | null> {
    return BenefitCatalogModel.findByIdAndDelete(id).exec();
  }
}
