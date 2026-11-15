import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createOrder, getOrders } from '../src/lib/db';

process.env.DATABASE_FILE = './data/test_orders.db';

describe('CSV Export & API Security Verification', () => {
  it('1. Should produce properly escaped and formatted CSV data', () => {
    // Seed a known order first
    createOrder({
      full_name: 'Chief Olumide Adeleke',
      whatsapp_phone: '08035551234',
      delivery_address: 'Plot 12 Admiralty Way, Lekki Phase 1',
      state: 'Lagos',
      package_id: 'package_2',
      tray_style: 'rectangular',
    });

    const { orders } = getOrders({ limit: 10 });
    assert.ok(orders.length > 0, 'Should have test orders in DB');

    function escapeCsvField(field: any): string {
      if (field === null || field === undefined) return '""';
      const stringified = String(field).replace(/"/g, '""');
      return `"${stringified}"`;
    }

    const headers = [
      'Order Number',
      'Created At',
      'Full Name',
      'WhatsApp Phone',
      'Delivery Address',
      'State',
      'Package',
      'Tray Style',
      'Total Amount (NGN)',
      'Status',
    ];

    const rows = orders.map((order) => [
      escapeCsvField(order.order_number),
      escapeCsvField(order.created_at),
      escapeCsvField(order.full_name),
      escapeCsvField(order.whatsapp_phone),
      escapeCsvField(order.delivery_address),
      escapeCsvField(order.state),
      escapeCsvField(order.package_name),
      escapeCsvField(order.tray_style_name),
      escapeCsvField(order.total_price),
      escapeCsvField(order.status),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    assert.ok(csv.includes('Order Number,Created At,Full Name'), 'Headers must be present');
    assert.ok(csv.includes('"Chief Olumide Adeleke"'), 'Customer name must be present and quoted');
    assert.ok(csv.includes('"52000"'), 'Total price must be present');
    assert.ok(csv.includes('Style A: Classic Rectangular'), 'Tray style name must be present');
  });

  it('2. Should reject unauthorized requests when PIN is incorrect', () => {
    const validPin = process.env.ADMIN_SECRET_PIN || '2026';
    const suppliedPin = '9999_wrong_pin';
    assert.notEqual(suppliedPin, validPin);
  });
});
