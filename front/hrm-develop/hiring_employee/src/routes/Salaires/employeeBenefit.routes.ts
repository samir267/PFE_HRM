import { Router } from 'express';
import { EmployeeBenefitController } from '../../controllers/Salaires/EmployeeBenefit.controller';

const router = Router();

router.post('/EmployeeBenefit', EmployeeBenefitController.create);
router.get('/EmployeeBenefit', EmployeeBenefitController.findAll);
router.get('/EmployeeBenefit/:id', EmployeeBenefitController.findById);
router.put('/EmployeeBenefit/:id', EmployeeBenefitController.update);
router.delete('/EmployeeBenefit/:id', EmployeeBenefitController.delete);

export default router;
