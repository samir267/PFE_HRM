import { Request, Response } from "express";
import EmployeeAssignmentService from "../../service/Affectation/employeeAssignment.service";
import logger from "../../configs/logger.config";
import { KafkaConnector } from "../../service/kafkaConnector";  

const kafka = KafkaConnector.getInstance();

class EmployeeAssignmentController {
  async createAssignment(req: Request, res: Response) {
    try {
      const assignment = await EmployeeAssignmentService.createAssignment(req.body);
      kafka
      .produce('Affectation-events', { type: 'Assignment_CREATED', data: assignment })
      .catch((error) => logger.error('Erreur Kafka:', error))
      return res.status(201).json(assignment);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }




  async getAllAssignments(req: Request, res: Response) {
    try {
      const assignments = await EmployeeAssignmentService.getAllAssignments();
      return res.status(200).json(assignments);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // async getAssignmentById(req: Request, res: Response) {
  //   try {
  //     const assignment = await EmployeeAssignmentService.getAssignmentById(req.params.id);
  //     if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  //     return res.status(200).json(assignment);
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

   getAssignmentById = async (req: Request, res: Response) => {
    try {
      const assignment = await EmployeeAssignmentService.getAssignmentById(req.params.id);

      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }

      const employeeId = assignment.employeeId;
      if (!employeeId) {
        return res.status(400).json({ message: "Aucun ID d'employé trouvé dans l'assignement" });
      }
      const employee = await this.fetchEmployeeByIdFromService(employeeId);
      logger.info(`Fetching employee with ID2 ${employee}`);


      return res.status(200).json({
        assignment,
        employee,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

 fetchEmployeeByIdFromService = async (employeeId: string) => {
  logger.info(`Fetching employee with ID3: ${employeeId}`);
  try {
    const response = await fetch("http://localhost:3000/api/v1/employees/kafka/");
    const data = await response.json();
    logger.info(`Fetched employee data count: ${data.employees.length}`);

    if (!data.employees || !Array.isArray(data.employees)) {
      throw new Error("Invalid employee data");
    }

    for (const emp of data.employees) {
      logger.info(`Checking employee ID: ${emp._id} against ${employeeId} -> ${String(emp._id) === String(employeeId)}`);
    }

    const employee = data.employees.find((emp: { _id: any }) => String(emp._id) === String(employeeId));
    logger.info(`Fetched employee: ${JSON.stringify(employee)}`);

    return employee || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'employé:", error);
    return null;
  }
}



  async updateAssignment(req: Request, res: Response) {
    try {
      const updated = await EmployeeAssignmentService.updateAssignment(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Assignment not found" });
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

async deleteAssignment(req: Request, res: Response) {
  try {
    const deleted = await EmployeeAssignmentService.deleteAssignment(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}


  async getAssignmentsByEmployee(req: Request, res: Response) {
    try {
      const assignments = await EmployeeAssignmentService.getAssignmentsByEmployee(req.params.employeeId);
      return res.status(200).json(assignments);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new EmployeeAssignmentController();
