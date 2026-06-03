import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, TrendingDown, TrendingUp, Search, FileText, DollarSign, Send, Check } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen lg:h-screen lg:max-h-screen flex items-center overflow-hidden grain-overlay bg-transparent pt-20 lg:pt-32 pb-8 lg:pb-6">

      {/* ── Subtle Ambient Glow Aurora Orbs (Option B - Adjusted Opacity) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]">
        <div className="aurora-orb-1 absolute rounded-full" style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="aurora-orb-2 absolute rounded-full" style={{ width: '45vw', height: '45vw', maxWidth: 600, maxHeight: 600, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)', filter: 'blur(110px)' }} />
        <div className="aurora-orb-3 absolute rounded-full" style={{ width: '35vw', height: '35vw', maxWidth: 450, maxHeight: 450, top: '20%', right: '15%', background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      </div>

      {/* ── Coolshapes decorative background accent ──────────────────────── */}
      <motion.div
        className="absolute top-[10%] right-[5%] pointer-events-none opacity-[0.06] z-0 hidden lg:block"
        style={{ width: 420, height: 420, filter: 'blur(2px)' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {/* Pure SVG star — no third-party dependency */}
        <svg viewBox="0 0 200 200" width={420} height={420} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#heroStar)" fillRule="evenodd" d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462-30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z" clipRule="evenodd" />
          <defs>
            <radialGradient id="heroStar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative z-10 w-full max-w-[96vw] mx-auto px-6 sm:px-8 flex flex-col items-center">
        <div className="w-full hero-layout-grid flex flex-col lg:grid gap-8 lg:gap-14 items-center">

          {/* ── Left Card: Manual Chaos ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-grid-chaos flex flex-col gap-2.5 p-4 rounded-2xl bg-zinc-950/65 border border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.03)] backdrop-blur-md relative overflow-hidden group hover:border-red-500/20 transition-all duration-500 scale-95 xl:scale-100 w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-red-500 font-black">Manual Grind</span>
              </div>
              <span className="text-[9px] font-mono uppercase text-zinc-500">Time Sunk</span>
            </div>

            {/* Workflow List */}
            <div className="flex flex-col gap-1.5">
              {[
                { task: 'Keyword Research', time: '3 hrs', desc: 'Manual sheets & guesswork' },
                { task: 'Drafting & Editing', time: '5 hrs', desc: 'Staring at blank Google Doc' },
                { task: 'SEO Tagging & Upload', time: '2 hrs', desc: 'Formatting & CMS config' },
                { task: 'Multi-Channel Post', time: '2 hrs', desc: 'Manual copy/paste updates' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-zinc-300">{item.task}</span>
                    <span className="text-[8px] text-zinc-500 leading-tight">{item.desc}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md font-bold shrink-0 ml-2">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Cost Per Article</span>
              <span className="text-sm font-black text-red-500 flex items-center gap-1 font-display">
                12+ Hours
              </span>
            </div>
          </motion.div>

          {/* ── Center Content: Headline & Copy ── */}
          <div className="hero-grid-text flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-2 lg:mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-[11px] lg:text-xs font-mono tracking-[0.22em] uppercase text-white/90"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, #f59e0b, #fbbf24)' }}
              />
              Content Marketing Automation Specialist
            </motion.div>
 
            {/* Headline & Subtitle Container */}
            <div className="mb-4 lg:mb-8 space-y-2 lg:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
                className="font-display text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.02] text-white"
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
                  className="relative z-10 text-base sm:text-xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight px-4 sm:px-6 italic text-zinc-300 leading-snug"
                >
                  While you're still writing one at 11 PM on a Sunday.
                </h2>
              </motion.div>
            </div>
 
            {/* Body Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9 }}
              className="mb-4 lg:mb-10 max-w-3xl mx-auto"
            >
              <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl leading-relaxed text-zinc-400">
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
              className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-sm lg:max-w-none mx-auto mt-6 lg:mt-14"
            >
              {/* Primary — gradient fill */}
              <Link
                to="/portfolio"
                className="group w-full lg:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #f59e0b 100%)',
                  boxShadow: '0 8px 30px rgba(37,99,235,0.35)',
                }}
              >
                See Real Client Results
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary — glass ghost */}
              <Link
                to="/contact"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] bg-[var(--dark-card)] border border-[var(--dark-border)] !text-white backdrop-blur-md hover:bg-white/10 hover:border-amber-500/50"
              >
                Book a Free Strategy Call
              </Link>
            </motion.div>

            {/* Scroll Indicator - positioned absolutely to save vertical flow space */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 scroll-indicator"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full flex justify-center p-1.5 border border-[var(--dark-border)]"
              >
                <div className="w-1 h-1.5 rounded-full bg-amber-500" />
              </motion.div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                scroll
              </span>
            </motion.div>

          </div>

          {/* ── Right Card: Autopilot Compounding ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-grid-compound flex flex-col gap-2.5 p-4 rounded-2xl bg-zinc-950/65 border border-emerald-500/10 shadow-[0_20px_50px_rgba(16,185,129,0.03)] backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 scale-95 xl:scale-100 w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-emerald-400 font-black">Autopilot</span>
              </div>
              <span className="text-[9px] font-mono uppercase text-zinc-500">Active Queue</span>
            </div>

            {/* Workflow List */}
            <div className="flex flex-col gap-1.5">
              {[
                { task: 'Keyword Intel', time: 'Instant', desc: 'Ahrefs API target auto-pull' },
                { task: 'AI Draft Assembly', time: '5 mins', desc: 'Tailored brand-voice engine' },
                { task: 'Automated SEO Audit', time: '2 mins', desc: 'Tag, schema, & links injected' },
                { task: 'One-Click Publish', time: 'Instant', desc: 'n8n webhook triggers live' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-zinc-300">{item.task}</span>
                    <span className="text-[8px] text-zinc-500 leading-tight">{item.desc}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold shrink-0 ml-2">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Review Overhead</span>
              <span className="text-sm font-black text-emerald-400 flex items-center gap-1 font-display">
                20 Mins
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
