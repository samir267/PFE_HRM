import { Request, Response } from 'express';
import { SalaryGradeService } from '../../service/Salaires/salaryGrade.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();
const service = new SalaryGradeService();

export class SalaryGradeController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const grade = await service.create(req.body);

      kafka
        .produce('SalaryEvents', {
          type: 'SalaryGrade_CREATED',
          data: grade,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(201).json(grade);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET ALL
  static async findAll(req: Request, res: Response) {
    try {
      const grades = await service.findAll();
      res.status(200).json(grades);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET BY ID
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const grade = await service.findById(id);
      if (!grade) return res.status(404).json({ error: 'Salary grade not found' });
      res.status(200).json(grade);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Salary grade not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'SalaryGrade_UPDATED',
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
      if (!deleted) return res.status(404).json({ error: 'Salary grade not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'SalaryGrade_DELETED',
          data: deleted,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(200).json({ message: 'Salary grade deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
