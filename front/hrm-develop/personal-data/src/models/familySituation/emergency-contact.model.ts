// import { Schema, model, Document } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';
// import { IEmergencyContact } from '../../types/familySituation/IEmergencyContact.type';


// const emergencyContactSchema = new Schema<IEmergencyContact>({
//     // _id: {
//     //   type: String,
//     //   default: () => uuidv4()
//     // },
//     personalIdentityId: {
//       type: String,
//       required: true,
//       index: true
//     },
//     lastName: {
//       type: String,
//       required: true,
//       maxlength: 100
//     },
//     firstName: {
//       type: String,
//       required: true,
//       maxlength: 100
//     },
//     relationship: {
//       type: String,
//       required: true,
//       maxlength: 50
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       maxlength: 20
//     },
//     alternativePhone: {
//       type: String,
//       maxlength: 20
//     },
//     email: {
//       type: String,
//       maxlength: 100,
//       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     },
//     isPrimaryContact: {
//       type: Boolean,
//       default: false
//     }
//   }, {
//     timestamps: true,
//     collection: 'emergency_contact'
//   });
  
//   export const EmergencyContactModel = model<IEmergencyContact>('EmergencyContact', emergencyContactSchema);
  