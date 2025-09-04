// controllers/employeeInformation.controller.ts
import { Request, Response } from "express";
import { EmployeeInformationService } from "../../service/civil-status/employeeInformation.service";
import { KafkaConnector } from "../../service/kafkaConnector";
import logger from "../../configs/logger.config";
const kafka = KafkaConnector.getInstance();

export class EmployeeInformationController {
  static async create(req: Request, res: Response) {
    try {
      const employee = await EmployeeInformationService.createEmployee(req.body);
       try {
        await kafka.produce('personal-data-events', {
          type: 'EMPLOYEE_CREATED',
          data: { employee },
        });
      } catch (kafkaError) {
        logger.error('Erreur Kafka lors de la création de l\'employé:', kafkaError);
      }

      res.status(201).json(employee);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const employees = await EmployeeInformationService.getAllEmployees();
      res.json(employees);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const employee = await EmployeeInformationService.getEmployeeById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Not found" });
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await EmployeeInformationService.updateEmployee(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await EmployeeInformationService.deleteEmployee(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
