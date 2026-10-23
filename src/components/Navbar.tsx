import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenLoanModal: () => void;
  onOpenTestDriveModal: () => void;
  onSelectGeneration?: (gen: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLoanModal,
  onOpenTestDriveModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1017]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/30 group-hover:scale-105 transition-transform duration-200">
            <span className="font-heading font-black text-xl text-white tracking-wider">H</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl tracking-tight text-white uppercase">
                CIVIC<span className="text-red-500 font-extrabold ml-1">HUB</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                THAILAND
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-normal tracking-wide hidden sm:inline">
              ศูนย์รวม Honda Civic มือสอง FD · FB · FC · FK · FE
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (4-5 single-line clean text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#inventory-section"
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            รถในสต็อก
          </a>
          <a
            href="#generations-guide"
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            คู่มือรุ่น FD ถึง FE
          </a>
          <button
            onClick={onOpenLoanModal}
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 text-left cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-red-500" />
            <span>คำนวณค่างวด</span>
          </button>
          <a
            href="#inspection-standard"
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ตรวจเช็ก 175 จุด</span>
          </a>
          <a
            href="#showroom-section"
            className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            โชว์รูม & แผนที่
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Contact */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://line.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ติดต่อ LINE Official"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            <span>LINE: @civichubth</span>
          </a>

          <button
            onClick={onOpenTestDriveModal}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg shadow-md shadow-red-950/60 transition-all hover:shadow-red-700/30 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>จองทดลองขับ</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 cursor-pointer"
            aria-label="เปิดเมนู"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11141c] border-b border-slate-800 px-5 py-4 space-y-3">
          <a
            href="#inventory-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-red-400 py-2 border-b border-slate-800/60"
          >
            รถในสต็อกทั้งหมด
          </a>
          <a
            href="#generations-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-red-400 py-2 border-b border-slate-800/60"
          >
            เจาะลึก Civic แต่ละเจเนอเรชัน (FD, FB, FC, FK, FE)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLoanModal();
            }}
            className="w-full text-left flex items-center justify-between text-sm font-medium text-slate-200 hover:text-red-400 py-2 border-b border-slate-800/60"
          >
            <span className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-red-500" />
              <span>คำนวณค่างวดมาตรฐานไฟแนนซ์ไทย (VAT 7%)</span>
            </span>
          </button>
          <a
            href="#inspection-standard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-red-400 py-2 border-b border-slate-800/60"
          >
            มาตรฐานตรวจสภาพ 175 จุด และการรับประกัน
          </a>
          <a
            href="#showroom-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-red-400 py-2"
          >
            ติดต่อโชว์รูม & แผนที่กาญจนาภิเษก
          </a>

          <div className="pt-3 flex flex-col gap-2">
            <a
              href="tel:0818882484"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-800 text-slate-100 text-sm font-medium hover:bg-slate-700"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>โทรด่วน: 081-888-2484</span>
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LINE: @civichubth (คุยกับฝ่ายขาย)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
