import { Router } from "express";
import CompensationController from "../../controllers/Affectation/compensation.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Compensation:
 *       type: object
 *       required:
 *         - assignment_id
 *         - baseSalary
 *         - salaryCurrency
 *         - payFrequency
 *         - salaryGrade
 *         - salaryStep
 *         - effectiveDate
 *       properties:
 *         assignment_id:
 *           type: string
 *           description: ID of the employee's assignment
 *           example: 665f212faabf5a0012456aaa
 *         baseSalary:
 *           type: number
 *           format: float
 *           description: Base salary amount
 *           example: 4500.75
 *         salaryCurrency:
 *           type: string
 *           description: Currency of the salary
 *           example: EUR
 *         payFrequency:
 *           type: string
 *           enum: [MONTHLY, BIWEEKLY, WEEKLY]
 *           description: Frequency of salary payments
 *           example: MONTHLY
 *         salaryGrade:
 *           type: string
 *           description: Salary grade
 *           example: A1
 *         salaryStep:
 *           type: number
 *           description: Step within the salary grade
 *           example: 2
 *         effectiveDate:
 *           type: string
 *           format: date
 *           description: The date when the compensation becomes effective
 *           example: 2025-07-01
 */

/**
 * @swagger
 * /api/v1/compensations:
 *   post:
 *     summary: Create a new compensation record
 *     tags: [Compensation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compensation'
 *     responses:
 *       201:
 *         description: Compensation created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
router.post("/compensations", CompensationController.create);

/**
 * @swagger
 * /api/v1/compensations:
 *   get:
 *     summary: Get all compensation records
 *     tags: [Compensation]
 *     responses:
 *       200:
 *         description: List of compensations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compensation'
 *       500:
 *         description: Server error
 */
router.get("/compensations", CompensationController.getAll);

/**
 * @swagger
 * /api/v1/compensations/{id}:
 *   get:
 *     summary: Get a compensation record by ID
 *     tags: [Compensation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 665f212faabf5a0012456abc
 *         description: Compensation ID
 *     responses:
 *       200:
 *         description: Compensation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compensation'
 *       404:
 *         description: Compensation not found
 *       500:
 *         description: Server error
 */
router.get("/compensations/:id", CompensationController.getById);

/**
 * @swagger
 * /api/v1/compensations/{id}:
 *   put:
 *     summary: Update a compensation record
 *     tags: [Compensation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compensation'
 *     responses:
 *       200:
 *         description: Compensation updated successfully
 *       404:
 *         description: Compensation not found
 *       500:
 *         description: Server error
 */
router.put("/compensations/:id", CompensationController.update);

/**
 * @swagger
 * /api/v1/compensations/{id}:
 *   delete:
 *     summary: Delete a compensation record by ID
 *     tags: [Compensation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compensation deleted successfully
 *       404:
 *         description: Compensation not found
 *       500:
 *         description: Server error
 */
router.delete("/compensations/:id", CompensationController.delete);

export default router;
