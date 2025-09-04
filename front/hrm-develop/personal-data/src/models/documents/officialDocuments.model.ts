import mongoose, { Schema, Model, Document } from "mongoose";
import { IOfficialDocument } from "../../types/documents/officialDocuments.type";

const OfficialDocumentSchema = new Schema<IOfficialDocument>(
  {
    employeeid: { type: Schema.Types.ObjectId, ref: "PersonalIdentity", required: true },
    documenttype: {
      type: String,
      enum: [
        "Permis de conduire",
        "Passeport",
        "Carte d'identité",
        "Contrat de travail",
        "Visa",
        "Autre"
      ],
      required: true
    },
    keyidentifier: { type: String, required: true },
    issueddate: { type: Date, required: true },
    validfrom: { type: Date, required: true },
    validuntil: { type: Date },
    status: {
      type: String,
      enum: ["Valide", "Expiré", "En attente de renouvellement", "Inconnu"],
      default: "Valide"
    },
  },
  { timestamps: true }
);

export const OfficialDocumentModel: Model<IOfficialDocument> =
  mongoose.model<IOfficialDocument>("OfficialDocument", OfficialDocumentSchema);
