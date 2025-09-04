import { Router } from 'express';
import { EquipmentInventoryController } from '../../controllers/Equipment_Uniform/equipmentInventory.controller';

const router = Router();

router.post('/EquipmentInventory', EquipmentInventoryController.create);
router.get('/EquipmentInventory', EquipmentInventoryController.findAll);
router.get('/EquipmentInventory/:id', EquipmentInventoryController.findById);
router.put('/EquipmentInventory/:id', EquipmentInventoryController.update);
router.delete('/EquipmentInventory/:id', EquipmentInventoryController.delete);

export default router;
