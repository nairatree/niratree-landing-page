'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  subtitle?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate) {
        onNavigate((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft' && onNavigate) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images[currentIndex]) return null;

  const current = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate((currentIndex + 1) % images.length);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
    >
      {/* Top Controls Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex items-center justify-between text-white py-2 px-1 z-10"
      >
        <div className="min-w-0 pr-4">
          <h3 className="font-bold text-sm sm:text-base text-cream-50 truncate">
            {current.title}
          </h3>
          {current.subtitle && (
            <p className="text-[11px] sm:text-xs text-amber-300 truncate">
              {current.subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-stone-400 bg-white/10 px-2.5 py-1 rounded-full font-mono">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all shadow-lg border border-white/20"
            aria-label="Close full view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Full Image View (100% Uncropped) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex-1 w-full max-w-4xl flex items-center justify-center my-2 sm:my-4"
      >
        {/* Navigation Previous */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Full Uncropped Image */}
        <div className="relative w-full h-[70vh] sm:h-[75vh] flex items-center justify-center">
          <Image
            src={current.src}
            alt={current.title}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 95vw, 850px"
          />
        </div>

        {/* Navigation Next */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-white flex items-center justify-center border border-white/20 shadow-xl transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Hint */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md flex flex-col items-center gap-2 z-10"
      >
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={img.src}
                onClick={() => onNavigate && onNavigate(idx)}
                className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === idx
                    ? 'border-cta scale-105 shadow-md ring-2 ring-cta/40'
                    : 'border-white/30 opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img.src} alt={img.title} fill className="object-cover" sizes="60px" />
              </button>
            ))}
          </div>
        )}

        <div className="text-[11px] text-stone-400 text-center">
          Tap outside or press <span className="text-white font-semibold">✕</span> to close full view
        </div>
      </div>
    </div>
  );
}
