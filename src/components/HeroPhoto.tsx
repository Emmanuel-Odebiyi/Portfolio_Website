import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './common/OptimizedImage';

interface HeroPhotoProps {
  className?: string;
  maxWidth?: string;
  captionLabel?: string;
  animateDelay?: number;
  variant?: 'card' | 'cutout';
  imageSrc?: string;
}

/**
 * HeroPhoto — Premium Editorial Portrait Card & Cutout
 *
 * Designed to fit seamlessly within the hero grid without clipping shoulders or top edges.
 */
export const HeroPhoto: React.FC<HeroPhotoProps> = ({
  className = '',
  maxWidth = 'w-full max-w-[500px] lg:max-w-[560px] xl:max-w-[600px]',
  captionLabel = 'Automation Specialist',
  animateDelay = 0.2,
  variant = 'cutout',
  imageSrc,
}) => {
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: animateDelay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full max-w-full lg:max-w-[540px] xl:max-w-[600px] ${className} select-none`}
      >
        <div
          className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-[0.18] pointer-events-none -z-10"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, var(--accent-amber) 0%, transparent 70%)' }}
        />
        <div
          className="relative z-10 rounded-[2rem] overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
            <OptimizedImage
              src={imageSrc || "/images/home-hero.webp"}
              alt="Emmanuel Odebiyi — Automation Specialist"
              className="relative z-10 w-full h-full object-cover object-top block"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Cutout Variant: Fully contained without clipping or awkward overflow ──
  const finalSrc = imageSrc || '/images/emmanuel-cutout-full.webp';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: animateDelay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full flex flex-col items-center lg:items-end justify-end ${maxWidth} ${className} select-none`}
    >
      <div className="relative w-full flex justify-center lg:justify-end items-end overflow-visible">
        <OptimizedImage
          src={finalSrc}
          alt="Emmanuel Odebiyi — Automation Specialist"
          className="relative z-10 w-full h-auto max-h-[580px] lg:max-h-[640px] object-contain object-bottom block pointer-events-none"
          style={{
            filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.18))',
          }}
          fetchPriority="high"
          decoding="async"
        />

        {/* ── Sleek Identity Badge (Theme-Adaptive) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animateDelay + 0.25, duration: 0.65 }}
          className="absolute bottom-4 sm:bottom-6 right-2 sm:right-6 z-20 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border flex items-center gap-3 transition-colors duration-300 shadow-xl"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-card)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-[var(--accent-amber)]">
              {captionLabel}
            </span>
            <span className="text-sm font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Emmanuel Odebiyi
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroPhoto;
