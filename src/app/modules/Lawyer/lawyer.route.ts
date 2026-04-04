// lawyer.route.ts
import { Router } from 'express';
import { LawyerController } from './lawyer.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { LawyerValidation } from './lawyer.validation';


const router = Router();

// Public
router.get('/', LawyerController.getAllLawyers);

// Admin only
router.post(
  '/',
  auth(['admin', 'superAdmin']),
  validateRequest(LawyerValidation.createLawyerSchema),
  LawyerController.createLawyer
);

router.delete(
  '/:id',
  auth(['admin', 'superAdmin']),
  LawyerController.deleteLawyer
);

export const LawyerRoutes = router;