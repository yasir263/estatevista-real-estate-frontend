'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Send, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Footer = () => {
  return (
    <footer className="bg-[#0B1220] text-slate-300 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#B88746] flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                ESTATE<span className="text-[#B88746]">VISTA</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              EstateVista represents the pinnacle of global luxury real estate, connecting high-net-worth buyers with signature architectural residences, off-market penthouses, and private estates.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B88746] hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B88746] hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#B88746] hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#B88746] pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/properties" className="hover:text-[#B88746] transition-colors">All Properties</Link></li>
              <li><Link href="/properties/luxury" className="hover:text-[#B88746] transition-colors">Luxury Collection</Link></li>
              <li><Link href="/properties/new-developments" className="hover:text-[#B88746] transition-colors">New Developments</Link></li>
              <li><Link href="/agents" className="hover:text-[#B88746] transition-colors">Agents Directory</Link></li>
              <li><Link href="/agencies" className="hover:text-[#B88746] transition-colors">Agencies</Link></li>
              <li><Link href="/locations" className="hover:text-[#B88746] transition-colors">Locations</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#B88746] pl-2">
              Services & Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/mortgage-calculator" className="hover:text-[#B88746] transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/compare" className="hover:text-[#B88746] transition-colors">Property Comparison</Link></li>
              <li><Link href="/submit-property" className="hover:text-[#B88746] transition-colors">Submit Property</Link></li>
              <li><Link href="/services" className="hover:text-[#B88746] transition-colors">Buyer & Seller Services</Link></li>
              <li><Link href="/pricing" className="hover:text-[#B88746] transition-colors">Listing Packages</Link></li>
              <li><Link href="/blog" className="hover:text-[#B88746] transition-colors">Editorial Journal</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-[#B88746] pl-2">
              Private Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive confidential updates on new off-market listings and quarterly market reports.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B88746]"
                />
              </div>
              <Button variant="gold" size="sm" className="w-full justify-center">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EstateVista Real Estate Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#B88746] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#B88746] transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-[#B88746] transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-[#B88746] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
