// import { Router } from "express";
// import PositionController from "../../controllers/Affectation/position.controller";

// const router = Router();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Position:
//  *       type: object
//  *       required:
//  *         - positionname
//  *         - positiondescription
//  *         - creationdate
//  *       properties:
//  *         positionname:
//  *           type: string
//  *           description: The name of the position
//  *           example: Developer
//  *         positiondescription:
//  *           type: string
//  *           description: The description of the position
//  *           example: Responsible for writing and maintaining code
//  *         creationdate:
//  *           type: string
//  *           format: date-time
//  *           description: The creation date of the position
//  *           example: 2025-06-25T10:00:00Z
//  */

// /**
//  * @swagger
//  * /api/v1/createPosition:
//  *   post:
//  *     summary: Create a new position
//  *     tags: [Position]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Position'
//  *     responses:
//  *       201:
//  *         description: Position created successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/createPosition", PositionController.createPosition);

// /**
//  * @swagger
//  * /api/v1/getAllPositions:
//  *   get:
//  *     summary: Get all positions
//  *     tags: [Position]
//  *     responses:
//  *       200:
//  *         description: List of positions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Position'
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/getAllPositions", PositionController.getAllPositions);

// /**
//  * @swagger
//  * /api/v1/getPositionById/{id}:
//  *   get:
//  *     summary: Get a position by ID
//  *     tags: [Position]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: 60d21b4667d0d8992e610c85
//  *         description: The ID of the position
//  *     responses:
//  *       200:
//  *         description: Position found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Position'
//  *       404:
//  *         description: Position not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/getPositionById/:id", PositionController.getPositionById);

// /**
//  * @swagger
//  * /api/v1/updatePosition/{id}:
//  *   put:
//  *     summary: Update a position by ID
//  *     tags: [Position]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: 60d21b4667d0d8992e610c85
//  *         description: The ID of the position
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Position'
//  *     responses:
//  *       200:
//  *         description: Position updated successfully
//  *       404:
//  *         description: Position not found
//  *       500:
//  *         description: Internal server error
//  */
// router.put("/updatePosition/:id", PositionController.updatePosition);

// /**
//  * @swagger
//  * /api/v1/deletePosition/{id}:
//  *   delete:
//  *     summary: Delete a position by ID
//  *     tags: [Position]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: 60d21b4667d0d8992e610c85
//  *         description: The ID of the position
//  *     responses:
//  *       200:
//  *         description: Position deleted successfully
//  *       404:
//  *         description: Position not found
//  *       500:
//  *         description: Internal server error
//  */
// router.delete("/deletePosition/:id", PositionController.deletePosition);

// export default router;
import { Router } from "express";
import { StaffingRequestController } from "../../controllers/Affectation/position.controller";

const router = Router();
const controller = new StaffingRequestController();

// CRUD
router.post("/StaffingRequest", controller.create.bind(controller));
router.put("/StaffingRequestChangeStatus/:id", controller.updateStatus.bind(controller));
router.get("/StaffingRequest", controller.getAll.bind(controller));
router.get("/StaffingRequest/:id", controller.getById.bind(controller));
router.get("/StaffingRequest/business/:reqId", controller.getByBusinessId.bind(controller));
router.put("/StaffingRequest/:id", controller.update.bind(controller));
router.delete("/StaffingRequest/:id", controller.delete.bind(controller));

export default router;
