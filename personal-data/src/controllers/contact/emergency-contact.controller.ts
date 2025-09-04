import { Request, Response } from 'express';
import EmergencyContactService from '../../service/contact/emergency-contact.service';
import { EmergencyContact as EmergencyContactType } from '../../types/contact/contactTypes.type';
import { KafkaConnector } from "../../service/kafkaConnector";

const kafka = KafkaConnector.getInstance();
// Interfaces pour typer les requêtes
interface EmergencyRequest extends Request {
  params: { employeeId: string; contactId: string };
  body: Partial<EmergencyContactType>;
}

const EmergencyContactController = {
  createEmergencyContact: async (req: EmergencyRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const emergency = await EmergencyContactService.setEmergencyContacts(employeeId, req.body);
      kafka.produce('contact-preference-events', {
        type: 'EMERGENCY_CONTACT_ADDED',
        data: { employeeId, ...req.body },
      })
      res.status(201).json(emergency);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateEmergencyContact: async (req: EmergencyRequest, res: Response) => {
    try {
      const { contactId } = req.params;
      const emergency = await EmergencyContactService.updateEmergencyContact(contactId, req.body);
      kafka.produce('contact-preference-events', {
        type: 'EMERGENCY_CONTACT_UPDATED',
        data: { contactId, ...req.body },
      })
      res.status(200).json(emergency);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default EmergencyContactController;