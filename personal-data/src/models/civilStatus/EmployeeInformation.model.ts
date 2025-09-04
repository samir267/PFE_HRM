import mongoose, { Schema, Document } from "mongoose";

export interface IEmployeeInformation extends Document {
    registrationNumber:string;
  title: string;
  firstName: string;
  middleName: string;
  knownAs: string;
  lastName: string;
  suffix: string;
  preferredName: string;
  maidenName: string;
  priorLastName1: string;
  priorLastName2: string;
  profilePhoto: string;
  gender: string;
  birthDate: string;
  age: {
    years: number;
    months: number;
  };
  dateOfDeath: string;
  cityOfBirth: string;
  county: string;
  countryOfBirth: string;
  nationalIdCountryCode: string;
  nationalNumber: string;
  deliveryDate: string;
  corporateId: string;
  spouseName: string;
  spouseFirstName: string;
  spouseGender: string;
  spouseEmployeeId: string;
  citizenships: string[];
  maritalStatusHistory: any[];
  familyMembers: any[];
  dependent1Count: number;
  dependent2Count: number;
  emergencyContacts: any[];
  homeAddress: {
    street1: string;
    street2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  workAddress: {
    street1: string;
    street2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  personalEmail: string;
  workEmail: string;
  mobilePhone: string;
  workPhone: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  managerId: string;
  Current_Hiring_Stage: string;
  bankAccount: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    routingNumber: string;
    accountType: string;
  };
}

const EmployeeInformationSchema = new Schema<IEmployeeInformation>({
 registrationNumber:String,
  title: String,
  firstName: String,
  middleName: String,
  knownAs: String,
  lastName: String,
  suffix: String,
  preferredName: String,
  maidenName: String,
  priorLastName1: String,
  priorLastName2: String,
  profilePhoto: String,
  gender: String,
  birthDate: String,
  age: {
    years: Number,
    months: Number,
  },
  dateOfDeath: String,
  cityOfBirth: String,
  county: String,
  countryOfBirth: String,
  nationalIdCountryCode: String,
  nationalNumber: String,
  deliveryDate: String,
  corporateId: String,
  spouseName: String,
  spouseFirstName: String,
  spouseGender: String,
  spouseEmployeeId: String,
  citizenships: [String],
  maritalStatusHistory: [Schema.Types.Mixed],
  familyMembers: [Schema.Types.Mixed],
  dependent1Count: Number,
  dependent2Count: Number,
  emergencyContacts: [Schema.Types.Mixed],
  homeAddress: {
    street1: String,
    street2: String,
    city: String,
    stateProvince: String,
    postalCode: String,
    country: String,
  },
  workAddress: {
    street1: String,
    street2: String,
    city: String,
    stateProvince: String,
    postalCode: String,
    country: String,
  },
  personalEmail: String,
  workEmail: String,
  mobilePhone: String,
  workPhone: String,
  hireDate: String,
  jobTitle: String,
  department: String,
  managerId: String,
  Current_Hiring_Stage: {
      type: String,
      default: "Pending Review",
    },
  bankAccount: {
    bankName: String,
    accountHolderName: String,
    accountNumber: String,
    routingNumber: String,
    accountType: String,
  },
}, { timestamps: true });

export const EmployeeInformationModel = mongoose.model<IEmployeeInformation>(
  "EmployeeInformation",
  EmployeeInformationSchema
);
