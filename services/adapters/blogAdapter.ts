import { BlogPost } from '@/types/blog';
import { MOCK_BLOG_POSTS } from '../mock/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const blogAdapter = {
  async getBlogPosts(): Promise<BlogPost[]> {
    await delay(150);
    return MOCK_BLOG_POSTS;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay(150);
    return MOCK_BLOG_POSTS.find(b => b.slug === slug || b.id === slug) || null;
  }
};
