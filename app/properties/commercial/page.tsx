'use client';

import React, { useEffect, useState } from 'react';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Badge } from '@/components/ui/Badge';

export default function CommercialPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyAdapter.getProperties({ type: 'commercial' }).then(res => {
      setProperties(res.properties);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Commercial Assets</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Commercial Real Estate
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Prime retail flagships, office towers, and mixed-use commercial developments.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading commercial properties...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No commercial listings found.</div>
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
