'use client';

import React from 'react';
import { ShieldCheck, Award, Wrench, Search } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
      {/* Background Accent Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-xs font-bold text-red-400 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            ศูนย์รวมฮอนด้าซีวิคมือสองอันดับ 1 ของเมืองไทย
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            THE SPECIALIST IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600">
              HONDA CIVIC FD TO FE
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            คัดเฉพาะรถบ้านสภาพนางฟ้าและรถแต่งสปอร์ตเกรดพรีเมียม แยกหมวดหมู่ชัดเจนระหว่าง{' '}
            <span className="text-emerald-400 font-semibold">จัดไฟแนนซ์ได้ (มีตารางผ่อน)</span> กับ{' '}
            <span className="text-amber-400 font-semibold">ขายสดเท่านั้น (ตัดสดเล่มพร้อมโอน)</span> พร้อมรายงานตรวจโครงสร้าง 175 จุด
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex items-center max-w-lg bg-neutral-900/90 border border-neutral-700/80 rounded-2xl p-1.5 shadow-2xl focus-within:border-red-600 transition-colors">
            <Search className="w-5 h-5 text-neutral-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="ค้นหารุ่นย่อย เช่น 1.5 Turbo RS, Mugen, Modulo, K20, สีเทาโซนิค..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-red-950/70 border border-red-800/60 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">ตรวจโครงสร้าง 175 จุด</div>
              <div className="text-[11px] text-neutral-400">การันตีไม่มีชนหนัก พลิกคว่ำ จมน้ำ</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">วารันตีเครื่อง + เกียร์ 1 ปี</div>
              <div className="text-[11px] text-neutral-400">ดูแลหลังการขายโดยทีมช่างฮอนด้า</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-800/60 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">สเปกไทยแท้ตรงรุ่น 100%</div>
              <div className="text-[11px] text-neutral-400">ตรวจสอบประวัติศูนย์และเล่มทะเบียนจริง</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
