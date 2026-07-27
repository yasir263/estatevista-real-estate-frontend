'use client';

import React, { useEffect, useState } from 'react';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Badge } from '@/components/ui/Badge';

export default function PropertiesForRentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyAdapter.getProperties({ purpose: 'rent' }).then(res => {
      setProperties(res.properties);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="green">Exclusive Lease Collection</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Properties For Rent
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          High-end long term luxury leases, serviced penthouses, and private estates.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading properties...</div>
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
