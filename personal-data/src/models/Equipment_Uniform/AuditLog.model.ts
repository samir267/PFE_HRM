import mongoose, { Schema } from "mongoose";
import { IAuditLog } from "../../types/Equipment_Uniform/IAuditLog.type";

const AuditLogSchema = new Schema<IAuditLog>({
  entityType: String,
  entityId: String,
  action: String,
  performedBy: String,
  timestamp: Date,
  details: {
    previousValues: Schema.Types.Mixed,
    newValues: Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  sessionId: String
});

export const AuditLogModel = mongoose.model('AuditLog', AuditLogSchema);
