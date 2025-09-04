import { Router } from 'express';
import { MedicalConditionController } from '../../controllers/MedicalExpenses/medicalCondition.controller';

const router = Router();

router.post('/MedicalCondition', MedicalConditionController.create);
router.get('/MedicalCondition/employee/:employeeId', MedicalConditionController.getAllByEmployee);
router.get('/MedicalCondition/:id', MedicalConditionController.getById);
router.put('/MedicalCondition/:id', MedicalConditionController.update);
router.delete('/MedicalCondition/:id', MedicalConditionController.delete);

export default router;
