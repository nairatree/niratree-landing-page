'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Can I pay when the dispatch rider arrives at my address?',
    answer:
      'Yes, 100%! We offer Pay on Delivery nationwide. You only hand cash or do an instant bank transfer to the dispatch rider when your package arrives safely at your doorstep.',
  },
  {
    question: 'Am I allowed to open and inspect the trays before paying?',
    answer:
      'Yes! We encourage every customer to inspect the package in the presence of the dispatch rider. Confirm the bamboo quality, smooth finish, and correct style before making payment.',
  },
  {
    question: 'How long does delivery take to my state?',
    answer:
      'Deliveries within Lagos and Abuja typically arrive within 24 to 48 hours. Deliveries to Port Harcourt, Ibadan, Enugu, Kano, and other state capitals take 2 to 4 business days.',
  },
  {
    question: 'How do I clean and maintain natural bamboo?',
    answer:
      'Bamboo is naturally water-resistant and antimicrobial. Simply wipe clean with a soft damp cloth and mild dish soap. Do not soak in water or wash in a dishwasher. Condition once every few months with food-grade coconut or mineral oil to maintain a warm luster.',
  },
  {
    question: 'Do all 3 trays really nest inside one another?',
    answer:
      'Yes! The small tray sits completely inside the medium tray, which sits flush inside the large tray. When not in use, all 3 trays occupy only the footprint of the large tray, saving over 70% of cabinet storage space.',
  },
  {
    question: 'What happens if a tray is damaged during transit?',
    answer:
      'We pack every set in heavy-duty impact-resistant carton packaging. In the unlikely event that a dispatch rider mishandles your item and you notice any crack, our team will exchange it free of charge within 7 days.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-cream-100 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-bamboo-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-forest-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Everything you need to know before placing your order.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-bamboo-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left font-bold text-forest-950 flex items-center justify-between gap-4 text-sm sm:text-base hover:bg-cream-50/50"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-bamboo-600 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-cream-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
