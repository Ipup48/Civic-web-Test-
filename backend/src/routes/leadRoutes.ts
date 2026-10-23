import { Router } from 'express';
import { LeadController } from '../controllers/leadController.js';

const router = Router();

// POST /api/leads -> Create inquiry / booking test drive
router.post('/', LeadController.createLead);

export default router;
