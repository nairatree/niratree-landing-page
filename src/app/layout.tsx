import type { Metadata, Viewport } from 'next';
import './globals.css';
import MetaPixel from '@/components/MetaPixel';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'NairaTree™ — Handcrafted Bamboo Serving Trays (Set of 3) | Pay on Delivery',
  description:
    'Upgrade your home and host guests in style with NairaTree handcrafted bamboo serving trays. 100% natural, deep spill-proof edges, space-saving 3-in-1 nesting design. Free nationwide delivery across Nigeria + Pay on Delivery.',
  keywords: [
    'bamboo serving trays',
    'nesting trays Nigeria',
    'handcrafted bamboo tray set',
    'wooden serving tray',
    'breakfast in bed tray',
    'ottoman tray Lagos',
    'pay on delivery trays Nigeria',
    'NairaTree',
  ],
  icons: {
    icon: '/images/nairatree-icon.png',
    apple: '/images/nairatree-icon.png',
  },
  openGraph: {
    title: 'NairaTree™ Handcrafted Bamboo Serving Trays (Set of 3)',
    description: '100% Eco-Friendly Natural Bamboo Nesting Trays. Free Nationwide Delivery + Pay on Delivery Available.',
    images: ['/images/nairatree-logo-green.jpg'],
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#143826',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased text-stone-900 bg-cream-100 selection:bg-bamboo-400 selection:text-white">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
