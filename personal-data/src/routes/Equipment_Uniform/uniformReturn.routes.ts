import { Router } from 'express';
import { UniformReturnController } from '../../controllers/Equipment_Uniform/UniformReturn.controller';

const router = Router();

router.post('/UniformReturn', UniformReturnController.create);
router.get('/UniformReturn', UniformReturnController.getAll);
router.get('/UniformReturn/:id', UniformReturnController.getById);
router.put('/UniformReturn/:id', UniformReturnController.update);
router.delete('/UniformReturn/:id', UniformReturnController.delete);

export default router;
