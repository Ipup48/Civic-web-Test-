import React from 'react';
import { ShieldCheck, Award, Wrench, Clock, Search, ChevronRight, Gauge, CheckCircle2 } from 'lucide-react';
import { CivicGeneration } from '../types/car';

interface HeroProps {
  onSelectGeneration: (gen: CivicGeneration | 'ALL') => void;
  selectedGeneration: CivicGeneration | 'ALL';
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectGeneration,
  selectedGeneration,
  onSearchChange,
  searchQuery,
}) => {
  const genButtons: { gen: CivicGeneration; label: string; period: string; subtitle: string }[] = [
    { gen: 'FD', label: 'Civic FD', period: '2005-2012', subtitle: 'ฉายานางฟ้า 1.8 / 2.0 K20' },
    { gen: 'FB', label: 'Civic FB', period: '2012-2016', subtitle: 'ECON Mode ทนทาน คุ้มค่า' },
    { gen: 'FC', label: 'Civic FC', period: '2016-2021', subtitle: 'Sedan Fastback 1.5 Turbo' },
    { gen: 'FK', label: 'Civic FK', period: '2017-2021', subtitle: '5-Door Hatchback ยอดฮิต' },
    { gen: 'FE', label: 'Civic FE', period: '2021-ปัจจุบัน', subtitle: '178 HP Turbo & e:HEV RS' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b0d13] via-[#10141d] to-[#0d1017] pt-10 pb-16 lg:py-20 border-b border-slate-800/80">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-10 w-80 h-80 bg-red-800/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Kicker Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase font-bold tracking-widest text-red-500 font-mono">
            SPECIALIZED DEALERSHIP & COMMUNITY
          </span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-xs text-slate-400 font-medium">
            กรุงเทพฯ - ถนนกาญจนาภิเษก
          </span>
        </div>

        {/* Hero Main Headline Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight" style={{ textWrap: 'balance' }}>
              The Specialist in <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-red-400">
                Honda Civic
              </span>{' '}
              <span className="text-red-500">FD to FE</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              โชว์รูมแห่งเดียวในไทยที่คัดเฉพาะ <span className="text-white font-medium">Honda Civic 5 เจเนอเรชันยอดนิยม</span> ตรวจสอบสภาพเข้มงวด 175 จุด การันตีไมล์แท้ 100% โครงสร้างเดิมสนิท ไร้ชนหนัก ไร้น้ำท่วม พร้อมวารันตีเครื่องยนต์และเกียร์ 1 ปีเต็ม
            </p>

            {/* Trust Badges Strip (4 Pillars) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white leading-snug">ตรวจสภาพ 175 จุด</div>
                  <div className="text-[11px] text-slate-400">โครงสร้างเกรด A+</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Award className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white leading-snug">วารันตี 1 ปีเต็ม</div>
                  <div className="text-[11px] text-slate-400">เครื่องยนต์ + เกียร์</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Gauge className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white leading-snug">การันตีไมล์แท้</div>
                  <div className="text-[11px] text-slate-400">เช็กศูนย์ Honda ได้</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white leading-snug">อนุมัติไว 1 ชม.</div>
                  <div className="text-[11px] text-slate-400">ดอกเบี้ยเริ่ม 2.79%</div>
                </div>
              </div>
            </div>

            {/* Quick Search Input */}
            <div className="pt-2">
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="ค้นหา เช่น FK Hatchback, FC RS, FD Mugen, สีขาว, Tein, ปี 2019..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#161a24] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
                  >
                    ล้างการค้นหา
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Quick Generation Jump */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-br from-[#161b26] to-[#10131b] border border-slate-700/70 p-6 shadow-2xl relative overflow-hidden">
              
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-red-400 font-semibold">
                    เลือกเจเนอเรชันที่สนใจ
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                    Search by Generation
                  </h3>
                </div>
                <button
                  onClick={() => onSelectGeneration('ALL')}
                  className={`text-xs px-2.5 py-1 rounded transition-colors font-medium cursor-pointer ${
                    selectedGeneration === 'ALL'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  ดูทั้งหมด (ALL)
                </button>
              </div>

              {/* Gen fast selection list */}
              <div className="space-y-2.5">
                {genButtons.map((item) => {
                  const isActive = selectedGeneration === item.gen;
                  return (
                    <button
                      key={item.gen}
                      onClick={() => onSelectGeneration(item.gen)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-950/50'
                          : 'bg-[#12151f] hover:bg-[#1a202d] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-heading font-black text-sm tracking-wide ${
                            isActive
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-800 text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {item.gen}
                        </div>
                        <div>
                          <div className="text-sm font-bold flex items-center gap-2">
                            <span>{item.label}</span>
                            <span className="text-[11px] font-mono text-slate-400 font-normal">
                              ({item.period})
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <span className={isActive ? 'text-red-400 font-semibold' : ''}>
                          {isActive ? 'เลือกอยู่' : 'ชมสต็อก'}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-red-400 translate-x-0.5' : 'text-slate-500'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick highlight footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>มีรถพร้อมส่งมอบทุกคัน</span>
                </span>
                <span className="text-red-400 font-medium">
                  ฟรีดาวน์ ออกรถ 0 บาท*
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
