import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getOrders, getOrderStats } from '@/lib/db';
import { buildCustomerOrderWhatsAppUrl } from '@/lib/whatsapp';
import { OrderSubmissionPayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body: OrderSubmissionPayload = await req.json();

    // Validation
    if (!body.full_name || body.full_name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your valid full name.' },
        { status: 400 }
      );
    }

    if (!body.whatsapp_phone || body.whatsapp_phone.trim().length < 9) {
      return NextResponse.json(
        { error: 'Please enter a valid WhatsApp phone number.' },
        { status: 400 }
      );
    }

    if (!body.delivery_address || body.delivery_address.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please enter your complete delivery address and nearest landmark.' },
        { status: 400 }
      );
    }

    if (!body.state || body.state.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please select your state.' },
        { status: 400 }
      );
    }

    if (!body.package_id) {
      return NextResponse.json(
        { error: 'Please select a pricing package.' },
        { status: 400 }
      );
    }

    if (!body.tray_style) {
      return NextResponse.json(
        { error: 'Please select your preferred tray style.' },
        { status: 400 }
      );
    }

    // Save to SQLite database
    const order = createOrder(body);

    // Generate WhatsApp redirect URL
    const whatsappUrl = buildCustomerOrderWhatsAppUrl(order);

    return NextResponse.json(
      {
        success: true,
        order,
        whatsappUrl,
        message: 'Order created successfully and saved to database.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing your order.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin') || req.headers.get('x-admin-pin');
    const validPin = process.env.ADMIN_SECRET_PIN || '2026';

    if (pin !== validPin) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;

    const { orders, total } = getOrders({ status, search, limit, offset });
    const stats = getOrderStats();

    return NextResponse.json({ orders, total, stats });
  } catch (error: any) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch orders' }, { status: 500 });
  }
}
