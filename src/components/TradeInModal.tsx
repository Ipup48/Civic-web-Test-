import React, { useState } from 'react';
import { X, ArrowRightLeft, Sparkles, CheckCircle2, ChevronRight, Calculator, Phone, Car } from 'lucide-react';
import { CivicCar } from '../types/car';
import { formatCurrency } from '../utils/calculator';

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCar: CivicCar | null;
  allCars: CivicCar[];
}

export const TradeInModal: React.FC<TradeInModalProps> = ({
  isOpen,
  onClose,
  targetCar,
  allCars,
}) => {
  if (!isOpen) return null;

  const [currentBrand, setCurrentBrand] = useState('Honda');
  const [currentModel, setCurrentModel] = useState('City');
  const [currentYear, setCurrentYear] = useState('2018');
  const [currentMileage, setCurrentMileage] = useState('85000');
  const [currentCondition, setCurrentCondition] = useState<'EXCELLENT' | 'GOOD' | 'FAIR'>('GOOD');
  const [targetCarId, setTargetCarId] = useState(targetCar ? targetCar.id : (allCars[0]?.id || ''));
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [calculated, setCalculated] = useState(false);

  const selectedCivic = allCars.find((c) => c.id === targetCarId) || targetCar || allCars[0];

  // Estimated baseline valuation engine
  const calculateEstimate = () => {
    let base = 250000;
    const yearNum = parseInt(currentYear) || 2018;
    const diffYear = 2026 - yearNum;
    base += Math.max(0, (10 - diffYear) * 35000);

    if (currentBrand.toLowerCase().includes('honda') || currentBrand.toLowerCase().includes('toyota')) {
      base *= 1.15; // Higher resale value in Thailand
    }

    if (currentCondition === 'EXCELLENT') base *= 1.1;
    if (currentCondition === 'FAIR') base *= 0.88;

    const minEstimate = Math.round(base * 0.92);
    const maxEstimate = Math.round(base * 1.05);

    return { minEstimate, maxEstimate };
  };

  const { minEstimate, maxEstimate } = calculateEstimate();
  const avgTradeIn = Math.round((minEstimate + maxEstimate) / 2);
  const netDifference = selectedCivic ? Math.max(0, selectedCivic.priceThb - avgTradeIn) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#121520] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#151926] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                ประเมินราคารถเทิร์น (Trade-In Valuation)
              </h2>
              <p className="text-xs text-slate-400">
                นำรถคันเดิมมาแลกเปลี่ยนเป็น Honda Civic รับราคาสูงกว่าตลาดทั่วไป
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          {!calculated ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">ต้องการเปลี่ยนเป็น:</span>{' '}
                <strong className="text-red-400 font-medium">{selectedCivic?.title}</strong> ({formatCurrency(selectedCivic?.priceThb || 0)})
              </div>

              {/* Current Car Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    ยี่ห้อรถคันเดิมของคุณ
                  </label>
                  <input
                    type="text"
                    value={currentBrand}
                    onChange={(e) => setCurrentBrand(e.target.value)}
                    placeholder="เช่น Honda, Toyota, Mazda, Nissan"
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    รุ่นย่อย / โฉม
                  </label>
                  <input
                    type="text"
                    value={currentModel}
                    onChange={(e) => setCurrentModel(e.target.value)}
                    placeholder="เช่น City 1.5 V, Vios, Civic FD"
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    ปีจดทะเบียน (ค.ศ.)
                  </label>
                  <input
                    type="number"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    placeholder="2016"
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    เลขไมล์โดยประมาณ (กม.)
                  </label>
                  <input
                    type="number"
                    value={currentMileage}
                    onChange={(e) => setCurrentMileage(e.target.value)}
                    placeholder="85000"
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Condition Rating */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  สภาพตัวถังและการใช้งาน:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentCondition('EXCELLENT')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      currentCondition === 'EXCELLENT'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        : 'bg-[#181d2a] border-slate-800 text-slate-400'
                    }`}
                  >
                    เกรด A สวยกริบ
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentCondition('GOOD')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      currentCondition === 'GOOD'
                        ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                        : 'bg-[#181d2a] border-slate-800 text-slate-400'
                    }`}
                  >
                    เกรด B สภาพปกติ
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentCondition('FAIR')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      currentCondition === 'FAIR'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                        : 'bg-[#181d2a] border-slate-800 text-slate-400'
                    }`}
                  >
                    มีริ้วรอยตามการใช้งาน
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCalculated(true)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>คำนวณราคาประเมินเบื้องต้นทันที</span>
                </button>
              </div>
            </div>
          ) : (
            /* Valuation Result */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f121a] border border-blue-500/40 text-center space-y-1">
                <span className="text-xs text-slate-400">ราคาประเมินรับเทิร์นรถของคุณโดยประมาณ:</span>
                <div className="text-2xl sm:text-3xl font-black font-heading text-blue-400">
                  {formatCurrency(minEstimate)} - {formatCurrency(maxEstimate)}
                </div>
                <div className="text-[11px] text-slate-400">
                  (สำหรับ {currentBrand} {currentModel} ปี {currentYear})
                </div>
              </div>

              {/* Net Difference to upgrade */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>ราคาคันเป้าหมาย ({selectedCivic?.title}):</span>
                  <span className="font-mono text-white font-semibold">{formatCurrency(selectedCivic?.priceThb || 0)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>หักราคารับเทิร์นเฉลี่ย:</span>
                  <span className="font-mono text-emerald-400">-{formatCurrency(avgTradeIn)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>ส่วนต่างที่ต้องชำระ (หรือนำไปจัดไฟแนนซ์ต่อ):</span>
                  <span className="font-mono text-red-400">{formatCurrency(netDifference)}</span>
                </div>
              </div>

              {/* Contact Lead Form */}
              <div className="p-4 rounded-xl bg-[#161a26] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white">
                  ส่งข้อมูลให้เจ้าหน้าที่ประเมินราคาจริงถึงบ้านฟรี:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="ชื่อของคุณ"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#121520] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#121520] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <a
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(
                    `สวัสดีครับ สนใจเทิร์นรถ ${currentBrand} ${currentModel} ปี ${currentYear} ไมล์ ${currentMileage} กม. เพื่อแลกซื้อ ${selectedCivic?.title} ประเมินราคาเบื้องต้นได้ ${formatCurrency(avgTradeIn)} ครับ (ชื่อ: ${customerName || 'ลูกค้า'}, โทร: ${customerPhone || '-'})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>ส่งรูปและเล่มทะเบียนทาง LINE เพื่อรับราคาคอนเฟิร์ม</span>
                </a>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setCalculated(false)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  แก้ไขข้อมูลรถคันเดิม
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
