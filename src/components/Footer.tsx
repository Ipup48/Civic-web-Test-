import React from 'react';
import { ShieldCheck, Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { CivicGeneration } from '../types/car';

interface FooterProps {
  onSelectGeneration: (gen: CivicGeneration) => void;
  onOpenLoanModal: () => void;
  onOpenTestDriveModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectGeneration,
  onOpenLoanModal,
  onOpenTestDriveModal,
}) => {
  return (
    <footer className="bg-[#090b10] border-t border-slate-800 text-slate-400 text-xs pb-24 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-heading font-black text-white text-lg shadow-md shadow-red-950/60">
                H
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                CIVIC<span className="text-red-500">HUB</span> THAILAND
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ศูนย์รวมรถยนต์มือสองเฉพาะทางสำหรับผู้หลงใหลใน Honda Civic โดยเฉพาะ ครอบคลุม FD, FB, FC, FK และ FE ตรวจสอบสภาพ 175 จุด การันตีตัวถังเดิม 100% ไมล์แท้ พร้อมวารันตีเครื่องยนต์และเกียร์ 1 ปีเต็ม
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                175-Point Certified
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                1-Year Engine Warranty
              </span>
            </div>
          </div>

          {/* Quick Gen Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              เลือกรุ่น Civic
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectGeneration('FD')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Honda Civic FD (2005-2012)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGeneration('FB')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Honda Civic FB (2012-2016)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGeneration('FC')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Honda Civic FC Sedan (2016-2021)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGeneration('FK')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Honda Civic FK Hatchback (2017-2021)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectGeneration('FE')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Honda Civic FE (2021-ปัจจุบัน)
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              บริการ & การซื้อขาย
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenLoanModal}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  คำนวณสินเชื่อรถยนต์ (VAT 7%)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTestDriveModal}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  นัดหมายทดลองขับฟรี
                </button>
              </li>
              <li>
                <a href="#inspection-standard" className="hover:text-red-400 transition-colors">
                  มาตรฐานตรวจเช็ก 175 จุด
                </a>
              </li>
              <li>
                <a href="#showroom-section" className="hover:text-red-400 transition-colors">
                  โชว์รูมสาขากาญจนาภิเษก
                </a>
              </li>
              <li>
                <a href="#showroom-section" className="hover:text-red-400 transition-colors">
                  ประเมินราคารับเทิร์นรถ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">
              ติดต่อโชว์รูม
            </h4>
            <div className="space-y-2 text-xs">
              <div className="text-white font-semibold">
                ถนนกาญจนาภิเษก-บางแค กรุงเทพฯ
              </div>
              <div>เปิดทุกวัน 09:00 - 18:30 น.</div>
              <div className="pt-1">
                <a href="tel:0818882484" className="text-red-400 hover:underline font-mono font-bold block">
                  โทร: 081-888-2484
                </a>
                <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline block mt-1">
                  LINE: @civichubth
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Finance Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-2">
          <p>
            *หมายเหตุ: ค่างวดและอัตราดอกเบี้ยที่แสดงเป็นการคำนวณเบื้องต้นตามสูตรดอกเบี้ยคงที่มาตรฐานไฟแนนซ์ไทย (Flat Rate) รวมภาษีมูลค่าเพิ่ม 7% (VAT) แล้ว อัตราดอกเบี้ยและยอดจัดที่แท้จริงขึ้นอยู่กับปีจดทะเบียนของรถ, วงเงินดาวน์, และคุณสมบัติของผู้เช่าซื้อตามการพิจารณาของสถาบันการเงินผู้ให้สินเชื่อ (ธนาคารไทยพาณิชย์, ธนชาต/ทีทีบี, กรุงศรี ออโต้, กสิกรไทย ฯลฯ)
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-slate-400">
            <div>
              © 2026 Civic Hub Thailand Co., Ltd. สงวนลิขสิทธิ์ทั้งหมด
            </div>
            <div className="flex items-center gap-4">
              <span>นโยบายความเป็นส่วนตัว</span>
              <span>·</span>
              <span>เงื่อนไขการรับประกันคุณภาพ</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
