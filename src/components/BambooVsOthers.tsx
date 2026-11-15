'use client';

import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

export default function BambooVsOthers() {
  const comparison = [
    {
      feature: 'Visual Appeal & Luxury Feel',
      niratree: 'Warm natural bamboo grain, 5-star hotel elegance',
      plastic: 'Looks cheap, shows scratches, degrades quickly',
      metal: 'Cold, industrial, easily loses shine & tarnishes',
    },
    {
      feature: 'Spill & Edge Protection',
      niratree: 'Deep 1.8-inch raised rim, zero table spills',
      plastic: 'Flat shallow lips, fluids easily leak over',
      metal: 'Low borders with dangerous sharp edges',
    },
    {
      feature: 'Space-Saving Storage',
      niratree: '3 Trays nest seamlessly into 1 compact unit',
      plastic: 'Awkward stacking that topples inside cupboards',
      metal: 'Heavy & bulky, scratches kitchen cabinets',
    },
    {
      feature: 'Heat & Stain Resistance',
      niratree: 'Naturally heat resistant; wipes clean effortlessly',
      plastic: 'Warps with boiling tea; stains from palm oil/stew',
      metal: 'Conducts scorching heat; burns bare hands',
    },
    {
      feature: 'Safety & Hygiene',
      niratree: 'Naturally antimicrobial, 100% organic & non-toxic',
      plastic: 'Contains harmful BPA and microplastic leeching',
      metal: 'Prone to rust spots, flaking paint and corrosion',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Honest Comparison</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
            Why NiraTree Bamboo Beats Plastic &amp; Heavy Metal
          </h2>
          <p className="mt-2 text-xs sm:text-base text-stone-600">
            See the clear difference before you spend hard-earned money on inferior serving ware.
          </p>
        </div>

        {/* Mobile View: Clean Comparison Cards (No horizontal scroll needed!) */}
        <div className="md:hidden space-y-4">
          {comparison.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream-50 rounded-2xl p-4 border border-bamboo-200 shadow-sm space-y-3"
            >
              <h3 className="font-bold text-sm text-forest-950 border-b border-bamboo-200/60 pb-1.5">
                {item.feature}
              </h3>

              {/* NiraTree */}
              <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-forest-900 block">NiraTree Bamboo:</span>
                  <span className="text-emerald-950">{item.niratree}</span>
                </div>
              </div>

              {/* Others */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600">
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-semibold text-rose-700 block mb-0.5">Cheap Plastic</span>
                  <span>{item.plastic}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-semibold text-rose-700 block mb-0.5">Heavy Metal</span>
                  <span>{item.metal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Comparison Table */}
        <div className="hidden md:block overflow-hidden shadow-warm rounded-2xl border border-bamboo-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-bamboo-200 text-xs uppercase tracking-wider">
                <th className="p-4 sm:p-5 bg-stone-50 font-bold text-stone-600 w-1/4">Key Features</th>
                <th className="p-4 sm:p-5 bg-forest-900 text-amber-300 font-extrabold text-sm sm:text-base w-2/5">
                  ⭐ NiraTree Handcrafted Bamboo
                </th>
                <th className="p-4 sm:p-5 bg-stone-100 font-bold text-stone-500 w-1/5">Cheap Plastic Trays</th>
                <th className="p-4 sm:p-5 bg-stone-100 font-bold text-stone-500 w-1/5">Heavy Metal Trays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
              {comparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-cream-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-forest-950 bg-stone-50/60">
                    {item.feature}
                  </td>
                  <td className="p-4 sm:p-5 bg-emerald-50/40 text-forest-900 font-semibold border-x border-emerald-100">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item.niratree}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-600">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{item.plastic}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-600">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{item.metal}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
