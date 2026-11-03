'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { MapPin, PhoneCall, Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', area: 'Mingora', message: '' });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#1FA971] uppercase tracking-wider">
          Direct Swat Support
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#0B1F1C] dark:text-white">
          We Are Here to Help
        </h1>
        <p className="text-xs sm:text-sm text-[#4A635E] dark:text-[#96B5AF]">
          Have questions about booking or want to register as a verified technician in Swat? Contact us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-6">
          <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
            Swat Operations Desk
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1FA971]/20 flex items-center justify-center text-[#1FA971] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[#0B1F1C] dark:text-white block">Main Office:</strong>
                <span className="text-[#7E9691]">Plot 14, Main Bypass Road, Mingora, District Swat, KP</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F5C4D]/20 flex items-center justify-center text-[#0F5C4D] dark:text-[#23BCA0] shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[#0B1F1C] dark:text-white block">Hotline:</strong>
                <span className="text-[#7E9691]">+92 345 9512034 (8:00 AM - 10:00 PM Daily)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[#0B1F1C] dark:text-white block">WhatsApp Urgent Dispatch:</strong>
                <span className="text-[#7E9691]">+92 345 9512034</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5A524]/20 flex items-center justify-center text-[#F5A524] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[#0B1F1C] dark:text-white block">Email:</strong>
                <span className="text-[#7E9691]">support@kaamsaathi.pk</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/923459512034?text=Salam%20KaamSaathi%20Support!%20Mujhe%20rabta%20karna%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-[#071513] font-bold text-xs hover:bg-[#20ba59] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Message</span>
            </a>
          </div>
        </div>

        {/* Message Form */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-[#0F5C4D]/15 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#0B1F1C] dark:text-white">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#1FA971]/15 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#1FA971] mx-auto" />
              <h3 className="font-heading font-bold text-sm text-[#0F5C4D] dark:text-[#23BCA0]">
                Shukriya! Message Received.
              </h3>
              <p className="text-xs text-[#7E9691]">
                Our Swat customer representative will call or WhatsApp you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-[#0B1F1C] dark:text-white">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kamran Ali"
                  className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0B1F1C] dark:text-white">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0B1F1C] dark:text-white">Your Swat Area</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Mingora, Saidu Sharif, Kanju..."
                  className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl px-3 py-2.5 text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0B1F1C] dark:text-white">Message / Query</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?"
                  className="w-full bg-white dark:bg-[#071513] border border-[#0F5C4D]/20 rounded-xl p-3 text-[#0B1F1C] dark:text-white focus:outline-hidden focus:border-[#1FA971]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0F5C4D] to-[#1FA971] text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
