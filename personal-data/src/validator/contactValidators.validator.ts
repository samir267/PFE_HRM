import Joi from 'joi';
import {
  AddressType,
  PhoneType,
  ContactPurpose,
  VerificationStatus,
  NotificationProtocol,
  PreferredContactMethod,
} from '../types/contact/contactTypes.type';

export const addressValidationSchema = Joi.object({
  addressType: Joi.string().valid(...Object.values(AddressType)).required(),
  isPrimary: Joi.boolean().default(false),
  streetLine1: Joi.string().max(100).required(),
  streetLine2: Joi.string().max(100).allow(''),
  city: Joi.string().max(50).required(),
  stateProvince: Joi.string().max(50),
  postalCode: Joi.string().max(20).required(),
  countryCode: Joi.string().required(),
  geoLatitude: Joi.number().optional(),
  geoLongitude: Joi.number().optional(),
  effectiveDate: Joi.date().default(Date.now),
  endDate: Joi.date().optional(),
  addressVerificationStatus: Joi.string().valid(...Object.values(VerificationStatus)).default(VerificationStatus.UNVERIFIED),
  verificationDate: Joi.date().optional(),
});

export const phoneValidationSchema = Joi.object({
  phoneType: Joi.number().valid(...Object.values(PhoneType)).allow(''),
  isPrimary: Joi.boolean().default(false),
  countryCode: Joi.string().max(5).allow(''),
  phoneNumber: Joi.string().max(20).min(8).allow(''),
  extension: Joi.string().max(10).optional(),
  isMessagingEnabled: Joi.boolean().default(false),
  preferredTimeStart: Joi.date().optional(),
  preferredTimeEnd: Joi.date().optional(),
  timeZone: Joi.string().max(50).optional(),
  verificationStatus: Joi.string().valid(...Object.values(VerificationStatus)).default(VerificationStatus.UNVERIFIED),
  verificationDate: Joi.date().optional(),
});

export const electronicValidationSchema = Joi.object({
  contactType: Joi.string().required(),
  isPrimary: Joi.boolean().default(false),
  contactValue: Joi.string().max(255).required(),
  provider: Joi.string().max(50).optional(),
  purpose: Joi.string().valid(...Object.values(ContactPurpose)).default(ContactPurpose.GENERAL),
  verificationStatus: Joi.string().valid(...Object.values(VerificationStatus)).default(VerificationStatus.UNVERIFIED),
  verificationDate: Joi.date().optional(),
});

export const emergencyValidationSchema = Joi.object({
  lastName: Joi.string().max(100).required(),
  firstName: Joi.string().max(100).required(),
  relationship: Joi.string().max(50).required(),
  priorityLevel: Joi.number().required(),
  phonePrimary: Joi.string().max(20).required(),
  phoneSecondary: Joi.string().max(20).optional(),
  email: Joi.string().max(100).email().optional(),
  addressId: Joi.string().optional(),
  notes: Joi.string().optional(),
  languagePreference: Joi.string().max(10).optional(),
  notificationProtocol: Joi.string().valid(...Object.values(NotificationProtocol)).default(NotificationProtocol.ALL_METHODS),
  lastVerificationDate: Joi.date().optional(),
});

export const preferenceValidationSchema = Joi.object({
  preferredContactMethod: Joi.string().valid(...Object.values(PreferredContactMethod)).required(),
  preferredLanguage: Joi.string().max(10).required(),
  preferredTimeStart: Joi.date().optional(),
  preferredTimeEnd: Joi.date().optional(),
  preferredDays: Joi.string().max(50).optional(),
  optOutMarketing: Joi.boolean().default(false),
  optOutNonEssential: Joi.boolean().default(false),
  communicationRestrictions: Joi.string().optional(),
  specialInstructions: Joi.string().optional(),
});

export const verificationValidationSchema = Joi.object({
  status: Joi.string().valid(...Object.values(VerificationStatus)).required(),
});