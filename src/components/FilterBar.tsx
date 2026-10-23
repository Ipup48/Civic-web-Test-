import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sparkles, Filter } from 'lucide-react';
import { CivicGeneration, EngineType, ConditionStyle } from '../types/car';

interface FilterBarProps {
  selectedGen: CivicGeneration | 'ALL';
  onSelectGen: (gen: CivicGeneration | 'ALL') => void;
  selectedEngine: EngineType | 'ALL';
  onSelectEngine: (engine: EngineType | 'ALL') => void;
  selectedCondition: ConditionStyle | 'ALL';
  onSelectCondition: (cond: ConditionStyle | 'ALL') => void;
  budgetRange: 'ALL' | 'UNDER_400K' | '400K_600K' | '600K_800K' | 'OVER_800K';
  onSelectBudget: (budget: 'ALL' | 'UNDER_400K' | '400K_600K' | '600K_800K' | 'OVER_800K') => void;
  sortBy: 'PRICE_ASC' | 'PRICE_DESC' | 'YEAR_DESC' | 'MILEAGE_ASC';
  onSelectSort: (sort: 'PRICE_ASC' | 'PRICE_DESC' | 'YEAR_DESC' | 'MILEAGE_ASC') => void;
  carCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedGen,
  onSelectGen,
  selectedEngine,
  onSelectEngine,
  selectedCondition,
  onSelectCondition,
  budgetRange,
  onSelectBudget,
  sortBy,
  onSelectSort,
  carCount,
  totalCount,
  onResetFilters,
}) => {
  const genTabs: { code: CivicGeneration | 'ALL'; label: string; period?: string }[] = [
    { code: 'ALL', label: 'ทั้งหมด (All)' },
    { code: 'FD', label: 'FD', period: '2005-2012' },
    { code: 'FB', label: 'FB', period: '2012-2016' },
    { code: 'FC', label: 'FC Sedan', period: '2016-2021' },
    { code: 'FK', label: 'FK Hatchback', period: '2017-2021' },
    { code: 'FE', label: 'FE', period: '2021-Present' },
  ];

  const engineOptions: { value: EngineType | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'ทุกประเภทเครื่องยนต์' },
    { value: '1.5_TURBO', label: '1.5 VTEC TURBO' },
    { value: 'E_HEV', label: 'e:HEV Full Hybrid' },
    { value: '1.8_NA', label: '1.8 i-VTEC (NA)' },
    { value: '2.0_NA', label: '2.0 i-VTEC (K20/R20)' },
  ];

  const budgetOptions: { value: 'ALL' | 'UNDER_400K' | '400K_600K' | '600K_800K' | 'OVER_800K'; label: string }[] = [
    { value: 'ALL', label: 'ทุกช่วงราคา' },
    { value: 'UNDER_400K', label: 'ต่ำกว่า 400,000 ฿' },
    { value: '400K_600K', label: '400,000 - 600,000 ฿' },
    { value: '600K_800K', label: '600,000 - 800,000 ฿' },
    { value: 'OVER_800K', label: '800,000 ฿ ขึ้นไป' },
  ];

  const hasActiveFilters =
    selectedGen !== 'ALL' ||
    selectedEngine !== 'ALL' ||
    selectedCondition !== 'ALL' ||
    budgetRange !== 'ALL';

  return (
    <div id="inventory-section" className="bg-[#0f121a] border-y border-slate-800/80 sticky top-18 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Row 1: Generation Primary Tabs */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {genTabs.map((tab) => {
              const active = selectedGen === tab.code;
              return (
                <button
                  key={tab.code}
                  onClick={() => onSelectGen(tab.code)}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-red-600 text-white shadow-md shadow-red-950/60 ring-1 ring-red-400/40'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.period && (
                    <span className={`text-[11px] font-normal ${active ? 'text-red-100' : 'text-slate-400'}`}>
                      {tab.period}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result counter & reset */}
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="text-slate-400">
              พบ <strong className="text-white font-mono text-sm">{carCount}</strong> จาก {totalCount} คัน
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ต</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Filters & Sort Controls */}
        <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Condition Toggle (All vs 100% Stock vs Street Tuned) */}
            <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => onSelectCondition('ALL')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedCondition === 'ALL'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ทุกสภาพ
              </button>
              <button
                onClick={() => onSelectCondition('STOCK')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedCondition === 'STOCK'
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                100% Stock OEM
              </button>
              <button
                onClick={() => onSelectCondition('TUNED')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  selectedCondition === 'TUNED'
                    ? 'bg-red-950/70 text-red-300 border border-red-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3 text-red-400" />
                <span>Street Tuned</span>
              </button>
            </div>

            {/* Engine Selector */}
            <select
              value={selectedEngine}
              onChange={(e) => onSelectEngine(e.target.value as EngineType | 'ALL')}
              className="bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {engineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Budget Selector */}
            <select
              value={budgetRange}
              onChange={(e) =>
                onSelectBudget(
                  e.target.value as 'ALL' | 'UNDER_400K' | '400K_600K' | '600K_800K' | 'OVER_800K'
                )
              }
              className="bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">เรียงลำดับ:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                onSelectSort(
                  e.target.value as 'PRICE_ASC' | 'PRICE_DESC' | 'YEAR_DESC' | 'MILEAGE_ASC'
                )
              }
              className="bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer font-medium"
            >
              <option value="PRICE_ASC">ราคา: ต่ำไปสูง</option>
              <option value="PRICE_DESC">ราคา: สูงไปต่ำ</option>
              <option value="YEAR_DESC">ปีจดทะเบียน: ใหม่สุด</option>
              <option value="MILEAGE_ASC">เลขไมล์: น้อยที่สุด</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
