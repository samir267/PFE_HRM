export interface IAssignment {
  employeeId: string;
  positionId: string;
  startDate: Date;
  endDate?: Date;
  assignmentType: 'PRIMARY' | 'SECONDARY' | 'TEMPORARY';
  employmentType: 'FULLTIME' | 'PARTTIME' | 'CONTRACTOR' | 'INTERN';
  fteRatio: number;
  probationPeriodMonths: number;
  probationEndDate?: Date;
  assignmentStatus: 'ACTIVE' | 'PLANNED' | 'TERMINATED' | 'SUSPENDED';
  terminationReason?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
