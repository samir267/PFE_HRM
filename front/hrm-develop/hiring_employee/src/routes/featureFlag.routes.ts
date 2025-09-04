import { Router } from 'express'
import { featureFlagController } from '../controllers/featureFlag.controller'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureFlag:
 *       type: object
 *       required:
 *         - name
 *         - enabled
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du feature flag (par exemple, sample_feature)
 *         enabled:
 *           type: boolean
 *           description: Indique si le feature flag est activé (true) ou désactivé (false)
 *         targeting:
 *           type: object
 *           description: Configuration du ciblage (optionnel)
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 type: string
 *               description: Liste des IDs d'utilisateurs ciblés
 *             tenants:
 *               type: array
 *               items:
 *                 type: string
 *               description: Liste des IDs de locataires ciblés
 *             percentage:
 *               type: number
 *               description: Pourcentage d'utilisateurs ciblés (par exemple, 10 pour 10%)
 *           nullable: true
 *     Metrics:
 *       type: object
 *       required:
 *         - flagName
 *         - checks
 *       properties:
 *         flagName:
 *           type: string
 *           description: Le nom du feature flag mesuré
 *         checks:
 *           type: number
 *           description: Nombre de fois que le drapeau a été vérifié
 *         lastChecked:
 *           type: string
 *           format: date-time
 *           description: Date de la dernière vérification
 */

/**
 * @swagger
 * /api/feature-flags:
 *   get:
 *     summary: Lister tous les feature flags
 *     tags: [FeatureFlag]
 *     responses:
 *       200:
 *         description: Liste des feature flags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeatureFlag'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', featureFlagController.getFlags.bind(featureFlagController))

/**
 * @swagger
 * /api/feature-flags:
 *   post:
 *     summary: Créer ou mettre à jour un feature flag
 *     tags: [FeatureFlag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - enabled
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du feature flag
 *               enabled:
 *                 type: boolean
 *                 description: État du feature flag (activé ou désactivé)
 *               targeting:
 *                 type: object
 *                 description: Configuration du ciblage (optionnel)
 *                 properties:
 *                   users:
 *                     type: array
 *                     items:
 *                       type: string
 *                   tenants:
 *                     type: array
 *                     items:
 *                       type: string
 *                   percentage:
 *                     type: number
 *     responses:
 *       200:
 *         description: Feature flag mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation de la mise à jour
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', featureFlagController.setFlag.bind(featureFlagController))

/**
 * @swagger
 * /api/feature-flags/metrics:
 *   get:
 *     summary: Obtenir les métriques des feature flags
 *     tags: [FeatureFlag]
 *     responses:
 *       200:
 *         description: Liste des métriques des feature flags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metrics'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/metrics', featureFlagController.getMetrics.bind(featureFlagController))

export default router