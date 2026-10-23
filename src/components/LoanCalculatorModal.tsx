import React, { useState, useEffect } from 'react';
import { X, Calculator, Percent, Calendar, ShieldCheck, Check, MessageCircle, FileText, Info } from 'lucide-react';
import { CivicCar } from '../types/car';
import { calculateThaiAutoLoan, formatCurrency, formatNumber } from '../utils/calculator';

interface LoanCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCar?: CivicCar | null;
  allCars: CivicCar[];
  onOpenTestDrive?: (car: CivicCar) => void;
}

export const LoanCalculatorModal: React.FC<LoanCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialCar,
  allCars,
  onOpenTestDrive,
}) => {
  if (!isOpen) return null;

  // Selected car or custom
  const [selectedCarId, setSelectedCarId] = useState<string>(initialCar ? initialCar.id : (allCars[0]?.id || ''));
  const activeCar = allCars.find((c) => c.id === selectedCarId) || initialCar || allCars[0];

  const [customPrice, setCustomPrice] = useState<number>(activeCar ? activeCar.priceThb : 650000);
  const [downPercent, setDownPercent] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(3.25);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(84);

  // Sync price if car changes
  useEffect(() => {
    if (activeCar) {
      setCustomPrice(activeCar.priceThb);
    }
  }, [selectedCarId]);

  const downPaymentThb = Math.round((customPrice * downPercent) / 100);

  const loanResult = calculateThaiAutoLoan(
    customPrice,
    downPaymentThb,
    interestRate,
    loanTermMonths
  );

  const downPresets = [0, 10, 15, 20, 25, 30];
  const termPresets = [48, 60, 72, 84];

  // Auto-generate LINE consultation message with exact loan math
  const lineLoanMessage = encodeURIComponent(
    `สวัสดีครับ Civic Hub สนใจปรึกษาสินเชื่อรถยนต์:\n- รถ: ${activeCar ? activeCar.title : 'Honda Civic'}\n- ราคา: ${formatCurrency(customPrice)}\n- เงินดาวน์: ${downPercent}% (${formatCurrency(downPaymentThb)})\n- ยอดจัด: ${formatCurrency(loanResult.loanPrincipal)}\n- ระยะเวลา: ${loanTermMonths} เดือน\n- ค่างวดคำนวณ (รวม VAT 7%): ${formatCurrency(loanResult.actualMonthlyWithVat)}/เดือน\nรบกวนเจ้าหน้าที่ประเมินความพร้อมและเอกสารให้หน่อยครับ`
  );
  const lineUrl = `https://line.me/R/msg/text/?${lineLoanMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-4xl bg-[#121520] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#151926] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                เครื่องคำนวณสินเชื่อรถยนต์มือสองมาตรฐานไทย
              </h2>
              <p className="text-xs text-slate-400">
                สูตรคำนวณดอกเบี้ยคงที่ (Flat Rate) พร้อมรวมภาษีมูลค่าเพิ่ม 7% (VAT) ตามระเบียบกรมสรรพากร
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Input Controls Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Car Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  เลือกรถจากสต็อก หรือปรับราคาเอง:
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {allCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.generation}] {c.title} — {formatCurrency(c.priceThb)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Input & Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    ราคารถยนต์ (Car Price)
                  </label>
                  <span className="font-mono font-bold text-white text-base">
                    {formatCurrency(customPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="1200000"
                  step="10000"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>฿200,000</span>
                  <span>฿700,000</span>
                  <span>฿1,200,000</span>
                </div>
              </div>

              {/* Down Payment % and Quick Chips */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    เงินดาวน์ (Down Payment): <span className="text-red-400 font-bold">{downPercent}%</span>
                  </label>
                  <span className="font-mono font-bold text-white text-sm">
                    {formatCurrency(downPaymentThb)}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5 mb-2.5">
                  {downPresets.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPercent(pct)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        downPercent === pct
                          ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                          : 'bg-[#181d2a] text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  *ฟรีดาวน์ 0% สำหรับผู้มีเครดิตประวัติดีหรือพนักงานประจำ
                </div>
              </div>

              {/* Loan Term Period */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  ระยะเวลาผ่อนชำระ (Loan Term):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {termPresets.map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setLoanTermMonths(months)}
                      className={`py-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        loanTermMonths === months
                          ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                          : 'bg-[#181d2a] text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span className="font-mono text-sm font-bold">{months} เดือน</span>
                      <span className="text-[10px] opacity-80">({months / 12} ปี)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    อัตราดอกเบี้ยคงที่ต่อปี (Flat Rate p.a.)
                  </label>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {interestRate.toFixed(2)}% / ปี
                  </span>
                </div>
                <input
                  type="range"
                  min="2.59"
                  max="6.00"
                  step="0.10"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-red-600 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                  <span>2.59% (เก๋งปีใหม่)</span>
                  <span>3.50% (มาตรฐาน)</span>
                  <span>6.00%</span>
                </div>
              </div>

            </div>

            {/* Output Calculation Result Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl bg-gradient-to-b from-[#181d2a] to-[#121520] border border-slate-700/80 p-5">
              
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  ประมาณการค่างวดรายเดือน
                </span>

                {/* Big Result */}
                <div className="mt-2 p-4 rounded-xl bg-[#0e111a] border border-red-500/40 text-center">
                  <div className="text-3xl sm:text-4xl font-black font-heading text-red-500 tracking-tight">
                    {formatCurrency(loanResult.actualMonthlyWithVat)}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    ต่อเดือน ({loanResult.loanTermMonths} งวด)
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    ✓ รวมภาษีมูลค่าเพิ่ม 7% (VAT) แล้ว
                  </div>
                </div>

                {/* Financial Breakdown Table */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>ราคารถยนต์</span>
                    <span className="font-mono text-white">{formatCurrency(loanResult.carPrice)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>หักเงินดาวน์ ({loanResult.downPaymentPercent.toFixed(0)}%)</span>
                    <span className="font-mono text-emerald-400">-{formatCurrency(loanResult.downPaymentThb)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>ยอดจัดสินเชื่อ (เงินต้น)</span>
                    <span className="font-mono text-white font-semibold">{formatCurrency(loanResult.loanPrincipal)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>ดอกเบี้ยรวม ({loanResult.annualInterestRate}% x {loanResult.loanTermYears} ปี)</span>
                    <span className="font-mono text-slate-300">{formatCurrency(loanResult.totalInterestThb)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>ค่างวดก่อน VAT (ต่อเดือน)</span>
                    <span className="font-mono text-slate-300">{formatCurrency(loanResult.monthlyPreVat)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-slate-300">
                    <span>ภาษีมูลค่าเพิ่ม 7% (ต่อเดือน)</span>
                    <span className="font-mono text-slate-300">{formatCurrency(loanResult.vatAmountMonthly)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-slate-300 font-semibold">
                    <span>ยอดชำระรวมทั้งหมดตลอดสัญญา</span>
                    <span className="font-mono text-white">{formatCurrency(loanResult.totalPayoffThb)}</span>
                  </div>
                </div>

                {/* Salary Qualification Advice */}
                <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300">
                    <span className="font-semibold text-white">คำแนะนำด้านรายได้ผู้กู้:</span> เพื่อให้ไฟแนนซ์ผ่านง่าย แนะนำรายได้สุทธิของผู้กู้ (หรือรวมผู้กู้ร่วม) ควรอยู่ที่ประมาณ{' '}
                    <strong className="text-red-400 font-mono">{formatCurrency(loanResult.minRecommendedSalaryThb)}</strong> บาท/เดือน ขึ้นไป
                  </div>
                </div>
              </div>

              {/* Direct Inquiry CTAs */}
              <div className="space-y-2 pt-2">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ส่งยอดคำนวณนี้ปรึกษาไฟแนนซ์ทาง LINE</span>
                </a>

                {activeCar && onOpenTestDrive && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTestDrive(activeCar);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  >
                    จองทดลองขับคันนี้ ({activeCar.title})
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Thai Finance Documentation Checklist */}
          <div className="p-4 rounded-xl bg-[#0f121b] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
              <FileText className="w-4 h-4 text-red-500" />
              <span>เอกสารที่ต้องใช้ในการยื่นขอสินเชื่อรถยนต์มือสอง</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>พนักงานประจำ / ข้าราชการ</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>สำเนาบัตรประชาชน 3 ชุด</li>
                  <li>สำเนาทะเบียนบ้าน 3 ชุด</li>
                  <li>สลิปเงินเดือน หรือหนังสือรับรองเงินเดือน</li>
                  <li>Statement ย้อนหลัง 6 เดือน</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>เจ้าของกิจการ / นิติบุคคล</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>สำเนาบัตร & ทะเบียนบ้านกรรมการ</li>
                  <li>หนังสือรับรองบริษัท (อายุไม่เกิน 3 เดือน)</li>
                  <li>Statement บริษัท ย้อนหลัง 6 เดือน</li>
                  <li>ใบทะเบียนพาณิชย์ หรือ ภพ.20</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>อาชีพอิสระ / ฟรีแลนซ์</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>สำเนาบัตร & ทะเบียนบ้าน 3 ชุด</li>
                  <li>Statement บัญชีเงินเข้า ย้อนหลัง 6-12 เดือน</li>
                  <li>หนังสือหักภาษี ณ ที่จ่าย (ทวิ 50)</li>
                  <li>สัญญาจ้างงาน หรือรูปถ่ายหน้างาน</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>พ่อค้า แม่ค้า / ค้าขายออนไลน์</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>สำเนาบัตร & ทะเบียนบ้าน 3 ชุด</li>
                  <li>Statement บัญชีค้าขาย ย้อนหลัง 6 เดือน</li>
                  <li>สัญญาเช่าแผง หรือหน้าร้าน</li>
                  <li>บิลซื้อขายสินค้า / แคปหน้าเพจร้าน</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
