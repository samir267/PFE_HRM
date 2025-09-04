import mongoose, { Schema, Document, Types, trusted } from 'mongoose';
import { INationality } from '../../types/personalData/nationality.type';



const NationalitySchema = new Schema<INationality>(
  {
    nationalityCountryCode: { type: Schema.Types.ObjectId, ref: 'CountryReference', required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const NationalityModel = mongoose.model<INationality>('Nationality', NationalitySchema);