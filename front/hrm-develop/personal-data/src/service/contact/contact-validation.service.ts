import PostalAddress from '../../models/contact/postalAddress.model';
import PhoneContact from '../../models/contact/phoneContact.model';
import ElectronicContact from '../../models/contact/ElectronicContact.model';
import EmergencyContact from '../../models/contact/EmergencyContact.model';
import ContactPreference from '../../models/contact/ContactPreference.model';
import { ValidationReport } from '../../types/contact/contactTypes.type';

const ContactValidationService = {
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

  initiateContactVerification: async (employeeId: string, contactType: string, contactId: string): Promise<{ status: string }> => {
    // Logique simulée (par exemple, enregistrer une demande de vérification)
    return { status: 'Verification initiated' };
  },

  recordVerificationResult: async (verificationId: string, status: string): Promise<{ status: string }> => {
    // Logique simulée (par exemple, mettre à jour le statut dans la base)
    return { status: 'Verification recorded' };
  },
};

export default ContactValidationService;