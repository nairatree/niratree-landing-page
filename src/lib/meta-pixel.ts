declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

/**
 * Safe Meta Pixel event trigger.
 * If Pixel ID is not configured or ad blocker active, logs in dev and never crashes.
 */
export function trackPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function' && META_PIXEL_ID) {
    try {
      window.fbq('track', eventName, params);
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Meta Pixel Event: ${eventName}]`, params);
      }
    } catch (err) {
      console.warn('Meta Pixel tracking error:', err);
    }
  } else if (process.env.NODE_ENV === 'development' && params) {
    console.log(`[Meta Pixel (Dev/Mock Mode): ${eventName}]`, params);
  }
}

export function trackInitiateCheckout(packageName?: string, price?: number) {
  trackPixelEvent('InitiateCheckout', {
    content_name: packageName || 'Bamboo Serving Trays',
    currency: 'NGN',
    value: price || 28500,
  });
}

export function trackOrderLead(order: {
  package_name: string;
  total_price: number;
  order_number: string;
}) {
  trackPixelEvent('Lead', {
    content_name: order.package_name,
    currency: 'NGN',
    value: order.total_price,
    order_id: order.order_number,
  });
  // Also optionally fire Purchase
  trackPixelEvent('Purchase', {
    content_name: order.package_name,
    currency: 'NGN',
    value: order.total_price,
    order_id: order.order_number,
  });
}
