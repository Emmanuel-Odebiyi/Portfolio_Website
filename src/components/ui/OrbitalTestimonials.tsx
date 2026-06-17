import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TestimonialType {
  quote: string;
  name: string;
  title: string;
  image?: string;
  headline?: string;
  rating?: number;
}

interface OrbitalTestimonialsProps {
  testimonials: TestimonialType[];
  autoplayInterval?: number; // ms
  className?: string;
}

export const OrbitalTestimonials: React.FC<OrbitalTestimonialsProps> = ({
  testimonials,
  autoplayInterval = 6000,
  className
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const n = testimonials.length;

  // Auto-rotation hook
  useEffect(() => {
    if (isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % n);
    }, autoplayInterval);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, autoplayInterval, n]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + n) % n);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % n);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, n]);

  return (
    <div
      className={cn("w-full flex flex-col items-center select-none py-12 relative overflow-visible", className)}
    >
      {/* ── Testimonials Deck ── */}
      <div className="w-full relative h-[480px] md:h-[400px] flex items-center justify-center overflow-visible">
        <div className="w-full max-w-5xl h-full relative flex items-center justify-center px-4 overflow-visible">
          {testimonials.map((testimonial, i) => {
            // Calculate index difference in circular list
            let diff = i - activeIndex;
            if (diff < -n / 2) diff += n;
            if (diff > n / 2) diff -= n;

            const absDiff = Math.abs(diff);

            // Hide cards that are beyond 2 steps away
            if (absDiff > 2) return null;

            // Determinisitic placement values based on relative difference
            // Desktop offsets
            let xOffset = diff * 380; // px spacing
            let zIndex = 20 - absDiff;
            let scale = 1 - absDiff * 0.12;
            let rotateY = diff * -15; // 3D-angle rotate

            // Let's create CSS custom variables to apply in clean class names
            const isActive = diff === 0;
            
            // Dim only the inner content of background/inactive cards, keeping their frames solid and opaque (no transparency bleed-through)
            const contentOpacity = isActive ? 1 : (absDiff === 1 ? 0.35 : 0.08);

            return (
              <motion.div
                key={testimonial.name}
                style={{
                  zIndex,
                  perspective: 1000,
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: isActive ? 'var(--border-card)' : 'transparent',
                }}
                animate={{
                  x: xOffset,
                  scale,
                  opacity: 1, // Card container stays 100% solid to block underlying layers
                  rotateY,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                }}
                className={cn(
                  "absolute w-[94vw] sm:w-[620px] md:w-[680px] p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 pointer-events-none flex flex-col justify-between h-[420px] md:h-[340px] shadow-2xl backdrop-blur-sm overflow-hidden",
                  isActive 
                    ? "pointer-events-auto border-zinc-200/60 dark:border-zinc-800/80 shadow-emerald-500/5"
                    : "border-zinc-200/20 dark:border-zinc-800/20 shadow-none cursor-pointer"
                )}
                onClick={() => {
                  if (!isActive) {
                    setDirection(diff > 0 ? 1 : -1);
                    setActiveIndex(i);
                  }
                }}
              >
                <div 
                  className="w-full h-full flex flex-col justify-between transition-opacity duration-300"
                  style={{ opacity: contentOpacity }}
                >
                  {/* Star Ratings & Quote Icon */}
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, sIdx) => {
                        const rating = testimonial.rating || 5;
                        const isFilled = sIdx < rating;
                        return (
                          <Star
                            key={sIdx}
                            className={cn(
                              "w-4 h-4",
                              isFilled ? "fill-amber-500 text-amber-500" : "text-zinc-300 dark:text-zinc-700"
                            )}
                          />
                        );
                      })}
                    </div>
                    <Quote className="w-8 h-8 opacity-10" style={{ color: 'var(--text-body)' }} />
                  </div>

                  {/* Review Copy */}
                  <div className="flex-1 flex flex-col justify-center py-2 overflow-visible mt-2 select-text pointer-events-auto">
                    {testimonial.headline && (
                      <h4 className="font-bold text-base md:text-[17px] tracking-tight mb-2 leading-snug" style={{ color: 'var(--text-body)' }}>
                        "{testimonial.headline}"
                      </h4>
                    )}
                    <p className="text-xs md:text-sm font-light leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="w-11 h-11 rounded-full object-cover border"
                        style={{ borderColor: 'var(--border-card)' }}
                      />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: 'var(--accent-amber)', color: '#fff' }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <h5 className="font-bold text-xs md:text-sm" style={{ color: 'var(--text-body)' }}>
                        {testimonial.name}
                      </h5>
                      <p className="text-[10px] md:text-xs" style={{ color: 'var(--text-muted)' }}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Deck Navigation Controls ── */}
      <div className="flex flex-col items-center gap-6 mt-4 relative z-30">
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeIndex ? "w-6" : "w-2 opacity-30"
                )}
                style={{ backgroundColor: 'var(--text-body)' }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
