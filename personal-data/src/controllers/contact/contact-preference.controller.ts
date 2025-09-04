import { Request, Response } from 'express';
import ContactPreferenceService from '../../service/contact/contact-preference.service';
import { ContactPreference as ContactPreferenceType } from '../../types/contact/contactTypes.type';
import { KafkaConnector } from "../../service/kafkaConnector";

const kafka = KafkaConnector.getInstance();

// Interfaces pour typer les requêtes
interface PreferenceRequest extends Request {
  params: { employeeId: string };
  body: Partial<ContactPreferenceType>;
}

const ContactPreferenceController = {
  updateContactPreferences: async (req: PreferenceRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      kafka.produce('contact-preference-events', {
        type: 'CONTACT_PREFERENCE_UPDATED',
        data: { employeeId, ...req.body },
      })
      const preference = await ContactPreferenceService.updateContactPreferences(employeeId, req.body);
      res.status(200).json(preference);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getContactPreferences: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const preference = await ContactPreferenceService.getContactPreferences(employeeId);
      res.status(200).json(preference);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default ContactPreferenceController;