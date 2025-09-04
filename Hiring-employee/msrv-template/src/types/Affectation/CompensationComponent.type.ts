export interface ICompensationComponent {
  compensationId: string;
  componentType: 'BONUS' | 'ALLOWANCE' | 'COMMISSION' | 'BENEFIT' | 'DEDUCTION';
  name: string;
  amount: number;
  isPercentage: boolean;
  calculationBasis?: string;
  frequency: 'ONE_TIME' | 'RECURRING';
  paymentSchedule: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'CUSTOM';
  effectiveDate: Date;
  endDate?: Date;
  taxable: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export {};
