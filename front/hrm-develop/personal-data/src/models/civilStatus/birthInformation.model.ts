import mongoose, { Schema, Document, Types } from 'mongoose';
import { IBirthInformation } from '../../types/personalData/birthInformation.type';



const BirthInformationSchema = new Schema<IBirthInformation>(
  {
    personalIdentityId: { type: Schema.Types.ObjectId, required: true, ref: 'PersonalIdentity' }, // Changed to ObjectId
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true, maxlength: 100 },
    countryOfBirthCode: { type: String, required: true, maxlength: 3 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BirthInformationModel = mongoose.model<IBirthInformation>('BirthInformation', BirthInformationSchema);