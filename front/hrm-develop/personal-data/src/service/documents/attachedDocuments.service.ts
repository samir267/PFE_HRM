
import { Types } from "mongoose";
import { AttachedDocumentModel } from "../../models/documents/attachedDocuments.model";
import { IAttachedDocument } from "../../types/documents/attachedDocuments.type";
import { attachedDocumentValidator } from "../../validator/documents/documentsValidation.validator";

export class AttachedDocumentService {
  async create(data: IAttachedDocument): Promise<IAttachedDocument> {
    const {error}=attachedDocumentValidator.validate(data);
    if (error) throw new Error(error.message);
    return await AttachedDocumentModel.create(data);
  }

  async getById(id: string): Promise<IAttachedDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await AttachedDocumentModel.findById(id).exec();
  }

  async getByEmployee(employeeId: string): Promise<IAttachedDocument[]> {
    return await AttachedDocumentModel.find({ employee_id: employeeId }).exec();
  }

  async update(id: string, data: Partial<IAttachedDocument>): Promise<IAttachedDocument | null> {
    const {error}=attachedDocumentValidator.validate(data);
    if (error) throw new Error(error.message);
    return await AttachedDocumentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IAttachedDocument | null> {
    return await AttachedDocumentModel.findByIdAndDelete(id).exec();
  }
}
