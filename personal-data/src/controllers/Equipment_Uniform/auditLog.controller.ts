import { Request, Response } from 'express';
import { AuditLogService } from "../../service/Equipment_Uniform/AuditLog.service";
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka= KafkaConnector.getInstance();
const auditLogService = new AuditLogService();

export class AuditLogController {
  static async create(req: Request, res: Response) {
    try {
      const data = await auditLogService.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'Audit-LOG_CREATED', data });
      res.status(201).json(data);
    } catch (err:any) {
      res.status(400).json({ error: 'Erreur lors de la création', message: err.message });
    }
  }

  static async findAll(_: Request, res: Response) {
    try {
      const list = await auditLogService.findAll();
      res.status(200).json(list);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la récupération' });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const record = await auditLogService.findById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({ error: 'Erreur interne' });
    }
  }
}
