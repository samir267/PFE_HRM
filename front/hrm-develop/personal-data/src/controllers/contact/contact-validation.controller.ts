import { Request, Response } from 'express';
import ContactValidationService from '../../service/contact/contact-validation.service';
import { ValidationReport } from '../../types/contact/contactTypes.type';

// Interfaces pour typer les requêtes
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

const ContactValidationController = {
  validateContactInformation: async (req: ValidationRequest, res: Response) => {
    try {
      const { employeeId } = req.params;
      const report = await ContactValidationService.validateContactInformation(employeeId);
      res.status(200).json(report);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  initiateContactVerification: async (req: VerificationRequest, res: Response) => {
    try {
      const { employeeId, contactType, contactId } = req.params;
      const result = await ContactValidationService.initiateContactVerification(employeeId, contactType, contactId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },

  recordVerificationResult: async (req: RecordVerificationRequest, res: Response) => {
    try {
      const { verificationId } = req.params;
      const { status } = req.body;
      const result = await ContactValidationService.recordVerificationResult(verificationId, status);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  },
};

export default ContactValidationController;