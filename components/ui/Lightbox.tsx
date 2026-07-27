'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between items-center p-4 sm:p-8 select-none"
      >
        <div className="w-full flex justify-between items-center text-white z-10">
          <span className="text-sm font-medium tracking-widest text-slate-300">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-3 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`Property view ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto p-2 max-w-xl custom-scrollbar z-10">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                idx === currentIndex ? 'border-[#B88746] scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <Image src={img} alt="thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
