import { Router } from 'express';
import { PerformanceReviewController } from '../../controllers/Career&SalaryManagement/PerformanceReview.controller';

const router = Router();

// CREATE
router.post('/createperformancereview', PerformanceReviewController.create);

// READ
router.get('/historyPerformance/:employeeId', PerformanceReviewController.getHistory);
router.get('/performancereview/:id', PerformanceReviewController.getById);

// UPDATE
router.put('/performancereview/:id', PerformanceReviewController.update);

// DELETE
router.delete('/performancereview/:id', PerformanceReviewController.delete);

// ACKNOWLEDGE
// router.put('/acknowledgePerformanceReview/:reviewId/:employeeId', PerformanceReviewController.acknowledge);

export default router;
