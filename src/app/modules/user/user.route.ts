// import express from 'express';
// import { UserController } from './user.controller';
// import auth from '../../middlewares/auth';

// const router = express.Router();

// // Route to create a regular user
// router.post(
//     '/create-user',
//     UserController.createUser
// );

// router.get('/all-admin',
//     auth(['admin', 'superAdmin']),
//     UserController.getAllAdmin
// )
// router.get('/all-user',
//     auth(['admin', 'superAdmin']),
//     UserController.getAllUser
// )
// router.get('/:id',
//     UserController.getSingleUser
// )
// router.get('/admin/:id',
//     UserController.getSingleAdmin
// )


// router.patch('/:id',
//     auth(['admin', 'superAdmin']),
//     UserController.changeUserRole
// )
// router.patch('/status/:id',
//     auth(['admin', 'superAdmin']),
//     UserController.changeUserStatus
// )

// router.delete(
//     '/:id',
//     auth(['admin', 'superAdmin']),
//     UserController.deleteUser);

// router.delete('/admin/:id',
//     auth(['admin', 'superAdmin']),
//     UserController.deleteAdmin);


// export const UserRoutes = router;

import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users & Admins
 *   description: User and Admin management endpoints (Protected with JWT & Role-based access)
 */

/**
 * @swagger
 * /api/v1/users/create-user:
 *   post:
 *     summary: Create a regular user
 *     tags: [Users & Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request or user already exists
 */
router.post(
    '/create-user',
    UserController.createUser
);

/**
 * @swagger
 * /api/v1/users/all-admin:
 *   get:
 *     summary: Get all admins (Admin & SuperAdmin only)
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden (Not enough permissions)
 */
router.get('/all-admin',
    auth(['admin', 'superAdmin']),
    UserController.getAllAdmin
);

/**
 * @swagger
 * /api/v1/users/all-user:
 *   get:
 *     summary: Get all regular users (Admin & SuperAdmin only)
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/all-user',
    auth(['admin', 'superAdmin']),
    UserController.getAllUser
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users & Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User MongoDB ObjectId
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *       404:
 *         description: User not found
 */
router.get('/:id',
    UserController.getSingleUser
);

/**
 * @swagger
 * /api/v1/users/admin/{id}:
 *   get:
 *     summary: Get a single admin by ID
 *     tags: [Users & Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Admin details fetched successfully
 */
router.get('/admin/:id',
    UserController.getSingleAdmin
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Change user role (Admin & SuperAdmin only)
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User role updated successfully
 */
router.patch('/:id',
    auth(['admin', 'superAdmin']),
    UserController.changeUserRole
);

/**
 * @swagger
 * /api/v1/users/status/{id}:
 *   patch:
 *     summary: Change user status (Active/Blocked)
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
router.patch('/status/:id',
    auth(['admin', 'superAdmin']),
    UserController.changeUserStatus
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete(
    '/:id',
    auth(['admin', 'superAdmin']),
    UserController.deleteUser
);

/**
 * @swagger
 * /api/v1/users/admin/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Users & Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 */
router.delete('/admin/:id',
    auth(['admin', 'superAdmin']),
    UserController.deleteAdmin
);

export const UserRoutes = router;