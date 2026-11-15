'use client';

import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

const reviews = [
  {
    name: 'Mrs. Folashade Adeleke',
    location: 'Lekki Phase 1, Lagos',
    packageBought: 'Package 2: Double Set (Style A & B)',
    rating: 5,
    date: '2 days ago',
    avatar: 'FA',
    chatMessage:
      'Good afternoon NairaTree! 👋 Just wanted to say a big thank you. The dispatch guy delivered this morning at Admiralty Way and I paid on delivery. The bamboo is heavy, splinter-free, and looks 10x more expensive than what I paid. My sisters are already asking for your link!',
    verified: true,
  },
  {
    name: 'Engr. Chukwudi Okonkwo',
    location: 'Gwarinpa Estate, Abuja',
    packageBought: 'Package 3: The Complete NairaTree Trio',
    rating: 5,
    date: '3 days ago',
    avatar: 'CO',
    chatMessage:
      'Received my 9 trays yesterday. First impression: 100% genuine bamboo. The nesting is genius because my wife was complaining we didn’t have cabinet space for new trays. They all fit into the footprint of one tray. Very solid craftsmanship.',
    verified: true,
  },
  {
    name: 'Dr. (Mrs) Halima Bello',
    location: 'Old GRA, Port Harcourt',
    packageBought: 'Package 1: Style C (Oval)',
    rating: 5,
    date: '4 days ago',
    avatar: 'HB',
    chatMessage:
      'The oval style is breathtaking! Used it on our coffee table with scented candles and champagne glasses when hosting colleagues yesterday. The raised rim is great because there were zero glass sweat rings on our center table. Splendid product.',
    verified: true,
  },
  {
    name: 'Mr. Babatunde Ogunleye',
    location: 'Oluyole Estate, Ibadan',
    packageBought: 'Package 2: Double Set (Rectangular)',
    rating: 5,
    date: '5 days ago',
    avatar: 'BO',
    chatMessage:
      'I was skeptical about ordering online because of fake products, but paying on delivery gave me confidence. Inspected the trays thoroughly before doing mobile transfer to the rider. Very smooth finish and no rough edges. Kudos to your team!',
    verified: true,
  },
];

export default function WhatsAppReviews() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
            Loved by 1,450+ Nigerian Homes &amp; Discerning Hosts
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Read unedited WhatsApp feedback from customers across Lagos, Abuja, Port Harcourt, and Ibadan.
          </p>
        </div>

        {/* WhatsApp Styled Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-[#EFEAE2] rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-300 relative overflow-hidden"
            >
              {/* WhatsApp Header bar */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-300/80 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-900 text-amber-300 font-bold text-sm flex items-center justify-center shadow-inner">
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-[11px] text-stone-600">{rev.location}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500">{rev.date}</span>
                </div>
              </div>

              {/* Package Tag */}
              <div className="mb-3">
                <span className="text-[11px] font-semibold bg-white/80 text-forest-900 px-2.5 py-1 rounded-md border border-stone-200 inline-block">
                  Purchased: {rev.packageBought}
                </span>
              </div>

              {/* WhatsApp Message Bubble */}
              <div className="bg-white rounded-2xl p-4 shadow-sm relative text-stone-800 text-xs sm:text-sm leading-relaxed border border-stone-100">
                <p>&ldquo;{rev.chatMessage}&rdquo;</p>
                <div className="text-right mt-2 text-[10px] text-stone-400 flex items-center justify-end gap-1">
                  <span>Verified WhatsApp Order</span>
                  <span className="text-emerald-500 font-bold">✓✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
