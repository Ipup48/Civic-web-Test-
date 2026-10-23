export type CivicGeneration = 'FD' | 'FB' | 'FC' | 'FK' | 'FE';

export type EngineType = '1.8_NA' | '2.0_NA' | '1.5_TURBO' | 'E_HEV';

export type ConditionStyle = 'STOCK' | 'TUNED';

export type CarStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export interface CarSpecs {
  chassisCode: string; // e.g. "FD1", "FK7", "FE1"
  engineCode: string;  // e.g. "R18A1", "L15B7", "L15BG"
  displacementCc: number; // e.g. 1799, 1498, 1993
  maxPowerHp: number; // e.g. 140, 173, 178, 184
  maxTorqueNm: number; // e.g. 174, 220, 240, 315
  transmission: string; // e.g. "Automatic 5-Speed", "CVT with Paddle Shift", "E-CVT"
  drivetrain: string; // "Front-Wheel Drive (FWD)"
  fuelSupport: string; // "Gasoline 95 / Gasohol 91, 95, E20, E85"
  registrationYear: number;
  taxValidUntil: string;
  previousOwners: number;
  serviceBooklet: boolean;
  spareKeys: number;
}

export interface ModificationItem {
  category: 'Engine/Exhaust' | 'Suspension/Handling' | 'Wheels/Brakes' | 'Exterior/Aero' | 'Interior/Electronics';
  name: string;
  isAuthentic: boolean;
  notes?: string;
}

export interface InspectionChecklist {
  score: number; // e.g. 175
  totalPoints: number; // 175
  inspectorName: string;
  inspectionDate: string;
  frameStructurePassed: boolean;
  engineGearboxPassed: boolean;
  suspensionBrakesPassed: boolean;
  electricalPassed: boolean;
  floodFreeGuaranteed: boolean;
  fireFreeGuaranteed: boolean;
  odometerVerified: boolean;
  notes: string[];
}

export interface CivicCar {
  id: string;
  title: string;
  subTitleTh: string;
  generation: CivicGeneration;
  subModel: string;
  year: number;
  mileageKm: number;
  exteriorColor: string;
  interiorColor: string;
  priceThb: number;
  recommendedDownPercent: number; // e.g. 10 or 15
  conditionStyle: ConditionStyle;
  engineType: EngineType;
  status: CarStatus;
  keyMods: string[];
  allMods?: ModificationItem[];
  specs: CarSpecs;
  inspection: InspectionChecklist;
  images: {
    hero: string;
    gallery: string[];
  };
  highlights: string[];
}

export interface LoanCalculationResult {
  carPrice: number;
  downPaymentThb: number;
  downPaymentPercent: number;
  loanPrincipal: number;
  annualInterestRate: number;
  loanTermMonths: number;
  loanTermYears: number;
  totalInterestThb: number;
  totalAmountPreVat: number;
  monthlyPreVat: number;
  actualMonthlyWithVat: number;
  vatAmountMonthly: number;
  totalVatThb: number;
  totalPayoffThb: number;
  minRecommendedSalaryThb: number;
}

export interface TestDriveBookingRequest {
  id: string;
  carId: string;
  carTitle: string;
  fullName: string;
  phone: string;
  lineId: string;
  date: string;
  timeSlot: string;
  preferredBranch: string;
  notes?: string;
  createdAt: string;
}

export interface TradeInRequest {
  currentBrand: string;
  currentModel: string;
  currentYear: number;
  currentMileage: number;
  conditionRating: 'Like New' | 'Good' | 'Fair';
  interestedCivicId: string;
  customerName: string;
  customerPhone: string;
  estimatedOfferMin: number;
  estimatedOfferMax: number;
}
