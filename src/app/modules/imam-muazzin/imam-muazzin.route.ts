// imam-muazzin.route.ts
import { Router } from 'express';
import { ImamMuazzinController } from './imam-muazzin.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Public
router.get('/', ImamMuazzinController.getAll);
router.get('/:id', ImamMuazzinController.getSingle);
router.patch('/:id/hired', ImamMuazzinController.markAsHired);
router.patch('/:id/available', ImamMuazzinController.markAsAvailable);

// Admin only
router.post('/create', auth(['admin','superAdmin']), ImamMuazzinController.create);
router.patch('/:id', auth(['admin','superAdmin']), ImamMuazzinController.update);
router.delete('/:id', auth(['admin','superAdmin']), ImamMuazzinController.remove);

export const ImamMuazzinRoutes = router;