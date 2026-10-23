import React, { useState, useMemo } from 'react';
import { CIVIC_CARS } from './data/cars';
import { CivicCar, CivicGeneration, EngineType, ConditionStyle } from './types/car';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { LoanCalculatorModal } from './components/LoanCalculatorModal';
import { TestDriveModal } from './components/TestDriveModal';
import { TradeInModal } from './components/TradeInModal';
import { GenerationsGuide } from './components/GenerationsGuide';
import { InspectionSection } from './components/InspectionSection';
import { ShowroomSection } from './components/ShowroomSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { SearchX, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  // Filter States
  const [selectedGeneration, setSelectedGeneration] = useState<CivicGeneration | 'ALL'>('ALL');
  const [selectedEngine, setSelectedEngine] = useState<EngineType | 'ALL'>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<ConditionStyle | 'ALL'>('ALL');
  const [budgetRange, setBudgetRange] = useState<'ALL' | 'UNDER_400K' | '400K_600K' | '600K_800K' | 'OVER_800K'>('ALL');
  const [sortBy, setSortBy] = useState<'PRICE_ASC' | 'PRICE_DESC' | 'YEAR_DESC' | 'MILEAGE_ASC'>('PRICE_ASC');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeCarDetail, setActiveCarDetail] = useState<CivicCar | null>(null);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [loanModalCar, setLoanModalCar] = useState<CivicCar | null>(null);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveCar, setTestDriveCar] = useState<CivicCar | null>(null);
  const [tradeInModalOpen, setTradeInModalOpen] = useState(false);
  const [tradeInCar, setTradeInCar] = useState<CivicCar | null>(null);

  // Filter & Sort Logic
  const filteredCars = useMemo(() => {
    return CIVIC_CARS.filter((car) => {
      // Generation filter
      if (selectedGeneration !== 'ALL' && car.generation !== selectedGeneration) {
        return false;
      }

      // Engine Type filter
      if (selectedEngine !== 'ALL' && car.engineType !== selectedEngine) {
        return false;
      }

      // Condition Style filter
      if (selectedCondition !== 'ALL' && car.conditionStyle !== selectedCondition) {
        return false;
      }

      // Budget filter
      if (budgetRange === 'UNDER_400K' && car.priceThb >= 400000) return false;
      if (budgetRange === '400K_600K' && (car.priceThb < 400000 || car.priceThb > 600000)) return false;
      if (budgetRange === '600K_800K' && (car.priceThb < 600000 || car.priceThb > 800000)) return false;
      if (budgetRange === 'OVER_800K' && car.priceThb <= 800000) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = car.title.toLowerCase().includes(query);
        const matchesSubTitle = car.subTitleTh.toLowerCase().includes(query);
        const matchesGen = car.generation.toLowerCase().includes(query);
        const matchesColor = car.exteriorColor.toLowerCase().includes(query);
        const matchesChassis = car.specs.chassisCode.toLowerCase().includes(query);
        const matchesMods = car.keyMods.some((m) => m.toLowerCase().includes(query));
        const matchesYear = car.year.toString().includes(query);

        if (!matchesTitle && !matchesSubTitle && !matchesGen && !matchesColor && !matchesChassis && !matchesMods && !matchesYear) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.priceThb - b.priceThb;
      if (sortBy === 'PRICE_DESC') return b.priceThb - a.priceThb;
      if (sortBy === 'YEAR_DESC') return b.year - a.year;
      if (sortBy === 'MILEAGE_ASC') return a.mileageKm - b.mileageKm;
      return 0;
    });
  }, [selectedGeneration, selectedEngine, selectedCondition, budgetRange, sortBy, searchQuery]);

  // Handlers
  const handleResetFilters = () => {
    setSelectedGeneration('ALL');
    setSelectedEngine('ALL');
    setSelectedCondition('ALL');
    setBudgetRange('ALL');
    setSortBy('PRICE_ASC');
    setSearchQuery('');
  };

  const handleOpenLoanCalculator = (car?: CivicCar | null) => {
    setLoanModalCar(car || null);
    setLoanModalOpen(true);
  };

  const handleOpenTestDrive = (car?: CivicCar | null) => {
    setTestDriveCar(car || null);
    setTestDriveModalOpen(true);
  };

  const handleOpenTradeIn = (car?: CivicCar | null) => {
    setTradeInCar(car || null);
    setTradeInModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenLoanModal={() => handleOpenLoanCalculator(null)}
        onOpenTestDriveModal={() => handleOpenTestDrive(null)}
        onSelectGeneration={(gen) => setSelectedGeneration(gen as CivicGeneration)}
      />

      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero
          onSelectGeneration={(gen) => {
            setSelectedGeneration(gen);
            const el = document.getElementById('inventory-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          selectedGeneration={selectedGeneration}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* 3. Fast-Filter Bar (Sticky) */}
        <FilterBar
          selectedGen={selectedGeneration}
          onSelectGen={setSelectedGeneration}
          selectedEngine={selectedEngine}
          onSelectEngine={setSelectedEngine}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
          budgetRange={budgetRange}
          onSelectBudget={setBudgetRange}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          carCount={filteredCars.length}
          totalCount={CIVIC_CARS.length}
          onResetFilters={handleResetFilters}
        />

        {/* 4. Car Inventory Grid */}
        <div className="py-12 bg-[#0c0e14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {selectedGeneration === 'ALL'
                      ? 'รถยนต์ Honda Civic พร้อมส่งมอบทั้งหมด'
                      : `สต็อกรถยนต์ Honda Civic เจเนอเรชัน ${selectedGeneration}`}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  รถทุกคันผ่านการตรวจเช็ก 175 จุด การันตีตัวถังเดิม 100% ไมล์แท้ และพร้อมทดลองขับ
                </p>
              </div>

              {/* Quick filter summary chips */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>แสดงผล: <strong className="text-white font-mono">{filteredCars.length}</strong> คัน</span>
                {selectedCondition !== 'ALL' && (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {selectedCondition === 'STOCK' ? '100% Stock' : 'Street Tuned'}
                  </span>
                )}
              </div>
            </div>

            {/* Cars Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={(c) => setActiveCarDetail(c)}
                    onCalculateFinance={(c) => handleOpenLoanCalculator(c)}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="py-16 text-center space-y-4 rounded-2xl bg-[#131622] border border-slate-800 max-w-xl mx-auto p-8">
                <SearchX className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white font-heading">
                  ไม่พบรถที่ตรงกับเงื่อนไขการค้นหา
                </h3>
                <p className="text-xs text-slate-400">
                  ลองปรับเปลี่ยนตัวกรอง หรือค้นหาคำอื่น เช่น FD, FC, RS, สีขาว, 1.5 Turbo ฯลฯ
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>รีเซ็ตตัวกรองทั้งหมด</span>
                </button>
              </div>
            )}

            {/* Bottom banner for personalized sourcing */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-red-950/30 via-slate-900 to-[#121520] border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    หาสเปก Civic สี หรือรุ่นย่อยที่ต้องการไม่เจอ?
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Civic Hub มีเครือข่ายสรรหารถ Civic สภาพคัดเกรด A+ ตามสเปกที่คุณต้องการโดยตรง
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-md shadow-red-950/60"
                >
                  แจ้งสเปกที่ตามหาทาง LINE
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Generations Enthusiast & Buyer Guide */}
        <GenerationsGuide
          onSelectGeneration={(gen) => {
            setSelectedGeneration(gen);
            const el = document.getElementById('inventory-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. 175-Point Certified Inspection & Warranty Standards */}
        <InspectionSection />

        {/* 7. Showroom Location & Contact */}
        <ShowroomSection />

      </main>

      {/* 8. Footer */}
      <Footer
        onSelectGeneration={(gen) => {
          setSelectedGeneration(gen);
          const el = document.getElementById('inventory-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLoanModal={() => handleOpenLoanCalculator(null)}
        onOpenTestDriveModal={() => handleOpenTestDrive(null)}
      />

      {/* Floating Action Buttons */}
      <FloatingActions
        onOpenLoanModal={() => handleOpenLoanCalculator(null)}
        onOpenTestDriveModal={() => handleOpenTestDrive(null)}
      />

      {/* Car Detail Modal */}
      <CarDetailModal
        car={activeCarDetail}
        onClose={() => setActiveCarDetail(null)}
        onOpenTestDrive={(car) => handleOpenTestDrive(car)}
        onOpenLoanCalculator={(car) => handleOpenLoanCalculator(car)}
        onOpenTradeIn={(car) => handleOpenTradeIn(car)}
      />

      {/* Loan Calculator Modal */}
      <LoanCalculatorModal
        isOpen={loanModalOpen}
        onClose={() => setLoanModalOpen(false)}
        initialCar={loanModalCar}
        allCars={CIVIC_CARS}
        onOpenTestDrive={(car) => handleOpenTestDrive(car)}
      />

      {/* Test Drive Booking Modal */}
      <TestDriveModal
        isOpen={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        selectedCar={testDriveCar}
        allCars={CIVIC_CARS}
      />

      {/* Trade-In Appraisal Modal */}
      <TradeInModal
        isOpen={tradeInModalOpen}
        onClose={() => setTradeInModalOpen(false)}
        targetCar={tradeInCar}
        allCars={CIVIC_CARS}
      />

    </div>
  );
}
