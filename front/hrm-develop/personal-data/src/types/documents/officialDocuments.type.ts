import { Types } from "mongoose";

export interface IOfficialDocument {
  employeeid: Types.ObjectId;
  documenttype:
    | "Permis de conduire"
    | "Passeport"
    | "Carte d'identité"
    | "Contrat de travail"
    | "Visa"
    | "Autre";
  keyidentifier: string;
  issueddate: Date;
  validfrom: Date;
  validuntil?: Date;
  status?: "Valide" | "Expiré" | "En attente de renouvellement" | "Inconnu";
  createdat?: Date;
  updatedat?: Date;
}
