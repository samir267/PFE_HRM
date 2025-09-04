// import Joi from 'joi';
// import { emergencyContactSchema } from '../../validator/family-situation.validator';
// import { EmergencyContactModel } from '../../models/familySituation/emergency-contact.model';
// import { PersonalIdentityModel } from '../../models/civilStatus/personalIdentity';
// import { DataHistoryModel } from '../../models/civilStatus/dataHistory';
// import { IEmergencyContact } from '../../types/familySituation/IEmergencyContact.type';
// import mongoose from 'mongoose';

// export class EmergencyContactService {
//   static async addEmergencyContact(personalIdentityId: string, data: Partial<IEmergencyContact>, modifiedBy: string): Promise<IEmergencyContact> {
//     const validation = emergencyContactSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
//     if (validation.error) {
//       const errors = validation.error.details.map((detail) => detail.message);
//       throw new Error(`Validation failed for emergencyContact: ${errors.join(', ')}`);
//     }

//     const personalIdentity = await PersonalIdentityModel.findOne({
//       _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
//     });
//     if (!personalIdentity) {
//       console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
//       throw new Error('Employee not found');
//     }

//     if (data.isPrimaryContact) {
//       const previousPrimaryContacts = await EmergencyContactModel.find({
//         personalIdentityId: personalIdentity._id,
//         isPrimaryContact: true,
//       });

//       await EmergencyContactModel.updateMany(
//         { personalIdentityId: personalIdentity._id, isPrimaryContact: true },
//         { $set: { isPrimaryContact: false } }
//       );

//       for (const contact of previousPrimaryContacts) {
//         await DataHistoryModel.create({
//           entityId: contact._id.toString(),
//           entityType: 'EmergencyContact',
//           previousState: { ...contact.toObject(), isPrimaryContact: true },
//           currentState: { ...contact.toObject(), isPrimaryContact: false },
//           modifiedBy,
//           modificationType: 'UPDATE',
//         });
//       }
//     }

//     const emergencyContact = await EmergencyContactModel.create({
//       personalIdentityId: personalIdentity._id,
//       lastName: data.lastName,
//       firstName: data.firstName,
//       relationship: data.relationship,
//       phoneNumber: data.phoneNumber,
//       alternativePhone: data.alternativePhone,
//       email: data.email,
//       isPrimaryContact: data.isPrimaryContact,
//     });

//     await DataHistoryModel.create({
//       entityId: emergencyContact._id.toString(),
//       entityType: 'EmergencyContact',
//       previousState: {},
//       currentState: emergencyContact.toObject(),
//       modifiedBy,
//       modificationType: 'CREATE',
//     });

//     return emergencyContact;
//   }

//   static async getEmergencyContact(emergencyContactId: string): Promise<IEmergencyContact> {
//     const emergencyContact = await EmergencyContactModel.findOne({
//       _id: new mongoose.Types.ObjectId(emergencyContactId),
//     });
//     if (!emergencyContact) {
//       throw new Error('Emergency contact not found');
//     }
//     return emergencyContact;
//   }

//   static async getEmergencyContactsByPersonalIdentity(personalIdentityId: string): Promise<IEmergencyContact[]> {
//     const personalIdentity = await PersonalIdentityModel.findOne({
//       _id: new mongoose.Types.ObjectId(personalIdentityId),
//     });
//     if (!personalIdentity) {
//       throw new Error('Employee not found');
//     }
//     return EmergencyContactModel.find({ personalIdentityId: personalIdentity._id });
//   }

//   static async updateEmergencyContact(emergencyContactId: string, data: Partial<IEmergencyContact>, modifiedBy: string): Promise<IEmergencyContact> {
//     const validation = emergencyContactSchema.validate(data, { abortEarly: false });
//     if (validation.error) {
//       const errors = validation.error.details.map((detail) => detail.message);
//       throw new Error(`Validation failed for emergencyContact: ${errors.join(', ')}`);
//     }

//     const emergencyContact = await EmergencyContactModel.findOne({
//       _id: new mongoose.Types.ObjectId(emergencyContactId),
//     });
//     if (!emergencyContact) {
//       throw new Error('Emergency contact not found');
//     }

//     const personalIdentity = await PersonalIdentityModel.findOne({
//       _id: emergencyContact.personalIdentityId,
//     });
//     if (!personalIdentity) {
//       throw new Error('Employee not found');
//     }

//     if (data.isPrimaryContact) {
//       const previousPrimaryContacts = await EmergencyContactModel.find({
//         personalIdentityId: personalIdentity._id,
//         isPrimaryContact: true,
//         _id: { $ne: emergencyContact._id },
//       });

//       await EmergencyContactModel.updateMany(
//         { personalIdentityId: personalIdentity._id, isPrimaryContact: true, _id: { $ne: emergencyContact._id } },
//         { $set: { isPrimaryContact: false } }
//       );

//       for (const contact of previousPrimaryContacts) {
//         await DataHistoryModel.create({
//           entityId: contact._id.toString(),
//           entityType: 'EmergencyContact',
//           previousState: { ...contact.toObject(), isPrimaryContact: true },
//           currentState: { ...contact.toObject(), isPrimaryContact: false },
//           modifiedBy,
//           modificationType: 'UPDATE',
//         });
//       }
//     }

//     const previousState = emergencyContact.toObject();

//     Object.assign(emergencyContact, {
//       lastName: data.lastName ?? emergencyContact.lastName,
//       firstName: data.firstName ?? emergencyContact.firstName,
//       relationship: data.relationship ?? emergencyContact.relationship,
//       phoneNumber: data.phoneNumber ?? emergencyContact.phoneNumber,
//       alternativePhone: data.alternativePhone ?? emergencyContact.alternativePhone,
//       email: data.email ?? emergencyContact.email,
//       isPrimaryContact: data.isPrimaryContact ?? emergencyContact.isPrimaryContact,
//     });

//     await emergencyContact.save();

//     await DataHistoryModel.create({
//       entityId: emergencyContact._id.toString(),
//       entityType: 'EmergencyContact',
//       previousState,
//       currentState: emergencyContact.toObject(),
//       modifiedBy,
//       modificationType: 'UPDATE',
//     });

//     return emergencyContact;
//   }

//   static async deleteEmergencyContact(emergencyContactId: string, modifiedBy: string): Promise<void> {
//     const emergencyContact = await EmergencyContactModel.findOne({
//       _id: new mongoose.Types.ObjectId(emergencyContactId),
//     });
//     if (!emergencyContact) {
//       throw new Error('Emergency contact not found');
//     }

//     await DataHistoryModel.create({
//       entityId: emergencyContact._id.toString(),
//       entityType: 'EmergencyContact',
//       previousState: emergencyContact.toObject(),
//       currentState: {},
//       modifiedBy,
//       modificationType: 'DELETE',
//     });

//     await emergencyContact.deleteOne();
//   }
// }