'use client';

import React from 'react';
import { PRICING_PACKAGES } from '@/lib/constants';
import { PackageId } from '@/lib/types';
import { Check, Flame, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

interface PricingPackagesProps {
  onSelectPackage?: (packageId: PackageId) => void;
}

export default function PricingPackages({ onSelectPackage }: PricingPackagesProps) {
  const handleSelectPackage = (pkg: typeof PRICING_PACKAGES[0]) => {
    trackInitiateCheckout(pkg.name, pkg.price);
    if (onSelectPackage) {
      onSelectPackage(pkg.id);
    }
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (val: number) => '₦' + val.toLocaleString('en-NG');

  return (
    <section id="pricing" className="py-12 sm:py-24 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta/10 text-cta text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Limited Promotional Pricing</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
            Select Your Package &amp; Pay on Delivery
          </h2>
          <p className="mt-2 text-xs sm:text-base text-stone-600">
            Every set comes with our 100% Bamboo Quality Guarantee and Free Delivery Across Nigeria.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-cta shadow-warm-lg ring-4 ring-cta/15 md:-translate-y-2'
                    : 'bg-white border border-bamboo-200 shadow-warm hover:border-bamboo-400'
                }`}
              >
                {/* Popular / Savings Ribbon */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cta text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-forest-950 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-stone-500 mb-3 sm:mb-4 sm:min-h-[36px]">
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="py-3 sm:py-4 border-y border-stone-100 mb-4 sm:mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-black text-forest-900">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 inline-block px-2 py-0.5 rounded">
                      Save {formatPrice(pkg.savings)} Today
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm text-stone-700">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3.5 sm:py-4 rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                      isPopular
                        ? 'bg-cta hover:bg-cta-hover text-white shadow-cta hover:shadow-xl'
                        : 'bg-forest-900 hover:bg-forest-800 text-cream-50'
                    }`}
                  >
                    <span>CLAIM THIS PACKAGE</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-emerald-600" /> Free Shipping
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-500" /> Pay On Delivery
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
