'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Play, Eye, Share2, Heart, Scale } from 'lucide-react';
import { Lightbox } from '@/components/ui/Lightbox';
import { Button } from '@/components/ui/Button';

interface PropertyGalleryProps {
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  videoUrl,
  virtualTourUrl,
  title
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openLightbox = (index: number) => {
    setInitialIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[420px] sm:h-[500px] rounded-3xl overflow-hidden">
        {/* Main Image */}
        <div
          onClick={() => openLightbox(0)}
          className="relative md:col-span-2 md:row-span-2 h-full cursor-pointer group overflow-hidden"
        >
          <Image
            src={images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#B88746]" />
            <span>Main Entrance View</span>
          </div>
        </div>

        {/* Sub Images */}
        {images.slice(1, 4).map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx + 1)}
            className="relative h-full hidden md:block cursor-pointer group overflow-hidden"
          >
            <Image
              src={img}
              alt={`${title} view ${idx + 2}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
        ))}

        {/* View All Button Thumbnail */}
        {images.length > 4 && (
          <div
            onClick={() => openLightbox(4)}
            className="relative h-full hidden md:block cursor-pointer group overflow-hidden rounded-r-3xl"
          >
            <Image
              src={images[4]}
              alt={`${title} view 5`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
              <Camera className="w-6 h-6 mb-1 text-[#B88746]" />
              <span className="text-sm font-semibold">+{images.length - 4} Photos</span>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => openLightbox(0)}>
            <Camera className="w-4 h-4 mr-1.5 text-[#B88746]" /> View All ({images.length}) Photos
          </Button>

          {videoUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(videoUrl, '_blank')}
            >
              <Play className="w-4 h-4 mr-1.5 text-rose-500" /> Video Tour
            </Button>
          )}

          {virtualTourUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(virtualTourUrl, '_blank')}
            >
              <Eye className="w-4 h-4 mr-1.5 text-[#2D6A5F]" /> 3D Virtual Tour
            </Button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={images}
        initialIndex={initialIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
