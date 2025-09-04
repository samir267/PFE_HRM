import { Router } from "express";
import WorkScheduleController from "../../controllers/Affectation/workSchedule.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkSchedule:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - startTime
 *         - endTime
 *         - days
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the work schedule
 *           example: Standard Week
 *         description:
 *           type: string
 *           description: Description of the work schedule
 *           example: Monday to Friday, 8AM to 5PM
 *         startTime:
 *           type: string
 *           format: time
 *           example: "08:00"
 *         endTime:
 *           type: string
 *           format: time
 *           example: "17:00"
 *         days:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 */

/**
 * @swagger
 * /api/v1/work-schedules:
 *   post:
 *     summary: Create a new work schedule
 *     tags: [WorkSchedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkSchedule'
 *     responses:
 *       201:
 *         description: Work schedule created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/work-schedules", WorkScheduleController.create);

/**
 * @swagger
 * /api/v1/work-schedules:
 *   get:
 *     summary: Get all work schedules
 *     tags: [WorkSchedule]
 *     responses:
 *       200:
 *         description: List of work schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkSchedule'
 *       500:
 *         description: Internal server error
 */
router.get("/work-schedules", WorkScheduleController.getAll);

/**
 * @swagger
 * /api/v1/work-schedules/{id}:
 *   get:
 *     summary: Get a work schedule by ID
 *     tags: [WorkSchedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the work schedule
 *     responses:
 *       200:
 *         description: Work schedule found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkSchedule'
 *       404:
 *         description: Work schedule not found
 *       500:
 *         description: Internal server error
 */
router.get("/work-schedules/:id", WorkScheduleController.getById);

/**
 * @swagger
 * /api/v1/work-schedules/{id}:
 *   put:
 *     summary: Update a work schedule by ID
 *     tags: [WorkSchedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the work schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkSchedule'
 *     responses:
 *       200:
 *         description: Work schedule updated successfully
 *       404:
 *         description: Work schedule not found
 *       500:
 *         description: Internal server error
 */
router.put("/work-schedules/:id", WorkScheduleController.update);

/**
 * @swagger
 * /api/v1/work-schedules/{id}:
 *   delete:
 *     summary: Delete a work schedule by ID
 *     tags: [WorkSchedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the work schedule
 *     responses:
 *       200:
 *         description: Work schedule deleted successfully
 *       404:
 *         description: Work schedule not found
 *       500:
 *         description: Internal server error
 */
router.delete("/work-schedules/:id", WorkScheduleController.delete);

export default router;
