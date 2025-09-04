export interface ISalaryGrade extends Document {
  positionfamily: string;
  positiontitle: string;
  gradelevel: string;
  experiencerange: {
    minyears: number;
    maxyears: number;
  };
  salaryrange: {
    minsalary: number;
    maxsalary: number;
    mediansalary: number;
    currencycode: string;
  };
  locationadjustments: Array<{
    location: string;
    adjustmentpercentage: number;
  }>;
  marketdata: {
    lastupdated: Date;
    source: string;
    percentile25: number;
    percentile75: number;
  };
  validfrom: Date;
  validto: Date;
  createdat: Date;
  updatedat: Date;
}