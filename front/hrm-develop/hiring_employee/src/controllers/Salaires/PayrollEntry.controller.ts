import { Request, Response } from 'express';
import { PayrollEntryService } from '../../service/Salaires/payrollEntry.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();
const service = new PayrollEntryService();

export class PayrollEntryController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const entry = await service.create(req.body);

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollEntry_CREATED',
          data: entry,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET ALL
  static async findAll(req: Request, res: Response) {
    try {
      const entries = await service.findAll();
      res.status(200).json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET BY ID
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const entry = await service.findById(id);
      if (!entry) return res.status(404).json({ error: 'Payroll entry not found' });
      res.status(200).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Payroll entry not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollEntry_UPDATED',
          data: updated,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      if (!deleted) return res.status(404).json({ error: 'Payroll entry not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollEntry_DELETED',
          data: deleted,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(200).json({ message: 'Payroll entry deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
