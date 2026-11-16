'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Download,
  Search,
  MessageCircle,
  Trash2,
  RefreshCw,
  TrendingUp,
  PackageCheck,
  Truck,
  Users,
  CheckCircle2,
  AlertCircle,
  Home,
  Clock,
  Filter,
} from 'lucide-react';
import { OrderRecord, OrderStatus } from '@/lib/types';
import { buildAdminChatWhatsAppUrl, formatNaira } from '@/lib/whatsapp';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [stats, setStats] = useState<{
    totalOrders: number;
    totalRevenue: number;
    statusCounts: Record<string, number>;
  }>({
    totalOrders: 0,
    totalRevenue: 0,
    statusCounts: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check stored PIN
  useEffect(() => {
    const savedPin = sessionStorage.getItem('niratree_admin_pin');
    if (savedPin) {
      setPin(savedPin);
      validateAndFetch(savedPin);
    }
  }, []);

  const validateAndFetch = async (adminPin: string) => {
    setIsLoading(true);
    setPinError('');
    try {
      const res = await fetch(`/api/orders?pin=${encodeURIComponent(adminPin)}`);
      if (res.status === 401) {
        setPinError('Incorrect PIN. Please try again.');
        setIsAuthenticated(false);
        sessionStorage.removeItem('niratree_admin_pin');
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to load orders');
      }

      const data = await res.json();
      setOrders(data.orders || []);
      setTotalOrders(data.total || 0);
      setStats(data.stats || { totalOrders: 0, totalRevenue: 0, statusCounts: {} });
      setIsAuthenticated(true);
      sessionStorage.setItem('niratree_admin_pin', adminPin);
    } catch (err: any) {
      setPinError(err.message || 'Error connecting to database');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredOrders = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        pin,
        status: selectedStatus,
        search: searchQuery,
      });
      const res = await fetch(`/api/orders?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setTotalOrders(data.total || 0);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, pin, selectedStatus, searchQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        fetchFilteredOrders();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fetchFilteredOrders, isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setPinError('Please enter the Admin PIN');
      return;
    }
    validateAndFetch(pin);
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Status update failed');

      // Update state locally
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setActionMessage({ type: 'success', text: `Order #${orderId} marked as ${newStatus}` });
      setTimeout(() => setActionMessage(null), 3500);

      // Refresh stats
      fetchFilteredOrders();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Could not update status' });
      setTimeout(() => setActionMessage(null), 3500);
    }
  };

  const handleDelete = async (orderId: number, orderNumber: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete order ${orderNumber}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': pin,
        },
      });

      if (!res.ok) throw new Error('Failed to delete order');

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setActionMessage({ type: 'success', text: `Order ${orderNumber} deleted successfully` });
      setTimeout(() => setActionMessage(null), 3500);
      fetchFilteredOrders();
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Delete failed' });
      setTimeout(() => setActionMessage(null), 3500);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Dispatched':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Ghosted / Cancelled':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  // If Not Authenticated: Render PIN Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-forest-800 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 text-amber-400 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-forest-950 mb-1">
            NairaTree CRM Access
          </h1>
          <p className="text-xs text-stone-500 mb-6">
            Enter your secret Admin PIN to view and manage customer orders.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (e.g. 2026)"
              className="w-full text-center tracking-widest text-xl font-bold py-3.5 px-4 rounded-xl border border-stone-300 focus:border-forest-800 focus:ring-2 focus:ring-forest-800/20 outline-none"
            />

            {pinError && (
              <div className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {pinError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold rounded-xl shadow-md transition-all"
            >
              {isLoading ? 'Verifying...' : 'Unlock CRM Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-stone-700 flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" /> Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated CRM Dashboard
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-forest-950 text-white px-4 sm:px-8 py-4 border-b border-forest-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/nairatree-logo-white.png"
              alt="NairaTree"
              width={140}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <div className="border-l border-forest-700 pl-3">
              <h1 className="font-display font-black text-sm tracking-tight text-white flex items-center gap-2">
                <span>Orders CRM</span>
                <span className="bg-brand/20 text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand/40">
                  LIVE DB
                </span>
              </h1>
              <p className="text-[10px] text-stone-400">
                SQLite database sync &amp; WhatsApp customer management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href={`/api/orders/export?pin=${encodeURIComponent(pin)}`}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-50 text-xs font-bold transition-all border border-forest-700 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={fetchFilteredOrders}
              className="p-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-stone-300 hover:text-white transition-all border border-forest-700"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-stone-300 hover:text-white px-3 py-2 rounded-xl bg-stone-800/40 hover:bg-stone-800 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Storefront
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem('niratree_admin_pin');
                setIsAuthenticated(false);
              }}
              className="text-xs text-rose-400 hover:text-rose-300 px-3 py-2"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1 space-y-8">
        {/* Action Flash Message */}
        {actionMessage && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in duration-200 ${
              actionMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
              <Users className="w-4 h-4 text-forest-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-forest-950">
              {stats.totalOrders}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Direct orders submitted</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Pipeline Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              {formatNaira(stats.totalRevenue || 0)}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Pending &amp; delivered POD</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">New Action Needed</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {stats.statusCounts['New'] || 0}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Awaiting WhatsApp reach-out</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Delivered</span>
              <PackageCheck className="w-4 h-4 text-forest-800" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-forest-900">
              {stats.statusCounts['Delivered'] || 0}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              Dispatched: {stats.statusCounts['Dispatched'] || 0}
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'New', 'Contacted', 'Dispatched', 'Delivered', 'Ghosted / Cancelled'].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedStatus === status
                      ? 'bg-forest-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {status === 'all' ? `All (${totalOrders})` : status}
                </button>
              )
            )}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, state..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-forest-700 bg-stone-50/50"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-stone-100/80 text-[11px] uppercase tracking-wider text-stone-600 font-extrabold border-b border-stone-200">
                  <th className="p-4">Order ID &amp; Time</th>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Package &amp; Style</th>
                  <th className="p-4">Delivery Address</th>
                  <th className="p-4">Total (POD)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-stone-400">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-forest-800" />
                          <span>Loading orders...</span>
                        </div>
                      ) : (
                        'No orders found matching the filter criteria.'
                      )}
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const chatUrl = buildAdminChatWhatsAppUrl(order);
                    const formattedDate = new Date(order.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                        {/* Order ID & Time */}
                        <td className="p-4 align-top">
                          <div className="font-mono font-bold text-forest-950 text-xs">
                            {order.order_number}
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5">{formattedDate}</div>
                        </td>

                        {/* Customer Info */}
                        <td className="p-4 align-top">
                          <div className="font-bold text-stone-900">{order.full_name}</div>
                          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                            {order.whatsapp_phone}
                          </div>
                          {order.alt_phone && (
                            <div className="text-[10px] text-stone-400">Alt: {order.alt_phone}</div>
                          )}
                        </td>

                        {/* Package & Style */}
                        <td className="p-4 align-top">
                          <div className="font-semibold text-stone-900">{order.package_name}</div>
                          <div className="text-[11px] text-bamboo-600 font-medium">
                            {order.tray_style_name}
                          </div>
                          {order.preferred_date && (
                            <div className="text-[10px] text-stone-400 mt-1">
                              Req: {order.preferred_date}
                            </div>
                          )}
                        </td>

                        {/* Delivery Address & State */}
                        <td className="p-4 align-top max-w-xs">
                          <div className="text-stone-800 text-xs leading-relaxed">
                            {order.delivery_address}
                          </div>
                          <div className="text-[11px] font-bold text-forest-900 mt-1">
                            {order.city ? `${order.city}, ` : ''}
                            {order.state} State
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="p-4 align-top whitespace-nowrap">
                          <div className="font-black text-cta text-sm">
                            {formatNaira(order.total_price)}
                          </div>
                          <div className="text-[10px] text-stone-400">Pay on Delivery</div>
                        </td>

                        {/* Status Badge & Dropdown */}
                        <td className="p-4 align-top whitespace-nowrap">
                          <div className="space-y-1.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>

                            <div>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(order.id!, e.target.value as OrderStatus)
                                }
                                className="text-[11px] bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 outline-none cursor-pointer focus:border-forest-700 font-medium"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Ghosted / Cancelled">Ghosted / Cancelled</option>
                              </select>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp Chat Button */}
                            <a
                              href={chatUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm transition-all"
                              title="Chat Customer on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(order.id!, order.order_number)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
