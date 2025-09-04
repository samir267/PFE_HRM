import { N } from "@faker-js/faker/dist/airline-CBNP41sR";
import { Types } from "mongoose";

export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  SECONDARY = 'SECONDARY',
  OTHER = 'OTHER',
}

export enum PhoneType {
  MOBILE = 'MOBILE',
  HOME = 'HOME',
  WORK = 'WORK',
  FAX = 'FAX',
  OTHER = 'OTHER',
}

export enum ElectronicContactType {
  EMAIL = 'EMAIL',
  CORPORATE_EMAIL = 'CORPORATE_EMAIL',
  MESSENGER = 'MESSENGER',
  SOCIAL = 'SOCIAL',
  OTHER = 'OTHER',
}

export enum ContactPurpose {
  GENERAL = 'GENERAL',
  OFFICIAL_COMMUNICATIONS = 'OFFICIAL_COMMUNICATIONS',
  MARKETING = 'MARKETING',
  ALERTS = 'ALERTS',
}

export enum VerificationStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  INVALID = 'INVALID',
}

export enum NotificationProtocol {
  CALL_ONLY = 'CALL_ONLY',
  CALL_THEN_EMAIL = 'CALL_THEN_EMAIL',
  ALL_METHODS = 'ALL_METHODS',
}

export enum PreferredContactMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  MAIL = 'MAIL',
  MESSENGER = 'MESSENGER',
  IN_PERSON = 'IN_PERSON',
}

export interface Address {
  personalIdentityId: Types.ObjectId;
  addressType: AddressType;
  isPrimary: boolean;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  stateProvince?: string;
  postalCode: string;
  countryCode: string;
  geoLatitude?: number;
  geoLongitude?: number;
  effectiveDate: Date;
  endDate?: Date;
  addressVerificationStatus: VerificationStatus;
  verificationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhoneContact {
  personalIdentityId: Types.ObjectId;
  phoneType: PhoneType;
  isPrimary: boolean;
  countryCode: string;
  phoneNumber: Number;
  extension?: string;
  isMessagingEnabled: boolean;
  preferredTimeStart?: Date;
  preferredTimeEnd?: Date;
  timeZone?: string;
  verificationStatus: VerificationStatus;
  verificationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ElectronicContact {
  personalIdentityId: Types.ObjectId;
  contactType: ElectronicContactType;
  isPrimary: boolean;
  contactValue: string;
  provider?: string;
  purpose: ContactPurpose;
  verificationStatus: VerificationStatus;
  verificationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  personalIdentityId: Types.ObjectId;
  lastName: string;
  firstName: string;
  relationship: string;
  priorityLevel: number;
  phonePrimary: string;
  phoneSecondary?: string;
  email?: string;
  addressId?: string;
  notes?: string;
  languagePreference?: string;
  notificationProtocol: NotificationProtocol;
  lastVerificationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactPreference {
  personalIdentityId: Types.ObjectId;
  preferredContactMethod: PreferredContactMethod;
  preferredLanguage: string;
  preferredTimeStart?: Date;
  preferredTimeEnd?: Date;
  preferredDays?: string;
  optOutMarketing: boolean;
  optOutNonEssential: boolean;
  communicationRestrictions?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValidationReport {
  hasValidAddress: boolean;
  hasValidPhone: boolean;
  hasValidEmail: boolean;
  hasEmergencyContact: boolean;
  hasPreferences: boolean;
}