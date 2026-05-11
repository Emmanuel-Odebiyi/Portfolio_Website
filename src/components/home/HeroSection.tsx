import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden grain-overlay"
             style={{ backgroundColor: '#0a0f1e' }}>

      {/* ── Aurora Orbs ─────────────────────────────────────────────────────── */}
      {/* Blue orb — left/center */}
      <div
        className="aurora-orb-1 absolute pointer-events-none rounded-full"
        style={{
          width: '65vw',
          height: '65vw',
          maxWidth: 900,
          maxHeight: 900,
          top: '5%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.38) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Amber/Gold orb — right/top */}
      <div
        className="aurora-orb-2 absolute pointer-events-none rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: 700,
          maxHeight: 700,
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Teal orb — bottom/center */}
      <div
        className="aurora-orb-3 absolute pointer-events-none rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: 600,
          maxHeight: 600,
          bottom: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(5,150,105,0.20) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-8 flex flex-col items-center">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-xs font-mono tracking-[0.22em] uppercase text-white/90"
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'radial-gradient(circle, #f59e0b, #fbbf24)' }}
            />
            Content Marketing Automation Specialist
          </motion.div>

          {/* Headline */}
          <div className="mb-8 space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.02] text-white"
            >
              Your Competitors Are{' '}
              <br />
              <span
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 45%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Publishing 40+ Articles.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 1.1 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
              </div>
              <h2
                className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight px-8 italic"
                style={{ color: 'rgba(226,232,240,0.95)' }}
              >
                While you're still writing one at 11 PM on a Sunday.
              </h2>
            </motion.div>
          </div>

          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(226,232,240,0.9)' }}>
              I build{' '}
              <span
                style={{
                  display: 'inline',
                  background: 'linear-gradient(to right, #60a5fa, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600,
                }}
              >
                automated content marketing systems
              </span>{' '}
              for growing businesses — so you can{' '}
              <strong className="font-bold text-white">publish consistently</strong>,{' '}
              <strong className="font-bold text-white">rank higher</strong>, and{' '}
              <strong className="font-bold text-white">generate revenue</strong> without hiring a team or burning out trying.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary — gradient fill */}
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #f59e0b 100%)',
                boxShadow: '0 8px 30px rgba(37,99,235,0.35)',
              }}
            >
              See Real Client Results
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary — glass ghost */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Book a Free Strategy Call
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full flex justify-center p-2"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div className="w-1 h-2 rounded-full" style={{ background: '#f59e0b' }} />
            </motion.div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: 'rgba(226,232,240,0.6)' }}>
              scroll
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
