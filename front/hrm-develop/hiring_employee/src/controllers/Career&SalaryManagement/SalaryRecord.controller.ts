import { Request, Response } from 'express';
import { SalaryRecordService } from '../../service/Career&SalaryManagement/SalaryRecord.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();

export class SalaryRecordController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const salary = await SalaryRecordService.createSalaryRecord(req.body);
      kafka
        .produce('CareerSalaryManagment-events', { type: 'SalaryRecord_CREATED', data: salary })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(201).json(salary);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // PROMOTION (update salary on promotion)
  static async promote(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const newRecord = req.body;
      const updated = await SalaryRecordService.updateSalaryOnPromotion(employeeId, newRecord);
      kafka
        .produce('CareerSalaryManagment-events', { type: 'SalaryRecord_PROMOTED', data: updated })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get salary record by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const salary = await SalaryRecordService.getById(id);
      if (!salary) return res.status(404).json({ error: 'Salary record not found' });
      res.status(200).json(salary);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get history by employee
  static async getHistory(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const history = await SalaryRecordService.getHistory(employeeId);
      res.status(200).json(history);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await SalaryRecordService.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Salary record not found' });
      kafka
        .produce('CareerSalaryManagment-events', { type: 'SalaryRecord_UPDATED', data: updated })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await SalaryRecordService.delete(id);
      if (!deleted) return res.status(404).json({ error: 'Salary record not found' });
      kafka
        .produce('CareerSalaryManagment-events', { type: 'SalaryRecord_DELETED', data: deleted })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(200).json({ message: 'Salary record deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
