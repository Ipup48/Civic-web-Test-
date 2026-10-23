import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Shield, Award, CheckCircle2, Send } from 'lucide-react';

export const ShowroomSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySent(true);
  };

  return (
    <section id="showroom-section" className="py-16 lg:py-24 bg-[#0d1017] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-red-500 font-mono">
                SHOWROOM & SERVICE CENTER
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">ยินดีต้อนรับทุกวัน</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              แวะชมรถคันจริงได้ที่ <span className="text-red-500">Civic Hub โชว์รูม</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-2">
              ตั้งอยู่บนถนนกาญจนาภิเษก-บางแค ติดถนนใหญ่ เดินทางสะดวก พร้อมห้องรับรองปรับอากาศ ลิฟต์ยกรถตรวจช่วงล่าง และพื้นที่ทดลองขับปลอดภัย
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://maps.google.com/?q=Civic+Hub+Thailand+Kanchanaphisek"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Navigation className="w-4 h-4 text-red-500" />
              <span>เปิดแผนที่ Google Maps</span>
            </a>
          </div>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Preview / Interactive Card */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#131622] border border-slate-800 relative flex flex-col justify-between shadow-2xl">
            {/* Map Simulator Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-[#181d2a] overflow-hidden">
              {/* Styled Vector Map Grid & Roads */}
              <svg className="w-full h-full opacity-40" viewBox="0 0 800 500" fill="none">
                <rect width="800" height="500" fill="#131722" />
                {/* Roads */}
                <line x1="0" y1="250" x2="800" y2="250" stroke="#333d52" strokeWidth="24" />
                <line x1="0" y1="250" x2="800" y2="250" stroke="#dc2626" strokeWidth="2" strokeDasharray="8 6" />
                <line x1="380" y1="0" x2="380" y2="500" stroke="#2c3447" strokeWidth="18" />
                <line x1="150" y1="100" x2="650" y2="400" stroke="#252c3c" strokeWidth="12" />
                {/* Secondary roads */}
                <line x1="200" y1="0" x2="200" y2="500" stroke="#1d2331" strokeWidth="6" />
                <line x1="550" y1="0" x2="550" y2="500" stroke="#1d2331" strokeWidth="6" />
                <line x1="0" y1="120" x2="800" y2="120" stroke="#1d2331" strokeWidth="6" />
                <line x1="0" y1="380" x2="800" y2="380" stroke="#1d2331" strokeWidth="6" />
              </svg>

              {/* Pin Callout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-2xl shadow-red-950 flex items-center gap-2 border border-red-400">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>Civic Hub Thailand (สาขาใหญ่)</span>
                </div>
                <div className="w-1 h-6 bg-red-600" />
                <div className="w-4 h-2 rounded-full bg-black/60 blur-[1px]" />
              </div>

              {/* Map Info Bar Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0e111a]/95 backdrop-blur-md border border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-white">88/9 หมู่ 2 ถนนกาญจนาภิเษก แขวงบางแคเหนือ</div>
                  <div className="text-slate-400 text-[11px]">เขตบางแค กรุงเทพมหานคร 10160 (ติดเดอะมอลล์บางแค 5 นาที)</div>
                </div>
                <a
                  href="https://maps.google.com/?q=Civic+Hub+Thailand+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>นำทาง (GPS)</span>
                </a>
              </div>
            </div>

            {/* Facility Highlights Strip */}
            <div className="p-4 bg-[#11141e] border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-900/60">
                <div className="text-red-400 font-bold">ที่จอดรถสะดวก</div>
                <div className="text-[11px] text-slate-400">รองรับกว่า 30 คัน</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60">
                <div className="text-red-400 font-bold">ห้องรับรอง VIP</div>
                <div className="text-[11px] text-slate-400">กาแฟสด & Wi-Fi ฟรี</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60">
                <div className="text-red-400 font-bold">ลิฟต์ยกรถ 4 เสา</div>
                <div className="text-[11px] text-slate-400">ส่องดูช่วงล่างใต้ท้องได้</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60">
                <div className="text-red-400 font-bold">ถนนทดลองขับ</div>
                <div className="text-[11px] text-slate-400">ทดสอบอัตราเร่งปลอดภัย</div>
              </div>
            </div>
          </div>

          {/* Contact Details & Quick Callback Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 rounded-2xl bg-[#141824] border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white font-heading">
                ข้อมูลติดต่อ & เวลาทำการ
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">เวลาทำการ:</span>
                    <div className="font-bold text-white text-sm">
                      เปิดทุกวัน 09:00 - 18:30 น. (ไม่มีวันหยุด)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">ฝ่ายขายและปรึกษาสินเชื่อ:</span>
                    <div className="font-bold text-white text-sm font-mono">
                      <a href="tel:0818882484" className="hover:text-red-400 transition-colors">
                        081-888-2484
                      </a>{' '}
                      / {' '}
                      <a href="tel:028994567" className="hover:text-red-400 transition-colors">
                        02-899-4567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">LINE Official Account:</span>
                    <div className="font-bold text-emerald-400 text-sm">
                      <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        @civichubth (มี @ ด้านหน้า)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href="tel:0818882484"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>โทรออกทันที</span>
                </a>
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-950/40"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>แชท LINE ตอนนี้</span>
                </a>
              </div>
            </div>

            {/* Quick Request Callback Form */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161b28] to-[#121520] border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white font-heading">
                ให้เจ้าหน้าที่โทรติดต่อกลับอย่างรวดเร็ว
              </h4>
              <p className="text-xs text-slate-400">
                กรอกเบอร์โทรไว้ เจ้าหน้าที่ฝ่ายขายจะติดต่อกลับภายใน 15 นาที
              </p>

              {!inquirySent ? (
                <form onSubmit={handleInquiry} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="ชื่อของคุณ"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-[#11141e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="เบอร์โทรศัพท์ติดต่อ"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full bg-[#11141e] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-950/50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ขอให้ติดต่อกลับด่วน</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center text-xs space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white">รับข้อมูลเรียบร้อยแล้ว!</div>
                  <div className="text-slate-300 text-[11px]">
                    เจ้าหน้าที่ Civic Hub จะติดต่อกลับหาคุณ {inquiryName} ทางเบอร์ {inquiryPhone} โดยเร็วที่สุดครับ
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
