'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Heart,
  Scale,
  Share2,
  Mail,
  Check,
  Building
} from 'lucide-react';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { agentAdapter } from '@/services/adapters/agentAdapter';
import { agencyAdapter } from '@/services/adapters/agencyAdapter';
import { Property } from '@/types/property';
import { Agent } from '@/types/agent';
import { Agency } from '@/types/agency';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { FloorPlanViewer } from '@/components/property/FloorPlanViewer';
import { NearbyPlaces } from '@/components/property/NearbyPlaces';
import { MortgageForm } from '@/components/forms/MortgageForm';
import { PropertyInquiryModal } from '@/components/property/PropertyInquiryModal';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useCompareStore } from '@/stores/useCompareStore';
import { useRecentStore } from '@/stores/useRecentStore';

export default function PropertyDetailClient({ id }: { id: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agency, setAgency] = useState<Agency | null>(null);
  const [related, setRelated] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<'inquiry' | 'tour'>('inquiry');

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isInCompare, addToCompare, removeFromCompare } = useCompareStore();
  const { addRecent } = useRecentStore();

  useEffect(() => {
    let isMounted = true;

    async function loadPropertyDetails() {
      const prop = await propertyAdapter.getPropertyById(id);
      if (!isMounted) return;
      if (prop) {
        setProperty(prop);
        addRecent(prop.id);

        const [agentRes, agencyRes, relatedRes] = await Promise.all([
          agentAdapter.getAgentById(prop.agentId),
          agencyAdapter.getAgencyById(prop.agencyId),
          propertyAdapter.getFeaturedProperties(3)
        ]);

        if (isMounted) {
          setAgent(agentRes);
          setAgency(agencyRes);
          setRelated(relatedRes.filter(r => r.id !== prop.id));
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadPropertyDetails();

    return () => {
      isMounted = false;
    };
  }, [id, addRecent]);

  if (loading) {
    return <div className="pt-32 pb-20 text-center text-slate-500">Loading signature property details...</div>;
  }

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold">Property Not Found</h2>
        <Link href="/properties">
          <Button variant="gold">Return to Directory</Button>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const openInquiry = (mode: 'inquiry' | 'tour') => {
    setInquiryMode(mode);
    setInquiryModalOpen(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Info Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={property.purpose === 'rent' ? 'green' : 'gold'}>
                For {property.purpose}
              </Badge>
              <Badge variant="dark">{property.type}</Badge>
              {property.isVerified && (
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Exclusivity
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-[#B88746]" />
              {property.location.address}, {property.location.neighborhood}, {property.location.city}, {property.location.country}
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs text-slate-400 font-mono block">REF ID: {property.refCode}</span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#111827]">
              {formatPrice(property.price, property.currency, property.period)}
            </div>
          </div>
        </div>

        {/* Top Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                favorite ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
              {favorite ? 'Saved to Favorites' : 'Save Property'}
            </button>

            <button
              onClick={() => (inCompare ? removeFromCompare(property.id) : addToCompare(property.id))}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                inCompare ? 'bg-[#B88746]/10 border-[#B88746] text-[#B88746]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4" />
              {inCompare ? 'In Compare Matrix' : 'Compare'}
            </button>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: property.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Gallery Showcase */}
      <PropertyGallery
        images={property.images}
        videoUrl={property.videoTourUrl}
        virtualTourUrl={property.virtualTour3dUrl}
        title={property.title}
      />

      {/* Main Grid: Details Left, Sticky Agent Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column (Content) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs Bar */}
          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <Bed className="w-5 h-5 text-[#B88746] mx-auto" />
              <span className="text-xs text-slate-400 block font-sans">Bedrooms</span>
              <span className="text-lg font-serif font-bold text-slate-900">{property.features.bedrooms}</span>
            </div>
            <div className="space-y-1">
              <Bath className="w-5 h-5 text-[#B88746] mx-auto" />
              <span className="text-xs text-slate-400 block font-sans">Bathrooms</span>
              <span className="text-lg font-serif font-bold text-slate-900">{property.features.bathrooms}</span>
            </div>
            <div className="space-y-1">
              <Maximize2 className="w-5 h-5 text-[#B88746] mx-auto" />
              <span className="text-xs text-slate-400 block font-sans">Area SqFt</span>
              <span className="text-lg font-serif font-bold text-slate-900">{property.features.areaSqFt.toLocaleString()}</span>
            </div>
            <div className="space-y-1">
              <Calendar className="w-5 h-5 text-[#B88746] mx-auto" />
              <span className="text-xs text-slate-400 block font-sans">Year Built</span>
              <span className="text-lg font-serif font-bold text-slate-900">{property.features.yearBuilt}</span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#111827]">Property Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#111827]">Features & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Check className="w-4 h-4 text-[#B88746]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Floor Plans */}
          <FloorPlanViewer floorPlans={property.floorPlans} />

          {/* Walkability & Nearby Places */}
          <NearbyPlaces places={property.nearbyPlaces} />

          {/* Mortgage Estimator Form */}
          <MortgageForm initialPrice={property.price} />
        </div>

        {/* Right Column (Sticky Inquiry Panel) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-lg sticky top-28 space-y-6">
            <h4 className="text-lg font-serif font-bold text-[#111827] border-b border-slate-100 pb-3">
              Private Representation
            </h4>

            {/* Agent Card */}
            {agent && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B88746] flex-shrink-0">
                    <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-[#111827]">{agent.name}</h5>
                    <span className="text-xs text-[#B88746] font-medium block">{agent.title}</span>
                    <span className="text-[10px] text-slate-400">{agent.agencyName}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button variant="gold" className="w-full justify-center py-3" onClick={() => openInquiry('tour')}>
                    Schedule Private Viewing
                  </Button>
                  <Button variant="outline" className="w-full justify-center py-3" onClick={() => openInquiry('inquiry')}>
                    <Mail className="w-4 h-4 mr-2" /> Request Dossier
                  </Button>
                </div>
              </div>
            )}

            {/* Agency Card info */}
            {agency && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#B88746]" />
                  <span className="text-xs font-bold text-slate-800">{agency.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">{agency.description}</p>
                <Link href={`/agencies/${agency.slug}`} className="text-xs text-[#B88746] hover:underline font-semibold block pt-1">
                  View Brokerage Portfolio →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {related.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-200">
          <h3 className="text-2xl font-serif font-bold text-[#111827]">Similar Architectural Residences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <PropertyCard key={r.id} property={r} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <PropertyInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        property={property}
        agent={agent}
        mode={inquiryMode}
      />
    </div>
  );
}
