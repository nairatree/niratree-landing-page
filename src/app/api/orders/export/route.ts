import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

function escapeCsvField(field: any): string {
  if (field === null || field === undefined) {
    return '""';
  }
  const stringified = String(field).replace(/"/g, '""');
  return `"${stringified}"`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin') || req.headers.get('x-admin-pin');
    const validPin = process.env.ADMIN_SECRET_PIN || '2026';

    if (pin && pin !== validPin) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const { orders } = getOrders({ limit: 10000 });

    const headers = [
      'Order Number',
      'Created At',
      'Full Name',
      'WhatsApp Phone',
      'Alternative Phone',
      'Email',
      'Delivery Address',
      'State',
      'City',
      'Package',
      'Tray Style',
      'Total Amount (NGN)',
      'Preferred Date',
      'Status',
      'Special Instructions',
      'Admin Notes',
    ];

    const rows = orders.map((order) => [
      escapeCsvField(order.order_number),
      escapeCsvField(order.created_at),
      escapeCsvField(order.full_name),
      escapeCsvField(order.whatsapp_phone),
      escapeCsvField(order.alt_phone || ''),
      escapeCsvField(order.email || ''),
      escapeCsvField(order.delivery_address),
      escapeCsvField(order.state),
      escapeCsvField(order.city || ''),
      escapeCsvField(order.package_name),
      escapeCsvField(order.tray_style_name),
      escapeCsvField(order.total_price),
      escapeCsvField(order.preferred_date || ''),
      escapeCsvField(order.status),
      escapeCsvField(order.special_instructions || ''),
      escapeCsvField(order.notes || ''),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\r\n');

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `niratree-orders-${dateStr}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error generating CSV export:', error);
    return NextResponse.json({ error: 'Failed to generate CSV export' }, { status: 500 });
  }
}
