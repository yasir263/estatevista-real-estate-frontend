'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Building } from 'lucide-react';
import { agencyAdapter } from '@/services/adapters/agencyAdapter';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Agency } from '@/types/agency';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AgencyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const agencySlug = resolvedParams.id;

  const [agency, setAgency] = useState<Agency | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    agencyAdapter.getAgencyById(agencySlug).then(async (res) => {
      if (isMounted && res) {
        setAgency(res);
        const props = await propertyAdapter.getPropertiesByAgency(res.id);
        if (isMounted) {
          setProperties(props);
          setLoading(false);
        }
      } else {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [agencySlug]);

  if (loading) return <div className="pt-32 text-center">Loading agency profile...</div>;
  if (!agency) return <div className="pt-32 text-center">Agency not found.</div>;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#E5E7EB]">
        <Image src={agency.coverImage} alt={agency.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl bg-white p-1 overflow-hidden flex-shrink-0 shadow-xl">
              <Image src={agency.logo} alt={agency.name} fill className="object-cover" />
            </div>
            <div>
              <Badge variant="gold">Est. {agency.establishedYear}</Badge>
              <h1 className="text-3xl font-serif font-bold mt-1">{agency.name}</h1>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B88746]" /> {agency.address}, {agency.city}, {agency.country}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${agency.phone}`}>
              <Button variant="gold" size="sm"><Phone className="w-4 h-4 mr-1.5" /> Call Firm</Button>
            </a>
            <a href={agency.website} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Globe className="w-4 h-4 mr-1.5" /> Website
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#111827]">About {agency.name}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{agency.description}</p>
      </div>

      {/* Agency Exclusives */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-[#111827]">
          Properties Represented by {agency.name} ({properties.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
