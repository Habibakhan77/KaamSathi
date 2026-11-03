'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MOCK_BOOKINGS, MOCK_PROVIDERS } from '@/lib/data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  Download, 
  Star, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'saved'>('active');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'mistri', text: 'Salam Kamran bhai, main bike par Mingora Bypass se nikal chuka hoon. 15 minute mein pohonch raha hoon.' },
    { sender: 'customer', text: 'Walaikum Assalam Tariq bhai, gate par gari khari hai, seedha andar aa jayein.' }
  ]);

  const activeBooking = MOCK_BOOKINGS[0];
  const historyBookings = MOCK_BOOKINGS.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F5C4D]/10 dark:border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
            Customer Portal (کسٹمر ڈیش بورڈ)
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            Welcome back, Kamran Ali
          </h1>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Saidu Sharif, Swat • 2 Active Bookings • 100% Price Protected
          </p>
        </div>

        <Link
          href="/book"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs hover:shadow-md transition-all self-start sm:self-auto"
        >
          Book New Service
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0F5C4D]/10 pb-2">
        {[
          { id: 'active', label: 'Active Jobs (1)' },
          { id: 'history', label: 'Past Completed (1)' },
          { id: 'saved', label: 'Saved Mistris (3)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'active' | 'history' | 'saved')}
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

      {/* ACTIVE TAB */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#1FA971]/30 shadow-lg space-y-6">
            
            {/* Header with status badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#0F5C4D]/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1FA971]">
                  Order #{activeBooking.id}
                </span>
                <h3 className="font-heading font-black text-lg text-[#0B1F1C] dark:text-white">
                  {activeBooking.issueDescription}
                </h3>
                <p className="text-xs text-[#7E9691] flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
                  {activeBooking.addressDetail}, {activeBooking.area}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#1FA971] animate-ping" />
                  Technician En Route (12 min ETA)
                </span>
              </div>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {[
                { label: 'Booking Placed', done: true },
                { label: 'Mistri Assigned', done: true },
                { label: 'En Route on Bike', done: true, active: true },
                { label: 'Work Completed', done: false }
              ].map((st, i) => (
                <div key={i} className="space-y-1.5">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      st.done ? 'bg-[#1FA971]' : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                  <span className={`text-[10px] font-bold block ${
                    st.active ? 'text-[#1FA971] font-black' : st.done ? 'text-[#0F5C4D] dark:text-[#23BCA0]' : 'text-[#7E9691]'
                  }`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Assigned Provider Profile strip */}
            <div className="p-4 rounded-2xl bg-[#F4F8F7] dark:bg-[#071513] border border-[#0F5C4D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={activeBooking.providerAvatar}
                  alt={activeBooking.providerName}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-[#1FA971]"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F1C] dark:text-white flex items-center gap-1">
                    {activeBooking.providerName}
                    <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
                  </h4>
                  <p className="text-xs text-[#7E9691]">Master AC Specialist • 14 yrs experience</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+923459512034"
                  className="px-4 py-2 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971] transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call (0345-9512034)</span>
                </a>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-[#071513] text-xs font-bold hover:bg-[#20ba59] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>

            {/* Direct Chat Drawer */}
            {chatOpen && (
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/15 space-y-3">
                <span className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-white block">
                  Direct In-App Chat with {activeBooking.providerName}:
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-[#F4F8F7] dark:bg-[#071513] rounded-xl text-xs">
                  {chatLogs.map((c, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg max-w-xs ${
                        c.sender === 'customer'
                          ? 'ms-auto bg-[#0F5C4D] text-white'
                          : 'bg-white dark:bg-[#183C34] text-[#0B1F1C] dark:text-white'
                      }`}
                    >
                      {c.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type message in Urdu or English..."
                    className="flex-1 bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-white focus:outline-hidden"
                  />
                  <button
                    onClick={() => {
                      if (!chatMessage.trim()) return;
                      setChatLogs([...chatLogs, { sender: 'customer', text: chatMessage }]);
                      setChatMessage('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#0F5C4D]/10">
              <span className="text-[#7E9691]">Expected PKR Settlement:</span>
              <span className="font-heading font-black text-base text-[#0F5C4D] dark:text-[#23BCA0]">
                Rs. {activeBooking.finalCostPKR} PKR (Cash on Completion)
              </span>
            </div>

          </div>
        </div>
      )}

      {/* PAST HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {historyBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl glass-panel border border-[#0F5C4D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#0B1F1C] dark:text-white">
                    Order #{b.id}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-bold">
                    Completed & Inspected
                  </span>
                </div>
                <p className="text-xs text-[#4A635E] dark:text-[#96B5AF]">
                  {b.issueDescription}
                </p>
                <p className="text-[11px] text-[#7E9691]">
                  Technician: {b.providerName} • {b.scheduledDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-[#0B1F1C] dark:text-white">
                  Rs. {b.finalCostPKR} PKR
                </span>
                <button
                  onClick={() => alert(`Downloading Invoice Receipt #${b.id}.pdf`)}
                  className="px-3 py-1.5 rounded-xl border border-[#0F5C4D]/20 text-xs font-bold text-[#0F5C4D] dark:text-[#23BCA0] flex items-center gap-1 hover:bg-white"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAVED PROVIDERS TAB */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_PROVIDERS.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl glass-panel border border-[#0F5C4D]/15 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-[#1FA971]" />
                <div>
                  <h4 className="font-bold text-xs text-[#0B1F1C] dark:text-white">{p.name}</h4>
                  <p className="text-[11px] text-[#7E9691]">{p.area} • ★ {p.rating}</p>
                </div>
              </div>
              <Link
                href={`/book?provider=${p.id}&category=${p.category}`}
                className="px-3 py-1.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971]"
              >
                Rebook
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
