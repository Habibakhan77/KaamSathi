'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ShieldCheck, Heart, MapPin, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
          Our Swat Valley Story
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#0B1F1C] dark:text-white leading-tight">
          Restoring Trust & Dignity in Pakistan's Local Services
        </h1>
        <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
          KaamSaathi was conceived in Mingora, Swat to solve a fundamental reality: finding a reliable, honest electrician or plumber in Pakistan should not feel like gambling with your family's safety and hard-earned savings.
        </p>
      </div>

      {/* Visual Mission Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0F5C4D] to-[#0B3D36] text-white space-y-6 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-xs font-bold text-[#F5A524] uppercase tracking-wider">
            "Swat se shuru, poore Pakistan tak"
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Why Swat Was Our Launchpad
          </h2>
          <p className="text-xs sm:text-sm text-[#96B5AF] leading-relaxed">
            Swat is home to some of the most skilled woodworkers, electricians, and tradesmen in the country. Yet, the traditional bazaar middleman ecosystem squeezed their incomes while leaving homeowners unprotected from irregular pricing and zero accountability.
          </p>
          <p className="text-xs sm:text-sm text-[#96B5AF] leading-relaxed">
            By combining biometric NADRA CNIC verification with an AI dispatch engine that understands everyday Urdu and Roman Urdu voice requests, we created Pakistan's first truly trusted marketplace.
          </p>
        </div>
      </div>

      {/* 3 Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1FA971]/20 flex items-center justify-center text-[#1FA971]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
            Uncompromising Safety
          </h3>
          <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
            No technician enters a home without verified biometric identity, verified residential records, and local police character clearance.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5A524]/20 flex items-center justify-center text-[#F5A524]">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
            Worker Dignity
          </h3>
          <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
            We do not gouge technicians with 30% aggregator commissions. Technicians take home honest direct cash payments on the day work is done.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#23BCA0]/20 flex items-center justify-center text-[#23BCA0]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
            AI Localization
          </h3>
          <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
            Built for how Pakistanis actually communicate on phones: native voice, Roman Urdu, and clear price estimates before booking.
          </p>
        </div>
      </div>

      {/* Office & Operations Card */}
      <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-start">
          <h4 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            Visit Our Regional Operational Hub in Swat
          </h4>
          <p className="text-xs text-[#7E9691]">
            Main Bypass Road, Mingora, District Swat, Khyber Pakhtunkhwa.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971] transition-colors"
        >
          Contact Our Team
        </Link>
      </div>

    </div>
  );
}
