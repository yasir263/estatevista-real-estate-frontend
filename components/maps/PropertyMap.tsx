'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Navigation, Compass, Layers, X, Bed, Bath, Maximize2, ExternalLink } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface PropertyMapProps {
  properties: Property[];
  className?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  className = 'min-h-[650px]'
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    properties[0] || null
  );
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');

  // Convert lat/lng coordinates to relative percentages on canvas
  const getCoordinates = (p: Property, idx: number) => {
    // Map bounds simulation
    const col = idx % 5;
    const row = Math.floor(idx / 5) % 4;

    // Distribute pins evenly across percentage canvas with coordinate offsets
    const left = 12 + (col * 18) + (idx % 3) * 4;
    const top = 15 + (row * 20) + (idx % 2) * 6;

    return { left: `${Math.min(85, Math.max(10, left))}%`, top: `${Math.min(80, Math.max(12, top))}%` };
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      {/* Left Column: Property List / Selected Card Details (5 cols) */}
      <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
        {selectedProperty && (
          <div className="bg-white rounded-3xl p-5 border-2 border-[#B88746] shadow-xl space-y-4 relative animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-[#B88746] font-bold">
              <span>Selected Map Pin</span>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-slate-400 hover:text-black p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant={selectedProperty.purpose === 'rent' ? 'green' : 'gold'}>
                  For {selectedProperty.purpose}
                </Badge>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-[#B88746]">
                {selectedProperty.type} • {selectedProperty.location.city}
              </span>
              <h4 className="text-lg font-serif font-bold text-[#111827] line-clamp-1">
                {selectedProperty.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {selectedProperty.location.address}
              </p>
            </div>

            <div className="flex items-center justify-between py-2 border-y border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-slate-400" /> {selectedProperty.features.bedrooms} Beds</div>
              <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-slate-400" /> {selectedProperty.features.bathrooms} Baths</div>
              <div className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {selectedProperty.features.areaSqFt.toLocaleString()} sqft</div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xl font-serif font-bold text-[#111827]">
                {formatPrice(selectedProperty.price, selectedProperty.currency, selectedProperty.period)}
              </span>
              <Link
                href={`/properties/${selectedProperty.id}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-[#B88746] transition-colors"
              >
                Inspect Residence <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Scrollable list of properties */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
            Properties on Map ({properties.length})
          </h5>
          {properties.map((p) => {
            const isSelected = selectedProperty?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProperty(p)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 bg-white ${
                  isSelected ? 'border-[#B88746] shadow-md bg-[#B88746]/5' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h6 className="text-xs font-serif font-bold text-[#111827] truncate">{p.title}</h6>
                  <span className="text-[11px] text-slate-500 block truncate">{p.location.address}, {p.location.city}</span>
                  <span className="text-xs font-bold text-[#B88746]">
                    {formatPrice(p.price, p.currency, p.period)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Interactive Map Canvas (7 cols) */}
      <div className={`lg:col-span-7 relative w-full h-[650px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg transition-all ${
        mapStyle === 'satellite' ? 'bg-[#05111a]' : 'bg-[#0B1220]'
      }`}>
        {/* Map Grid / Satellite texture simulation */}
        <div className={`absolute inset-0 transition-opacity ${
          mapStyle === 'satellite'
            ? 'bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] opacity-30 [background-size:20px_20px]'
            : 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-50 [background-size:16px_16px]'
        }`} />

        {/* Map Header Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="bg-[#0B1220]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#B88746]" />
            <span className="font-semibold">Architectural Map Engine</span>
          </div>

          <div className="flex bg-[#0B1220]/80 backdrop-blur-md border border-white/10 p-1 rounded-full text-xs">
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-3 py-1 rounded-full transition-all ${
                mapStyle === 'dark' ? 'bg-[#B88746] text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Dark Map
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1 rounded-full transition-all ${
                mapStyle === 'satellite' ? 'bg-[#B88746] text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Satellite Hybrid
            </button>
          </div>
        </div>

        {/* Interactive Map Pin Badges */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {properties.map((p, idx) => {
            const isSelected = selectedProperty?.id === p.id;
            const pos = getCoordinates(p, idx);

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProperty(p)}
                style={{ position: 'absolute', left: pos.left, top: pos.top }}
                className={`transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-full font-serif text-xs font-bold shadow-2xl border transition-all flex items-center gap-1.5 select-none ${
                    isSelected
                      ? 'bg-[#B88746] text-white border-white ring-4 ring-[#B88746]/40'
                      : 'bg-[#111827]/90 backdrop-blur-md text-slate-100 border-white/20 hover:border-[#B88746] hover:bg-[#0B1220]'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#B88746]'}`} />
                  <span>{formatPrice(p.price, p.currency, p.period)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-[#0B1220]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full text-slate-300 text-xs">
          <span className="flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#B88746]" /> Click pins to inspect property cards
          </span>
          <span className="font-mono text-[#B88746] font-bold">
            {properties.length} Active Pins
          </span>
        </div>
      </div>
    </div>
  );
};
