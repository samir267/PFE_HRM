import mongoose, { Schema, Document ,Types} from 'mongoose';
import { IPersonalIdentity } from '../../types/personalData/personalIdentity.type';


const PersonalIdentitySchema = new Schema<IPersonalIdentity>(
  {
    title: { type: String, enum: ['MR', 'MME', 'MLLE', 'DR', 'PR'], required: true },
    lastName: { type: String, required: true, maxlength: 100 },
    firstName: { type: String, required: true, maxlength: 100 },
    middleName: { type: String, maxlength: 100},
    suffix: { type: String, maxlength: 50 },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    archiveReason: { type: String },
    nationalities: [
      {
        nationalityId: { type: Schema.Types.ObjectId, ref: 'Nationality', required: true },
        isPrimary: { type: Boolean, default: false },
        isResident: { type: Boolean, default: false },
      },
    ],
    registrationNumber: {
    type: String,
    unique: true,
    required: true
  },
  identityDocuments: {
    nationalIdCard: {
      number: String,
      placeOfIssue: String,
      dateOfIssue: Date,
    },
    passport: {
      number: String,
      placeOfIssue: String,
      dateOfIssue: Date,
    }
  },
    
  },
  { timestamps: true }
);


export const PersonalIdentityModel = mongoose.model<IPersonalIdentity>('PersonalIdentity', PersonalIdentitySchema);