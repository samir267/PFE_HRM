import { Request, Response } from 'express';
import ContactInformationService from '../service/ContactInformation.service';
import {
  Address,
  PhoneContact as PhoneContactType,
  ElectronicContact as ElectronicContactType,
  EmergencyContact as EmergencyContactType,
  ContactPreference as ContactPreferenceType,
  ValidationReport,
} from '../types/contact/contactTypes.type';

// Interfaces pour typer les requêtes
interface AddressRequest extends Request {
  params: { employeeId: string; addressId: string };
  body: Partial<Address>;
}

interface PhoneRequest extends Request {
  params: { employeeId: string; phoneId: string };
  body: Partial<PhoneContactType>;
}

interface ElectronicRequest extends Request {
  params: { employeeId: string; contactId: string };
  body: Partial<ElectronicContactType>;
}

interface EmergencyRequest extends Request {
  params: { employeeId: string; contactId: string };
  body: Partial<EmergencyContactType>;
}

interface PreferenceRequest extends Request {
  params: { employeeId: string };
  body: Partial<ContactPreferenceType>;
}

interface ValidationRequest extends Request {
  params: { employeeId: string };
}

interface VerificationRequest extends Request {
  params: { employeeId: string; contactType: string; contactId: string };
}

interface RecordVerificationRequest extends Request {
  params: { verificationId: string };
  body: { status: string };
}

const contactController = {
  // Adresses
  createAddress: async (req: AddressRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const address = await ContactInformationService.registerAddress(employeeId, req.body);
      res.status(201).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateAddress: async (req: AddressRequest, res: Response) => {
    try {
      const { addressId } = req.params;
      const address = await ContactInformationService.updateAddress(addressId, req.body);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAllAddresses: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const addresses = await ContactInformationService.getAllAddresses(employeeId);
      res.status(200).json(addresses);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAddressById: async (req: Request<{ employeeId: string; addressId: string }>, res: Response) => {
    try {
      const { addressId } = req.params;
      const address = await ContactInformationService.getAddressById(addressId);
      res.status(200).json(address);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Numéros de téléphone
  createPhoneContact: async (req: PhoneRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const phone = await ContactInformationService.registerPhoneContact(employeeId, req.body);
      res.status(201).json(phone);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updatePhoneContact: async (req: PhoneRequest, res: Response) => {
    try {
      const { phoneId } = req.params;
      const phone = await ContactInformationService.updatePhoneContact(phoneId, req.body);
      res.status(200).json(phone);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAllPhoneContacts: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const phones = await ContactInformationService.getAllPhoneContacts(employeeId);
      res.status(200).json(phones);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Contacts électroniques
  createElectronicContact: async (req: ElectronicRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const electronic = await ContactInformationService.setElectronicContact(employeeId, req.body);
      res.status(201).json(electronic);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateElectronicContact: async (req: ElectronicRequest, res: Response) => {
    try {
      const { contactId } = req.params;
      const electronic = await ContactInformationService.updateElectronicContact(contactId, req.body);
      res.status(200).json(electronic);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Contacts d'urgence
  createEmergencyContact: async (req: EmergencyRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const emergency = await ContactInformationService.setEmergencyContacts(employeeId, req.body);
      res.status(201).json(emergency);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateEmergencyContact: async (req: EmergencyRequest, res: Response) => {
    try {
      const { contactId } = req.params;
      const emergency = await ContactInformationService.updateEmergencyContact(contactId, req.body);
      res.status(200).json(emergency);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Préférences de contact
  updateContactPreferences: async (req: PreferenceRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const preference = await ContactInformationService.updateContactPreferences(employeeId, req.body);
      res.status(200).json(preference);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getContactPreferences: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const preference = await ContactInformationService.getContactPreferences(employeeId);
      res.status(200).json(preference);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Validation
  validateContactInformation: async (req: ValidationRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const report = await ContactInformationService.validateContactInformation(employeeId);
      res.status(200).json(report);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  // Vérification
  initiateContactVerification: async (req: VerificationRequest, res: Response) => {
    try {
      const { employeeId, contactType, contactId } = req.params;
      const result = await ContactInformationService.initiateContactVerification(employeeId, contactType, contactId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  recordVerificationResult: async (req: RecordVerificationRequest, res: Response) => {
    try {
      const { verificationId } = req.params;
      const { status } = req.body;
      const result = await ContactInformationService.recordVerificationResult(verificationId, status);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default contactController;