'use client';

import React, { useEffect, useState } from 'react';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Badge } from '@/components/ui/Badge';

export default function LuxuryPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyAdapter.getLuxuryProperties(12).then(res => {
      setProperties(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="dark">Ultra Luxury Portfolio</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Signature Luxury Residences
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Architectural landmarks, cliffside glass villas, and ultra-high net worth estates.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading luxury properties...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
