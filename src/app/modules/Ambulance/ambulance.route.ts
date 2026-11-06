import { Router, Request, Response, NextFunction } from 'express';
import { AmbulanceController } from './ambulance.controller';
import auth from '../../middlewares/auth';
import { z } from 'zod';

// ==========================================
// ১. Zod Validation Schemas & Middleware
// ==========================================
export const AmbulanceTypeEnum = z.enum(['government', 'private', 'volunteer']);

export const createAmbulanceValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Ambulance name is required',
        }),
        type: AmbulanceTypeEnum,
        thana: z.string({
            required_error: 'Thana is required',
        }),
        area: z.string({
            required_error: 'Area is required',
        }),
        phone: z
            .array(z.string(), {
                required_error: 'Phone numbers are required',
            })
            .nonempty('Phone number array cannot be empty'),
        isDeleted: z.boolean().optional().default(false),
    }),
});

// ভ্যালিডেশন চেক করার জন্য রিইউজেবল মিডেলওয়্যার ফাংশন
const validateRequest = (schema: z.AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                cookies: req.cookies,
            });
            return next();
        } catch (error) {
            next(error);
        }
    };
};

// ==========================================
// ২. Router & Swagger Documentation
// ==========================================
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ambulance Services (Sub-feature)
 *   description: Emergency ambulance listing and management endpoints
 */

/**
 * @swagger
 * /api/v1/ambulances:
 *   get:
 *     summary: Get all available ambulances
 *     tags: [Ambulance Services (Sub-feature)]
 *     parameters:
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter ambulances by specific area/location
 *     responses:
 *       200:
 *         description: List of ambulances retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', AmbulanceController.getAllAmbulances);

/**
 * @swagger
 * /api/v1/ambulances/add-ambulance:
 *   post:
 *     summary: Add a new ambulance (Admin / Super Admin only)
 *     tags: [Ambulance Services (Sub-feature)]
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
 *               - thana
 *               - area
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Barisal General Ambulance"
 *               type:
 *                 type: string
 *                 enum: [government, private, volunteer]
 *                 example: "government"
 *               thana:
 *                 type: string
 *                 example: "Kotwali"
 *               area:
 *                 type: string
 *                 example: "Sadar Road, Barisal"
 *               phone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+8801711111111", "+8801822222222"]
 *     responses:
 *       201:
 *         description: Ambulance added successfully
 *       401:
 *         description: Unauthorized access (Token missing or invalid)
 *       403:
 *         description: Forbidden (Admin privileges required)
 *       400:
 *         description: Validation error or bad request
 */
router.post(
    '/add-ambulance',
    auth(['admin', 'superAdmin']),
    validateRequest(createAmbulanceValidationSchema), // জড ভ্যালিডেশন মিডেলওয়্যার এখানে যুক্ত করা হয়েছে
    AmbulanceController.createAmbulance
);

/**
 * @swagger
 * /api/v1/ambulances/{id}:
 *   delete:
 *     summary: Delete an ambulance entry (Admin / Super Admin only)
 *     tags: [Ambulance Services (Sub-feature)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ambulance MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Ambulance deleted successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ambulance not found
 */
router.delete('/:id', auth(['admin', 'superAdmin']), AmbulanceController.deleteAmbulance);

export const AmbulanceRoutes = router;