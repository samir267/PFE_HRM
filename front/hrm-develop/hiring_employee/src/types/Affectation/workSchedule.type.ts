export interface IWorkSchedule {
  assignmentId: string; 
  scheduleType: 'FIXED' | 'FLEXIBLE' | 'SHIFT_BASED' | 'CUSTOM';
  hoursPerWeek: number;
  mondayHours?: number;
  tuesdayHours?: number;
  wednesdayHours?: number;
  thursdayHours?: number;
  fridayHours?: number;
  saturdayHours?: number;
  sundayHours?: number;
  shiftPatternId?: string; 
  effectiveDate: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
