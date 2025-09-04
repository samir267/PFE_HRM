import mongoose, { Schema, Document } from 'mongoose'

export interface IMigrationLock extends Document {
  lockedAt: Date
}

const MigrationLockSchema: Schema = new Schema({
  lockedAt: { type: Date, default: Date.now },
})

export default mongoose.model<IMigrationLock>('MigrationLock', MigrationLockSchema)
