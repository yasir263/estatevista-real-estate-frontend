'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize2, Heart, Scale, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { Property } from '@/types/property';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useCompareStore } from '@/stores/useCompareStore';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'grid' }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isInCompare, addToCompare, removeFromCompare } = useCompareStore();

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#B88746]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge variant={property.purpose === 'rent' ? 'green' : 'gold'}>
              For {property.purpose}
            </Badge>
            {property.isLuxury && <Badge variant="dark">Luxury</Badge>}
          </div>

          {/* Favorite & Compare Overlay Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleCompareClick}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                inCompare ? 'bg-[#B88746] text-white' : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                favorite ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
              }`}
              title="Favorite"
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 text-white text-xs flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B88746]" />
            {property.location.neighborhood}, {property.location.city}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B88746]">
                {property.type}
              </span>
              <span className="text-xs text-slate-400 font-mono">Ref: {property.refCode}</span>
            </div>
            <Link href={`/properties/${property.id}`}>
              <h3 className="text-xl font-serif font-bold text-[#111827] group-hover:text-[#B88746] transition-colors line-clamp-1">
                {property.title}
              </h3>
            </Link>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.features.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span>{property.features.areaSqFt.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Footer Price & Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Price</span>
              <span className="text-2xl font-bold font-serif text-[#111827]">
                {formatPrice(property.price, property.currency, property.period)}
              </span>
            </div>
            <Link
              href={`/properties/${property.id}`}
              className="px-5 py-2.5 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-[#B88746] transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#B88746]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant={property.purpose === 'rent' ? 'green' : 'gold'}>
            For {property.purpose}
          </Badge>
          {property.isLuxury && <Badge variant="dark">Luxury</Badge>}
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleCompareClick}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              inCompare ? 'bg-[#B88746] text-white' : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
            title="Compare Property"
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              favorite ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location Text */}
        <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center gap-1.5 line-clamp-1">
          <MapPin className="w-3.5 h-3.5 text-[#B88746] flex-shrink-0" />
          <span className="truncate">{property.location.address}, {property.location.city}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-sans">
            <span className="font-semibold uppercase tracking-wider text-[#B88746]">{property.type}</span>
            <span>Built {property.features.yearBuilt}</span>
          </div>
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-lg font-serif font-bold text-[#111827] group-hover:text-[#B88746] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-slate-400" />
            <span>{property.features.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-slate-400" />
            <span>{property.features.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span>{property.features.areaSqFt.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Footer Price & Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-sans">Price</span>
            <span className="text-xl font-bold font-serif text-[#111827]">
              {formatPrice(property.price, property.currency, property.period)}
            </span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-semibold hover:bg-[#B88746] transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};
