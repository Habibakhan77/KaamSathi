'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  SERVICE_CATEGORIES, 
  MOCK_PROVIDERS, 
  MOCK_REVIEWS, 
  SWAT_AREAS 
} from '@/lib/data/mockData';
import { 
  Sparkles, 
  Mic, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  X as XIcon, 
  ChevronRight, 
  Smartphone, 
  Users, 
  BadgePercent, 
  HelpCircle, 
  Snowflake, 
  Zap, 
  Droplet, 
  Hammer, 
  Wrench, 
  PhoneCall, 
  CheckCircle,
  TrendingUp,
  Cpu,
  Layers,
  Send,
  Loader2
} from 'lucide-react';

export default function HomePage() {
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();

  // Hero AI Search Bar State
  const [heroPrompt, setHeroPrompt] = useState('Mera AC theek se cool nahi kar raha, Mingora mein');
  const [selectedArea, setSelectedArea] = useState('Mingora City');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    category: string;
    categoryTitle: string;
    urgency: string;
    costMin: number;
    costMax: number;
    calloutFee: number;
    diagnostics: string[];
    topMatch: typeof MOCK_PROVIDERS[0];
  } | null>({
    category: 'ac_technician',
    categoryTitle: 'AC & Inverter Cooling Specialist',
    urgency: 'high',
    costMin: 2000,
    costMax: 4500,
    calloutFee: 500,
    diagnostics: [
      'Low refrigerant pressure (R410A / R32) detected',
      'Outdoor condenser fins require chemical jet wash',
      'Indoor unit sensor check & PCB diagnostic'
    ],
    topMatch: MOCK_PROVIDERS[0]
  });

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [activeDeviceTab, setActiveDeviceTab] = useState<'customer' | 'provider' | 'admin'>('customer');

  const iconComponents: Record<string, React.ReactNode> = {
    Snowflake: <Snowflake className="w-6 h-6 text-[#1FA971]" />,
    Zap: <Zap className="w-6 h-6 text-[#F5A524]" />,
    Droplet: <Droplet className="w-6 h-6 text-[#23BCA0]" />,
    Hammer: <Hammer className="w-6 h-6 text-[#1FA971]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#23BCA0]" />,
    Wrench: <Wrench className="w-6 h-6 text-[#F5A524]" />
  };

  const handleHeroDiagnose = async (customPrompt?: string) => {
    const textToQuery = customPrompt || heroPrompt;
    if (!textToQuery.trim()) return;

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToQuery,
          area: selectedArea,
          language: language
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult({
          category: data.service_category,
          categoryTitle: data.category_name,
          urgency: data.urgency,
          costMin: data.estimated_cost_pkr.min,
          costMax: data.estimated_cost_pkr.max,
          calloutFee: data.estimated_cost_pkr.callout_fee,
          diagnostics: data.diagnostic_points,
          topMatch: data.matched_providers[0] || MOCK_PROVIDERS[0]
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-20 sm:space-y-28 overflow-hidden">
      
      {/* =========================================================================
          1. HERO SECTION WITH LIVE AI DIAGNOSIS INTERACTIVE BAR
      ========================================================================= */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1FA971]/15 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
          
          {/* Swat Valley Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#0E2420]/80 border border-[#0F5C4D]/15 dark:border-white/10 shadow-xs text-xs font-semibold text-[#0F5C4D] dark:text-[#23BCA0]">
            <span className="w-2 h-2 rounded-full bg-[#1FA971] animate-ping" />
            <span className="text-[#0B1F1C] dark:text-[#F4F8F7] font-bold">Swat Valley’s #1</span>
            <span className="text-[#7E9691]">•</span>
            <span>{t('heroHook')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#0B1F1C] dark:text-[#F4F8F7] tracking-tight max-w-4xl leading-[1.15]">
            {language === 'ur' ? (
              <span>
                سوات کا سب سے بااعتماد سروسز نیٹ ورک،{' '}
                <span className="bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] bg-clip-text text-transparent">
                  اب مصنوعی ذہانت کے ساتھ
                </span>
              </span>
            ) : language === 'roman' ? (
              <span>
                Har Kaam Ke Liye, Aik{' '}
                <span className="bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] bg-clip-text text-transparent">
                  Bharosemand Saathi
                </span>
              </span>
            ) : (
              <span>
                Verified Home Services in Swat,{' '}
                <span className="bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] bg-clip-text text-transparent">
                  Trained for Trust
                </span>
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#4A635E] dark:text-[#96B5AF] max-w-2xl leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* HERO AI INPUT BOX */}
          <div className="w-full max-w-3xl mt-4 p-2 sm:p-3 rounded-2xl sm:rounded-3xl glass-panel shadow-xl border border-[#0F5C4D]/20 space-y-3">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              
              {/* Area Selector Dropdown */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/70 dark:bg-[#071513]/70 border border-[#0F5C4D]/10 text-xs font-semibold text-[#0B1F1C] dark:text-[#F4F8F7] shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-transparent border-none focus:outline-hidden text-xs cursor-pointer"
                >
                  {SWAT_AREAS.slice(0, 7).map((area) => (
                    <option key={area} value={area} className="dark:bg-[#0E2420]">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Input Text Field */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleHeroDiagnose();
                  }}
                  placeholder={t('heroSearchPlaceholder')}
                  className="w-full bg-white/90 dark:bg-[#0E2420]/90 border border-[#0F5C4D]/15 dark:border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F1C] dark:text-[#F4F8F7] placeholder-[#7E9691] focus:outline-hidden focus:border-[#1FA971]"
                />
              </div>

              {/* Voice button */}
              <button
                onClick={() => {
                  const sampleUrdu = 'Kanju Township mein water pump leak ho raha hai';
                  setHeroPrompt(sampleUrdu);
                  handleHeroDiagnose(sampleUrdu);
                }}
                className="px-3.5 py-3 rounded-xl bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0] hover:bg-[#1FA971]/25 flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors"
                title="Simulate Urdu Voice Input"
              >
                <Mic className="w-4 h-4 text-[#1FA971]" />
                <span className="hidden sm:inline">{t('heroVoiceButton')}</span>
              </button>

              {/* Main Submit Button */}
              <button
                onClick={() => handleHeroDiagnose()}
                disabled={isAiLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#1FA971]/25 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isAiLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#F5A524]" />
                )}
                <span>{t('heroSearchButton')}</span>
              </button>
            </div>

            {/* Quick 1-tap example chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#4A635E] dark:text-[#96B5AF]">
              <span className="text-[11px] font-semibold">Try asking (آزمانے کے لیے کلک کریں):</span>
              {[
                'Mera AC theek se cool nahi kar raha, Mingora mein',
                'Kanju mein geyser pipe leak ho raha hai',
                'Saidu Sharif mein short circuit check karwana hai'
              ].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setHeroPrompt(chip);
                    handleHeroDiagnose(chip);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-white/70 dark:bg-[#071513]/70 hover:bg-[#1FA971]/10 border border-[#0F5C4D]/10 dark:border-white/10 text-[#0B1F1C] dark:text-[#F4F8F7] transition-colors truncate max-w-xs"
                >
                  "{chip}"
                </button>
              ))}
            </div>

            {/* LIVE STRUCTURED RESULT CARD (Animated interactive response) */}
            {aiResult && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#0E2420]/95 border border-[#1FA971]/30 shadow-md text-start space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#0F5C4D]/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1FA971] animate-pulse" />
                    <span className="font-heading font-bold text-sm text-[#0F5C4D] dark:text-[#23BCA0]">
                      AI Service Match: {aiResult.categoryTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5A524]/20 text-[#D97706] font-bold uppercase text-[10px]">
                      {aiResult.urgency} Priority
                    </span>
                    <span className="text-[#4A635E] dark:text-[#96B5AF]">
                      Location: <strong className="text-[#0B1F1C] dark:text-white">{selectedArea}</strong>
                    </span>
                  </div>
                </div>

                {/* Diagnostics & Pricing Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: AI Diagnosis Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A635E] dark:text-[#96B5AF]">
                      AI Technical Diagnostic Plan:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#0B1F1C] dark:text-[#F4F8F7]">
                      {aiResult.diagnostics.map((diag, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                          <span>{diag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Cost estimate & Matched Pro */}
                  <div className="p-3.5 rounded-xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#4A635E] dark:text-[#96B5AF]">Fair PKR Repair Estimate:</span>
                      <span className="font-heading font-extrabold text-sm text-[#0F5C4D] dark:text-[#23BCA0]">
                        Rs. {aiResult.costMin.toLocaleString()} - {aiResult.costMax.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#7E9691] border-t border-[#0F5C4D]/10 dark:border-white/10 pt-1.5">
                      <span>Inspection Call-Out Fee:</span>
                      <span className="font-semibold text-[#0B1F1C] dark:text-white">Rs. {aiResult.calloutFee}</span>
                    </div>

                    {/* Matched Technician snippet */}
                    <div className="pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={aiResult.topMatch.avatar}
                          alt={aiResult.topMatch.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#1FA971]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1">
                            {aiResult.topMatch.name}
                            <ShieldCheck className="w-3 h-3 text-[#1FA971]" />
                          </p>
                          <p className="text-[10px] text-[#4A635E] dark:text-[#96B5AF]">
                            ★ {aiResult.topMatch.rating} • {aiResult.topMatch.responseTimeMins}m Arrival
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push(`/book?category=${aiResult.category}&provider=${aiResult.topMatch.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white text-xs font-bold hover:shadow-md transition-all active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Social Proof Counter */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4A635E] dark:text-[#96B5AF]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {MOCK_PROVIDERS.slice(0, 4).map((p, i) => (
                  <img
                    key={i}
                    src={p.avatar}
                    alt={p.name}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#071513] object-cover"
                  />
                ))}
              </div>
              <span className="font-bold text-[#0B1F1C] dark:text-white">180+ Verified Mistris</span>
              <span>across Swat</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
              <strong className="text-[#0B1F1C] dark:text-white">4.92 / 5.0</strong>
              <span>from 2,840+ completed jobs</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. TRUST METRICS BAR
      ========================================================================= */}
      <section className="border-y border-[#0F5C4D]/10 dark:border-white/10 bg-white/50 dark:bg-[#0E2420]/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#0F5C4D] dark:text-[#23BCA0]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F1C] dark:text-white">100%</span>
              </div>
              <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] font-medium">NADRA CNIC Verified</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#F5A524]">
                <Clock className="w-5 h-5" />
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F1C] dark:text-white">25 Mins</span>
              </div>
              <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] font-medium">Avg. Swat Arrival Time</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#1FA971]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F1C] dark:text-white">Zero</span>
              </div>
              <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] font-medium">Overcharging Guarantee</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#23BCA0]">
                <Users className="w-5 h-5" />
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F1C] dark:text-white">2,800+</span>
              </div>
              <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] font-medium">Swat Families Served</p>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#F5A524]">
                <Star className="w-5 h-5 fill-[#F5A524]" />
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F1C] dark:text-white">4.9 ★</span>
              </div>
              <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] font-medium">Customer Rating</p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SERVICE CATEGORIES BENTO GRID
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
              Verified Trade Categories
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
              {t('categoriesHeading')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
              {t('categoriesSubheading')}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F5C4D] dark:text-[#23BCA0] hover:text-[#1FA971] transition-colors"
          >
            <span>Explore All 12 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 dark:border-white/10 hover:border-[#1FA971] hover:shadow-xl hover:shadow-[#1FA971]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#071513] border border-[#0F5C4D]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconComponents[cat.iconName]}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1FA971]/10 text-[#0F5C4D] dark:text-[#23BCA0]">
                    {cat.activeProsCount} Pros in Swat
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white group-hover:text-[#1FA971] transition-colors">
                    {cat.title[language] || cat.title.en}
                  </h3>
                  <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] mt-1 line-clamp-2">
                    {cat.description[language] || cat.description.en}
                  </p>
                </div>

                {/* Popular Tasks Chips */}
                <div className="space-y-1.5 pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#7E9691]">Top Requests:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(cat.popularTasks[language] || cat.popularTasks.en).slice(0, 3).map((task, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F8F7] dark:bg-[#071513] text-[#4A635E] dark:text-[#96B5AF]">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7E9691] block">{t('priceStartingFrom')}</span>
                  <span className="font-heading font-extrabold text-sm text-[#0B1F1C] dark:text-white">
                    Rs. {cat.startingPricePKR.toLocaleString()} {t('pkrCurrency')}
                  </span>
                </div>

                <Link
                  href={`/services?category=${cat.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#071513] group-hover:bg-[#0F5C4D] text-[#0B1F1C] dark:text-white group-hover:text-white border border-[#0F5C4D]/10 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Book</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. "HOW THE AI WORKS" 5-STEP ANIMATED TIMELINE
      ========================================================================= */}
      <section id="how-ai-works" className="py-16 bg-[#0B3D36] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971] bg-[#1FA971]/20 px-3 py-1 rounded-full">
              Automated Dispatch Pipeline
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
              {t('howAiWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#96B5AF]">
              {t('howAiWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {[
              {
                step: '01',
                title: {
                  en: 'Describe Problem',
                  ur: 'مسئلہ بیان کریں',
                  roman: 'Masla Batayein'
                },
                desc: {
                  en: 'Speak or type in Urdu, Roman Urdu or English. No technical jargon needed.',
                  ur: 'اردو، رومن اردو یا انگلش میں بولیں یا لکھیں۔',
                  roman: 'Voice ya text mein simple Urdu mein batayein.'
                },
                badge: 'Voice or Text'
              },
              {
                step: '02',
                title: {
                  en: 'AI Fault Triage',
                  ur: 'اے آئی تشخیص',
                  roman: 'AI Triage & Price'
                },
                desc: {
                  en: 'Analyzes symptoms, parts required, and calculates a fair standardized PKR range.',
                  ur: 'مسئلے کی نوعیت اور سامان کے خرچے کا درست اندازہ۔',
                  roman: 'Parts aur labor ka fair rate calculate karta hai.'
                },
                badge: 'OpenAI Engine'
              },
              {
                step: '03',
                title: {
                  en: 'Vetted Dispatch',
                  ur: 'ماہر کاریگر تلاش',
                  roman: 'Verified Mistri Match'
                },
                desc: {
                  en: 'Alerts nearest CNIC-verified technicians in Mingora, Kanju, or Saidu Sharif.',
                  ur: 'آپ کے قریب ترین تصدیق شدہ کاریگر کو الرٹ ملتا ہے۔',
                  roman: 'Nearest vetted pros ko direct notification.'
                },
                badge: 'Geo Ranked'
              },
              {
                step: '04',
                title: {
                  en: 'Review & Confirm',
                  ur: 'پروفائل اور تصدیق',
                  roman: 'Profile Check'
                },
                desc: {
                  en: 'Inspect technician credentials, customer reviews, photo ID, and arrival ETA.',
                  ur: 'شناختی کارڈ بیج، پچھلے ریویوز اور ریٹ چیک کریں۔',
                  roman: 'CNIC badge aur past reviews dekh kar book karein.'
                },
                badge: '1-Click Confirm'
              },
              {
                step: '05',
                title: {
                  en: 'Inspect & Pay',
                  ur: 'تسلی کے بعد ادائیگی',
                  roman: 'Tasalli Ke Baad Payment'
                },
                desc: {
                  en: 'Pay via Cash, Easypaisa or JazzCash only after complete job satisfaction.',
                  ur: 'مکمل تسلی کے بعد کیش یا ایزی پیسہ سے ادائیگی۔',
                  roman: 'Cash, Easypaisa ya Jazzcash se payment.'
                },
                badge: 'Safe Guarantee'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1FA971] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-2xl text-[#1FA971]/40">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1FA971]/20 text-[#23BCA0]">
                    {s.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {s.title[language] || s.title.en}
                  </h3>
                  <p className="text-xs text-[#96B5AF] mt-2 leading-relaxed">
                    {s.desc[language] || s.desc.en}
                  </p>
                </div>

                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1FA971] to-[#F5A524] w-full" />
                </div>
              </div>
            ))}

          </div>

          <div className="mt-12 text-center">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1FA971] to-[#23BCA0] text-[#071513] font-heading font-bold text-xs hover:shadow-lg hover:shadow-[#1FA971]/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#071513]" />
              <span>Try Live AI Dispatch Simulator Now</span>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. FEATURED VERIFIED PROFESSIONALS CAROUSEL
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
              Vetted Tradesmen of Swat
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
              {language === 'ur' ? 'سوات کے قابل فخر اور بااعتماد ہنر مند' : 'Meet Our Highest Rated Technicians'}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
              All profiles verified with NADRA biometric CNIC, trade trade-tests and criminal record audits.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F5C4D] dark:text-[#23BCA0]"
          >
            <span>View All Providers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PROVIDERS.slice(0, 3).map((prov) => (
            <div
              key={prov.id}
              className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 dark:border-white/10 hover:border-[#1FA971] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                
                {/* Header: Avatar, Name, Badges */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={prov.avatar}
                      alt={prov.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1FA971]"
                    />
                    {prov.isAvailableNow && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1FA971] border-2 border-white dark:border-[#0E2420]" title="Available Now" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
                      {prov.name}
                      <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
                    </h3>
                    <p className="text-xs text-[#0F5C4D] dark:text-[#23BCA0] font-medium">
                      {prov.title[language] || prov.title.en}
                    </p>
                    <p className="text-[11px] text-[#7E9691] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#1FA971]" />
                      {prov.area} ({prov.yearsExperience} yrs exp)
                    </p>
                  </div>
                </div>

                {/* Rating & Stats Strip */}
                <div className="p-2.5 rounded-xl bg-[#F4F8F7] dark:bg-[#071513] grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="font-extrabold text-[#0B1F1C] dark:text-white flex items-center justify-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                      {prov.rating}
                    </span>
                    <span className="text-[10px] text-[#7E9691]">{prov.reviewCount} Reviews</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B1F1C] dark:text-white">
                      {prov.jobsCompleted}+
                    </span>
                    <span className="text-[10px] text-[#7E9691]">Jobs Done</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-[#1FA971]">
                      {prov.responseTimeMins}m
                    </span>
                    <span className="text-[10px] text-[#7E9691]">Response</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] line-clamp-3">
                  {prov.bio[language] || prov.bio.en}
                </p>

                {/* Verification Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#1FA971]/10 text-[#0F5C4D] dark:text-[#23BCA0] flex items-center gap-1">
                    <Check className="w-3 h-3" /> CNIC Verified
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F5A524]/10 text-[#D97706] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Trade Certified
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#E6F4F1] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Police Cleared
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7E9691] block">Callout Fee:</span>
                  <span className="font-heading font-extrabold text-sm text-[#0B1F1C] dark:text-white">
                    Rs. {prov.calloutFeePKR}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/providers/${prov.id}`}
                    className="px-3 py-1.5 rounded-xl border border-[#0F5C4D]/20 text-xs font-semibold text-[#0B1F1C] dark:text-white hover:bg-[#F4F8F7] dark:hover:bg-[#071513]"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/book?provider=${prov.id}&category=${prov.category}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white text-xs font-bold hover:shadow-md"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. COMPARISON SECTION: KAAMSAATHI VS RANDOM BAZAARI MISTRI
      ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
            Safety & Transparency
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            {t('comparisonHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Why homeowners in Swat are leaving unverified phone numbers behind.
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl glass-panel border border-[#0F5C4D]/15 dark:border-white/10 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#0F5C4D]/10 dark:divide-white/10">
            
            {/* Traditional Bazaari Column (Negative) */}
            <div className="p-6 sm:p-8 space-y-6 bg-red-50/20 dark:bg-red-950/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <XIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
                    {t('comparisonTraditional')}
                  </h3>
                  <p className="text-xs text-[#7E9691]">Calling random WhatsApp or paper flyers</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-[#4A635E] dark:text-[#96B5AF]">
                <li className="flex items-start gap-2.5">
                  <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Identity Verification:</strong> You invite a stranger into your family home with no CNIC or background check.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Arbitrary Overcharging:</strong> Prices change on the spot; charges fluctuate based on house size or urgent situation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Ghosting & No Warranty:</strong> If the AC leaks again tomorrow, the phone number is switched off.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Endless Delays:</strong> "Bas 10 minute mein pohanch raha hoon" turns into 4 hours or tomorrow.</span>
                </li>
              </ul>
            </div>

            {/* KaamSaathi Column (Positive) */}
            <div className="p-6 sm:p-8 space-y-6 bg-emerald-50/20 dark:bg-[#1FA971]/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1FA971]/20 flex items-center justify-center text-[#1FA971]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
                    {t('comparisonKaamSaathi')}
                  </h3>
                  <p className="text-xs text-[#1FA971] font-semibold">AI Triage + Vetted Technicians</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-[#0B1F1C] dark:text-[#F4F8F7]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span><strong>100% Biometric NADRA CNIC Checked:</strong> Full police clearance certificate and local residency verified.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span><strong>Fixed Callout & Upfront PKR Estimate:</strong> Clear diagnosis fee and fair market parts cost before any work starts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Work & Dispute Resolution:</strong> Direct mediation and free re-service guarantee if not satisfied.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span><strong>Live Status & Arrival ETA:</strong> Track technician route and arrival countdown in real time on your phone.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          7. MULTI-DEVICE SHOWCASE: PHONE MOCKUPS (CUSTOMER, PROVIDER, ADMIN)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
            Ecosystem in Action
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            Engineered for Pakistani Smartphones
          </h2>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Ultra-fast on 3G/4G, low data consumption, and intuitive Urdu RTL navigation.
          </p>

          {/* Device Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/15 mt-4">
            <button
              onClick={() => setActiveDeviceTab('customer')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDeviceTab === 'customer'
                  ? 'bg-[#0F5C4D] text-white shadow-xs'
                  : 'text-[#4A635E] dark:text-[#96B5AF] hover:text-[#0B1F1C]'
              }`}
            >
              Customer Booking App
            </button>
            <button
              onClick={() => setActiveDeviceTab('provider')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDeviceTab === 'provider'
                  ? 'bg-[#0F5C4D] text-white shadow-xs'
                  : 'text-[#4A635E] dark:text-[#96B5AF] hover:text-[#0B1F1C]'
              }`}
            >
              Mistri Dispatch Portal
            </button>
            <button
              onClick={() => setActiveDeviceTab('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDeviceTab === 'admin'
                  ? 'bg-[#0F5C4D] text-white shadow-xs'
                  : 'text-[#4A635E] dark:text-[#96B5AF] hover:text-[#0B1F1C]'
              }`}
            >
              Admin CNIC Verification
            </button>
          </div>
        </div>

        {/* Realistic Phone / Device Frame Showcase */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl p-3 bg-gradient-to-b from-[#0F5C4D] to-[#0B3D36] shadow-2xl">
            <div className="w-full rounded-2xl bg-white dark:bg-[#071513] border-4 border-slate-900 overflow-hidden shadow-inner p-4 space-y-4">
              
              {/* Phone Status bar */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#7E9691] border-b border-gray-100 dark:border-white/5 pb-2">
                <span>08:45 PM</span>
                <div className="w-20 h-3 rounded-full bg-slate-900 mx-auto" />
                <span>4G • 98%</span>
              </div>

              {/* Conditional Mock Content based on Tab */}
              {activeDeviceTab === 'customer' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-[#1FA971]/10 border border-[#1FA971]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#1FA971] font-bold uppercase">Active Job #KS-8901</span>
                      <h4 className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-white">
                        Ustad Tariq Khan (AC Tech)
                      </h4>
                      <p className="text-[10px] text-[#7E9691]">En Route on Bike • ETA 12 mins</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1FA971] animate-ping" />
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0E2420] text-xs space-y-1.5">
                    <span className="text-[11px] font-bold text-[#0B1F1C] dark:text-white">Service Location:</span>
                    <p className="text-[11px] text-[#4A635E] dark:text-[#96B5AF]">House 42, St 5, Near Serena Hotel Road, Saidu Sharif</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-white/10 font-bold text-[#0F5C4D] dark:text-[#23BCA0]">
                      <span>Inspection Fee:</span>
                      <span>Rs. 500 PKR</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold">
                      Call Mistri
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-[#25D366] text-[#071513] text-xs font-bold">
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {activeDeviceTab === 'provider' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-[#F5A524]/10 border border-[#F5A524]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#D97706] uppercase">New Job Request (Mingora)</span>
                      <span className="text-[11px] font-bold text-red-500 animate-pulse">01:45 remaining</span>
                    </div>
                    <p className="text-xs font-bold text-[#0B1F1C] dark:text-white">
                      Inverter AC Gas Refill & Compressor Check
                    </p>
                    <p className="text-[11px] text-[#7E9691]">Nishat Chowk, Mingora • 1.8 km away</p>
                    <div className="text-xs font-extrabold text-[#0F5C4D] dark:text-[#23BCA0]">
                      Estimated Earnings: Rs. 2,800 PKR
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-red-100 text-red-700 text-xs font-bold">
                      Decline
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-[#1FA971] text-white text-xs font-bold">
                      Accept Job
                    </button>
                  </div>
                </div>
              )}

              {activeDeviceTab === 'admin' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-800 dark:text-blue-300">CNIC Verification Audit</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Pending Review</span>
                    </div>
                    <p className="font-bold text-[#0B1F1C] dark:text-white">Applicant: Mukhtar Alam (Saidu Sharif)</p>
                    <p className="text-[11px] text-[#7E9691]">CNIC: 15602-*******-1 • Police Cert: Uploaded</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-green-600 text-white text-xs font-bold">
                      Approve CNIC
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-[#0B1F1C] dark:text-white text-xs font-bold">
                      Request Clear Pic
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PROVIDER RECRUITMENT BANNER
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F5C4D] via-[#0B3D36] to-[#072520] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#1FA971]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1FA971]/20 text-[#23BCA0] text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              {language === 'ur' ? 'سوات کے ہنر مند بھائیوں کے لیے' : 'For Skilled Tradesmen in Swat'}
            </span>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white leading-tight">
              {t('providerRecruitHeading')}
            </h2>

            <p className="text-xs sm:text-sm text-[#96B5AF] leading-relaxed">
              {t('providerRecruitSubtitle')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="font-heading font-extrabold text-base sm:text-xl text-[#F5A524]">45k - 120k</span>
                <span className="text-[11px] text-[#96B5AF] block">PKR Monthly Earning</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="font-heading font-extrabold text-base sm:text-xl text-[#1FA971]">0% Deductions</span>
                <span className="text-[11px] text-[#96B5AF] block">First 3 Months Free</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="font-heading font-extrabold text-base sm:text-xl text-white">Daily Cash</span>
                <span className="text-[11px] text-[#96B5AF] block">Direct Hand-to-Hand</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/dashboard/provider"
                className="px-6 py-3 rounded-xl bg-[#1FA971] text-white font-heading font-bold text-xs hover:bg-[#178B5C] transition-all shadow-lg active:scale-95"
              >
                {t('joinAsProviderBtn')}
              </Link>
              <a
                href="https://wa.me/923459512034?text=Salam!%20Mujhe%20KaamSaathi%20par%20Mistri%20Register%20hona%20hai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F5A524]" />
                <span>Call Recruitment Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. REALISTIC SWAT TESTIMONIALS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
            Community Voices
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            {language === 'ur' ? 'سوات کے معزز شہریوں کے تاثرات' : 'Trusted by Families & Businesses in Swat'}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Real feedback from verified completed repair bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 dark:border-white/10 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#7E9691]">{rev.date}</span>
                </div>

                <p className="text-xs text-[#0B1F1C] dark:text-[#F4F8F7] leading-relaxed italic">
                  "{rev.comment[language] || rev.comment.en}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-white">
                    {rev.authorName}
                  </h4>
                  <p className="text-[10px] text-[#7E9691] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1FA971]" />
                    {rev.location}
                  </p>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1FA971]/10 text-[#0F5C4D] dark:text-[#23BCA0]">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          10. FREQUENTLY ASKED QUESTIONS (FAQ)
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
            Got Questions?
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Everything you need to know about booking verified local services in Swat.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does KaamSaathi verify mistris and technicians in Swat?',
              a: 'Every provider physically submits their original NADRA CNIC, police character verification certificate, and passes a trade evaluation with our local team in Mingora before receiving the green verified badge on the platform.'
            },
            {
              q: 'How are prices calculated? Can the technician overcharge me on arrival?',
              a: 'No. Every category has a standardized diagnostic call-out fee (between 350 to 600 PKR). For repairs and parts, our AI engine gives you an upfront PKR benchmark range before you book, and you only pay after work inspection.'
            },
            {
              q: 'Which areas of Swat are currently covered?',
              a: 'We actively dispatch across Mingora City, Saidu Sharif, Kanju Township, Kabal, Matta, Barikot, Khwazakhela, Faizabad, Rahimabad, and Charbagh, with average arrival time under 30 minutes.'
            },
            {
              q: 'Can I speak or describe my problem in Urdu or Roman Urdu?',
              a: 'Yes! Our AI assistant understands everyday spoken Urdu, Roman Urdu ("Mera AC theek nahi chal raha"), and English, categorizing faults accurately without you having to know technical terminology.'
            },
            {
              q: 'What if I am unhappy with the service?',
              a: 'We offer a 100% satisfaction guarantee. If the technician does not fix the agreed issue, our customer dispute team in Mingora steps in for free re-inspection or immediate refund mediation.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl glass-panel border border-[#0F5C4D]/10 dark:border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                className="w-full text-start p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-heading font-bold text-[#0B1F1C] dark:text-white hover:text-[#1FA971] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-[#1FA971] transition-transform duration-200 shrink-0 ${
                    activeFaqIndex === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeFaqIndex === index && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed border-t border-[#0F5C4D]/5 dark:border-white/5 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
