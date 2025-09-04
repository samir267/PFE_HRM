import Joi from 'joi';
import { ObjectSchema } from 'joi';

// ----------------------------
// IBenefitCatalog Validator
// ----------------------------
export const benefitCatalogValidator: ObjectSchema = Joi.object({
  benefitcode: Joi.string().required(),
  benefitname: Joi.string().required(),
  benefitcategory: Joi.string().valid('HEALTH', 'TRANSPORT', 'MEAL', 'TECHNOLOGY', 'WELLNESS').required(),
  description: Joi.string().optional(),
  eligibilitycriteria: Joi.object({
    employmenttype: Joi.array().items(Joi.string()).required(),
    minimumtenuredays: Joi.number().required(),
    positionlevels: Joi.array().items(Joi.string()).required(),
  }),
  coststructure: Joi.object({
    employercontributionpercentage: Joi.number().required(),
    employeecontributionpercentage: Joi.number().required(),
    monthlycost: Joi.number().required(),
    currencycode: Joi.string().required(),
  }),
  providerinfo: Joi.object({
    providername: Joi.string().required(),
    contractnumber: Joi.string().required(),
    contactemail: Joi.string().email().required(),
  }),
  taxtreatment: Joi.object({
    taxableforemployee: Joi.boolean().required(),
    socialchargesexempt: Joi.boolean().required(),
  }),
  effectivedate: Joi.date().required(),
  expirationdate: Joi.date().required(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});

// ----------------------------
// IEmployeeBenefit Validator
// ----------------------------
export const employeeBenefitValidator: ObjectSchema = Joi.object({
  personalidentityid: Joi.string().required(),
  benefitid: Joi.string().required(),
  enrollmentdate: Joi.date().required(),
  effectivedate: Joi.date().required(),
  enddate: Joi.date().allow(null),
  enrollmentstatus: Joi.string().valid('ACTIVE', 'SUSPENDED', 'TERMINATED', 'PENDING').required(),
  employeecontribution: Joi.number().required(),
  employercontribution: Joi.number().required(),
  beneficiaries: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      relationship: Joi.string().required(),
      dateofbirth: Joi.date().required(),
    })
  ).optional(),
  coveragedetails: Joi.object({
    coveragelevel: Joi.string().required(),
    deductible: Joi.number().required(),
    annualmaximum: Joi.number().required(),
  }).optional(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});

// ----------------------------
// IPayrollEntry Validator
// ----------------------------
export const payrollEntryValidator: ObjectSchema = Joi.object({
  personalidentityid: Joi.string().required(),
  payrollperiodid: Joi.string().required(),
  salaryrecordid: Joi.string().required(),
  grosssalary: Joi.number().required(),
  netsalary: Joi.number().required(),
  workeddays: Joi.number().required(),
  totaldays: Joi.number().required(),
  overtimehours: Joi.number().required(),
  salarycomponents: Joi.array().items(
    Joi.object({
      componenttype: Joi.string().required(),
      componentname: Joi.string().required(),
      amount: Joi.number().required(),
      taxable: Joi.boolean().required(),
    })
  ).required(),
  deductions: Joi.array().items(
    Joi.object({
      deductiontype: Joi.string().required(),
      description: Joi.string().required(),
      amount: Joi.number().required(),
    })
  ).required(),
  benefitscost: Joi.number().required(),
  employercharges: Joi.number().required(),
  paymentmethod: Joi.string().required(),
  bankaccount: Joi.object({
    iban: Joi.string().required(),
    bankname: Joi.string().required(),
  }).required(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});

// ----------------------------
// IPayrollPeriod Validator
// ----------------------------
export const payrollPeriodValidator: ObjectSchema = Joi.object({
  periodname: Joi.string().required(),
  periodtype: Joi.string().valid('MONTHLY', 'BIWEEKLY', 'WEEKLY').required(),
  startdate: Joi.date().required(),
  enddate: Joi.date().required(),
  paydate: Joi.date().required(),
  status: Joi.string().valid('OPEN', 'PROCESSING', 'PROCESSED', 'CLOSED').required(),
  totalemployees: Joi.number().required(),
  totalgrossamount: Joi.number().required(),
  totalnetamount: Joi.number().required(),
  totaltaxes: Joi.number().required(),
  currencycode: Joi.string().required(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});

// ----------------------------
// IPerformanceReview Validator
// ----------------------------
export const performanceReviewValidator: ObjectSchema = Joi.object({
  personalidentityid: Joi.string().required(),
  reviewperiod: Joi.object({
    startdate: Joi.date().required(),
    enddate: Joi.date().required(),
  }).required(),
  reviewtype: Joi.string().valid('ANNUAL', 'SEMIANNUAL', 'QUARTERLY', 'PROBATION').required(),
  reviewerid: Joi.string().required(),
  reviewdate: Joi.date().required(),
  overallrating: Joi.number().required(),
  ratingscale: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required(),
    description: Joi.string().required(),
  }).required(),
  objectives: Joi.array().items(
    Joi.object({
      objectiveid: Joi.string().required(),
      description: Joi.string().required(),
      targetvalue: Joi.number().required(),
      actualvalue: Joi.number().required(),
      weight: Joi.number().required(),
      rating: Joi.number().required(),
      comments: Joi.string().required(),
    })
  ).required(),
  competencies: Joi.array().items(
    Joi.object({
      competencyname: Joi.string().required(),
      rating: Joi.number().required(),
      comments: Joi.string().required(),
    })
  ).required(),
  developmentplan: Joi.array().items(
    Joi.object({
      developmentarea: Joi.string().required(),
      plannedactions: Joi.array().items(Joi.string()).required(),
      timeline: Joi.string().required(),
    })
  ).required(),
  salaryreviewrecommendation: Joi.object({
    recommendedincreasepercentage: Joi.number().required(),
    justification: Joi.string().required(),
    effectivedate: Joi.date().required(),
  }).required(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});

// ----------------------------
// ISalaryGrade Validator
// ----------------------------
export const salaryGradeValidator: ObjectSchema = Joi.object({
  positionfamily: Joi.string().required(),
  positiontitle: Joi.string().required(),
  gradelevel: Joi.string().required(),
  experiencerange: Joi.object({
    minyears: Joi.number().required(),
    maxyears: Joi.number().required(),
  }).required(),
  salaryrange: Joi.object({
    minsalary: Joi.number().required(),
    maxsalary: Joi.number().required(),
    mediansalary: Joi.number().required(),
    currencycode: Joi.string().required(),
  }).required(),
  locationadjustments: Joi.array().items(
    Joi.object({
      location: Joi.string().required(),
      adjustmentpercentage: Joi.number().required(),
    })
  ).required(),
  marketdata: Joi.object({
    lastupdated: Joi.date().required(),
    source: Joi.string().required(),
    percentile25: Joi.number().required(),
    percentile75: Joi.number().required(),
  }).required(),
  validfrom: Joi.date().required(),
  validto: Joi.date().required(),
  createdat: Joi.date().optional(),
  updatedat: Joi.date().optional(),
});
