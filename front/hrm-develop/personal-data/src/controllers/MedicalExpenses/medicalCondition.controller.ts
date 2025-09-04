import { Request, Response } from 'express';
import { MedicalConditionService } from '../../service/MedicalExpenses/medicalCondition.service';
import logger from '../../configs/logger.config';


const service = new MedicalConditionService();

export class MedicalConditionController {
  static async create(req: Request, res: Response) {
    

    try {
      const condition = await service.create(req.body);
      res.status(201).json(condition);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la création' });
    }
  }

  static async getAllByEmployee(req: Request, res: Response) {
    try {
      logger.info('Liste des conditions médicales recuperée');
      const conditions = await service.getAllByEmployee(req.params.employeeId);
      res.status(200).json(conditions);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la récupération' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const condition = await service.getById(req.params.id);
      if (!condition) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(condition);
    } catch (err) {
      res.status(400).json({ error: 'Erreur interne' });
    }
  }

  static async update(req: Request, res: Response) {

    try {
      const updated = await service.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Non trouvé' });
      res.status(200).json({ message: 'Supprimé avec succès' });
    } catch (err) {
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
}
