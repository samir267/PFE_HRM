import { Types } from "mongoose";

export interface IUniformReturn {
  assignmentId: Types.ObjectId;
    uniformInventoryId: Types.ObjectId;
  
  returnedItems: {
    inventoryId: string;
    size: string;
    color: string;
    quantity: number;
    condition: 'GOOD' | 'DAMAGED' | 'LOST';
  }[];
  returnedBy: string;
  returnDate?: Date;
  notes?: string;
}
