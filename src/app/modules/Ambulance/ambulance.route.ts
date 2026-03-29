
import { Router } from 'express';
import { AmbulanceController } from './ambulance.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', AmbulanceController.getAllAmbulances);

router.post('/add-ambulance', auth(['admin', 'superAdmin']), AmbulanceController.createAmbulance);

router.delete('/:id', auth(['admin', 'superAdmin']), AmbulanceController.deleteAmbulance);

export const AmbulanceRoutes = router;