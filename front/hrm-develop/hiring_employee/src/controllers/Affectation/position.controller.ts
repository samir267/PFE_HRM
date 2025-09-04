import { Request, Response } from "express";
import PositionService from "../../service/Affectation/position.service";
import { KafkaConnector } from '../../service/kafkaConnector'
import logger from '../../configs/logger.config'

const kafka = KafkaConnector.getInstance()
class PositionController {
  // Créer un poste
  async createPosition(req: Request, res: Response): Promise<void> {
    try {
      const position = await PositionService.createPosition(req.body);
      kafka
      .produce('Affectation-events', { type: 'Position_CREATED', data: position })
      .catch((error) => logger.error('Erreur Kafka:', error))
      res.status(201).json(position);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Obtenir tous les postes
  async getAllPositions(req: Request, res: Response): Promise<void> {
    try {
      const isActive = req.query.isActive === "true" ? true : req.query.isActive === "false" ? false : undefined;
      const positions = await PositionService.getAllPositions(isActive);
      res.status(200).json(positions);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

 // Obtenir un poste par ID
async getPositionById(req: Request, res: Response): Promise<void> {
  try {
    const position = await PositionService.getPositionById(req.params.id);
    if (!position) {
      res.status(404).json({ message: "Position not found" });
    } else {
      res.status(200).json(position);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

  // Mettre à jour un poste
  async updatePosition(req: Request, res: Response): Promise<void> {
    try {
      const updated = await PositionService.updatePosition(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Supprimer un poste
  async deletePosition(req: Request, res: Response): Promise<void> {
    try {
      await PositionService.deletePosition(req.params.id);
      res.status(200).json({ message: "Position deleted successfully" });
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Vérifier la disponibilité de la position (headcount)
  // async checkHeadcountAvailability(req: Request, res: Response): Promise<void> {
  //   try {
  //     const isAvailable = await PositionService.isHeadcountAvailable(req.params.id);
  //     res.status(200).json({ available: isAvailable });
  //   } catch (error:any) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }
}

export default new PositionController();
