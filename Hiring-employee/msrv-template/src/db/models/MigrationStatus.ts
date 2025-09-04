import mongoose, { Schema, Document } from 'mongoose'

export interface IMigrationStatus extends Document {
  version: string
  appliedAt: Date
  status: 'applied' | 'rolled_back' | 'pending'
}

const MigrationStatusSchema: Schema = new Schema({
  version: { type: String, required: true, unique: true },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['applied', 'rolled_back', 'pending'], default: 'pending' },
})

export default mongoose.model<IMigrationStatus>('MigrationStatus', MigrationStatusSchema)
