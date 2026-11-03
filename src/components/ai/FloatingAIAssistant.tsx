'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  ShieldCheck, 
  Loader2, 
  ExternalLink 
} from 'lucide-react';

interface AIAnalysis {
  service_category: string;
  category_name: string;
  issue_summary: string;
  location: string;
  urgency: 'emergency' | 'today' | 'scheduled';
  estimated_cost_pkr: {
    min: number;
    max: number;
    callout_fee: number;
  };
  diagnostic_points: string[];
  matched_providers: Array<{
    id: string;
    name: string;
    rating: number;
    hourlyRatePKR: number;
    avatar: string;
    area: string;
  }>;
}

export default function FloatingAIAssistant() {
  const { isRTL, language } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const samplePrompts = [
    {
      label: 'AC Cooling Issue',
      text: 'Mera inverter AC cooling nahi kar raha, Mingora mein'
    },
    {
      label: 'Water Motor Leak',
      text: 'Kanju mein water motor leak ho rahi hai aur awaz kar rahi hai'
    },
    {
      label: 'Solar & Wiring',
      text: 'Saidu Sharif mein UPS short circuit check karwana hai'
    }
  ];

  const handleDiagnose = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          language: language,
          area: 'Mingora City'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data);
      }
    } catch (err) {
      console.error('Failed to analyze prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceSample = 'Mera 1.5 ton AC theek se cool nahi kar raha, Faizabad Mingora';
      setInputQuery(voiceSample);
      handleDiagnose(voiceSample);
    }, 2000);
  };

  return (
    <div className={`fixed bottom-6 z-40 ${isRTL ? 'left-6' : 'right-6'}`}>
      
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white shadow-xl shadow-[#0F5C4D]/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F5A524] ring-2 ring-white" />
          </div>
          <span className="font-heading font-bold text-xs tracking-wide">
            {language === 'ur' ? 'اے آئی معاون: مسئلہ بتائیں' : 'AI Assistant: Ask Anything'}
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
            Urdu / Voice
          </span>
        </button>
      )}

      {/* Expanded Modal / Floating Card */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] max-h-[85vh] flex flex-col rounded-2xl glass-panel shadow-2xl border border-[#0F5C4D]/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Card Header */}
          <div className="p-4 bg-gradient-to-r from-[#0F5C4D] to-[#0B3D36] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1FA971]/20 flex items-center justify-center text-[#23BCA0]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm leading-tight flex items-center gap-1.5">
                  KaamSaathi AI Assistant
                  <span className="bg-[#1FA971] text-[10px] px-1.5 py-0.2 rounded-full font-medium">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-[#96B5AF]">
                  {language === 'ur' ? 'سوات کے لیے فوری مفت تشخیص اور کاریگر' : 'Smart diagnosis & verified dispatch for Swat'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => router.push('/ai-assistant')}
                className="p-1.5 text-[#96B5AF] hover:text-white rounded-lg transition-colors"
                title="Open full page assistant"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#96B5AF] hover:text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Container */}
          <div className="p-4 overflow-y-auto space-y-4 max-h-[60vh]">
            
            {/* Quick Sample Prompts */}
            {!analysisResult && !loading && (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#4A635E] dark:text-[#96B5AF] uppercase tracking-wider block">
                  Quick Examples (آسان مثالیں):
                </span>
                <div className="flex flex-col gap-1.5">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputQuery(p.text);
                        handleDiagnose(p.text);
                      }}
                      className="text-start px-3 py-2 rounded-xl bg-white/60 dark:bg-[#071513]/60 hover:bg-[#1FA971]/10 border border-[#0F5C4D]/10 dark:border-white/10 text-xs font-medium text-[#0B1F1C] dark:text-[#F4F8F7] flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate">{p.text}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#1FA971] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recording State indicator */}
            {isRecording && (
              <div className="p-4 rounded-xl bg-[#1FA971]/10 border border-[#1FA971]/20 flex flex-col items-center justify-center gap-2 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-[#1FA971] text-white flex items-center justify-center shadow-lg">
                  <Mic className="w-6 h-6 animate-bounce" />
                </div>
                <span className="font-heading font-bold text-xs text-[#0F5C4D] dark:text-[#23BCA0]">
                  Listening in Urdu / English... (سن رہے ہیں)
                </span>
                <span className="text-[10px] text-[#4A635E] dark:text-[#96B5AF]">
                  "Mera AC theek se cool nahi kar raha..."
                </span>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="w-7 h-7 text-[#1FA971] animate-spin" />
                <span className="font-heading font-semibold text-xs text-[#0B1F1C] dark:text-[#F4F8F7]">
                  Analyzing fault & searching nearest verified mistris in Swat...
                </span>
              </div>
            )}

            {/* Structured Result Display */}
            {analysisResult && !loading && (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="p-3.5 rounded-xl bg-[#1FA971]/10 border border-[#1FA971]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs text-[#0F5C4D] dark:text-[#23BCA0]">
                      {analysisResult.category_name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-[#F5A524]/20 text-[#D97706]">
                      {analysisResult.urgency}
                    </span>
                  </div>

                  <p className="text-xs text-[#0B1F1C] dark:text-[#F4F8F7] font-medium">
                    "{analysisResult.issue_summary}"
                  </p>

                  <div className="pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#4A635E] dark:text-[#96B5AF]">Estimated Cost:</span>
                    <span className="font-bold text-[#0F5C4D] dark:text-[#23BCA0]">
                      Rs. {analysisResult.estimated_cost_pkr.min.toLocaleString()} - {analysisResult.estimated_cost_pkr.max.toLocaleString()} PKR
                    </span>
                  </div>
                </div>

                {/* Diagnostic Points */}
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-[#4A635E] dark:text-[#96B5AF] text-[11px] block">
                    Diagnostic Checklist:
                  </span>
                  {analysisResult.diagnostic_points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#0B1F1C] dark:text-[#F4F8F7]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1FA971] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Matched Pros */}
                {analysisResult.matched_providers.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10">
                    <span className="font-semibold text-[#4A635E] dark:text-[#96B5AF] text-[11px] block">
                      Matched Verified Technicians ({analysisResult.location}):
                    </span>
                    {analysisResult.matched_providers.slice(0, 1).map((prov) => (
                      <div
                        key={prov.id}
                        className="p-3 rounded-xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/10 dark:border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prov.avatar}
                            alt={prov.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#1FA971]"
                          />
                          <div>
                            <span className="font-heading font-bold text-xs text-[#0B1F1C] dark:text-[#F4F8F7] flex items-center gap-1">
                              {prov.name}
                              <ShieldCheck className="w-3 h-3 text-[#1FA971]" />
                            </span>
                            <span className="text-[10px] text-[#4A635E] dark:text-[#96B5AF] block">
                              ★ {prov.rating} • {prov.area}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => router.push(`/book?category=${analysisResult.service_category}&provider=${prov.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-[#0F5C4D] text-white text-[11px] font-bold hover:bg-[#1FA971] transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white/70 dark:bg-[#071513]/70 border-t border-[#0F5C4D]/10 dark:border-white/10 flex items-center gap-2">
            <button
              onClick={handleSimulatedVoice}
              disabled={isRecording || loading}
              className={`p-2 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0] hover:bg-[#1FA971]/25'
              }`}
              title="Speak in Urdu or English"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDiagnose(inputQuery);
              }}
              placeholder={language === 'ur' ? 'مسئلہ بیان کریں...' : 'Describe issue in Urdu or English...'}
              className="flex-1 bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-[#0B1F1C] dark:text-[#F4F8F7] placeholder-[#7E9691] focus:outline-hidden focus:border-[#1FA971]"
            />

            <button
              onClick={() => handleDiagnose(inputQuery)}
              disabled={loading || !inputQuery.trim()}
              className="p-2 rounded-xl bg-[#0F5C4D] text-white hover:bg-[#1FA971] disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
