'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Building2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Key,
  Users,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PropertyCard } from '@/components/property/PropertyCard';
import { MOCK_PROPERTIES, MOCK_LOCATIONS, MOCK_AGENTS, MOCK_BLOG_POSTS } from '@/services/mock/data';

export default function Homepage() {
  const [activeTab, setActiveTab] = useState<'sale' | 'rent' | 'luxury'>('sale');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('all');

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.isFeatured).slice(0, 6);
  const luxuryProperties = MOCK_PROPERTIES.filter(p => p.isLuxury).slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] bg-[#0B1220] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden">
        {/* Background Image Overlay with Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
            alt="EstateVista Hero Architecture"
            fill
            className="object-cover opacity-35 filter brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B88746] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Signature Private Listings
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
              Architectural <br />
              <span className="gold-gradient-text">Masterpieces</span> & Luxury Estates
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
              Curated access to extraordinary residences, off-market penthouses, and private coastal compounds in global capitals.
            </p>
          </motion.div>

          {/* Animated Hero Search Bar Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/40 text-slate-900 max-w-4xl"
          >
            {/* Search Purpose Tabs */}
            <div className="flex gap-2 mb-4 border-b border-slate-200 pb-3">
              {(['sale', 'rent', 'luxury'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all ${
                    activeTab === tab
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'text-slate-600 hover:text-black hover:bg-slate-100'
                  }`}
                >
                  {tab === 'sale' ? 'For Sale' : tab === 'rent' ? 'For Rent' : 'Luxury Estates'}
                </button>
              ))}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Location / City
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
                  <MapPin className="w-4 h-4 text-[#B88746]" />
                  <input
                    type="text"
                    placeholder="Manhattan, Miami, London..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Property Category
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
                  <Building2 className="w-4 h-4 text-[#B88746]" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="villa">Luxury Villa</option>
                    <option value="apartment">Modern Apartment</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
              </div>

              <div className="pt-5">
                <Link href={`/properties?purpose=${activeTab}&city=${searchLocation}&type=${searchType}`}>
                  <Button variant="gold" className="w-full justify-center py-3 text-sm">
                    <Search className="w-4 h-4 mr-2" /> Search Properties
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Stats Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 text-white">
          <div>
            <span className="text-3xl lg:text-4xl font-serif font-bold text-[#B88746]">$4.2B+</span>
            <p className="text-xs text-slate-400 font-light mt-1">Transaction Portfolio</p>
          </div>
          <div>
            <span className="text-3xl lg:text-4xl font-serif font-bold text-[#B88746]">180+</span>
            <p className="text-xs text-slate-400 font-light mt-1">Off-Market Exclusives</p>
          </div>
          <div>
            <span className="text-3xl lg:text-4xl font-serif font-bold text-[#B88746]">99.4%</span>
            <p className="text-xs text-slate-400 font-light mt-1">Client Satisfaction Rate</p>
          </div>
          <div>
            <span className="text-3xl lg:text-4xl font-serif font-bold text-[#B88746]">12</span>
            <p className="text-xs text-slate-400 font-light mt-1">Global Metropolitan Capitals</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <Badge variant="gold" className="mb-2">Exclusive Collection</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827]">
              Featured Residences
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Hand-picked architectural properties exhibiting unmatched design credentials.
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline">
              View All Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* Luxury Collection Banner */}
      <section className="bg-[#0B1220] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <Badge variant="gold">Ultra Luxury</Badge>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold">
              The Sovereign <span className="gold-gradient-text">Penthouse</span> Series
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Elevated sky mansions situated atop premier high-rise towers featuring private helipads, 360° horizon views, and white-glove concierge management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {luxuryProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Prime Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <Badge variant="green" className="mb-2">Prime Hubs</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111827]">
              Explore Key Destinations
            </h2>
          </div>
          <Link href="/locations" className="text-sm font-semibold text-[#B88746] hover:underline flex items-center gap-1">
            All Destinations <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MOCK_LOCATIONS.map((loc) => (
            <Link key={loc.id} href={`/locations/${loc.slug}`} className="group">
              <div className="relative h-72 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-lg font-serif font-bold group-hover:text-[#B88746] transition-colors">
                    {loc.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-light">{loc.propertiesCount} Exclusives</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trusted Agents Spotlight */}
      <section className="bg-white py-16 border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="gold">Expert Advisory</Badge>
            <h2 className="text-3xl font-serif font-bold text-[#111827]">Meet Our Private Advisors</h2>
            <p className="text-sm text-slate-500">World-class real estate leaders dedicated to discreet representation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_AGENTS.slice(0, 4).map((agent) => (
              <div key={agent.id} className="bg-[#F7F7F5] rounded-3xl p-6 text-center space-y-4 border border-slate-200 hover:shadow-lg transition-all">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-[#B88746]">
                  <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#111827]">{agent.name}</h4>
                  <span className="text-xs text-[#B88746] font-semibold">{agent.title}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{agent.bio}</p>
                <Link href={`/agents/${agent.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Contact Advisor
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Journal / Blog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <Badge variant="dark" className="mb-2">Editorial Journal</Badge>
            <h2 className="text-3xl font-serif font-bold text-[#111827]">Market Insights & Architecture</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-[#B88746] hover:underline flex items-center gap-1">
            Read All Articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative h-48 w-full">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{post.publishedAt} • {post.readTimeMinutes} min read</span>
                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="text-lg font-serif font-bold text-[#111827] hover:text-[#B88746] transition-colors mt-1 line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{post.excerpt}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[#111827] hover:text-[#B88746] flex items-center gap-1 pt-2">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1220] rounded-3xl p-10 lg:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Badge variant="gold">Private Advisory</Badge>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold">
              Looking to Buy or Sell a Signature Property?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Schedule a confidential consultation with our principal advisors today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button variant="gold" size="lg">
                  Request Confidential Consultation
                </Button>
              </Link>
              <Link href="/submit-property">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  List Your Property Exclusively
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
