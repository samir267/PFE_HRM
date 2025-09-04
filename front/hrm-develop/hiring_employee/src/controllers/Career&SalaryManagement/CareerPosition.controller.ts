import { Request, Response } from 'express';
import { CareerPositionService } from '../../service/Career&SalaryManagement/CareerPosition.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();

export class CareerPositionController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const position = await CareerPositionService.createCareerPosition(req.body);
      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerPosition_CREATED',
          data: position,
        })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(201).json(position);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // CLOSE
  static async close(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      await CareerPositionService.closeCurrentPosition(employeeId);
      res.status(200).json({ message: 'Position closed successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get full history by employee
  static async getHistory(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const history = await CareerPositionService.getCareerHistory(employeeId);
      res.status(200).json(history);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const position = await CareerPositionService.getById(id);
      if (!position) return res.status(404).json({ error: 'CareerPosition not found' });
      res.status(200).json(position);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await CareerPositionService.updateCareerPosition(id, req.body);
      if (!updated) return res.status(404).json({ error: 'CareerPosition not found' });

      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerPosition_UPDATED',
          data: updated,
        })
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
      const deleted = await CareerPositionService.deleteCareerPosition(id);
      if (!deleted) return res.status(404).json({ error: 'CareerPosition not found' });

      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerPosition_DELETED',
          data: deleted,
        })
        .catch((error) => logger.error('Erreur Kafka:', error));

      res.status(200).json({ message: 'CareerPosition deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
