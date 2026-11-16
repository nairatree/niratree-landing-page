'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PRICING_PACKAGES, TRAY_STYLES, NIGERIAN_STATES, VIP_WHATSAPP_GROUP_URL } from '@/lib/constants';
import { PackageId, TrayStyleId, OrderRecord } from '@/lib/types';
import { trackOrderLead } from '@/lib/meta-pixel';
import {
  AlertTriangle,
  ShieldCheck,
  Truck,
  Check,
  Send,
  Loader2,
  Phone,
  User,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface OrderFormProps {
  initialPackageId?: PackageId;
  initialStyleId?: TrayStyleId;
}

export default function OrderForm({
  initialPackageId = 'package_2',
  initialStyleId = 'rectangular',
}: OrderFormProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>(initialPackageId);
  const [selectedStyleId, setSelectedStyleId] = useState<TrayStyleId>(initialStyleId);

  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [state, setState] = useState('Lagos');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  // Sync props if parent changes
  useEffect(() => {
    if (initialPackageId) {
      setSelectedPackageId(initialPackageId);
      const pkg = PRICING_PACKAGES.find(p => p.id === initialPackageId);
      if (pkg && pkg.styleId) {
        setSelectedStyleId(pkg.styleId);
      }
    }
  }, [initialPackageId]);

  useEffect(() => {
    if (initialStyleId) {
      setSelectedStyleId(initialStyleId);
      const pkg = PRICING_PACKAGES.find(p => p.styleId === initialStyleId);
      if (pkg) {
        setSelectedPackageId(pkg.id);
      }
    }
  }, [initialStyleId]);

  const selectedStyle =
    TRAY_STYLES.find((s) => s.id === selectedStyleId) || TRAY_STYLES[0];
  const selectedPackage =
    PRICING_PACKAGES.find((p) => p.styleId === selectedStyle.id) ||
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) ||
    PRICING_PACKAGES[0];

  const currentPrice = selectedStyle.price;

  const formatPrice = (amount: number) => '₦' + amount.toLocaleString('en-NG');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-flight validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('Please enter a valid active WhatsApp phone number (e.g. 08012345678).');
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 5) {
      setErrorMessage('Please provide your complete delivery address and nearest landmark for our dispatch rider.');
      return;
    }

    if (!state) {
      setErrorMessage('Please select your state.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Action A: Immediate DB Save via API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          whatsapp_phone: whatsappPhone.trim(),
          alt_phone: altPhone.trim() || undefined,
          email: email.trim() || undefined,
          delivery_address: deliveryAddress.trim(),
          state: state.trim(),
          city: city.trim() || undefined,
          package_id: selectedPackageId,
          tray_style: selectedStyleId,
          preferred_date: preferredDate || undefined,
          special_instructions: specialInstructions.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order. Please check your details.');
      }

      const order: OrderRecord = data.order;
      const redirectUrl: string = data.whatsappUrl;

      // Action B: Meta Pixel Tracking
      trackOrderLead(order);

      setSubmittedOrder(order);
      setWhatsappRedirectUrl(redirectUrl);

      // Action C: WhatsApp Redirect in new window / tab
      if (typeof window !== 'undefined' && redirectUrl) {
        const win = window.open(redirectUrl, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          console.log('Popup blocked; fallback modal available.');
        }
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-12 sm:py-24 bg-cream-200/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-warm-lg border border-bamboo-300/80 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#003822] text-white p-5 sm:p-8 text-center relative overflow-hidden">
            <div className="flex justify-center mb-2">
              <Image
                src="/images/nairatree-logo-white.png"
                alt="NairaTree"
                width={150}
                height={30}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-forest-950 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Step-by-Step Order Qualification</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Claim Your Handcrafted Bamboo Trays
            </h2>
            <p className="mt-1 text-xs text-stone-200">
              Fast Dispatch Across Nigeria · Delivery Fee Calculated by Location
            </p>
          </div>

          {/* Strict Pre-Qualification Notice */}
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-y-2 border-rose-300 p-3.5 sm:p-5">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs sm:text-sm text-stone-900 leading-snug">
                <span className="font-black text-rose-700 block uppercase tracking-wide text-[11px] sm:text-xs">
                  ⚠️ IMPORTANT NOTICE (SERIOUS BUYERS ONLY):
                </span>
                <p className="mt-1 text-stone-800 text-[11px] sm:text-xs leading-relaxed">
                  Please only place this order if you are <strong>financially ready</strong> and available to receive your package within 1 to 3 business days. Delivery fee will be calculated based on your address and confirmed with you on WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
            {/* Step 1: Select Handcrafted Tray Set */}
            <div>
              <label className="text-xs sm:text-sm font-black text-forest-950 uppercase tracking-wide mb-2 sm:mb-3 flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-forest-900 text-cream-50 text-[10px] sm:text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Select Your Tray Style (Each Set Includes 3 Nesting Trays: S, M, L)</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TRAY_STYLES.map((style) => {
                  const isSelected = selectedStyleId === style.id;
                  const matchingPkg = PRICING_PACKAGES.find(p => p.styleId === style.id) || PRICING_PACKAGES[0];
                  return (
                    <div
                      key={style.id}
                      onClick={() => {
                        setSelectedStyleId(style.id);
                        setSelectedPackageId(matchingPkg.id);
                      }}
                      className={`cursor-pointer rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-cta bg-cream-50 shadow-md ring-2 ring-cta/20'
                          : 'border-stone-200 hover:border-bamboo-300 bg-white'
                      }`}
                    >
                      <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-2 bg-stone-100">
                        <Image
                          src={style.image}
                          alt={style.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <div className="absolute top-2 left-2 bg-forest-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Set of 3 Trays
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-black text-xs sm:text-sm text-forest-950 leading-tight mb-0.5">
                            {style.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Small, Medium &amp; Large Trays
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-cta border-cta text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-baseline justify-between">
                        <span className="text-base sm:text-lg font-black text-forest-900">
                          {formatPrice(style.price)}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(style.originalPrice)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Customer Delivery Details */}
            <div className="space-y-3.5 sm:space-y-4">
              <label className="text-xs sm:text-sm font-black text-forest-950 uppercase tracking-wide mb-1 flex items-center gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-forest-900 text-cream-50 text-[10px] sm:text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Your Delivery Details</span>
              </label>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adebayo Johnson"
                    className="w-full pl-10 pr-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                  />
                </div>
              </div>

              {/* WhatsApp Phone & Alternative Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    WhatsApp Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      placeholder="e.g. 08031234567"
                      className="w-full pl-10 pr-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Alternative Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="e.g. 09098765432"
                      className="w-full pl-10 pr-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* State & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white appearance-none cursor-pointer"
                    >
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City / Town / Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ikeja, Lekki, Maitama, Bodija"
                    className="w-full px-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                  />
                </div>
              </div>

              {/* Full Delivery Address & Landmark */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Address &amp; Nearest Landmark <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. No. 14 Admiralty Way, opposite Zenith Bank, Lekki Phase 1"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                  />
                </div>
              </div>

              {/* Preferred Date & Special Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Delivery Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      placeholder="e.g. Tomorrow or Wednesday"
                      className="w-full pl-10 pr-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Call before coming"
                    className="w-full px-3 py-3 sm:py-3.5 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-stone-900 text-sm sm:text-base bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-cream-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-bamboo-200/80 space-y-2">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Selected Set:</span>
                <span className="font-bold text-forest-950">{selectedStyle.name} (Set of 3 Trays)</span>
              </div>
              <div className="flex justify-between text-xs text-stone-600">
                <span>Delivery Fee:</span>
                <span className="font-bold text-amber-800">Calculated based on location (Confirmed on WhatsApp)</span>
              </div>
              <div className="pt-2 border-t border-bamboo-200 flex justify-between items-baseline">
                <span className="font-black text-xs sm:text-sm text-forest-950">Product Total:</span>
                <span className="font-black text-xl sm:text-2xl text-cta">
                  {formatPrice(currentPrice)}
                </span>
              </div>
              <div className="text-[11px] text-stone-500 italic">
                * Note: Delivery fee is not included above; it will be calculated based on your exact address and confirmed directly with you on WhatsApp before dispatch.
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-300 text-rose-700 text-xs p-3.5 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-xl sm:rounded-2xl bg-cta hover:bg-cta-hover text-white font-black text-sm sm:text-lg shadow-cta hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 flex-shrink-0" />
                    <span>CONFIRM ORDER</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Natural Bamboo
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-forest-700" /> Delivery Calculated by State
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Fast 24-48h Dispatch
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal / WhatsApp Fallback */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border-2 border-emerald-500 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="inline-block bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-0.5 rounded-full mb-2">
              Order ID: {submittedOrder.order_number}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-forest-950 mb-1">
              Order Recorded! 🎉
            </h3>

            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Thank you, <strong>{submittedOrder.full_name}</strong>! Your order for the{' '}
              <strong>{submittedOrder.package_name}</strong> is registered.
            </p>

            <div className="bg-cream-50 p-3 rounded-xl border border-bamboo-200 text-left text-xs space-y-1 mb-4 text-stone-700">
              <div><strong>Product Total:</strong> {formatPrice(submittedOrder.total_price)}</div>
              <div><strong>Delivery Fee:</strong> Will be calculated for your address and added on WhatsApp</div>
              <div><strong>Address:</strong> {submittedOrder.delivery_address}, {submittedOrder.state}</div>
              <div><strong>WhatsApp:</strong> {submittedOrder.whatsapp_phone}</div>
            </div>

            <p className="text-[11px] text-stone-500 mb-3">
              Click below to send your confirmation to our WhatsApp desk:
            </p>

            <a
              href={whatsappRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              <span>SEND TO WHATSAPP DESK</span>
            </a>

            <div className="pt-3 border-t border-stone-200">
              <p className="text-[11px] text-stone-600 mb-1.5 font-bold">
                Want VIP member discounts and wholesale deals?
              </p>
              <a
                href={VIP_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-amber-300 font-bold py-2.5 px-3 rounded-xl transition-all text-xs"
              >
                <span>🌟 Join NairaTree VIP WhatsApp Community</span>
              </a>
            </div>

            <button
              onClick={() => setSubmittedOrder(null)}
              className="mt-3 text-xs font-semibold text-stone-400 hover:text-stone-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
