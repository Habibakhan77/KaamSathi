'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MOCK_PROVIDERS, MOCK_BOOKINGS, SWAT_AREAS } from '@/lib/data/mockData';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MapPin, 
  Eye, 
  TrendingUp, 
  BarChart3, 
  PhoneCall,
  Check,
  Search,
  Filter
} from 'lucide-react';

interface VerificationApplicant {
  id: string;
  name: string;
  category: string;
  area: string;
  cnic: string;
  experienceYears: number;
  tradeCertificateUrl: string;
  policeClearanceUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'verifications' | 'bookings' | 'disputes' | 'analytics'>('verifications');

  const [applicants, setApplicants] = useState<VerificationApplicant[]>([
    {
      id: 'app-01',
      name: 'Ihsan Ullah Khan',
      category: 'Plumber & Sanitary',
      area: 'Kanju Township',
      cnic: '15602-8921743-1',
      experienceYears: 8,
      tradeCertificateUrl: 'PPRC Welding & Pipe Fitting Diploma (GCT Swat)',
      policeClearanceUrl: 'Police Station Kanju Clearance #KP-9021',
      status: 'pending',
      appliedDate: '2 hours ago'
    },
    {
      id: 'app-02',
      name: 'Niamat Wali',
      category: 'Solar & Electrician',
      area: 'Mingora, New Road',
      cnic: '15601-3829104-5',
      experienceYears: 6,
      tradeCertificateUrl: 'Solar Hybrid Inverter Certified Installer (TEVTA)',
      policeClearanceUrl: 'Mingora Central Police Office Cleared',
      status: 'pending',
      appliedDate: '5 hours ago'
    },
    {
      id: 'app-03',
      name: 'Samiullah Swati',
      category: 'Carpenter',
      area: 'Barikot',
      cnic: '15603-1928471-7',
      experienceYears: 12,
      tradeCertificateUrl: 'Swati Deodar Artisan Guild Member',
      policeClearanceUrl: 'Barikot Station Cleared',
      status: 'pending',
      appliedDate: '1 day ago'
    }
  ]);

  const [selectedApplicant, setSelectedApplicant] = useState<VerificationApplicant | null>(applicants[0]);

