import express from 'express'
import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
} from '../controllers/sample.controller'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { sampleSchema } from '../validator/sample.schema'
import { KafkaConnector } from '../service/kafkaConnector'
import logger from '../configs/logger.config'
import { featureFlagMiddleware } from '../middlewares/featureFlag.middleware'

const router = express.Router()

// Get the singleton instance instead of creating a new one
// Only set up Kafka consumption in non-test environments
if (process.env.NODE_ENV !== 'test') {
  const kafka = KafkaConnector.getInstance()

  // Don't need to connect here - we'll do it in app.ts
  // kafka.connect()

  // Consommation des événements
  kafka.consume('notification-events', async (message) => {
    logger.info('Notification reçue:', message)
  })
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Sample:
 *       type: object
 *       required:
 *         - samplename
 *         - sampledescription
 *         - creationdate
 *       properties:
 *         samplename:
 *           type: string
 *           description: The name of the sample
 *         sampledescription:
 *           type: string
 *           description: The description of the sample
 *         creationdate:
 *           type: string
 *           format: date-time
 *           description: The creation date of the sample
 */

/**
 * @swagger
 * /api/samples:
 *   post:
 *     summary: Create a new sample
 *     tags: [Sample]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sample'
 *     responses:
 *       201:
 *         description: Sample created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/api/samples', validationMiddleware(sampleSchema), createSample)

/**
 * @swagger
 * /api/samples:
 *   get:
 *     summary: Get all samples
 *     tags: [Sample]
 *     responses:
 *       200:
 *         description: List of samples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sample'
 *       500:
 *         description: Internal server error
 */
router.get('/api/samples', featureFlagMiddleware('sample_feature'), getAllSamples)

/**
 * @swagger
 * /api/samples/{id}:
 *   get:
 *     summary: Get sample by ID
 *     tags: [Sample]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sample ID
 *     responses:
 *       200:
 *         description: Sample details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 *       404:
 *         description: Sample not found
 *       500:
 *         description: Internal server error
 */
router.get('/api/samples/:id', getSampleById)

/**
 * @swagger
 * /api/samples/{id}:
 *   put:
 *     summary: Update sample by ID
 *     tags: [Sample]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sample ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sample'
 *     responses:
 *       200:
 *         description: Sample details updated successfully
 *       404:
 *         description: Sample not found
 *       500:
 *         description: Internal server error
 */
router.put('/api/samples/:id', validationMiddleware(sampleSchema), updateSample)

/**
 * @swagger
 * /api/samples/{id}:
 *   delete:
 *     summary: Delete sample by ID
 *     tags: [Sample]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sample ID
 *     responses:
 *       200:
 *         description: Sample deleted successfully
 *       404:
 *         description: Sample not found
 *       500:
 *         description: Internal server error
 */
router.delete('/api/samples/:id', deleteSample)

export { router as sampleRouter }
