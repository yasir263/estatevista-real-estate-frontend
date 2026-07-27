export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
  agentsCount: number;
  totalListingsCount: number;
  rating: number;
  reviewsCount: number;
  establishedYear: number;
  specialties: string[];
}
