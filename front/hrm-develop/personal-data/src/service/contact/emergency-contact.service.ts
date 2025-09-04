import EmergencyContact from '../../models/contact/EmergencyContact.model';
import { EmergencyContact as EmergencyContactType } from '../../types/contact/contactTypes.type';

const EmergencyContactService = {
  setEmergencyContacts: async (
    employeeId: string,
    emergencyContactsData: Partial<EmergencyContactType>
  ): Promise<EmergencyContactType> => {
    const emergency = new EmergencyContact({ ...emergencyContactsData, personalIdentityId: employeeId });
    await emergency.save();
    return emergency;
  },

  updateEmergencyContact: async (
    contactId: string,
    emergencyContactsData: Partial<EmergencyContactType>
  ): Promise<EmergencyContactType> => {
    const emergency = await EmergencyContact.findByIdAndUpdate(contactId, emergencyContactsData, { new: true });
    if (!emergency) throw new Error('Emergency contact not found');
    return emergency;
  },
};

export default EmergencyContactService;