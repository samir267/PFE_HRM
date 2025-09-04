import Joi from 'joi';
import { MaritalStatusType } from '../models/familySituation/marital-status.model';
import { RelationshipType } from '../models/familySituation/dependant.model';

export const maritalStatusSchema = Joi.object({
  personalIdentityId: Joi.string().required().messages({
    'any.required': 'personalIdentityId is required',
    'string.base': 'personalIdentityId must be a string',
  }),
  statusType: Joi.string()
    .valid(...Object.values(MaritalStatusType))
    .required()
    .messages({
      'any.only': `"statusType" must be one of [${Object.values(MaritalStatusType).join(', ')}]`,
      'any.required': 'statusType is required',
    }),
  effectiveDate: Joi.date().max('now').required().messages({
    'date.max': 'effectiveDate cannot be in the future',
    'any.required': 'effectiveDate is required',
  }),
  documentReference: Joi.string().max(100).optional().messages({
    'string.max': 'documentReference must not exceed 100 characters',
  }),
});

export const dependantSchema = Joi.object({
  personalIdentityId: Joi.string().required().messages({
    'any.required': 'personalIdentityId is required',
    'string.base': 'personalIdentityId must be a string',
  }),
  relationshipType: Joi.string()
    .valid(...Object.values(RelationshipType))
    .required()
    .messages({
      'any.only': `"relationshipType" must be one of [${Object.values(RelationshipType).join(', ')}]`,
      'any.required': 'relationshipType is required',
    }),
  lastName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid characters in lastName',
      'string.min': 'lastName must be at least 1 character long',
      'string.max': 'lastName must not exceed 100 characters',
      'any.required': 'lastName is required',
    }),
  firstName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid characters in firstName',
      'string.min': 'firstName must be at least 1 character long',
      'string.max': 'firstName must not exceed 100 characters',
      'any.required': 'firstName is required',
    }),
  dateOfBirth: Joi.date().max('now').required().messages({
    'date.max': 'dateOfBirth cannot be in the future',
    'any.required': 'dateOfBirth is required',
  }),
  isFiscallyDependent: Joi.boolean().required().messages({
    'any.required': 'isFiscallyDependent is required',
  }),
  isPrimaryBeneficiary: Joi.boolean().required().messages({
    'any.required': 'isPrimaryBeneficiary is required',
  }),
  startDate: Joi.date().required().messages({
    'any.required': 'startDate is required',
  }),
  endDate: Joi.date().min(Joi.ref('startDate')).optional().messages({
    'date.min': 'endDate must be after startDate',
  }),
});

export const emergencyContactSchema = Joi.object({
  personalIdentityId: Joi.string().required().messages({
    'any.required': 'personalIdentityId is required',
    'string.base': 'personalIdentityId must be a string',
  }),
  lastName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid characters in lastName',
      'string.min': 'lastName must be at least 1 character long',
      'string.max': 'lastName must not exceed 100 characters',
      'any.required': 'lastName is required',
    }),
  firstName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid characters in firstName',
      'string.min': 'firstName must be at least 1 character long',
      'string.max': 'firstName must not exceed 100 characters',
      'any.required': 'firstName is required',
    }),
  relationship: Joi.string().min(1).max(50).required().messages({
    'string.min': 'relationship must be at least 1 character long',
    'string.max': 'relationship must not exceed 50 characters',
    'any.required': 'relationship is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid phone number format',
      'any.required': 'phoneNumber is required',
    }),
  alternativePhone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid alternative phone number format',
    }),
  email: Joi.string().email().max(100).optional().messages({
    'string.email': 'Invalid email format',
    'string.max': 'email must not exceed 100 characters',
  }),
  isPrimaryContact: Joi.boolean().required().messages({
    'any.required': 'isPrimaryContact is required',
  }),
}).unknown(false); // Rejette explicitement les champs non définis