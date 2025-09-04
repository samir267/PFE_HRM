import { Schema, model, Document } from 'mongoose';
import { Address, AddressType, VerificationStatus } from '../../types/contact/contactTypes.type';

interface IAddress extends Address, Document {}

const PostalAddressSchema = new Schema<IAddress>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, required: true, ref: 'PersonalIdentity' }, // Changed to ObjectId
    addressType: { type: String, enum: Object.values(AddressType), required: true },
    isPrimary: { type: Boolean, default: false },
    streetLine1: { type: String, required: true, maxlength: 100 },
    streetLine2: { type: String, maxlength: 100 },
    city: { type: String, required: true, maxlength: 50 },
    stateProvince: { type: String, maxlength: 50 },
    postalCode: { type: String, required: true, maxlength: 20 },
    countryCode: { type: String, required: true, maxlength: 10 },
    geoLatitude: { type: Number },
    geoLongitude: { type: Number },
    effectiveDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    addressVerificationStatus: { type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.UNVERIFIED },
    verificationDate: { type: Date },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default model<IAddress>('PostalAddress', PostalAddressSchema);