import { Request, Response } from "express";
import CompensationService from "../../service/Affectation/componsation.service";
import { KafkaConnector } from '../../service/kafkaConnector'
import logger from '../../configs/logger.config'

const kafka = KafkaConnector.getInstance()
class CompensationController {
  async create(req: Request, res: Response) {
    try {
      const compensation = await CompensationService.createCompensation(req.body);
      kafka
      .produce('Affectation-events', { type: 'Compensation_CREATED', data: compensation })
      .catch((error) => logger.error('Erreur Kafka:', error))
      res.status(201).json(compensation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const compensations = await CompensationService.getAllCompensations();
      res.json(compensations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const compensation = await CompensationService.updateCompensation(id, req.body);
      res.status(200).json(compensation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const compensation = await CompensationService.getCompensationById(req.params.id);
      if (!compensation) return res.status(404).json({ error: "Compensation not found" });
      res.json(compensation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await CompensationService.deleteCompensation(req.params.id);
      res.status(200).json({ message: "Compensation deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CompensationController();
