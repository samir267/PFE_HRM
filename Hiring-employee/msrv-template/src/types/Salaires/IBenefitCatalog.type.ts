export interface IBenefitCatalog extends Document {
  benefitcode: string;
  benefitname: string;
  benefitcategory: 'HEALTH' | 'TRANSPORT' | 'MEAL' | 'TECHNOLOGY' | 'WELLNESS';
  description: string;
  eligibilitycriteria: {
    employmenttype: string[];
    minimumtenuredays: number;
    positionlevels: string[];
  };
  coststructure: {
    employercontributionpercentage: number;
    employeecontributionpercentage: number;
    monthlycost: number;
    currencycode: string;
  };
  providerinfo: {
    providername: string;
    contractnumber: string;
    contactemail: string;
  };
  taxtreatment: {
    taxableforemployee: boolean;
    socialchargesexempt: boolean;
  };
  effectivedate: Date;
  expirationdate: Date;
  createdat: Date;
  updatedat: Date;
}