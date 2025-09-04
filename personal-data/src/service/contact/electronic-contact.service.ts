import ElectronicContact from '../../models/contact/ElectronicContact.model';
import { ElectronicContact as ElectronicContactType } from '../../types/contact/contactTypes.type';

const ElectronicContactService = {
  setElectronicContact: async (
    employeeId: string,
    electronicContactData: Partial<ElectronicContactType>
  ): Promise<ElectronicContactType> => {
    const electronic = new ElectronicContact({
      ...(electronicContactData as object),
      personalIdentityId: employeeId,
    });
    await electronic.save();
    return electronic;
  },

  updateElectronicContact: async (
    contactId: string,
    electronicContactData: Partial<ElectronicContactType>
  ): Promise<ElectronicContactType> => {
    const electronic = await ElectronicContact.findByIdAndUpdate(contactId, electronicContactData, { new: true });
    if (!electronic) throw new Error('Electronic contact not found');
    return electronic;
  },
  getAllElectronicContacts: async (): Promise<ElectronicContactType[]> => {
    const electronicContacts = await ElectronicContact.find();
    return electronicContacts;
  },
  getBypersonalIdentityId: async (personalIdentityId: string): Promise<ElectronicContactType[]> => {
    const electronicContacts = await ElectronicContact.find({ personalIdentityId });
    return electronicContacts;
  }
};




export default ElectronicContactService;