import { Router } from 'express';
import { UniformInventoryController } from '../../controllers/Equipment_Uniform/UniformInventory.controller';

const router = Router();

router.post('/UniformInventory', UniformInventoryController.create);
router.get('/UniformInventory', UniformInventoryController.getAll);
router.put('/UniformInventory/:id', UniformInventoryController.update);
router.get('/UniformInventory/:id', UniformInventoryController.getById);
router.delete('/UniformInventory/:id', UniformInventoryController.delete);

export default router;
