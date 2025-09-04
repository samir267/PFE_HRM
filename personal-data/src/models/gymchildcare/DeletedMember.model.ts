import mongoose from "mongoose";

const deletedMemberSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: {
    type: String,
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  },
  type: { type: String, enum: ["Gym", "Garderie"] },
  status: { type: String, enum: ["Actif", "Expiré", "En attente", "Annulé"] },
    subscription: { type: String, enum: ["Premium", "Standard", "VIP", "Temps plein", "Temps partiel", "Occasionnel"] },

  deleted_at: { type: Date, default: Date.now },
});

export const DeletedMember = mongoose.model("DeletedMember", deletedMemberSchema);
