import { DependantModel } from '../../models/familySituation/dependant.model';
// import { EmergencyContactModel } from '../../models/familySituation/emergency-contact.model';
import { MaritalStatusModel } from '../../models/familySituation/marital-status.model';
import { PersonalIdentityModel } from '../../models/civilStatus/personalIdentity.model';
import mongoose from 'mongoose';

export class FamilySituationValidationService {
  static async validateFamilySituation(personalIdentityId: string): Promise<{
    isCompliant: boolean;
    issues: string[];
    maritalStatuses: any[];
    dependants: any[];
    // emergencyContacts: any[];
  }> {
    console.log('Attempting to find PersonalIdentity with _id:', personalIdentityId);
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    console.log('PersonalIdentity found:', personalIdentity ? personalIdentity : 'None');
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    const issues: string[] = [];

    console.log('Fetching MaritalStatuses for personalIdentityId:', personalIdentity._id);
    const maritalStatuses = await MaritalStatusModel.find({ personalIdentityId: personalIdentity._id });
    console.log('MaritalStatuses found:', maritalStatuses.length, 'documents');
    if (maritalStatuses.length > 0) {
      console.log('MaritalStatuses details:', maritalStatuses);
    } else {
      console.log('No MaritalStatuses found for this personalIdentityId');
    }
    const activeMaritalStatuses = maritalStatuses.filter(s => !s.endDate || s.endDate > new Date());
    if (activeMaritalStatuses.length > 1) {
      issues.push('Multiple active marital statuses detected');
    }

    console.log('Fetching Dependants for personalIdentityId:', personalIdentity._id);
    const dependants = await DependantModel.find({ personalIdentityId: personalIdentity._id });
    console.log('Dependants found:', dependants.length, 'documents');
    if (dependants.length > 0) {
      console.log('Dependants details:', dependants);
    } else {
      console.log('No Dependants found for this personalIdentityId');
    }
    dependants.forEach(d => {
      if (d.dateOfBirth > new Date()) {
        issues.push(`Invalid date of birth for dependant ${d.firstName} ${d.lastName}`);
      }
      if (d.endDate && d.endDate < d.startDate) {
        issues.push(`Invalid endDate for dependant ${d.firstName} ${d.lastName}`);
      }
    });

    console.log('Fetching EmergencyContacts for personalIdentityId:', personalIdentity._id);
    // const emergencyContacts = await EmergencyContactModel.find({ personalIdentityId: personalIdentity._id });
    // console.log('EmergencyContacts found:', emergencyContacts.length, 'documents');
    // if (emergencyContacts.length > 0) {
    //   console.log('EmergencyContacts details:', emergencyContacts.map(c => ({
    //     _id: c._id,
    //     isPrimaryContact: c.isPrimaryContact,
    //   })));
    // } else {
    //   console.log('No EmergencyContacts found for this personalIdentityId');
    // }
    // if (!emergencyContacts.some(c => c.isPrimaryContact)) {
    //   issues.push('No primary emergency contact defined');
    // }

    console.log('Validation result:', {
      isCompliant: issues.length === 0,
      issues,
      maritalStatuses,
      dependants,
      // emergencyContacts,
    });

    return {
      isCompliant: issues.length === 0,
      issues,
      maritalStatuses,
      dependants,
      // emergencyContacts,
    };
  }
}