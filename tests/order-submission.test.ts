import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderStats } from '../src/lib/db';
import { buildCustomerOrderWhatsAppUrl, buildAdminChatWhatsAppUrl, sanitizeWhatsAppPhone } from '../src/lib/whatsapp';
import { PRICING_PACKAGES, TRAY_STYLES } from '../src/lib/constants';

// Set test environment database
process.env.DATABASE_FILE = './data/test_orders.db';

describe('NiraTree Order & Funnel Automated Verification Suite', () => {

  it('1. Should properly sanitize Nigerian phone numbers to international WhatsApp format', () => {
    assert.equal(sanitizeWhatsAppPhone('08031234567'), '2348031234567');
    assert.equal(sanitizeWhatsAppPhone('+234 803 123 4567'), '2348031234567');
    assert.equal(sanitizeWhatsAppPhone('2348031234567'), '2348031234567');
    assert.equal(sanitizeWhatsAppPhone('0909-888-7777'), '2349098887777');
  });

  it('2. Should create order, write to SQLite database, and return persisted record', () => {
    const payload = {
      full_name: 'Chief Olumide Adeleke',
      whatsapp_phone: '08035551234',
      alt_phone: '09012345678',
      email: 'olumide@example.com',
      delivery_address: 'Plot 12 Admiralty Way, opposite Zenith Bank',
      state: 'Lagos',
      city: 'Lekki Phase 1',
      package_id: 'package_2' as const,
      tray_style: 'rectangular' as const,
      preferred_date: 'Tomorrow afternoon',
      special_instructions: 'Call at the security gate',
    };

    const created = createOrder(payload);

    assert.ok(created.id, 'Expected order to have an auto-incremented database ID');
    assert.ok(created.order_number.startsWith('NT-'), 'Expected order number to start with NT-');
    assert.equal(created.full_name, 'Chief Olumide Adeleke');
    assert.equal(created.whatsapp_phone, '08035551234');
    assert.equal(created.state, 'Lagos');
    assert.equal(created.package_name, 'Double Set (6 Trays — Best Value)');
    assert.equal(created.tray_style_name, 'Style A: Classic Rectangular');
    assert.equal(created.total_price, 49000);
    assert.equal(created.status, 'New');

    // Query back from database
    const fetched = getOrderById(created.id!);
    assert.ok(fetched, 'Expected order to be retrievable from database');
    assert.equal(fetched.order_number, created.order_number);
    assert.equal(fetched.total_price, 49000);
  });

  it('3. Should generate properly encoded WhatsApp URLs with zero malformed characters', () => {
    const mockOrder = {
      order_number: 'NT-TEST999',
      full_name: 'Dr. Halima & Mrs. Bello',
      whatsapp_phone: '08123456789',
      package_name: 'The Complete NairaTree Trio (9 Trays)',
      tray_style_name: 'Style C: Elegant Oval',
      total_price: 74000,
      delivery_address: '15 Crescent Road, off GRA',
      state: 'Rivers',
      city: 'Port Harcourt',
    };

    const businessPhone = '2349134837317';
    const url = buildCustomerOrderWhatsAppUrl(mockOrder, businessPhone);

    assert.ok(url.startsWith('https://wa.me/2349134837317?text='), 'Must target sanitized business phone');
    assert.ok(url.includes(encodeURIComponent('NT-TEST999')), 'Must contain encoded order number');
    assert.ok(url.includes(encodeURIComponent('Dr. Halima & Mrs. Bello')), 'Must safely encode ampersands and special characters');
    assert.ok(url.includes(encodeURIComponent('₦74,000')), 'Must include formatted Naira price');
    assert.ok(url.includes(encodeURIComponent('Port Harcourt, Rivers State')), 'Must include city and state');
    // Ensure line breaks are encoded as %0A
    assert.ok(url.includes('%0A'), 'Must have encoded multi-line breaks for WhatsApp readability');

    // Test Admin WhatsApp customer chat link
    const fullOrder = {
      ...mockOrder,
      id: 99,
      created_at: new Date().toISOString(),
      package_id: 'package_3' as const,
      tray_style: 'oval' as const,
      status: 'New' as const,
    };
    const adminUrl = buildAdminChatWhatsAppUrl(fullOrder);
    assert.ok(adminUrl.startsWith('https://wa.me/2348123456789?text='), 'Admin URL must target customer phone');
    assert.ok(adminUrl.includes(encodeURIComponent('Dr. Halima & Mrs. Bello')));
  });

  it('4. Should support order status lifecycle updates in SQLite', () => {
    const payload = {
      full_name: 'Amina Danjuma',
      whatsapp_phone: '08023456789',
      delivery_address: '10 Gana Street, Maitama',
      state: 'Abuja (FCT)',
      city: 'Abuja',
      package_id: 'package_1' as const,
      tray_style: 'rounded' as const,
    };

    const order = createOrder(payload);
    assert.equal(order.status, 'New');

    // Update to Dispatched
    const updateResult = updateOrderStatus(order.id!, 'Dispatched', 'Rider Tunde assigned tracking #4492');
    assert.equal(updateResult, true);

    const updated = getOrderById(order.id!);
    assert.equal(updated?.status, 'Dispatched');
    assert.equal(updated?.notes, 'Rider Tunde assigned tracking #4492');

    // Update to Delivered
    updateOrderStatus(order.id!, 'Delivered', 'Payment received via transfer');
    const delivered = getOrderById(order.id!);
    assert.equal(delivered?.status, 'Delivered');
  });

  it('5. Should correctly aggregate order pipeline metrics & status counts', () => {
    const stats = getOrderStats();
    assert.ok(typeof stats.totalOrders === 'number');
    assert.ok(typeof stats.totalRevenue === 'number');
    assert.ok(stats.totalOrders >= 2);
    assert.ok(stats.totalRevenue >= (49000 + 28000));
    assert.ok(stats.statusCounts['Delivered'] >= 1);
  });

  it('6. Should enforce exact pricing for each tray style (25k Rectangular, 26k Oval, 28k Curved)', () => {
    const recOrder = createOrder({
      full_name: 'Test Customer A',
      whatsapp_phone: '08011112222',
      delivery_address: 'Test Address Lagos',
      state: 'Lagos',
      package_id: 'package_1',
      tray_style: 'rectangular',
    });
    assert.equal(recOrder.total_price, 25000);

    const ovalOrder = createOrder({
      full_name: 'Test Customer B',
      whatsapp_phone: '08011112223',
      delivery_address: 'Test Address Abuja',
      state: 'Abuja (FCT)',
      package_id: 'package_1',
      tray_style: 'oval',
    });
    assert.equal(ovalOrder.total_price, 26000);

    const curvedOrder = createOrder({
      full_name: 'Test Customer C',
      whatsapp_phone: '08011112224',
      delivery_address: 'Test Address Ibadan',
      state: 'Oyo (Ibadan)',
      package_id: 'package_1',
      tray_style: 'rounded',
    });
    assert.equal(curvedOrder.total_price, 28000);
  });

  it('6. Should filter and search orders by text or state', () => {
    const { orders: lagosOrders } = getOrders({ search: 'Lagos' });
    assert.ok(lagosOrders.some((o) => o.state === 'Lagos'));

    const { orders: olumideOrders } = getOrders({ search: 'Olumide' });
    assert.ok(olumideOrders.length >= 1);
    assert.equal(olumideOrders[0].full_name, 'Chief Olumide Adeleke');
  });
});
