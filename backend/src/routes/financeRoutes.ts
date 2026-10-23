import { Router } from 'express';
import { FinanceController } from '../controllers/financeController.js';

const router = Router();

// POST /api/finance/calculate -> Calculate Thai flat-rate loan with 7% VAT
router.post('/calculate', FinanceController.calculate);

export default router;
