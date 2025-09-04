import { Request, Response } from 'express';
import { UniformAssignmentService } from "../../service/Equipment_Uniform/UniformAssignment.service";
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka = KafkaConnector.getInstance();
const uniformAssignmentService = new UniformAssignmentService();

export class UniformAssignmentController {
  static async create(req: Request, res: Response) {
    try {
       if (typeof req.body.uniformDetails?.items === 'string') {
      req.body.uniformDetails.items = JSON.parse(req.body.uniformDetails.items);
    }
      const data = await uniformAssignmentService.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'Uniform-ASSIGNMENT_CREATED', data });
      res.status(201).json(data);
    } catch (err: any) {
      res.status(400).json({ error: 'Erreur lors de la création', message: err.message });
    }
  }

  static async findAll(_: Request, res: Response) {
    try {
      const list = await uniformAssignmentService.findAll();
      res.status(200).json(list);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la récupération' });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const record = await uniformAssignmentService.findById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({ error: 'Erreur interne' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await uniformAssignmentService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'Uniform-ASSIGNMENT_UPDATED', data: updated });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await uniformAssignmentService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'Uniform-ASSIGNMENT_DELETED', data: deleted });
      res.status(200).json({ message: 'Supprimé avec succès' });
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
}