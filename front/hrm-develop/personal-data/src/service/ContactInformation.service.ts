import PostalAddress from '../models/contact/postalAddress.model';
import PhoneContact from '../models/contact/phoneContact.model';
import ElectronicContact from '../models/contact/ElectronicContact.model';
import EmergencyContact from '../models/contact/EmergencyContact.model';
import ContactPreference from '../models/contact/ContactPreference.model';
import {
  Address,
  PhoneContact as PhoneContactType,
  ElectronicContact as ElectronicContactType,
  EmergencyContact as EmergencyContactType,
  ContactPreference as ContactPreferenceType,
  ValidationReport,
} from '../types/contact/contactTypes.type';

const ContactInformationService = {
  // Adresses
  registerAddress: async (employeeId: string, addressData: Partial<Address>): Promise<Address> => {
    const address = new PostalAddress({ ...addressData, personalIdentityId: employeeId });
    await address.save();
    return address;
  },

  updateAddress: async (addressId: string, addressData: Partial<Address>): Promise<Address> => {
    const address = await PostalAddress.findByIdAndUpdate(addressId, addressData, { new: true });
    if (!address) throw new Error('Address not found');
    return address;
  },

  getAllAddresses: async (employeeId: string): Promise<Address[]> => {
    const addresses = await PostalAddress.find({ personalIdentityId: employeeId });
    return addresses;
  },

  getAddressById: async (addressId: string): Promise<Address> => {
    const address = await PostalAddress.findById(addressId);
    if (!address) throw new Error('Address not found');
    return address;
  },

  // Numéros de téléphone
  registerPhoneContact: async (employeeId: string, phoneData: Partial<PhoneContactType>): Promise<PhoneContactType> => {
    const phone = new PhoneContact({ ...phoneData, personalIdentityId: employeeId });
    await phone.save();
    return phone;
  },

  updatePhoneContact: async (phoneId: string, phoneData: Partial<PhoneContactType>): Promise<PhoneContactType> => {
    const phone = await PhoneContact.findByIdAndUpdate(phoneId, phoneData, { new: true });
    if (!phone) throw new Error('Phone contact not found');
    return phone;
  },

  getAllPhoneContacts: async (employeeId: string): Promise<PhoneContactType[]> => {
    const phones = await PhoneContact.find({ personalIdentityId: employeeId });
    return phones;
  },

  // Contacts électroniques
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

  // Contacts d'urgence
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

  // Préférences de contact
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

  // Validation
  validateContactInformation: async (employeeId: string): Promise<ValidationReport> => {
    const addresses = await PostalAddress.find({ personalIdentityId: employeeId });
    const phones = await PhoneContact.find({ personalIdentityId: employeeId });
    const electronics = await ElectronicContact.find({ personalIdentityId: employeeId });
    const emergencies = await EmergencyContact.find({ personalIdentityId: employeeId });
    const preferences = await ContactPreference.findOne({ personalIdentityId: employeeId });

    return {
      hasValidAddress: addresses.some(a => a.addressVerificationStatus === 'VERIFIED' && !a.endDate),
      hasValidPhone: phones.some(p => p.verificationStatus === 'VERIFIED'),
      hasValidEmail: electronics.some(e => e.verificationStatus === 'VERIFIED' && e.contactType === 'EMAIL'),
      hasEmergencyContact: emergencies.length > 0,
      hasPreferences: !!preferences,
    };
  },

  // Vérification
  initiateContactVerification: async (employeeId: string, contactType: string, contactId: string): Promise<{ status: string }> => {
    // Logique simulée (par exemple, enregistrer une demande de vérification)
    return { status: 'Verification initiated' };
  },

  recordVerificationResult: async (verificationId: string, status: string): Promise<{ status: string }> => {
    // Logique simulée (par exemple, mettre à jour le statut dans la base)
    return { status: 'Verification recorded' };
  },
};

export default ContactInformationService;