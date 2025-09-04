import mongoose, { Schema, Document } from 'mongoose';
import { ICountryReference } from '../../types/personalData/countryReference.type';



const CountryReferenceSchema = new Schema<ICountryReference>(
  {
    countryCode: { type: String, required: true, maxlength: 3, unique: true },
    countryName: { type: String, required: true, maxlength: 100 },
    continent: { type: String, required: true, maxlength: 50 },
  },
  { timestamps: true }  
);

export const CountryReferenceModel = mongoose.model<ICountryReference>('CountryReference', CountryReferenceSchema);