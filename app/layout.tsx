import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'EstateVista | Signature Luxury Real Estate & Architectural Homes',
    template: '%s | EstateVista Luxury Real Estate'
  },
  description: 'Explore premier luxury penthouses, architectural villas, and off-market estates worldwide. Built for discerning global buyers and investors.',
  keywords: ['luxury real estate', 'penthouses', 'villas', 'estates', 'architectural homes', 'property for sale'],
  openGraph: {
    title: 'EstateVista | Signature Luxury Real Estate',
    description: 'Explore premier luxury penthouses, architectural villas, and off-market estates worldwide.',
    type: 'website',
    url: 'https://estatevista.example.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F7F7F5] text-[#111827]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
