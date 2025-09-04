import { Schema, model } from "mongoose";
import { IDependant } from "../../types/familySituation/IDependant.type";
import { v4 as uuidv4 } from 'uuid';

export enum RelationshipType {
    SPOUSE = 'SPOUSE',
    CHILD = 'CHILD',
    PARENT = 'PARENT',
    OTHER = 'OTHER'
  }


  const dependantSchema = new Schema<IDependant>({
    // _id: {
    //   type: String,
    //   default: () => uuidv4()
    // },
    personalIdentityId: {
      type: String,
      required: true,
      index: true
    },
    relationshipType: {
      type: String,
      enum: Object.values(RelationshipType),
      required: true
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 100
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    isFiscallyDependent: {
      type: Boolean,
      default: false
    },
    isPrimaryBeneficiary: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    }
  }, {
    timestamps: true,
    collection: 'dependant'
  });
  
  export const DependantModel = model<IDependant>('Dependant', dependantSchema);
  