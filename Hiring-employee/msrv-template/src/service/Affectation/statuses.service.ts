import { StatusDocument, StatusModel } from "../../models/Affectation/statuses.model";

export class StatusService {
  static async createStatus(data: Partial<StatusDocument>): Promise<StatusDocument> {
    const status = new StatusModel(data);
    return await status.save();
  }

  static async updateStatus(id: string, data: Partial<StatusDocument>): Promise<StatusDocument | null> {
    return await StatusModel.findOneAndUpdate({ id }, data, { new: true });
  }

  static async getAll(): Promise<StatusDocument[]> {
    return await StatusModel.find().exec();
  }
}
