
import { Schema, model, Document } from 'mongoose';
import { PhoneContact, PhoneType, VerificationStatus } from '../../types/contact/contactTypes.type';

interface IPhoneContact extends PhoneContact, Document {}

const PhoneContactSchema = new Schema<IPhoneContact>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
    phoneType: { type: String, enum: Object.values(PhoneType), required: true },
    isPrimary: { type: Boolean, default: false },
    countryCode: { type: String, required: true, maxlength: 5 },
    phoneNumber: { type: Number, required: true, maxlength: 20 },
    extension: { type: String, maxlength: 10 },
    isMessagingEnabled: { type: Boolean, default: false },
    preferredTimeStart: { type: Date },
    preferredTimeEnd: { type: Date },
    timeZone: { type: String, maxlength: 50 },
    verificationStatus: { type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.UNVERIFIED },
    verificationDate: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model<IPhoneContact>('PhoneContact', PhoneContactSchema);