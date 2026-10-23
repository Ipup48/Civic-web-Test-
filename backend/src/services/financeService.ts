import { LoanCalculationRequest, LoanCalculationResult } from '../types/index.js';

export class FinanceService {
  /**
   * Calculates Thai Auto Loan Monthly Installment using Flat-Rate Formula + 7% VAT.
   * 
   * Formula:
   * 1. Principal = Price - DownPayment
   * 2. Total Interest = Principal * (Rate / 100) * (Months / 12)
   * 3. Subtotal Monthly = (Principal + Total Interest) / Months
   * 4. Final Monthly = Subtotal Monthly * 1.07 (Thai VAT 7%)
   */
  public static calculateLoan(params: LoanCalculationRequest): LoanCalculationResult {
    const { price, downPayment, termMonths, annualRate } = params;

    if (price <= 0) {
      throw new Error('Car price must be greater than 0');
    }

    if (downPayment < 0 || downPayment >= price) {
      throw new Error('Down payment must be between 0 and car price');
    }

    if (![48, 60, 72, 84].includes(termMonths)) {
      throw new Error('Supported installment terms are 48, 60, 72, or 84 months');
    }

    if (annualRate < 0 || annualRate > 25) {
      throw new Error('Annual interest rate must be between 0% and 25%');
    }

    const principal = price - downPayment;
    const termYears = termMonths / 12;
    const totalInterest = Math.round(principal * (annualRate / 100) * termYears);
    const totalLoanWithInterest = principal + totalInterest;
    const monthlyBeforeVat = Math.round(totalLoanWithInterest / termMonths);
    const vat7Percent = Math.round(monthlyBeforeVat * 0.07);
    const finalMonthlyPayment = Math.round(monthlyBeforeVat * 1.07);
    const downPaymentPercent = Math.round((downPayment / price) * 100);

    return {
      price,
      downPayment,
      downPaymentPercent,
      principal,
      annualRate,
      termMonths,
      termYears,
      totalInterest,
      monthlyBeforeVat,
      vat7Percent,
      finalMonthlyPayment,
    };
  }

  /**
   * Helper to estimate default 72-month installment with 15% down payment and 2.79% rate
   * Returns null if car is CASH_ONLY.
   */
  public static estimateDefaultMonthly(price: number, isCashOnly: boolean): number | null {
    if (isCashOnly || price <= 0) {
      return null;
    }
    const down = Math.round(price * 0.15); // 15% standard down
    const result = this.calculateLoan({
      price,
      downPayment: down,
      termMonths: 72,
      annualRate: 2.79,
    });
    return result.finalMonthlyPayment;
  }
}
