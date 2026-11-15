'use client';

import React from 'react';
import { AlertTriangle, Frown, Coffee, Layers } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Frown,
      title: 'Cheap Plastic Trays Bend, Crack & Stain',
      description:
        'Ever carried hot tea or drinks on a plastic tray only for it to bow in the middle? Worse still, palm oil, stew, and coffee leave stubborn yellow stains that make your kitchen look messy and cheap in front of VIP guests.',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      icon: Coffee,
      title: 'Spills & Water Ring Damage on Expensive Furniture',
      description:
        'Standard flat trays have almost zero raised borders. One slight stumble or slippery glass and scalding liquid spills straight onto your wooden dining table, sofa upholstery, or imported carpet, leaving irreversible marks.',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Layers,
      title: 'Cluttered Cabinets & Mismatched Junk',
      description:
        'Traditional trays are awkward shapes, don’t stack inside one another, and crowd your kitchen cabinets. You are forced to hunt through piles of mismatched metal and plastic whenever unexpected company knocks on your door.',
      color: 'bg-stone-50 text-stone-600 border-stone-200',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>The Daily Hosting Headache</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-950 tracking-tight">
            Tired of Embarrassing Servings &amp; Damaged Tables When Guests Visit?
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Most Nigerian households rely on cheap imported plastic or awkward rusted trays that fail at the worst possible moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-cream-50/70 rounded-2xl p-6 sm:p-7 border border-stone-200 hover:border-bamboo-400 transition-all duration-300 hover:shadow-warm flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-forest-950 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                  <span>❌ Frustrating &amp; preventable</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
