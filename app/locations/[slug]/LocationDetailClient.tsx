'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { locationAdapter } from '@/services/adapters/locationAdapter';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { LocationItem } from '@/types/location';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';

export default function LocationDetailClient({ slug }: { slug: string }) {
  const [locationItem, setLocationItem] = useState<LocationItem | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    locationAdapter.getLocationBySlug(slug).then(async (loc) => {
      if (isMounted && loc) {
        setLocationItem(loc);
        const res = await propertyAdapter.getProperties({ city: loc.city });
        if (isMounted) {
          setProperties(res.properties);
          setLoading(false);
        }
      } else {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) return <div className="pt-32 text-center">Loading location analytics...</div>;
  if (!locationItem) return <div className="pt-32 text-center">Location market guide not found.</div>;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-white/10">
        <Image src={locationItem.image} alt={locationItem.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
          <Badge variant="gold">{locationItem.popularFor}</Badge>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold">{locationItem.name}</h1>
          <p className="text-sm text-slate-300 max-w-2xl">{locationItem.description}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-2xl font-serif font-bold text-[#111827]">{properties.length}</span>
          <span className="text-xs text-slate-400 block font-sans">Active Listings</span>
        </div>
        <div>
          <span className="text-2xl font-serif font-bold text-[#B88746]">{formatPrice(locationItem.avgPriceSqFt)}</span>
          <span className="text-xs text-slate-400 block font-sans">Avg Price / SqFt</span>
        </div>
        <div>
          <span className="text-2xl font-serif font-bold text-emerald-600">+8.4%</span>
          <span className="text-xs text-slate-400 block font-sans">YoY Capital Growth</span>
        </div>
        <div>
          <span className="text-2xl font-serif font-bold text-[#111827]">{locationItem.country}</span>
          <span className="text-xs text-slate-400 block font-sans">Jurisdiction</span>
        </div>
      </div>

      {/* Neighborhood Highlights */}
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#111827]">Neighborhood Highlights</h3>
        <div className="flex flex-wrap gap-2">
          {locationItem.highlights.map((h, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200">
              ✨ {h}
            </span>
          ))}
        </div>
      </div>

      {/* Available Properties in this location */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-[#111827]">
          Residences Available in {locationItem.name} ({properties.length})
        </h3>
        {properties.length === 0 ? (
          <p className="text-slate-500 text-sm">No active listings in this location currently.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
