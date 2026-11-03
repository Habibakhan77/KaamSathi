'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language } from '@/lib/types';
import { 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  PhoneCall, 
  UserCheck, 
  Bot, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t, isRTL, theme, toggleTheme } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ur', label: 'Urdu', native: 'اردو' },
    { code: 'roman', label: 'Roman Urdu', native: 'Roman Urdu' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#0B3D36] text-[#E6F4F1] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-[#1FA971]/20 text-[#23BCA0] px-2 py-0.5 rounded-full text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t('heroHook')}
        </span>
        <span className="hidden sm:inline">
          {language === 'ur' 
            ? 'سوات میں پہلی بار: تمام کاریگر نادرا شناختی کارڈ سے تصدیق شدہ' 
            : language === 'roman'
            ? 'Swat mein pehli bar: Tamam mistri NADRA CNIC se verified'
            : 'Swat’s 1st AI-powered verified trade marketplace • 100% CNIC Vetted'}
        </span>
        <a 
          href="https://wa.me/923459512034?text=Salam%20KaamSaathi%20Support" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline text-[#F5A524] hover:text-white ms-2 font-semibold inline-flex items-center gap-1"
        >
          <PhoneCall className="w-3 h-3" />
          WhatsApp: 0345-9512034
        </a>
      </div>

      {/* Main Glass Header */}
      <div className="backdrop-blur-md bg-white/90 dark:bg-[#071513]/90 border-b border-[#0F5C4D]/10 dark:border-white/10 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto h-18 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F5C4D] to-[#0B3D36] flex items-center justify-center shadow-md shadow-[#0F5C4D]/20 group-hover:scale-105 transition-transform duration-200">
              {/* House shape with handshake concept SVG */}
              <svg className="w-7 h-7 text-[#1FA971]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#F4F8F7" />
                <path d="M9 22V12h6v10" stroke="#F4F8F7" opacity="0.4" />
                {/* stylized handshake accent */}
                <path d="M8 15h3l2 2h3" stroke="#F5A524" strokeWidth="2.2" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1FA971] rounded-full border-2 border-white dark:border-[#071513]" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#0B1F1C] dark:text-[#F4F8F7] flex items-center gap-1">
                KaamSaathi
                <span className="text-[#1FA971] text-xs font-bold uppercase tracking-wider bg-[#1FA971]/10 px-1.5 py-0.5 rounded-sm">
                  Swat
                </span>
              </span>
              <span className="text-[11px] text-[#4A635E] dark:text-[#96B5AF] -mt-1 font-medium hidden sm:inline">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-[#0B1F1C] dark:text-[#F4F8F7]">
            <Link 
              href="/services" 
              className="hover:text-[#1FA971] transition-colors py-2 flex items-center gap-1"
            >
              {t('navServices')}
            </Link>

            <Link 
              href="/#how-ai-works" 
              className="hover:text-[#1FA971] transition-colors py-2 flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-[#F5A524]" />
              {t('navHowItWorks')}
            </Link>

            <Link 
              href="/ai-assistant" 
              className="hover:text-[#1FA971] text-[#0F5C4D] dark:text-[#23BCA0] font-semibold transition-colors py-2 flex items-center gap-1.5 bg-[#1FA971]/10 px-3 rounded-full"
            >
              <Bot className="w-4 h-4 text-[#1FA971]" />
              AI Assistant
            </Link>

            <Link 
              href="/dashboard/customer" 
              className="hover:text-[#1FA971] transition-colors py-2 flex items-center gap-1 text-[#4A635E] dark:text-[#96B5AF]"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t('navDashboard')}
            </Link>
          </nav>

          {/* Right Controls: Language, Theme & Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Language Switch Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#0F5C4D]/15 dark:border-white/10 hover:border-[#1FA971] text-xs font-semibold text-[#0B1F1C] dark:text-[#F4F8F7] transition-all bg-white/50 dark:bg-[#0E2420]/50"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#1FA971]" />
                <span>{languages.find(l => l.code === language)?.native || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-[#4A635E]" />
              </button>

              {langMenuOpen && (
                <div 
                  className={`absolute mt-2 w-36 rounded-xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/10 dark:border-white/10 shadow-lg py-1 z-50 ${isRTL ? 'left-0' : 'right-0'}`}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#F4F8F7] dark:hover:bg-[#183C34] transition-colors ${
                        language === l.code ? 'text-[#1FA971] font-bold bg-[#1FA971]/5' : 'text-[#0B1F1C] dark:text-[#F4F8F7]'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-[#4A635E] uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[#0B1F1C] dark:text-[#F4F8F7] hover:bg-[#F4F8F7] dark:hover:bg-[#0E2420] border border-transparent hover:border-[#0F5C4D]/10 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#F5A524]" />
              ) : (
                <Moon className="w-4 h-4 text-[#0F5C4D]" />
              )}
            </button>

            {/* Provider portal quick link */}
            <Link
              href="/dashboard/provider"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5C4D] dark:text-[#23BCA0] hover:underline"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#1FA971]" />
              {t('navBecomeProvider')}
            </Link>

            {/* Primary Action Button: Book Now */}
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl font-heading font-semibold text-xs text-white bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] hover:shadow-md hover:shadow-[#1FA971]/20 active:scale-98 transition-all"
            >
              {t('navBookService')}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#0B1F1C] dark:text-[#F4F8F7] hover:bg-[#F4F8F7] dark:hover:bg-[#0E2420]"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-[#0F5C4D]/10 dark:border-white/10 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-base text-[#0B1F1C] dark:text-[#F4F8F7]">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#F4F8F7] dark:hover:bg-[#183C34]"
            >
              {t('navServices')}
            </Link>
            <Link
              href="/#how-ai-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#F4F8F7] dark:hover:bg-[#183C34] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F5A524]" />
              {t('navHowItWorks')}
            </Link>
            <Link
              href="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-[#1FA971]/10 text-[#0F5C4D] dark:text-[#23BCA0] font-semibold flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-[#1FA971]" />
              AI Assistant (Urdu/English)
            </Link>
            <Link
              href="/dashboard/customer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#F4F8F7] dark:hover:bg-[#183C34]"
            >
              {t('navDashboard')} (Customer)
            </Link>
            <Link
              href="/dashboard/provider"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#F4F8F7] dark:hover:bg-[#183C34]"
            >
              {t('navBecomeProvider')} (Mistri Portal)
            </Link>
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#F4F8F7] dark:hover:bg-[#183C34] text-xs text-[#4A635E]"
            >
              Admin Verification Portal
            </Link>
          </nav>

          <div className="pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10 flex flex-col gap-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-[#0F5C4D] to-[#1FA971]"
            >
              {t('navBookService')}
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-[#0F5C4D]/20 text-xs font-semibold text-[#0B1F1C] dark:text-[#F4F8F7]"
            >
              {t('navSignIn')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
