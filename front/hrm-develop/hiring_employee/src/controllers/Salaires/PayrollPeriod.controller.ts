import { Request, Response } from 'express';
import { PayrollPeriodService } from '../../service/Salaires/payrollPeriod.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();
const service = new PayrollPeriodService();

export class PayrollPeriodController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const period = await service.create(req.body);

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollPeriod_CREATED',
          data: period,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(201).json(period);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET ALL
  static async findAll(req: Request, res: Response) {
    try {
      const periods = await service.findAll();
      res.status(200).json(periods);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET BY ID
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const period = await service.findById(id);
      if (!period) return res.status(404).json({ error: 'Payroll period not found' });
      res.status(200).json(period);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Payroll period not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollPeriod_UPDATED',
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
      if (!deleted) return res.status(404).json({ error: 'Payroll period not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'PayrollPeriod_DELETED',
          data: deleted,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(200).json({ message: 'Payroll period deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
