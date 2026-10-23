import { LoanCalculationResult } from '../types/car';

/**
 * Thailand Used Car Flat-Rate Loan Calculation
 * 
 * Formula:
 * 1. Loan Principal = Car Price - Down Payment
 * 2. Total Interest = Loan Principal * (Annual Rate / 100) * Number of Years
 * 3. Total Amount = Loan Principal + Total Interest
 * 4. Monthly Pre-VAT = Total Amount / Total Months (48, 60, 72, 84)
 * 5. Actual Monthly Installment = Monthly Pre-VAT * 1.07 (Include 7% VAT)
 */
export function calculateThaiAutoLoan(
  carPrice: number,
  downPaymentThb: number,
  annualInterestRate: number, // e.g. 2.79 or 3.25
  loanTermMonths: number // 48, 60, 72, 84
): LoanCalculationResult {
  const safeDown = Math.max(0, Math.min(downPaymentThb, carPrice));
  const loanPrincipal = Math.max(0, carPrice - safeDown);
  const downPaymentPercent = carPrice > 0 ? (safeDown / carPrice) * 100 : 0;
  const loanTermYears = loanTermMonths / 12;

  // Total Interest for the entire period
  const totalInterestThb = loanPrincipal * (annualInterestRate / 100) * loanTermYears;
  
  // Total Amount before VAT
  const totalAmountPreVat = loanPrincipal + totalInterestThb;

  // Monthly installment before VAT
  const monthlyPreVat = loanTermMonths > 0 ? totalAmountPreVat / loanTermMonths : 0;

  // Actual monthly installment including 7% Thai VAT
  const actualMonthlyWithVat = monthlyPreVat * 1.07;
  const vatAmountMonthly = actualMonthlyWithVat - monthlyPreVat;
  const totalVatThb = vatAmountMonthly * loanTermMonths;
  const totalPayoffThb = actualMonthlyWithVat * loanTermMonths + safeDown;

  // Thai banks typically recommend buyer salary should be at least 2.0x to 2.5x of the monthly payment
  const minRecommendedSalaryThb = Math.round(actualMonthlyWithVat * 2.2);

  return {
    carPrice,
    downPaymentThb: safeDown,
    downPaymentPercent,
    loanPrincipal,
    annualInterestRate,
    loanTermMonths,
    loanTermYears,
    totalInterestThb,
    totalAmountPreVat,
    monthlyPreVat,
    actualMonthlyWithVat,
    vatAmountMonthly,
    totalVatThb,
    totalPayoffThb,
    minRecommendedSalaryThb,
  };
}

/**
 * Format currency in Thai Baht style (e.g. ฿659,000 or 659,000 บาท)
 */
export function formatCurrency(amount: number, includeSymbol = true): string {
  const formatted = Math.round(amount).toLocaleString('th-TH');
  return includeSymbol ? `฿${formatted}` : formatted;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return Math.round(num).toLocaleString('th-TH');
}

/**
 * Format date to Thai date string
 */
export function formatThaiDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
