import { Schema, model } from 'mongoose';
import { IUniformInventory } from '../../types/Equipment_Uniform/IUniformInventory.type';

const uniformInventorySchema = new Schema<IUniformInventory>({
  uniformTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'UniformType',
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pour mettre à jour updatedAt
uniformInventorySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const UniformInventoryModel = model<IUniformInventory>('UniformInventory', uniformInventorySchema);
