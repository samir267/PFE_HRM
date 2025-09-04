import { Request, Response } from "express";
import WorkScheduleService from "../../service/Affectation/workSchedule.service";
import { KafkaConnector } from '../../service/kafkaConnector'
import logger from '../../configs/logger.config'

const kafka = KafkaConnector.getInstance()
class WorkScheduleController {
  // Créer un horaire
  async create(req: Request, res: Response) {
    try {
      const schedule = await WorkScheduleService.createSchedule(req.body);
      kafka
      .produce('Affectation-events', { type: 'WorkSchedule_CREATED', data: schedule })
      .catch((error) => logger.error('Erreur Kafka:', error))
      res.status(201).json(schedule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer tous les horaires (optionnellement filtrés)
  async getAll(req: Request, res: Response) {
    try {
      const { assignmentId } = req.query;
      let schedules;
      if (typeof assignmentId === "string") {
        schedules = await WorkScheduleService.getSchedulesByAssignment(assignmentId);
      } else {
        schedules = await WorkScheduleService.getAllSchedules();
      }
      res.json(schedules);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer un horaire par ID
  async getById(req: Request, res: Response) {
    try {
      const schedule = await WorkScheduleService.getScheduleById(req.params.id);
      if (!schedule) return res.status(404).json({ error: "WorkSchedule not found" });
      res.json(schedule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Mettre à jour un horaire par ID
  async update(req: Request, res: Response) {
    try {
      const updatedSchedule = await WorkScheduleService.updateSchedule(req.params.id, req.body);
      res.json(updatedSchedule);
    } catch (error: any) {
      if (error.message === "WorkSchedule not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // Supprimer un horaire par ID
  async delete(req: Request, res: Response) {
    try {
      await WorkScheduleService.deleteSchedule(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new WorkScheduleController();
