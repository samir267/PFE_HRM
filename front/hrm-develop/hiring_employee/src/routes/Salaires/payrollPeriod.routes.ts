import { Router } from 'express';
import { PayrollPeriodController } from '../../controllers/Salaires/PayrollPeriod.controller';

const router = Router();

router.post('/PayrollPeriod', PayrollPeriodController.create);
router.get('/PayrollPeriod', PayrollPeriodController.findAll);
router.get('/PayrollPeriod/:id', PayrollPeriodController.findById);
router.put('/PayrollPeriod/:id', PayrollPeriodController.update);
router.delete('/PayrollPeriod/:id', PayrollPeriodController.delete);

export default router;
