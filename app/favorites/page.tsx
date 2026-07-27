'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all(favoriteIds.map(id => propertyAdapter.getPropertyById(id))).then(res => {
      if (isMounted) {
        setProperties(res.filter((p): p is Property => p !== null));
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [favoriteIds]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
            Saved Favorites ({favoriteIds.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your personal shortlist of preferred luxury residences.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading favorites...</div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#111827]">No Favorites Saved Yet</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Click the heart icon on any property card to save it to your private list.
          </p>
          <Link href="/properties">
            <Button variant="gold">Explore Properties</Button>
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
