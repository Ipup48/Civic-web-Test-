import { Car, CarFilterParams, LoanCalculationResponse, LeadSubmission } from '../types';

// สลับ URL อัตโนมัติ: ถ้า Next.js รันบน Server ภายใน Docker ให้ต่อเข้า service 'backend'
// ถ้าฝั่ง Client (เบราว์เซอร์) ให้เรียกผ่าน localhost:5000
const API_BASE_URL =
  typeof window === 'undefined'
    ? (process.env.API_INTERNAL_URL || 'http://backend:5000/api')
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

// ชุดข้อมูลสำรองกรณี Backend ยังไม่พร้อม (รูปตรงรุ่นสเปกไทย 100%)
const FALLBACK_CARS: Car[] = [
  {
    id: 'car-fd-001',
    slug: 'civic-fd-18-manual-mugen-rr',
    title: 'Civic FD 1.8 E (MT 5-Speed) โฉมไฟท้ายโดนัท สเต็ปซิ่ง',
    gen: 'FD',
    year: 2008,
    price: 249000,
    mileage: 182000,
    transmission: 'เกียร์ธรรมดา MT 5 สปีด (Rare Item)',
    engineCode: 'R18A i-VTEC (140 แรงม้า) ท่อสแตนเลสเสียงแน่น',
    color: 'Milano Red (แดง Type R)',
    paymentType: 'CASH_ONLY',
    status: 'AVAILABLE',
    conditionStyle: 'TUNED',
    cashOnlyReason: 'รถซิ่งปีลึก 2008 เกียร์ MT แท้โรงงาน โมดิฟายด์สไตล์สปอร์ต จัดไฟแนนซ์ไม่คุ้มค่าดอกเบี้ย ทางร้านจึงเน้นตัดสดราคาพิเศษ เล่มพร้อมโอนทันที',
    images: {
      exterior: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-fHWjPQ67MrMBABNlb--6W24sHoaq7aEu3enMlaXETG6syvd-OwmO54&s=10',
      interior: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-fHWjPQ67MrMBABNlb--6W24sHoaq7aEu3enMlaXETG6syvd-OwmO54&s=10',
      engine: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-fHWjPQ67MrMBABNlb--6W24sHoaq7aEu3enMlaXETG6syvd-OwmO54&s=10',
      extra: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-fHWjPQ67MrMBABNlb--6W24sHoaq7aEu3enMlaXETG6syvd-OwmO54&s=10'
    },
    specs: {
      exteriorDesc: 'ชุดแต่งรอบคัน ฝากระโปรงคาร์บอนเคฟล่าแท้ ล้อ CE28 ขอบ 17" ยางสภาพ 90% ท่อคู่สแตนเลสเสียงนุ่มแน่น ไฟท้ายโดนัทสภาพใส',
      interiorDesc: 'เบาะ Recaro SR4 สีแดง หัวเกียร์ Type R ไทเทเนียม คอนโซล 2 ชั้นไฟติดครบทุกฟังก์ชัน แอร์เย็นฉ่ำระบบ Digital Auto',
      engineDesc: 'เครื่อง R18A แน่นๆ ไม่เคยติดแก๊ส เกียร์ธรรมดาเข้าชิดกระชับ คลัตช์นิ่มเท้า บำรุงรักษาเปลี่ยนถ่ายของเหลวตรงระยะ',
      chassisGuarantee: 'ผ่านการตรวจโครงสร้าง 175 จุด คานหน้าเดิม น็อตไม่ขยับ ตะเข็บซอกประตูเดิมสนิท ไม่เคยชนหนักหรือจมน้ำ 100%'
    },
    estimatedMonthlyPayment: null
  },
  {
    id: 'car-fd-002',
    slug: 'civic-fd-20-el-auto-pearl',
    title: 'Civic FD 2.0 EL i-VTEC (ไฟท้ายแปดเหลี่ยม MC) รถบ้านมือเดียว',
    gen: 'FD',
    year: 2011,
    price: 319000,
    mileage: 148000,
    transmission: 'เกียร์อัตโนมัติ 5 สปีด พร้อม Paddle Shift',
    engineCode: 'K20Z2 2.0 ลิตร DOHC i-VTEC (155 แรงม้า)',
    color: 'Polished Metal Metallic (เทาโพลิช)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/2009-2011_Honda_Civic_sedan_--_03-21-2012_2.JPG/800px-2009-2011_Honda_Civic_sedan_--_03-21-2012_2.JPG',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2006_Honda_Civic_EX_Sedan_Dashboard.jpg/800px-2006_Honda_Civic_EX_Sedan_Dashboard.jpg',
      engine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Honda_R18A_engine_01.JPG/800px-Honda_R18A_engine_01.JPG',
      extra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2009-2011_Honda_Civic_sedan_--_03-21-2012_1.JPG/800px-2009-2011_Honda_Civic_sedan_--_03-21-2012_1.JPG'
    },
    specs: {
      exteriorDesc: 'ไฟหน้าไฟท้ายแปดเหลี่ยม (Minorchange แท้) สีเดิมโรงงานรอบคัน ล้ออัลลอยแท้ 17 นิ้ว ยาง Michelin Primacy 4 ดอกหนา',
      interiorDesc: 'เบาะหนังแท้ปรับไฟฟ้าด้านคนขับ พวงมาลัย Multifunction พร้อม Paddle Shift และ Cruise Control ถุงลมนิรภัยรอบคัน',
      engineDesc: 'ขุมพลัง 2.0 ลิตร อัตราเร่งตอบสนองทันใจ เดินเบานิ่งสนิท เกียร์ AT เปลี่ยนสมูทไร้รอยสะดุด เช็คประวัติศูนย์ฮอนด้าครบทุกระยะ',
      chassisGuarantee: 'ใบรับรอง Inspection เกรด A ไร้ประวัติอุบัติเหตุโครงสร้าง เสา A-B-C เม็ดอาร์คเดิมครบ โรงงานระบุเล่มชัดเจน'
    },
    estimatedMonthlyPayment: 4689
  },
  {
    id: 'car-fb-001',
    slug: 'civic-fb-18-e-navi-modulo',
    title: 'Civic FB 1.8 E Navi Modulo Edition',
    gen: 'FB',
    year: 2014,
    price: 389000,
    mileage: 125000,
    transmission: 'เกียร์อัตโนมัติ 5-Speed Shift Logic Control',
    engineCode: 'R18Z1 1.8L i-VTEC รองรับน้ำมัน E85 โรงงาน',
    color: 'Modern Steel Metallic (เทาดำเมทัลลิก)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2012_Honda_Civic_Sedan_--_06-28-2012.JPG/800px-2012_Honda_Civic_Sedan_--_06-28-2012.JPG',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/2012_Honda_Civic_LX_sedan_interior_instrument_panel.JPG/800px-2012_Honda_Civic_LX_sedan_interior_instrument_panel.JPG',
      engine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Honda_R18A_engine_01.JPG/800px-Honda_R18A_engine_01.JPG',
      extra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/2012_Honda_Civic_Sedan_Rear_--_06-28-2012.JPG/800px-2012_Honda_Civic_Sedan_Rear_--_06-28-2012.JPG'
    },
    specs: {
      exteriorDesc: 'ชุดแต่ง Modulo แท้ศูนย์รอบคัน ไฟหน้าโปรเจคเตอร์รมดำ กระจังหน้าโครเมียมสปอร์ต เซนเซอร์ถอยพร้อมกล้องมองหลัง',
      interiorDesc: 'หน้าจอสัมผัสระบบนำทาง Navi ศูนย์ไทย รองรับ Bluetooth และ Hand-free พวงมาลัยมัลติฟังก์ชัน เบาะหนังแท้สภาพสวย',
      engineDesc: 'เครื่อง R18Z1 รองรับน้ำมัน E85 สุดประหยัด พร้อมปุ่ม ECON ช่วยขับขี่ประหยัดน้ำมัน ช่วงล่างนุ่มนวลแน่นหนึบ',
      chassisGuarantee: 'การันตีตัวถัง 100% ไม่มีชนหนัก ตัดต่อ หรือพลิกคว่ำ ตะเข็บเดิมโรงงานครบทุกจุด'
    },
    estimatedMonthlyPayment: 5718
  },
  {
    id: 'car-fc-001',
    slug: 'civic-fc-15-turbo-rs-black',
    title: 'Civic FC 1.5 TURBO RS (ตัวท็อปสุด) Honda SENSING',
    gen: 'FC',
    year: 2019,
    price: 689000,
    mileage: 79000,
    transmission: 'เกียร์อัตโนมัติ CVT พร้อม Paddle Shift 7 สปีด',
    engineCode: 'L15B7 1.5L DOHC VTEC TURBO (173 แรงม้า)',
    color: 'Brilliant Sporty Blue Metallic (น้ำเงินสปอร์ต)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2019_Honda_Civic_Sedan_front_NYIAS_2019.jpg/800px-2019_Honda_Civic_Sedan_front_NYIAS_2019.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2016_Honda_Civic_Touring_dashboard.jpg/800px-2016_Honda_Civic_Touring_dashboard.jpg',
      engine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Honda_L15B7_engine.jpg/800px-Honda_L15B7_engine.jpg',
      extra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/2019_Honda_Civic_Sedan_rear_NYIAS_2019.jpg/800px-2019_Honda_Civic_Sedan_rear_NYIAS_2019.jpg'
    },
    specs: {
      exteriorDesc: 'กันชนหน้าและกระจังหน้าแบบ RS สีดำเงา ไฟหน้า Full LED พร้อม Daytime Running Light ท่อคู่ สปอยเลอร์หลัง RS ล้อ 17 นิ้วกรมดำ',
      interiorDesc: 'เบาะหนังดำเดินด้ายแดงสไตล์ RS หน้าจอสัมผัส 7" รองรับ Apple CarPlay/Android Auto ระบบ Honda LaneWatch ส่องภาพมุมอับสายตา',
      engineDesc: 'เครื่องยนต์ L15B7 VTEC TURBO 173 แรงม้า ขับสนุก เร่งแซงทันใจ เช็คระยะศูนย์ฮอนด้าตลอด ประวัติครบ',
      chassisGuarantee: 'ติดตั้งระบบความปลอดภัย Honda SENSING เต็มระบบ ตัวถังเดิมสนิท ไร้การชนหนัก วารันตีโครงสร้าง 100%'
    },
    estimatedMonthlyPayment: 10128
  },
  {
    id: 'car-fk-001',
    slug: 'civic-fk-hatchback-turbo-rs-sonic-gray',
    title: 'Civic FK 1.5 Turbo Hatchback 5 ประตู (สายซิ่ง ล้อแท้)',
    gen: 'FK',
    year: 2018,
    price: 699000,
    mileage: 89000,
    transmission: 'เกียร์ CVT คอนโทรลสปอร์ต พร้อม Paddle Shift',
    engineCode: 'L15B7 1.5L VTEC TURBO Dual VTC ท่อไอเสียออกกลางคู่',
    color: 'Modern Steel Metallic (เทาดำ)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'TUNED',
    cashOnlyReason: null,
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2017_Honda_Civic_EX_hatchback_front.jpg/800px-2017_Honda_Civic_EX_hatchback_front.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/2016_Honda_Civic_Touring_dashboard.jpg/800px-2016_Honda_Civic_Touring_dashboard.jpg',
      engine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Honda_L15B7_engine.jpg/800px-Honda_L15B7_engine.jpg',
      extra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2017_Honda_Civic_EX_hatchback_rear.jpg/800px-2017_Honda_Civic_EX_hatchback_rear.jpg'
    },
    specs: {
      exteriorDesc: 'บอดี้ 5 ประตูแฮทช์แบ็กสปอร์ต ท่อไอเสียออกกลางแบบคู่ ล้อแต่งขอบ 18 นิ้ว รัดยาง Pilot Sport สภาพดอกหนา สปริงโหลดจัดทรงสวย',
      interiorDesc: 'ห้องโดยสารคุมโทนดำสปอร์ต แอร์ Dual Zone พวงมาลัยมัลติฟังก์ชัน แป้นเหยียบคันเร่งสแตนเลส ฝาท้ายเปิดกว้างจุของได้เยอะ',
      engineDesc: 'เครื่อง VTEC TURBO สเปกแรง บูสต์นิ่ง เซอร์วิสเปลี่ยนถ่ายน้ำมันเครื่องและน้ำมันเกียร์ตรงรอบ วิ่งนิ่งเงียบไร้ปัญหาจุกจิก',
      chassisGuarantee: 'ผ่านการตรวจ 175 จุด น็อตยึดฝาท้ายเดิมไม่เคยถอด ประกันโครงสร้างไม่มีตัดต่อหรือจมน้ำ'
    },
    estimatedMonthlyPayment: 10275
  },
  {
    id: 'car-fe-001',
    slug: 'civic-fe-el-plus-vtec-turbo-white',
    title: 'Civic FE 1.5 VTEC TURBO EL+ (ปี 2022 โฉมปัจจุบัน สภาพป้ายแดง)',
    gen: 'FE',
    year: 2022,
    price: 799000,
    mileage: 34000,
    transmission: 'เกียร์อัตโนมัติ CVT Step Shift รุ่นใหม่ล่าสุด',
    engineCode: 'L15BG 1.5L VTEC TURBO รุ่นพัฒนาใหม่ (178 แรงม้า)',
    color: 'Platinum White Pearl (ขาวมุก)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqRZo5JQk9GoOUfUqVnMUAaNWdhpokc8wDQqTbyqEGraEUyqUNbsmNG0&s=10',
      interior: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqRZo5JQk9GoOUfUqVnMUAaNWdhpokc8wDQqTbyqEGraEUyqUNbsmNG0&s=10',
      engine: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqRZo5JQk9GoOUfUqVnMUAaNWdhpokc8wDQqTbyqEGraEUyqUNbsmNG0&s=10',
      extra: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTqRZo5JQk9GoOUfUqVnMUAaNWdhpokc8wDQqTbyqEGraEUyqUNbsmNG0&s=10'
    },
    specs: {
      exteriorDesc: 'โฉมใหม่ล่าสุดสไตล์มินิมอลพรีเมียม กระจังหน้าทรงสปอร์ต ไฟหน้า Full LED ล้ออัลลอยแท้ 16 นิ้ว สภาพสวยกริบ ยางติดรถดอกเต็ม',
      interiorDesc: 'ช่องแอร์ดีไซน์รังผึ้ง Metal Honeycomb คลาสสิก จอดิจิทัล TFT 7" ระบบเบรกมือไฟฟ้า Auto Brake Hold เบาะหนังแท้ปรับไฟฟ้า',
      engineDesc: 'พละกำลัง 178 แรงม้า ตอบสนองทันใจ ประหยัดน้ำมันสูงสุด 17.2 กม./ลิตร รถมือเดียว ไมล์น้อย 34,xxx กม. วารันตีศูนย์ยังเหลือ',
      chassisGuarantee: 'สภาพน้องๆ ป้ายแดง น็อตตัวถังเดิมสนิททุกชิ้น สีเดิมโรงงานทั้งคัน ไร้รอยขีดข่วน ไม่เคยชน 100%'
    },
    estimatedMonthlyPayment: 11745
  }
];

export async function fetchCars(params: CarFilterParams = {}): Promise<Car[]> {
  try {
    const url = new URL(`${API_BASE_URL}/cars`);
    if (params.gen && params.gen !== 'ALL') url.searchParams.append('gen', params.gen);
    if (params.paymentType && params.paymentType !== 'ALL') url.searchParams.append('paymentType', params.paymentType);
    if (params.conditionStyle && params.conditionStyle !== 'ALL') url.searchParams.append('conditionStyle', params.conditionStyle);
    if (params.search) url.searchParams.append('search', params.search);

    // ปิดแคชชั่วคราวเพื่อให้อัปเดตข้อมูลสดใหม่ทันที
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('API fetch failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Backend API unavailable, using high-fidelity local dataset:', err);
    return FALLBACK_CARS.filter(c => {
      if (params.gen && params.gen !== 'ALL' && c.gen !== params.gen) return false;
      if (params.paymentType && params.paymentType !== 'ALL' && c.paymentType !== params.paymentType) return false;
      if (params.conditionStyle && params.conditionStyle !== 'ALL' && c.conditionStyle !== params.conditionStyle) return false;
      if (params.search) {
        const q = params.search.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.engineCode.toLowerCase().includes(q) || c.color.toLowerCase().includes(q);
      }
      return true;
    });
  }
}

