# 🏎️ Civic Hub Thailand — Specialized Honda Civic Dealership Monorepo

> **The Specialist in Honda Civic FD, FB, FC, FK, and FE**  
> A production-ready, clean-architecture full-stack repository designed specifically for automotive showroom platforms, with strict separation between **"Finance Available (จัดไฟแนนซ์ได้)"** and **"Cash Only (ขายสดเท่านั้น)"**, genuine Thai-spec mechanical specifications, and 175-point inspection standards.

---

## 🏛️ System Architecture

```text
├── backend/
│   ├── src/
│   │   ├── config/          # Neon Serverless PostgreSQL connection with connection pooling
│   │   ├── controllers/     # Car controller, Finance controller, Lead controller
│   │   ├── routes/          # REST API endpoints (/api/cars, /api/cars/:slug, /api/leads, /api/finance/calculate)
│   │   ├── services/        # Business logic & Thai Flat-Rate Auto Loan Engine (with 7% VAT)
│   │   ├── types/           # Strongly typed shared TypeScript interfaces & Enums
│   │   └── server.ts        # Express application bootstrap with CORS & security middleware
│   ├── prisma/
│   │   ├── schema.prisma    # Complete Prisma schema with Neon PostgreSQL provider
│   │   └── seed.ts          # Authentic Thai-spec Honda Civic seed data (FD, FB, FC, FK, FE)
│   ├── Dockerfile           # Multi-stage production container build
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout with Honda Dark Charcoal / Type R Red theme & font
│   │   │   ├── page.tsx         # Main catalog page with dual filters & dynamic car grid
│   │   │   └── cars/[slug]/
│   │   │       └── page.tsx     # Full-page car view with SSR metadata & OpenGraph tags
│   │   ├── components/
│   │   │   ├── GenerationTabs.tsx  # 1-click filter for FD, FB, FC, FK, FE
│   │   │   ├── PaymentFilter.tsx   # Strict toggle: All | Finance Available | Cash Only
│   │   │   ├── CarCard.tsx         # Vehicle card with specs, badges, and monthly estimate
│   │   │   ├── CarDetailModal.tsx  # Multi-angle gallery (4-views) & 4-box inspection breakdown
│   │   │   ├── Navbar.tsx          # Sticky bar with quick dials, LINE direct chat, and filters
│   │   │   └── Hero.tsx            # High-impact hero section with trust badges and quick stats
│   │   ├── services/
│   │   │   └── api.ts           # Resilient API client for backend communication
│   │   └── types/
│   │       └── index.ts         # TypeScript definitions
│   ├── Dockerfile               # Production Next.js standalone runner
│   ├── package.json
│   ├── next.config.mjs
│   └── tailwind.config.ts
│
├── docker-compose.yml       # Production-ready compose configuration (Frontend: 3000, Backend: 5000)
├── .env.example             # Complete environment blueprint
├── .gitignore
└── README.md
```

---

## 🧮 Thai Auto Loan Flat-Rate Formula (สถาบันการเงินไทย)

Unlike Western reducing-balance mortgages, auto financing in Thailand strictly employs the **Flat-Rate Interest Method** plus **7% Value Added Tax (VAT)**:

$$\text{Principal} = \text{Price} - \text{DownPayment}$$
$$\text{Total Interest} = \text{Principal} \times (\text{Annual Rate \%} / 100) \times \left(\frac{\text{Term Months}}{12}\right)$$
$$\text{Subtotal Monthly} = \frac{\text{Principal} + \text{Total Interest}}{\text{Term Months}}$$
$$\text{Final Monthly Payment} = \text{Subtotal Monthly} \times 1.07 \quad (\text{Includes 7\% VAT})$$

> **Important Business Rule:**  
> Cars categorized under `paymentType = 'CASH_ONLY'` (ขายสดเท่านั้น) disable the loan calculator and disallow monthly financing applications, warning prospective buyers of wholesale pricing, track/tune modifications, or aged logbook status with immediate transfer readiness.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 20+ / 22+
- Docker & Docker Compose (Optional for containerized run)
- Neon Serverless PostgreSQL Database account (or local PostgreSQL)

### 2. Environment Setup
Copy `.env.example` into root or respective backend/frontend directories:

```bash
cp .env.example .env
```

Fill in your Neon connection string in `DATABASE_URL`:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]-pooler.ap-southeast-1.neon.tech/civichub?sslmode=require"
```

### 3. Backend Setup & Seeding

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
# Server listening on http://localhost:5000
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# Next.js running on http://localhost:3000
```

---

## 🐳 Docker Compose Deployment

Spin up both services with a single command:

```bash
docker-compose up --build -d
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)
- **Backend Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/api/health` | Service health status | - |
| `GET` | `/api/cars` | Retrieve catalog with filtering | `gen`, `paymentType`, `conditionStyle`, `search` |
| `GET` | `/api/cars/:slug` | Retrieve single car with 4-box inspection & gallery | - |
| `POST` | `/api/finance/calculate` | Compute Thai flat-rate loan with 7% VAT | `body: { price, downPayment, termMonths, annualRate }` |
| `POST` | `/api/leads` | Capture purchase inquiry / booking test drive | `body: { carId, customerName, phone, lineId, financingOption, note }` |

---

## 🛡️ License
Proprietary & Confidential — Civic Hub Thailand Automotive Group.
