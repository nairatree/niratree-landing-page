'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

const mockRecentOrders = [
  { name: 'Mrs. Folashade A.', location: 'Lekki Phase 1, Lagos', package: 'Double Set (Package 2)', time: '4m ago' },
  { name: 'Dr. Emeka O.', location: 'Maitama, Abuja', package: 'The Complete Trio', time: '7m ago' },
  { name: 'Amina K.', location: 'GRA Phase 2, Port Harcourt', package: 'Single Set (Style A)', time: '11m ago' },
  { name: 'Pastor Babatunde', location: 'Bodija, Ibadan', package: 'Double Set (Style A & B)', time: '15m ago' },
  { name: 'Blessing N.', location: 'Magodo Phase 2, Lagos', package: 'The Complete Trio', time: '22m ago' },
  { name: 'Alhaji Yusuf', location: 'Nasarawa GRA, Kano', package: 'Single Set (Style B)', time: '28m ago' },
];

export default function RecentOrderToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial delay
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Rotate every 16 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockRecentOrders.length);
        setIsVisible(true);
      }, 1000);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) {
    return null;
  }

  const current = mockRecentOrders[currentIndex];

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-auto z-40 max-w-xs sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-bamboo-300/80 flex items-start gap-2.5 relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-stone-200 hover:bg-stone-300 text-stone-600 rounded-full flex items-center justify-center text-xs shadow"
          aria-label="Close notification"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm">
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
        </div>

        <div className="text-[11px] sm:text-xs text-stone-700 leading-snug pr-2 min-w-0">
          <div className="flex items-center gap-1 font-bold text-forest-900">
            <span className="truncate">{current.name}</span>
            <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100 flex-shrink-0" />
            <span className="text-[9px] text-stone-400 font-normal ml-auto flex-shrink-0">
              {current.time}
            </span>
          </div>
          <div className="text-stone-500 text-[10px] truncate">{current.location}</div>
          <div className="mt-0.5 font-medium text-cta truncate">
            Ordered: <span className="font-semibold text-stone-800">{current.package}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
