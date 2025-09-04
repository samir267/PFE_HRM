import mongoose, { Schema } from 'mongoose';
import { IFeatureFlag } from '../types/featureFlag.type';

const FeatureFlagSchema = new Schema<IFeatureFlag>({
  name: { type: String, required: true, unique: true },
  enabled: { type: Boolean, required: true },
  targeting: {
    users: [{ type: String }],
    tenants: [{ type: String }],
    percentage: { type: Number, min: 0, max: 100 },
  },
});

export const FeatureFlag = mongoose.model<IFeatureFlag>('FeatureFlag', FeatureFlagSchema);