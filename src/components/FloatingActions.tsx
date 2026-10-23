import React from 'react';
import { Phone, MessageCircle, Calculator, Calendar } from 'lucide-react';

interface FloatingActionsProps {
  onOpenLoanModal: () => void;
  onOpenTestDriveModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenLoanModal,
  onOpenTestDriveModal,
}) => {
  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        {/* Loan Calculator Quick Floating Button */}
        <button
          onClick={onOpenLoanModal}
          aria-label="คำนวณค่างวดไฟแนนซ์"
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-100 border border-slate-700 shadow-xl shadow-black/60 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
        >
          <div className="w-7 h-7 rounded-full bg-red-600/30 text-red-500 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">คำนวณค่างวด</span>
        </button>

        {/* LINE Chat Floating Button */}
        <a
          href="https://line.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="แชทผ่าน LINE Official"
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="text-xs font-bold">คุยกับฝ่ายขาย LINE</span>
        </a>

        {/* Quick Phone Call Button */}
        <a
          href="tel:0818882484"
          aria-label="โทรหาฝ่ายขายทันที"
          className="group flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-950/60 transition-all hover:scale-105 cursor-pointer"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-bold">081-888-2484</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Fixed, within 15% height limit ~56px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1017]/95 backdrop-blur-lg border-t border-slate-800 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:0818882484"
          className="flex-1 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-red-400" />
          <span>โทรด่วน</span>
        </a>

        <a
          href="https://line.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/60"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>LINE</span>
        </a>

        <button
          onClick={onOpenLoanModal}
          className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-red-400" />
          <span>คำนวณงวด</span>
        </button>

        <button
          onClick={onOpenTestDriveModal}
          className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-md shadow-red-950/60 cursor-pointer"
        >
          <span>จองลองขับ</span>
        </button>
      </div>
    </>
  );
};
