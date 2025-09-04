import { Types } from "mongoose";

export interface INationality extends Document {
  _id: Types.ObjectId;
  nationalityCountryCode: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}