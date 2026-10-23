import { Request, Response } from 'express';
import { FinanceService } from '../services/financeService.js';

export class FinanceController {
  public static calculate(req: Request, res: Response) {
    try {
      const { price, downPayment, termMonths, annualRate } = req.body;

      if (!price || downPayment === undefined || !termMonths) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: price, downPayment, termMonths',
        });
      }

      const result = FinanceService.calculateLoan({
        price: Number(price),
        downPayment: Number(downPayment),
        termMonths: Number(termMonths) as 48 | 60 | 72 | 84,
        annualRate: annualRate !== undefined ? Number(annualRate) : 2.79,
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Loan calculation failed',
      });
    }
  }
}
