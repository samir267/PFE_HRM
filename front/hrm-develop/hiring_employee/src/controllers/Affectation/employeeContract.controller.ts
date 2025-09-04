import { Request, Response } from "express";
import EmploymentContractService from "../../service/Affectation/employeeContract.service";
import logger from "../../configs/logger.config";
import { KafkaConnector } from "../../service/kafkaConnector";
import { startKafkaConsumer,receivedEmployees } from "../kafkaConsumer/kafka.controller";
const kafka = KafkaConnector.getInstance();
class EmploymentContractController {

  

  // Créer un contrat
  async create(req: Request, res: Response) {
    try {
      const contract = await EmploymentContractService.createContract(req.body);
      kafka
      .produce('Affectation-events', { type: 'EmployementContract_CREATED', data: contract })
      .catch((error) => logger.error('Erreur Kafka:', error))
      res.status(201).json(contract);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


  getEmployeesFromKafka = (req: Request, res: Response) => {
  try{
    res.status(200).json({ employees: receivedEmployees });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

  
  // Récupérer tous les contrats (avec filtre optionnel)
  async getAll(req: Request, res: Response) {
    
        startKafkaConsumer();

    try {
      
      const kafka = KafkaConnector.getInstance()
      kafka.consume('personal-data-events', async (message) => {
        logger.info('personal-data-events reçue:', message)
      })
      const { assignmentId } = req.query;
      let contracts;
      if (typeof assignmentId === "string") {
        contracts = await EmploymentContractService.getContractsByAssignment(assignmentId);
      } else {
        contracts = await EmploymentContractService.getAllContracts();
      }
      res.json(contracts);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Récupérer un contrat par ID
  async getById(req: Request, res: Response) {
    try {
      const contract = await EmploymentContractService.getContractById(req.params.id);
      if (!contract) return res.status(404).json({ error: "EmploymentContract not found" });
      res.json(contract);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Mettre à jour un contrat par ID
  async update(req: Request, res: Response) {
    try {
      const updatedContract = await EmploymentContractService.updateContract(req.params.id, req.body);
      res.json(updatedContract);
    } catch (error: any) {
      if (error.message === "EmploymentContract not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  // Supprimer un contrat par ID
  async delete(req: Request, res: Response) {
    try {
      await EmploymentContractService.deleteContract(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EmploymentContractController();
