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
  maxWidth = 'max-w-full lg:max-w-[580px] xl:max-w-[640px]',
  captionLabel = 'Automation Specialist',
  animateDelay = 0.25,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: animateDelay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${maxWidth} ${className} select-none`}
    >
      {/* ── Ambient glow behind the card ─────────────────────────────────── */}
      <div
        className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-[0.18] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, var(--accent-amber) 0%, transparent 70%)',
        }}
      />

      {/* ── Outer decorative border ring ──────────────────────────────────── */}
      <div
        className="absolute -inset-[3px] rounded-[2.25rem] pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-amber) 40%, transparent), transparent 50%, color-mix(in srgb, var(--accent-amber) 15%, transparent))',
          borderRadius: '2.25rem',
        }}
      />

      {/* ── Main card ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 rounded-[2rem] overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          boxShadow: [
            '0 2px 4px rgba(0,0,0,0.06)',
            '0 8px 24px rgba(0,0,0,0.10)',
            '0 32px 64px rgba(0,0,0,0.14)',
            'inset 0 1px 0 rgba(255,255,255,0.08)',
          ].join(', '),
          padding: '0',
        }}
      >
        {/* ── Inner image clip ──────────────────────────────────────────────── */}
        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>

          {/* Subtle dot grid on image bg */}
          <div
            className="absolute inset-0 opacity-[0.06] z-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--text-body) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          {/* Photo with AVIF -> WebP -> PNG fallbacks */}
          <OptimizedImage
            src="/images/home-hero.png"
            alt="Emmanuel Odebiyi — Automation Specialist"
            className="relative z-10 w-full h-full object-cover object-top block"
            fetchPriority="high"
            decoding="async"
          />

          {/* Bottom gradient vignette */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 28%, transparent 55%)',
            }}
          />

          {/* ── Name badge — frosted glass bar ──────────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 z-30 px-6 py-5 rounded-b-[2rem]">
            {/* Frosted glass pill behind the text */}
            <div
              className="absolute inset-0 rounded-b-[1.625rem]"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
              }}
            />

            <div className="relative z-10">
              {/* Amber pill label */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--accent-amber)' }}
                />
                <p
                  className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  {captionLabel}
                </p>
              </div>

              <h3 className="text-xl font-bold tracking-tight font-display" style={{ color: '#ffffff' }}>
                Emmanuel Odebiyi
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* ── Corner accent — thin amber arc top-left ───────────────────────── */}
      <div
        className="absolute top-2 left-2 w-14 h-14 rounded-tl-[1.75rem] pointer-events-none z-20"
        style={{
          border: '1.5px solid color-mix(in srgb, var(--accent-amber) 35%, transparent)',
          borderRight: 'none',
          borderBottom: 'none',
        }}
      />
      {/* Corner accent — thin amber arc bottom-right */}
      <div
        className="absolute bottom-2 right-2 w-14 h-14 rounded-br-[1.75rem] pointer-events-none z-20"
        style={{
          border: '1.5px solid color-mix(in srgb, var(--accent-amber) 35%, transparent)',
          borderLeft: 'none',
          borderTop: 'none',
        }}
      />
    </motion.div>
  );
};

export default HeroPhoto;
