export interface LocationItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  image: string;
  description: string;
  propertiesCount: number;
  avgPriceSqFt: number;
  highlights: string[];
  popularFor: string;
}
