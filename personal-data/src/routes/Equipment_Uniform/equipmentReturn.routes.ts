import { Router } from 'express';
import { EquipmentReturnController } from '../../controllers/Equipment_Uniform/equipmentReturn.controller';

const router = Router();

router.post('/EquipmentReturn', EquipmentReturnController.create);
router.get('/EquipmentReturn', EquipmentReturnController.findAll);
router.get('/EquipmentReturn/:id', EquipmentReturnController.findById);
router.put('/EquipmentReturn/:id', EquipmentReturnController.update);
router.delete('/EquipmentReturn/:id', EquipmentReturnController.delete);

export default router;
