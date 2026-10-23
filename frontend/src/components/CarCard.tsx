'use client';

import React from 'react';
import { Car } from '../types';
import { Gauge, Cog, Calendar, CheckCircle2, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onOpenDetails: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onOpenDetails }) => {
  const isCashOnly = car.paymentType === 'CASH_ONLY';

  return (
    <div className="group flex flex-col bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 hover:-translate-y-1">
      {/* Photo Frame */}
      <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(car)}>
        <img
          src={car.images?.exterior || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80'}
          alt={car.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {/* Generation Badge */}
          <span className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase bg-neutral-950/90 text-white border border-neutral-700 backdrop-blur-md shadow-lg">
            Civic {car.gen}
          </span>

          {/* Condition Style Badge */}
          <span
            className={`px-2 py-1 rounded-md text-[11px] font-semibold backdrop-blur-md shadow-md ${
              car.conditionStyle === 'TUNED'
                ? 'bg-red-600/90 text-white'
                : 'bg-neutral-800/90 text-neutral-200 border border-neutral-700'
            }`}
          >
            {car.conditionStyle === 'TUNED' ? 'แต่งสปอร์ต' : 'เดิมโรงงาน OEM'}
          </span>
        </div>

        {/* Payment Type Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          {isCashOnly ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-neutral-950 shadow-lg">
              <AlertTriangle className="w-3.5 h-3.5" />
              ขายสดเท่านั้น (Cash Only)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
              จัดไฟแนนซ์ได้
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            <Shield className="w-3 h-3 text-red-400" /> ตรวจ 175 จุด
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
          {car.title}
        </h4>

        {/* Engine Code & Color */}
        <div className="text-xs text-neutral-400 mt-1 flex items-center justify-between">
          <span className="font-mono text-neutral-300">{car.engineCode}</span>
          <span className="text-neutral-500">{car.color}</span>
        </div>

        {/* Key Specs Pills */}
        <div className="grid grid-cols-3 gap-2 my-3 py-2 border-y border-neutral-800/80 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>ปี {car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span>{car.mileage.toLocaleString()} กม.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cog className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="truncate">{car.transmission.split(' ')[0]}</span>
          </div>
        </div>

        {/* Price & Monthly Estimate */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-400">ราคาจำหน่าย</span>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ฿{car.price.toLocaleString()}
            </span>
          </div>

          {/* Conditional Financing View */}
          <div className="mt-1.5 min-h-[28px] flex items-center">
            {isCashOnly ? (
              <div className="w-full text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5">
                <span>⚡ ตัดสดเท่านั้น เล่มพร้อมโอนทันที</span>
              </div>
            ) : (
              <div className="w-full text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md flex items-center justify-between">
                <span>ผ่อนเริ่มต้น (72 งวด):</span>
                <span className="font-bold">
                  ~฿{car.estimatedMonthlyPayment?.toLocaleString() || '---'}/ด.
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => onOpenDetails(car)}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-800 hover:bg-red-600 text-white transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-red-900/30"
          >
            <span>ดูรายละเอียด & ผลตรวจสภาพ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
