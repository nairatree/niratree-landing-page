import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';
import { OrderRecord, OrderStatus, PackageId, TrayStyleId } from './types';
import { PRICING_PACKAGES, TRAY_STYLES } from './constants';

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = process.env.DATABASE_FILE || './data/orders.db';
  const resolvedPath = path.resolve(process.cwd(), dbPath);
  const dir = path.dirname(resolvedPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new DatabaseSync(resolvedPath);

  // Enable WAL mode for high concurrency & reliability
  try {
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA synchronous = NORMAL;');
  } catch (err) {
    console.warn('Could not set WAL pragma:', err);
  }

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL,
      full_name TEXT NOT NULL,
      whatsapp_phone TEXT NOT NULL,
      alt_phone TEXT,
      email TEXT,
      delivery_address TEXT NOT NULL,
      state TEXT NOT NULL,
      city TEXT,
      package_id TEXT NOT NULL,
      package_name TEXT NOT NULL,
      tray_style TEXT NOT NULL,
      tray_style_name TEXT NOT NULL,
      total_price INTEGER NOT NULL,
      preferred_date TEXT,
      special_instructions TEXT,
      status TEXT NOT NULL DEFAULT 'New',
      notes TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
    CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(whatsapp_phone);
  `);

  dbInstance = db;
  return db;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  return `NT-${timestamp.slice(-4)}${randomPart}`;
}

export interface CreateOrderInput {
  full_name: string;
  whatsapp_phone: string;
  alt_phone?: string;
  email?: string;
  delivery_address: string;
  state: string;
  city?: string;
  package_id: PackageId;
  tray_style: TrayStyleId;
  preferred_date?: string;
  special_instructions?: string;
}

export function createOrder(input: CreateOrderInput): OrderRecord {
  const db = getDatabase();

  const selectedPackage = PRICING_PACKAGES.find(p => p.id === input.package_id) || PRICING_PACKAGES[0];
  const selectedStyle = TRAY_STYLES.find(s => s.id === input.tray_style) || TRAY_STYLES[0];

  const orderNumber = generateOrderNumber();
  const createdAt = new Date().toISOString();
  const status: OrderStatus = 'New';

  const stmt = db.prepare(`
    INSERT INTO orders (
      order_number,
      created_at,
      full_name,
      whatsapp_phone,
      alt_phone,
      email,
      delivery_address,
      state,
      city,
      package_id,
      package_name,
      tray_style,
      tray_style_name,
      total_price,
      preferred_date,
      special_instructions,
      status,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    orderNumber,
    createdAt,
    input.full_name.trim(),
    input.whatsapp_phone.trim(),
    input.alt_phone?.trim() || null,
    input.email?.trim() || null,
    input.delivery_address.trim(),
    input.state.trim(),
    input.city?.trim() || null,
    input.package_id,
    selectedPackage.name,
    input.tray_style,
    selectedStyle.name,
    selectedPackage.price,
    input.preferred_date?.trim() || null,
    input.special_instructions?.trim() || null,
    status,
    ''
  );

  return {
    id: Number(result.lastInsertRowid),
    order_number: orderNumber,
    created_at: createdAt,
    full_name: input.full_name.trim(),
    whatsapp_phone: input.whatsapp_phone.trim(),
    alt_phone: input.alt_phone?.trim(),
    email: input.email?.trim(),
    delivery_address: input.delivery_address.trim(),
    state: input.state.trim(),
    city: input.city?.trim(),
    package_id: input.package_id,
    package_name: selectedPackage.name,
    tray_style: input.tray_style,
    tray_style_name: selectedStyle.name,
    total_price: selectedPackage.price,
    preferred_date: input.preferred_date?.trim(),
    special_instructions: input.special_instructions?.trim(),
    status,
    notes: '',
  };
}

export function getOrders(params?: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): { orders: OrderRecord[]; total: number } {
  const db = getDatabase();

  let query = 'SELECT * FROM orders WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as count FROM orders WHERE 1=1';
  const args: any[] = [];
  const countArgs: any[] = [];

  if (params?.status && params.status !== 'all') {
    query += ' AND status = ?';
    countQuery += ' AND status = ?';
    args.push(params.status);
    countArgs.push(params.status);
  }

  if (params?.search && params.search.trim()) {
    const searchPattern = `%${params.search.trim()}%`;
    query += ' AND (full_name LIKE ? OR whatsapp_phone LIKE ? OR state LIKE ? OR order_number LIKE ?)';
    countQuery += ' AND (full_name LIKE ? OR whatsapp_phone LIKE ? OR state LIKE ? OR order_number LIKE ?)';
    args.push(searchPattern, searchPattern, searchPattern, searchPattern);
    countArgs.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY id DESC';

  if (params?.limit) {
    query += ' LIMIT ?';
    args.push(params.limit);
    if (params?.offset) {
      query += ' OFFSET ?';
      args.push(params.offset);
    }
  }

  const orders = db.prepare(query).all(...args) as unknown as OrderRecord[];
  const countResult = db.prepare(countQuery).all(...countArgs) as unknown as [{ count: number }];
  const total = Number(countResult[0]?.count || 0);

  return { orders, total };
}

export function getOrderById(id: number): OrderRecord | null {
  const db = getDatabase();
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').all(id) as unknown as OrderRecord[];
  return row[0] || null;
}

export function updateOrderStatus(id: number, status: OrderStatus, notes?: string): boolean {
  const db = getDatabase();
  let query = 'UPDATE orders SET status = ?';
  const args: any[] = [status];

  if (notes !== undefined) {
    query += ', notes = ?';
    args.push(notes);
  }

  query += ' WHERE id = ?';
  args.push(id);

  const result = db.prepare(query).run(...args);
  return Number(result.changes) > 0;
}

export function deleteOrder(id: number): boolean {
  const db = getDatabase();
  const result = db.prepare('DELETE FROM orders WHERE id = ?').run(id);
  return Number(result.changes) > 0;
}

export function getOrderStats() {
  const db = getDatabase();
  const rows = db.prepare('SELECT status, count(*) as count, sum(total_price) as total_revenue FROM orders GROUP BY status').all() as any[];

  let totalOrders = 0;
  let totalRevenue = 0;
  const statusCounts: Record<string, number> = {
    'New': 0,
    'Contacted': 0,
    'Dispatched': 0,
    'Delivered': 0,
    'Ghosted / Cancelled': 0,
  };

  for (const row of rows) {
    const count = Number(row.count) || 0;
    const revenue = Number(row.total_revenue) || 0;
    totalOrders += count;
    totalRevenue += revenue;
    if (row.status && statusCounts[row.status] !== undefined) {
      statusCounts[row.status] = count;
    }
  }

  return {
    totalOrders,
    totalRevenue,
    statusCounts,
  };
}
