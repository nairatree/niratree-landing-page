# NiraTree™ — Premium Handcrafted Bamboo Serving Trays Storefront & Order Funnel

A high-converting, mobile-responsive e-commerce landing page and qualified direct-response order funnel for **NiraTree**, selling Handcrafted Bamboo Serving Trays (Set of 3 Nesting Trays).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and high-performance **SQLite**.

---

## 🌟 Key Features

1. **High-Converting Advertorial Landing Page:**
   - Modeled on proven direct-response conversion funnels.
   - Warm, earthy luxury design aesthetic matching bamboo (`#FAF7F2` cream background, rich forest green `#0F261B`, and high-contrast `#E25822` CTA buttons).
   - Sticky urgency announcement bar with live countdown and scarcity badge.
   - Star ratings proof (4.9/5 from 1,450+ verified Nigerian homes).
   - Agitation section highlighting pain points of cheap plastic & rusting metal.
   - Direct comparison matrix: *NiraTree Bamboo vs Cheap Plastic vs Heavy Metal*.
   - Interactive 3 Design Styles gallery with high-res real product imagery:
     - **Style A: Classic Rectangular** (Beveled edges, cut-out handles)
     - **Style B: Modern Rounded-Corner** (Smooth rounded edges)
     - **Style C: Elegant Oval** (Curved sleek silhouette, raised rim)
   - Multi-purpose lifestyle showcase (Breakfast in bed, Ottoman organizer, VIP cocktail hosting, Charcuterie & suya platter).
   - Bundle package pricing cards (Single Set, Double Set - Best Value, Complete Trio).
   - Authentic WhatsApp customer review cards with verified buyer tags.
   - Accordion FAQ answering key buyer objections.
   - Sticky bottom mobile CTA bar for high mobile conversion rate.

2. **Pre-Qualification Order Form & Dual-Action Funnel:**
   - **Strict Financial Readiness Filter:** Prominently eliminates ghosters and time-wasters.
   - Real-time Nigerian state dropdown & active WhatsApp phone validation.
   - **Action A (Instant DB Save):** Every order is immediately written to local SQLite database (`./data/orders.db`). No lost leads even if customers close their tab before chatting.
   - **Action B (Meta Pixel Tracking):** Automatically fires `Lead` and `Purchase` events.
   - **Action C (WhatsApp Direct Redirect):** Opens WhatsApp with a pre-filled, formatted order summary for instant rider scheduling.

3. **Admin Orders CRM Dashboard (`/admin`):**
   - Protected with an Admin PIN (default: `2026`).
   - Live KPI metric cards: Total Orders, Pipeline Revenue, Action Needed, Delivered counts.
   - Full order table with search by customer name, phone, or state, plus status filter tabs.
   - One-click **"Chat Customer on WhatsApp"** button.
   - Real-time order status update dropdown: `New` | `Contacted` | `Dispatched` | `Delivered` | `Ghosted / Cancelled`.
   - One-click **CSV Export** button for dispatch riders and spreadsheets.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js v18+ (tested on Node v24)
- npm or pnpm

### 2. Environment Configuration
Create or edit `.env.local`:

```env
# WhatsApp Business Phone Number (Format: 234 followed by number without leading zero)
NEXT_PUBLIC_WHATSAPP_PHONE=2348012345678

# Meta / Facebook Pixel ID (leave blank to run silently without errors)
NEXT_PUBLIC_META_PIXEL_ID=

# Admin CRM Dashboard Access PIN
ADMIN_SECRET_PIN=2026

# SQLite Database Location
DATABASE_FILE=./data/orders.db
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the landing page.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the CRM Dashboard (PIN: `2026`).

### 4. Run Automated Tests
```bash
npm test
```
Runs the full automated test suite verifying SQLite persistence, WhatsApp URL encoding, order status lifecycle, search filters, and CSV export.

---

## 📦 Production Deployment Guide

When you are ready to launch on your custom domain:

### Option 1: Vercel / Railway / Render
- Connect your GitHub repository.
- Set your environment variables (`NEXT_PUBLIC_WHATSAPP_PHONE`, `ADMIN_SECRET_PIN`, etc.) in the dashboard.
- On persistent platforms (like Railway, VPS, or DigitalOcean), attach a persistent disk volume for `./data/orders.db` so orders persist across restarts.
- Alternatively, connect to an external hosted database (e.g. Supabase, Turso, or Neon) with zero code changes needed.

### Option 2: Self-Hosted VPS / Ubuntu Server with PM2 & Nginx
```bash
npm run build
pm2 start npm --name "niratree" -- start
```
Configure Nginx as a reverse proxy pointing to `http://127.0.0.1:3000` with an SSL certificate from Let's Encrypt.
