'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, Trash2, X, Check } from 'lucide-react';
import { useCompareStore } from '@/stores/useCompareStore';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all(compareIds.map(id => propertyAdapter.getPropertyById(id))).then(res => {
      if (isMounted) {
        setProperties(res.filter((p): p is Property => p !== null));
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [compareIds]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
            Property Comparison Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare specifications, amenities, and price metrics side-by-side (up to 4 properties).
          </p>
        </div>
        {properties.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearCompare}>
            <Trash2 className="w-4 h-4 mr-1.5 text-rose-500" /> Clear Comparison Matrix
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading comparison grid...</div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
          <Scale className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#111827]">No Properties Selected for Comparison</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Click the scale icon on any property card to compare features side-by-side.
          </p>
          <Link href="/properties">
            <Button variant="gold">Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar bg-white rounded-3xl border border-[#E5E7EB] shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 w-48 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50">
                  Feature / Spec
                </th>
                {properties.map((p) => (
                  <th key={p.id} className="p-4 w-64 align-top">
                    <div className="relative space-y-2">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-2 -right-2 p-1 text-slate-400 hover:text-rose-500 rounded-full hover:bg-slate-100"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="relative h-32 w-full rounded-2xl overflow-hidden">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <Link href={`/properties/${p.id}`}>
                        <h4 className="text-sm font-serif font-bold text-[#111827] hover:text-[#B88746] line-clamp-1">
                          {p.title}
                        </h4>
                      </Link>
                      <span className="text-base font-bold text-[#B88746] block">
                        {formatPrice(p.price, p.currency, p.period)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              <tr>
                <td className="p-4 font-bold bg-slate-50">Location City</td>
                {properties.map(p => <td key={p.id} className="p-4">{p.location.city}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Property Type</td>
                {properties.map(p => <td key={p.id} className="p-4 capitalize">{p.type}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Bedrooms</td>
                {properties.map(p => <td key={p.id} className="p-4 font-bold">{p.features.bedrooms} Beds</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Bathrooms</td>
                {properties.map(p => <td key={p.id} className="p-4 font-bold">{p.features.bathrooms} Baths</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Area SqFt</td>
                {properties.map(p => <td key={p.id} className="p-4 font-mono">{p.features.areaSqFt.toLocaleString()} sqft</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Furnishing</td>
                {properties.map(p => <td key={p.id} className="p-4 capitalize">{p.features.furnishing}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Status</td>
                {properties.map(p => <td key={p.id} className="p-4 capitalize">{p.features.constructionStatus}</td>)}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Infinity Pool</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4">
                    {p.amenities.includes('Infinity Pool') ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-slate-300" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-50">Action</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4">
                    <Link href={`/properties/${p.id}`}>
                      <Button variant="gold" size="sm" className="w-full justify-center">
                        View Details
                      </Button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
