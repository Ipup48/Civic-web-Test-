'use client';

import React from 'react';
import { PaymentType, ConditionStyle } from '../types';
import { Banknote, ShieldCheck, Zap } from 'lucide-react';

interface PaymentFilterProps {
  selectedPayment: PaymentType | 'ALL';
  onSelectPayment: (type: PaymentType | 'ALL') => void;
  selectedCondition: ConditionStyle | 'ALL';
  onSelectCondition: (style: ConditionStyle | 'ALL') => void;
}

export const PaymentFilter: React.FC<PaymentFilterProps> = ({
  selectedPayment,
  onSelectPayment,
  selectedCondition,
  onSelectCondition,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl backdrop-blur-md">
      {/* Financing Type Radio Group */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Banknote className="w-3.5 h-3.5 text-red-500" />
          ประเภทการชำระเงิน (Financing Type)
        </span>
        <div className="inline-flex rounded-xl p-1 bg-neutral-950 border border-neutral-800">
          <button
            onClick={() => onSelectPayment('ALL')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedPayment === 'ALL'
                ? 'bg-neutral-800 text-white font-semibold shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => onSelectPayment('FINANCE')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedPayment === 'FINANCE'
                ? 'bg-emerald-600/90 text-white font-semibold shadow-md shadow-emerald-950'
                : 'text-emerald-400/80 hover:text-emerald-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            จัดไฟแนนซ์ได้ (มีตารางผ่อน)
          </button>
          <button
            onClick={() => onSelectPayment('CASH_ONLY')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedPayment === 'CASH_ONLY'
                ? 'bg-amber-600 text-white font-semibold shadow-md shadow-amber-950'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-300" />
            ขายสดเท่านั้น (ตัดสด)
          </button>
        </div>
      </div>

      {/* Condition / Style Quick Toggle */}
      <div className="flex flex-col gap-1.5 sm:border-l sm:border-neutral-800 sm:pl-4">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          สไตล์สภาพรถ (Condition Style)
        </span>
        <div className="inline-flex rounded-xl p-1 bg-neutral-950 border border-neutral-800">
          <button
            onClick={() => onSelectCondition('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedCondition === 'ALL'
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ทุกสไตล์
          </button>
          <button
            onClick={() => onSelectCondition('STOCK')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedCondition === 'STOCK'
                ? 'bg-neutral-700 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            เดิมโรงงาน (OEM)
          </button>
          <button
            onClick={() => onSelectCondition('TUNED')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedCondition === 'TUNED'
                ? 'bg-red-700 text-white font-semibold'
                : 'text-red-400/80 hover:text-red-300'
            }`}
          >
            แต่งสปอร์ต / ซิ่ง
          </button>
        </div>
      </div>
    </div>
  );
};
