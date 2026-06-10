import React from 'react';
import { motion } from 'framer-motion';

interface HeroPhotoProps {
  /** Additional Tailwind classes for the outer wrapper (e.g. column span). */
  className?: string;
  /** Tailwind max-width class. Defaults to 'max-w-[540px]'. */
  maxWidth?: string;
  /** Role/label shown below the name overlay. Defaults to 'Automation Specialist'. */
  captionLabel?: string;
  /** Framer Motion entrance animation delay in seconds. Defaults to 0.25. */
  animateDelay?: number;
}

/**
 * HeroPhoto — Canonical portrait block.
 *
 * Single source of truth for Emmanuel's headshot across all pages.
 * All visual decisions (image path, grayscale hover, card frame, name overlay)
 * live here so any future change propagates site-wide automatically.
 */
export const HeroPhoto: React.FC<HeroPhotoProps> = ({
  className = '',
  maxWidth = 'max-w-[540px]',
  captionLabel = 'Automation Specialist',
  animateDelay = 0.25,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animateDelay, duration: 0.8 }}
      className={`relative p-3 rounded-[2rem] w-full ${maxWidth} shadow-xl ${className}`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-card)',
      }}
    >
      {/* Inner clip container — maintains the rounded photo corners */}
      <div className="relative w-full rounded-[1.75rem] overflow-hidden bg-zinc-200">
        <img
          src="/images/home-hero.png"
          alt="Emmanuel Odebiyi — Automation Specialist"
          className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Name / role label */}
        <div className="absolute bottom-6 left-6 right-6 text-left">
          <p className="text-xs font-mono tracking-widest text-white/70 uppercase">
            {captionLabel}
          </p>
          <h3 className="text-xl font-bold text-white font-display mt-1">
            Emmanuel Odebiyi
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroPhoto;
