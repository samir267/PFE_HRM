import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 
      unique: true,
    },
    type: {
      type: String,
      enum: ["Gym", "Garderie"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Actif", "Expiré", "En attente", "Annulé"],
      default: "En attente",
    },
    subscription: {
      type: String,
      enum: ["Premium", "Standard", "VIP", "Temps plein", "Temps partiel", "Occasionnel"],
      required: true,
    }
  },
  { timestamps: true }
);

export const Member = mongoose.model("Member", memberSchema);
