import { Router } from 'express';
import { UniformAssignmentController } from '../../controllers/Equipment_Uniform/uniformAssignment.controller';

const router = Router();

router.post('/UniformAssignment', UniformAssignmentController.create);
router.get('/UniformAssignment', UniformAssignmentController.findAll);
router.get('/UniformAssignment/:id', UniformAssignmentController.findById);
router.put('/UniformAssignment/:id', UniformAssignmentController.update);
router.delete('/UniformAssignment/:id', UniformAssignmentController.delete);

export default router;
