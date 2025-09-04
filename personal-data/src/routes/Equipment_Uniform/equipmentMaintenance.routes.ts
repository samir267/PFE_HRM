import { Router } from 'express';
import { EquipmentMaintenanceController } from '../../controllers/Equipment_Uniform/equipmentMaintenance.controller';

const router = Router();

router.post('/EquipmentMaintenance', EquipmentMaintenanceController.create);
router.get('/EquipmentMaintenance', EquipmentMaintenanceController.findAll);
router.get('/EquipmentMaintenance/:id', EquipmentMaintenanceController.findById);
router.put('/EquipmentMaintenance/:id', EquipmentMaintenanceController.update);
router.delete('/EquipmentMaintenance/:id', EquipmentMaintenanceController.delete);

export default router;
