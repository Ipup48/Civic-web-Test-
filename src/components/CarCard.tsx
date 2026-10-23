import React, { useState } from 'react';
import { Gauge, Calendar, Cog, Zap, CheckCircle2, ChevronRight, Calculator, Eye, ShieldCheck } from 'lucide-react';
import { CivicCar } from '../types/car';
import { formatCurrency, formatNumber, calculateThaiAutoLoan } from '../utils/calculator';
import { CarSilhouette } from './CarSilhouette';

interface CarCardProps {
  car: CivicCar;
  onViewDetails: (car: CivicCar) => void;
  onCalculateFinance: (car: CivicCar) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onViewDetails,
  onCalculateFinance,
}) => {
  const [imageError, setImageError] = useState(false);

  // Default calculation: 10% down, 84 months, 3.25% interest (standard for Thai used car)
  const defaultDown = Math.round(car.priceThb * (car.recommendedDownPercent / 100));
  const loanEstimate = calculateThaiAutoLoan(car.priceThb, defaultDown, 3.25, 84);

  return (
    <div className="group rounded-2xl bg-[#141721] border border-slate-800/90 hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col overflow-hidden relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d1017]">
        {!imageError ? (
          <img
            src={car.images.hero}
            alt={car.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <CarSilhouette generation={car.generation} className="w-full h-full" />
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141721] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {/* Generation Code Badge */}
            <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white font-heading font-black text-xs border border-white/10 tracking-wider">
              CIVIC {car.generation}
            </span>

            {/* Condition Tag */}
            {car.conditionStyle === 'TUNED' ? (
              <span className="px-2 py-1 rounded bg-red-950/90 backdrop-blur-md text-red-300 font-semibold text-[11px] border border-red-500/40">
                Street Tuned
              </span>
            ) : (
              <span className="px-2 py-1 rounded bg-emerald-950/90 backdrop-blur-md text-emerald-300 font-semibold text-[11px] border border-emerald-500/40">
                100% Stock OEM
              </span>
            )}
          </div>

          {/* Status Badge */}
          {car.status === 'AVAILABLE' ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-medium backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>พร้อมส่งมอบ</span>
            </span>
          ) : car.status === 'RESERVED' ? (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[11px] font-medium backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>ติดจองแล้ว</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-500/20 border border-slate-500/40 text-slate-400 text-[11px] font-medium backdrop-blur-md">
              ขายแล้ว
            </span>
          )}
        </div>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
          <span className="flex items-center gap-1 font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ตรวจเช็ก 175 จุด ผ่าน A+</span>
          </span>
          <span className="font-mono text-xs text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            รหัส {car.specs.chassisCode}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Title */}
          <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {car.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {car.subTitleTh}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-y border-slate-800/80 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>ปี ค.ศ.</span>
              </span>
              <span className="font-mono font-semibold text-slate-200 mt-0.5">
                {car.year}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Gauge className="w-3 h-3 text-slate-400" />
                <span>เลขไมล์แท้</span>
              </span>
              <span className="font-mono font-semibold text-slate-200 mt-0.5">
                {formatNumber(car.mileageKm)} กม.
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Zap className="w-3 h-3 text-slate-400" />
                <span>พละกำลัง</span>
              </span>
              <span className="font-mono font-semibold text-slate-200 mt-0.5">
                {car.specs.maxPowerHp} HP
              </span>
            </div>
          </div>

          {/* Key Mods Teaser */}
          {car.keyMods && car.keyMods.length > 0 && (
            <div className="mt-3">
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>จุดเด่นประจำคัน:</span>
                <span className="text-[10px] text-red-400 font-mono">
                  {car.keyMods.length} รายการ
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {car.keyMods.slice(0, 3).map((mod, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    {mod}
                  </span>
                ))}
                {car.keyMods.length > 3 && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400">
                    +{car.keyMods.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-5 pt-4 border-t border-slate-800/90">
          
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-[11px] text-slate-400">ราคาเงินสดพิเศษ</div>
              <div className="text-2xl font-black font-heading text-white tracking-tight">
                {formatCurrency(car.priceThb)}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-slate-400">ผ่อนเริ่มต้น 84 ด.</div>
              <div className="text-sm font-bold font-mono text-red-400">
                ~{formatCurrency(loanEstimate.actualMonthlyWithVat)}/ด.*
              </div>
              <div className="text-[10px] text-slate-400">รวม VAT 7% แล้ว</div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(car)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700/60"
            >
              <Eye className="w-3.5 h-3.5 text-slate-300" />
              <span>ดูรายละเอียด</span>
            </button>

            <button
              onClick={() => onCalculateFinance(car)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-950/40 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>คำนวณค่างวด</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
