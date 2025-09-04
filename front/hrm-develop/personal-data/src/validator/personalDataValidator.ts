import Joi from 'joi';

export const nationalitySchema = Joi.object({
  nationalityCountryCode: Joi.string()
    // .pattern(/^[0-9a-fA-F]{24}$/)
    // .required()
    .messages({
      // 'any.required': 'nationalityCountryCode is required',
      // 'string.pattern.base': 'nationalityCountryCode must be a valid ObjectId',
    }),
  isPrimary: Joi.boolean().default(false).optional(),
  isResident: Joi.boolean().default(false).optional(),
});

export const personalIdentitySchema = Joi.object({
  personalIdentity: Joi.object({
    title: Joi.string()
      .valid('MR', 'MME', 'MLLE', 'DR', 'PR')
      .required()
      .messages({ 'any.only': '"title" must be one of [MR, MME, MLLE, DR, PR]' }),
    lastName: Joi.string()
      .min(1)
      .max(100)
      .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid characters in lastName',
        'string.min': 'lastName must be at least 1 character long',
        'string.max': 'lastName must not exceed 100 characters',
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
      }),
    middleName: Joi.string()
      .max(100)
      .pattern(/^[A-Za-zÀ-ÿ\s-']*$/)
      .allow('')
      .optional()
      .messages({
        'string.pattern.base': 'Invalid characters in middleName',
        'string.max': 'middleName must not exceed 100 characters',
      }),
    suffix: Joi.string()
      .max(50)
      .optional()
      .allow('')
      .messages({
        'string.max': 'suffix must not exceed 50 characters',
      }),
    gender: Joi.string()
      .valid('MALE', 'FEMALE', 'OTHER')
      .required()
      .messages({ 'any.only': '"gender" must be one of [MALE, FEMALE, OTHER]' }),
          identityDocuments: Joi.object({
      nationalIdCard: Joi.object({
        number: Joi.string().required(),
        placeOfIssue: Joi.string().required(),
 dateOfIssue: Joi.date()
      .max('now')
      .required()
      .messages({
        'date.max': 'nationalIdCard.dateOfIssue cannot be in the future',
      }),
      }).optional(),

      passport: Joi.object({
        number: Joi.string().required(),
        placeOfIssue: Joi.string().required(),
  dateOfIssue: Joi.date()
      .max('now')
      .required()
      .messages({
        'date.max': 'nationalIdCard.dateOfIssue cannot be in the future',
      }),
    }).optional()
  }).optional(),
  }).required(),

  
  







  birthInformation: Joi.object({
    dateOfBirth: Joi.date()
      .required()
      .messages({ 'any.required': 'dateOfBirth is required' }),
    placeOfBirth: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages({
        'string.min': 'placeOfBirth must be at least 1 character long',
        'string.max': 'placeOfBirth must not exceed 100 characters',
        'any.required': 'placeOfBirth is required',
      }),
    countryOfBirthCode: Joi.string()
      .pattern(/^[A-Z]{2,3}$/)
      .required()
      .messages({
        'any.required': 'countryOfBirthCode is required',
        'string.pattern.base': 'countryOfBirthCode must be a valid country code (e.g., FRA)',
      }),
  }).required(),
 nationalities: Joi.array()
    .items(
      Joi.object({
        nationalityId: Joi.string().required(),
        isPrimary: Joi.boolean().optional(),
        isResident: Joi.boolean().optional(),
      })
    )
    .required(),
    
});



// Schema for partial updates to PersonalIdentity (for PATCH operations)
export const partialPersonalIdentitySchema = Joi.object({
  title: Joi.string().valid('MR', 'MME', 'MLLE', 'DR', 'PR').optional()
    .messages({ 'any.only': '"title" must be one of [MR, MME, MLLE, DR, PR]' }),
  lastName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid characters in lastName',
      'string.min': 'lastName must be at least 1 character long',
      'string.max': 'lastName must not exceed 100 characters',
    }),
  firstName: Joi.string()
    .min(1)
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid characters in firstName',
      'string.min': 'firstName must be at least 1 character long',
      'string.max': 'firstName must not exceed 100 characters',
    }),
  middleName: Joi.string()
    .max(100)
    .pattern(/^[A-Za-zÀ-ÿ\s-']*$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Invalid characters in middleName',
      'string.max': 'middleName must not exceed 100 characters',
    }),
  suffix: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      'string.max': 'suffix must not exceed 50 characters',
    }),
    isActive: Joi.boolean().optional().default(true),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').optional()
    .messages({ 'any.only': '"gender" must be one of [MALE, FEMALE, OTHER]' }),
          identityDocuments: Joi.object({
      nationalIdCard: Joi.object({
        number: Joi.string().required(),
        placeOfIssue: Joi.string().required(),
 dateOfIssue: Joi.date()
      .max('now')
      .required()
      .messages({
        'date.max': 'nationalIdCard.dateOfIssue cannot be in the future',
      }),
      }).optional(),

      passport: Joi.object({
        number: Joi.string().required(),
        placeOfIssue: Joi.string().required(),
  dateOfIssue: Joi.date()
      .max('now')
      .required()
      .messages({
        'date.max': 'nationalIdCard.dateOfIssue cannot be in the future',
      }),
    }).optional()
  }).optional(),
});

// Schema for BirthInformation
export const birthInformationSchema = Joi.object({
  dateOfBirth: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.max': 'Date of birth cannot be in the future',
      'any.required': 'dateOfBirth is required',
    }),
  placeOfBirth: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'placeOfBirth must be at least 1 character long',
      'string.max': 'placeOfBirth must not exceed 100 characters',
      'any.required': 'placeOfBirth is required',
    }),
  countryOfBirthCode: Joi.string()
    .length(3)
    .required()
    .messages({
      'string.length': 'countryOfBirthCode must be exactly 3 characters long',
      'any.required': 'countryOfBirthCode is required',
    }),
    nationalities: Joi.array()
    .items(
      Joi.object({
        nationalityCountryCode: Joi.string().required(), // Accepts countryCode (e.g., "FRA") or ObjectId
        isPrimary: Joi.boolean().default(false),
        isResident: Joi.boolean().default(false),
      })
    )
    .min(1),
});

// Schema for Nationality

// Schema for creating an employee (combines the above schemas)
export const createEmployeeSchema = Joi.object({
  personalIdentity: personalIdentitySchema.required()
    .messages({ 'any.required': 'personalIdentity is required' }),
  birthInformation: birthInformationSchema.required()
    .messages({ 'any.required': 'birthInformation is required' }),
 
});

// Schema for patching an employee (allows partial updates to personalIdentity, birthInformation, and nationalities)
export const patchEmployeeSchema = Joi.object({
  personalIdentity: partialPersonalIdentitySchema.optional(),
  birthInformation: birthInformationSchema.optional(),
  nationalities: Joi.array().items(nationalitySchema).optional(),
}).min(1).messages({
  'object.min': 'At least one of personalIdentity, birthInformation, or nationalities must be provided',
});