import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, TrendingDown, TrendingUp, Search, FileText, DollarSign, Send, Check } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain-overlay bg-[var(--dark-base)] pt-20 pb-10">

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

      {/* ── Coolshapes decorative background accent ──────────────────────── */}
      <motion.div
        className="absolute top-[10%] right-[5%] pointer-events-none opacity-[0.06] z-0 hidden lg:block"
        style={{ width: 420, height: 420, filter: 'blur(2px)' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {/* Pure SVG star — no third-party dependency */}
        <svg viewBox="0 0 200 200" width={420} height={420} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#heroStar)" fillRule="evenodd" d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z" clipRule="evenodd" />
          <defs>
            <radialGradient id="heroStar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div className="w-full hero-layout-grid flex flex-col lg:grid gap-8 lg:gap-14 items-center">

          {/* ── Left Card: Manual Chaos ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-grid-chaos hidden lg:flex flex-col gap-4 p-5 rounded-[2rem] bg-zinc-950/60 border border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.03)] backdrop-blur-md relative overflow-hidden group hover:border-red-500/20 transition-all duration-500"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-red-500 font-black">Manual Chaos</span>
              </div>
              <span className="text-[9px] font-mono uppercase text-zinc-500">Lagging Behind</span>
            </div>

            {/* Grid Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">Irregular Schedule</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">Missed</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isMissed = [1, 4, 6, 9].includes(i);
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: isMissed ? 1.15 : 1 }}
                      animate={isMissed ? { x: [0, -1, 1, -1, 1, 0] } : {}}
                      transition={isMissed ? { repeat: Infinity, duration: 2, repeatDelay: 3 } : {}}
                      className={`h-8 rounded-lg flex items-center justify-center relative ${
                        isMissed
                          ? 'bg-red-500/20 border border-red-500/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                          : 'bg-zinc-900/50 border border-white/5 text-zinc-600'
                      }`}
                    >
                      {isMissed ? <AlertCircle size={12} className="shrink-0" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">Organic Traffic</span>
                <span className="text-[10px] font-mono text-red-500 font-bold flex items-center gap-1">
                  <TrendingDown size={10} /> Stagnant
                </span>
              </div>
              <div className="h-16 w-full rounded-xl bg-white/5 border border-white/5 p-2 flex items-end relative overflow-hidden">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 10 Q 15 8, 30 18 T 60 15 T 90 28 T 100 32"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0 10 Q 15 8, 30 18 T 60 15 T 90 28 T 100 32 L 100 40 L 0 40 Z"
                    fill="url(#redGrad)"
                  />
                </svg>
                <span className="absolute bottom-2 right-2 text-[8px] font-mono uppercase text-red-400/60 tracking-wider">Alert</span>
              </div>
            </div>
          </motion.div>

          {/* ── Center Content: Headline & Copy ── */}
          <div className="hero-grid-text flex flex-col items-center text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-3 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-white/90"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, #f59e0b, #fbbf24)' }}
              />
              Content Marketing Automation Specialist
            </motion.div>
 
            {/* Headline & Subtitle Container */}
            <div className="mb-5 space-y-3 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.95] text-white"
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
                  className="relative z-10 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight px-8 italic text-zinc-300 leading-snug"
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
              className="mb-5 max-w-3xl mx-auto"
            >
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-zinc-400">
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              {/* Primary — gradient fill */}
              <Link
                to="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] bg-[var(--dark-card)] border border-[var(--dark-border)] !text-white backdrop-blur-md hover:bg-white/10 hover:border-amber-500/50"
              >
                Book a Free Strategy Call
              </Link>
            </motion.div>
 
            {/* Scroll Indicator - positioned absolutely to save vertical flow space */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
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
            className="hero-grid-compound hidden lg:flex flex-col gap-4 p-5 rounded-[2rem] bg-zinc-950/60 border border-emerald-500/10 shadow-[0_20px_50px_rgba(16,185,129,0.03)] backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-emerald-400 font-black">Autopilot</span>
              </div>
              <span className="text-[9px] font-mono uppercase text-zinc-500">Compounding</span>
            </div>

            {/* Grid Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">Structured Engine</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold animate-pulse">Active</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.15, backgroundColor: 'rgba(16,185,129,0.25)' }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                    className="h-8 rounded-lg flex items-center justify-center bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)] cursor-pointer"
                  >
                    <Check size={12} strokeWidth={3} className="shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400">Organic Traffic</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp size={10} /> +520% ROI
                </span>
              </div>
              <div className="h-16 w-full rounded-xl bg-white/5 border border-white/5 p-2 flex items-end relative overflow-hidden">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 35 Q 20 32, 40 22 T 70 12 T 100 2"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0 35 Q 20 32, 40 22 T 70 12 T 100 2 L 100 40 L 0 40 Z"
                    fill="url(#emeraldGrad)"
                  />
                  <motion.circle
                    cx="100"
                    cy="2"
                    r="3"
                    fill="#10b981"
                    animate={{ r: [3, 5, 3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </svg>
                <span className="absolute bottom-2 right-2 text-[8px] font-mono uppercase text-emerald-400 tracking-wider font-bold">12,840 Visits</span>
              </div>
            </div>

            {/* Tiny Toolbar Dock */}
            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-xl py-1.5 px-3">
              {[
                { icon: <Search size={12} />, label: "Search" },
                { icon: <FileText size={12} />, label: "Doc" },
                { icon: <DollarSign size={12} />, label: "Revenue" },
                { icon: <Send size={12} />, label: "Distribute" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors duration-200 cursor-pointer"
                  title={item.label}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
