export interface IEquipmentAssignment {
  employeeId: string;
  inventoryId: string;
  equipmentTypeId: string;
  assignmentDetails: {
    assignedDate: Date;
    assignedBy: string;
    expectedReturnDate: Date;
    purpose: string;
    location: {
      type: string;
      building: string;
      floor: string;
      desk: string;
    };
  };
  currentStatus: string;
  statusHistory: Array<{
    status: string;
    date: Date;
    changedBy: string;
    reason: string;
    location: {
      building: string;
      floor: string;
      desk: string;
    };
  }>;
  conditions: {
    initialCondition: string;
    currentCondition: string;
    lastInspection: Date;
    inspectedBy: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
