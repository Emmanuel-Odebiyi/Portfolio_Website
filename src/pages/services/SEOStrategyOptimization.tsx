import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Search, TrendingUp, BarChart3, CheckCircle2,
  Target, Globe, Layers, ChevronDown, Zap, FileSearch, Link2, Settings
} from 'lucide-react';
import { SEO } from '../../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const SEO_LAYERS = [
  {
    id: 1,
    label: 'Keyword Research & Gap Analysis',
    icon: <Search size={18} />,
    color: 'var(--accent-blue)',
    desc: 'We identify every high-intent keyword your competitors are ranking for that you\'re missing — and map them to your content and buyer journey.',
    metrics: ['500+ keywords mapped', 'Competitor content gap surfaced', 'Search intent classified'],
  },
  {
    id: 2,
    label: 'Topic Cluster Architecture',
    icon: <Layers size={18} />,
    color: 'var(--accent-teal)',
    desc: 'Instead of publishing isolated articles, we build interconnected content hubs that establish topical authority — and signal to Google that you\'re the expert.',
    metrics: ['Pillar + cluster structure built', 'Internal linking map created', 'Domain authority compounding'],
  },
  {
    id: 3,
    label: 'On-Page Optimization',
    icon: <FileSearch size={18} />,
    color: 'var(--accent-blue)',
    desc: 'We optimize every article against target keywords, search intent, semantic relevance, and user experience signals — for maximum click-through and ranking potential.',
    metrics: ['Title + meta optimization', 'Semantic keyword integration', 'Readability + structure audit'],
  },
  {
    id: 4,
    label: 'Technical SEO Audit',
    icon: <Settings size={18} />,
    color: 'var(--accent-amber)',
    desc: 'If Google can\'t crawl and index your site efficiently, even great content won\'t rank. We audit and fix every technical barrier to search visibility.',
    metrics: ['Core Web Vitals review', 'Crawl & indexing audit', 'Schema markup implementation'],
  },
  {
    id: 5,
    label: 'SERP Tracking & Ranking Strategy',
    icon: <TrendingUp size={18} />,
    color: 'var(--accent-teal)',
    desc: 'Ranking isn\'t the finish line — it\'s the beginning. We track every target keyword weekly and adapt strategy based on what\'s moving and what\'s not.',
    metrics: ['Weekly position tracking', 'CTR optimization loop', 'Ranking velocity reporting'],
  },
  {
    id: 6,
    label: 'Monthly Performance Reporting',
    icon: <BarChart3 size={18} />,
    color: 'var(--accent-amber)',
    desc: 'Not just rankings — complete visibility into traffic, impressions, clicks, leads, and conversion performance. Clear next steps every single month.',
    metrics: ['Traffic & impressions dashboard', 'Lead attribution reporting', 'Next-month priority roadmap'],
  },
];

const RESULTS = [
  { val: 'P24→P9', label: 'Ranking Jump', sub: 'The Scoove Africa · 3 months' },
  { val: '65%', label: 'Traffic Growth', sub: 'Same client, same period' },
  { val: '25K+', label: 'Monthly Impressions', sub: 'From near-zero baseline' },
  { val: '3mo', label: 'To Measurable Impact', sub: 'Average across all SEO clients' },
];

const DELIVERABLES = [
  'In-depth keyword research and competitor gap analysis',
  'Topic cluster architecture for topical authority',
  'On-page optimization across existing and new content',
  'Technical SEO audit and implementation',
  'SERP tracking and ranking strategy',
  'Monthly reporting with clear next steps',
];

