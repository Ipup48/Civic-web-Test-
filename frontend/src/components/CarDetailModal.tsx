'use client';

import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { calculateLoan, submitLead } from '../services/api';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  Gauge,
  Cog,
  Send,
  Eye,
} from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

type AngleKey = 'exterior' | 'interior' | 'engine' | 'extra';

export const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, onClose }) => {
  const [activeAngle, setActiveAngle] = useState<AngleKey>('exterior');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
  const [termMonths, setTermMonths] = useState<48 | 60 | 72 | 84>(72);
  const [annualRate, setAnnualRate] = useState<number>(2.79);
  const [calculatedMonthly, setCalculatedMonthly] = useState<number | null>(null);
  const [loanBreakdown, setLoanBreakdown] = useState<any>(null);

  // Lead form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [lineId, setLineId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!car) return;
    setActiveAngle('exterior');
    setSubmitSuccess(false);

    if (car.paymentType === 'FINANCE') {
      const downAmount = Math.round(car.price * (downPaymentPercent / 100));
      calculateLoan({
        price: car.price,
        downPayment: downAmount,
        termMonths,
        annualRate,
      }).then((res) => {
        setCalculatedMonthly(res.finalMonthlyPayment);
        setLoanBreakdown(res);
      });
    } else {
      setCalculatedMonthly(null);
      setLoanBreakdown(null);
    }
  }, [car, downPaymentPercent, termMonths, annualRate]);

  if (!car) return null;

  const isCashOnly = car.paymentType === 'CASH_ONLY';

  const angles: { key: AngleKey; label: string; icon: string }[] = [
    { key: 'exterior', label: 'ภายนอก (Exterior)', icon: '🚘' },
    { key: 'interior', label: 'ภายใน (Cockpit)', icon: '💺' },
    { key: 'engine', label: 'ห้องเครื่อง (Engine)', icon: '⚙️' },
    { key: 'extra', label: 'ตรวจสภาพ (Inspection)', icon: '🔍' },
  ];

  const currentImage =
    car.images?.[activeAngle] ||
    car.images?.exterior ||
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80';

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;
    setIsSubmitting(true);
    try {
      await submitLead({
        carId: car.id,
        customerName,
        phone,
        lineId,
        financingOption: car.paymentType,
        note: `สนใจ Civic ${car.gen} - ${car.title}`,
      });
      setSubmitSuccess(true);
      setCustomerName('');
      setPhone('');
      setLineId('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl my-auto bg-neutral-900 border border-neutral-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase bg-red-600 text-white">
              Civic {car.gen}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
              {car.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top Section: Multi-Angle Gallery & Quick Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="relative aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-inner">
                <img
                  src={currentImage}
                  alt={`${car.title} - ${activeAngle}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1.5 border border-neutral-700">
                  <Eye className="w-3.5 h-3.5 text-red-500" />
                  <span>มุมมอง: {angles.find((a) => a.key === activeAngle)?.label}</span>
                </div>
              </div>

              {/* Angle Thumbnails / Selector Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {angles.map((ang) => {
                  const isActive = activeAngle === ang.key;
                  return (
                    <button
                      key={ang.key}
                      onClick={() => setActiveAngle(ang.key)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-neutral-800 border-red-600 text-white font-bold ring-1 ring-red-600'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-base">{ang.icon}</span>
                      <span className="mt-1 truncate text-[11px]">{ang.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Specs & Payment Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950/70 p-5 rounded-2xl border border-neutral-800">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">ราคาจำหน่ายพิเศษ</span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    ฿{car.price.toLocaleString()}
                  </span>
                </div>

                {/* Payment Status Banner */}
                <div className="mt-3">
                  {isCashOnly ? (
                    <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-800/60 text-amber-300">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>ขายสดเท่านั้น (Cash Only)</span>
                      </div>
                      <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                        {car.cashOnlyReason ||
                          'รถโมดิฟายด์พิเศษ/ปีลึก ทางร้านจัดจำหน่ายตัดสดราคาพิเศษ เล่มพร้อมโอนทันที'}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300">
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          จัดไฟแนนซ์ได้
                        </span>
                        <span className="text-emerald-400 font-black text-base">
                          ~฿{calculatedMonthly?.toLocaleString() || car.estimatedMonthlyPayment?.toLocaleString()}/ด.
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/80 mt-1">
                        คำนวณตามสูตรไฟแนนซ์ไทย ดอกเบี้ย Flat-Rate + VAT 7%
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-500">ปีจดทะเบียน</div>
                      <div className="font-semibold">{car.year}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <Gauge className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-500">เลขไมล์แท้</div>
                      <div className="font-semibold">{car.mileage.toLocaleString()} กม.</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <Cog className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-500">ระบบเกียร์</div>
                      <div className="font-semibold truncate">{car.transmission}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <FileText className="w-4 h-4 text-red-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-500">รหัสเครื่องยนต์</div>
                      <div className="font-semibold truncate">{car.engineCode}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col gap-2">
                <a
                  href={`tel:0891234567`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>โทรสอบถามด่วน: 089-123-4567</span>
                </a>
                <a
                  href={`https://line.me/ti/p/~civichubth`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-950"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ติดต่อฝ่ายขายทาง LINE: @civichubth</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 2: 4-Box Structured Inspection Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <h4 className="text-base font-bold text-white uppercase tracking-wider">
                รายงานตรวจสภาพเชิงลึก 4 หมวดหมู่ (Certified Inspection)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Exterior */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-red-400">
                  <span>1. ตรวจสภาพภายนอก & บอดี้รอบคัน</span>
                  <span className="text-[10px] text-neutral-500">EXTERIOR</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {car.specs?.exteriorDesc || 'สภาพสีเดิมรอบคัน ไร้รอยชน ล้อแม็กและยางสภาพดีเยี่ยม'}
                </p>
              </div>

              {/* Box 2: Interior */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-red-400">
                  <span>2. ตรวจสภาพภายใน & ระบบไฟฟ้าห้องโดยสาร</span>
                  <span className="text-[10px] text-neutral-500">INTERIOR</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {car.specs?.interiorDesc || 'ห้องโดยสารสะอาด ไร้กลิ่นอับ สวิตช์และหน้าจอทำงานครบสมบูรณ์'}
                </p>
              </div>

              {/* Box 3: Engine & Drivetrain */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-red-400">
                  <span>3. เครื่องยนต์ & ระบบส่งกำลังเกียร์</span>
                  <span className="text-[10px] text-neutral-500">ENGINE & DRIVETRAIN</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {car.specs?.engineDesc || 'เครื่องยนต์เดินเรียบ ไม่รั่วซึม เกียร์เข้าสมูท ช่วงล่างแน่น'}
                </p>
              </div>

              {/* Box 4: Chassis Guarantee */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-emerald-900/50 bg-emerald-950/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>4. การันตีโครงสร้าง 175 จุด & คืนเงิน 100%</span>
                  <span className="text-[10px] text-emerald-500">CHASSIS 100%</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {car.specs?.chassisGuarantee || 'การันตีคานหน้า คานหลัง เสา A-B-C เม็ดอาร์คเดิมโรงงาน ไม่เคยชนหนักหรือจมน้ำ'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Financing Calculator OR Cash Only Warning */}
          {!isCashOnly ? (
            <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-red-500" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    โปรแกรมคำนวณค่างวดผ่อนไฟแนนซ์ (Flat-Rate + VAT 7%)
                  </h4>
                </div>
                <span className="text-xs text-neutral-400">ดอกเบี้ยคงที่: {annualRate}% ต่อปี</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Down Payment Selector */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1.5">
                    เงินดาวน์: {downPaymentPercent}% (฿
                    {Math.round(car.price * (downPaymentPercent / 100)).toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>ฟรีดาวน์ 0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Term Months Selector */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1.5">จำนวนงวดผ่อน</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {([48, 60, 72, 84] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTermMonths(m)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          termMonths === m
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {m} งวด
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculated Result Display */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-center">
                  <div className="text-[11px] text-neutral-400">ค่างวดต่อเดือนโดยประมาณ (รวม VAT 7%):</div>
                  <div className="text-2xl font-black text-red-500 mt-0.5">
                    ฿{calculatedMonthly?.toLocaleString() || '---'}
                    <span className="text-xs font-normal text-neutral-400"> / เดือน</span>
                  </div>
                  {loanBreakdown && (
                    <div className="text-[10px] text-neutral-500 mt-1">
                      ยอดจัด: ฿{loanBreakdown.principal.toLocaleString()} • ดอกเบี้ยรวม: ฿
                      {loanBreakdown.totalInterest.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm">คันนี้จำหน่ายสดเท่านั้น (Cash Only)</h5>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  ระบบปิดการคำนวณค่างวดผ่อน เนื่องจากรถคันนี้เป็นสเปกพิเศษ/รถแต่งซิ่งปีลึก ทางโชว์รูมเน้นตัดสดราคาพิเศษ
                  เอกสารเล่มทะเบียนตัวจริงพร้อมโอนกรรมสิทธิ์ที่กรมการขนส่งทางบกทันที
                </p>
              </div>
            </div>
          )}

          {/* Section 4: Fast Inquiry / Booking Form */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-red-500" />
              นัดหมายทดลองขับ หรือ ขอเอกสารตรวจสภาพรถคันนี้
            </h4>

            {submitSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  บันทึกข้อมูลเรียบร้อยแล้ว ที่ปรึกษาการขายโชว์รูม Civic Hub Thailand จะติดต่อกลับท่านโดยเร็วที่สุด
                </span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="ชื่อ-นามสกุล ของท่าน *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-600"
                />
                <input
                  type="tel"
                  placeholder="เบอร์โทรศัพท์ติดต่อ *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  placeholder="LINE ID (ถ้ามี)"
                  value={lineId}
                  onChange={(e) => setLineId(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-red-950"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งนัดหมายจองดูรถ'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
