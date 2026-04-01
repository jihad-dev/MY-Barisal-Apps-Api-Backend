import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DonorValidations } from './donor.validation';
import { DonorControllers } from './donor.controller';

const router = express.Router();

// ১. নতুন ডোনার রেজিস্ট্রেশন (ভ্যালিডেশনসহ)
router.post(
  '/register',
  validateRequest(DonorValidations.createDonorValidationSchema),
  DonorControllers.registerDonor
);

// ২. সকল ডোনারদের তালিকা দেখা (ফিল্টারিং লজিকসহ)
router.get(
  '/', 
  DonorControllers.getAllDonors
);



// ৪. ডোনারের তথ্য আপডেট করা
router.patch(
  '/:id',
  validateRequest(DonorValidations.updateDonorValidationSchema),
  DonorControllers.updateDonor
);


export const DonorRoutes = router;