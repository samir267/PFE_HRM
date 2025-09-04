import mongoose, { Schema, Model } from "mongoose";
import { IAttachedDocument } from "../../types/documents/attachedDocuments.type";

const AttachedDocumentSchema = new Schema<IAttachedDocument>(
  {
    employeeid: { type: Schema.Types.ObjectId, ref: "PersonalIdentity", required: true },
    documenttype: {
      type: String,
      enum: ["Diplôme", "Certificat", "CV", "Lettre de motivation", "Contrat de travail", "Vidéo", "Autre"],
      required: true
    },
    documentname: { type: String, required: true },
    fileurl: { type: String, required: true },
    filesizebytes: { type: Number },
    mimetype: { type: String },
    uploadedby: { type: Schema.Types.ObjectId, ref: "User" },
    comments: { type: String },
    isconfidential: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const AttachedDocumentModel: Model<IAttachedDocument> =
  mongoose.model<IAttachedDocument>("AttachedDocument", AttachedDocumentSchema);
