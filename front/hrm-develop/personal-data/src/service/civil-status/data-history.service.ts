import { DataHistoryModel } from '../../models/civilStatus/dataHistory.model';

export class DataHistoryService {
  static async logHistory(data: {
    entityId: string;
    entityType: string;
    previousState: any;
    currentState: any;
    modifiedBy: string;
    modificationType: string;
  }) {
    await DataHistoryModel.create({
      entityId: data.entityId,
      entityType: data.entityType,
      previousState: data.previousState,
      currentState: data.currentState,
      modifiedBy: data.modifiedBy,
      modificationType: data.modificationType,
    });
  }
}