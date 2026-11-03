# KaamSaathi (کام ساتھی)

> **"Swat se shuru, poore Pakistan tak — Har kaam ke liye, aik bharosemand saathi."**  
> AI-Powered Verified Local Services Marketplace starting in Swat, Khyber Pakhtunkhwa, Pakistan.

---

## 🌟 Overview & Market Vision

**KaamSaathi** is built to solve trust, safety, and opaque pricing in Pakistan's home services market. Traditional options (Helpp, Mahir, Supertasker, and random bazaar mistris) either gouge technicians with 30% aggregator commissions or leave households vulnerable to unverified strangers and arbitrary overcharging.

### Key Innovations:
1. **AI Triage & Voice Dispatch**: Speak or type problems naturally in **Urdu, Roman Urdu, or English** (*"Mera inverter AC cooling nahi kar raha, Mingora mein"*). The OpenAI-powered engine decomposes the fault, predicts fair PKR repair ranges, and matches verified specialists in seconds.
2. **Pakistani Trust Model**: 100% of providers undergo **NADRA biometric CNIC verification**, local police character clearance, and trade test evaluation before receiving a public badge.
3. **Transparent PKR Pricing**: Fixed inspection callout fees (Rs. 350 - Rs. 600) and zero hidden charges. Pay after inspecting the work via Cash, Easypaisa, or JazzCash.
4. **Multilingual with True Urdu Nastaliq & RTL**: Instant switching between English, Urdu (RTL with natural phrasing), and Roman Urdu, architected to support Pashto.
5. **Mobile-First & 3G-Optimized**: Designed for low-latency smartphone access across the Swat valley (Mingora, Saidu Sharif, Kanju, Kabal, Matta, Barikot, Khwazakhela).

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, custom theme tokens (`#0F5C4D`, `#1FA971`, `#F5A524`, `#F4F8F7`, `#071513`), glassmorphism, gradient meshes
- **Animation & Visuals**: Framer Motion, Canvas Confetti, Lucide Icons
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) policies and realistic Swat seed data
- **AI Engine**: Server-side Next.js route with OpenAI API (`gpt-4o-mini`) + intelligent rule-based heuristic NLP fallback
- **Maps**: Dynamic Swat GPS Hub locator with interactive status markers

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js LTS (v20+ or v26+)
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/your-org/kaamsaathi.git
cd kaamsaathi
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your credentials (the app automatically runs in rich mock mode if keys are omitted):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI API (Server-side AI route only; never exposed in browser)
OPENAI_API_KEY=sk-your-openai-api-key

# Optional Maps & FCM Notifications
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
kaamsaathi/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with LanguageProvider, Navbar, Footer
│   │   ├── globals.css               # Design system tokens, Urdu fonts, gradients
│   │   ├── page.tsx                  # Landing page (Hero AI bar, Bento grid, 5-step timeline, pros carousel)
│   │   ├── services/page.tsx         # Catalog with smart search, filters & Swat map
│   │   ├── providers/[id]/page.tsx   # Verified pro profile with rate cards & reviews
│   │   ├── book/page.tsx             # 5-step booking wizard with live status tracker
│   │   ├── ai-assistant/page.tsx     # Full AI assistant chat with JSON schema inspection
│   │   ├── api/ai-assistant/route.ts # Server-side triage route with OpenAI + NLP fallback
│   │   ├── dashboard/
│   │   │   ├── customer/page.tsx     # Customer bookings, mistri chat & invoices
│   │   │   ├── provider/page.tsx     # Mistri dispatch alerts & PKR earnings charts
│   │   │   └── admin/page.tsx        # CNIC verification audit queue & dispute center
│   │   ├── auth/login/page.tsx       # Pakistani phone OTP + email auth
│   │   ├── about/page.tsx            # Swat origin story & mission
│   │   ├── contact/page.tsx          # Mingora office & direct WhatsApp hotline
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   └── terms/page.tsx            # Quality guarantee & terms
│   ├── components/
│   │   ├── layout/Navbar.tsx         # Glass navbar, language switch, theme toggle
│   │   ├── layout/Footer.tsx         # WhatsApp support, coverage hubs, trust badges
│   │   └── ai/FloatingAIAssistant.tsx# Global floating assistant widget
│   └── lib/
│       ├── types.ts                  # Domain models (Provider, Booking, Category, Review)
│       ├── data/mockData.ts          # Swat areas, verified mistri profiles, rate cards
│       ├── i18n/
│       │   ├── translations.ts       # English, Urdu (RTL), and Roman Urdu dictionaries
│       │   └── LanguageContext.tsx   # Language state, direction, theme management
│       └── supabase/
│           ├── client.ts             # Supabase client instantiation with fallback
│           └── schema.sql            # Full PostgreSQL schema, RLS policies & indexes
├── scripts/
│   └── captureScreenshots.mjs       # Headless screenshot automated test runner
└── screenshots/                      # High-resolution screenshots of all views
```

---

## 🗄 Database Setup (Supabase)

To link with a live Supabase project:
1. Create a new Supabase project at [database.new](https://database.new).
2. Go to the **SQL Editor** tab in Supabase dashboard.
3. Paste the contents of `src/lib/supabase/schema.sql` and run it.
4. Set your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

---

## 🚢 Deployment Guide (Vercel)

Deploying KaamSaathi to Vercel takes under 2 minutes:

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your `kaamsaathi` repository.
4. Set the Environment Variables under **Settings > Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
5. Click **Deploy**. Vercel will automatically run `npm run build` with Turbopack and deploy to their global edge network.

---

## 📱 Mobile & Low-Bandwidth Optimizations

- Lightweight vector illustrations and gradient meshes instead of heavy stock photos.
- Dynamic code splitting and partial prerendering for sub-second first-contentful-paint (FCP).
- Optimized touch targets (48px minimum) for single-handed mobile usage.
- Resilient offline/mock fallbacks ensuring 100% functionality without external API stalls.

---

## 📜 License & Intellectual Property
Developed with pride for the people of Swat and Pakistan 🇵🇰.  
© 2026 KaamSaathi Technologies (Pvt) Ltd. All rights reserved.
