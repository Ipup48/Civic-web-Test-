import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchCarBySlug } from '../../../services/api';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Gauge,
  Cog,
  FileText,
  Phone,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

interface CarDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const car = await fetchCarBySlug(params.slug);
  if (!car) {
    return {
      title: 'ไม่พบข้อมูลรถยนต์ | Civic Hub Thailand',
    };
  }

  return {
    title: `${car.title} | Civic Hub Thailand`,
    description: `ฮอนด้าซีวิค ${car.gen} ปี ${car.year} ไมล์ ${car.mileage.toLocaleString()} กม. ราคา ฿${car.price.toLocaleString()} ${
      car.paymentType === 'FINANCE' ? 'จัดไฟแนนซ์ได้' : 'ขายสดเท่านั้น'
    } ตรวจสภาพโครงสร้าง 175 จุด`,
    openGraph: {
      title: `${car.title} - ฿${car.price.toLocaleString()}`,
      description: `Civic ${car.gen} ${car.engineCode} สเปกไทยแท้ ตรวจสอบสภาพ 175 จุด วารันตีเครื่องเกียร์ 1 ปี`,
      images: [
        {
          url: car.images?.exterior || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 800,
        },
      ],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const car = await fetchCarBySlug(params.slug);
  if (!car) notFound();

  const isCashOnly = car.paymentType === 'CASH_ONLY';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่หน้ารวมโชว์รูม (Back to Catalog)</span>
        </Link>
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery Views (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800">
            <img
              src={car.images?.exterior}
              alt={car.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3 Additional Angle Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-neutral-400 font-medium">ภายใน (Cockpit)</span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={car.images?.interior}
                  alt="Interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-neutral-400 font-medium">ห้องเครื่อง (Engine)</span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={car.images?.engine}
                  alt="Engine"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-neutral-400 font-medium">ตรวจสภาพ (Chassis)</span>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={car.images?.extra}
                  alt="Inspection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Key Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900/80 p-6 rounded-3xl border border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-black bg-red-600 text-white uppercase">
                Civic {car.gen}
              </span>
              <span className="text-xs text-neutral-400 font-semibold">{car.color}</span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {car.title}
            </h1>

            <div className="mt-4 pb-4 border-b border-neutral-800">
              <span className="text-xs text-neutral-400 block">ราคาจำหน่ายพิเศษ</span>
              <span className="text-3xl font-black text-white tracking-tight">
                ฿{car.price.toLocaleString()}
              </span>
            </div>

            {/* Payment Banner */}
            <div className="mt-4">
              {isCashOnly ? (
                <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>ขายสดเท่านั้น (Cash Only)</span>
                  </div>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    {car.cashOnlyReason ||
                      'คันนี้เป็นสเปกซิ่งปีลึก ทางร้านจัดจำหน่ายตัดสดราคาพิเศษ เล่มพร้อมโอนทันที'}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 space-y-1">
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      จัดไฟแนนซ์ได้
                    </span>
                    <span className="text-emerald-400 font-black text-lg">
                      ~฿{car.estimatedMonthlyPayment?.toLocaleString()}/ด.
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200/80">
                    คำนวณค่างวดผ่อน 72 งวด (เงินดาวน์มาตรฐาน 15% ดอกเบี้ยคงที่ 2.79% รวม VAT 7%)
                  </p>
                </div>
              )}
            </div>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 gap-3 mt-5 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-[10px] text-neutral-500">ปีจดทะเบียน</div>
                  <div className="font-semibold">{car.year}</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                <Gauge className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-[10px] text-neutral-500">ระยะทางไมล์แท้</div>
                  <div className="font-semibold">{car.mileage.toLocaleString()} กม.</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                <Cog className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-[10px] text-neutral-500">ระบบเกียร์</div>
                  <div className="font-semibold truncate">{car.transmission}</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-red-500" />
                <div>
                  <div className="text-[10px] text-neutral-500">รหัสเครื่องยนต์</div>
                  <div className="font-semibold truncate">{car.engineCode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col gap-2.5">
            <a
              href="tel:0891234567"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>โทรปรึกษาฝ่ายขาย: 089-123-4567</span>
            </a>
            <a
              href="https://line.me/ti/p/~civichubth"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-950"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ติดต่อจองคิวทาง LINE: @civichubth</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4-Box Structured Inspection Breakdown */}
      <div className="space-y-4 pt-6 border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-white">
            รายงานการตรวจสภาพ 175 จุดเชิงลึก (Certified 175-Point Inspection)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-red-400">1. การตรวจสภาพตัวถังและสีภายนอก (Exterior)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{car.specs?.exteriorDesc}</p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-red-400">2. การตรวจสภาพห้องโดยสารและระบบไฟฟ้า (Interior)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{car.specs?.interiorDesc}</p>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-red-400">3. การตรวจเครื่องยนต์ เกียร์ และช่วงล่าง (Engine & Drivetrain)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{car.specs?.engineDesc}</p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/60 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400">4. การันตีโครงสร้างหลัก 100% ไม่เคยชนหนัก (Chassis Guarantee)</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">{car.specs?.chassisGuarantee}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
