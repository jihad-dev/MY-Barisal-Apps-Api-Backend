import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorValidations } from './doctor.validation';
import { DoctorControllers } from './doctor.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctor Services (Sub-feature)
 *   description: Emergency doctor listing and management endpoints
 */

/**
 * @swagger
 * /api/v1/doctors:
 *   get:
 *     summary: Get all doctors (with optional search and filtering)
 *     tags: [Doctor Services (Sub-feature)]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by name, speciality, or chamber address
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter doctors by specific area/location
 *     responses:
 *       200:
 *         description: Doctors fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', DoctorControllers.getAllDoctors);

/**
 * @swagger
 * /api/v1/doctors/add-doctor:
 *   post:
 *     summary: Add a new doctor (Admin / Super Admin only)
 *     tags: [Doctor Services (Sub-feature)]
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
 *               - speciality
 *               - degree
 *               - visitingHours
 *               - chamberAddress
 *               - area
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. Md. Ali Hossain"
 *               speciality:
 *                 type: string
 *                 example: "Medicine & Cardiology Specialist"
 *               degree:
 *                 type: string
 *                 example: "MBBS, FCPS (Medicine)"
 *               qualification:
 *                 type: string
 *                 example: "Senior Consultant"
 *               visitingHours:
 *                 type: string
 *                 example: "5:00 PM - 9:00 PM (Fri Closed)"
 *               chamberAddress:
 *                 type: string
 *                 example: "Popular Diagnostic Center, Barisal"
 *               area:
 *                 type: string
 *                 example: "Sadar Road, Barisal"
 *               phone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+8801700000000", "+8801800000000"]
 *     responses:
 *       201:
 *         description: Doctor added successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized access (Token missing or invalid)
 *       403:
 *         description: Forbidden (Admin privileges required)
 */
router.post(
    '/add-doctor',
    // auth(['admin', 'superAdmin']),
    validateRequest(DoctorValidations.createDoctorValidationSchema),
    DoctorControllers.createDoctor
);

/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor entry (Admin / Super Admin only)
 *     tags: [Doctor Services (Sub-feature)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.delete(
    '/:id',
    // auth(['admin', 'superAdmin']),
    DoctorControllers.deleteDoctor
);

export const DoctorRoutes = router;