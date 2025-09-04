import { Schema, model } from 'mongoose';
import { IUniformType } from '../../types/Equipment_Uniform/IUniformType.type';

const uniformTypeSchema = new Schema<IUniformType>({
  name: {
    type: String,
    enum: ['SHIRT', 'PANTS', 'JACKET', 'OTHER'],
    required: true,
    unique: true,
  },
  availableSizes: {
    type: [String], // exemple: ['S', 'M', 'L', 'XL']
    required: true,
  },
  availableColors: {
    type: [String],
    required: true,
  },
  defaultCustomizationOptions: {
    type: {
      embroidery: { type: Boolean, default: false },
      logo: { type: Boolean, default: false },
      positions: {
        type: [String],
        enum: ['LEFT_CHEST', 'RIGHT_CHEST', 'BACK', 'NONE'],
        default: ['NONE'],
      },
    },
    required: false,
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

uniformTypeSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const UniformTypeModel = model<IUniformType>('UniformType', uniformTypeSchema);
