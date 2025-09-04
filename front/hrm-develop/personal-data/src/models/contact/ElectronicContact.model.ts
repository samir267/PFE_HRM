import { Schema, model, Document } from 'mongoose';
import { ElectronicContact, ElectronicContactType, ContactPurpose, VerificationStatus } from '../../types/contact/contactTypes.type';

interface IElectronicContact extends ElectronicContact, Document {}

const ElectronicContactSchema = new Schema<IElectronicContact>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
    contactType: { type: String, enum: Object.values(ElectronicContactType), required: true },
    isPrimary: { type: Boolean, default: false },
    contactValue: { type: String, required: true, maxlength: 255 },
    provider: { type: String, maxlength: 50 },
    purpose: { type: String, enum: Object.values(ContactPurpose), default: ContactPurpose.GENERAL },
    verificationStatus: { type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.UNVERIFIED },
    verificationDate: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model<IElectronicContact>('ElectronicContact', ElectronicContactSchema);