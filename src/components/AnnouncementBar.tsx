'use client';

import React from 'react';
import { Truck, ShieldCheck, Flame } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#003822] via-[#005C37] to-[#003822] text-cream-50 text-[11px] sm:text-xs font-semibold py-2 px-3 shadow-sm border-b border-[#00472B]">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-6 text-center">
        {/* Mobile Compact View */}
        <div className="flex sm:hidden items-center justify-between w-full">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Flame className="w-3.5 h-3.5 text-cta animate-bounce flex-shrink-0" />
            <span className="truncate">PROMO: Free Nationwide Delivery</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-bold whitespace-nowrap bg-black/20 px-2 py-0.5 rounded-full border border-white/20">
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span>Pay on Delivery</span>
          </div>
        </div>

        {/* Tablet & Desktop Full View */}
        <div className="hidden sm:flex items-center gap-2 text-amber-300 font-bold tracking-wide">
          <Flame className="w-4 h-4 text-cta animate-bounce flex-shrink-0" />
          <span>SPECIAL PROMO:</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-stone-100">
          <Truck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>Free Nationwide Delivery</span>
        </div>
        <span className="hidden sm:inline text-emerald-700">•</span>
        <div className="hidden sm:flex items-center gap-1.5 text-stone-100">
          <ShieldCheck className="w-4 h-4 text-amber-300 flex-shrink-0" />
          <span>Pay On Delivery Available</span>
        </div>
        <span className="hidden md:inline text-emerald-700">•</span>
        <div className="hidden md:inline-block bg-cta text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          Limited Stock For Today
        </div>
      </div>
    </div>
  );
}
