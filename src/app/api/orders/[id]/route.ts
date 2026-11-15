import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, deleteOrder, getOrderById } from '@/lib/db';
import { OrderStatus } from '@/lib/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const pin = req.headers.get('x-admin-pin') || new URL(req.url).searchParams.get('pin');
    const validPin = process.env.ADMIN_SECRET_PIN || '2026';
    if (pin !== validPin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { status, notes } = body;

    const validStatuses: OrderStatus[] = ['New', 'Contacted', 'Dispatched', 'Delivered', 'Ghosted / Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const success = updateOrderStatus(id, status, notes);
    if (!success) {
      return NextResponse.json({ error: 'Order not found or not modified' }, { status: 404 });
    }

    const updated = getOrderById(id);
    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const pin = req.headers.get('x-admin-pin') || new URL(req.url).searchParams.get('pin');
    const validPin = process.env.ADMIN_SECRET_PIN || '2026';
    if (pin !== validPin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = deleteOrder(id);
    if (!success) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Order deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
