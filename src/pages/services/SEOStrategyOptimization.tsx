import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    color: 'blue',
    desc: 'We identify every high-intent keyword your competitors are ranking for that you\'re missing — and map them to your content and buyer journey.',
    metrics: ['500+ keywords mapped', 'Competitor content gap surfaced', 'Search intent classified'],
  },
  {
    id: 2,
    label: 'Topic Cluster Architecture',
    icon: <Layers size={18} />,
    color: 'teal',
    desc: 'Instead of publishing isolated articles, we build interconnected content hubs that establish topical authority — and signal to Google that you\'re the expert.',
    metrics: ['Pillar + cluster structure built', 'Internal linking map created', 'Domain authority compounding'],
  },
  {
    id: 3,
    label: 'On-Page Optimization',
    icon: <FileSearch size={18} />,
    color: 'indigo',
    desc: 'We optimize every article against target keywords, search intent, semantic relevance, and user experience signals — for maximum click-through and ranking potential.',
    metrics: ['Title + meta optimization', 'Semantic keyword integration', 'Readability + structure audit'],
  },
  {
    id: 4,
    label: 'Technical SEO Audit',
    icon: <Settings size={18} />,
    color: 'purple',
    desc: 'If Google can\'t crawl and index your site efficiently, even great content won\'t rank. We audit and fix every technical barrier to search visibility.',
    metrics: ['Core Web Vitals review', 'Crawl & indexing audit', 'Schema markup implementation'],
  },
  {
    id: 5,
    label: 'SERP Tracking & Ranking Strategy',
    icon: <TrendingUp size={18} />,
    color: 'emerald',
    desc: 'Ranking isn\'t the finish line — it\'s the beginning. We track every target keyword weekly and adapt strategy based on what\'s moving and what\'s not.',
    metrics: ['Weekly position tracking', 'CTR optimization loop', 'Ranking velocity reporting'],
  },
  {
    id: 6,
    label: 'Monthly Performance Reporting',
    icon: <BarChart3 size={18} />,
    color: 'amber',
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

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
};

