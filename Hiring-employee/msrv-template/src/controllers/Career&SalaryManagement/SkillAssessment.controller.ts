import { Request, Response } from 'express';
import { SkillAssessmentService } from '../../service/Career&SalaryManagement/SkillAssessment.service';
import { Types } from 'mongoose';
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

const kafka = KafkaConnector.getInstance();

export class SkillAssessmentController {
  // CREATE
  static async addSkill(req: Request, res: Response) {
    try {
      const skill = await SkillAssessmentService.addSkillAssessment(req.body);
      kafka
        .produce('CareerSalaryManagment-events', { type: 'SkillAssessment_CREATED', data: skill })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(201).json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get expiring certifications
  static async getExpiring(req: Request, res: Response) {
    try {
      const { personalIdentityId } = req.params;
      const certifications = await SkillAssessmentService.getExpiringCertifications(new Types.ObjectId(personalIdentityId));
      if (certifications.length === 0)
        return res.status(404).json({ error: "Certifications that are expiring in this month not found" });
      res.status(200).json(certifications);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // VERIFY - Update verification status
  static async verify(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await SkillAssessmentService.verifySkill(id, status);
      res.status(200).json({ message: 'Skill updated successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ - Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await SkillAssessmentService.getById(id);
      if (!skill) return res.status(404).json({ error: 'Skill assessment not found' });
      res.status(200).json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await SkillAssessmentService.updateSkillAssessment(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Skill assessment not found' });

      kafka
        .produce('CareerSalaryManagment-events', { type: 'SkillAssessment_UPDATED', data: updated })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await SkillAssessmentService.deleteSkillAssessment(id);
      if (!deleted) return res.status(404).json({ error: 'Skill assessment not found' });

      kafka
        .produce('CareerSalaryManagment-events', { type: 'SkillAssessment_DELETED', data: deleted })
        .catch((error) => logger.error('Erreur Kafka:', error));
      res.status(200).json({ message: 'Skill assessment deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
