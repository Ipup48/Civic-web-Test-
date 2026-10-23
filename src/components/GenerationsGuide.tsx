import React, { useState } from 'react';
import { Sparkles, ArrowRight, Gauge, Shield, Wrench, CheckCircle2 } from 'lucide-react';
import { GENERATIONS_INFO, GenerationInfo } from '../data/cars';
import { CivicGeneration } from '../types/car';
import { CarSilhouette } from './CarSilhouette';

interface GenerationsGuideProps {
  onSelectGeneration: (gen: CivicGeneration) => void;
}

export const GenerationsGuide: React.FC<GenerationsGuideProps> = ({
  onSelectGeneration,
}) => {
  const [activeCode, setActiveCode] = useState<string>('FK');

  const selectedGen = GENERATIONS_INFO.find((g) => g.code === activeCode) || GENERATIONS_INFO[3];

  return (
    <section id="generations-guide" className="py-16 lg:py-24 bg-[#0c0e15] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-red-500 font-mono">
                HONDA CIVIC HERITAGE & GUIDE
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">คู่มือเลือกรุ่นที่ใช่สำหรับคุณ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              เจาะลึก 5 เจเนอเรชันยอดนิยม <span className="text-red-500">FD · FB · FC · FK · FE</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-2">
              ทำไมเราถึงเชี่ยวชาญเฉพาะ 5 รุ่นนี้? เพราะนี่คือยุคทองแห่งเทคโนโลยี เครื่องยนต์ i-VTEC และ VTEC TURBO ที่คุ้มค่า ทนทาน และมีอะไหล่รองรับมากที่สุดในเมืองไทย
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-white font-bold block text-base font-heading">2005 - 2026</span>
              <span>20+ ปีแห่งความนิยม</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-red-400 font-bold block text-base font-heading">100% Support</span>
              <span>ศูนย์บริการ & ช่างเฉพาะทาง</span>
            </div>
          </div>
        </div>

        {/* Generation Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {GENERATIONS_INFO.map((gen) => {
            const isCurrent = gen.code === activeCode;
            return (
              <button
                key={gen.code}
                onClick={() => setActiveCode(gen.code)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-400/40'
                    : 'bg-[#131622] border-slate-800/90 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-lg font-black font-heading tracking-tight ${isCurrent ? 'text-red-400' : 'text-slate-200'}`}>
                    Civic {gen.code}
                  </span>
                  <span className="text-[10px] font-mono opacity-70">
                    {gen.period.split(' - ')[0]}
                  </span>
                </div>
                <div className="text-xs font-medium truncate">
                  {gen.iconTag}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {gen.bodyType}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of Selected Generation */}
        <div className="rounded-2xl bg-gradient-to-br from-[#151926] to-[#0f121a] border border-slate-700/80 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Vector Silhouette Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-xl bg-black">
                <CarSilhouette generation={selectedGen.code as CivicGeneration} className="w-full h-60" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>รหัสตัวถังหลัก (Chassis):</span>
                <span className="font-mono font-bold text-white">
                  {selectedGen.chassisCodes.join(', ')}
                </span>
              </div>
            </div>

            {/* Description & Specs Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-heading font-black text-sm">
                  {selectedGen.name}
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  ช่วงปีการผลิต: {selectedGen.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading leading-snug">
                {selectedGen.keyHighlightTh}
              </h3>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  เครื่องยนต์ & ระบบขับเคลื่อนที่เป็นไฮไลต์:
                </div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {selectedGen.engineHighlightsTh}
                </div>
              </div>

              {/* 3 Pillars for this Gen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-red-400 font-bold mb-1">ความนิยม & ของแต่ง</div>
                  <div className="text-slate-300">
                    ของแต่งแท้และเทียบตรงรุ่นเพียบ อัปเกรดง่ายทั้งบอดี้พาร์ทและเพอร์ฟอร์แมนซ์
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-red-400 font-bold mb-1">ความทนทาน & อะไหล่</div>
                  <div className="text-slate-300">
                    เครื่องยนต์เหนียว อะไหล่เบิกศูนย์หรือโออีเอ็มมีรองรับตลอด 15 ปีข้างหน้า
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="text-red-400 font-bold mb-1">ราคาขายต่อ (Resale)</div>
                  <div className="text-slate-300">
                    ราคาตลาดแข็งแกร่ง มีสภาพคล่องสูง ปล่อยต่อง่ายเมื่อต้องการอัปเกรดรุ่น
                  </div>
                </div>
              </div>

              {/* Jump to Filter Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    onSelectGeneration(selectedGen.code as CivicGeneration);
                    const el = document.getElementById('inventory-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-950/60 transition-all cursor-pointer"
                >
                  <span>ค้นหารถ Civic {selectedGen.code} ในสต็อกของเรา</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="text-xs text-slate-400">
                  มีรถเข้าใหม่ทุกสัปดาห์
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
