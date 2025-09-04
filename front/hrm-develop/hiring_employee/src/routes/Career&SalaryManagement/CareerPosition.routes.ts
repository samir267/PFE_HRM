import { Router } from 'express';
import { CareerPositionController } from '../../controllers/Career&SalaryManagement/CareerPosition.controller';

const router = Router();

// CREATE
router.post('/createPositionCareer', CareerPositionController.create);

// READ
router.get('/historyPositionCareer/:employeeId', CareerPositionController.getHistory);
router.get('/PositionCareer/:id', CareerPositionController.getById);

// UPDATE
router.put('/PositionCareer/:id', CareerPositionController.update);

// DELETE
router.delete('/PositionCareer/:id', CareerPositionController.delete);

// CLOSE current position
router.put('/closePositionCareer/:employeeId', CareerPositionController.close);

export default router;
