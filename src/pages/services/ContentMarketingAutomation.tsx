import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Workflow, Sparkles,
  Calendar, BarChart3, Globe, Zap, Clock, TrendingUp,
  FileText, Rss, Mail, Linkedin, Play, ChevronDown
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

const PIPELINE_STEPS = [
  { id: 1, label: 'Keyword & Audience Research', color: 'indigo', desc: 'We audit your market landscape, identify high-intent search clusters, and map content to your buyer journey stages.' },
  { id: 2, label: 'Editorial Calendar Build', color: 'purple', desc: 'A 90-day, pre-populated content roadmap with titles, angles, keyword targets, and distribution channels for every piece.' },
  { id: 3, label: 'AI Brand-Voice Writing', color: 'blue', desc: 'Each piece is generated through a custom AI pipeline — tuned to your tone, reviewed for accuracy, and polished to publication standard.' },
  { id: 4, label: 'Quality Control Review', color: 'teal', desc: 'Every article passes a structured editorial review checklist before it leaves the system. No filler. No generic output.' },
  { id: 5, label: 'Automated Multi-Channel Distribution', color: 'emerald', desc: 'Content is published to blog, LinkedIn, email, and social automatically — on schedule, without manual intervention.' },
  { id: 6, label: 'Performance Dashboard & Reporting', color: 'amber', desc: 'A live dashboard shows rankings, traffic, engagement, and lead capture in real time — so you always know what\'s working.' },
];

const RESULTS = [
  { val: '40+', label: 'Articles Published Monthly', sub: 'vs. industry avg of 4–6' },
  { val: '520%', label: 'ROI in 90 Days', sub: 'TechFlow Solutions case study' },
  { val: '80%', label: 'Organic Traffic Increase', sub: 'Same client, same quarter' },
  { val: '0hrs', label: 'Manual Effort Required', sub: 'From you or your team' },
];

const DELIVERABLES = [
  { icon: <FileText size={18} />, text: 'Full content strategy and editorial calendar' },
  { icon: <Sparkles size={18} />, text: 'AI-assisted content creation — tuned to your brand voice' },
  { icon: <Workflow size={18} />, text: 'Automated publishing workflow (8–40+ articles monthly)' },
  { icon: <Globe size={18} />, text: 'Multi-platform distribution: blog, LinkedIn, email, social' },
  { icon: <CheckCircle2 size={18} />, text: 'Quality control framework — every piece reviewed against your standards' },
  { icon: <BarChart3 size={18} />, text: 'Performance dashboard — real-time visibility into what\'s working' },
];

const CHANNELS = [
  { icon: <Rss size={20} />, name: 'Blog / CMS', color: 'var(--accent-blue)' },
  { icon: <Linkedin size={20} />, name: 'LinkedIn', color: 'var(--accent-blue)' },
  { icon: <Mail size={20} />, name: 'Email Newsletter', color: 'var(--accent-amber)' },
  { icon: <Globe size={20} />, name: 'Social Media', color: 'var(--accent-teal)' },
];

