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
  createdAt?: string;
  updatedAt?: string;
}

export interface CarFilterParams {
  gen?: Generation | 'ALL';
  paymentType?: PaymentType | 'ALL';
  conditionStyle?: ConditionStyle | 'ALL';
  search?: string;
}

export interface LoanCalculationResponse {
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

export interface LeadSubmission {
  carId?: string;
  customerName: string;
  phone: string;
  lineId?: string;
  financingOption?: PaymentType;
  note?: string;
}
