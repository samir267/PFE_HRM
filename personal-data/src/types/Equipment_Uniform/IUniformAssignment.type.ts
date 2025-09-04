import { Types } from "mongoose";

export interface IUniformAssignment {
  employeeId: Types.ObjectId;
  uniformInventoryId: Types.ObjectId;
  uniformDetails: {
    items: Array<{
      itemId: string;
      type: string;
      size: string;
      color: string;
      quantity: number;
      customization?: {
        embroidery?: string;
        logo?: string;
        position?: string;
      };
    }>;
    totalValue: number;
  };
  assignmentDetails: {
    assignedDate: Date;
    assignedBy: string;
    renewalSchedule: {
      frequency: string;
      nextRenewal: Date;
    };
  };
  currentStatus: string;
  statusHistory: Array<{
    status: string;
    date: Date;
    changedBy: string;
    reason: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
