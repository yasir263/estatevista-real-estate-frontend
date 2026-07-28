import { MOCK_BLOG_POSTS } from '@/services/mock/data';
import BlogArticleClient from './BlogArticleClient';

export function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogArticleClient slug={slug} />;
}
