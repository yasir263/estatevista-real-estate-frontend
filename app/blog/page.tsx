'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogAdapter } from '@/services/adapters/blogAdapter';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogAdapter.getBlogPosts().then(res => {
      setPosts(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Architectural & Market Journal</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Editorial Journal
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          In-depth architectural analysis, global market indexes, and wealth management strategies.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{post.publishedAt} • {post.readTimeMinutes} min read</span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-serif font-bold text-[#111827] hover:text-[#B88746] transition-colors mt-1 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[#111827] hover:text-[#B88746] flex items-center gap-1 pt-2">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
