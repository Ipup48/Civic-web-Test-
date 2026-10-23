import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, MessageSquare, Car, ChevronRight } from 'lucide-react';
import { CivicCar } from '../types/car';
import { formatCurrency } from '../utils/calculator';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: CivicCar | null;
  allCars: CivicCar[];
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  allCars,
}) => {
  if (!isOpen) return null;

  const [carId, setCarId] = useState<string>(selectedCar ? selectedCar.id : (allCars[0]?.id || ''));
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lineId, setLineId] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    // Tomorrow's date as default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00');
  const [testDriveLocation, setTestDriveLocation] = useState<'SHOWROOM' | 'HOME'>('SHOWROOM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const chosenCar = allCars.find((c) => c.id === carId) || selectedCar || allCars[0];

  const timeSlots = [
    '09:30 - 10:30',
    '11:00 - 12:00',
    '13:30 - 14:30',
    '15:00 - 16:00',
    '16:30 - 17:30',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) return;

    // Generate reference code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `CVH-${new Date().getFullYear()}-${randomNum}`;
    setBookingRef(refCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-xl bg-[#121520] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#151926] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                จองคิวทดลองขับ (Book Test Drive)
              </h2>
              <p className="text-xs text-slate-400">
                สัมผัสสมรรถนะจริงก่อนตัดสินใจ ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น
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

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Selected Car preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  รถยนต์ที่ต้องการทดลองขับ:
                </label>
                <select
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {allCars.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.generation}] {c.title} — {formatCurrency(c.priceThb)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location choice */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  สถานที่ทดลองขับ:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTestDriveLocation('SHOWROOM')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      testDriveLocation === 'SHOWROOM'
                        ? 'bg-red-950/50 border-red-500 text-white shadow-md shadow-red-950/40'
                        : 'bg-[#181d2a] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>ที่โชว์รูมกาญจนาภิเษก</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      ทดลองขับบนถนนจริง + ปรึกษาสินเชื่อทันที
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTestDriveLocation('HOME')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      testDriveLocation === 'HOME'
                        ? 'bg-red-950/50 border-red-500 text-white shadow-md shadow-red-950/40'
                        : 'bg-[#181d2a] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-blue-400" />
                      <span>ขับไปให้ลองถึงบ้าน (กทม.-ปริมณฑล)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      สะดวกสบาย บริการฟรีถึงหน้าบ้าน
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    วันที่สะดวก:
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ช่วงเวลาที่ต้องการ:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ชื่อ-นามสกุลของคุณ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น คุณธนกร สิทธิโชค"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      เบอร์โทรศัพท์ติดต่อ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="เช่น 081-234-5678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      LINE ID (สำหรับส่งพิกัด/ข้อมูล)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น mylineid"
                      value={lineId}
                      onChange={(e) => setLineId(e.target.value)}
                      className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ข้อความเพิ่มเติม หรือจุดที่ต้องการเน้นเป็นพิเศษ
                  </label>
                  <textarea
                    rows={2}
                    placeholder="เช่น ต้องการทดลองขับอัตราเร่ง, สนใจจัดไฟแนนซ์ฟรีดาวน์, ฯลฯ"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#181d2a] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-red-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>ยืนยันการจองคิวทดลองขับ (ฟรี)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="text-center text-[11px] text-slate-400 mt-2">
                  เจ้าหน้าที่จะโทรยืนยันนัดหมายล่วงหน้า 30 นาทีก่อนเวลา
                </div>
              </div>

            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  บันทึกการจองทดลองขับเรียบร้อยแล้ว!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  หมายเลขรหัสการจองของคุณคือ:
                </p>
                <div className="text-lg font-mono font-black text-red-400 mt-1">
                  {bookingRef}
                </div>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-[#161a26] border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">รถที่ทดลองขับ:</span>
                  <span className="font-semibold text-white truncate max-w-[220px]">{chosenCar?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">วันและเวลา:</span>
                  <span className="font-semibold text-white">{bookingDate} ({timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ผู้จอง:</span>
                  <span className="font-semibold text-white">{fullName} ({phoneNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">สถานที่:</span>
                  <span className="font-semibold text-emerald-400">
                    {testDriveLocation === 'SHOWROOM' ? 'โชว์รูม Civic Hub สาขากาญจนาภิเษก' : 'บริการทดลองขับถึงที่พัก'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(`สวัสดีครับ แจ้งรหัสการจองทดลองขับ ${bookingRef} สำหรับ ${chosenCar?.title} วันที่ ${bookingDate} เวลา ${timeSlot} ครับ`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>แจ้งคอนเฟิร์มทาง LINE ทันที</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
