import { AuditLogModel } from "../../models/Equipment_Uniform/AuditLog.model";
import { IAuditLog } from "../../types/Equipment_Uniform/IAuditLog.type";
import { auditLogValidator } from "../../validator/Equipment_Uniform/EquipmentUniform.validator";

export class AuditLogService {
  async create(data: IAuditLog) {
    const { error } = await auditLogValidator.validate(data);
    if (error) throw new Error(error.message);
    return await AuditLogModel.create(data);
  }

  async findAll() {
    return await AuditLogModel.find();
  }

  async findById(id: string) {
    return await AuditLogModel.findById(id);
  }

  async update(id: string, data: IAuditLog) {
    const { error } = await auditLogValidator.validate(data);
    if (error) throw new Error(error.message);
    return await AuditLogModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await AuditLogModel.findByIdAndDelete(id);
  }
}
