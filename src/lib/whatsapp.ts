import { OrderRecord } from './types';

/**
 * Standardize phone numbers to international WhatsApp format (e.g., 2349134837317)
 */
export function sanitizeWhatsAppPhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '234' + cleaned.substring(1);
  } else if (cleaned.startsWith('234')) {
    // already 234
  } else if (cleaned.length === 10) {
    cleaned = '234' + cleaned;
  }
  return cleaned;
}

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Build pre-filled WhatsApp message for customer to send to NairaTree Business
 */
export function buildCustomerOrderWhatsAppUrl(
  order: Pick<OrderRecord, 'order_number' | 'full_name' | 'whatsapp_phone' | 'package_name' | 'tray_style_name' | 'total_price' | 'delivery_address' | 'state' | 'city'>,
  businessPhone?: string
): string {
  const targetPhone = sanitizeWhatsAppPhone(
    businessPhone || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '2349047125385'
  );

  const address = order.city
    ? `${order.delivery_address}, ${order.city}, ${order.state} State`
    : `${order.delivery_address}, ${order.state} State`;

  const message = [
    `Hello NairaTree Team! 👋`,
    `I just placed an order on your website. Here are my details:`,
    ``,
    `📦 Order Details:`,
    `- Order ID: ${order.order_number}`,
    `- Name: ${order.full_name}`,
    `- WhatsApp: ${order.whatsapp_phone}`,
    `- Tray Style: ${order.tray_style_name}`,
    `- Package: ${order.package_name}`,
    `- Product Total: ${formatNaira(order.total_price)} (Delivery fee to be calculated)`,
    `- Delivery Address: ${address}`,
    ``,
    `Please calculate my delivery fee and confirm my delivery schedule!`
  ].join('\n');

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Build dispatch/admin chat message to open conversation with customer
 */
export function buildAdminChatWhatsAppUrl(order: OrderRecord): string {
  const customerPhone = sanitizeWhatsAppPhone(order.whatsapp_phone);
  const message = [
    `Hello ${order.full_name}! 👋`,
    `This is the NairaTree Dispatch & Support team regarding your order (${order.order_number}) for the ${order.package_name}.`,
    ``,
    `We have received your delivery address: ${order.delivery_address}, ${order.state}.`,
    `Your product price is ${formatNaira(order.total_price)}. We are calculating your exact delivery fee for your location right now.`,
    `Are you ready to confirm your order?`
  ].join('\n');

  return `https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`;
}
