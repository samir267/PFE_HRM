import { Request, Response } from 'express';
import { EquipmentReturnService } from "../../service/Equipment_Uniform/EquipmentReturn.service";
import { KafkaConnector } from '../../service/kafkaConnector';

const kafka = KafkaConnector.getInstance();
const equipmentReturnService = new EquipmentReturnService();

export class EquipmentReturnController {
  static async create(req: Request, res: Response) {
    try {
      const data = await equipmentReturnService.create(req.body);
      kafka.produce('equipment-uniform-events', { type: 'Equipment-RETURN_CREATED', data });
      res.status(201).json(data);
    } catch (err:any) {
      res.status(400).json({ error: 'Erreur lors de la création' , message: err.message});
    }
  }

  static async findAll(_: Request, res: Response) {
    try {
      const list = await equipmentReturnService.findAll();
      res.status(200).json(list);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la récupération' });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const record = await equipmentReturnService.findById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(record);
    } catch (err) {
      res.status(400).json({ error: 'Erreur interne' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await equipmentReturnService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'Equipment-RETURN_UPDATED', data: updated });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await equipmentReturnService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Non trouvé' });
      kafka.produce('equipment-uniform-events', { type: 'Equipment-RETURN_DELETED', data: deleted });
      res.status(200).json({ message: 'Supprimé avec succès' });
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
}