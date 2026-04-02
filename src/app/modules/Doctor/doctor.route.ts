import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorValidations } from './doctor.validation';
import { DoctorControllers } from './doctor.controller';

const router = express.Router();

router.post(
  '/add-doctor',
  validateRequest(DoctorValidations.createDoctorValidationSchema),
  DoctorControllers.createDoctor
);

router.get('/', DoctorControllers.getAllDoctors);

export const DoctorRoutes = router;