import { Router } from 'express';
import { UniformTypeController } from '../../controllers/Equipment_Uniform/uniformType.controller';

const router = Router();

router.post('/UniformType', UniformTypeController.create);
router.get('/UniformType', UniformTypeController.getAll);
router.put('/UniformType/:id', UniformTypeController.update);
router.get('/UniformType/:id', UniformTypeController.getById);

export default router;
