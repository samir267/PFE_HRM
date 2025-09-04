import mongoose, { Schema, Document } from 'mongoose';
import { IDataHistory } from '../../types/personalData/dataHistory.type';



const DataHistorySchema = new Schema<IDataHistory>(
  {
    entityId: { type: String, required: true },
    entityType: { type: String, required: true },
    previousState: { type: Schema.Types.Mixed, required: true },
    currentState: { type: Schema.Types.Mixed, required: true },
    modifiedBy: { type: String, required: true },
    modificationDate: { type: Date, default: Date.now },
    modificationType: { type: String, enum: ['CREATE', 'UPDATE', 'PARTIAL_UPDATE', 'DELETE'], required: true },
  },
  { timestamps: true }
);

export const DataHistoryModel = mongoose.model<IDataHistory>('DataHistory', DataHistorySchema);