import Joi from 'joi';

export const positionSchema = Joi.object({
  title: Joi.string().max(100).required(),

  departmentId: Joi.string().required(),
  locationId: Joi.string().required(),
  jobClassificationId: Joi.string().required(),
  reportingPositionId: Joi.string().allow(null),

  positionType: Joi.string().valid('PERMANENT', 'TEMPORARY', 'PROJECT_BASED').required(),

  minSalaryGrade: Joi.number().integer().required(),
  maxSalaryGrade: Joi.number().integer().min(Joi.ref('minSalaryGrade')).required(),

  isActive: Joi.boolean().required(),

  budgetCode: Joi.string().max(50).required(),
  headcountLimit: Joi.number().integer().required(),

  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});


export const employeeassignmentSchema = Joi.object({
  employeeId: Joi.string().required(),
  positionId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  assignmentType: Joi.string().valid('PRIMARY','SECONDARY','TEMPORARY').required(),
  employmentType: Joi.string().valid('FULLTIME','PARTTIME','CONTRACTOR','INTERN').required(),
  fteRatio: Joi.number().min(0).max(1).required(),
  probationPeriodMonths: Joi.number().integer().required(),
  probationEndDate: Joi.date().optional(),
  assignmentStatus: Joi.string().valid('ACTIVE','PLANNED','TERMINATED','SUSPENDED').required(),
  terminationReason: Joi.string().optional().allow(""),
  createdBy: Joi.string().required(),
  approvedBy: Joi.string().optional(),
});


export const compensationSchema = Joi.object({
  assignmentId: Joi.string().required(), 
  effectiveDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('effectiveDate')).required(),
  baseSalary: Joi.number().positive().required(),
  salaryCurrency: Joi.string().max(3).required(),
  payFrequency: Joi.string().valid('MONTHLY', 'WEEKLY', 'BIWEEKLY', 'ANNUAL').required(),
  hourlyRate: Joi.number().allow(null),
  salaryGrade: Joi.number().integer().required(),
  salaryStep: Joi.number().integer().required(),
  createdBy: Joi.string().required(),
  approvedBy: Joi.string().required(),
});


export const compensationComponentSchema = Joi.object({
  compensationId: Joi.string().required(),
  componentType: Joi.string().valid('BONUS', 'ALLOWANCE', 'COMMISSION', 'BENEFIT', 'DEDUCTION').required(),
  name: Joi.string().max(100).required(),
  amount: Joi.number().precision(2).required(),
  isPercentage: Joi.boolean().required(),
  calculationBasis: Joi.string().max(255).allow(null, ''), 
  frequency: Joi.string().valid('ONE_TIME', 'RECURRING').required(),
  paymentSchedule: Joi.string().valid('MONTHLY', 'QUARTERLY', 'ANNUAL', 'CUSTOM').required(),
  effectiveDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('effectiveDate')).allow(null),
  taxable: Joi.boolean().required(),
  description: Joi.string().max(255).allow(null, ''),
});

export const workScheduleSchema = Joi.object({
  assignmentId: Joi.string().required(),

  scheduleType: Joi.string()
    .valid('FIXED', 'FLEXIBLE', 'SHIFT_BASED', 'CUSTOM')
    .required(),

  hoursPerWeek: Joi.number().positive().required(),

  mondayHours: Joi.number().min(0).max(24).optional(),
  tuesdayHours: Joi.number().min(0).max(24).optional(),
  wednesdayHours: Joi.number().min(0).max(24).optional(),
  thursdayHours: Joi.number().min(0).max(24).optional(),
  fridayHours: Joi.number().min(0).max(24).optional(),
  saturdayHours: Joi.number().min(0).max(24).optional(),
  sundayHours: Joi.number().min(0).max(24).optional(),

  shiftPatternId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null, ''),

  effectiveDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('effectiveDate')).allow(null)
});




export const employmentContractSchema = Joi.object({
  assignmentId: Joi.string().required(),
  contractType: Joi.string()
    .valid("PERMANENT", "FIXED_TERM", "TEMPORARY", "INTERNSHIP")
    .required(),
  contractReference: Joi.string().max(50).required(),
  signatureDate: Joi.date().required(),
  effectiveDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("effectiveDate")).allow(null),
  documentPath: Joi.string().max(255).required(),
  collectiveAgreementId: Joi.string().allow(null),
  noticePeriodDays: Joi.number().integer().min(0).required(),
  nonCompeteClause: Joi.boolean().required(),
  nonCompeteDurationMonths: Joi.number().integer().allow(null),
  confidentialityClause: Joi.boolean().required(),
  createdBy: Joi.string().required(),

 
});


