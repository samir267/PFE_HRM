
import { Types } from "mongoose";
import { IOfficialDocument } from "../../types/documents/officialDocuments.type";
import { OfficialDocumentModel } from "../../models/documents/officialDocuments.model";
import { officialDocumentValidator } from "../../validator/documents/documentsValidation.validator";

export class OfficialDocumentService {
  async create(data: IOfficialDocument): Promise<IOfficialDocument> {
     const {error}=officialDocumentValidator.validate(data);
        if (error) throw new Error(error.message);
    return await OfficialDocumentModel.create(data);
  }

  async getById(id: string): Promise<IOfficialDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await OfficialDocumentModel.findById(id).exec();
  }

  async getByEmployee(employeeId: string): Promise<IOfficialDocument[]> {
    return await OfficialDocumentModel.find({ employee_id: employeeId }).exec();
  }

  async update(id: string, data: Partial<IOfficialDocument>): Promise<IOfficialDocument | null> {
     const {error}=officialDocumentValidator.validate(data);
    if (error) throw new Error(error.message);
    return await OfficialDocumentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IOfficialDocument | null> {
    return await OfficialDocumentModel.findByIdAndDelete(id).exec();
  }
}
