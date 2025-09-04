// import { Types } from "mongoose";

// export interface IEmploymentContract {
//   _id: any;
//   // Champs principaux du contrat
//   assignmentId: Types.ObjectId; 
//   contractType: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERNSHIP';
//   contractReference: string;
  
//   // Dates du contrat
//   signatureDate: Date;
//   effectiveDate: Date;
//   endDate?: Date;
  
//   // Informations du document
//   documentPath?: string;
  
//   // Accords collectifs
//   collectiveAgreementId?: Types.ObjectId; 
  
//   // Période de préavis
//   noticePeriodDays: number;
  
//   // Clauses du contrat
//   nonCompeteClause: boolean;
//   nonCompeteDurationMonths?: number;
//   confidentialityClause: boolean;
  
//   // Informations de création
//   createdBy: string;
  
//   // Champs supplémentaires pour le frontend
//   employeeName?: string;
//   department?: string;
//   position?: string;
//   email?: string;
//   phone?: string;
  
//   // Statut du contrat
//   contractStatus?: 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal';
  
//   // Détails supplémentaires
//   contractReviewer?: string;
//   workIdentifier?: string;
//   contractEligibilityStatus?: 'Valid' | 'Invalid' | 'Under Review';
//   managerNotes?: string;
//   notes?: string;
//   lastReviewDate?: Date;
//   probationEndDate?: Date;
  
//   // Timestamps
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Interface pour la création d'un contrat (sans les champs automatiques)
// export interface ICreateEmploymentContract {
//   assignmentId: Types.ObjectId;
//   contractType: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERNSHIP';
//   contractReference: string;
//   signatureDate: Date;
//   effectiveDate: Date;
//   endDate?: Date;
//   documentPath?: string;
//   collectiveAgreementId?: Types.ObjectId;
//   noticePeriodDays: number;
//   nonCompeteClause: boolean;
//   nonCompeteDurationMonths?: number;
//   confidentialityClause: boolean;
//   createdBy: string;
//   employeeName?: string;
//   department?: string;
//   position?: string;
//   email?: string;
//   phone?: string;
//   contractStatus?: 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal';
//   contractReviewer?: string;
//   workIdentifier?: string;
//   contractEligibilityStatus?: 'Valid' | 'Invalid' | 'Under Review';
//   managerNotes?: string;
//   notes?: string;
//   lastReviewDate?: Date;
//   probationEndDate?: Date;
// }

// // Interface pour la mise à jour d'un contrat
// export interface IUpdateEmploymentContract extends Partial<ICreateEmploymentContract> {
//   _id: string;
// }

// // Interface pour les filtres de recherche
// export interface IContractFilters {
//   assignmentId?: string;
//   contractType?: string;
//   contractStatus?: string;
//   employeeName?: string;
//   department?: string;
//   effectiveDate?: string;
//   endDate?: string;
//   contractEligibilityStatus?: string;
// }
import { Document } from 'mongoose';

// Interface pour TypeScript alignée au schéma Mongoose
export interface IContract extends Document {
  id?: string;
  contractId: string; // requis
  employeeName: string; // requis
  contractStatus: 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal' | 'Draft';
  contractType: string; // requis
  department?: string;
  email?: string;
  endDate?: Date;
  phone?: string;
  position?: string;
  startDate?: Date;
  terminationReason?: string;

  contractDetails?: {
    benefitsPackage?: string;
    contractEligibilityStatus?: 'Valid' | 'Invalid' | 'Under Review';
    contractReviewer?: string;
    dob?: Date;
    lastReviewDate?: Date;
    linkedInProfile?: string;
    managerNotes?: string;
    nationality?: string;
    notes?: string;
    noticePeriod?: string;
    probationEndDate?: Date;
    salaryDetails?: string;
    workIdentifier?: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
