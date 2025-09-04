import { Router } from "express";
import CompensationComponentController from "../../controllers/Affectation/compensationComponent.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CompensationComponent:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - amount
 *         - currency
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the compensation component
 *           example: Housing Allowance
 *         type:
 *           type: string
 *           enum: [FIXED, VARIABLE, BONUS]
 *           description: Type of the compensation component
 *           example: FIXED
 *         amount:
 *           type: number
 *           format: float
 *           description: Monetary value of the component
 *           example: 1000.50
 *         currency:
 *           type: string
 *           description: Currency code (e.g., USD, EUR)
 *           example: USD
 */

/**
 * @swagger
 * /api/v1/compensation-components:
 *   post:
 *     summary: Create a compensation component
 *     tags: [CompensationComponent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompensationComponent'
 *     responses:
 *       201:
 *         description: Component created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post("/compensation-components", CompensationComponentController.createComponent);

/**
 * @swagger
 * /api/v1/compensation-components:
 *   get:
 *     summary: Get all compensation components
 *     tags: [CompensationComponent]
 *     responses:
 *       200:
 *         description: List of components
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompensationComponent'
 *       500:
 *         description: Server error
 */
router.get("/compensation-components", CompensationComponentController.getAllComponents);

/**
 * @swagger
 * /api/v1/compensation-components/{id}:
 *   get:
 *     summary: Get a compensation component by ID
 *     tags: [CompensationComponent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the compensation component
 *     responses:
 *       200:
 *         description: Component found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompensationComponent'
 *       404:
 *         description: Component not found
 *       500:
 *         description: Server error
 */
router.get("/compensation-components/:id", CompensationComponentController.getComponentById);

/**
 * @swagger
 * /api/v1/compensation-components/{id}:
 *   put:
 *     summary: Update a compensation component by ID
 *     tags: [CompensationComponent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the compensation component
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompensationComponent'
 *     responses:
 *       200:
 *         description: Component updated successfully
 *       404:
 *         description: Component not found
 *       500:
 *         description: Server error
 */
router.put("/compensation-components/:id", CompensationComponentController.updateComponent);

/**
 * @swagger
 * /api/v1/compensation-components/{id}:
 *   delete:
 *     summary: Delete a compensation component by ID
 *     tags: [CompensationComponent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the compensation component
 *     responses:
 *       200:
 *         description: Component deleted successfully
 *       404:
 *         description: Component not found
 *       500:
 *         description: Server error
 */
router.delete("/compensation-components/:id", CompensationComponentController.deleteComponent);

/**
* @swagger
* /api/v1/salary-records/{salaryRecordId}/compensation-components:
*   get:
*     summary: Get all compensation components for a salary record
*     tags: [CompensationComponent]
*     parameters:
*       - in: path
*         name: salaryRecordId
*         required: true
*         schema:
*           type: string
*         description: ID of the salary record
*     responses:
*       200:
*         description: List of compensation components
 */
router.get("/salary-record/:salaryRecordId", CompensationComponentController.getComponentsBySalaryRecord);


export default router;
