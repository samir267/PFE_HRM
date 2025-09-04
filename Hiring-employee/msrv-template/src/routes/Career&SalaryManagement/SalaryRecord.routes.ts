import { Router } from 'express';
import { SalaryRecordController } from '../../controllers/Career&SalaryManagement/SalaryRecord.controller';

const router = Router();

// CREATE
router.post('/salaryrecordcreate', SalaryRecordController.create);

// READ
router.get('/historysalaryrecord/:employeeId', SalaryRecordController.getHistory);
router.get('/salaryrecord/:id', SalaryRecordController.getById);

// UPDATE
router.put('/salaryrecord/:id', SalaryRecordController.update);

// DELETE
router.delete('/salaryrecord/:id', SalaryRecordController.delete);

// PROMOTE (update salary on promotion)
router.put('/promotesalaryrecord/:employeeId', SalaryRecordController.promote);

export default router;
