// import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { DonorValidations } from './donor.validation';
// import { DonorControllers } from './donor.controller';

// const router = express.Router();

// // ১. নতুন ডোনার রেজিস্ট্রেশন (ভ্যালিডেশনসহ)
// router.post(
//   '/register',
//   validateRequest(DonorValidations.createDonorValidationSchema),
//   DonorControllers.registerDonor
// );

// // ২. সকল ডোনারদের তালিকা দেখা (ফিল্টারিং লজিকসহ)
// router.get(
//   '/', 
//   DonorControllers.getAllDonors
// );



// // ৪. ডোনারের তথ্য আপডেট করা
// router.patch(
//   '/:id',
//   validateRequest(DonorValidations.updateDonorValidationSchema),
//   DonorControllers.updateDonor
// );


// export const DonorRoutes = router;


import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DonorValidations } from './donor.validation';
import { DonorControllers } from './donor.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blood Donors (Core Feature)
 *   description: Blood donor registration, listing, and management endpoints
 */

/**
 * @swagger
 * /api/v1/donars/register:
 *   post:
 *     summary: Register a new blood donor
 *     tags: [Blood Donors (Core Feature)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - bloodGroup
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jihadul Islam"
 *               bloodGroup:
 *                 type: string
 *                 example: "A+"
 *               phone:
 *                 type: string
 *                 example: "+8801700000000"
 *               address:
 *                 type: string
 *                 example: "Barisal Sadar"
 *     responses:
 *       201:
 *         description: Donor registered successfully
 *       400:
 *         description: Validation error or bad request
 */
router.post(
  '/register',
  validateRequest(DonorValidations.createDonorValidationSchema),
  DonorControllers.registerDonor
);

/**
 * @swagger
 * /api/v1/donars:
 *   get:
 *     summary: Get all blood donors (with optional filtering)
 *     tags: [Blood Donors (Core Feature)]
 *     parameters:
 *       - in: query
 *         name: bloodGroup
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter donors by blood group (e.g., A+, B+, O-)
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter donors by location/address
 *     responses:
 *       200:
 *         description: List of blood donors retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(
  '/',
  DonorControllers.getAllDonors
);

/**
 * @swagger
 * /api/v1/donars/{id}:
 *   patch:
 *     summary: Update donor information
 *     tags: [Blood Donors (Core Feature)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donor MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jihadul Islam"
 *               phone:
 *                 type: string
 *                 example: "+8801800000000"
 *     responses:
 *       200:
 *         description: Donor updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Donor not found
 */
router.patch(
  '/:id',
  validateRequest(DonorValidations.updateDonorValidationSchema),
  DonorControllers.updateDonor
);

export const DonorRoutes = router;