import { Schema, model, Document } from "mongoose";

export interface StatusDocument extends Document {
  id: string;
  name: string;
  category: "Request" | "Candidate";
  description?: string;
  isDefault: boolean;
  color: string;
}

const StatusSchema = new Schema<StatusDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, enum: ["Request", "Candidate"], required: true },
    description: { type: String },
    isDefault: { type: Boolean, default: false },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export const StatusModel = model<StatusDocument>("Status", StatusSchema);
