import { Router } from "express";
import EmploymentContractController from "../../controllers/Affectation/employeeContract.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmploymentContract:
 *       type: object
 *       required:
 *         - assignment_id
 *         - contract_type
 *         - start_date
 *         - end_date
 *       properties:
 *         assignment_id:
 *           type: string
 *           description: ID of the assignment
 *         contract_type:
 *           type: string
 *           enum: [PERMANENT, FIXED_TERM, TEMPORARY, INTERNSHIP]
 *           description: Type of employment contract
 *         start_date:
 *           type: string
 *           format: date
 *           description: Contract start date
 *         end_date:
 *           type: string
 *           format: date
 *           description: Contract end date
 */

/**
 * @swagger
 * /api/v1/employment-contracts:
 *   post:
 *     summary: Create a new employment contract
 *     tags: [EmploymentContract]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmploymentContract'
 *     responses:
 *       201:
 *         description: Contract created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post("/employment-contracts", EmploymentContractController.create);

/**
 * @swagger
 * /api/v1/employment-contracts:
 *   get:
 *     summary: Get all employment contracts
 *     tags: [EmploymentContract]
 *     responses:
 *       200:
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmploymentContract'
 *       500:
 *         description: Server error
 */
router.get("/employment-contracts", EmploymentContractController.getAll);

/**
 * @swagger
 * /api/v1/employment-contracts/{id}:
 *   get:
 *     summary: Get a contract by ID
 *     tags: [EmploymentContract]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 664da12f8bd63a1b12345678
 *     responses:
 *       200:
 *         description: Contract found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmploymentContract'
 *       404:
 *         description: Contract not found
 *       500:
 *         description: Server error
 */
router.get("/employment-contracts/:id", EmploymentContractController.getById);

/**
 * @swagger
 * /api/v1/employment-contracts/{id}:
 *   put:
 *     summary: Update a contract by ID
 *     tags: [EmploymentContract]
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
 *             $ref: '#/components/schemas/EmploymentContract'
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *       404:
 *         description: Contract not found
 *       500:
 *         description: Server error
 */
router.put("/employment-contracts/:id", EmploymentContractController.update);

/**
 * @swagger
 * /api/v1/employment-contracts/{id}:
 *   delete:
 *     summary: Delete a contract by ID
 *     tags: [EmploymentContract]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *       404:
 *         description: Contract not found
 *       500:
 *         description: Server error
 */
router.delete("/employment-contracts/:id", EmploymentContractController.delete);

/**
 * @swagger
 * /api/v1/employees/kafka:
 *   get:
 *     summary: Fetch employees from Kafka topic
 *     tags: [EmploymentContract]
 *     responses:
 *       200:
 *         description: List of employees fetched from Kafka
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/employees/kafka", EmploymentContractController.getEmployeesFromKafka);

export default router;
