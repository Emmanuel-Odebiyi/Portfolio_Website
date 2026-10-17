import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Mail,
  MessageSquare,
  BookOpen,
  Target,
  Sparkles,
  Workflow,
  Search,
  CheckCircle2,
  Globe,
  Clock,
  TrendingUp,
  ShieldCheck,
  Zap,
  MapPin,
  Cpu,
  Layers
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { NumberTicker } from '../components/NumberTicker';
import { OrbitalTestimonials } from '../components/ui/OrbitalTestimonials';
import { OptimizedImage } from '../components/common/OptimizedImage';

/* Animation variants */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px" },
  transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] as [number, number, number, number] },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * 0.1 },
});

export default function About() {
  return (
    <div className="pt-0 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="About Emmanuel Odebiyi | Content Marketing Automation Specialist"
        description="Systems architect and senior content strategist building autonomous marketing engines that deliver 520% ROI. Executive profile, methodology, and verified results."
        keywords="marketing automation specialist, content automation architect, AI content systems, SEO strategist Nigeria, Emmanuel Odebiyi"
      />
      
      {/* ═══════════════════════════════════════════
           01. EXECUTIVE HERO (EDITORIAL SPLIT STAGE)
         ═══════════════════════════════════════════ */}
      <section 
        className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden border-b"
        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
      >
        {/* Subtle background ambient texture */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, var(--text-body) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Executive Identity & Positioning */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
              
              {/* Executive Status Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-wider shadow-sm"
                style={{ 
                  backgroundColor: 'var(--bg-surface)', 
                  borderColor: 'var(--border-card)', 
                  color: 'var(--text-muted)' 
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Custom Automations</span>
              </motion.div>

              {/* Master Editorial Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] font-display"
                style={{ color: 'var(--text-body)' }}
              >
                Engineering Content Systems That Turn Chaos into{' '}
                <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
                  Compounding Revenue.
                </span>
              </motion.h1>

              {/* Concise Positioning Copy (Non-Sprawling) */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[var(--text-muted)] max-w-2xl font-sans"
              >
                I am Emmanuel Odebiyi, a systems architect and content strategist. I bridge high-intent editorial authority with programmatic workflows built on n8n, Make, and Zapier to help B2B tech companies scale organic traffic without team burnout.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
              >
                <Link 
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:scale-105 active:scale-95"
                  style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
                >
                  Book Strategy Call <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide border transition-all shadow-sm hover:bg-zinc-500/10"
                  style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
                >
                  View Audited Work
                </Link>
              </motion.div>

              {/* Live Operational Telemetry Strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="pt-6 w-full border-t flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-sans font-semibold text-[var(--text-muted)]"
                style={{ borderColor: 'var(--border-card)' }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--accent-amber)]" />
                  <span>Operating from Lagos, Nigeria (WAT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-[var(--cta-blue)]" />
                  <span>Serving US, UK, Europe & Africa</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[var(--accent-teal)]" />
                  <span>520% ROI Audited in Production</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Refined Editorial Portrait Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="lg:col-span-5 relative w-full flex justify-center lg:justify-end"
            >
              {/* Soft Ambient Radial Glow */}
              <div 
                className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-25 dark:opacity-15 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--accent-amber) 0%, transparent 70%)' }}
              />

              {/* Framed Editorial Card */}
              <div 
                className="relative w-full max-w-[440px] rounded-[2rem] overflow-hidden border shadow-2xl backdrop-blur-sm"
                style={{ 
                  backgroundColor: 'var(--bg-surface)', 
                  borderColor: 'var(--border-card)' 
                }}
              >
                {/* Header Tag in Card */}
                <div 
                  className="px-6 py-4 border-b flex items-center justify-between"
                  style={{ borderColor: 'var(--border-card)', backgroundColor: 'color-mix(in srgb, var(--bg-surface-alt) 50%, transparent)' }}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    PORTFOLIO ARCHIVE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[11px] font-bold font-sans text-emerald-600 dark:text-emerald-400">Systems Active</span>
                  </div>
                </div>

                {/* Portrait Image with soft natural dissolve */}
                <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
                  <OptimizedImage
                    src="/images/about-hero.webp"
                    alt="Emmanuel Odebiyi | Content Marketing Automation Specialist"
                    className="w-full h-full object-cover object-top block transition-transform duration-700 hover:scale-105"
                    fetchPriority="high"
                  />
                  {/* Subtle bottom gradient inside card */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, var(--bg-surface) 10%, transparent 100%)'
                    }}
                  />
                </div>

                {/* Card Footer: Executive Identity Badge */}
                <div className="p-6 space-y-2 text-left relative z-10" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>
                        Emmanuel Odebiyi
                      </h3>
                      <p className="text-xs font-sans font-semibold text-[var(--accent-amber)]">
                        Systems Architect &amp; Content Strategist
                      </p>
                    </div>
                    <div 
                      className="p-2 rounded-xl border flex items-center justify-center text-[var(--accent-amber)]"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                    >
                      <Sparkles size={16} />
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
                    Engineering programmatic SEO engines and multi-platform publishing workflows that scale revenue predictably.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           02. DUAL EDITORIAL PORTALS (MY STORY & MY APPROACH)
         ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b relative" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <motion.div {...fadeUp} className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent-amber)' }}>
              CHOOSE YOUR PERSPECTIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Two Sides of the Same Coin
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans">
              Explore the personal narrative that forced me into systems, or inspect the 4-phase technical methodology that powers client results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: My Story */}
            <Link to="/my-story" className="group block h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-8 sm:p-10 rounded-2xl border shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                    >
                      THE NARRATIVE EVOLUTION
                    </span>
                    <div 
                      className="p-2.5 rounded-xl border group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 
                      className="text-2xl sm:text-3xl font-bold font-display group-hover:text-[var(--accent-amber)] transition-colors" 
                      style={{ color: 'var(--text-body)' }}
                    >
                      My Story: The Writer Who Built a Machine
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-sans font-normal">
                      From studying Construction Economics in Osogbo to hitting the 24-hour freelance burnout ceiling, and the exact automation epiphany that changed everything.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Osogbo Roots', 'The 2:00 AM Ceiling', 'Automation Epiphany', 'Production Scale'].map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border" 
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div 
                  className="pt-8 mt-8 border-t flex items-center justify-between text-xs font-bold text-[var(--accent-amber)] group-hover:translate-x-1 transition-transform" 
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  <span>Read The Full Journey</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>

            {/* Card 2: My Approach */}
            <Link to="/my-approach" className="group block h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-8 sm:p-10 rounded-2xl border shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}
                    >
                      THE OPERATING SYSTEM
                    </span>
                    <div 
                      className="p-2.5 rounded-xl border group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}
                    >
                      <Target className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 
                      className="text-2xl sm:text-3xl font-bold font-display group-hover:text-[var(--cta-blue)] transition-colors" 
                      style={{ color: 'var(--text-body)' }}
                    >
                      My Approach: Data, Systems &amp; Zero Guesswork
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-sans font-normal">
                      The engineering methodology behind 520% ROI. Explore the 4-phase operating framework: Telemetry audits, topic architecture, pipeline orchestration, and editorial guardrails.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Stack Telemetry', 'Topic Architecture', 'Pipeline Orchestration', 'Quality Guardrails'].map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border" 
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div 
                  className="pt-8 mt-8 border-t flex items-center justify-between text-xs font-bold text-[var(--cta-blue)] group-hover:translate-x-1 transition-transform" 
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  <span>Inspect The Methodology</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           03. AUDITED PRODUCTION BENCHMARKS
         ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
              MEASURABLE TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Audited Production Benchmarks
            </h2>
            <p className="font-light text-sm max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Every benchmark is mathematically tracked through Search Console and client GA4 telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { value: 520, suffix: '%', label: 'ROI Delivered in 90 Days', sub: 'TechFlow Solutions · $127K Linked Revenue' },
              { value: 65,  suffix: '%', label: 'Organic Traffic Lift', sub: 'The Scoove Africa · 3-Month Scale' },
              { value: 15,  suffix: '+', label: 'Hours Reclaimed Weekly', sub: 'Across Active Client Operations' },
              { value: 95,  suffix: '%', label: 'Client Retention Rate', sub: 'Long-Term System Maintenance Contracts' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...stagger(i)}
                className="text-center p-6 sm:p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none mb-3 font-display" style={{ color: 'var(--accent-amber)' }}>
                  <NumberTicker value={stat.value} delay={0.2 + i * 0.1} className="text-4xl sm:text-5xl md:text-6xl font-bold font-display" />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs font-sans font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-body)' }}>
                  {stat.label}
                </p>
                <p className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 pt-2" style={{ color: 'var(--text-muted)' }}>
            <Globe size={16} className="text-[var(--accent-teal)] shrink-0" />
            <span>Operating remotely from Nigeria with technology teams across the US, UK, Canada, and Europe.</span>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           04. 3 CORE PILLARS OF EXECUTION
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          
          <motion.div {...fadeUp} className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
              CORE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              The 3 Pillars of Autonomous Content
            </h2>
            <p className="text-base text-[var(--text-muted)] font-sans">
              Eliminating marketing speculation with an interconnected triad of editorial craft, automation pipelines, and closed-loop revenue attribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <motion.div 
              {...stagger(0)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div 
                  className="w-12 h-12 rounded-xl border flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 01</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Editorial Authority</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Published across global platforms including StoryChief, Herbvity, and Scoove Africa. I craft high-intent B2B topic clusters and deep-dive guides that educate decision-makers and convert searchers into pipeline.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--accent-amber)]" style={{ borderColor: 'var(--border-card)' }}>
                <CheckCircle2 size={14} />
                <span>Zero Fluff • Authentic Brand Voice</span>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              {...stagger(1)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div 
                  className="w-12 h-12 rounded-xl border flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}
                >
                  <Workflow className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 02</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Pipeline Automation</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Production workflows orchestrated with n8n, Make, Zapier, and Python microservices. Centralized databases in Airtable, multi-platform publishing in WordPress/Webflow, and instant CRM sync in HubSpot.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--cta-blue)]" style={{ borderColor: 'var(--border-card)' }}>
                <Clock size={14} />
                <span>15+ Hours Saved Every Week</span>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              {...stagger(2)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div 
                  className="w-12 h-12 rounded-xl border flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
                >
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 03</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Attribution &amp; ROI</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Search Console query telemetry, keyword difficulty gap models, and closed-loop GA4 revenue tracking. We eliminate marketing speculation with mathematically audited client dashboards.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--accent-teal)]" style={{ borderColor: 'var(--border-card)' }}>
                <ShieldCheck size={14} />
                <span>520% ROI Audited in Production</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           05. VERIFIED CLIENT WORDS
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 overflow-visible border-b" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12 overflow-visible">
          <motion.div {...fadeUp} className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
              CLIENT ENDORSEMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Verified Client Words
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans">
              Real feedback from founders, product managers, and marketing leaders who scaled with my systems.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="w-full">
            <OrbitalTestimonials
              testimonials={[
                {
                  headline: "Bright spirit & thorough researcher",
                  quote: "Emmanuel is a bright spirit with oozing positivity. Every time he submits work it's with a positive attitude and enthusiasm. He is thorough in his research and asks questions if he has any need to. I would be happy to work with him again in the future.",
                  name: "Brock Yates",
                  title: "Operational Project Manager, Mel Technologies LLC (Switzerland)",
                  image: "/images/testimonials/Brock.webp",
                  rating: 5
                },
                {
                  headline: "Great articles & solid search strategy",
                  quote: "Emmanuel delivered great articles and content workflows, taking his time to research the subject thoroughly before designing our search strategy. The better you guide and the more precise you describe your tasks, the better output you'll get.",
                  name: "Phillip Stemann",
                  title: "Founder, Planzer.io",
                  image: "/images/testimonials/Phillip.webp",
                  rating: 5
                },
                {
                  headline: "Exceptional systems & marketing builder",
                  quote: "Emmanuel is an exceptional systems builder and marketing architect. He built a content mapping database and automated syndication pipeline for us that drastically reduced our publishing overhead. His focus on data accuracy is something I really admire.",
                  name: "Daniel Olutoki",
                  title: "Retail Merchandiser, Xiaomi Nigeria",
                  image: "/images/testimonials/Daniel.webp",
                  rating: 5
                },
                {
                  headline: "Outstanding SEO & publishing workflows",
                  quote: "Emmanuel understands how to scale search engine visibility using technical SEO automation. He helped us research, optimize, and distribute articles using automated brand voice checks, guaranteeing speed without sacrificing editorial standards.",
                  name: "Adewunmi Adedayo",
                  title: "Journalist & SEO Content Writer",
                  image: "/images/testimonials/Adewunmi.webp",
                  rating: 5
                },
                {
                  headline: "Brilliant AI automation partner",
                  quote: "Emmanuel's approach to merging AI workflows with content strategy is brilliant. He doesn't just build scripts; he architects robust publishing engines using n8n and OpenAI that maintain brand voice at scale. His systems saved our team countless manual hours.",
                  name: "Nkemdirim Madueme",
                  title: "AI Automation Builder",
                  image: "/images/testimonials/Nkemdirim.webp",
                  rating: 5
                },
                {
                  headline: "Fast execution & distribution tech expert",
                  quote: "Emmanuel is an exceptional strategist who perfectly blends SEO and content automation. He designed a system to automate our organic marketing and social media publishing pipeline. He's fast, understands distribution tech deeply, and delivers outstanding results.",
                  name: "Esther Adeniji",
                  title: "Product Manager, UBA Group",
                  image: "/images/testimonials/Esther.webp",
                  rating: 5
                },
                {
                  headline: "Completely transformed our content pipeline",
                  quote: "Emmanuel completely transformed the content pipeline at Scoove Africa. By designing custom n8n workflows integrated with Make, he automated our entire publishing cycle, boosting traffic by 65% in 3 months. His deep understanding of technical SEO and automation is state of the art.",
                  name: "Olayiide Bolaji-Daniel",
                  title: "Senior Technical SEO Manager & CEO, Scoove Africa",
                  image: "/images/testimonials/Bolaji.webp",
                  rating: 5
                }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           06. OPERATING PRINCIPLES & CREED
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent-amber)' }}>
              CORE OPERATING CREED
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Working harder doesn't guarantee better results. <br />
              <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>Systems do.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent-amber)]">RULE 01</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Data Over Guesswork</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                Every marketing action starts with verified search intent, keyword difficulty models, and operational gap audits. We build what the market is already searching for.
              </p>
            </div>

            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--cta-blue)]">RULE 02</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Human Quality Guardrails</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                Automation never means generic machine slop. Our pipelines embed strict editorial quality gates, readability formulas, and human review steps to preserve brand voice.
              </p>
            </div>

            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent-teal)]">RULE 03</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Compounding Architecture</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                One article is an asset; twenty interconnected articles form an authority engine. We design modular systems where every published asset strengthens the whole domain.
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 pl-6 py-2 max-w-3xl mx-auto" style={{ borderColor: 'var(--accent-amber)' }}>
            <p className="text-lg sm:text-xl italic leading-relaxed text-[var(--text-muted)] font-serif">
              "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
            </p>
            <cite className="block mt-2 text-xs font-mono font-bold not-italic text-[var(--text-muted)]">PROVERBS 22:29</cite>
          </blockquote>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
           07. FINAL ACTION CTA
         ═══════════════════════════════════════════ */}
      <section id="contact-cta" className="py-24 md:py-32 border-t" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          
          <motion.div {...fadeUp} className="space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>NEXT STEPS</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Ready to Turn Content Chaos into a Predictable Growth Engine?
            </h2>
            <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans font-normal">
              Book a zero-pressure 30-minute operational review. We will map your current manual bottlenecks and project your exact automation ROI.
            </p>
          </motion.div>

          <motion.div {...stagger(1)} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link 
              to="/contact"
              className="px-8 py-4 font-bold text-sm rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
              style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
            >
              Book Strategy Call <ArrowRight size={16} />
            </Link>
            <Link 
              to="/resume"
              className="px-8 py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-3 border shadow-sm hover:scale-105 active:scale-95"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
            >
              View Full Resume
            </Link>
          </motion.div>
          
          <motion.div {...stagger(2)} className="flex justify-center flex-wrap items-center gap-8 text-xs font-sans font-bold uppercase tracking-widest pt-4" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2"><Mail size={14} style={{ color: 'var(--accent-amber)' }} /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} style={{ color: 'var(--accent-amber)' }} /> No pitch, just clear operational strategy</span>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
