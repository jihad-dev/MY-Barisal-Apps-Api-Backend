// fire-service.route.ts
import { Router } from 'express';
import { FireServiceController } from './fire-service.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FireServiceValidation } from './fire-service.validation';

const router = Router();

// Public
router.get('/', FireServiceController.getAllFireServices);

// Admin only
router.post(
    '/create',
    auth(['admin', 'superAdmin']),
    validateRequest(FireServiceValidation.createFireServiceSchema),
    FireServiceController.createFireService
);

router.delete(
    '/:id',
    auth(['admin', 'superAdmin']),
    FireServiceController.deleteFireService
);

export const FireServiceRoutes = router;