  const handleApprove = (id: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );
  };

  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F5C4D]/10 dark:border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
            Swat Central Admin Desk
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            Trust & Quality Operations Control
          </h1>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            NADRA CNIC Audit, Swat Dispatch Health & Guarantee Mediations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1FA971] animate-ping" />
            System Healthy: 180 Active Pros
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0F5C4D]/10 pb-2">
        {[
          { id: 'verifications', label: `CNIC Audit Queue (${applicants.filter(a => a.status === 'pending').length})` },
          { id: 'bookings', label: 'Live Bookings Monitor (2)' },
          { id: 'disputes', label: 'Dispute Mediation (0)' },
          { id: 'analytics', label: 'Regional Swat Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'verifications' | 'bookings' | 'disputes' | 'analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#0F5C4D] text-white shadow-xs'
                : 'text-[#4A635E] dark:text-[#96B5AF] hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VERIFICATIONS TAB */}
      {activeTab === 'verifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Applicant List */}
          <div className="space-y-3">
            <span className="font-heading font-bold text-xs text-[#7E9691] uppercase tracking-wider block">
              Pending Provider Applications:
            </span>

            {applicants.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApplicant(app)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedApplicant?.id === app.id
                    ? 'border-[#1FA971] bg-white dark:bg-[#0E2420] shadow-md'
                    : 'border-[#0F5C4D]/10 bg-white/50 dark:bg-[#071513]/50 hover:border-[#1FA971]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-white">
                    {app.name}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      app.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : app.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-[#0F5C4D] dark:text-[#23BCA0] font-medium mt-0.5">
                  {app.category} • {app.area}
                </p>
                <p className="text-[10px] text-[#7E9691] mt-1">
                  Applied {app.appliedDate} • {app.experienceYears} yrs experience
                </p>
              </div>
            ))}
          </div>

          {/* Right (2 cols): Inspection Details & Action Panel */}
          {selectedApplicant && (
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#0F5C4D]/10">
                <div>
                  <span className="text-[10px] font-bold text-[#1FA971] uppercase tracking-wider">
                    Application Details #{selectedApplicant.id}
                  </span>
                  <h3 className="font-heading font-black text-xl text-[#0B1F1C] dark:text-white">
                    {selectedApplicant.name}
                  </h3>
                  <p className="text-xs text-[#7E9691]">{selectedApplicant.category} • {selectedApplicant.area}</p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedApplicant.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleReject(selectedApplicant.id)}
                        className="px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(selectedApplicant.id)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white text-xs font-bold hover:shadow-md"
                      >
                        Approve & Verify (تصدیق کریں)
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-800">
                      Status: {selectedApplicant.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Document Audit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 space-y-2">
                  <span className="font-bold text-[#0B1F1C] dark:text-white block">NADRA CNIC Biometric Match</span>
                  <p className="text-[11px] text-[#7E9691]">Number: {selectedApplicant.cnic}</p>
                  <p className="text-[11px] text-[#1FA971] font-semibold">✓ CNIC image front & back uploaded</p>
                  <div className="w-full h-28 rounded-xl bg-gray-200 dark:bg-gray-800 border flex items-center justify-center text-[#7E9691] text-[11px]">
                    [Scanned NADRA CNIC Document Preview]
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 space-y-2">
                  <span className="font-bold text-[#0B1F1C] dark:text-white block">Police Character Audit</span>
                  <p className="text-[11px] text-[#7E9691]">{selectedApplicant.policeClearanceUrl}</p>
                  <p className="text-[11px] text-[#1FA971] font-semibold">✓ Zero criminal cases flagged in Swat</p>
                  <div className="w-full h-28 rounded-xl bg-gray-200 dark:bg-gray-800 border flex items-center justify-center text-[#7E9691] text-[11px]">
                    [Police Clearance Stamp Preview]
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1FA971]/10 text-xs text-[#0F5C4D] dark:text-[#23BCA0]">
                <strong>Trade Verification Notes:</strong> {selectedApplicant.tradeCertificateUrl}. Verified by Swat technical guild board.
              </div>

            </div>
          )}

        </div>
      )}

      {/* BOOKINGS MONITOR TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {MOCK_BOOKINGS.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#0B1F1C] dark:text-white">
                    Order #{b.id}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase">
                    {b.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#7E9691]">Customer: {b.customerName} ({b.customerPhone})</span>
                </div>
                <p className="text-xs text-[#4A635E] dark:text-[#96B5AF]">{b.issueDescription}</p>
                <p className="text-[11px] text-[#7E9691]">
                  Assigned Mistri: <strong>{b.providerName}</strong> • Area: {b.area}
                </p>
              </div>

              <div className="text-end text-xs">
                <span className="font-black text-sm text-[#0F5C4D] dark:text-[#23BCA0] block">
                  Rs. {b.finalCostPKR || b.estimatedCostPKR.max} PKR
                </span>
                <span className="text-[10px] text-[#7E9691]">{b.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DISPUTES TAB */}
      {activeTab === 'disputes' && (
        <div className="p-12 text-center rounded-3xl glass-panel space-y-3">
          <CheckCircle2 className="w-10 h-10 text-[#1FA971] mx-auto" />
          <h3 className="font-heading font-black text-lg text-[#0B1F1C] dark:text-white">
            Zero Active Disputes in Swat Valley
          </h3>
          <p className="text-xs text-[#7E9691] max-w-sm mx-auto">
            100% of customers have marked recent jobs as satisfied. Dispute response SLA is within 30 minutes.
          </p>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
              <span className="text-[11px] font-bold text-[#7E9691] uppercase">Swat Gross Job Volume</span>
              <div className="font-heading font-black text-2xl text-[#0F5C4D] dark:text-[#23BCA0]">
                Rs. 4.2M PKR
              </div>
              <span className="text-[10px] text-[#1FA971] font-semibold">Total service throughput</span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
              <span className="text-[11px] font-bold text-[#7E9691] uppercase">Avg Job Ticket</span>
              <div className="font-heading font-black text-2xl text-[#0B1F1C] dark:text-white">
                Rs. 2,650 PKR
              </div>
              <span className="text-[10px] text-[#7E9691]">Inspection + Labor + Parts</span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/15 space-y-1">
              <span className="text-[11px] font-bold text-[#7E9691] uppercase">Fastest Hub</span>
              <div className="font-heading font-black text-2xl text-[#F5A524]">
                18 Mins
              </div>
              <span className="text-[10px] text-[#7E9691]">Mingora & Saidu Sharif</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
