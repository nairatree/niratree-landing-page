'use client';

import React from 'react';
import { Utensils, Armchair, Wine, Sparkles } from 'lucide-react';

export default function LifestyleOccasions() {
  const occasions = [
    {
      icon: Utensils,
      title: 'Romantic Breakfast in Bed',
      subtitle: 'For pampering your spouse or relaxed Sundays',
      description: 'Holds a hot mug of coffee or tea, warm croissants or pancakes, and a vase of flowers without tipping over.',
    },
    {
      icon: Armchair,
      title: 'Living Room Ottoman & Coffee Table Caddy',
      subtitle: 'Instant declutter & aesthetic organization',
      description: 'Keep your TV remotes, scented candles, car keys, and magazines arranged in one organized, magazine-worthy space.',
    },
    {
      icon: Wine,
      title: 'VIP Guest Hosting & Cocktail Service',
      subtitle: 'Never serve visitors with embarrassing plates',
      description: 'Impress friends, church elders, and colleagues with chilled wine glasses, mocktails, tea sets, or small chops.',
    },
    {
      icon: Sparkles,
      title: 'Charcuterie & Suya Fruit Platter',
      subtitle: 'The modern alternative to ceramic bowls',
      description: 'Display fresh grapes, cheeses, suya, chin-chin, and finger foods directly on the natural antibacterial bamboo surface.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-forest-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
            Limitless Everyday Uses
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            One 3-Piece Set. Endless Ways to Elevate Your Home.
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Not just a serving tray — NairaTree is an essential centerpiece that adds warmth, order, and luxury to every corner of your living space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-forest-900/80 border border-forest-800 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-amber-300 font-semibold mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
