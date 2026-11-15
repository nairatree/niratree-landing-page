'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Phone, Lock, Heart } from 'lucide-react';
import { BRAND_NAME } from '@/lib/constants';

export default function Footer() {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '2349134837317';

  return (
    <footer className="bg-forest-950 text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-cream-50 flex items-center justify-center font-bold text-xl border border-forest-700">
                <span className="text-amber-400">N</span>T
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                {BRAND_NAME}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Premium handcrafted home &amp; living essentials. We craft eco-friendly, organic bamboo nesting trays that transform everyday hosting and family life into moments of luxury.
            </p>
            <div className="flex items-center gap-4 text-xs text-amber-400 font-semibold pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Verified Bamboo
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-emerald-500" /> Nationwide Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#styles" className="hover:text-amber-400 transition-colors">
                  3 Design Styles
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  Pricing &amp; Packages
                </a>
              </li>
              <li>
                <a href="#order-form" className="hover:text-amber-400 transition-colors">
                  Order Qualification Form
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-stone-400">
                  <Lock className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Customer Fulfillment
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Have questions regarding your order or dispatch rider timeline?
            </p>
            <a
              href={`https://wa.me/${whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest-900 border border-forest-700 hover:border-emerald-500 text-xs font-bold text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chat WhatsApp Support</span>
            </a>
            <div className="text-[11px] text-stone-500 pt-1">
              Working Hours: Mon – Sat: 8:00 AM – 7:00 PM
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-forest-900/80 text-center text-xs text-stone-400 space-y-3">
          <p className="text-[11px] leading-relaxed max-w-2xl mx-auto">
            Disclaimer: NairaTree is an independent direct-to-consumer brand. All product trademarks, imagery, and specifications are proprietary. We strictly operate a verified order fulfillment process across Nigerian states.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-stone-400">
            <span>&copy; {new Date().getFullYear()} NairaTree™ Nigeria. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for elegant Nigerian homes
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
