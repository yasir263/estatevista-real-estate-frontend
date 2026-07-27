import { Property } from '@/types/property';
import { PropertyFilterState } from '@/types/filter';
import { MOCK_PROPERTIES } from '../mock/data';

// Helper for simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyAdapter = {
  async getProperties(filters?: Partial<PropertyFilterState>): Promise<{
    properties: Property[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await delay(250); // Simulate network latency

    let result = [...MOCK_PROPERTIES];

    if (filters) {
      if (filters.purpose && filters.purpose !== 'all') {
        result = result.filter(p => p.purpose === filters.purpose);
      }

      if (filters.type && filters.type !== 'all') {
        result = result.filter(p => p.type === filters.type);
      }

      if (filters.city) {
        result = result.filter(p => p.location.city.toLowerCase() === filters.city?.toLowerCase());
      }

      if (filters.country) {
        result = result.filter(p => p.location.country.toLowerCase() === filters.country?.toLowerCase());
      }

      if (filters.priceMin !== undefined) {
        result = result.filter(p => p.price >= (filters.priceMin || 0));
      }

      if (filters.priceMax !== undefined) {
        result = result.filter(p => p.price <= (filters.priceMax || Infinity));
      }

      if (filters.bedrooms && filters.bedrooms !== 'all') {
        const minBeds = parseInt(filters.bedrooms);
        result = result.filter(p => p.features.bedrooms >= minBeds);
      }

      if (filters.bathrooms && filters.bathrooms !== 'all') {
        const minBaths = parseInt(filters.bathrooms);
        result = result.filter(p => p.features.bathrooms >= minBaths);
      }

      if (filters.furnishing && filters.furnishing !== 'all') {
        result = result.filter(p => p.features.furnishing === filters.furnishing);
      }

      if (filters.constructionStatus && filters.constructionStatus !== 'all') {
        result = result.filter(p => p.features.constructionStatus === filters.constructionStatus);
      }

      if (filters.verified) {
        result = result.filter(p => p.isVerified);
      }

      if (filters.featured) {
        result = result.filter(p => p.isFeatured);
      }

      if (filters.virtualTour) {
        result = result.filter(p => Boolean(p.virtualTour3dUrl));
      }

      if (filters.amenities && filters.amenities.length > 0) {
        result = result.filter(p =>
          filters.amenities!.every(a => p.amenities.includes(a))
        );
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        result = result.filter(
          p =>
            p.title.toLowerCase().includes(q) ||
            p.location.address.toLowerCase().includes(q) ||
            p.location.city.toLowerCase().includes(q) ||
            p.location.neighborhood.toLowerCase().includes(q)
        );
      }

      // Sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'date-desc':
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'area-desc':
            result.sort((a, b) => b.features.areaSqFt - a.features.areaSqFt);
            break;
          case 'featured':
          default:
            result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
            break;
        }
      }
    }

    const page = filters?.page || 1;
    const pageSize = 12;
    const total = result.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = result.slice((page - 1) * pageSize, page * pageSize);

    return {
      properties: paginated,
      total,
      page,
      totalPages
    };
  },

  async getPropertyById(id: string): Promise<Property | null> {
    await delay(150);
    return MOCK_PROPERTIES.find(p => p.id === id || p.slug === id) || null;
  },

  async getFeaturedProperties(limit = 6): Promise<Property[]> {
    await delay(150);
    return MOCK_PROPERTIES.filter(p => p.isFeatured).slice(0, limit);
  },

  async getLuxuryProperties(limit = 6): Promise<Property[]> {
    await delay(150);
    return MOCK_PROPERTIES.filter(p => p.isLuxury).slice(0, limit);
  },

  async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    await delay(150);
    return MOCK_PROPERTIES.filter(p => p.agentId === agentId);
  },

  async getPropertiesByAgency(agencyId: string): Promise<Property[]> {
    await delay(150);
    return MOCK_PROPERTIES.filter(p => p.agencyId === agencyId);
  }
};
