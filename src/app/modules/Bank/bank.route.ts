import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BankValidations } from './bank.validation';
import { BankControllers } from './bank.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// ১. নতুন ব্যাংক রেজিস্টার করার জন্য (সাথে ভ্যালিডেশন)
router.post(
    '/register',
    auth(['admin','superAdmin']),
    validateRequest(BankValidations.createBankValidationSchema),
    BankControllers.createBank
);

// ২. সকল ব্যাংকের তালিকা পাওয়ার জন্য
router.get(
    '/',
    BankControllers.getAllBanks
);

export const BankRoutes = router;