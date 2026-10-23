'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-red-900/40 group-hover:bg-red-500 transition-colors">
            H
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white tracking-tight text-lg">CIVIC HUB</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/50">
                THAILAND
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 tracking-wider">
              โชว์รูมฮอนด้าซีวิคมือสอง FD • FB • FC • FK • FE
            </div>
          </div>
        </Link>

        {/* Quick Trust Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ตรวจเช็ก 175 จุด • รับประกันเครื่องเกียร์ 1 ปีเต็ม</span>
        </div>

        {/* Contact Dials */}
        <div className="flex items-center gap-2.5">
          <a
            href="tel:0891234567"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">089-123-4567</span>
          </a>

          <a
            href="https://line.me/ti/p/~civichubth"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors shadow-md shadow-emerald-950"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>LINE: @civichubth</span>
          </a>
        </div>
      </div>
    </header>
  );
};
