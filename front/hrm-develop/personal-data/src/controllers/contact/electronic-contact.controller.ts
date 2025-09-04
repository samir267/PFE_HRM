import { Request, Response } from 'express';
import ElectronicContactService from '../../service/contact/electronic-contact.service';
import { ElectronicContact as ElectronicContactType } from '../../types/contact/contactTypes.type';

// Interfaces pour typer les requêtes
interface ElectronicRequest extends Request {
  params: { employeeId: string; contactId: string };
  body: Partial<ElectronicContactType>;
}

const ElectronicContactController = {
  createElectronicContact: async (req: ElectronicRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const electronic = await ElectronicContactService.setElectronicContact(employeeId, req.body);
      res.status(201).json(electronic);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  updateElectronicContact: async (req: ElectronicRequest, res: Response) => {
    try {
      const { contactId } = req.params;
      const electronic = await ElectronicContactService.updateElectronicContact(contactId, req.body);
      res.status(200).json(electronic);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default ElectronicContactController;