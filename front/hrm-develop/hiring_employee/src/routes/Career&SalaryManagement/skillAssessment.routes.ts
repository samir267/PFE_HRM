import { Router } from 'express';
import { SkillAssessmentController } from '../../controllers/Career&SalaryManagement/SkillAssessment.controller';

const router = Router();

// CREATE
router.post('/addSkill', SkillAssessmentController.addSkill);

// READ
router.get('/expiringSkill/:personalIdentityId', SkillAssessmentController.getExpiring);
router.get('/skill/:id', SkillAssessmentController.getById);

// UPDATE
router.put('/skill/:id', SkillAssessmentController.update);
router.put('/skill/verify/:id', SkillAssessmentController.verify);

// DELETE
router.delete('/skill/:id', SkillAssessmentController.delete);

export default router;
