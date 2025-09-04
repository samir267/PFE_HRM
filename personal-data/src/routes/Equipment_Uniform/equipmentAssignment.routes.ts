import { Router } from 'express';
import { EquipmentAssignmentController } from '../../controllers/Equipment_Uniform/equipmentAssignment.controller';

const router = Router();

router.post('/EquipmentAssignment', EquipmentAssignmentController.create);
router.get('/EquipmentAssignment', EquipmentAssignmentController.findAll);
router.get('/EquipmentAssignment/:id', EquipmentAssignmentController.findById);
router.put('/EquipmentAssignment/:id', EquipmentAssignmentController.update);
router.delete('/EquipmentAssignment/:id', EquipmentAssignmentController.delete);

export default router;
