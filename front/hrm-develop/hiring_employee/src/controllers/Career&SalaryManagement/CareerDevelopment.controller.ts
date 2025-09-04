import { Request, Response } from 'express';
import { CareerDevelopmentService } from '../../service/Career&SalaryManagement/CareerDevelopment.service';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();

export class CareerDevelopmentController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const plan = await CareerDevelopmentService.createCareerDevelopment(req.body);
      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerDevelopment_CREATED',
          data: plan,
        })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(201).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get all plans for an employee
  static async getPlan(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const plan = await CareerDevelopmentService.getDevelopmentPlan(employeeId);
      res.status(200).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const plan = await CareerDevelopmentService.getById(id);
      if (!plan) return res.status(404).json({ error: 'CareerDevelopment not found' });
      res.status(200).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedPlan = await CareerDevelopmentService.updateCareerDevelopment(id, req.body);
      if (!updatedPlan) return res.status(404).json({ error: 'CareerDevelopment not found' });

      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerDevelopment_UPDATED',
          data: updatedPlan,
        })
        .catch((error) => logger.error('Erreur Kafka:', error));

      res.status(200).json(updatedPlan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedPlan = await CareerDevelopmentService.deleteCareerDevelopment(id);
      if (!deletedPlan) return res.status(404).json({ error: 'CareerDevelopment not found' });

      kafka
        .produce('CareerSalaryManagment-events', {
          type: 'CareerDevelopment_DELETED',
          data: deletedPlan,
        })
        .catch((error) => logger.error('Erreur Kafka:', error));

      res.status(200).json({ message: 'CareerDevelopment deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
