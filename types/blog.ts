export type BlogCategory = 
  | 'Market Insights' 
  | 'Architecture & Design' 
  | 'Buying Guide' 
  | 'Investment Advice' 
  | 'Luxury Living';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
}
