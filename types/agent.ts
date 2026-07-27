export interface AgentReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp?: string;
  image: string;
  agencyId: string;
  agencyName: string;
  specialization: string[];
  languages: string[];
  experienceYears: number;
  activeListingsCount: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  reviews?: AgentReview[];
}
