'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { GenerationTabs } from '../components/GenerationTabs';
import { PaymentFilter } from '../components/PaymentFilter';
import { CarCard } from '../components/CarCard';
import { CarDetailModal } from '../components/CarDetailModal';
import { Car, Generation, PaymentType, ConditionStyle } from '../types';
import { fetchCars } from '../services/api';
import { CarFront, Filter } from 'lucide-react';

export default function ShowroomCatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedGen, setSelectedGen] = useState<Generation | 'ALL'>('ALL');
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | 'ALL'>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<ConditionStyle | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Car Detail Modal
  const [activeCarModal, setActiveCarModal] = useState<Car | null>(null);

  // Initial load
  useEffect(() => {
    fetchCars().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  // Filtered cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Gen match
      if (selectedGen !== 'ALL' && car.gen !== selectedGen) return false;

      // Payment match
      if (selectedPayment !== 'ALL' && car.paymentType !== selectedPayment) return false;

      // Condition match
      if (selectedCondition !== 'ALL' && car.conditionStyle !== selectedCondition) return false;

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = car.title.toLowerCase().includes(q);
        const matchEngine = car.engineCode.toLowerCase().includes(q);
        const matchColor = car.color.toLowerCase().includes(q);
        const matchGen = `civic ${car.gen}`.toLowerCase().includes(q);
        return matchTitle || matchEngine || matchColor || matchGen;
      }

      return true;
    });
  }, [cars, selectedGen, selectedPayment, selectedCondition, searchQuery]);

  // Statistics for quick count badges
  const stats = useMemo(() => {
    const total = cars.length;
    const financeCount = cars.filter((c) => c.paymentType === 'FINANCE').length;
    const cashCount = cars.filter((c) => c.paymentType === 'CASH_ONLY').length;
    return { total, financeCount, cashCount };
  }, [cars]);

  return (
    <div>
      {/* High-Impact Hero Banner */}
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Filter & Showroom Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Step 1: Generation Tabs (1-Click Selector) */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 sm:p-5 shadow-lg">
          <GenerationTabs selectedGen={selectedGen} onSelectGen={setSelectedGen} />
        </div>

        {/* Step 2: Payment Type & Condition Style Filter */}
        <PaymentFilter
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
        />

        {/* Results Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <CarFront className="w-4 h-4 text-red-500" />
            <span>
              พบทั้งหมด <strong className="text-white font-bold">{filteredCars.length}</strong> คัน
              {selectedGen !== 'ALL' && ` (โฉม ${selectedGen})`}
              {selectedPayment !== 'ALL' &&
                ` [${selectedPayment === 'FINANCE' ? 'จัดไฟแนนซ์ได้' : 'ขายสดเท่านั้น'}]`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500">หมวดหมู่ทั้งหมดในสต็อก:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              จัดไฟแนนซ์: {stats.financeCount}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
              ตัดสด: {stats.cashCount}
            </span>
          </div>
        </div>

        {/* Car Catalog Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-neutral-400 text-sm">กำลังโหลดข้อมูลสต็อกรถ Civic Hub...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
              <Filter className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">ไม่พบรถตามเงื่อนไขที่ท่านเลือก</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              ลองปรับเปลี่ยนตัวกรองโฉมรถ หรือรีเซ็ตประเภทการชำระเงินเป็น &apos;ทั้งหมด&apos; เพื่อดูสต็อกรถที่มีอยู่
            </p>
            <button
              onClick={() => {
                setSelectedGen('ALL');
                setSelectedPayment('ALL');
                setSelectedCondition('ALL');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onOpenDetails={setActiveCarModal} />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Detail Modal with Multi-Angle Gallery & 4-Box Inspection */}
      <CarDetailModal car={activeCarModal} onClose={() => setActiveCarModal(null)} />
    </div>
  );
}
