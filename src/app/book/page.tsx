'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  SERVICE_CATEGORIES, 
  MOCK_PROVIDERS, 
  SWAT_AREAS 
} from '@/lib/data/mockData';
import { ServiceCategoryId } from '@/lib/types';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Truck, 
  Check, 
  AlertCircle,
  PhoneCall,
  UserCheck
} from 'lucide-react';

function BookingContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const preselectedCategory = searchParams.get('category') as ServiceCategoryId | null;
  const preselectedProviderId = searchParams.get('provider');

  // Multi-step State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [category, setCategory] = useState<ServiceCategoryId>(preselectedCategory || 'ac_technician');
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'scheduled'>('today');
  const [problemDescription, setProblemDescription] = useState('Inverter AC is not cooling properly and making buzzing sound');
  const [scheduledDate, setScheduledDate] = useState('2026-11-02');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [selectedArea, setSelectedArea] = useState('Saidu Sharif');
  const [streetAddress, setStreetAddress] = useState('House 42, St 5, Near Serena Hotel Road');
  const [landmark, setLandmark] = useState('Opposite Govt Girls College');
  const [customerName, setCustomerName] = useState('Kamran Ali');
  const [customerPhone, setCustomerPhone] = useState('+92 300 9078654');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_completion' | 'easypaisa' | 'jazzcash'>('cash_on_completion');

  // Selected Provider
  const [chosenProviderId, setChosenProviderId] = useState<string>(
    preselectedProviderId || MOCK_PROVIDERS[0].id
  );

  const chosenProvider = MOCK_PROVIDERS.find((p) => p.id === chosenProviderId) || MOCK_PROVIDERS[0];

  // Tracker State after confirmation
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [trackerStep, setTrackerStep] = useState<number>(2); // 1: Requested, 2: Assigned, 3: En route, 4: Arrived

  const handleFinishBooking = () => {
    setBookingConfirmed(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas-confetti doesn't run
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Step Header */}
      {!bookingConfirmed && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
              Safe & Guaranteed Booking
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
              Book a Verified Mistri in Swat
            </h1>
          </div>

          {/* Stepper Wizard Bar */}
          <div className="flex items-center justify-between max-w-xl mx-auto pt-4">
            {[
              { num: 1, label: 'Problem' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Location' },
              { num: 4, label: 'Review' }
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs transition-all ${
                      currentStep === step.num
                        ? 'bg-[#0F5C4D] text-white ring-4 ring-[#1FA971]/20'
                        : currentStep > step.num
                        ? 'bg-[#1FA971] text-white'
                        : 'bg-gray-200 dark:bg-gray-800 text-[#7E9691]'
                    }`}
                  >
                    {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span className="text-[11px] font-semibold text-[#4A635E] dark:text-[#96B5AF]">
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      currentStep > step.num ? 'bg-[#1FA971]' : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: PROBLEM DETAILS */}
      {!bookingConfirmed && currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
              Step 1: Describe the Problem
            </h2>
            <p className="text-xs text-[#7E9691]">
              Select the service type and describe symptoms.
            </p>
          </div>

          {/* Category Select Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-3 rounded-2xl text-start border transition-all ${
                  category === cat.id
                    ? 'border-[#1FA971] bg-[#1FA971]/10 font-bold'
                    : 'border-[#0F5C4D]/15 hover:border-[#1FA971] bg-white dark:bg-[#071513]'
                }`}
              >
                <span className="font-heading text-xs text-[#0B1F1C] dark:text-white block">
                  {cat.title[language] || cat.title.en}
                </span>
                <span className="text-[10px] text-[#7E9691] mt-0.5 block">
                  From Rs. {cat.startingPricePKR}
                </span>
              </button>
            ))}
          </div>

          {/* Urgency Radio Selector */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#0B1F1C] dark:text-white block">
              Urgency Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'emergency', label: 'Emergency (within 45 mins)', fee: '+Rs. 300' },
                { id: 'today', label: 'Today (Standard)', fee: 'Regular Rate' },
                { id: 'scheduled', label: 'Schedule for Later Date', fee: 'No Rush' }
              ].map((urg) => (
                <button
                  key={urg.id}
                  type="button"
                  onClick={() => setUrgency(urg.id as 'emergency' | 'today' | 'scheduled')}
                  className={`p-3 rounded-xl text-start border text-xs transition-all ${
                    urgency === urg.id
                      ? 'border-[#0F5C4D] bg-[#0F5C4D] text-white font-bold'
                      : 'border-[#0F5C4D]/15 bg-white dark:bg-[#071513] text-[#0B1F1C] dark:text-white'
                  }`}
                >
                  <span>{urg.label}</span>
                  <span className="text-[10px] opacity-80 block">{urg.fee}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">
              Describe Issue Details
            </label>
            <textarea
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl p-3 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs flex items-center gap-2 hover:shadow-md"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SCHEDULE */}
      {!bookingConfirmed && currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
              Step 2: Choose Date & Arrival Window
            </h2>
            <p className="text-xs text-[#7E9691]">
              Select when you would like the technician to arrive at your premises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1FA971]" />
                Preferred Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1FA971]" />
                Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              >
                <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">Noon: 11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">Evening: 04:00 PM - 06:00 PM</option>
                <option value="07:00 PM - 09:00 PM">Night: 07:00 PM - 09:00 PM</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs flex items-center gap-2 hover:shadow-md"
            >
              <span>Continue to Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LOCATION & CONTACT */}
      {!bookingConfirmed && currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
              Step 3: Service Address & Contact Details
            </h2>
            <p className="text-xs text-[#7E9691]">
              Provide your exact street address and prominent landmark for prompt navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Swat Area / Town</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              >
                {SWAT_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Prominent Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g., Near Nishat Chowk / Serena Hotel"
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">House & Street Address</label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="House #, Street #, Mohalla..."
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Your Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Mobile Phone Number (OTP verified)</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs flex items-center gap-2 hover:shadow-md"
            >
              <span>Review & Confirm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {!bookingConfirmed && currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
              Step 4: Review Booking Summary
            </h2>
            <p className="text-xs text-[#7E9691]">
              Review transparent pricing and assigned verified technician.
            </p>
          </div>

          {/* Assigned Technician Card */}
          <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={chosenProvider.avatar}
                alt={chosenProvider.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#1FA971]"
              />
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#0B1F1C] dark:text-white flex items-center gap-1">
                  {chosenProvider.name}
                  <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
                </h4>
                <p className="text-[11px] text-[#7E9691]">
                  ★ {chosenProvider.rating} • {chosenProvider.jobsCompleted}+ jobs completed
                </p>
              </div>
            </div>

            <div className="text-end text-xs">
              <span className="text-[#7E9691] block">Inspection Fee:</span>
              <span className="font-bold text-[#0F5C4D] dark:text-[#23BCA0]">
                Rs. {chosenProvider.calloutFeePKR} PKR
              </span>
            </div>
          </div>

          {/* Booking Breakdown Table */}
          <div className="rounded-2xl border border-[#0F5C4D]/10 overflow-hidden text-xs">
            <div className="p-3 bg-white/60 dark:bg-[#0E2420]/60 flex justify-between border-b border-[#0F5C4D]/10">
              <span className="text-[#7E9691]">Issue:</span>
              <span className="font-bold text-[#0B1F1C] dark:text-white max-w-xs truncate">{problemDescription}</span>
            </div>
            <div className="p-3 bg-white/40 dark:bg-[#0E2420]/40 flex justify-between border-b border-[#0F5C4D]/10">
              <span className="text-[#7E9691]">Schedule:</span>
              <span className="font-bold text-[#0B1F1C] dark:text-white">{scheduledDate} ({timeSlot})</span>
            </div>
            <div className="p-3 bg-white/60 dark:bg-[#0E2420]/60 flex justify-between border-b border-[#0F5C4D]/10">
              <span className="text-[#7E9691]">Address:</span>
              <span className="font-bold text-[#0B1F1C] dark:text-white">{streetAddress}, {selectedArea}</span>
            </div>
            <div className="p-3 bg-white/40 dark:bg-[#0E2420]/40 flex justify-between">
              <span className="text-[#7E9691]">Payment Method:</span>
              <span className="font-bold text-[#1FA971]">Pay After Complete Inspection</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1FA971]/10 text-xs text-[#0F5C4D] dark:text-[#23BCA0] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Zero Advance Required. You only pay after you test and inspect the technician's completed repair.</span>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleFinishBooking}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-black text-sm shadow-xl hover:shadow-[#1FA971]/30 active:scale-95 transition-all"
            >
              Confirm Booking (بکنگ مکمل کریں)
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMED STATE WITH LIVE TRACKER */}
      {bookingConfirmed && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#1FA971]/30 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#1FA971]/20 text-[#1FA971] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1FA971]">
              Booking Successfully Created!
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
              Order #KS-SWAT-8901
            </h2>
            <p className="text-xs text-[#4A635E] dark:text-[#96B5AF]">
              SMS & WhatsApp dispatch confirmation sent to {customerPhone}
            </p>
          </div>

          {/* LIVE STATUS TRACKER PIPELINE */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#071513] border border-[#0F5C4D]/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-xs sm:text-sm text-[#0B1F1C] dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1FA971] animate-ping" />
                Live Status Tracker
              </span>
              <span className="text-xs font-bold text-[#0F5C4D] dark:text-[#23BCA0]">
                ETA: 18 Minutes
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {[
                { step: 1, label: 'Requested' },
                { step: 2, label: 'Assigned' },
                { step: 3, label: 'En Route' },
                { step: 4, label: 'Completed' }
              ].map((s) => (
                <div key={s.step} className="text-center space-y-1.5">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      trackerStep >= s.step ? 'bg-[#1FA971]' : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                  <span className={`text-[10px] font-bold block ${
                    trackerStep >= s.step ? 'text-[#0F5C4D] dark:text-[#23BCA0]' : 'text-[#7E9691]'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F8F7] dark:bg-[#0E2420] text-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={chosenProvider.avatar}
                  alt={chosenProvider.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#1FA971]"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#0B1F1C] dark:text-white">{chosenProvider.name}</h4>
                  <p className="text-[10px] text-[#7E9691]">Motorbike dispatched from Mingora Bypass</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${chosenProvider.phone}`}
                  className="p-2 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971]"
                  title="Call Technician"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard/customer"
              className="flex-1 py-3 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold text-center hover:bg-[#1FA971] transition-colors"
            >
              Go to Customer Dashboard
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-bold text-center text-[#0B1F1C] dark:text-white hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}