const glowMap: Record<string, string> = {
  blue: 'shadow-blue-500/20',
  teal: 'shadow-teal-500/20',
  indigo: 'shadow-indigo-500/20',
  purple: 'shadow-purple-500/20',
  emerald: 'shadow-emerald-500/20',
  amber: 'shadow-amber-500/20',
};

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
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      <SEO
        title="SEO Strategy & Optimization | Emmanuel Odebiyi"
        description="Ranking higher isn't luck — it's architecture. I build SEO foundations from keyword research to technical health to content strategy that earns you the right traffic."
        keywords="SEO strategy Nigeria, technical SEO audit, keyword architecture, topical authority, SERP ranking strategy"
      />

      {/* Aurora glows */}
      <div className="absolute top-[-15%] right-[-5%] w-[65vw] h-[65vw] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[-10%] w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[25%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* ── BACK NAV ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] pt-8">

          {/* LEFT: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 tracking-[0.2em] uppercase"
            >
              <Search size={12} />
              Service 02 — SEO Architecture
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white"
              >
                Your customers{' '}
                <br />
                are searching.{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400">
                  Will they find you?
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed"
            >
              You can publish great content and still get zero traffic. SEO is what 
              determines whether your content gets found — or gets buried.{' '}
              <strong className="text-white font-semibold">I build the architecture that ranks.</strong>
            </motion.p>

            {/* Mock search bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-sm"
            >
              <Search size={15} className="text-zinc-500 shrink-0" />
              <span className="text-sm text-zinc-300 font-mono flex-1">best saas for growing business</span>
              <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">↑ Rank #9</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 text-white font-bold text-base hover:brightness-110 shadow-2xl shadow-blue-500/30 active:scale-95 transition-all group"
              >
                Build My SEO Foundation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#seo-layers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 font-medium text-base hover:bg-white/10 hover:text-white transition-all"
              >
                See the Architecture
                <ChevronDown size={16} />
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
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-teal-500/10 to-cyan-500/5 rounded-full blur-[80px] scale-75 pointer-events-none" />

            {/* Concentric radar rings */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + ring * 0.1, duration: 0.8, ease: 'easeOut' }}
                className="absolute rounded-full border border-blue-500/20"
                style={{
                  width: `${ring * 110}px`,
                  height: `${ring * 110}px`,
                }}
              >
                {/* Ping on outer ring only */}
                {ring === 4 && (
                  <div className="absolute inset-0 rounded-full border border-blue-400/15 animate-ping" style={{ animationDuration: '3s' }} />
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
                  background: 'linear-gradient(to top, rgba(59,130,246,0.6), transparent)',
                  transformOrigin: 'bottom center',
                  transform: 'translateX(-50%)',
                }}
              />
            </motion.div>

            {/* Center dot */}
            <div className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

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
                className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-blue-500 text-white text-xs font-black shadow-[0_0_20px_rgba(59,130,246,0.5)] whitespace-nowrap"
              >
                #9 — Ranking
              </motion.div>
            </motion.div>

            {/* Floating keyword pills */}
            {[
              { text: 'saas growth', x: '15%', y: '22%', delay: 0.8, color: 'teal' },
              { text: 'content strategy', x: '62%', y: '12%', delay: 1.0, color: 'blue' },
              { text: 'keyword gap', x: '70%', y: '70%', delay: 1.2, color: 'cyan' },
              { text: 'topic clusters', x: '10%', y: '72%', delay: 1.4, color: 'indigo' },
            ].map((kw, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: kw.delay, duration: 0.5 }}
                className={`absolute text-[10px] font-mono px-2.5 py-1.5 rounded-lg border ${
                  kw.color === 'teal' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' :
                  kw.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                  kw.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                  'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                }`}
                style={{ left: kw.x, top: kw.y }}
              >
                {kw.text}
              </motion.div>
            ))}

            {/* Stats floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute bottom-4 right-4 px-4 py-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-center shadow-xl"
            >
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">65%</div>
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Traffic Growth</div>
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
          <div className="p-10 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Live Ranking Simulation</span>
            <div className="flex items-end gap-6">
              <div className="text-center">
                <div className="text-sm font-mono text-zinc-500 uppercase mb-2">Starting Position</div>
                <div className="text-6xl font-black text-red-400 line-through opacity-60">#24</div>
              </div>
              <ArrowRight className="text-zinc-600 mb-3" size={32} />
              <div className="text-center">
                <div className="text-sm font-mono text-zinc-500 uppercase mb-2">After Architecture</div>
                <motion.div
                  animate={{ scale: rankingAnim === 9 ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-7xl font-black text-blue-400"
                >
                  #{rankingAnim}
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <TrendingUp size={12} />
              The Scoove Africa · 90 days · 65% traffic increase
            </div>
          </div>

          {/* Proof stats */}
          <div className="grid grid-cols-2 gap-4">
            {RESULTS.map((r) => (
              <div
                key={r.label}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-blue-500/30 transition-colors flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-1">{r.val}</div>
                <div className="text-sm font-semibold text-white mb-1">{r.label}</div>
                <div className="text-xs text-zinc-500 font-mono">{r.sub}</div>
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              The Six-Layer SEO System
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Ranking Is Built in Layers
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 font-light max-w-xl mx-auto">
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
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${
                    activeLayer === idx
                      ? 'bg-white/10 border-white/20 shadow-xl'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
                    activeLayer === idx ? colorMap[layer.color] : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}>
                    {layer.icon}
                  </div>
                  <span className={`font-semibold text-sm tracking-tight transition-colors ${activeLayer === idx ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                    Layer {layer.id}: {layer.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Layer detail panel */}
            <div className="lg:col-span-7">
              <div className="rounded-[2.5rem] bg-zinc-950/80 border border-white/10 p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${colorMap[SEO_LAYERS[activeLayer].color]}`}>
                      Layer {SEO_LAYERS[activeLayer].id} / {SEO_LAYERS.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {SEO_LAYERS[activeLayer].label}
                    </h3>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg">
                      {SEO_LAYERS[activeLayer].desc}
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                      {SEO_LAYERS[activeLayer].metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                          <CheckCircle2 size={14} className={`shrink-0 ${colorMap[SEO_LAYERS[activeLayer].color].split(' ')[2]}`} />
                          {m}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <Link
                  to="/contact"
                  className={`mt-8 py-4 rounded-xl font-bold text-center block hover:brightness-110 shadow-lg active:scale-95 transition-all text-sm uppercase tracking-wider text-white ${
                    'bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 ' + glowMap[SEO_LAYERS[activeLayer].color]
                  }`}
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              Full Scope Included
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              What You Get
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {DELIVERABLES.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/8 transition-all"
              >
                <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
                <span className="text-zinc-300 font-medium text-sm leading-relaxed">{d}</span>
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
          className="mb-32 p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-transparent border border-blue-500/20 text-center relative overflow-hidden"
        >
          <Target className="mx-auto text-blue-400 mb-6" size={40} />
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-snug mb-4">
            Content that doesn't just exist —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              it ranks, gets clicked, and brings in the right traffic.
            </span>
          </h3>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg mb-8">
            Real traffic. Real leads. Real revenue — from organic search that compounds every month without you paying for ads.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-blue-500/30 active:scale-95 transition-all"
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              Common Questions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight">
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
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-zinc-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
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
                      <p className="px-6 pb-5 text-zinc-400 font-light leading-relaxed">{faq.a}</p>
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
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Next Step</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Start Ranking?
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Book a free 30-minute strategy call and I'll walk you through exactly what your SEO architecture would look like — and what results to expect.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            Book Your Free Strategy Call
            <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-zinc-600 font-mono mt-3">No commitment. No sales pressure. Just strategy.</p>
        </motion.div>

      </div>
    </div>
  );
}
