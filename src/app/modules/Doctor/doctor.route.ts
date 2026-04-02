import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorValidations } from './doctor.validation';
import { DoctorControllers } from './doctor.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/add-doctor',
    auth(['admin', 'superAdmin']),
    validateRequest(DoctorValidations.createDoctorValidationSchema),
    DoctorControllers.createDoctor
);

router.get('/', DoctorControllers.getAllDoctors);

export const DoctorRoutes = router;