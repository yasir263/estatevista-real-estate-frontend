'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogAdapter } from '@/services/adapters/blogAdapter';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft } from 'lucide-react';

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogAdapter.getBlogPostBySlug(slug).then(res => {
      setPost(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="pt-32 text-center">Loading article...</div>;
  if (!post) return <div className="pt-32 text-center">Article not found.</div>;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Link href="/blog" className="text-xs font-bold text-[#B88746] hover:underline flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>

      <div className="space-y-4">
        <Badge variant="gold">{post.category}</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono border-y border-slate-200 py-3">
          <span>By {post.author.name} ({post.author.role})</span>
          <span>•</span>
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
      </div>

      <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
        <p className="text-base text-slate-700 font-serif italic border-l-4 border-[#B88746] pl-4 py-1">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-line font-sans text-slate-600 space-y-4">
          {post.content}
        </div>
      </div>
    </div>
  );
}
