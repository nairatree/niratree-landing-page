'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const form = document.getElementById('order-form');
      if (!form) return;

      const formRect = form.getBoundingClientRect();
      const inFormView = formRect.top < window.innerHeight && formRect.bottom > 0;

      // Show if scrolled more than 400px and NOT currently inside the form
      if (scrollY > 400 && !inFormView) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToForm = () => {
    trackInitiateCheckout('Sticky Mobile CTA', 28500);
    const form = document.getElementById('order-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 py-2 bg-white/95 backdrop-blur-md border-t border-bamboo-300 shadow-2xl sm:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold uppercase tracking-wider truncate">
            <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span>Pay on Delivery</span>
          </div>
          <div className="text-xs font-black text-forest-950 truncate">
            From ₦28,500 <span className="text-[10px] text-stone-400 font-normal">/ 3 Trays</span>
          </div>
        </div>

        <button
          onClick={handleScrollToForm}
          className="py-2.5 px-4 bg-cta hover:bg-cta-hover text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-cta active:scale-95 transition-all flex-shrink-0 whitespace-nowrap"
        >
          <span>ORDER NOW</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
