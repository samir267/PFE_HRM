import { RelationshipType } from "../../models/familySituation/dependant.model";

export interface IDependant extends Document {
    // _id: string;
    personalIdentityId: string;
    relationshipType: RelationshipType;
    lastName: string;
    firstName: string;
    dateOfBirth: Date;
    isFiscallyDependent: boolean;
    isPrimaryBeneficiary: boolean;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }