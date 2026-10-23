import { prisma } from '../config/db.js';
import { Car, CarFilterQuery, Generation, PaymentType, ConditionStyle, CarStatus } from '../types/index.js';
import { FinanceService } from './financeService.js';

// Fallback in-memory dataset if database table is initializing or offline
const fallbackCars: Car[] = [
  {
    id: 'car-fd-001',
    slug: 'civic-fd-18-manual-mugen-rr',
    title: 'Civic FD 1.8 E (MT 5-Speed) Mugen RR Style',
    gen: 'FD',
    year: 2008,
    price: 249000,
    mileage: 182000,
    transmission: 'เกียร์ธรรมดา MT 5 สปีด (Rare Item)',
    engineCode: 'R18A i-VTEC (140 แรงม้า) ท่อสแตนเลสทรง Mugen',
    color: 'Milano Red (แดง Type R)',
    paymentType: 'CASH_ONLY',
    status: 'AVAILABLE',
    conditionStyle: 'TUNED',
    cashOnlyReason: 'รถซิ่งปีลึก 2008 เกียร์ MT แท้โรงงาน โมดิฟายด์สไตล์สปอร์ต จัดไฟแนนซ์ไม่คุ้มค่าดอกเบี้ย ทางร้านจึงเน้นตัดสดราคาพิเศษ เล่มพร้อมโอนทันที',
    images: {
      exterior: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'ชุดแต่ง Mugen RR รอบคัน ฝากระโปรงคาร์บอนเคฟล่าแท้ ล้อ CE28 ขอบ 17" รัดยาง Dunlop Direzza สภาพ 90% ท่อคู่สแตนเลสเสียงนุ่มแน่น',
      interiorDesc: 'เบาะ Recaro SR4 สีแดงแท้ หัวเกียร์ Type R ไทเทเนียม คอนโซล 2 ชั้นไฟติดครบทุกฟังก์ชัน แอร์เย็นฉ่ำระบบ Digital Auto',
      engineDesc: 'เครื่อง R18A แน่นๆ ไม่เคยดมแก๊ส เกียร์ธรรมดาเข้าชิดกระชับ คลัตช์ Exedy นิ่มเท้า บำรุงรักษาเปลี่ยนถ่ายของเหลว Motul ทุก 5,000 กม.',
      chassisGuarantee: 'ผ่านการตรวจโครงสร้าง 175 จุด คานหน้าเดิม น็อตไม่ขยับ ตะเข็บซอกประตูเดิมสนิท ไม่เคยชนหนักหรือจมน้ำ 100%'
    }
  },
  {
    id: 'car-fd-002',
    slug: 'civic-fd-20-el-auto-pearl',
    title: 'Civic FD 2.0 EL i-VTEC (Top Option) รถบ้านมือเดียว',
    gen: 'FD',
    year: 2011,
    price: 319000,
    mileage: 148000,
    transmission: 'เกียร์อัตโนมัติ 5 สปีด พร้อม Paddle Shift',
    engineCode: 'K20Z2 2.0 ลิตร DOHC i-VTEC (155 แรงม้า)',
    color: 'White Pearl (ขาวมุก)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'ไฟหน้าไฟท้ายแปดเหลี่ยม (MC แท้) สีเดิมโรงงานรอบคัน มีเคลือบแก้วเซรามิก ล้ออัลลอยแท้ศูนย์ 17 นิ้ว ยาง Michelin Primacy 4 ดอกหนา',
      interiorDesc: 'เบาะหนังแท้สีดำปรับไฟฟ้าด้านคนขับ พวงมาลัย Multifunction พร้อมปุ่มควบคุม Paddle Shift Cruise Control ถุงลมนิรภัย 4 ใบ',
      engineDesc: 'ขุมพลัง K20Z2 2.0 ลิตร อัตราเร่งตอบสนองทันใจ เดินเบานิ่งสนิท เกียร์ AT เปลี่ยนสมูทไร้รอยสะดุด เช็คประวัติศูนย์ฮอนด้าครบทุกระยะ',
      chassisGuarantee: 'ใบรับรอง Inspection เกรด A ไร้ประวัติอุบัติเหตุโครงสร้าง เสา A-B-C เม็ดอาร์คเดิมครบ โรงงานระบุเล่มชัดเจน'
    }
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
      exterior: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'ชุดแต่ง Modulo แท้ศูนย์รอบคัน ไฟหน้าโปรเจคเตอร์รมดำ กระจังหน้าโครเมียมสปอร์ต เซนเซอร์ถอย 4 จุดพร้อมกล้องมองหลัง',
      interiorDesc: 'หน้าจอสัมผัสระบบนำทาง Navi ศูนย์ไทย รองรับ Bluetooth และ Hand-free พวงมาลัยมัลติฟังก์ชัน เบาะหนังแท้ปรับสภาพสปาแล้ว',
      engineDesc: 'เครื่อง R18Z1 รองรับน้ำมัน E85 สุดประหยัด พร้อมโหมด ECON ช่วยขับขี่ประหยัดน้ำมัน ช่วงล่างนุ่มนวลแน่นหนึบ',
      chassisGuarantee: 'การันตีตัวถัง 100% ไม่มีชนหนัก ตัดต่อ หรือพลิกคว่ำ มีใบ Certificate จากสถาบันตรวจสภาพรถยนต์อิสระ'
    }
  },
  {
    id: 'car-fc-001',
    slug: 'civic-fc-15-turbo-rs-black',
    title: 'Civic FC 1.5 TURBO RS (ท็อปสุด) ชุดแต่ง Type R Carbon',
    gen: 'FC',
    year: 2019,
    price: 689000,
    mileage: 79000,
    transmission: 'เกียร์อัตโนมัติ CVT พร้อม Paddle Shift 7 สปีด',
    engineCode: 'L15B7 1.5L DOHC VTEC TURBO (173 แรงม้า)',
    color: 'Crystal Black Pearl (ดำมุก)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'TUNED',
    cashOnlyReason: null,
    images: {
      exterior: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'ชุดแต่งรอบคันสไตล์ Type R สปอยเลอร์หลังทรงสูง กระจังหน้า RS สีดำเงา ไฟหน้า Full LED พร้อม Daytime Running Light',
      interiorDesc: 'เบาะหนังดำเดินด้ายแดงสไตล์ RS หน้าจอทัชสกรีน 7" รองรับ Apple CarPlay/Android Auto ระบบ Honda LaneWatch กล้องส่องภาพมุมอับ',
      engineDesc: 'เครื่องยนต์ L15B7 VTEC TURBO ขับสนุก เร่งแซงทันใจ ติดตั้ง Intercooler เพิ่มประสิทธิภาพ การบำรุงรักษาสม่ำเสมอที่ศูนย์ฮอนด้า',
      chassisGuarantee: 'โครงสร้างเกรดพรีเมียม ผ่านมาตรฐาน 175 จุดรับประกัน เครื่องและเกียร์ 1 ปีเต็มจากทางศูนย์โชว์รูม Civic Hub'
    }
  },
  {
    id: 'car-fk-001',
    slug: 'civic-fk-hatchback-turbo-rs-sonic-gray',
    title: 'Civic FK 1.5 Turbo RS Hatchback 5 ประตู (สีพิเศษ Sonic Gray)',
    gen: 'FK',
    year: 2020,
    price: 849000,
    mileage: 56000,
    transmission: 'เกียร์ CVT คอนโทรลสปอร์ต พร้อม Paddle Shift',
    engineCode: 'L15BG 1.5L VTEC TURBO Dual VTC ท่อไอเสียออกกลางคู่',
    color: 'Sonic Gray Pearl (เทาโซนิคพิเศษ)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'บอดี้ 5 ประตูแฮทช์แบ็กสปอร์ตแท้ ท่อไอเสียคู่กลางแบบสปอร์ตโรงงาน ล้ออัลลอย RS ขนาด 17 นิ้วรมดำ สภาพกริ๊บไร้รอยขีดข่วน',
      interiorDesc: 'ระบบความปลอดภัย Honda SENSING ครบชุด ระบบปรับอากาศ Dual Zone แป้นเหยียบคันเร่งสแตนเลสสปอร์ต ฝาท้ายจุสัมภาระได้อเนกประสงค์',
      engineDesc: 'เครื่อง VTEC TURBO สเปกแรง 173 แรงม้า เช็กระยะศูนย์ฮอนด้าตลอด ไมล์แท้ 100% ตรวจสอบสมุดคู่มือและ Book Service ได้ทันที',
      chassisGuarantee: 'ตรวจเช็กประวัติย้อนหลัง 100% ตัวถังเดิมบาง น็อตไม่ขยับ รับประกันวารันตีศูนย์ฮอนด้าต่อเนื่อง'
    }
  },
  {
    id: 'car-fe-001',
    slug: 'civic-fe-el-plus-vtec-turbo-ignite-red',
    title: 'Civic FE 1.5 VTEC TURBO EL+ (ปี 2022 โฉมปัจจุบัน)',
    gen: 'FE',
    year: 2022,
    price: 799000,
    mileage: 38000,
    transmission: 'เกียร์อัตโนมัติ CVT Step Shift',
    engineCode: 'L15B7 VTEC TURBO รุ่นพัฒนาใหม่ (178 แรงม้า)',
    color: 'Ignite Red Metallic (แดงเมทัลลิก)',
    paymentType: 'FINANCE',
    status: 'AVAILABLE',
    conditionStyle: 'STOCK',
    cashOnlyReason: null,
    images: {
      exterior: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
      interior: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      engine: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
      extra: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    },
    specs: {
      exteriorDesc: 'โฉมใหม่ล่าสุดเส้นสายเรียบหรูสไตล์ยุโรป กระจังหน้าแนวยาว ไฟหน้า LED ดีไซน์เฉียบคม กุญแจ Honda Smart Keyless พร้อม Remote Engine Start',
      interiorDesc: 'ช่องแอร์ดีไซน์รังผึ้ง Honeycomb สวยงามพรีเมียม จอดิจิทัล TFT 7" ระบบเบรกมือไฟฟ้า Auto Brake Hold เบาะหนังแท้รอบคัน',
      engineDesc: 'พละกำลัง 178 แรงม้า ตอบสนองไวที่สุดในตระกูล Civic ประหยัดน้ำมันสูงสุด 17.2 กม./ลิตร รถมือเดียว ไมล์น้อย 38,xxx กม.',
      chassisGuarantee: 'สภาพป้ายแดง รถไม่เคยมีอุบัติเหตุแม้แต่ชิ้นเดียว มีสติกเกอร์ QC และแต้มสีเดิมจากโรงงานครบทุกตำแหน่ง'
    }
  }
];

