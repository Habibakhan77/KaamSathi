import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingAIAssistant from '@/components/ai/FloatingAIAssistant';

export const metadata: Metadata = {
  title: 'KaamSaathi (کام ساتھی) — Verified Home Services in Swat & Pakistan',
  description: 'AI-powered marketplace for verified local services starting in Swat, Pakistan. AC technicians, electricians, plumbers, carpenters, and home cleaning vetted with NADRA CNIC & police clearance.',
  keywords: [
    'KaamSaathi',
    'Swat home services',
    'Mingora electrician',
    'Saidu Sharif AC technician',
    'Kanju plumber',
    'verified mistri Pakistan',
    'AI services dispatch Swat'
  ],
  authors: [{ name: 'KaamSaathi Technologies' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-mountain-gradient antialiased selection:bg-[#1FA971]/20 selection:text-[#0F5C4D]">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <FloatingAIAssistant />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
