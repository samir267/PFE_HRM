import { Request, Response } from 'express';
import { EquipmentAssignmentService } from "../../service/Equipment_Uniform/EquipmentAssignment.service";
import { KafkaConnector } from '../../service/kafkaConnector';

const equipmentAssignmentService = new EquipmentAssignmentService();
const kafka = KafkaConnector.getInstance();
export class EquipmentAssignmentController {
  static async create(req: Request, res: Response) {
    try {
      const data = await equipmentAssignmentService.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'ASSIGNMENT_CREATED', data });
      res.status(201).json(data);
    } catch (err:any) {
      res.status(400).json({ error: 'Erreur lors de la création' , message: err.message});
    }
  }

  static async findAll(_: Request, res: Response) {
    try {
      const list = await equipmentAssignmentService.findAll();
      res.status(200).json(list);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la récupération' });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const record = await equipmentAssignmentService.findById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({ error: 'Erreur interne' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await equipmentAssignmentService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'ASSIGNMENT_UPDATED', data: updated });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await equipmentAssignmentService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'ASSIGNMENT_DELETED', data: deleted });
      res.status(200).json({ message: 'Supprimé avec succès' });
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
}