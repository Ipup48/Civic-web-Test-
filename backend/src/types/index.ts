export type Generation = 'FD' | 'FB' | 'FC' | 'FK' | 'FE';
export type PaymentType = 'FINANCE' | 'CASH_ONLY';
export type CarStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';
export type ConditionStyle = 'STOCK' | 'TUNED';

export interface CarImages {
  exterior: string;
  interior: string;
  engine: string;
  extra: string;
}

export interface CarSpecs {
  exteriorDesc: string;
  interiorDesc: string;
  engineDesc: string;
  chassisGuarantee: string;
}

export interface Car {
  id: string;
  slug: string;
  title: string;
  gen: Generation;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  engineCode: string;
  color: string;
  paymentType: PaymentType;
  status: CarStatus;
  conditionStyle: ConditionStyle;
  cashOnlyReason?: string | null;
  images?: CarImages;
  specs?: CarSpecs;
  estimatedMonthlyPayment?: number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CarFilterQuery {
  gen?: Generation;
  paymentType?: PaymentType;
  conditionStyle?: ConditionStyle;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface LoanCalculationRequest {
  price: number;
  downPayment: number;
  termMonths: 48 | 60 | 72 | 84;
  annualRate: number; // e.g. 2.79%
}

export interface LoanCalculationResult {
  price: number;
  downPayment: number;
  downPaymentPercent: number;
  principal: number;
  annualRate: number;
  termMonths: number;
  termYears: number;
  totalInterest: number;
  monthlyBeforeVat: number;
  vat7Percent: number;
  finalMonthlyPayment: number;
}

export interface CreateLeadRequest {
  carId?: string;
  customerName: string;
  phone: string;
  lineId?: string;
  financingOption?: PaymentType;
  note?: string;
}
