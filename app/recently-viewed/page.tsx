'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Trash2 } from 'lucide-react';
import { useRecentStore } from '@/stores/useRecentStore';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';

export default function RecentlyViewedPage() {
  const { recentIds, clearRecent } = useRecentStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all(recentIds.map(id => propertyAdapter.getPropertyById(id))).then(res => {
      if (isMounted) {
        setProperties(res.filter((p): p is Property => p !== null));
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [recentIds]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
            Recently Viewed Properties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quickly revisit residences you recently inspected.
          </p>
        </div>
        {properties.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearRecent}>
            <Trash2 className="w-4 h-4 mr-1.5 text-rose-500" /> Clear History
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading recently viewed...</div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
          <History className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#111827]">No Recent Viewing History</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Properties you view will automatically appear here for easy access.
          </p>
          <Link href="/properties">
            <Button variant="gold">Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
