'use client';

import React from 'react';
import { Generation } from '../types';

interface GenerationTabsProps {
  selectedGen: Generation | 'ALL';
  onSelectGen: (gen: Generation | 'ALL') => void;
}

const GEN_INFO = [
  { id: 'ALL', label: 'ทั้งหมด (All Models)', years: 'FD • FB • FC • FK • FE' },
  { id: 'FD', label: 'Civic FD', years: '2005 - 2012', desc: 'นางฟ้า / Double Wishbone' },
  { id: 'FB', label: 'Civic FB', years: '2012 - 2016', desc: 'Econ Mode / i-VTEC' },
  { id: 'FC', label: 'Civic FC', years: '2016 - 2021', desc: 'Sedan Fastback / VTEC TURBO' },
  { id: 'FK', label: 'Civic FK', years: '2017 - 2021', desc: '5-Door Hatchback / ท่อคู่กลาง' },
  { id: 'FE', label: 'Civic FE', years: '2021 - ปัจจุบัน', desc: 'Honda SENSING / e:HEV' },
];

export const GenerationTabs: React.FC<GenerationTabsProps> = ({ selectedGen, onSelectGen }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
          เลือกดูตามรหัสตัวถัง (Select by Generation)
        </h3>
        <span className="text-xs text-neutral-500 hidden sm:inline-block">คลิก 1 ครั้งเพื่อกรองข้อมูล</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {GEN_INFO.map((item) => {
          const isActive = selectedGen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectGen(item.id as Generation | 'ALL')}
              className={`relative text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 border-red-600 shadow-lg shadow-red-900/20 ring-1 ring-red-600'
                  : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-black tracking-tight text-base ${
                    isActive ? 'text-red-500' : 'text-neutral-200'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                )}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">{item.years}</div>
              {item.desc && (
                <div className="text-[10px] text-neutral-500 mt-1 truncate">{item.desc}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