export default function SEOStrategyOptimization() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [rankingAnim, setRankingAnim] = useState(24);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Animate ranking counter downward to show improvement
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setRankingAnim(prev => {
          if (prev <= 9) { clearInterval(interval); return 9; }
          return prev - 1;
        });
      }, 120);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    { q: 'How long does SEO take to show results?', a: 'Honest answer: it depends on your domain authority, competition, and how much content you already have. Most clients see initial ranking movement within 30–45 days and significant traffic growth by month 3. The compounding effect means results keep growing beyond our engagement.' },
    { q: 'Do you only do on-page SEO or technical SEO too?', a: 'Both. My approach covers keyword strategy, on-page optimization, technical audits (site speed, crawlability, Core Web Vitals), and strategic content architecture. It\'s the full picture — not just metadata tweaks.' },
    { q: 'Will you need access to my website?', a: 'Yes — I\'ll need temporary access to your CMS and Google Search Console to implement changes and track performance. All access is documented and revocable at any time.' },
    { q: 'What if I already have some SEO in place?', a: 'Even better. I\'ll audit what\'s been done, identify gaps or errors, and build on what\'s already working. Nothing gets rebuilt unnecessarily — your existing rankings are protected.' },
    { q: 'Do you do link building?', a: 'I focus primarily on on-page and technical SEO, which are the highest-leverage foundation. Digital PR and strategic link acquisition can be discussed as an add-on depending on your goals and competitive landscape.' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO
        title="SEO Strategy & Optimization | Emmanuel Odebiyi"
        description="Ranking higher is architecture. I build SEO foundations from keyword research and technical health to content strategy that earns the right traffic."
        keywords="SEO strategy Nigeria, technical SEO audit, keyword architecture, topical authority, SERP ranking strategy"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* ── BACK NAV ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] pt-8">

          {/* LEFT: Copy */}
          <div className="space-y-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest text-center"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <Search size={12} style={{ color: 'var(--accent-blue)' }} />
              Service 02 — SEO Architecture
            </motion.div>

            <div className="flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-display text-center"
                style={{ color: 'var(--text-body)' }}
              >
                Your customers{' '}
                <br />
                are searching.{' '}
                <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                  Will they find you?
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl font-light leading-relaxed text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              You can publish great content and still get zero traffic. SEO is what 
              determines whether your content gets found — or gets buried.{' '}
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>I build the architecture that ranks.</strong>
            </motion.p>

            {/* Mock search bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border max-w-sm mx-auto interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <Search size={15} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm font-sans font-bold flex-1" style={{ color: 'var(--text-body)' }}>best saas for growing business</span>
              <span 
                className="text-[10px] font-sans font-bold px-2 py-1 rounded-md border shrink-0"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-blue)' }}
              >↑ Rank #9</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contact"
                className="btn-cta text-base group"
              >
                Build My SEO Foundation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#seo-layers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border text-base transition-all font-bold"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                See the Architecture <ChevronDown size={16} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT: SERP Radar Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: '480px' }}
          >
            {/* Concentric radar rings */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + ring * 0.1, duration: 0.8, ease: 'easeOut' }}
                className="absolute rounded-full border"
                style={{
                  width: `${ring * 110}px`,
                  height: `${ring * 110}px`,
                  borderColor: 'var(--border-card)',
                  opacity: 0.3
                }}
              >
                {/* Ping on outer ring only */}
                {ring === 4 && (
                  <div className="absolute inset-0 rounded-full border animate-ping" style={{ animationDuration: '3s', borderColor: 'var(--accent-blue)', opacity: 0.2 }} />
                )}
              </motion.div>
            ))}

            {/* Rotating radar sweep line */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute"
              style={{ width: '440px', height: '440px' }}
            >
              <div
                className="absolute top-1/2 left-1/2 h-[220px] w-[1px] origin-bottom"
                style={{
                  background: 'linear-gradient(to top, var(--accent-blue), transparent)',
                  transformOrigin: 'bottom center',
                  transform: 'translateX(-50%)',
                  opacity: 0.4
                }}
              />
            </motion.div>

            {/* Center dot */}
            <div className="absolute w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: 'var(--accent-blue)', boxShadow: '0 0 20px var(--accent-blue)' }} />

            {/* Rank badge — outer orbit position */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute"
              style={{ width: '440px', height: '440px' }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl text-xs font-bold shadow-2xl whitespace-nowrap"
                style={{ backgroundColor: 'var(--accent-blue)', color: '#ffffff' }}
              >
                #9 — Ranking
              </motion.div>
            </motion.div>

            {/* Floating keyword pills */}
            {[
              { text: 'saas growth', x: '15%', y: '22%', delay: 0.8, color: 'var(--accent-teal)' },
              { text: 'content strategy', x: '62%', y: '12%', delay: 1.0, color: 'var(--accent-blue)' },
              { text: 'keyword gap', x: '70%', y: '70%', delay: 1.2, color: 'var(--accent-amber)' },
              { text: 'topic clusters', x: '10%', y: '72%', delay: 1.4, color: 'var(--accent-blue)' },
            ].map((kw, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: kw.delay, duration: 0.5 }}
                className="absolute text-[10px] font-sans font-bold px-2.5 py-1.5 rounded-lg border shadow-sm"
                style={{ 
                  left: kw.x, 
                  top: kw.y,
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                  color: kw.color
                }}
              >
                {kw.text}
              </motion.div>
            ))}

            {/* Stats floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute bottom-4 right-4 px-4 py-3 rounded-2xl border text-center shadow-xl"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-2xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>65%</div>
              <div className="text-[9px] font-sans font-bold text-zinc-500 uppercase tracking-wider">Traffic Growth</div>
            </motion.div>
          </motion.div>

        </div>

        {/* ── LIVE RANKING COUNTER DEMO ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Rank climber widget */}
          <div 
            className="p-10 rounded-[2.5rem] border backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold text-zinc-500 uppercase tracking-widest">Live Ranking Simulation</span>
            <div className="flex items-end gap-6">
              <div className="text-center">
                <div className="text-sm font-sans font-bold text-zinc-500 uppercase mb-2">Starting Position</div>
                <div className="text-6xl font-bold font-display line-through opacity-40" style={{ color: 'var(--text-body)' }}>#24</div>
              </div>
              <ArrowRight className="mb-3" size={32} style={{ color: 'var(--border-card)' }} />
              <div className="text-center">
                <div className="text-sm font-sans font-bold text-zinc-500 uppercase mb-2">After Architecture</div>
                <motion.div
                  animate={{ scale: rankingAnim === 9 ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-7xl font-bold font-display"
                  style={{ color: 'var(--accent-blue)' }}
                >
                  #{rankingAnim}
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans font-bold" style={{ color: 'var(--accent-teal)' }}>
              <TrendingUp size={12} />
              The Scoove Africa · 90 days · 65% traffic increase
            </div>
          </div>

          {/* Proof stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RESULTS.map((r) => (
              <div
                key={r.label}
                className="p-6 rounded-2xl border backdrop-blur-md text-center transition-colors flex flex-col items-center justify-center interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-3xl font-bold font-display mb-1" style={{ color: 'var(--accent-blue)' }}>{r.val}</div>
                <div className="text-sm font-bold animate-pulse" style={{ color: 'var(--text-body)' }}>{r.label}</div>
                <div className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SEO ARCHITECTURE LAYERS ── */}
        <div id="seo-layers" className="mb-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.2em] block" style={{ color: 'var(--text-muted)' }}>
              The Six-Layer SEO System
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Ranking Is Built in Layers
            </motion.h2>
            <motion.p variants={fadeUp} className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Each layer compounds on the previous one. Miss one layer, and the whole architecture underperforms.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Layer selector */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {SEO_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(idx)}
                  className="w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 group cursor-pointer interactive-card"
                  style={{
                    backgroundColor: activeLayer === idx ? 'var(--bg-surface-alt)' : 'var(--bg-surface)',
                    borderColor: activeLayer === idx ? 'var(--text-body)' : 'var(--border-card)'
                  }}
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      borderColor: 'var(--border-card)',
                      color: activeLayer === idx ? 'var(--accent-blue)' : 'var(--text-muted)'
                    }}
                  >
                    {layer.icon}
                  </div>
                  <span 
                    className="font-bold text-sm tracking-tight transition-colors"
                    style={{ color: activeLayer === idx ? 'var(--text-body)' : 'var(--text-muted)' }}
                  >
                    Layer {layer.id}: {layer.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Layer detail panel */}
            <div className="lg:col-span-7">
              <div 
                className="rounded-[2.5rem] border p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6 text-left"
                  >
                    <span 
                      className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-blue)' }}
                    >
                      Layer {SEO_LAYERS[activeLayer].id} / {SEO_LAYERS.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                      {SEO_LAYERS[activeLayer].label}
                    </h3>
                    <p className="font-light leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>
                      {SEO_LAYERS[activeLayer].desc}
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      {SEO_LAYERS[activeLayer].metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-body)' }}>
                          <CheckCircle2 size={14} className="shrink-0" style={{ color: 'var(--accent-blue)' }} />
                          {m}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <Link
                  to="/contact"
                  className="btn-cta mt-8 text-center block text-sm uppercase tracking-wider cursor-pointer"
                >
                  Build My SEO Foundation →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── DELIVERABLES ── */}
        <div className="mb-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 space-y-4"
          >
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>
              Full Scope Included
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              What You Get
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto text-left"
          >
            {DELIVERABLES.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-2xl border transition-all interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <CheckCircle2 size={18} className="shrink-0" style={{ color: 'var(--accent-blue)' }} />
                <span className="font-bold text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RESULT CALLOUT ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32 p-10 sm:p-16 rounded-[3rem] border text-center relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <Target className="mx-auto mb-6 animate-pulse" size={40} style={{ color: 'var(--accent-blue)' }} />
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-snug mb-4 font-display" style={{ color: 'var(--text-body)' }}>
            Content that doesn't just exist —{' '}
            <span className="italic font-medium" style={{ color: 'var(--accent-blue)' }}>
              it ranks, gets clicked, and brings in the right traffic.
            </span>
          </h3>
          <p className="font-light max-w-2xl mx-auto text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            Real traffic. Real leads. Real revenue — from organic search that compounds every month without you paying for ads.
          </p>
          <Link
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Build My SEO Foundation
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* ── FAQ ── */}
        <div className="mb-24 max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12 space-y-4"
          >
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>
              Common Questions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Questions About SEO Strategy
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="rounded-2xl border overflow-hidden transition-all interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:brightness-95 transition-all cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
                >
                  <span className="font-bold pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-light leading-relaxed text-left" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Next Step</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
            Ready to Start Ranking?
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Book a free 30-minute strategy call and I'll walk you through exactly what your SEO architecture would look like — and what results to expect.
          </p>
          <Link
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Book Your Free Strategy Call
            <ArrowRight size={20} />
          </Link>
          <p className="text-xs font-sans font-bold mt-3" style={{ color: 'var(--text-muted)' }}>No commitment. No sales pressure. Just strategy.</p>
        </motion.div>

      </div>
    </div>
  );
}
