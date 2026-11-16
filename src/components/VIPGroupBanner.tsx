'use client';

import React from 'react';
import { MessageCircle, Sparkles, Users, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { VIP_WHATSAPP_GROUP_URL } from '@/lib/constants';

export default function VIPGroupBanner() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#003822] via-[#005C37] to-[#008953] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-forest-950 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exclusive Members-Only Access</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Join Our NairaTree VIP WhatsApp Community
              </h2>

              <p className="text-stone-200 text-xs sm:text-base leading-relaxed">
                Connect directly with 1,200+ stylish Nigerian homeowners. Get access to secret flash sales, unreleased handcrafted bamboo drops, and special discounts before they go public!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-stone-100">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span><strong>Secret Discounts:</strong> VIP-only promotional pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span><strong>Early Access:</strong> First look at new handcrafted trays</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span><strong>Home Styling Tips:</strong> Hosting &amp; decor guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span><strong>Direct Concierge:</strong> Priority customer support</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Action Button */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3">
              <a
                href={VIP_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 sm:gap-3 transform hover:-translate-y-0.5 active:translate-y-0 text-center whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 text-forest-950 flex-shrink-0" />
                <span className="whitespace-nowrap">JOIN VIP GROUP NOW</span>
                <ArrowRight className="w-4 h-4 text-forest-950 flex-shrink-0" />
              </a>

              <div className="text-[11px] text-stone-200 flex items-center justify-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Free · Instant WhatsApp Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
