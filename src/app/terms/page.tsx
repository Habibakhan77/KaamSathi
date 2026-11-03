'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A635E] dark:text-[#96B5AF] hover:text-[#1FA971]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
          Marketplace Rules
        </span>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
          Terms of Service & Quality Guarantee
        </h1>
        <p className="text-xs text-[#7E9691]">Last updated: November 2026 • KaamSaathi Swat</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6 text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            1. Scope of Marketplace
          </h2>
          <p>
            KaamSaathi connects verified local professionals in Swat (AC technicians, electricians, plumbers, carpenters, cleaners) with residential and commercial customers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            2. Inspection Callout & Price Protection
          </h2>
          <p>
            Customers agree to the nominal published callout inspection fee upon technician arrival. For repair labor and spare parts, technicians must state the final cost before commencing disassembly or repair. If the customer declines repair after diagnosis, only the inspection fee applies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            3. 100% Satisfaction & Guarantee
          </h2>
          <p>
            If a completed repair fails within 7 days, KaamSaathi provides free re-inspection and mediation with the assigned technician or dispatches a senior master technician at zero additional callout fee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            4. Safe Home Entry
          </h2>
          <p>
            Customers must verify the technician's digital badge matching their app order before granting entry.
          </p>
        </section>
      </div>
    </div>
  );
}
