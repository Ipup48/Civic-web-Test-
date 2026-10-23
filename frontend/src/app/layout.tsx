import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Civic Hub Thailand | ศูนย์รวมรถฮอนด้าซีวิคมือสอง FD, FB, FC, FK, FE คุณภาพสูง',
  description:
    'โชว์รูมเฉพาะทาง Honda Civic มือสองอันดับ 1 ในไทย คัดสรรรุ่น FD, FB, FC, FK, FE แยกหมวดหมู่จัดไฟแนนซ์ได้และขายสดชัดเจน ตรวจสภาพ 175 จุด วารันตี 1 ปีเต็ม',
  keywords: [
    'Civic มือสอง',
    'Civic FD',
    'Civic FB',
    'Civic FC',
    'Civic FK',
    'Civic FE',
    'Honda Civic มือสองสภาพดี',
    'Civic Type R',
    'Civic Turbo RS มือสอง',
    'ซื้อขาย Civic มือสอง',
  ],
  openGraph: {
    title: 'Civic Hub Thailand | The Specialist in Honda Civic FD to FE',
    description:
      'ศูนย์รวมฮอนด้าซีวิคมือสองสภาพนางฟ้าและรถแต่งสปอร์ต ตรวจสภาพโครงสร้าง 175 จุด พร้อมระบบคำนวณค่างวดผ่อนไทยแท้',
    url: 'https://civichubthailand.com',
    siteName: 'Civic Hub Thailand',
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-800/80 bg-neutral-950 py-10 text-xs text-neutral-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-xs">
                H
              </span>
              <span className="font-bold text-white tracking-wider">CIVIC HUB THAILAND</span>
              <span>— ผู้เชี่ยวชาญ Honda Civic FD, FB, FC, FK, FE</span>
            </div>
            <div>© {new Date().getFullYear()} Civic Hub Thailand. All rights reserved. สงวนลิขสิทธิ์</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
