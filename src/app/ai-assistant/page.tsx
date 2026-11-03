'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Wrench, 
  UserCheck, 
  ArrowRight,
  Code,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { SWAT_AREAS, MOCK_PROVIDERS } from '@/lib/data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  data?: {
    category: string;
    categoryTitle: string;
    location: string;
    urgency: string;
    costMin: number;
    costMax: number;
    calloutFee: number;
    diagnostics: string[];
    missingDetails: string[];
    matchedProviders: typeof MOCK_PROVIDERS;
  };
}

export default function AIAssistantPage() {
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();

  const [inputQuery, setInputQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Mingora City');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: language === 'ur'
        ? 'السلام علیکم! میں کام ساتھی کا اسمارٹ اے آئی معاون ہوں۔ اپنا مسئلہ اردو، رومن اردو یا انگلش میں بیان کریں۔ میں خرابی کی تشخیص کر کے سوات کے قریب ترین مستند کاریگر تلاش کروں گا۔'
        : 'Salam! I am the KaamSaathi AI Dispatch Assistant. Describe your repair or maintenance problem in Urdu, Roman Urdu, or English. I will diagnose the fault, estimate fair PKR costs, and connect you with vetted technicians in Swat.',
      timestamp: 'Just now'
    }
  ]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputQuery;
    if (!promptToSend.trim()) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          area: selectedArea,
          language: language
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `Based on your description, this is diagnosed as an ${data.category_name} issue in ${data.location}. Fair estimated repair scope: Rs. ${data.estimated_cost_pkr.min.toLocaleString()} - ${data.estimated_cost_pkr.max.toLocaleString()} PKR.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          data: {
            category: data.service_category,
            categoryTitle: data.category_name,
            location: data.location,
            urgency: data.urgency,
            costMin: data.estimated_cost_pkr.min,
            costMax: data.estimated_cost_pkr.max,
            calloutFee: data.estimated_cost_pkr.callout_fee,
            diagnostics: data.diagnostic_points,
            missingDetails: data.missing_details,
            matchedProviders: data.matched_providers
          }
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceSimulation = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceText = 'Mera inverter AC cooling nahi kar raha, Mingora Faizabad mein';
      setInputQuery(voiceText);
      handleSendMessage(voiceText);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F5C4D]/10 dark:border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1FA971] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F5A524]" />
            <span>AI Triage & Match Dispatch</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#0B1F1C] dark:text-white">
            KaamSaathi AI Service Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
            Real-time problem decomposition, PKR cost prediction, and verified pro matching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            className="px-3 py-1.5 rounded-xl border border-[#0F5C4D]/20 text-xs font-semibold text-[#0B1F1C] dark:text-white flex items-center gap-1.5 hover:bg-white/50"
          >
            <Code className="w-3.5 h-3.5 text-[#1FA971]" />
            <span>{showJsonInspector ? 'Hide JSON' : 'Inspect JSON Schema'}</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="rounded-3xl glass-panel border border-[#0F5C4D]/15 overflow-hidden shadow-xl flex flex-col h-[700px]">
        
        {/* Chat Messages Scrollable Box */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-[#0F5C4D] text-[#1FA971] flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#0F5C4D] text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#0E2420] text-[#0B1F1C] dark:text-[#F4F8F7] border border-[#0F5C4D]/10 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Structured Payload Card if AI message has diagnostic data */}
                {msg.data && (
                  <div className="pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10 space-y-3">
                    
                    <div className="p-3 rounded-xl bg-[#F4F8F7] dark:bg-[#071513] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-xs text-[#0F5C4D] dark:text-[#23BCA0]">
                          {msg.data.categoryTitle}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F5A524]/20 text-[#D97706]">
                          {msg.data.urgency} Priority
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#7E9691]">Estimated Repair Cost:</span>
                        <span className="font-bold text-[#0B1F1C] dark:text-white">
                          Rs. {msg.data.costMin.toLocaleString()} - {msg.data.costMax.toLocaleString()} PKR
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#7E9691]">
                        <span>Callout Fee:</span>
                        <span className="font-semibold text-[#0B1F1C] dark:text-white">Rs. {msg.data.calloutFee} PKR</span>
                      </div>
                    </div>

                    {/* Diagnostics */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-[#4A635E] dark:text-[#96B5AF]">
                        Diagnosed Action Checklist:
                      </span>
                      {msg.data.diagnostics.map((d, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-[#1FA971] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Matched Pros */}
                    {msg.data.matchedProviders.length > 0 && (
                      <div className="pt-2 border-t border-[#0F5C4D]/10 dark:border-white/10 space-y-2">
                        <span className="text-[11px] font-bold text-[#4A635E] dark:text-[#96B5AF]">
                          Matched Verified Technicians in {msg.data.location}:
                        </span>
                        {msg.data.matchedProviders.slice(0, 2).map((p) => (
                          <div
                            key={p.id}
                            className="p-3 rounded-xl bg-white dark:bg-[#071513] border border-[#0F5C4D]/15 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={p.avatar}
                                alt={p.name}
                                className="w-9 h-9 rounded-full object-cover border border-[#1FA971]"
                              />
                              <div>
                                <h5 className="font-bold text-xs text-[#0B1F1C] dark:text-white flex items-center gap-1">
                                  {p.name}
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#1FA971]" />
                                </h5>
                                <p className="text-[10px] text-[#7E9691]">★ {p.rating} • {p.area}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => router.push(`/book?category=${msg.data?.category}&provider=${p.id}`)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#1FA971] transition-colors"
                            >
                              Book Now
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Optional Raw JSON Inspector */}
                    {showJsonInspector && (
                      <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-[10px] overflow-x-auto">
                        {JSON.stringify(msg.data, null, 2)}
                      </pre>
                    )}

                  </div>
                )}

                <span className={`text-[10px] block opacity-70 ${msg.sender === 'user' ? 'text-white/80 text-end' : 'text-[#7E9691]'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#4A635E] dark:text-[#96B5AF] italic">
              <Loader2 className="w-4 h-4 animate-spin text-[#1FA971]" />
              <span>Diagnosing problem and ranking verified technicians in Swat...</span>
            </div>
          )}
        </div>

        {/* Input Bar & Controls */}
        <div className="p-4 bg-white/80 dark:bg-[#071513]/80 border-t border-[#0F5C4D]/10 dark:border-white/10 space-y-3">
          
          {/* Quick suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto text-[11px] pb-1 scrollbar-none">
            <span className="font-bold text-[#7E9691] shrink-0">Sample Prompts:</span>
            {[
              'Mera AC theek se cool nahi kar raha, Mingora mein',
              'Kanju mein geyser pipe leak ho raha hai',
              'Saidu Sharif mein short circuit check karwana hai',
              'Barikot mein kitchen deodar cabinets fit karwane hain'
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputQuery(p);
                  handleSendMessage(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F4F8F7] dark:bg-[#0E2420] hover:bg-[#1FA971]/15 text-[#0B1F1C] dark:text-[#F4F8F7] shrink-0 transition-colors border border-[#0F5C4D]/10"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            
            {/* Area select */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/15 text-xs text-[#0B1F1C] dark:text-white shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#1FA971]" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-transparent border-none focus:outline-hidden text-xs cursor-pointer"
              >
                {SWAT_AREAS.slice(0, 7).map((a) => (
                  <option key={a} value={a} className="dark:bg-[#0E2420]">{a}</option>
                ))}
              </select>
            </div>

            {/* Voice Mic Button */}
            <button
              onClick={handleVoiceSimulation}
              disabled={isRecording || isLoading}
              className={`p-3 rounded-2xl transition-all ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#1FA971]/15 text-[#0F5C4D] dark:text-[#23BCA0] hover:bg-[#1FA971]/25'
              }`}
              title="Speak in Urdu or English"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={
                language === 'ur'
                  ? 'اپنا مسئلہ اردو، رومن اردو یا انگلش میں لکھیں...'
                  : 'Describe issue in Urdu, Roman Urdu or English...'
              }
              className="flex-1 bg-white dark:bg-[#0E2420] border border-[#0F5C4D]/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0B1F1C] dark:text-white placeholder-[#7E9691] focus:outline-hidden focus:border-[#1FA971]"
            />

            {/* Send button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputQuery.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-bold text-xs sm:text-sm hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              <span>Dispatch</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
