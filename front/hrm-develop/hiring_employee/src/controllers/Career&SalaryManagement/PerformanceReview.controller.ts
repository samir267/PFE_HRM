import { Request, Response } from 'express';
import { PerformanceReviewService } from '../../service/Career&SalaryManagement/PerformanceReview.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();
const service = new PerformanceReviewService();

export class PerformanceReviewController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const review = await service.create(req.body);

      kafka.produce('CareerSalaryManagment-events', {
        type: 'PerformanceReview_CREATED',
        data: review,
      }).catch((error) => logger.error('Erreur Kafka:', error));

      res.status(201).json(review);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET - par ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const review = await service.findById(id);
      if (!review) return res.status(404).json({ error: 'Évaluation non trouvée' });
      res.status(200).json(review);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET - toutes les évaluations d’un employé
  static async getHistory(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const history = await service.findByEmployee(employeeId);
      res.status(200).json(history);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET - tout
  static async getAll(req: Request, res: Response) {
    try {
      const reviews = await service.findAll();
      res.status(200).json(reviews);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Évaluation non trouvée' });

      kafka.produce('CareerSalaryManagment-events', {
        type: 'PerformanceReview_UPDATED',
        data: updated,
      }).catch((error) => logger.error('Erreur Kafka:', error));

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
      if (!deleted) return res.status(404).json({ error: 'Évaluation non trouvée' });

      kafka.produce('CareerSalaryManagment-events', {
        type: 'PerformanceReview_DELETED',
        data: deleted,
      }).catch((error) => logger.error('Erreur Kafka:', error));

      res.status(200).json({ message: 'Évaluation supprimée avec succès' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
