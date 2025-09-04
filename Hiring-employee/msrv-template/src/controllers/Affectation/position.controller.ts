// import { Request, Response } from "express";
// import PositionService from "../../service/Affectation/position.service";
// import { KafkaConnector } from '../../service/kafkaConnector'
// import logger from '../../configs/logger.config'

// const kafka = KafkaConnector.getInstance()
// class PositionController {
//   // Créer un poste
//   async createPosition(req: Request, res: Response): Promise<void> {
//     try {
//       const position = await PositionService.createPosition(req.body);
//       kafka
//       .produce('Affectation-events', { type: 'Position_CREATED', data: position })
//       .catch((error) => logger.error('Erreur Kafka:', error))
//       res.status(201).json(position);
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Obtenir tous les postes
//   async getAllPositions(req: Request, res: Response): Promise<void> {
//     try {
//       const isActive = req.query.isActive === "true" ? true : req.query.isActive === "false" ? false : undefined;
//       const positions = await PositionService.getAllPositions(isActive);
//       res.status(200).json(positions);
//     } catch (error:any) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//  // Obtenir un poste par ID
// async getPositionById(req: Request, res: Response): Promise<void> {
//   try {
//     const position = await PositionService.getPositionById(req.params.id);
//     if (!position) {
//       res.status(404).json({ message: "Position not found" });
//     } else {
//       res.status(200).json(position);
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// }

//   // Mettre à jour un poste
//   async updatePosition(req: Request, res: Response): Promise<void> {
//     try {
//       const updated = await PositionService.updatePosition(req.params.id, req.body);
//       res.status(200).json(updated);
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Supprimer un poste
//   async deletePosition(req: Request, res: Response): Promise<void> {
//     try {
//       await PositionService.deletePosition(req.params.id);
//       res.status(200).json({ message: "Position deleted successfully" });
//     } catch (error:any) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   // Vérifier la disponibilité de la position (headcount)
//   // async checkHeadcountAvailability(req: Request, res: Response): Promise<void> {
//   //   try {
//   //     const isAvailable = await PositionService.isHeadcountAvailable(req.params.id);
//   //     res.status(200).json({ available: isAvailable });
//   //   } catch (error:any) {
//   //     res.status(400).json({ message: error.message });
//   //   }
//   // }
// }

// export default new PositionController();
import { Request, Response } from "express";
import { StaffingRequestService } from "../../service/Affectation/position.service";

const service = new StaffingRequestService();

export class StaffingRequestController {
  // ➡️ Créer
  async create(req: Request, res: Response) {
    try {
      const request = await service.create(req.body);
      res.status(201).json({
  success: true,
  data: request,
  message: "Staffing request created successfully"
});
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req:Request,res:Response){
    try{
      const request = await service.updateStatus(req.params.id,req.body.status);
      if (!request) return res.status(404).json({ message: "Not found" });
      res.json(request);
    }catch(error:any){
      res.status(500).json({ message: error.message });
    }
  }

  // ➡️ Lister
  async getAll(req: Request, res: Response) {
    try {
      const requests = await service.findAll();
      res.status(200).json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➡️ Récupérer par ID Mongo (_id)
  async getById(req: Request, res: Response) {
    try {
      const request = await service.findById(req.params.id);
      if (!request) return res.status(404).json({ message: "Not found" });
      res.json(request);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➡️ Récupérer par identifiant métier (ex: REQ-1234567890)
  async getByBusinessId(req: Request, res: Response) {
    try {
      const request = await service.findByBusinessId(req.params.reqId);
      if (!request) return res.status(404).json({ message: "Not found" });
      res.json(request);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ➡️ Mise à jour
  async update(req: Request, res: Response) {
    try {
      const updated = await service.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  

  // ➡️ Suppression
  async delete(req: Request, res: Response) {
    try {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
