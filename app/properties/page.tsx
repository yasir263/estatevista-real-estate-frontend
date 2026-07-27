'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LayoutGrid, List, Map as MapIcon, SlidersHorizontal, Search } from 'lucide-react';
import { PropertyFilterState, ViewMode, SortOption } from '@/types/filter';
import { PropertyPurpose, PropertyType } from '@/types/property';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { SearchFiltersSidebar } from '@/components/search/SearchFiltersSidebar';
import { MobileFilterDrawer } from '@/components/search/MobileFilterDrawer';
import { ActiveFilterChips } from '@/components/search/ActiveFilterChips';
import { PropertyMap } from '@/components/maps/PropertyMap';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

function PropertySearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<PropertyFilterState>({
    purpose: (searchParams.get('purpose') as PropertyPurpose | 'all') || 'all',
    type: (searchParams.get('type') as PropertyType | 'all') || 'all',
    city: searchParams.get('city') || undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    bedrooms: searchParams.get('bedrooms') || undefined,
    amenities: searchParams.get('amenities') ? searchParams.get('amenities')!.split(',') : [],
    sort: (searchParams.get('sort') as SortOption) || 'featured',
    view: (searchParams.get('view') as ViewMode) || 'grid',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    searchQuery: searchParams.get('q') || undefined
  });

  // Fetch properties when filters change
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const res = await propertyAdapter.getProperties(filters);
      if (isMounted) {
        setProperties(res.properties);
        setTotal(res.total);
        setTotalPages(res.totalPages);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  // Sync state changes with URL query parameters
  const updateFilters = (updated: Partial<PropertyFilterState>) => {
    setLoading(true);
    const nextFilters = { ...filters, ...updated, page: updated.page !== undefined ? updated.page : 1 };
    setFilters(nextFilters);

    const params = new URLSearchParams();
    if (nextFilters.purpose && nextFilters.purpose !== 'all') params.set('purpose', nextFilters.purpose);
    if (nextFilters.type && nextFilters.type !== 'all') params.set('type', nextFilters.type);
    if (nextFilters.city) params.set('city', nextFilters.city);
    if (nextFilters.priceMin) params.set('priceMin', String(nextFilters.priceMin));
    if (nextFilters.priceMax) params.set('priceMax', String(nextFilters.priceMax));
    if (nextFilters.bedrooms) params.set('bedrooms', nextFilters.bedrooms);
    if (nextFilters.sort) params.set('sort', nextFilters.sort);
    if (nextFilters.view) params.set('view', nextFilters.view);
    if (nextFilters.page > 1) params.set('page', String(nextFilters.page));
    if (nextFilters.searchQuery) params.set('q', nextFilters.searchQuery);
    if (nextFilters.amenities && nextFilters.amenities.length > 0) params.set('amenities', nextFilters.amenities.join(','));

    router.replace(`/properties?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setLoading(true);
    const defaultFilters: PropertyFilterState = {
      purpose: 'all',
      type: 'all',
      amenities: [],
      sort: 'featured',
      view: 'grid',
      page: 1
    };
    setFilters(defaultFilters);
    router.replace('/properties', { scroll: false });
  };

  const handleRemoveChip = (key: keyof PropertyFilterState, val?: unknown) => {
    if (key === 'amenities' && typeof val === 'string') {
      updateFilters({ amenities: filters.amenities.filter(a => a !== val) });
    } else {
      updateFilters({ [key]: undefined });
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Luxury Property Directory
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Discover hand-selected architectural residences and premier investment properties worldwide.
        </p>
      </div>

      {/* Top Search Input & Controls Bar */}
      <div className="bg-white rounded-3xl p-4 border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by address, city, or property title..."
            value={filters.searchQuery || ''}
            onChange={(e) => updateFilters({ searchQuery: e.target.value || undefined })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
          />
        </div>

        {/* View Switchers & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Drawer Button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Filters
          </Button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value as SortOption })}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-desc">Newest Listings</option>
              <option value="area-desc">Largest SqFt</option>
            </select>
          </div>

          {/* View Toggles */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => updateFilters({ view: 'grid' })}
              className={`p-2 rounded-lg transition-all ${
                filters.view === 'grid' ? 'bg-white shadow-sm text-[#111827]' : 'text-slate-500 hover:text-black'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateFilters({ view: 'list' })}
              className={`p-2 rounded-lg transition-all ${
                filters.view === 'list' ? 'bg-white shadow-sm text-[#111827]' : 'text-slate-500 hover:text-black'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateFilters({ view: 'map' })}
              className={`p-2 rounded-lg transition-all ${
                filters.view === 'map' ? 'bg-white shadow-sm text-[#111827]' : 'text-slate-500 hover:text-black'
              }`}
              title="Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      <ActiveFilterChips filters={filters} onRemove={handleRemoveChip} onReset={handleReset} />

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block lg:col-span-1">
          <SearchFiltersSidebar filters={filters} onChange={updateFilters} onReset={handleReset} />
        </div>

        {/* Property Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-96 rounded-3xl bg-white p-4 space-y-4 border border-slate-200">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
              <h3 className="text-xl font-serif font-bold text-[#111827]">No Properties Match Criteria</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try clearing active filters or modifying search keywords to explore more listings.
              </p>
              <Button variant="gold" onClick={handleReset}>
                Reset Search Filters
              </Button>
            </div>
          ) : filters.view === 'map' ? (
            <PropertyMap properties={properties} />
          ) : (
            <div
              className={`grid gap-6 ${
                filters.view === 'list'
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} layout={filters.view === 'list' ? 'list' : 'grid'} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateFilters({ page: pageNum })}
                    className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                      filters.page === pageNum
                        ? 'bg-[#111827] text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-[#B88746]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onReset={handleReset}
      />
    </div>
  );
}

export default function PropertySearchPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading properties...</div>}>
      <PropertySearchContent />
    </Suspense>
  );
}
