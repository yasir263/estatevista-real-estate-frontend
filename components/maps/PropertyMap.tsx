'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Navigation, Compass, X, Bed, Bath, Maximize2, ExternalLink } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface PropertyMapProps {
  properties: Property[];
  className?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  className = 'items-start'
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    properties[0] || null
  );

  // Dynamic Lat/Lng centering based on selected pin
  const currentLat = selectedProperty?.location.lat || 40.7128;
  const currentLng = selectedProperty?.location.lng || -74.0060;

  // Convert lat/lng coordinates to pin positions on canvas
  const getCoordinates = (p: Property, idx: number) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5) % 4;
    const left = 18 + (col * 16) + (idx % 3) * 3;
    const top = 20 + (row * 17) + (idx % 2) * 4;
    return { left: `${Math.min(85, Math.max(12, left))}%`, top: `${Math.min(80, Math.max(15, top))}%` };
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 relative ${className}`}>
      {/* Left Column: Scrollable List of All Properties (5 cols) */}
      <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center justify-between px-1">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Properties ({properties.length})
          </h5>
          <span className="text-xs text-[#B88746] font-semibold">Click any card to center map</span>
        </div>

        {properties.map((p) => {
          const isSelected = selectedProperty?.id === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedProperty(p)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 bg-white ${
                isSelected
                  ? 'border-[#B88746] shadow-lg bg-[#B88746]/10 scale-[1.01]'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                <div className="absolute top-1 left-1">
                  <Badge variant={p.purpose === 'rent' ? 'green' : 'gold'} className="text-[9px] px-1.5 py-0">
                    {p.purpose}
                  </Badge>
                </div>
              </div>
              <div className="flex-1 overflow-hidden space-y-1">
                <h6 className="text-xs font-serif font-bold text-[#111827] truncate">{p.title}</h6>
                <span className="text-[11px] text-slate-500 block truncate">{p.location.address}, {p.location.city}</span>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-xs font-bold text-[#B88746]">
                    {formatPrice(p.price, p.currency, p.period)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.features.bedrooms}B / {p.features.bathrooms}Ba</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Sticky Live Map Canvas with Sleek Map Pins & Property Popover Card (7 cols) */}
      <div className="lg:col-span-7 sticky top-28 space-y-4">
        <div className="relative w-full h-[650px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
          {/* Dynamic Live OpenStreetMap Tiles Layer that shifts when selected pin changes */}
          <iframe
            key={`${currentLat}-${currentLng}`}
            title="OpenStreetMap Live Interactive Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLng - 0.04}%2C${currentLat - 0.03}%2C${currentLng + 0.04}%2C${currentLat + 0.03}&layer=mapnik&marker=${currentLat}%2C${currentLng}`}
            className="w-full h-full filter brightness-95 contrast-105 pointer-events-auto transition-all duration-700"
          />

          {/* Map Header Tracker Label */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0B1220]/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs shadow-lg">
            <Compass className="w-4 h-4 text-[#B88746] animate-spin-slow" />
            <span className="font-semibold">Live GPS Tracker</span>
          </div>

          {/* Minimal Sleek Vector Map Pins Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {properties.map((p, idx) => {
              const isSelected = selectedProperty?.id === p.id;
              const pos = getCoordinates(p, idx);

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProperty(p)}
                  style={{ position: 'absolute', left: pos.left, top: pos.top }}
                  className={`transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-all duration-300 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                  title={p.title}
                >
                  <div
                    className={`rounded-full shadow-2xl transition-all flex items-center justify-center ${
                      isSelected
                        ? 'w-10 h-10 bg-[#B88746] text-white border-2 border-white ring-4 ring-[#B88746]/50 animate-bounce'
                        : 'w-8 h-8 bg-[#111827] text-[#B88746] border-2 border-white/80 hover:bg-[#B88746] hover:text-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Selected Property Details Popover Box */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/95 backdrop-blur-xl rounded-2xl p-4 border-2 border-[#B88746] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={selectedProperty.images[0]} alt={selectedProperty.title} fill className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B88746] block">
                    {selectedProperty.type} • {selectedProperty.location.city}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#111827] line-clamp-1">
                    {selectedProperty.title}
                  </h4>
                  <span className="text-xs font-bold text-[#111827]">
                    {formatPrice(selectedProperty.price, selectedProperty.currency, selectedProperty.period)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/properties/${selectedProperty.id}`}
                  className="px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-[#B88746] transition-colors flex items-center gap-1"
                >
                  View Residence <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="p-2 text-slate-400 hover:text-black rounded-full hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
