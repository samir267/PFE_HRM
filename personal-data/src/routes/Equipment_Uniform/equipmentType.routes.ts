import { Router } from 'express';
import { EquipmentTypeController } from '../../controllers/Equipment_Uniform/equipmentType.controller';

const router = Router();

router.post('/EquipmentType', EquipmentTypeController.create);
router.get('/EquipmentType', EquipmentTypeController.findAll);
router.get('/EquipmentType/:id', EquipmentTypeController.findById);
router.put('/EquipmentType/:id', EquipmentTypeController.update);
router.delete('/EquipmentType/:id', EquipmentTypeController.delete);

export default router;
