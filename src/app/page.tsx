'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Hero from '@/components/Hero';
import RecentOrderToast from '@/components/RecentOrderToast';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import BambooVsOthers from '@/components/BambooVsOthers';
import StyleSelector from '@/components/StyleSelector';
import LifestyleOccasions from '@/components/LifestyleOccasions';
import PricingPackages from '@/components/PricingPackages';
import WhatsAppReviews from '@/components/WhatsAppReviews';
import VIPGroupBanner from '@/components/VIPGroupBanner';
import OrderForm from '@/components/OrderForm';
import FAQSection from '@/components/FAQSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import Footer from '@/components/Footer';
import { PackageId, TrayStyleId } from '@/lib/types';

export default function HomePage() {
  const [activePackageId, setActivePackageId] = useState<PackageId>('package_2');
  const [activeStyleId, setActiveStyleId] = useState<TrayStyleId>('rectangular');

  const handleSelectPackage = (packageId: PackageId) => {
    setActivePackageId(packageId);
  };

  const handleSelectStyle = (styleId: TrayStyleId) => {
    setActiveStyleId(styleId);
  };

  return (
    <main className="min-h-screen flex flex-col bg-cream-100">
      {/* Sticky Urgency Top Announcement Bar */}
      <AnnouncementBar />

      {/* Hero Section */}
      <Hero />

      {/* Recent Order Toast Notification */}
      <RecentOrderToast />

      {/* Pain-Point / Agitation Section */}
      <ProblemSection />

      {/* Solution & Feature Breakdown */}
      <SolutionSection />

      {/* Bamboo vs Plastic vs Heavy Metal Comparison */}
      <BambooVsOthers />

      {/* Interactive 3 Design Styles Selector */}
      <StyleSelector onSelectStyle={handleSelectStyle} />

      {/* Multi-Purpose Lifestyle Moments */}
      <LifestyleOccasions />

      {/* Pricing Packages & Special Bundle Offers */}
      <PricingPackages onSelectPackage={handleSelectPackage} />

      {/* Social Proof & WhatsApp Styled Customer Reviews */}
      <WhatsAppReviews />

      {/* Exclusive VIP WhatsApp Community Banner */}
      <VIPGroupBanner />

      {/* The Pre-Qualification Order Form & Dual Action Funnel */}
      <OrderForm
        initialPackageId={activePackageId}
        initialStyleId={activeStyleId}
      />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCTA />

      {/* Comprehensive Brand Footer */}
      <Footer />
    </main>
  );
}
