'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MOCK_PROVIDERS } from '@/lib/data/mockData';
import { 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  X, 
  Upload, 
  FileText, 
  DollarSign, 
  Calendar,
  AlertCircle,
  Bell
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { t, language } = useLanguage();
  const provider = MOCK_PROVIDERS[0]; // Ustad Tariq Khan

  // State
  const [availability, setAvailability] = useState<'online' | 'busy' | 'offline'>('online');
  const [incomingJob, setIncomingJob] = useState<{
    id: string;
    customer: string;
    area: string;
    service: string;
    estEarnings: number;
    urgency: string;
    timeLeft: number;
  } | null>({
    id: 'KS-JOB-9023',
    customer: 'Dr. Afzal Khan',
    area: 'Saidu Sharif (near Teaching Hospital)',
    service: 'Inverter AC tripping compressor & gas top-up',
    estEarnings: 3200,
    urgency: 'Emergency (within 30 mins)',
    timeLeft: 85
  });

  const [cnicFrontUploaded, setCnicFrontUploaded] = useState(true);
  const [cnicBackUploaded, setCnicBackUploaded] = useState(true);
  const [policeCertUploaded, setPoliceCertUploaded] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Banner: Welcome + Availability Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F5C4D] via-[#0B3D36] to-[#072520] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1FA971]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-xl sm:text-2xl text-white">
                {provider.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1FA971] text-white">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-xs text-[#96B5AF]">
              AC Master Specialist • Swat Valley Dispatch • Level 3 Elite
            </p>
          </div>
        </div>

        {/* Availability Switch */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/10 self-start sm:self-auto">
          {[
            { id: 'online', label: 'Online (حاضر)', color: 'bg-[#1FA971]' },
            { id: 'busy', label: 'On Job (مصروف)', color: 'bg-[#F5A524]' },
            { id: 'offline', label: 'Offline (چھٹی)', color: 'bg-gray-500' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAvailability(mode.id as 'online' | 'busy' | 'offline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                availability === mode.id
                  ? 'bg-white text-[#0B1F1C] shadow-sm'
                  : 'text-[#96B5AF] hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode.color}`} />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* INCOMING LIVE JOB ALERT (Interactive Pulse) */}
      {incomingJob && (
        <div className="p-6 rounded-3xl glass-panel border-2 border-[#1FA971] shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#1FA971]/20 flex items-center justify-center text-[#1FA971]">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#1FA971] tracking-wider">
                  Direct Customer Dispatch Alert
                </span>
                <h3 className="font-heading font-black text-base text-[#0B1F1C] dark:text-white">
                  {incomingJob.service}
                </h3>
              </div>
            </div>

            <span className="text-xs font-black text-red-500 bg-red-100 dark:bg-red-950/40 px-3 py-1 rounded-full animate-pulse">
              ⏱ {incomingJob.timeLeft}s left to accept
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] text-xs">
            <div>
              <span className="text-[#7E9691] block">Customer:</span>
              <span className="font-bold text-[#0B1F1C] dark:text-white">{incomingJob.customer}</span>
            </div>
            <div>
              <span className="text-[#7E9691] block">Location:</span>
              <span className="font-bold text-[#0B1F1C] dark:text-white flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1FA971]" />
                {incomingJob.area}
              </span>
            </div>
            <div>
              <span className="text-[#7E9691] block">Expected Net Earnings:</span>
              <span className="font-black text-sm text-[#0F5C4D] dark:text-[#23BCA0]">
                Rs. {incomingJob.estEarnings.toLocaleString()} PKR
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIncomingJob(null)}
              className="flex-1 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold"
            >
              Pass to Next Technician
            </button>
            <button
              onClick={() => {
                alert('Job Accepted! Dispatched navigation route to Saidu Sharif.');
                setIncomingJob(null);
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-bold text-xs hover:shadow-lg active:scale-95 transition-all"
            >
              Accept Job (قبول کریں)
            </button>
          </div>
        </div>
      )}

      {/* METRICS & EARNINGS OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
          <span className="text-[11px] font-bold text-[#7E9691] uppercase">This Month PKR</span>
          <div className="font-heading font-black text-xl sm:text-2xl text-[#0F5C4D] dark:text-[#23BCA0]">
            Rs. 84,500
          </div>
          <span className="text-[10px] text-[#1FA971] font-semibold">↑ 18% vs last month</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
          <span className="text-[11px] font-bold text-[#7E9691] uppercase">Jobs Completed</span>
          <div className="font-heading font-black text-xl sm:text-2xl text-[#0B1F1C] dark:text-white">
            386 Jobs
          </div>
          <span className="text-[10px] text-[#7E9691]">100% in Swat</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
          <span className="text-[11px] font-bold text-[#7E9691] uppercase">Customer Rating</span>
          <div className="font-heading font-black text-xl sm:text-2xl text-[#F5A524]">
            4.94 ★
          </div>
          <span className="text-[10px] text-[#7E9691]">Based on 142 reviews</span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
          <span className="text-[11px] font-bold text-[#7E9691] uppercase">Commission Rate</span>
          <div className="font-heading font-black text-xl sm:text-2xl text-[#1FA971]">
            0% PKR
          </div>
          <span className="text-[10px] text-[#7E9691]">KaamSaathi Founding Free</span>
        </div>
      </div>

      {/* EARNINGS BAR GRAPH SIMULATION */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#1FA971]" />
            Weekly Cash Flow Breakdown (Swat Local Direct Payments)
          </h3>
          <span className="text-xs font-bold text-[#0F5C4D] dark:text-[#23BCA0]">Oct 25 - Nov 01</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-6 items-end h-44">
          {[
            { day: 'Mon', val: 3200, height: '40%' },
            { day: 'Tue', val: 5400, height: '65%' },
            { day: 'Wed', val: 2800, height: '35%' },
            { day: 'Thu', val: 7800, height: '90%' },
            { day: 'Fri', val: 9200, height: '100%' },
            { day: 'Sat', val: 6500, height: '75%' },
            { day: 'Sun', val: 4100, height: '50%' }
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-[10px] text-[#7E9691] font-semibold">{bar.val}</span>
              <div
                style={{ height: bar.height }}
                className="w-full rounded-xl bg-gradient-to-t from-[#0F5C4D] to-[#1FA971] hover:brightness-110 transition-all cursor-pointer"
                title={`${bar.day}: Rs. ${bar.val} PKR`}
              />
              <span className="text-[11px] font-bold text-[#0B1F1C] dark:text-white">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* VERIFICATION & DOCUMENT VAULT */}
      <div className="p-6 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#0F5C4D]/10">
          <div>
            <h3 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
              Trust & Verification Vault (شناختی کارڈ اور اسناد)
            </h3>
            <p className="text-xs text-[#7E9691]">Your documents are encrypted and audited by the Swat verification desk.</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0]">
            All Verified ✓
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0B1F1C] dark:text-white">CNIC Front Copy</span>
              <span className="text-[10px] text-[#1FA971] font-bold">Approved</span>
            </div>
            <p className="text-[11px] text-[#7E9691]">15602-*******-3 (Swat, Mingora)</p>
            <button className="text-[11px] text-[#0F5C4D] dark:text-[#23BCA0] font-bold hover:underline">
              View Scanned Copy
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0B1F1C] dark:text-white">Trade Exam Diploma</span>
              <span className="text-[10px] text-[#1FA971] font-bold">Approved</span>
            </div>
            <p className="text-[11px] text-[#7E9691]">DAE Refrigeration & HVAC</p>
            <button className="text-[11px] text-[#0F5C4D] dark:text-[#23BCA0] font-bold hover:underline">
              View Certificate
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0B1F1C] dark:text-white">Police Character Clearance</span>
              <span className="text-[10px] text-[#1FA971] font-bold">Approved</span>
            </div>
            <p className="text-[11px] text-[#7E9691]">Mingora Police Station Record</p>
            <button className="text-[11px] text-[#0F5C4D] dark:text-[#23BCA0] font-bold hover:underline">
              View Audit Pass
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
