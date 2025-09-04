import { Schema, model, Document } from 'mongoose';
import { ContactPreference, PreferredContactMethod } from '../../types/contact/contactTypes.type';

interface IContactPreference extends ContactPreference, Document {}

const ContactPreferenceSchema = new Schema<IContactPreference>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
    preferredContactMethod: { type: String, enum: Object.values(PreferredContactMethod), required: true },
    preferredLanguage: { type: String, required: true, maxlength: 10 },
    preferredTimeStart: { type: Date },
    preferredTimeEnd: { type: Date },
    preferredDays: { type: String, maxlength: 50 },
    optOutMarketing: { type: Boolean, default: false },
    optOutNonEssential: { type: Boolean, default: false },
    communicationRestrictions: { type: String },
    specialInstructions: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model<IContactPreference>('ContactPreference', ContactPreferenceSchema);