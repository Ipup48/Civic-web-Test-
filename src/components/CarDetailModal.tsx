import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Award, Calendar, Gauge, Zap, Fuel, 
  Settings, MessageCircle, Phone, Calculator, ArrowRight, 
  CheckCircle2, AlertCircle, FileCheck, Share2 
} from 'lucide-react';
import { CivicCar } from '../types/car';
import { formatCurrency, formatNumber, calculateThaiAutoLoan } from '../utils/calculator';
import { CarSilhouette } from './CarSilhouette';

interface CarDetailModalProps {
  car: CivicCar | null;
  onClose: () => void;
  onOpenTestDrive: (car: CivicCar) => void;
  onOpenLoanCalculator: (car: CivicCar) => void;
  onOpenTradeIn: (car: CivicCar) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onOpenTestDrive,
  onOpenLoanCalculator,
  onOpenTradeIn,
}) => {
  if (!car) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MODS' | 'INSPECTION' | 'SPECS'>('OVERVIEW');
  const [copiedLink, setCopiedLink] = useState(false);

  const imagesList = car.images.gallery && car.images.gallery.length > 0
    ? car.images.gallery
    : [car.images.hero];

  const defaultDown = Math.round(car.priceThb * 0.1);
  const loanQuick = calculateThaiAutoLoan(car.priceThb, defaultDown, 3.25, 84);

  // Auto-generate LINE URL message
  const lineMessage = encodeURIComponent(
    `สวัสดีครับ Civic Hub Thailand สนใจสอบถามรายละเอียดรถคันนี้ครับ: ${car.title} (รหัส: ${car.id}) ราคา ${formatCurrency(car.priceThb)} รบกวนติดต่อกลับด้วยครับ`
  );
  const lineUrl = `https://line.me/R/msg/text/?${lineMessage}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl bg-[#12151f] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#141824] shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-heading font-black text-xs shrink-0">
              CIVIC {car.generation}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate font-heading">
              {car.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="แชร์ลิงก์รถคันนี้"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          
          {/* Top Gallery & Quick Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main Photo View */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-slate-800">
                <img
                  src={imagesList[activeImageIndex] || car.images.hero}
                  alt={car.title}
                  onError={(e) => {
                    // If image fails, fallback gracefully
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                    ภาพที่ {activeImageIndex + 1} / {imagesList.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                    ตรวจสภาพแล้ว 175 จุด
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-red-500 scale-95 shadow-md shadow-red-950/50'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`มุมที่ ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Price & Purchase Decision Box */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl bg-[#161a26] border border-slate-800 p-5">
              
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>สถานะรถ</span>
                  {car.status === 'AVAILABLE' ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      พร้อมส่งมอบทันที
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold">มีผู้จองแล้ว</span>
                  )}
                </div>

                <div className="mt-3">
                  <span className="text-xs text-slate-400">ราคาเงินสดพิเศษ</span>
                  <div className="text-3xl font-black font-heading text-white tracking-tight">
                    {formatCurrency(car.priceThb)}
                  </div>
                </div>

                {/* Monthly Estimate Banner */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">ผ่อน 84 เดือน (รวม VAT 7%):</span>
                    <span className="font-mono font-bold text-red-400 text-sm">
                      ~{formatCurrency(loanQuick.actualMonthlyWithVat)}/ด.
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>ดาวน์ 10% ({formatCurrency(defaultDown)}):</span>
                    <span>ดอกเบี้ย 3.25%</span>
                  </div>
                </div>

                {/* Key Quick Specs */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <div className="text-slate-400 text-[11px]">เลขไมล์แท้</div>
                    <div className="font-mono font-bold text-white mt-0.5">
                      {formatNumber(car.mileageKm)} กม.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <div className="text-slate-400 text-[11px]">ปีจดทะเบียน</div>
                    <div className="font-mono font-bold text-white mt-0.5">
                      ปี {car.year}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <div className="text-slate-400 text-[11px]">สีตัวถัง</div>
                    <div className="text-white font-medium mt-0.5 truncate">
                      {car.exteriorColor}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <div className="text-slate-400 text-[11px]">ระบบส่งกำลัง</div>
                    <div className="text-white font-medium mt-0.5 truncate">
                      {car.specs.transmission}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs Inside Purchase Box */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTestDrive(car);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-red-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>จองคิวทดลองขับฟรี</span>
                </button>

                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>คุย LINE กับฝ่ายขาย (ตอบไวใน 5 นาที)</span>
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLoanCalculator(car);
                    }}
                    className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-red-400" />
                    <span>คำนวณค่างวด</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenTradeIn(car);
                    }}
                    className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    <span>ประเมินเทิร์นรถ</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Tabs (Overview / Mods / Inspection / Specs) */}
          <div className="border-b border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('OVERVIEW')}
                className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'OVERVIEW'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                จุดเด่นประจำคัน (Highlights)
              </button>
              <button
                onClick={() => setActiveTab('INSPECTION')}
                className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'INSPECTION'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ใบรับรองตรวจเช็ก 175 จุด</span>
              </button>
              <button
                onClick={() => setActiveTab('MODS')}
                className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'MODS'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                ของแต่ง & อุปกรณ์ตกแต่ง ({car.allMods ? car.allMods.length : 0})
              </button>
              <button
                onClick={() => setActiveTab('SPECS')}
                className={`pb-3 px-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'SPECS'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                ข้อมูลทางเทคนิค (Technical Specs)
              </button>
            </div>
          </div>

          {/* Tab Content 1: Highlights & Overview */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                ข้อมูลสำคัญและจุดเด่นคันนี้
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {car.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Warranties strip */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-slate-900 border border-red-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-red-500 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-white">
                      การรับประกัน Civic Hub Certified Warranty
                    </div>
                    <div className="text-xs text-slate-400">
                      คุ้มครองเครื่องยนต์ ระบบเกียร์ และกล่องควบคุม ECU นาน 1 ปี หรือ 20,000 กม.
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  ฟรีบริการช่วยเหลือฉุกเฉิน 24 ชม.
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: 175-Point Inspection Certificate */}
          {activeTab === 'INSPECTION' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-[#0e121a] border border-emerald-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      175
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Civic Hub 175-Point Master Inspection
                      </div>
                      <div className="text-xs text-slate-400">
                        ผู้ตรวจสอบ: {car.inspection.inspectorName} · วันที่ตรวจ: {car.inspection.inspectionDate}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                    คะแนนตรวจ 175 / 175 ผ่านเกรด A+
                  </span>
                </div>

                {/* Inspection Checklist Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>โครงสร้างตัวถัง & คานหน้า-หลัง (ผ่าน 100%)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>เครื่องยนต์ & กำลังอัดลูกสูบ (ผ่าน 100%)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ระบบเกียร์ & ทอร์กคอนเวอร์เตอร์ (ผ่าน 100%)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ช่วงล่าง & ระบบเบรก 4 ล้อ (ผ่าน 100%)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>การันตีไม่จมน้ำ ไม่โดนตัดต่อ 100%</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ตรวจสอบประวัติศูนย์บริการ ไมล์แท้ 100%</span>
                  </div>
                </div>

                {/* Inspector Notes */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-400 mb-2">
                    บันทึกสรุปจากนายช่างผู้ตรวจสภาพ:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {car.inspection.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Modification List */}
          {activeTab === 'MODS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  รายการของแต่ง & อุปกรณ์อัปเกรด
                </h4>
                <span className="text-xs text-slate-400">
                  สไตล์การใช้งาน: {car.conditionStyle === 'TUNED' ? 'Street Tuned พร้อมใช้งาน' : 'Stock เดิมโรงงาน'}
                </span>
              </div>

              {car.allMods && car.allMods.length > 0 ? (
                <div className="space-y-2">
                  {car.allMods.map((mod, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {mod.category}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {mod.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs">
                        {mod.notes && (
                          <span className="text-slate-400">{mod.notes}</span>
                        )}
                        {mod.isAuthentic ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                            ของแท้
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400">
                            เทียบแท้
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 text-sm">
                  รถคันนี้เป็นรุ่นสแตนดาร์ดเดิมโรงงาน 100% ไม่มีของแต่งดัดแปลงใดๆ
                </div>
              )}
            </div>
          )}

          {/* Tab Content 4: Technical Specs */}
          {activeTab === 'SPECS' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                ข้อมูลจำเพาะทางเทคนิค
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">รหัสตัวถัง (Chassis Code)</span>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">
                    {car.specs.chassisCode}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">รหัสเครื่องยนต์ (Engine Code)</span>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">
                    {car.specs.engineCode}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">ความจุกระบอกสูบ</span>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">
                    {car.specs.displacementCc} ซีซี
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">แรงม้าสูงสุด</span>
                  <div className="font-mono font-bold text-red-400 text-sm mt-0.5">
                    {car.specs.maxPowerHp} แรงม้า
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">แรงบิดสูงสุด</span>
                  <div className="font-mono font-bold text-white text-sm mt-0.5">
                    {car.specs.maxTorqueNm} นิวตันเมตร
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">เชื้อเพลิงที่รองรับ</span>
                  <div className="font-medium text-white text-sm mt-0.5 truncate">
                    {car.specs.fuelSupport}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">ภาษี พ.ร.บ. สิ้นสุด</span>
                  <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                    {car.specs.taxValidUntil}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">จำนวนเจ้าของในเล่ม</span>
                  <div className="font-bold text-white text-sm mt-0.5">
                    {car.specs.previousOwners} ลำดับ
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">กุญแจสำรอง & บุ๊คเซอร์วิส</span>
                  <div className="font-bold text-white text-sm mt-0.5">
                    ครบ {car.specs.spareKeys} ดอก / มีสมุดเช็กระยะ
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 py-3.5 bg-[#0f121a] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span>รหัสอ้างอิง: <strong className="text-slate-200 font-mono">{car.id}</strong></span>
            <span>·</span>
            <span>มีบริการจัดส่งรถถึงหน้าบ้านทั่วประเทศ</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ปิด
          </button>
        </div>

      </div>

    </div>
  );
};
