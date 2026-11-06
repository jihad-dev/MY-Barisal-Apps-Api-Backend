import { Router } from 'express';
import { FireServiceController } from './fire-service.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FireServiceValidation } from './fire-service.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Fire Services (Sub-feature)
 *   description: Emergency fire service station listing and management endpoints
 */

/**
 * @swagger
 * /api/v1/fire-service:
 *   get:
 *     summary: Get all fire service stations (with optional filtering)
 *     tags: [Fire Services (Sub-feature)]
 *     parameters:
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter fire service stations by specific area/location
 *     responses:
 *       200:
 *         description: Fire service stations fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', FireServiceController.getAllFireServices);

/**
 * @swagger
 * /api/v1/fire-service/create:
 *   post:
 *     summary: Add a new fire service station (Admin / Super Admin only)
 *     tags: [Fire Services (Sub-feature)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - area
 *               - thana
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Barisal Fire Service & Civil Defense"
 *               type:
 *                 type: string
 *                 enum: [government, volunteer]
 *                 example: "government"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               area:
 *                 type: string
 *                 example: "Sadar Road"
 *               thana:
 *                 type: string
 *                 example: "Kotwali"
 *               phone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+8801700000000", "+8801800000000"]
 *     responses:
 *       201:
 *         description: Fire service station created successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden
 */
router.post(
    '/create',
    // auth(['admin', 'superAdmin']),
    validateRequest(FireServiceValidation.createFireServiceSchema),
    FireServiceController.createFireService
);

/**
 * @swagger
 * /api/v1/fire-service/{id}:
 *   delete:
 *     summary: Delete a fire service station entry (Admin / Super Admin only)
 *     tags: [Fire Services (Sub-feature)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fire Service MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Fire service station deleted successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Fire service station not found
 */
router.delete(
    '/:id',
    // auth(['admin', 'superAdmin']),
    FireServiceController.deleteFireService
);

export const FireServiceRoutes = router;