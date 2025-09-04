import { Request, Response } from 'express';
import PhoneContactService from '../../service/contact/phone-contact.service';
import { PhoneContact as PhoneContactType } from '../../types/contact/contactTypes.type';
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka=KafkaConnector.getInstance();
// Interfaces pour typer les requêtes
interface PhoneRequest extends Request {
  params: { employeeId: string; phoneId: string };
  body: Partial<PhoneContactType>;
}

const PhoneContactController = {
  createPhoneContact: async (req: PhoneRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const phone = await PhoneContactService.registerPhoneContact(employeeId, req.body);
      kafka.produce('contact-preference-events', {
        type: 'PHONE_CONTACT_ADDED',
        data: { employeeId, ...req.body },
      })
      res.status(201).json(phone);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updatePhoneContact: async (req: PhoneRequest, res: Response) => {
    try {
      const { phoneId } = req.params;
      const phone = await PhoneContactService.updatePhoneContact(phoneId, req.body);
      kafka.produce('contact-preference-events', {
        type: 'PHONE_CONTACT_UPDATED',
        data: { phoneId, ...req.body },
      })
      res.status(200).json(phone);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getAllPhoneContacts: async (req: Request<{ employeeId: string }>, res: Response) => {
    try {
      const { employeeId } = req.params;
      const phones = await PhoneContactService.getAllPhoneContacts(employeeId);
      res.status(200).json(phones);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  getPhonesByUserId:async (req: Request<{ personalIdentityId: string }>, res: Response) => {
    try {
      const { personalIdentityId } = req.params;
      const phones = await PhoneContactService.getPhonesByUserId(personalIdentityId);
      res.status(200).json(phones);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};




export default PhoneContactController;