import { Types } from "mongoose";

export interface IUniformInventory {
  uniformTypeId: Types.ObjectId;
  size: string;
  color: string;
  quantityInStock: number;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
