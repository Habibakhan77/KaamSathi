'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          Legal & Safety
        </span>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
          KaamSaathi Privacy Policy
        </h1>
        <p className="text-xs text-[#7E9691]">Last updated: November 2026 • Swat, Pakistan</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6 text-xs text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            When you use KaamSaathi to book services in Swat, we collect your contact information (name, mobile phone number for OTP authentication), physical service address and landmarks, and audio/text service problem descriptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            2. Provider Verification Data
          </h2>
          <p>
            Technicians submit their NADRA CNIC, police character clearance, and skill certifications. This data is strictly stored in private encrypted storage buckets with Row Level Security and never sold to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            3. AI Triage & Voice Privacy
          </h2>
          <p>
            Voice queries in Urdu or English are processed server-side solely to extract the service domain, urgency, and estimated cost. No biometric voiceprints are retained.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
            4. Contact
          </h2>
          <p>
            For privacy inquiries, contact our Swat desk at <span className="font-bold text-[#0F5C4D] dark:text-[#23BCA0]">privacy@kaamsaathi.pk</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
