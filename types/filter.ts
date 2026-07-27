import { PropertyPurpose, PropertyType, FurnishingStatus, ConstructionStatus } from './property';

export type ViewMode = 'grid' | 'list' | 'map';

export type SortOption = 
  | 'featured' 
  | 'price-asc' 
  | 'price-desc' 
  | 'date-desc' 
  | 'area-desc';

export interface PropertyFilterState {
  country?: string;
  city?: string;
  area?: string;
  neighborhood?: string;
  purpose?: PropertyPurpose | 'all';
  type?: PropertyType | 'all';
  priceMin?: number;
  priceMax?: number;
  bedrooms?: string; // '1', '2', '3', '4', '5+'
  bathrooms?: string;
  areaMin?: number;
  areaMax?: number;
  furnishing?: FurnishingStatus | 'all';
  constructionStatus?: ConstructionStatus | 'all';
  amenities: string[];
  parking?: boolean;
  verified?: boolean;
  featured?: boolean;
  virtualTour?: boolean;
  searchQuery?: string;
  sort: SortOption;
  view: ViewMode;
  page: number;
}
