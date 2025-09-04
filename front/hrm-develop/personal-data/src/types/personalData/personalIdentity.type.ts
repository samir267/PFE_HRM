import { Types } from "mongoose";

export interface IPersonalIdentity extends Document {
  _id?: Types.ObjectId;
  registrationNumber: string;
  title: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  suffix?: string;
  gender: string;
  nationalities: {
    nationalityId: Types.ObjectId; 
    isPrimary: boolean;
    isResident: boolean;
  }[]; 
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  archiveReason?: string;

  identityDocuments?: {
    nationalIdCard?: {
      number: string;
      placeOfIssue: string;
      dateOfIssue: Date;
    };
    passport?: {
      number: string;
      placeOfIssue: string;
      dateOfIssue: Date;
    };
  };
}
