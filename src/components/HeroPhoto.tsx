import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './common/OptimizedImage';

interface HeroPhotoProps {
  className?: string;
  maxWidth?: string;
  captionLabel?: string;
  animateDelay?: number;
}

/**
 * HeroPhoto — Premium Editorial Portrait Card
 *
 * A beautifully crafted card frame for the hero portrait.
 * Features a layered glassmorphism border, subtle inner glow,
 * a decorative grid accent, floating spark ornaments, and a
 * frosted-glass name badge at the bottom. The image fills the
 * card from edge to edge with a soft gradient vignette.
 */
export const HeroPhoto: React.FC<HeroPhotoProps> = ({
  className = '',
  maxWidth = 'w-full lg:w-[125%] xl:w-[135%] max-w-none',
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
        className={`relative w-full max-w-full lg:max-w-[640px] xl:max-w-[720px] ${className} select-none`}
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

  // ── Leo Adam Template Aesthetic: Full-shoulder, edge-anchored transparent cutout ──
  const finalSrc = imageSrc || '/images/emmanuel-cutout-full.webp';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: animateDelay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full flex flex-col items-center lg:items-start justify-end ${maxWidth} ${className} select-none`}
    >
      {/* ── Main Subject Cutout: Full natural shoulders with soft feathered dissolves ── */}
      <div className="relative w-full flex justify-center lg:justify-start items-end overflow-visible">
        <OptimizedImage
          src={finalSrc}
          alt="Emmanuel Odebiyi — Automation Specialist"
          className="relative z-10 w-[620px] sm:w-[720px] md:w-[800px] lg:w-[880px] xl:w-[960px] 2xl:w-[1020px] max-w-none h-auto object-contain object-bottom block pointer-events-none lg:-ml-16 xl:-ml-24"
          style={{
            filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.18))',
          }}
          fetchPriority="high"
          decoding="async"
        />

        {/* ── Sleek Glass Identity Badge (Grounded at the base) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animateDelay + 0.3, duration: 0.7 }}
          className="absolute bottom-8 lg:bottom-10 right-4 lg:right-12 z-20 px-5 py-2.5 rounded-2xl backdrop-blur-xl border flex items-center gap-3 shadow-2xl"
          style={{
            backgroundColor: 'rgba(14, 28, 42, 0.86)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-[var(--accent-amber)]">
              {captionLabel}
            </span>
            <span className="text-sm font-bold tracking-tight text-white font-display">
              Emmanuel Odebiyi
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroPhoto;
