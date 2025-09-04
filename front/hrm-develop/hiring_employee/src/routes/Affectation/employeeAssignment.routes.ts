import { Router } from "express";
import EmployeeAssignmentController from "../../controllers/Affectation/employeeAssignment.controller";
import logger from "../../configs/logger.config";
import { KafkaConnector } from "../../service/kafkaConnector";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeAssignment:
 *       type: object
 *       required:
 *         - employeeId
 *         - positionId
 *         - startDate
 *       properties:
 *         employeeId:
 *           type: string
 *           description: ID of the employee
 *           example: 665f212faabf5a0012456abc
 *         positionId:
 *           type: string
 *           description: ID of the position
 *           example: 665f212faabf5a0012456def
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2025-06-25
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-12-31
 */

/**
 * @swagger
 * /api/v1/createAssignment:
 *   post:
 *     summary: Create a new employee assignment
 *     tags: [EmployeeAssignment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeAssignment'
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/createAssignment", EmployeeAssignmentController.createAssignment);

/**
 * @swagger
 * /api/v1/getAllAssignments:
 *   get:
 *     summary: Get all employee assignments
 *     tags: [EmployeeAssignment]
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeAssignment'
 *       500:
 *         description: Internal server error
 */
router.get("/getAllAssignments", EmployeeAssignmentController.getAllAssignments);

/**
 * @swagger
 * /api/v1/getAssignmentById/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [EmployeeAssignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the assignment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeAssignment'
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */
router.get("/getAssignmentById/:id", EmployeeAssignmentController.getAssignmentById);

/**
 * @swagger
 * /api/v1/updateAssignment/{id}:
 *   put:
 *     summary: Update an assignment by ID
 *     tags: [EmployeeAssignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the assignment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeAssignment'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateAssignment/:id", EmployeeAssignmentController.updateAssignment);

/**
 * @swagger
 * /api/v1/deleteAssignment/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [EmployeeAssignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the assignment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteAssignment/:id", EmployeeAssignmentController.deleteAssignment);

/**
 * @swagger
 * /api/v1/employee/{employeeId}:
 *   get:
 *     summary: Get assignments by employee ID
 *     tags: [EmployeeAssignment]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *           example: 665f212faabf5a0012456abc
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: List of assignments for the employee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeAssignment'
 *       404:
 *         description: No assignments found
 *       500:
 *         description: Internal server error
 */
router.get("/employee/:employeeId", EmployeeAssignmentController.getAssignmentsByEmployee);

export default router;
