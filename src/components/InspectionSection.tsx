import React from 'react';
import { ShieldCheck, Award, Wrench, CheckCircle2, FileCheck, AlertTriangle, Check, Car, Zap } from 'lucide-react';

export const InspectionSection: React.FC = () => {
  const inspectionPoints = [
    { title: 'โครงสร้างตัวถัง & คานนิรภัย (42 จุด)', desc: 'ตรวจสอบรอยอาร์คโรงงาน คานหน้า-หลัง เสา A, B, C ด้วยเครื่องวัดความหนาสีเลเซอร์ ไร้รอยดึง ตัดต่อ หรือคว่ำ 100%' },
    { title: 'เครื่องยนต์ & ระบบหล่อเย็น (38 จุด)', desc: 'ตรวจวัดกำลังอัดลูกสูบทั้ง 4 สูบ ตรวจหารอยน้ำมันซึมตามซีล ปั๊มน้ำ วาล์ว และตรวจเช็กโค้ดกล่อง ECU ด้วยเครื่อง Honda HDS' },
    { title: 'ระบบเกียร์ & ส่งกำลัง (25 จุด)', desc: 'ทดสอบ Stall Test เกียร์อัตโนมัติ 5-Speed และ CVT ทดสอบเปลี่ยนเกียร์สมูท ไม่กระตุก ไม่ลื่น พร้อมเช็กน้ำมันเกียร์แท้' },
    { title: 'ช่วงล่าง & ระบบเบรก (35 จุด)', desc: 'ตรวจเช็กบูชยาง ลูกหมาก โช้คอัพ แร็คพวงมาลัย จานเบรก คาลิปเปอร์ และทดสอบแรงเบรกบาลานซ์ 4 ล้อ' },
    { title: 'ระบบไฟฟ้า & แอร์ (20 จุด)', desc: 'ตรวจเช็กระบบ Honda SENSING, กล้อง LaneWatch, จอทัชสกรีน, ระบบไฟส่องสว่าง LED, แอร์เย็นฉ่ำต่ำกว่า 8 องศา' },
    { title: 'ประวัติศูนย์ & ตรวจไมล์แท้ (15 จุด)', desc: 'เชื่อมต่อฐานข้อมูลศูนย์บริการ ตรวจสอบความต่อเนื่องของเลขไมล์ และเช็กเล่มทะเบียนแท้ทุกหน้า โอนกรรมสิทธิ์ได้ถูกต้อง 100%' },
  ];

  return (
    <section id="inspection-standard" className="py-16 lg:py-24 bg-[#0a0c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>CIVIC HUB CERTIFIED STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight" style={{ textWrap: 'balance' }}>
            มาตรฐานตรวจสภาพเข้มงวด 175 จุด <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
              กล้ารับประกันซื้อคืน 100% เต็มจำนวน
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            เราคัดทิ้งรถที่ไม่ได้มาตรฐานกว่า 80% เพื่อให้คุณได้ขับ Honda Civic ที่สมบูรณ์แบบที่สุด มั่นใจได้ทั้งผู้ขับขี่และครอบครัว
          </p>
        </div>

        {/* 3 Main Guarantees Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f1118] border border-slate-700/80 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-1.5">
              การันตีตัวถังโครงสร้าง 100%
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              หากตรวจพบว่ารถมีประวัติชนหนัก พลิกคว่ำ น้ำท่วม หรือตัดต่อโครงสร้างตัวถัง ยินดีรับซื้อคืนเต็มจำนวน 100% ตามสัญญาเป็นลายลักษณ์อักษร
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f1118] border border-slate-700/80 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-1.5">
              วารันตีเครื่องยนต์ & เกียร์ 1 ปี
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              รับประกันชิ้นส่วนเครื่องยนต์ ระบบส่งกำลัง (เกียร์) และกล่อง ECU นาน 1 ปี หรือ 20,000 กม. พร้อมบริการช่วยเหลือฉุกเฉิน 24 ชั่วโมง ทั่วไทย
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f1118] border border-slate-700/80 hover:border-slate-600 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-1.5">
              การันตีไมล์แท้ ตรวจสอบศูนย์ได้
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ไม่มีการกรอไมล์ทุกกรณี มีสมุดคู่มือบำรุงรักษา (Service Booklet) และประวัติเช็กระยะศูนย์บริการ Honda ประเทศไทย สามารถตรวจสอบย้อนหลังได้ทุกคัน
            </p>
          </div>

        </div>

        {/* 6 Inspection Categories Grid */}
        <div className="rounded-2xl bg-[#11141e] border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                รายละเอียดขั้นตอนการตรวจเช็ก 175 จุด
              </h3>
              <p className="text-xs text-slate-400">
                โดยวิศวกรผู้เชี่ยวชาญสายตรงยานยนต์ พร้อมอุปกรณ์เครื่องมือวิเคราะห์ระดับเดียวกับศูนย์บริการ
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/40 hidden sm:inline-block">
              175 จุด ตรวจผ่านทุกรายการ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inspectionPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#151926] border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pt.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee Footer */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ลูกค้าสามารถพานายช่างหรือผู้เชี่ยวชาญจากภายนอกมาตรวจสภาพร่วมกันได้ทุกคัน</span>
            </span>
            <span className="text-slate-300 font-mono">
              มีลิฟต์ยกรถให้ส่องดูช่วงล่างใต้ท้องรถได้จริง
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
