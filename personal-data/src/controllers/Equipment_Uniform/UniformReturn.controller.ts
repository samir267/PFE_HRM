import { Request, Response } from 'express';
import { UniformReturnService } from '../../service/Equipment_Uniform/UniformReturn.service';
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka = KafkaConnector.getInstance();
const service = new UniformReturnService();

export class UniformReturnController {
  static async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-RETURN_CREATED', data: result });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const result = await service.getAll();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await service.delete(req.params.id);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-RETURN_DELETED', data: result });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const result = await service.update(req.params.id, req.body);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-RETURN_UPDATED', data: result });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await service.getById(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
