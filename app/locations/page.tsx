'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { locationAdapter } from '@/services/adapters/locationAdapter';
import { LocationItem } from '@/types/location';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';

export default function LocationsDirectoryPage() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    locationAdapter.getLocations().then(res => {
      setLocations(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Global Destinational Hubs</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Prime Real Estate Markets
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Explore key market indicators, average square foot valuations, and exclusive neighborhood highlights.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading location market guides...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <Link key={loc.id} href={`/locations/${loc.slug}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image src={loc.image} alt={loc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-serif font-bold group-hover:text-[#B88746] transition-colors">
                      {loc.name}
                    </h3>
                    <span className="text-xs text-slate-300 font-light flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B88746]" /> {loc.city}, {loc.country}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{loc.description}</p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Avg $/SqFt: {formatPrice(loc.avgPriceSqFt)}</span>
                    <span className="text-[#B88746] flex items-center gap-1 font-bold">
                      Explore Market <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
