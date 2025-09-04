import { Router } from 'express';
import { PayrollEntryController } from '../../controllers/Salaires/PayrollEntry.controller';

const router = Router();

router.post('/PayrollEntry', PayrollEntryController.create);
router.get('/PayrollEntry', PayrollEntryController.findAll);
router.get('/PayrollEntry/:id', PayrollEntryController.findById);
router.put('/PayrollEntry/:id', PayrollEntryController.update);
router.delete('/PayrollEntry/:id', PayrollEntryController.delete);

export default router;
