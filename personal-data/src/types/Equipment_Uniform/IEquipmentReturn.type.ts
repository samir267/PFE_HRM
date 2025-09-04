export interface IEquipmentReturn {
  assignmentId: string;
  employeeId: string;
  returnDetails: {
    initiatedDate: Date;
    initiatedBy: string;
    reason: string;
    expectedReturnDate: Date;
    actualReturnDate: Date;
  };
  inspection: {
    inspectedBy: string;
    inspectionDate: Date;
    condition: string;
    damages: string[];
    cleaningRequired: boolean;
    repairRequired: boolean;
    notes: string;
  };
  processing: {
    cleaned: boolean;
    cleanedBy: string;
    cleanedDate: Date;
    tested: boolean;
    testedBy: string;
    testedDate: Date;
    readyForReassignment: boolean;
  };
  currentStatus: string;
  statusHistory: Array<{
    status: string;
    date: Date;
    changedBy: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
