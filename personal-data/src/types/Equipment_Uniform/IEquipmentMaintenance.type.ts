export interface IEquipmentMaintenance {
  inventoryId: string;
  assignmentId: string;
  maintenanceType: string;
  scheduledDate: Date;
  actualDate: Date;
  maintenanceDetails: {
    description: string;
    technician: string;
    duration: number;
    cost: number;
    partsReplaced: Array<{
      partName: string;
      partNumber: string;
      cost: number;
    }>;
  };
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
