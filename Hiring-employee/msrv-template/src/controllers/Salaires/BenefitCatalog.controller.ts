import { Request, Response } from 'express';
import { BenefitCatalogService } from '../../service/Salaires/benefitCatalog.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();
const service = new BenefitCatalogService();

export class BenefitCatalogController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const benefit = await service.create(req.body);

      kafka
        .produce('SalaryEvents', {
          type: 'BenefitCatalog_CREATED',
          data: benefit,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(201).json(benefit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET ALL
  static async findAll(req: Request, res: Response) {
    try {
      const benefits = await service.findAll();
      res.status(200).json(benefits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET BY ID
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const benefit = await service.findById(id);
      if (!benefit) return res.status(404).json({ error: 'Benefit not found' });
      res.status(200).json(benefit);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Benefit not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'BenefitCatalog_UPDATED',
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
      if (!deleted) return res.status(404).json({ error: 'Benefit not found' });

      kafka
        .produce('SalaryEvents', {
          type: 'BenefitCatalog_DELETED',
          data: deleted,
        })
        .catch((err) => logger.error('Kafka error:', err));

      res.status(200).json({ message: 'Benefit deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
