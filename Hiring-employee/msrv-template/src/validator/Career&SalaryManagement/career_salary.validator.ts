import Joi from 'joi';
import { ICareerPosition } from '../../types/Career&SalaryManagement/careerPosition.type';
import { ICareerDevelopment } from '../../types/Career&SalaryManagement/careerDevelopment.type';

export const careerPositionValidator = Joi.object({
  personalIdentityId: Joi.string().required(),
  jobTitle: Joi.string().max(100).required(),
  departmentId: Joi.string().required(),
  levelCode: Joi.string().max(20).required(),
  positionType: Joi.string().valid('PERMANENT', 'TEMPORARY', 'CONTRACT', 'INTERNSHIP').required(),
  reportingTo: Joi.string().allow(null),
 startDate: Joi.date().max('now').required().messages({
    'date.max': 'startDate ne peut pas être dans le futur.'
  }),
  endDate: Joi.date().allow(null).greater(Joi.ref('startDate')).messages({
    'date.greater': 'endDate doit être postérieure à startDate.'
  }),
  locationId: Joi.string().required(),
  isCurrent: Joi.boolean().required(),
  positionDescription: Joi.string().allow('', null)
});

export const salaryRecordValidator = Joi.object({
  personalIdentityId: Joi.string().required(),
  careerPositionId: Joi.string().required(),
  // baseSalaryAmount: {
  //   type: Number,
  //   required: true,
  //   min: [0, 'base_salary_amount doit être positif.']
  // },
baseSalaryAmount: Joi.number().min(0).required().messages({
    'number.base': 'baseSalaryAmount doit être un nombre.',
    'number.min': 'baseSalaryAmount doit être positif.',
    'any.required': 'baseSalaryAmount est requis.'
  }),  currencyCode: Joi.string().length(3).required(),
  paymentFrequency: Joi.string().valid('MONTHLY', 'BIWEEKLY', 'WEEKLY', 'ANNUAL').required(),
 effectiveDate: Joi.date().max('now').required().messages({
    'date.max': 'effectiveDate ne peut pas être dans le futur.',
    'any.required': 'effectiveDate est requis.'
  })
  , endDate: Joi.date().greater(Joi.ref('effectiveDate')).allow(null),
  changeReason: Joi.string().valid('HIRING', 'PROMOTION', 'ANNUAL_REVIEW', 'ADJUSTMENT', 'DEMOTION', 'TRANSFER').required(),
  approvedBy: Joi.string().required(),
  approvalDate: Joi.date().required()
});

// export const compensationComponentValidator = Joi.object({
//   salaryRecordId: Joi.string().uuid().required(),
//   componentType: Joi.string().valid('BONUS', 'COMMISSION', 'ALLOWANCE', 'BENEFIT', 'STOCK_OPTION').required(),
//   componentName: Joi.string().max(100).required(),
//   amountValue: Joi.number().positive().allow(null),
//   amountPercentage: Joi.number().positive().allow(null),
//   calculationBasis: Joi.string().max(50).allow(null),
//   paymentFrequency: Joi.string().valid('MONTHLY', 'QUARTERLY', 'ANNUAL', 'ONE_TIME').required(),
//   effectiveDate: Joi.date().max('now').required(),
//   endDate: Joi.date().greater(Joi.ref('effectiveDate')).allow(null),
//   conditions: Joi.string().allow('', null)
// });


