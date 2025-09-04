import { Router } from 'express';
import { AuditLogController } from '../../controllers/Equipment_Uniform/auditLog.controller';

const router = Router();

router.post('/AuditLog', AuditLogController.create);
router.get('/AuditLog', AuditLogController.findAll);
router.get('/AuditLog/:id', AuditLogController.findById);

export default router;
