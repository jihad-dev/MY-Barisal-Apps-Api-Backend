import express from 'express';
import validateRequest from '../../middlewares/validateRequest'; // পাথ আপনার ফোল্ডার অনুযায়ী দিন
import { PharmacyControllers } from './pharmacy.controller';
import { PharmacyValidations } from './pharmacy.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// এখানে মিডলওয়্যারটি কন্ট্রোলারের আগে কাজ করবে
router.post(
    '/create-pharmacy',
    auth(['admin', 'superAdmin']),
    validateRequest(PharmacyValidations.createPharmacyValidationSchema),
    PharmacyControllers.createPharmacy
);

router.get('/', PharmacyControllers.getAllPharmacies);

export const PharmacyRoutes = router;