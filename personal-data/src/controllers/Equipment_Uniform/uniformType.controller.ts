import { Request, Response } from 'express';
import { UniformTypeService } from '../../service/Equipment_Uniform/UniformType.service';
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka = KafkaConnector.getInstance();
const service = new UniformTypeService();

export class UniformTypeController {
  static async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-TYPE_CREATED', data: result });
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const result = await service.getAll();
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const result = await service.update(req.params.id, req.body);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-TYPE_UPDATED', data: result });
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const result = await service.getById(req.params.id);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
