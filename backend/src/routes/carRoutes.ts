import { Router } from 'express';
import { CarController } from '../controllers/carController.js';

const router = Router();

// GET /api/cars -> List cars with filtering by gen, paymentType, search
router.get('/', CarController.getCars);

// GET /api/cars/:slug -> Get car details by slug
router.get('/:slug', CarController.getCarBySlug);

export default router;
