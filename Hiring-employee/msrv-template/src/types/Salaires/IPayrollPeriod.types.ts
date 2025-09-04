export interface IPayrollPeriod extends Document {
  periodname: string;
  periodtype: 'MONTHLY' | 'BIWEEKLY' | 'WEEKLY';
  startdate: Date;
  enddate: Date;
  paydate: Date;
  status: 'OPEN' | 'PROCESSING' | 'PROCESSED' | 'CLOSED';
  totalemployees: number;
  totalgrossamount: number;
  totalnetamount: number;
  totaltaxes: number;
  currencycode: string;
  createdat: Date;
  updatedat: Date;
}
