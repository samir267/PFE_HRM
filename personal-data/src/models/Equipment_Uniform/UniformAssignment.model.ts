import { Schema, model } from 'mongoose';
import { IUniformAssignment } from '../../types/Equipment_Uniform/IUniformAssignment.type';

const uniformAssignmentSchema = new Schema<IUniformAssignment>({
  employeeId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
  uniformInventoryId: { type: Schema.Types.ObjectId, ref: 'UniformInventory', required: true },
  uniformDetails: {
    type: {
      items: {
        type: [{
          itemId: { type: String, required: true },
          type: { type: String, enum: ['SHIRT', 'PANTS', 'JACKET', 'OTHER'], required: true },
          size: { type: String, required: true },
          color: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1 },
          customization: {
            type: {
              embroidery: { type: String, required: false },
              logo: { type: String, required: false },
              position: { type: String, enum: ['LEFT_CHEST', 'RIGHT_CHEST', 'BACK', 'NONE'], required: false },
            },
            required: false,
          },
        }],
        required: true,
      },
      totalValue: { type: Number, required: true },
    },
    required: true,
  },
  assignmentDetails: {
    type: {
      assignedDate: { type: Date, required: true },
      assignedBy: { type: String, required: true },
      renewalSchedule: {
        type: {
          frequency: { type: String, enum: ['ANNUAL', 'BIANNUAL', 'QUARTERLY'], required: true },
          nextRenewal: { type: Date, required: true },
        },
        required: true,
      },
    },
    required: true,
  },
  currentStatus: { type: String, enum: ['ASSIGNED', 'RETURNED', 'PENDING'], required: true },
  statusHistory: {
    type: [{
      status: { type: String, enum: ['ASSIGNED', 'RETURNED', 'PENDING'], required: true },
      date: { type: Date, required: true },
      changedBy: { type: String, required: true },
      reason: { type: String, required: true },
    }],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ajouter un middleware pour mettre à jour updatedAt lors des modifications
uniformAssignmentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const UniformAssignmentModel = model<IUniformAssignment>('UniformAssignment', uniformAssignmentSchema);