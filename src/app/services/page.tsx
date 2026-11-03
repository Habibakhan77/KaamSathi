'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  SERVICE_CATEGORIES, 
  MOCK_PROVIDERS, 
  SWAT_AREAS 
} from '@/lib/data/mockData';
import { ServiceCategoryId } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal, 
  Map as MapIcon, 
  List, 
  Clock, 
  Check, 
  ChevronRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';

function ServicesContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ServiceCategoryId | null;

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [availableNowOnly, setAvailableNowOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'experience'>('rating');

  // Filtered providers calculation
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedArea !== 'all' && !p.serviceAreas.includes(selectedArea) && p.area !== selectedArea) return false;
      if (verifiedOnly && (!p.cnicVerified || !p.tradeVerified)) return false;
      if (availableNowOnly && !p.isAvailableNow) return false;
      if (p.hourlyRatePKR > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSkill = p.skills.some((s) => s.toLowerCase().includes(q));
        const matchesBio = p.bio.en.toLowerCase().includes(q) || p.bio.ur.includes(q);
        if (!matchesName && !matchesSkill && !matchesBio) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.hourlyRatePKR - b.hourlyRatePKR;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      return 0;
    });
  }, [selectedCategory, selectedArea, verifiedOnly, availableNowOnly, maxPrice, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F5C4D]/10 dark:border-white/10 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1FA971] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Marketplace • Swat Valley</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#0B1F1C] dark:text-white">
            Find Verified Local Technicians
          </h1>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Filter through {MOCK_PROVIDERS.length} vetted pros in Mingora, Saidu Sharif, Kanju, and surrounding areas.
          </p>
        </div>

        {/* List / Map View Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/15 self-start md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'list'
                ? 'bg-[#0F5C4D] text-white shadow-xs'
                : 'text-[#4A635E] dark:text-[#96B5AF] hover:text-[#0B1F1C]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'map'
                ? 'bg-[#0F5C4D] text-white shadow-xs'
                : 'text-[#4A635E] dark:text-[#96B5AF] hover:text-[#0B1F1C]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Swat Map</span>
          </button>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#0F5C4D] text-white shadow-md'
              : 'bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/10 text-[#0B1F1C] dark:text-white hover:border-[#1FA971]'
          }`}
        >
          All Categories ({MOCK_PROVIDERS.length})
        </button>

        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#0F5C4D] text-white shadow-md'
                : 'bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/10 text-[#0B1F1C] dark:text-white hover:border-[#1FA971]'
            }`}
          >
            {cat.title[language] || cat.title.en}
          </button>
        ))}
      </div>

      {/* Main Layout: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="space-y-6 p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-[#0F5C4D]/10 dark:border-white/10">
            <span className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#1FA971]" />
              Filters
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedArea('all');
                setSearchQuery('');
                setMaxPrice(3000);
                setVerifiedOnly(false);
                setAvailableNowOnly(false);
              }}
              className="text-[11px] text-[#1FA971] hover:underline font-semibold"
            >
              Reset
            </button>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4A635E] dark:text-[#96B5AF]">Search Name or Skill</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Inverter, PCB, Solar..."
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
              <Search className="w-3.5 h-3.5 text-[#7E9691] absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Area Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4A635E] dark:text-[#96B5AF]">Swat Location</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
            >
              <option value="all">All Swat Towns & Hubs</option>
              {SWAT_AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#4A635E] dark:text-[#96B5AF]">Max Hourly Rate:</span>
              <span className="font-bold text-[#0F5C4D] dark:text-[#23BCA0]">Rs. {maxPrice} PKR</span>
            </div>
            <input
              type="range"
              min="800"
              max="2500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1FA971] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7E9691]">
              <span>Rs. 800</span>
              <span>Rs. 2,500</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0B1F1C] dark:text-white">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded-sm text-[#1FA971] accent-[#1FA971]"
              />
              <span>NADRA CNIC Verified Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0B1F1C] dark:text-white">
              <input
                type="checkbox"
                checked={availableNowOnly}
                onChange={(e) => setAvailableNowOnly(e.target.checked)}
                className="w-4 h-4 rounded-sm text-[#1FA971] accent-[#1FA971]"
              />
              <span>Available Right Now (آن لائن)</span>
            </label>
          </div>

          {/* Sort Selector */}
          <div className="space-y-1.5 pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10">
            <label className="text-xs font-bold text-[#4A635E] dark:text-[#96B5AF]">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'experience')}
              className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
            >
              <option value="rating">Highest Customer Rating (4.9★)</option>
              <option value="price">Lowest Starting Fee</option>
              <option value="experience">Years of Experience</option>
            </select>
          </div>

        </div>

        {/* Right Content Area: List or Map */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-[#4A635E] dark:text-[#96B5AF] px-1">
            <span>Showing <strong>{filteredProviders.length}</strong> vetted professionals</span>
            <span>All covered by 100% price protection</span>
          </div>

          {/* MAP VIEW */}
          {viewMode === 'map' && (
            <div className="w-full h-96 rounded-2xl glass-panel border border-[#0F5C4D]/15 overflow-hidden relative p-4 flex flex-col justify-between bg-gradient-to-br from-[#0F5C4D]/10 to-[#1FA971]/10">
              
              {/* Interactive Swat Map Simulation SVG Canvas */}
              <div className="absolute inset-0 flex items-center justify-center opacity-85">
                <svg className="w-full h-full" viewBox="0 0 600 400">
                  <path
                    d="M 120 80 Q 200 120 300 200 T 480 320"
                    fill="none"
                    stroke="#1FA971"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    opacity="0.6"
                  />
                  {/* Swat Valley outline styling */}
                  <circle cx="280" cy="180" r="14" fill="#0F5C4D" fillOpacity="0.2" />
                  <circle cx="280" cy="180" r="5" fill="#0F5C4D" />
                  <text x="295" y="185" fill="#0B1F1C" fontSize="12" fontWeight="bold">Mingora City (Center)</text>

                  <circle cx="340" cy="220" r="10" fill="#1FA971" fillOpacity="0.2" />
                  <circle cx="340" cy="220" r="4" fill="#1FA971" />
                  <text x="355" y="225" fill="#0B1F1C" fontSize="11" fontWeight="bold">Saidu Sharif</text>

                  <circle cx="210" cy="140" r="10" fill="#F5A524" fillOpacity="0.2" />
                  <circle cx="210" cy="140" r="4" fill="#F5A524" />
                  <text x="145" y="145" fill="#0B1F1C" fontSize="11" fontWeight="bold">Kanju Township</text>

                  <circle cx="390" cy="90" r="8" fill="#23BCA0" fillOpacity="0.2" />
                  <circle cx="390" cy="90" r="3" fill="#23BCA0" />
                  <text x="405" y="95" fill="#0B1F1C" fontSize="11" fontWeight="bold">Matta</text>
                </svg>
              </div>

              {/* Top Map Banner */}
              <div className="relative z-10 p-3 rounded-xl bg-white/90 dark:bg-[#0E2420]/90 border border-[#0F5C4D]/20 shadow-sm max-w-sm">
                <span className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
                  Active GPS Dispatch Hubs in Swat
                </span>
                <p className="text-[11px] text-[#7E9691] mt-0.5">
                  Pins indicate vetted technicians ready for 20-30 min arrival.
                </p>
              </div>

              {/* Bottom Quick Card on Map */}
              <div className="relative z-10 flex gap-2 overflow-x-auto">
                {filteredProviders.slice(0, 3).map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 shadow-md flex items-center gap-3 shrink-0">
                    <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F1C] dark:text-white">{p.name}</h4>
                      <p className="text-[10px] text-[#7E9691]">{p.area} • ★ {p.rating}</p>
                    </div>
                    <Link
                      href={`/providers/${p.id}`}
                      className="px-2.5 py-1 rounded-lg bg-[#0F5C4D] text-white text-[10px] font-bold"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="p-5 sm:p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 dark:border-white/10 hover:border-[#1FA971] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative shrink-0">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#1FA971]"
                      />
                      {prov.isAvailableNow && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1FA971] border-2 border-white dark:border-[#0E2420]" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
                          {prov.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0]">
                          <ShieldCheck className="w-3 h-3" />
                          CNIC Verified
                        </span>
                      </div>

                      <p className="text-xs text-[#0F5C4D] dark:text-[#23BCA0] font-semibold">
                        {prov.title[language] || prov.title.en}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#7E9691] pt-0.5">
                        <span className="flex items-center gap-1 text-[#0B1F1C] dark:text-white font-bold">
                          <Star className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                          {prov.rating} ({prov.reviewCount} reviews)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
                          {prov.area}
                        </span>
                        <span>•</span>
                        <span>{prov.jobsCompleted}+ jobs completed</span>
                      </div>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {prov.skills.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4F8F7] dark:bg-[#071513] text-[#4A635E] dark:text-[#96B5AF]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#0F5C4D]/10 dark:border-white/10 gap-3 shrink-0">
                    <div className="text-start sm:text-end">
                      <span className="text-[10px] text-[#7E9691] block">Inspection Callout:</span>
                      <span className="font-heading font-black text-base text-[#0B1F1C] dark:text-white">
                        Rs. {prov.calloutFeePKR} PKR
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/providers/${prov.id}`}
                        className="px-3.5 py-2 rounded-xl border border-[#0F5C4D]/20 text-xs font-semibold text-[#0B1F1C] dark:text-white hover:bg-[#F4F8F7] dark:hover:bg-[#071513]"
                      >
                        Profile
                      </Link>
                      <Link
                        href={`/book?provider=${prov.id}&category=${prov.category}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white text-xs font-bold hover:shadow-md active:scale-95 transition-all"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>

                </div>
              ))}

              {filteredProviders.length === 0 && (
                <div className="p-12 text-center rounded-2xl glass-panel space-y-3">
                  <p className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
                    No verified technicians match these exact filters.
                  </p>
                  <p className="text-xs text-[#7E9691]">
                    Try adjusting the price slider or resetting Swat town filters.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading KaamSaathi Services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
