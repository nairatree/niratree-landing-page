'use client';

import React from 'react';
import { Truck, Sparkles, Flame, Users } from 'lucide-react';
import { VIP_WHATSAPP_GROUP_URL } from '@/lib/constants';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#003822] via-[#005C37] to-[#003822] text-cream-50 text-[11px] sm:text-xs font-semibold py-2 px-3 shadow-sm border-b border-[#00472B]">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-6 text-center">
        {/* Mobile View */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 w-full text-center">
          <Flame className="w-3.5 h-3.5 text-cta animate-bounce flex-shrink-0" />
          <span className="text-[11px] font-bold text-amber-300">
            Handcrafted Bamboo Trays (Set of 3) · From ₦25,000
          </span>
        </div>

        {/* Tablet & Desktop View */}
        <div className="hidden sm:flex items-center gap-2 text-amber-300 font-bold tracking-wide">
          <Flame className="w-4 h-4 text-cta animate-bounce flex-shrink-0" />
          <span>LIMITED HANDCRAFTED BATCH:</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-stone-100">
          <Truck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>Nationwide Dispatch Available (Delivery calculated by location)</span>
        </div>
        <span className="hidden md:inline text-emerald-700">•</span>
        <a
          href={VIP_WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-amber-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30 text-[11px] transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Join VIP WhatsApp Community</span>
        </a>
      </div>
    </div>
  );
}
