import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PoliceValidations } from './police.validation';
import { PoliceControllers } from './police.controller';

const router = express.Router();

router.post(
  '/add-station',
  validateRequest(PoliceValidations.createPoliceValidationSchema),
  PoliceControllers.createPolice
);

router.get('/', PoliceControllers.getAllPolice);

export const PoliceRoutes = router;