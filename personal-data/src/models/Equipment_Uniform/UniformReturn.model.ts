import { Schema, model } from 'mongoose';
import { IUniformReturn } from '../../types/Equipment_Uniform/IUniformReturn.type';

const uniformReturnSchema = new Schema<IUniformReturn>({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'UniformAssignment',
    required: true,
  },
    uniformInventoryId: {
      type: Schema.Types.ObjectId,
      ref: 'UniformInventory',
      required: true,
    }
  ,
  returnedItems: {
    type: [
      {
        inventoryId: {
          type: Schema.Types.ObjectId,
          ref: 'UniformInventory',
          required: true,
        },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        condition: {
          type: String,
          enum: ['GOOD', 'DAMAGED', 'LOST'],
          required: true,
        },
      },
    ],
    required: true,
  },
  returnedBy: {
    type: String,
    required: true,
  },
  returnDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    required: false,
  },
});

export const UniformReturnModel = model<IUniformReturn>('UniformReturn', uniformReturnSchema);
