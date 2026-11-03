'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ShieldCheck, PhoneCall, ArrowRight, Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+92 300 9078654');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/customer');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-[#0F5C4D]/15 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F5C4D] to-[#1FA971] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-black text-2xl text-[#0B1F1C] dark:text-white">
            Sign In to KaamSaathi
          </h1>
          <p className="text-xs text-[#7E9691]">
            Fast login with Pakistani Mobile OTP or Email
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-gray-100 dark:bg-[#071513] text-xs font-bold">
          <button
            onClick={() => { setAuthMode('phone'); setOtpSent(false); }}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'phone' ? 'bg-[#0F5C4D] text-white shadow-xs' : 'text-[#7E9691]'
            }`}
          >
            Mobile Phone (OTP)
          </button>
          <button
            onClick={() => setAuthMode('email')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'email' ? 'bg-[#0F5C4D] text-white shadow-xs' : 'text-[#7E9691]'
            }`}
          >
            Email & Password
          </button>
        </div>

        {/* Phone OTP Mode */}
        {authMode === 'phone' && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">
                    Pakistani Phone Number (+92)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                  />
                  <span className="text-[10px] text-[#7E9691] block">
                    We will send a 4-digit verification code via SMS and WhatsApp.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Send Verification Code (کوڈ بھیجیں)
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-[#1FA971]/15 text-[#1FA971] text-xs font-semibold text-center">
                  Verification code sent to {phoneNumber}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">
                    Enter 4-Digit Code (Use: 8901)
                  </label>
                  <input
                    type="text"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="8901"
                    className="w-full text-center tracking-widest font-heading font-bold text-lg bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 rounded-xl px-4 py-3 text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Verify & Enter Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs text-[#7E9691] hover:underline"
                >
                  Change Phone Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* Email Mode */}
        {authMode === 'email' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/dashboard/customer');
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamran@example.com"
                className="w-full bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0B1F1C] dark:text-white">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              Sign In with Email
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-[#7E9691]">
          Are you a technician?{' '}
          <Link href="/dashboard/provider" className="text-[#1FA971] font-bold hover:underline">
            Register as a Verified Mistri
          </Link>
        </div>

      </div>
    </div>
  );
}
