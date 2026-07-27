import { LocationItem } from '@/types/location';
import { MOCK_LOCATIONS } from '../mock/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const locationAdapter = {
  async getLocations(): Promise<LocationItem[]> {
    await delay(150);
    return MOCK_LOCATIONS;
  },

  async getLocationBySlug(slug: string): Promise<LocationItem | null> {
    await delay(150);
    return MOCK_LOCATIONS.find(l => l.slug === slug || l.id === slug) || null;
  }
};