export const performanceReviewValidator = Joi.object({
  personalIdentityId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'personalIdentityId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'string.length': 'personalIdentityId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'any.required': 'personalIdentityId est requis.'
  }),
  reviewPeriodStart: Joi.date().required().messages({
    'any.required': 'reviewPeriodStart est requis.'
  }),
  reviewPeriodEnd: Joi.date().required().greater(Joi.ref('reviewPeriodStart')).messages({
    'date.greater': 'reviewPeriodEnd doit être postérieure à reviewPeriodStart.',
    'any.required': 'reviewPeriodEnd est requis.'
  }),
 reviewDate: Joi.date().required().greater(Joi.ref('reviewPeriodEnd')).messages({
  'date.greater': 'reviewDate doit être postérieure à reviewPeriodEnd.'
}),
  reviewType: Joi.string().valid('ANNUAL', 'MID_YEAR', 'PROBATION', 'PROJECT').required().messages({
    'any.only': 'reviewType doit être l’une des valeurs suivantes : ANNUAL, MID_YEAR, PROBATION, PROJECT.',
    'any.required': 'reviewType est requis.'
  }),
  reviewerId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'reviewerId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'string.length': 'reviewerId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'any.required': 'reviewerId est requis.'
  }),
  overallRating: Joi.number().required().max(Joi.ref('ratingScaleMaximum')).messages({
    'number.max': 'overallRating doit être ≤ ratingScaleMaximum.',
    'any.required': 'overallRating est requis.'
  }),
  ratingScaleMaximum: Joi.number().required().messages({
    'any.required': 'ratingScaleMaximum est requis.'
  }),
  performanceSummary: Joi.string().required().messages({
    'any.required': 'performanceSummary est requis.'
  }),
  strengths: Joi.string().allow('', null),
  areasForImprovement: Joi.string().allow('', null),
  goalsAchievement: Joi.string().allow('', null),
  approvedBy: Joi.string().hex().length(24).allow(null).messages({
    'string.hex': 'approvedBy doit être un ObjectId valide (24 caractères hexadécimaux).',
    'string.length': 'approvedBy doit être un ObjectId valide (24 caractères hexadécimaux).'
  }),
  approvalDate: Joi.date().allow(null),
  employeeAcknowledgment: Joi.boolean().required().messages({
    'any.required': 'employeeAcknowledgment est requis.'
  }),
  acknowledgmentDate: Joi.date().allow(null),
});


export const careerDevelopmentValidator = Joi.object({
  personalIdentityId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'personalIdentityId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'string.length': 'personalIdentityId doit être un ObjectId valide (24 caractères hexadécimaux).',
    'any.required': 'personalIdentityId est requis.'
  }),
  discussionDate: Joi.date().max('now').required().messages({
    'date.max': 'discussionDate ne peut pas être dans le futur.',
    'any.required': 'discussionDate est requis.'
  }),
  careerGoals: Joi.string().allow('', null),
  desiredPositions: Joi.string().max(200).allow('', null).messages({
    'string.max': 'desiredPositions ne peut pas dépasser 200 caractères.'
  }),
  mobilityPreferences: Joi.string().valid('LOCAL', 'REGIONAL', 'NATIONAL', 'INTERNATIONAL', 'REMOTE').required().messages({
    'any.only': 'mobilityPreferences doit être l’une des valeurs suivantes : LOCAL, REGIONAL, NATIONAL, INTERNATIONAL, REMOTE.',
    'any.required': 'mobilityPreferences est requis.'
  }),
  developmentAreas: Joi.string().allow('', null),
  actionPlan: Joi.string().allow('', null),
  timeframe: Joi.string().max(50).allow('', null).messages({
    'string.max': 'timeframe ne peut pas dépasser 50 caractères.'
  }),
  reviewedBy: Joi.string().hex().length(24).required().messages({
    'string.hex': 'reviewedBy doit être un ObjectId valide (24 caractères hexadécimaux).',
    'string.length': 'reviewedBy doit être un ObjectId valide (24 caractères hexadécimaux).',
    'any.required': 'reviewedBy est requis.'
  }),
  nextReviewDate: Joi.date().allow(null).greater(Joi.ref('discussionDate')).messages({
    'date.greater': 'nextReviewDate doit être postérieure à discussionDate.'
  })
});

export const skillAssessmentValidator = Joi.object({
  personalIdentityId: Joi.string().required(),
  skillName: Joi.string().max(100).required(),
  skillCategory: Joi.string().max(50).required(),
  proficiencyLevel: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT').required(),
  assessmentDate: Joi.date().required(),
  assessedBy: Joi.string().allow(null),
  certificationName: Joi.string().max(200).allow('', null),
  certificationAuthority: Joi.string().max(100).allow('', null),
  certificationDate: Joi.date().allow(null),
  expirationDate: Joi.date().allow(null),
  verificationStatus: Joi.string().valid('VERIFIED', 'PENDING', 'REJECTED').allow(null)
});