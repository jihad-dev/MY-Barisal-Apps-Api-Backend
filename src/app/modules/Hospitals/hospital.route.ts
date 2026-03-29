
import { Router } from 'express';
import { HospitalController } from './hospital.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', HospitalController.getAllHospitals);
router.get('/:id', HospitalController.getSingleHospital);
router.post('/create-hospital', auth(['admin', 'superAdmin']), HospitalController.createHospital);
router.patch('/:id', auth(['admin', 'superAdmin']), HospitalController.updateHospital);
router.delete('/:id', auth(['admin', 'superAdmin']), HospitalController.deleteHospital);

export const HospitalRoutes = router;