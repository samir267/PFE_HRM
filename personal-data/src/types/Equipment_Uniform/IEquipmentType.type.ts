export interface IEquipmentType {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  serialNumber: String;
  specifications: {
    brand: string;
    model: string;
    warranty: string;
  };
  requiresSerial: boolean;
  trackLocation: boolean;
  isUniform: boolean;
  defaultValue: number;
  maintenanceSchedule: {
    frequency: string;
    reminderDays: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
