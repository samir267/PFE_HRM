export interface IDataHistory extends Document {
  
  entityId: string;
  entityType: string;
  previousState: object;
  currentState: object;
  modifiedBy: string;
  modificationDate: Date;
  modificationType: string;
}