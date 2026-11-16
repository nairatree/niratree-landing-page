export type TrayStyleId = 'rectangular' | 'oval' | 'rounded' | 'combo';

export type PackageId = 'package_1' | 'package_2' | 'package_3';

export type OrderStatus = 'New' | 'Contacted' | 'Dispatched' | 'Delivered' | 'Ghosted / Cancelled';

export interface TrayStyleOption {
  id: TrayStyleId;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  price: number;
  originalPrice: number;
}

export interface PricingPackageOption {
  id: PackageId;
  name: string;
  badge?: string;
  isPopular?: boolean;
  trayCount: number;
  originalPrice: number;
  price: number;
  savings: number;
  styleId?: TrayStyleId;
  description: string;
  features: string[];
}

export interface OrderRecord {
  id?: number;
  order_number: string;
  created_at: string;
  full_name: string;
  whatsapp_phone: string;
  alt_phone?: string;
  email?: string;
  delivery_address: string;
  state: string;
  city?: string;
  package_id: PackageId;
  package_name: string;
  tray_style: TrayStyleId;
  tray_style_name: string;
  total_price: number;
  preferred_date?: string;
  special_instructions?: string;
  status: OrderStatus;
  notes?: string;
}

export interface OrderSubmissionPayload {
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
