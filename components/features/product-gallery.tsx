'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Expand, ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const currentImage = images[selectedIndex] || images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85';

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col space-y-4">
      {/* Main High-Res Canvas */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#EFECE6] overflow-hidden group border border-[#E5E2DB]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage}
              alt={`${title} - View ${selectedIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gallery Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 hover:bg-[#111111] text-[#FAFAFA] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 hover:bg-[#111111] text-[#FAFAFA] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 p-2.5 bg-[#FAF9F6]/90 hover:bg-[#FAF9F6] text-[#111111] text-xs font-medium tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-sm border border-[#E5E2DB] transition-opacity duration-300 opacity-80 hover:opacity-100"
        >
          <Expand className="w-3.5 h-3.5" /> View Detail
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                'relative aspect-square overflow-hidden bg-[#EFECE6] border transition-all duration-200',
                selectedIndex === idx
                  ? 'border-[#111111] ring-1 ring-[#111111]'
                  : 'border-[#E5E2DB] opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-12 cursor-zoom-out"
        >
          <div className="relative w-full max-w-5xl h-full max-h-[85vh]">
            <Image
              src={currentImage}
              alt={`${title} Fullscreen`}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-[#FAFAFA] text-xs tracking-[0.2em] uppercase py-2 px-4 border border-[#444444] hover:border-[#FAFAFA] transition-colors"
          >
            Close View [ESC]
          </button>
        </div>
      )}
    </div>
  );
}
