'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Lock
} from 'lucide-react';
import { SWAT_AREAS } from '@/lib/data/mockData';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-[#0B3D36] text-[#E6F4F1] border-t border-[#147A66]/30 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[#147A66]/30">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1FA971]/20 flex items-center justify-center shrink-0 text-[#23BCA0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                {t('trustVerified')}
              </h4>
              <p className="text-xs text-[#96B5AF] mt-1">
                Every technician undergoes biometric CNIC check and criminal record verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F5A524]/20 flex items-center justify-center shrink-0 text-[#F5A524]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                {t('trustFixedPricing')}
              </h4>
              <p className="text-xs text-[#96B5AF] mt-1">
                Standardized diagnostic call-out fee and upfront fair PKR estimates without hidden charges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1FA971]/20 flex items-center justify-center shrink-0 text-[#23BCA0]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                {language === 'ur' ? 'مصنوعی ذہانت سے فوری تشخیص' : 'AI-Powered Triage'}
              </h4>
              <p className="text-xs text-[#96B5AF] mt-1">
                Describe the problem in Urdu or English; get matched with top specialists in your neighborhood.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#23BCA0]/20 flex items-center justify-center shrink-0 text-[#23BCA0]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                {t('trustSatisfaction')}
              </h4>
              <p className="text-xs text-[#96B5AF] mt-1">
                Inspect the work first, then pay via Cash, Easypaisa, or JazzCash with complete peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1FA971] flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" opacity="0.4" />
                  <path d="M8 15h3l2 2h3" stroke="#F5A524" strokeWidth="2.2" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-2xl text-white">
                KaamSaathi
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#96B5AF] leading-relaxed max-w-sm">
              {language === 'ur'
                ? 'سوات سے شروع ہونے والا پاکستان کا پہلا تصدیق شدہ سروسز پلیٹ فارم جو جدید ٹیکنالوجی سے گھروں اور ہنر مندوں کو جوڑتا ہے۔'
                : language === 'roman'
                ? 'Swat se shuru hone wala Pakistan ka pehla verified services network jo modern AI se gharon aur mistriyon ko connect karta hai.'
                : 'Swat’s pioneer AI-driven marketplace elevating trust, dignity for technicians, and guaranteed service quality for households.'}
            </p>

            <div className="space-y-2 text-xs text-[#96B5AF] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1FA971] shrink-0" />
                <span>Head Office: Main Bypass Road, Mingora, District Swat, KP</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#1FA971] shrink-0" />
                <span>Support Line: +92 345 9512034 (Mon-Sun 8 AM - 10 PM)</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/923459512034?text=Salam%20KaamSaathi%20Support!%20Mujhe%20service%20chahiye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-[#071513] font-bold text-xs hover:bg-[#20ba59] transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (فوری رابطہ)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-xs text-white uppercase tracking-wider">
              {language === 'ur' ? 'اہم سروسز' : 'Popular Services'}
            </h5>
            <ul className="space-y-2 text-xs text-[#96B5AF]">
              <li><Link href="/services?category=ac_technician" className="hover:text-white transition-colors">AC & Inverter Repair</Link></li>
              <li><Link href="/services?category=electrician" className="hover:text-white transition-colors">Solar & Home Wiring</Link></li>
              <li><Link href="/services?category=plumber" className="hover:text-white transition-colors">Water Motor & Geysers</Link></li>
              <li><Link href="/services?category=carpenter" className="hover:text-white transition-colors">Swati Wood & Carpentry</Link></li>
              <li><Link href="/services?category=cleaner" className="hover:text-white transition-colors">Water Tank Chlorine Wash</Link></li>
              <li><Link href="/services?category=appliance_repair" className="hover:text-white transition-colors">Automatic Washing Machines</Link></li>
            </ul>
          </div>

          {/* Company & Portals */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-xs text-white uppercase tracking-wider">
              {language === 'ur' ? 'پلیٹ فارم' : 'Platform & Portals'}
            </h5>
            <ul className="space-y-2 text-xs text-[#96B5AF]">
              <li><Link href="/ai-assistant" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[#F5A524]" /> AI Triage Assistant</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book a Service Now</Link></li>
              <li><Link href="/dashboard/customer" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link href="/dashboard/provider" className="hover:text-white transition-colors">Mistri / Provider Portal</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-white transition-colors">Admin Verification Portal</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Swat Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal & Swat Coverage */}
          <div className="space-y-3">
            <h5 className="font-heading font-semibold text-xs text-white uppercase tracking-wider">
              {language === 'ur' ? 'قانونی اور حفاظت' : 'Trust & Safety'}
            </h5>
            <ul className="space-y-2 text-xs text-[#96B5AF]">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><span className="text-[#1FA971] font-medium">NADRA CNIC Verification Policy</span></li>
              <li><span className="text-[#1FA971] font-medium">Price Guarantee Guidelines</span></li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] text-[#96B5AF] block mb-1 font-semibold">Active Coverage Hubs:</span>
              <div className="flex flex-wrap gap-1">
                {SWAT_AREAS.slice(0, 6).map((area) => (
                  <span key={area} className="text-[10px] bg-[#0F5C4D] text-[#E6F4F1] px-2 py-0.5 rounded-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#147A66]/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E9691] gap-4">
          <p>© 2026 KaamSaathi Technologies (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#1FA971]" />
              Swat Valley Operations Active
            </span>
            <span>•</span>
            <span>Made with pride in Swat, KP, Pakistan 🇵🇰</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
