import { Router } from 'express';
import { SalaryGradeController } from '../../controllers/Salaires/SalaryGrade.controller';

const router = Router();

router.post('/SalaryGrade', SalaryGradeController.create);
router.get('/SalaryGrade', SalaryGradeController.findAll);
router.get('/SalaryGrade/:id', SalaryGradeController.findById);
router.put('/SalaryGrade/:id', SalaryGradeController.update);
router.delete('/SalaryGrade/:id', SalaryGradeController.delete);

export default router;
