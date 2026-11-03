'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MOCK_PROVIDERS, MOCK_REVIEWS } from '@/lib/data/mockData';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Calendar, 
  Check, 
  ArrowLeft, 
  MessageCircle, 
  Wrench, 
  Award,
  Sparkles,
  FileCheck
} from 'lucide-react';

function ProviderProfileContent() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();

  const provider = MOCK_PROVIDERS.find((p) => p.id === id) || MOCK_PROVIDERS[0];
  const reviews = MOCK_REVIEWS.filter((r) => r.providerId === provider.id || r.serviceCategory === provider.category);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top back button */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A635E] dark:text-[#96B5AF] hover:text-[#1FA971] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services Listing</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl object-cover border-4 border-[#1FA971] shadow-lg"
              />
              {provider.isAvailableNow && (
                <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-[#1FA971] text-white text-[10px] font-bold border-2 border-white dark:border-[#071513]">
                  Online
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading font-black text-xl sm:text-3xl text-[#0B1F1C] dark:text-white">
                  {provider.name}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0]">
                  <ShieldCheck className="w-4 h-4" />
                  NADRA Verified Mistri
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0F5C4D] dark:text-[#23BCA0] font-semibold">
                {provider.title[language] || provider.title.en}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7E9691] pt-1">
                <span className="flex items-center gap-1 text-[#0B1F1C] dark:text-white font-bold">
                  <Star className="w-4 h-4 text-[#F5A524] fill-[#F5A524]" />
                  {provider.rating} ({provider.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
                  {provider.area}
                </span>
                <span>•</span>
                <span>{provider.yearsExperience} Years Trade Experience</span>
              </div>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-row sm:flex-col gap-2.5 w-full sm:w-auto">
            <Link
              href={`/book?provider=${provider.id}&category=${provider.category}`}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs text-center hover:shadow-lg active:scale-95 transition-all"
            >
              Book Service Now
            </Link>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-[#0F5C4D]/25 text-[#0B1F1C] dark:text-white font-bold text-xs hover:bg-[#F4F8F7] dark:hover:bg-[#071513] transition-colors"
            >
              Request Free Quote
            </button>
          </div>
        </div>

        {/* Verification Seals Row */}
        <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1FA971]/20 flex items-center justify-center text-[#1FA971]">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#0B1F1C] dark:text-white block">Biometric CNIC Audit</span>
              <span className="text-[11px] text-[#7E9691]">Nadra verified & matched</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A524]/20 flex items-center justify-center text-[#F5A524]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#0B1F1C] dark:text-white block">Trade Exam Certified</span>
              <span className="text-[11px] text-[#7E9691]">Skill assessment passed</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F5C4D]/20 flex items-center justify-center text-[#0F5C4D] dark:text-[#23BCA0]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#0B1F1C] dark:text-white block">Swat Police Cleared</span>
              <span className="text-[11px] text-[#7E9691]">Safe home entry guaranteed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Profile Body: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3): Bio, Skills, Past Work, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Biography */}
          <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 space-y-3">
            <h2 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#1FA971]" />
              Professional Background & Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF] leading-relaxed">
              {provider.bio[language] || provider.bio.en}
            </p>

            <div className="pt-3 border-t border-[#0F5C4D]/10 dark:border-white/10 space-y-2">
              <span className="text-xs font-bold text-[#0B1F1C] dark:text-white block">
                Specialized Trade Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-xl bg-[#1FA971]/10 text-[#0F5C4D] dark:text-[#23BCA0] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 space-y-3">
            <h2 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1FA971]" />
              Service Coverage Locations in Swat
            </h2>
            <p className="text-xs text-[#7E9691]">
              Average arrival time within 25-30 minutes across these hubs:
            </p>
            <div className="flex flex-wrap gap-2">
              {provider.serviceAreas.map((area, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-[#071513] border border-[#0F5C4D]/15 text-[#0B1F1C] dark:text-white font-medium flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1FA971]" />
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F5A524] fill-[#F5A524]" />
                Customer Reviews & Ratings ({reviews.length})
              </h2>
              <span className="text-xs font-bold text-[#1FA971]">100% Verified Bookings</span>
            </div>

            <div className="space-y-4 divide-y divide-[#0F5C4D]/10 dark:divide-white/10">
              {reviews.map((rev) => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-[#0B1F1C] dark:text-white">
                        {rev.authorName}
                      </h4>
                      <p className="text-[10px] text-[#7E9691] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#1FA971]" />
                        {rev.location} • {rev.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#4A635E] dark:text-[#96B5AF] italic">
                    "{rev.comment[language] || rev.comment.en}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1/3): Pricing Card & Direct Booking Widget */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl glass-panel border border-[#0F5C4D]/15 shadow-md space-y-5">
            <h3 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white pb-3 border-b border-[#0F5C4D]/10">
              Transparent Rate Card
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#4A635E] dark:text-[#96B5AF]">Inspection Callout Fee:</span>
                <span className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
                  Rs. {provider.calloutFeePKR} PKR
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4A635E] dark:text-[#96B5AF]">Hourly Labor Rate:</span>
                <span className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white">
                  Rs. {provider.hourlyRatePKR} PKR/hr
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4A635E] dark:text-[#96B5AF]">Emergency 1-Hour Arrival:</span>
                <span className="font-bold text-[#1FA971]">Available (+Rs. 300)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1FA971]/10 text-xs text-[#0F5C4D] dark:text-[#23BCA0] space-y-1">
              <span className="font-bold block">✓ KaamSaathi Guarantee</span>
              <p className="text-[11px] leading-relaxed">
                If the problem is not correctly diagnosed, the inspection fee is fully refunded.
              </p>
            </div>

            <Link
              href={`/book?provider=${provider.id}&category=${provider.category}`}
              className="w-full block py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs text-center shadow-md active:scale-95 transition-all"
            >
              Proceed to Book
            </Link>

            <a
              href={`https://wa.me/923459512034?text=Salam!%20Mujhe%20Ustad%20${encodeURIComponent(provider.name)}%20ki%20service%20chahiye`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-[#071513] font-bold text-xs hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>

          {/* Safety Notice Card */}
          <div className="p-5 rounded-2xl bg-white/40 dark:bg-[#071513]/40 border border-[#0F5C4D]/10 text-xs space-y-2">
            <span className="font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
              Safe Home Protocol
            </span>
            <p className="text-[#7E9691] text-[11px] leading-relaxed">
              Always verify the technician's digital KaamSaathi badge on arrival before granting entry.
            </p>
          </div>

        </div>

      </div>

      {/* Quote Request Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl glass-panel shadow-2xl border border-[#0F5C4D]/20 p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-[#0B1F1C] dark:text-white">
              Request Quote from {provider.name}
            </h3>
            <p className="text-xs text-[#7E9691]">
              Describe the issue or parts needed. The technician will respond with a preliminary estimate within 15 minutes.
            </p>

            <textarea
              rows={4}
              value={quoteMessage}
              onChange={(e) => setQuoteMessage(e.target.value)}
              placeholder="e.g., Gas refilling for 1.5 ton inverter AC in Saidu Sharif..."
              className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl p-3 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
            />

            {quoteSubmitted ? (
              <div className="p-3 rounded-xl bg-[#1FA971]/15 text-[#1FA971] text-xs font-bold text-center">
                ✓ Quote request dispatched! You will receive an SMS and WhatsApp alert.
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setQuoteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0B1F1C] dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setQuoteSubmitted(true);
                    setTimeout(() => {
                      setQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }, 2000);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971] transition-colors"
                >
                  Send Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function ProviderProfilePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Provider Profile...</div>}>
      <ProviderProfileContent />
    </Suspense>
  );
}
