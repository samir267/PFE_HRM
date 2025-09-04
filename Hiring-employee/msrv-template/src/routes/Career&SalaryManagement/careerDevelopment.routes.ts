import { Router } from 'express';
import { CareerDevelopmentController } from '../../controllers/Career&SalaryManagement/CareerDevelopment.controller';

const router = Router();

// CREATE
router.post('/createcareerdevelopment', CareerDevelopmentController.create);

// READ
router.get('/getPlan/:employeeId', CareerDevelopmentController.getPlan);
router.get('/getcareer/:id', CareerDevelopmentController.getById);

// UPDATE
router.put('/updatecareer/:id', CareerDevelopmentController.update);

// DELETE
router.delete('/deletecareer/:id', CareerDevelopmentController.delete);

export default router;
