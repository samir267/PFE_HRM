import ContactPreference from '../../models/contact/ContactPreference.model';
import { ContactPreference as ContactPreferenceType } from '../../types/contact/contactTypes.type';

const ContactPreferenceService = {
  updateContactPreferences: async (
    employeeId: string,
    preferencesData: Partial<ContactPreferenceType>
  ): Promise<ContactPreferenceType> => {
    const preference = await ContactPreference.findOneAndUpdate(
      { personalIdentityId: employeeId },
      preferencesData,
      { new: true, upsert: true }
    );
    return preference;
  },

  getContactPreferences: async (employeeId: string): Promise<ContactPreferenceType | null> => {
    const preference = await ContactPreference.findOne({ personalIdentityId: employeeId });
    return preference;
  },
};

export default ContactPreferenceService;