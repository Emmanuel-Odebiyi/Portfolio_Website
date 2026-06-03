import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { icon: <Rss size={20} />, name: 'Blog / CMS', color: 'indigo' },
  { icon: <Linkedin size={20} />, name: 'LinkedIn', color: 'blue' },
  { icon: <Mail size={20} />, name: 'Email Newsletter', color: 'purple' },
  { icon: <Globe size={20} />, name: 'Social Media', color: 'teal' },
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

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  };

  const faqs = [
    { q: 'How long before I see results?', a: 'Most clients see measurable content output improvements within the first 14 days. Organic traffic compounding typically begins in 45–90 days as published content indexes and ranks.' },
    { q: 'Will the content actually sound like me?', a: 'Absolutely. Before we build anything, I run a comprehensive brand voice audit — reviewing your existing copy, tone guides, and audience data. Every piece is reviewed to ensure it reflects your positioning, not generic AI output.' },
    { q: 'How many articles per month can this produce?', a: 'The system scales from 8 articles/month at the entry level to 40+ at full enterprise capacity. We set the right volume for your goals in week one and scale from there.' },
    { q: 'Do I need to be involved in the process?', a: 'Your involvement is minimal by design. We do a thorough onboarding session, then the engine runs. You review and approve monthly reporting — that\'s typically it.' },
    { q: 'What platforms does the content get distributed to?', a: 'Blog (WordPress, Webflow, or your CMS), LinkedIn, email newsletter, and social media. All distribution is automated via webhook integrations to your existing tools.' },
  ];

  return (
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      <SEO
        title="Content Marketing Automation | Emmanuel Odebiyi"
        description="I build fully automated content marketing engines publishing 8 to 40+ articles monthly, distributed across your channels on autopilot."
        keywords="content marketing automation, AI content system, automated publishing, brand voice AI, content engine"
      />

      {/* Decorative aurora glow */}
      <div className="absolute top-[-15%] left-[-5%] w-[70vw] h-[70vw] bg-indigo-600/8 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[30%] w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

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
          
          {/* LEFT: Live Editorial Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Ambient glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-blue-500/10 rounded-[2.5rem] blur-[60px] scale-110 pointer-events-none" />
            
            {/* Dashboard card */}
            <div className="relative rounded-[2rem] bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Content Engine Dashboard</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Queue of publishing articles */}
              <div className="space-y-2.5 mb-5">
                {[
                  { title: '7 SaaS Pricing Strategies That Convert', channel: 'Blog', status: 'Published', color: 'emerald', delay: 0 },
                  { title: 'How We Grew Organic Traffic 520%', channel: 'LinkedIn', status: 'Scheduled', color: 'blue', delay: 0.15 },
                  { title: 'Top 10 Content Tools for 2025', channel: 'Newsletter', status: 'Writing...', color: 'purple', delay: 0.3 },
                  { title: 'The Automation Stack Every SMB Needs', channel: 'Blog', status: 'Research', color: 'indigo', delay: 0.45 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + item.delay, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-all group"
                  >
                    <div className={`w-1.5 h-8 rounded-full shrink-0 ${
                      item.color === 'emerald' ? 'bg-emerald-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'purple' ? 'bg-purple-500' : 'bg-indigo-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{item.channel}</p>
                    </div>
                    <span className={`text-[9px] font-mono px-2 py-1 rounded-md border shrink-0 ${
                      item.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                      item.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                      item.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                      'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                    }`}>
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
                className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10"
              >
                {[
                  { val: '40', label: 'articles/mo' },
                  { val: '520%', label: 'ROI' },
                  { val: '0hrs', label: 'manual work' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{s.val}</div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{s.label}</div>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 tracking-[0.2em] uppercase"
            >
              <Workflow size={12} className="animate-pulse" />
              Service 01 — Content Engine
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white"
              >
                Your content,{' '}
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500">
                    published everywhere
                  </span>
                </span>
                <br />
                — while you sleep.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed"
            >
              Most businesses don't have a content problem. They have a 
              consistency problem. Great ideas, no engine to get them out.{' '}
              <strong className="text-white font-semibold">I build the engine.</strong>
            </motion.p>

            {/* Live output ticker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Engine Active — 3 articles published today</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-bold text-base hover:brightness-110 shadow-2xl shadow-indigo-500/30 active:scale-95 transition-all group"
              >
                Let's Build Your Content Engine
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 font-medium text-base hover:bg-white/10 hover:text-white transition-all"
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
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-indigo-500/30 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">{r.val}</div>
              <div className="text-sm font-semibold text-white mb-1">{r.label}</div>
              <div className="text-xs text-zinc-500 font-mono">{r.sub}</div>
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              The System Architecture
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Your Content Engine, Step by Step
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 font-light max-w-xl mx-auto">
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
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${
                    activeStep === idx
                      ? 'bg-white/10 border-white/20 shadow-xl'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border transition-all shrink-0 ${
                    activeStep === idx
                      ? colorMap[step.color]
                      : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`font-semibold text-sm tracking-tight transition-colors ${activeStep === idx ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                    {step.label}
                  </span>
                  {activeStep === idx && (
                    <motion.div
                      layoutId="activePip"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Step detail panel */}
            <div className="lg:col-span-7">
              <div className="rounded-[2.5rem] bg-zinc-950/80 border border-white/10 p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${colorMap[PIPELINE_STEPS[activeStep].color]}`}>
                      Step {PIPELINE_STEPS[activeStep].id} of {PIPELINE_STEPS.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                      {PIPELINE_STEPS[activeStep].label}
                    </h3>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg">
                      {PIPELINE_STEPS[activeStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Pipeline run simulation */}
                <div className="mt-10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <span>Automation Progress</span>
                    <span>{pipelineProgress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${pipelineProgress}%` }}
                      transition={{ duration: 0.1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                  <button
                    onClick={handleRunPipeline}
                    disabled={runningPipeline}
                    className="flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50 mt-2"
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
            <div className="lg:col-span-5 space-y-6">
              <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
                Complete Deliverable Scope
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-snug">
                Everything That Comes With the Engine
              </motion.h2>
              <motion.p variants={fadeUp} className="text-zinc-400 font-light leading-relaxed text-lg">
                This isn't a tool subscription or a content brief template. It's a fully operational marketing system — built, deployed, and optimized for your business.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-bold hover:brightness-110 shadow-xl shadow-indigo-500/20 transition-all"
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
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/8 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      {d.icon}
                    </div>
                    <span className="text-zinc-300 font-medium text-sm leading-relaxed">{d.text}</span>
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              Multi-Channel Distribution
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
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
                className={`p-6 rounded-2xl text-center flex flex-col items-center gap-3 border ${colorMap[ch.color]} hover:scale-[1.03] transition-all cursor-default`}
              >
                {ch.icon}
                <span className="font-bold text-white text-sm">{ch.name}</span>
                <span className="text-xs text-zinc-500 font-mono">Automated</span>
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
          className="mb-32 p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
          <TrendingUp className="mx-auto text-indigo-400 mb-6" size={40} />
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-snug mb-4">
            Your audience sees you everywhere, every week —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              without you writing a single word.
            </span>
          </h3>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg mb-8">
            That's not a marketing claim. It's the engineered outcome of a system that runs for you — from research, to writing, to publishing, to reporting.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-indigo-500/30 active:scale-95 transition-all"
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
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
              Common Questions
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight">
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
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors group"
                >
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-zinc-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-indigo-400' : ''}`}
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
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Ready?</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Book a Free Strategy Call
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            30 minutes. No pitch. I'll walk you through exactly what I'd build for your business and what results to expect.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-indigo-500/20 active:scale-95 transition-all"
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
