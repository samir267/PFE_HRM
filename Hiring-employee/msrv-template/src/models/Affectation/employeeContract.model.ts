import mongoose, { Schema, Document, Model } from 'mongoose';
import { IContract } from '../../types/Affectation/employeeContract.type';

const ContractSchema: Schema<IContract> = new Schema({

  contractId: { type: String, required: true, trim: true },
  employeeName: { type: String, required: true, trim: true },

  contractStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Terminated', 'Pending Renewal', 'Draft'],
    default: 'Draft'
  },

  contractType: { type: String, required: true, trim: true },

  department: String,
  email: String,
  endDate: Date,
  phone: String,
  position: String,
  startDate: Date,
  terminationReason: String,

  contractDetails: {
    benefitsPackage: String,
    contractEligibilityStatus: {
      type: String,
      enum: ['Valid', 'Invalid', 'Under Review'],
      default: 'Under Review'
    },
    contractReviewer: { type: String, default: 'HR Manager' },
    dob: Date,
    lastReviewDate: Date,
    linkedInProfile: String,
    managerNotes: String,
    nationality: String,
    notes: String,
    noticePeriod: String,
    probationEndDate: Date,
    salaryDetails: String,
    workIdentifier: String
  }
}, { timestamps: true });

// Export du modèle
export const Contract: Model<IContract> = mongoose.model<IContract>('Contract', ContractSchema);
