'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Heart, Scale, User, Menu, X, PlusCircle, Calculator, Search } from 'lucide-react';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useCompareStore } from '@/stores/useCompareStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const compareIds = useCompareStore((state) => state.compareIds);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Luxury', href: '/properties/luxury' },
    { name: 'New Developments', href: '/properties/new-developments' },
    { name: 'Agents', href: '/agents' },
    { name: 'Locations', href: '/locations' },
    { name: 'Calculator', href: '/mortgage-calculator' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1220]/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3 text-white'
          : 'bg-gradient-to-b from-[#0B1220]/90 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#B88746] flex items-center justify-center text-white shadow-md shadow-[#B88746]/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-white group-hover:text-[#B88746] transition-colors">
                ESTATE<span className="text-[#B88746]">VISTA</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-300 font-sans -mt-1">
                Luxury Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#B88746] ${
                    isActive ? 'text-[#B88746] font-semibold' : 'text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Compare Badge Link */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
              title="Compare Properties"
            >
              <Scale className="w-5 h-5" />
              {compareIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B88746] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareIds.length}
                </span>
              )}
            </Link>

            {/* Favorites Badge Link */}
            <Link
              href="/favorites"
              className="relative p-2.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </Link>

            {/* Dashboard / Login */}
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#B88746] flex items-center justify-center text-[10px] font-bold">
                  {user?.name.charAt(0)}
                </div>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <User className="w-4 h-4 mr-1.5" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Submit Property CTA */}
            <Link href="/submit-property">
              <Button variant="gold" size="sm">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Submit Property
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/favorites" className="relative p-2 text-white">
              <Heart className="w-6 h-6" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1220] border-b border-white/10 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-[#B88746] rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm text-slate-200 py-2">
              <Scale className="w-4 h-4 text-[#B88746]" /> Compare Properties ({compareIds.length})
            </Link>
            <Link href="/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm text-slate-200 py-2">
              <Heart className="w-4 h-4 text-rose-400" /> Favorites ({favoriteIds.length})
            </Link>
            <Link href="/submit-property" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="gold" className="w-full justify-center mt-2">
                <PlusCircle className="w-4 h-4 mr-2" /> Submit Property
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
