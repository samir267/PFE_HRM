import { Request, Response } from "express";
import CompensationComponentService from "../../service/Affectation/compensationComponent.service";
import { ICompensationComponent } from "../../types/Affectation/compensation-component.type";

class CompensationComponentController {
  async createComponent(req: Request, res: Response): Promise<void> {
    try {
      const data: Omit<ICompensationComponent, "createdAt" | "updatedAt"> = req.body;
      const newComponent = await CompensationComponentService.createComponent(data);
      res.status(201).json(newComponent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllComponents(req: Request, res: Response): Promise<void> {
    try {
      const filter: Partial<ICompensationComponent> = req.query;
      const components = await CompensationComponentService.getAllComponents(filter);
      res.status(200).json(components);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getComponentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const component = await CompensationComponentService.getComponentById(id);
      if (!component) {
        res.status(404).json({ message: "Compensation component not found" });
        return;
      }
      res.status(200).json(component);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateComponent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: Partial<ICompensationComponent> = req.body;
      const updatedComponent = await CompensationComponentService.updateComponent(id, data);
      if (!updatedComponent) {
        res.status(404).json({ message: "Compensation component not found" });
        return;
      }
      res.status(200).json(updatedComponent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteComponent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CompensationComponentService.deleteComponent(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getComponentsBySalaryRecord(req: Request, res: Response): Promise<void> {
    try {
      const { salaryRecordId } = req.params;
      const components = await CompensationComponentService.getComponentsBySalaryRecord(salaryRecordId);
      res.status(200).json(components);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new CompensationComponentController();