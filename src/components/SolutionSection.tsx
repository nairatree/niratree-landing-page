'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Layers, ShieldCheck, Droplet, Check, HeartHandshake } from 'lucide-react';

export default function SolutionSection() {
  const pillars = [
    {
      icon: Sparkles,
      title: '100% Pure Organic Bamboo',
      description:
        'Crafted from high-density, sustainably harvested bamboo. 3x stronger than standard timber, naturally splinter-free, antimicrobial, and conditioned to resist heat and spills.',
    },
    {
      icon: Layers,
      title: 'Smart 3-in-1 Nesting Architecture',
      description:
        'Small, Medium, and Large trays fit flush inside each other. You get 3 versatile serving sizes for every occasion, yet they consume the cabinet space of a single tray.',
    },
    {
      icon: ShieldCheck,
      title: 'Deep Spill-Proof Rims & Grip Handles',
      description:
        'Each tray features an elevated raised lip that prevents hot spills and rolling food, paired with smooth cut-out handles for effortless, balanced carry.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-bamboo-600" />
            <span>The NairaTree Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-forest-950 tracking-tight">
            Designed for Hospitality. Built for a Lifetime of Everyday Moments.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            NairaTree combines timeless Japanese &amp; Scandinavian woodcraft with everyday practicality to turn simple home meals and hosting into a five-star luxury experience.
          </p>
        </div>

        {/* Feature Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-warm border border-bamboo-200/80 hover:border-forest-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-900 text-amber-300 flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-forest-950 mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Nesting Feature Showcase Banner */}
        <div className="mt-14 bg-forest-900 text-cream-50 rounded-3xl p-6 sm:p-10 shadow-warm-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-amber-300">
                Triple Size Versatility In 1 Set
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                One Purchase, Three Purpose-Built Sizes
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Whether you’re enjoying a cozy morning espresso for one, carrying snacks for the family movie night, or serving a 10-person dinner party, you always have the exact tray size ready.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-stone-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-forest-900 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    L
                  </span>
                  <span><strong>Large Tray (43 x 29 cm):</strong> Dinner service, cocktail party bar, ottoman organizer.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-forest-900 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    M
                  </span>
                  <span><strong>Medium Tray (38 x 26 cm):</strong> Breakfast in bed, tea &amp; pastries, afternoon snack plate.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-forest-900 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    S
                  </span>
                  <span><strong>Small Tray (33 x 23 cm):</strong> Coffee mug &amp; book, vanity cosmetics, perfume tray, bedside caddy.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-bamboo-400/40 shadow-2xl bg-stone-900/40">
                <Image
                  src="/images/tray-rounded.jpg"
                  alt="Nesting Bamboo Tray System"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
