export interface ICompensation {
  assignmentId: string;
  effectiveDate: Date;
  endDate?: Date;
  baseSalary: number;
  salaryCurrency: string;
  payFrequency: 'MONTHLY' | 'BIWEEKLY' | 'WEEKLY' | 'HOURLY';
  hourlyRate?: number;
  salaryGrade: number;
  salaryStep: number;
  createdBy: string;
  approvedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
