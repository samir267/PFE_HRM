import { Request, Response } from "express";
import { AttachedDocumentService } from "../../service/documents/attachedDocuments.service";
import logger from "../../configs/logger.config";
import { KafkaConnector } from "../../service/kafkaConnector";

const service = new AttachedDocumentService();
const kafka = KafkaConnector.getInstance();

export class AttachedDocumentController {
  static async create(req: Request, res: Response) {
    try{

      const document = await service.create(req.body);
      await kafka
        .produce('personal-data-Documents', {
          type: 'ATTACHED_DOCUMENT_CREATED',
          data: document,
        })
        .catch((error) => logger.error('Erreur Kafka lors de la création du document attaché:', error));
      return res.status(201).json(document);
    }catch(error:any){
      logger.error('Erreur lors de la création du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try{

      const doc = await service.getById(req.params.id);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      return res.status(200).json(doc);
    }catch(error:any){
      logger.error('Erreur lors de la récupération du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async getByEmployee(req: Request, res: Response) {
    try{
      const docs = await service.getByEmployee(req.params.employeeId);
      return res.status(200).json(docs);
    }catch(error:any){
      logger.error('Erreur lors de la récupération des documents attachés:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try{

      const doc = await service.update(req.params.id, req.body);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      await kafka
        .produce('personal-data-Documents', {
          type: 'ATTACHED_DOCUMENT_UPDATED',
          data: doc,
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du document attaché:', error));
      return res.status(200).json(doc);
    }catch(error:any){
      logger.error('Erreur lors de la mise à jour du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try{
      const doc = await service.delete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      await kafka
        .produce('personal-data-Documents', {
          type: 'ATTACHED_DOCUMENT_DELETED',
          data: { id: req.params.id },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du document attaché:', error));
      return res.status(200).json({ message: "Deleted successfully" });
    }catch(error:any){
      logger.error('Erreur lors de la suppression du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }
}