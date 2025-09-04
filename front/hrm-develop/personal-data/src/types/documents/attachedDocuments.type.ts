import { Types } from "mongoose";

export interface IAttachedDocument {
 
  employeeid: Types.ObjectId;
  documenttype:
    | "Diplôme"
    | "Certificat"
    | "CV"
    | "Lettre de motivation"
    | "Contrat de travail"
    | "Vidéo"
    | "Autre";
  documentname: string;
  fileurl: string;
  filesizebytes?: number;
  mimetype?: string;
  uploadedby?: Types.ObjectId;
  comments?: string;
  isconfidential?: boolean;
  uploadedat?: Date;
  updatedat?: Date;
}
