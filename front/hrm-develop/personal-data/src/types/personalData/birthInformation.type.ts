import { Types } from "mongoose";

export interface IBirthInformation extends Document {
  _id: Types.ObjectId;
  personalIdentityId: Types.ObjectId;
  dateOfBirth: Date;
  placeOfBirth: string;
  countryOfBirthCode: string;
  createdAt: Date;
  updatedAt: Date;
}