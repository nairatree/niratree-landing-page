'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Layers, Eye, Maximize2 } from 'lucide-react';
import { trackInitiateCheckout } from '@/lib/meta-pixel';
import ImageLightbox from './ImageLightbox';

const heroImages = [
  {
    title: 'Style A: Classic Rectangular (Set of 3 Trays)',
    subtitle: 'Small, Medium & Large · Beveled Edges & Cut-Out Handles',
    src: '/images/tray-rectangular.jpg',
    tag: 'Bestseller · Beveled Edges',
  },
  {
    title: 'Style B: Modern Rounded-Corner (Set of 3 Trays)',
    subtitle: 'Small, Medium & Large · Smooth Rounded Corners',
    src: '/images/tray-rounded.jpg',
    tag: 'Trending · Curved Corners',
  },
  {
    title: 'Style C: Elegant Oval (Set of 3 Trays)',
    subtitle: 'Small, Medium & Large · Sleek Raised Rim Silhouette',
    src: '/images/tray-oval.jpg',
    tag: 'Luxury · Sleek Raised Rim',
  },
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOrderClick = () => {
    trackInitiateCheckout('Hero CTA', 28500);
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStylesClick = () => {
    const stylesElement = document.getElementById('styles');
    if (stylesElement) {
      stylesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-4 pb-12 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-bamboo-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-forest-800/5 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation / Brand Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-bamboo-200/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/images/nairatree-logo.png"
                alt="NairaTree"
                width={170}
                height={34}
                priority
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block border-l border-stone-300 pl-3">
              <span className="block text-[10px] tracking-widest uppercase text-stone-500 font-bold">
                Handcrafted Home &amp; Living
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-brand/20 text-[10px] sm:text-xs font-semibold text-brand-dark shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-brand flex-shrink-0" />
            <span className="hidden xs:inline">100% Authentic Quality</span>
            <span className="xs:hidden">Verified Quality</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & High-Converting Hook */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/15 text-forest-900 text-[11px] sm:text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-cta animate-ping flex-shrink-0" />
              <span>100% Organic Bamboo · Set of 3 Nesting Trays</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-forest-950 leading-[1.2] sm:leading-[1.15] tracking-tight">
              Upgrade Your Home &amp; Host Guests in Style with{' '}
              <span className="text-forest-800 underline decoration-bamboo-400 decoration-wavy decoration-2">
                NairaTree
              </span>{' '}
              Handcrafted Bamboo Serving Trays{' '}
              <span className="text-cta block sm:inline font-bold">
                (Set of 3)
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-xs sm:text-base text-stone-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Say goodbye to flimsy plastic trays that crack and stain, and heavy metal that rusts.
              Experience the timeless warmth of authentic, water-resistant bamboo trays featuring
              deep spill-proof rims, ergonomic handles, and space-saving 3-in-1 nesting.
            </p>

            {/* Social Proof Stars Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-amber-900 ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-stone-600">
                Verified by <strong>1,450+ Nigerian Homes</strong>
              </span>
            </div>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-left text-xs sm:text-sm text-stone-800 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate"><strong>Set of 3:</strong> S, M &amp; L</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate"><strong>Spill-Proof:</strong> Deep rims</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate"><strong>Multi-Use:</strong> Bed &amp; Party</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate"><strong>Pay on Delivery</strong></span>
              </div>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleOrderClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-cta hover:bg-cta-hover text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-black shadow-cta hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <span>CLAIM PROMO &amp; PAY ON DELIVERY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>

              <button
                onClick={handleStylesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-forest-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-bold border border-stone-300 hover:border-forest-700 transition-colors shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-bamboo-600" />
                <span>View 3 Tray Styles</span>
              </button>
            </div>

            {/* Micro Trust Guarantee */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[10px] sm:text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Pay upon delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Free delivery
              </span>
              <span>•</span>
              <span>24 to 48-hr Dispatch</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Product Card Container */}
              <div className="bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-warm-lg border border-bamboo-200/80 relative overflow-hidden group">
                {/* Floating Top Badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 bg-forest-950/90 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-forest-700">
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{heroImages[activeImageIndex].tag}</span>
                </div>

                {/* Clickable Image Box that pops open the Lightbox */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-inner cursor-zoom-in group/img"
                  title="Click or tap to view uncropped full image"
                >
                  <Image
                    src={heroImages[activeImageIndex].src}
                    alt={heroImages[activeImageIndex].title}
                    fill
                    priority
                    className="object-contain sm:object-cover object-center transition-all duration-500 group-hover/img:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Tap to view full image indicator button */}
                  <div className="absolute top-4 right-4 z-20 bg-black/65 hover:bg-black/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5 border border-white/20 transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Full Size</span>
                  </div>

                  {/* Bottom Image Overlay Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                      Authentic Bamboo Nesting Trays
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base">
                      {heroImages[activeImageIndex].title}
                    </h3>
                  </div>
                </div>

                {/* Thumbnail Selector Row */}
                <div className="grid grid-cols-3 gap-2 mt-2.5 sm:mt-3">
                  {heroImages.map((img, idx) => (
                    <button
                      key={img.src}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-stone-50 ${
                        activeImageIndex === idx
                          ? 'border-cta shadow-md ring-2 ring-cta/20'
                          : 'border-bamboo-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-contain sm:object-cover rounded"
                        sizes="120px"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] sm:text-[9px] font-bold px-1 rounded">
                        Style {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Bottom Value Highlight Ribbon */}
                <div className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 bg-cream-50 rounded-xl border border-bamboo-200/60 flex items-center justify-between text-[11px] sm:text-xs text-stone-700">
                  <span className="font-bold text-forest-900">
                    📦 Box Includes:
                  </span>
                  <span>Small + Medium + Large (3 Trays)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full View Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={heroImages}
        currentIndex={activeImageIndex}
        onNavigate={(idx) => setActiveImageIndex(idx)}
      />
    </section>
  );
}
