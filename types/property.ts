export type PropertyPurpose = 'sale' | 'rent';

export type PropertyType = 
  | 'villa' 
  | 'apartment' 
  | 'penthouse' 
  | 'townhouse' 
  | 'commercial' 
  | 'land' 
  | 'new-development';

export type FurnishingStatus = 'furnished' | 'semi-furnished' | 'unfurnished';

export type ConstructionStatus = 'ready-to-move' | 'under-construction' | 'off-plan';

export interface FloorPlan {
  id: string;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
}

export interface PriceHistoryItem {
  date: string;
  price: number;
  event: 'Listed' | 'Price Change' | 'Pending' | 'Sold';
}

export interface NearbyPlace {
  name: string;
  category: 'School' | 'Hospital' | 'Shopping' | 'Transit' | 'Dining' | 'Park';
  distance: string; // e.g. "0.4 miles"
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  price: number;
  currency: string;
  period?: 'month' | 'year'; // for rent
  location: {
    address: string;
    neighborhood: string;
    city: string;
    area: string;
    country: string;
    lat: number;
    lng: number;
    zipCode?: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    yearBuilt: number;
    garageSpaces: number;
    furnishing: FurnishingStatus;
    constructionStatus: ConstructionStatus;
  };
  amenities: string[];
  images: string[];
  videoTourUrl?: string;
  virtualTour3dUrl?: string;
  isFeatured: boolean;
  isVerified: boolean;
  isLuxury: boolean;
  isCommercial: boolean;
  isNewDevelopment: boolean;
  completionYear?: number;
  developerName?: string;
  agentId: string;
  agencyId: string;
  createdAt: string;
  viewsCount: number;
  refCode: string;
  floorPlans?: FloorPlan[];
  priceHistory?: PriceHistoryItem[];
  nearbyPlaces?: NearbyPlace[];
}
