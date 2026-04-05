
import { Router } from 'express';
import { InstitutionController } from './institution.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InstitutionValidation } from './institution.validation';
import auth from '../../middlewares/auth';

const router = Router();

// Public
router.get('/',    InstitutionController.getAllInstitutions);

// Admin only
router.post(
  '/create',
  auth(['admin','superAdmin']),
  validateRequest(InstitutionValidation.createInstitutionSchema),
  InstitutionController.createInstitution
);

router.delete(
  '/:id',
  auth(['admin','superAdmin']),
  InstitutionController.deleteInstitution
);

export const InstitutionRoutes = router;