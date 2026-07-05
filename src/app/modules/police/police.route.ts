import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PoliceValidations } from './police.validation';
import { PoliceControllers } from './police.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/add-station',
    auth(['admin', 'superAdmin']),
    validateRequest(PoliceValidations.createPoliceValidationSchema),
    PoliceControllers.createPolice
);

router.get('/', PoliceControllers.getAllPolice);
router.delete('/:id', PoliceControllers.deletePolice); 
export const PoliceRoutes = router;