export class CarService {
  /**
   * Retrieves cars with filtering options and calculates monthly finance estimates
   */
  public static async getCars(filter: CarFilterQuery = {}): Promise<Car[]> {
    try {
      const whereClause: any = {};

      if (filter.gen) {
        whereClause.gen = filter.gen;
      }
      if (filter.paymentType) {
        whereClause.paymentType = filter.paymentType;
      }
      if (filter.conditionStyle) {
        whereClause.conditionStyle = filter.conditionStyle;
      }
      if (filter.search) {
        whereClause.OR = [
          { title: { contains: filter.search, mode: 'insensitive' } },
          { engineCode: { contains: filter.search, mode: 'insensitive' } },
          { color: { contains: filter.search, mode: 'insensitive' } },
        ];
      }

      const records = await prisma.car.findMany({
        where: whereClause,
        include: {
          images: true,
          specs: true,
        },
        orderBy: {
          year: 'desc',
        },
      });

      if (records && records.length > 0) {
        return records.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          gen: c.gen as Generation,
          year: c.year,
          price: c.price,
          mileage: c.mileage,
          transmission: c.transmission,
          engineCode: c.engineCode,
          color: c.color,
          paymentType: c.paymentType as PaymentType,
          status: c.status as CarStatus,
          conditionStyle: c.conditionStyle as ConditionStyle,
          cashOnlyReason: c.cashOnlyReason,
          images: c.images ? {
            exterior: c.images.exterior,
            interior: c.images.interior,
            engine: c.images.engine,
            extra: c.images.extra,
          } : undefined,
          specs: c.specs ? {
            exteriorDesc: c.specs.exteriorDesc,
            interiorDesc: c.specs.interiorDesc,
            engineDesc: c.specs.engineDesc,
            chassisGuarantee: c.specs.chassisGuarantee,
          } : undefined,
          estimatedMonthlyPayment: FinanceService.estimateDefaultMonthly(
            c.price,
            c.paymentType === 'CASH_ONLY'
          ),
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }));
      }
    } catch (err) {
      console.warn('Database query bypassed, serving structured fallback cache:', err);
    }

    // Filter fallback in-memory cache
    return fallbackCars
      .filter((car) => {
        if (filter.gen && car.gen !== filter.gen) return false;
        if (filter.paymentType && car.paymentType !== filter.paymentType) return false;
        if (filter.conditionStyle && car.conditionStyle !== filter.conditionStyle) return false;
        if (filter.search) {
          const q = filter.search.toLowerCase();
          return (
            car.title.toLowerCase().includes(q) ||
            car.engineCode.toLowerCase().includes(q) ||
            car.color.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .map((car) => ({
        ...car,
        estimatedMonthlyPayment: FinanceService.estimateDefaultMonthly(
          car.price,
          car.paymentType === 'CASH_ONLY'
        ),
      }));
  }

  /**
   * Retrieves single car by slug with complete inspection data
   */
  public static async getCarBySlug(slug: string): Promise<Car | null> {
    try {
      const record = await prisma.car.findUnique({
        where: { slug },
        include: {
          images: true,
          specs: true,
        },
      });

      if (record) {
        return {
          id: record.id,
          slug: record.slug,
          title: record.title,
          gen: record.gen as Generation,
          year: record.year,
          price: record.price,
          mileage: record.mileage,
          transmission: record.transmission,
          engineCode: record.engineCode,
          color: record.color,
          paymentType: record.paymentType as PaymentType,
          status: record.status as CarStatus,
          conditionStyle: record.conditionStyle as ConditionStyle,
          cashOnlyReason: record.cashOnlyReason,
          images: record.images ? {
            exterior: record.images.exterior,
            interior: record.images.interior,
            engine: record.images.engine,
            extra: record.images.extra,
          } : undefined,
          specs: record.specs ? {
            exteriorDesc: record.specs.exteriorDesc,
            interiorDesc: record.specs.interiorDesc,
            engineDesc: record.specs.engineDesc,
            chassisGuarantee: record.specs.chassisGuarantee,
          } : undefined,
          estimatedMonthlyPayment: FinanceService.estimateDefaultMonthly(
            record.price,
            record.paymentType === 'CASH_ONLY'
          ),
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        };
      }
    } catch (err) {
      console.warn('Database slug query bypassed, checking fallback cache:', err);
    }

    const found = fallbackCars.find((c) => c.slug === slug);
    if (!found) return null;

    return {
      ...found,
      estimatedMonthlyPayment: FinanceService.estimateDefaultMonthly(
        found.price,
        found.paymentType === 'CASH_ONLY'
      ),
    };
  }
}
