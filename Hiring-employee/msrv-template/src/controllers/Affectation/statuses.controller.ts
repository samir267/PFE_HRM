import { Request, Response } from "express";
import { StatusService } from "../../service/Affectation/statuses.service";
import logger from "../../configs/logger.config";


export class StatusController {
  static async create(req: Request, res: Response) {
    try {
      const status = await StatusService.createStatus(req.body);
      res.status(201).json(status);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const status = await StatusService.updateStatus(id, req.body);
      if (!status) {
        return res.status(404).json({ message: "Status not found" });
      }
      res.json(status);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const statuses = await StatusService.getAll();
      res.status(200).json(statuses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
