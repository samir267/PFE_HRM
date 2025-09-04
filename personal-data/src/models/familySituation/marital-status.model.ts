import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IMaritalStatus } from '../../types/familySituation/IMaritalStatus.type';

export enum MaritalStatusType {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  CIVIL_PARTNERSHIP = 'CIVIL_PARTNERSHIP',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

const maritalStatusSchema = new Schema<IMaritalStatus>({
  // _id: {
  //   type: String,
  //   default: () => uuidv4(),
  // },
  personalIdentityId: {
    type: String,
    required: true,
    index: true,
  },
  statusType: {
    type: String,
    enum: Object.values(MaritalStatusType),
    required: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: 'effectiveDate cannot be in the future',
    },
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value: Date) {
        return !value || (this.effectiveDate && value > this.effectiveDate);
      },
      message: 'endDate must be after effectiveDate',
    },
  },
  documentReference: {
    type: String,
    maxlength: 100,
  },
}, {
  timestamps: true,
  collection: 'marital_status',
});

// Index pour garantir un seul statut matrimonial actif par personalIdentityId
maritalStatusSchema.index(
  { personalIdentityId: 1, endDate: 1 },
  { unique: true, partialFilterExpression: { endDate: null } },
);

export const MaritalStatusModel = model<IMaritalStatus>('MaritalStatus', maritalStatusSchema);