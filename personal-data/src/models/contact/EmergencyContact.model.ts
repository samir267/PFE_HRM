import { Schema, model, Document } from 'mongoose';
import { EmergencyContact, NotificationProtocol } from '../../types/contact/contactTypes.type';

interface IEmergencyContact extends EmergencyContact, Document {}

const EmergencyContactSchema = new Schema<IEmergencyContact>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, ref: 'PersonalIdentity', required: true },
    lastName: { type: String, required: true, maxlength: 100 },
    firstName: { type: String, required: true, maxlength: 100 },
    relationship: { type: String, required: true, maxlength: 50 },
    priorityLevel: { type: Number, required: true },
    phonePrimary: { type: String, required: true, maxlength: 20 },
    phoneSecondary: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 100 },
    addressId: { type: Schema.Types.ObjectId, ref: 'PostalAddress' },
    notes: { type: String },
    languagePreference: { type: String, maxlength: 10 },
    notificationProtocol: { type: String, enum: Object.values(NotificationProtocol), default: NotificationProtocol.ALL_METHODS },
    lastVerificationDate: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model<IEmergencyContact>('Emergency-Contact', EmergencyContactSchema);