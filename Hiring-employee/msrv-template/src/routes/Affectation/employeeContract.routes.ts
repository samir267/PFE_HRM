import { Router } from 'express';
import { ContractController } from '../../controllers/Affectation/employeeContract.controller';

const router = Router();

  const contractController = new ContractController();

  // Routes CRUD
  router.post('/employment-contracts', contractController.createContract);
  router.get('/employment-contracts', contractController.getContracts);
  router.get('/stats', contractController.getContractStats);
  router.get('/expiring/:days?', contractController.getExpiringContracts);
  router.get('/employment-contracts/:id', contractController.getContractById);
  router.put('/employment-contracts/:id', contractController.updateContract);
  router.delete('/employment-contracts/:id', contractController.deleteContract);

  // Routes métier
//   router.post('/:id/validate', contractController.validateContract);
  router.post('/employment-contracts/:id/activate', contractController.activateContract);
  router.post('/employment-contracts/:id/terminate', contractController.terminateContract);

  


export default router;