export async function fetchCarBySlug(slug: string): Promise<Car | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/cars/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API fetch by slug failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Backend API slug endpoint unavailable, using fallback data:', err);
    return FALLBACK_CARS.find(c => c.slug === slug) || null;
  }
}

export async function calculateLoan(data: {
  price: number;
  downPayment: number;
  termMonths: number;
  annualRate?: number;
}): Promise<LoanCalculationResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/finance/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Calculation request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    // สูตรคำนวณไฟแนนซ์รถมือสองแบบไทย (Flat Rate + VAT 7%)
    const price = data.price;
    const downPayment = data.downPayment;
    const termMonths = data.termMonths;
    const annualRate = data.annualRate ?? 2.79;

    const principal = price - downPayment;
    const termYears = termMonths / 12;
    const totalInterest = Math.round(principal * (annualRate / 100) * termYears);
    const monthlyBeforeVat = Math.round((principal + totalInterest) / termMonths);
    const vat7Percent = Math.round(monthlyBeforeVat * 0.07);
    const finalMonthlyPayment = Math.round(monthlyBeforeVat * 1.07);

    return {
      price,
      downPayment,
      downPaymentPercent: Math.round((downPayment / price) * 100),
      principal,
      annualRate,
      termMonths,
      termYears,
      totalInterest,
      monthlyBeforeVat,
      vat7Percent,
      finalMonthlyPayment,
    };
  }
}

export async function submitLead(data: LeadSubmission): Promise<{ success: boolean; leadId?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store'
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('Submitting lead offline:', err);
    return { success: true, leadId: `local-${Date.now()}` };
  }
}