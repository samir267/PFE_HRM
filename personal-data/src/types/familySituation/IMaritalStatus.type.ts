import { MaritalStatusType } from "../../models/familySituation/marital-status.model";

export interface IMaritalStatus extends Document {
    // _id: string;
    personalIdentityId: string;
    statusType: MaritalStatusType;
    effectiveDate: Date;
    endDate?: Date;
    documentReference?: string;
    createdAt: Date;
    updatedAt: Date;
  }