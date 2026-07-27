import { Agency } from '@/types/agency';
import { MOCK_AGENCIES } from '../mock/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const agencyAdapter = {
  async getAgencies(): Promise<Agency[]> {
    await delay(150);
    return MOCK_AGENCIES;
  },

  async getAgencyById(idOrSlug: string): Promise<Agency | null> {
    await delay(150);
    return MOCK_AGENCIES.find(a => a.id === idOrSlug || a.slug === idOrSlug) || null;
  }
};
