'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TRAY_STYLES } from '@/lib/constants';
import { TrayStyleId } from '@/lib/types';
import { Check, Sparkles, ArrowRight, Ruler, CheckCircle } from 'lucide-react';

interface StyleSelectorProps {
  onSelectStyle?: (styleId: TrayStyleId) => void;
}

export default function StyleSelector({ onSelectStyle }: StyleSelectorProps) {
  const [selectedStyleId, setSelectedStyleId] = useState<TrayStyleId>('rectangular');

  const currentStyle = TRAY_STYLES.find((s) => s.id === selectedStyleId) || TRAY_STYLES[0];

  const handleSelectAndScroll = (styleId: TrayStyleId) => {
    setSelectedStyleId(styleId);
    if (onSelectStyle) {
      onSelectStyle(styleId);
    }
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getShortName = (styleId: TrayStyleId) => {
    switch (styleId) {
      case 'rectangular':
        return 'Rectangular';
      case 'rounded':
        return 'Rounded';
      case 'oval':
        return 'Oval';
      default:
        return 'Set';
    }
  };

  return (
    <section id="styles" className="py-12 sm:py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-bamboo-600" />
            <span>Choose Your Aesthetic</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
            3 Handcrafted Design Styles. Which Fits Your Home?
          </h2>
          <p className="mt-2 text-xs sm:text-base text-stone-600">
            Every set contains 3 nesting trays (Small, Medium, Large). Select the architectural silhouette that matches your living space.
          </p>
        </div>

        {/* Tab Buttons: Grid on mobile, flex on desktop */}
        <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 mb-6 sm:mb-10 max-w-xl mx-auto">
          {TRAY_STYLES.map((style) => {
            const isActive = selectedStyleId === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all border-2 text-center ${
                  isActive
                    ? 'bg-forest-900 text-amber-300 border-forest-900 shadow-md scale-[1.02]'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-bamboo-400'
                }`}
              >
                <span className="truncate">{getShortName(style.id)}</span>
                {isActive && <Check className="w-3.5 h-3.5 text-amber-300 hidden sm:inline" />}
              </button>
            );
          })}
        </div>

        {/* Detailed Style Feature Display */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-warm-lg border border-bamboo-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Style Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-stone-200 group">
                <Image
                  src={currentStyle.image}
                  alt={currentStyle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-forest-950/85 backdrop-blur-sm text-amber-300 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-forest-700">
                  {currentStyle.tag}
                </div>
              </div>
            </div>

            {/* Style Info & Dimensions */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bamboo-600 font-bold block mb-1">
                  {currentStyle.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-forest-950">
                  {currentStyle.name}
                </h3>
              </div>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {currentStyle.description}
              </p>

              {/* Dimensions Specs Box */}
              <div className="bg-cream-50 p-3 sm:p-4 rounded-xl border border-bamboo-200 space-y-2">
                <div className="flex items-center gap-1.5 text-forest-900 font-bold text-[11px] uppercase tracking-wide">
                  <Ruler className="w-3.5 h-3.5 text-bamboo-600" />
                  <span>Dimensions In Each Set (Small, Medium, Large)</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-xs text-stone-700">
                  <div className="bg-white p-2 rounded-lg border border-stone-200 text-center sm:text-left">
                    <span className="font-bold text-forest-900 block">Large</span>
                    <span>43×29cm</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200 text-center sm:text-left">
                    <span className="font-bold text-forest-900 block">Medium</span>
                    <span>38×26cm</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stone-200 text-center sm:text-left">
                    <span className="font-bold text-forest-900 block">Small</span>
                    <span>33×23cm</span>
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-1.5 text-xs text-stone-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Conditioned with food-grade oils for water-resistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Dual cut-out handles designed for ergonomic balanced grip</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Protected packaging with moisture-safe desiccant</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  onClick={() => handleSelectAndScroll(currentStyle.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-cta hover:bg-cta-hover text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-base shadow-cta hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Select {getShortName(currentStyle.id)} &amp; Order</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
