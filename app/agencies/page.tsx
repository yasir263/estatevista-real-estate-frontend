'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, Users, Globe, Phone } from 'lucide-react';
import { agencyAdapter } from '@/services/adapters/agencyAdapter';
import { Agency } from '@/types/agency';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AgenciesDirectoryPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agencyAdapter.getAgencies().then(res => {
      setAgencies(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Global Real Estate Brokerages</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Premier Brokerage Firms
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Discover accredited international agencies with deep regional networks and white-glove service.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading agencies...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agencies.map((agency) => (
            <div key={agency.id} className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all space-y-4">
              <div className="relative h-44 w-full">
                <Image src={agency.coverImage} alt={agency.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl bg-white p-1 shadow-lg overflow-hidden flex-shrink-0">
                    <Image src={agency.logo} alt={agency.name} fill className="object-cover" />
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-serif font-bold">{agency.name}</h3>
                    <span className="text-xs text-slate-300 font-light flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B88746]" /> {agency.city}, {agency.country}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 pt-2">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {agency.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs text-slate-700">
                  <div>
                    <span className="block text-sm font-bold font-serif text-[#111827]">{agency.agentsCount}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Advisors</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold font-serif text-[#111827]">{agency.totalListingsCount}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Listings</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold font-serif text-[#111827]">Est. {agency.establishedYear}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Founded</span>
                  </div>
                </div>

                <Link href={`/agencies/${agency.slug}`}>
                  <Button variant="outline" className="w-full justify-center">
                    View Agency Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