export default function ContentMarketingAutomation() {
  const [activeStep, setActiveStep] = useState(0);
  const [runningPipeline, setRunningPipeline] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-cycle pipeline steps on mount for visual demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % PIPELINE_STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleRunPipeline = () => {
    setRunningPipeline(true);
    setPipelineProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 2;
      setPipelineProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setRunningPipeline(false);
        setPipelineProgress(100);
      }
    }, 60);
  };

  const faqs = [
    { q: 'How long before I see results?', a: 'Most clients see measurable content output improvements within the first 14 days. Organic traffic compounding typically begins in 45–90 days as published content indexes and ranks.' },
    { q: 'Will the content actually sound like me?', a: 'Absolutely. Before we build anything, I run a comprehensive brand voice audit — reviewing your existing copy, tone guides, and audience data. Every piece is reviewed to ensure it reflects your positioning, not generic AI output.' },
    { q: 'How many articles per month can this produce?', a: 'The system scales from 8 articles/month at the entry level to 40+ at full enterprise capacity. We set the right volume for your goals in week one and scale from there.' },
    { q: 'Do I need to be involved in the process?', a: 'Your involvement is minimal by design. We do a thorough onboarding session, then the engine runs. You review and approve monthly reporting — that\'s typically it.' },
    { q: 'What platforms does the content get distributed to?', a: 'Blog (WordPress, Webflow, or your CMS), LinkedIn, email newsletter, and social media. All distribution is automated via webhook integrations to your existing tools.' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO
        title="Content Marketing Automation | Emmanuel Odebiyi"
        description="I build fully automated content marketing engines publishing 8 to 40+ articles monthly, distributed across your channels on autopilot."
        keywords="content marketing automation, AI content system, automated publishing, brand voice AI, content engine"
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
          
          {/* LEFT: Live Editorial Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Dashboard card */}
            <div 
              className="relative rounded-[2rem] border backdrop-blur-xl shadow-2xl p-6 overflow-hidden"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-widest">Content Engine Dashboard</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase" style={{ color: 'var(--accent-teal)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Queue of publishing articles */}
              <div className="space-y-2.5 mb-5 text-left">
                {[
                  { title: '7 SaaS Pricing Strategies That Convert', channel: 'Blog', status: 'Published', color: 'var(--accent-teal)', delay: 0 },
                  { title: 'How We Grew Organic Traffic 520%', channel: 'LinkedIn', status: 'Scheduled', color: 'var(--accent-blue)', delay: 0.15 },
                  { title: 'Top 10 Content Tools for 2025', channel: 'Newsletter', status: 'Writing...', color: 'var(--accent-amber)', delay: 0.3 },
                  { title: 'The Automation Stack Every SMB Needs', channel: 'Blog', status: 'Research', color: 'var(--accent-blue)', delay: 0.45 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + item.delay, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl border transition-all interactive-card"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="w-1.5 h-8 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: 'var(--text-body)' }}>{item.title}</p>
                      <p className="text-[10px] font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{item.channel}</p>
                    </div>
                    <span 
                      className="text-[9px] font-sans font-bold px-2 py-1 rounded-md border shrink-0"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: item.color }}
                    >
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="grid grid-cols-3 gap-3 pt-4 border-t"
                style={{ borderColor: 'var(--border-card)' }}
              >
                {[
                  { val: '40', label: 'articles/mo' },
                  { val: '520%', label: 'ROI' },
                  { val: '0hrs', label: 'manual work' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>{s.val}</div>
                    <div className="text-[9px] font-sans font-bold text-zinc-500 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <Workflow size={12} className="animate-pulse" style={{ color: 'var(--accent-blue)' }} />
              Service 01 — Content Engine
            </motion.div>

            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-display"
                style={{ color: 'var(--text-body)' }}
              >
                Your content,{' '}
                <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                  published everywhere
                </span>
                <br />
                — while you sleep.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl font-light leading-relaxed text-left"
              style={{ color: 'var(--text-muted)' }}
            >
              Most businesses don't have a content problem. They have a 
              consistency problem. Great ideas, no engine to get them out.{' '}
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>I build the engine.</strong>
            </motion.p>

            {/* Live output ticker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3 py-3 px-4 rounded-2xl border w-fit"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-ping shrink-0" />
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-teal)' }}>Engine Active — 3 articles published today</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="btn-cta text-base group"
              >
                Let's Build Your Engine
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border text-base transition-all font-bold"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                See How It Works
                <ChevronDown size={16} />
              </a>
            </motion.div>
          </div>

        </div>

        {/* ── PROOF BAR ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32"
        >
          {RESULTS.map((r) => (
            <motion.div
              key={r.label}
              variants={fadeUp}
              className="p-6 rounded-2xl border backdrop-blur-md text-center transition-colors interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-3xl sm:text-4xl font-bold font-display mb-1" style={{ color: 'var(--accent-blue)' }}>{r.val}</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{r.label}</div>
              <div className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{r.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── LIVE PIPELINE DEMO ── */}
        <div id="how-it-works" className="mb-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.2em] block" style={{ color: 'var(--text-muted)' }}>
              The System Architecture
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Your Content Engine, Step by Step
            </motion.h2>
            <motion.p variants={fadeUp} className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Watch the full pipeline run — from research to publication to reporting — in real time.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step selector */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {PIPELINE_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 group cursor-pointer interactive-card"
                  style={{
                    backgroundColor: activeStep === idx ? 'var(--bg-surface-alt)' : 'var(--bg-surface)',
                    borderColor: activeStep === idx ? 'var(--text-body)' : 'var(--border-card)'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      borderColor: 'var(--border-card)',
                      color: activeStep === idx ? 'var(--accent-blue)' : 'var(--text-muted)'
                    }}
                  >
                    {step.id}
                  </div>
                  <span 
                    className="font-bold text-sm tracking-tight transition-colors"
                    style={{ color: activeStep === idx ? 'var(--text-body)' : 'var(--text-muted)' }}
                  >
                    {step.label}
                  </span>
                  {activeStep === idx && (
                    <motion.div
                      layoutId="activePip"
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-blue)' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Step detail panel */}
            <div className="lg:col-span-7">
              <div 
                className="rounded-[2.5rem] border p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
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
                      Step {PIPELINE_STEPS[activeStep].id} of {PIPELINE_STEPS.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                      {PIPELINE_STEPS[activeStep].label}
                    </h3>
                    <p className="font-light leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>
                      {PIPELINE_STEPS[activeStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Pipeline run simulation */}
                <div className="mt-10 space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    <span>Automation Progress</span>
                    <span>{pipelineProgress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
                    <motion.div
                      animate={{ width: `${pipelineProgress}%` }}
                      transition={{ duration: 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--accent-blue)' }}
                    />
                  </div>
                  <button
                    onClick={handleRunPipeline}
                    disabled={runningPipeline}
                    className="flex items-center gap-2 text-xs font-sans font-bold hover:brightness-110 transition-all disabled:opacity-50 mt-2 cursor-pointer"
                    style={{ color: 'var(--accent-blue)' }}
                  >
                    <Play size={12} className={runningPipeline ? 'animate-pulse' : ''} />
                    {runningPipeline ? 'Pipeline Running...' : 'Simulate Pipeline Run →'}
                  </button>
                </div>
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-6 text-left">
              <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>
                Complete Deliverable Scope
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight leading-snug font-display" style={{ color: 'var(--text-body)' }}>
                Everything That Comes With the Engine
              </motion.h2>
              <motion.p variants={fadeUp} className="font-light leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>
                This isn't a tool subscription or a content brief template. It's a fully operational marketing system — built, deployed, and optimized for your business.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="btn-cta cursor-pointer"
                >
                  Let's Build Your Content Engine <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-3"
              >
                {DELIVERABLES.map((d, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-center gap-4 p-5 rounded-2xl border transition-all group interactive-card"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-blue)' }}
                    >
                      {d.icon}
                    </div>
                    <span className="font-bold text-sm leading-relaxed text-left" style={{ color: 'var(--text-body)' }}>{d.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── DISTRIBUTION CHANNELS ── */}
        <div className="mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12 space-y-4"
          >
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>
              Multi-Channel Distribution
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              One System. Every Channel.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {CHANNELS.map((ch) => (
              <motion.div
                key={ch.name}
                variants={fadeUp}
                className="p-6 rounded-2xl text-center flex flex-col items-center gap-3 border transition-all cursor-default interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div style={{ color: ch.color }}>{ch.icon}</div>
                <span className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>{ch.name}</span>
                <span className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>Automated</span>
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
          <TrendingUp className="mx-auto mb-6 animate-pulse" size={40} style={{ color: 'var(--accent-blue)' }} />
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-snug mb-4 font-display" style={{ color: 'var(--text-body)' }}>
            Your audience sees you everywhere, every week —{' '}
            <span className="italic font-medium" style={{ color: 'var(--accent-blue)' }}>
              without you writing a single word.
            </span>
          </h3>
          <p className="font-light max-w-2xl mx-auto text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            That's not a marketing claim. It's the engineered outcome of a system that runs for you — from research, to writing, to publishing, to reporting.
          </p>
          <Link
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Let's Build Your Content Engine
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
              Questions About the Content Engine
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
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--text-muted)' }}
                  />
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
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Ready?</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
            Book a Free Strategy Call
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            30 minutes. No pitch. I'll walk you through exactly what I'd build for your business and what results to expect.
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
