import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BarChart3, Target, CheckCircle2, 
  MessageSquare, Repeat, Zap, Bot, Award, Terminal, 
  ChevronRight, FileDown, Layers, Settings, Sparkles, TrendingUp, Activity, Check, ShieldCheck,
  Search, Database, Cpu, Compass, Sliders
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
};

interface OperatingStage {
  id: string;
  stageNum: string;
  title: string;
  subtitle: string;
  inputs: string[];
  operations: string[];
  deliverables: string[];
  qualityGate: string;
}

const operatingSystem: OperatingStage[] = [
  {
    id: 'telemetry',
    stageNum: '01',
    title: 'Stack Telemetry & Bottleneck Audit',
    subtitle: 'Diagnosing systemic drag and discovering high-impact search opportunities.',
    inputs: [
      'Google Search Console historical impression logs',
      'Technical site crawl and indexation health reports',
      'Competitor SERP keyword gap matrices',
      'Current manual publishing workflow mapping'
    ],
    operations: [
      'Identify index bloat, cannibalization, and deadweight pages',
      'Isolate commercial-intent queries with high conversion potential',
      'Pinpoint time-sink friction in the current production loop',
      'Quantify the manual cost per published asset'
    ],
    deliverables: [
      'Diagnostic Stack Scorecard',
      'High-Impact Keyword Opportunity Matrix',
      'Workflow Friction & Cost-Reduction Audit'
    ],
    qualityGate: 'Baseline telemetry benchmarks locked before any system build begins.'
  },
  {
    id: 'topology',
    stageNum: '02',
    title: 'Topical Cluster & Semantic Architecture',
    subtitle: 'Engineering topical authority through structured internal linking graphs.',
    inputs: [
      'Customer search intent taxonomy',
      'High-intent commercial and informational clusters',
      'Buyer journey decision stage models',
      'Entity-attribute knowledge graphs'
    ],
    operations: [
      'Design comprehensive Pillar-to-Cluster hierarchy blueprints',
      'Construct deterministic internal link equity routing maps',
      'Define schema markup requirements for Google rich snippets',
      'Classify search intent against Quality Rater guidelines'
    ],
    deliverables: [
      '90-Day Topical Authority Blueprint',
      'Structural Content Architecture Map',
      'Entity Optimization & Internal Link Ledger'
    ],
    qualityGate: 'Intent categorization verified against Google Search Quality Rater standards.'
  },
  {
    id: 'orchestration',
    stageNum: '03',
    title: 'Automated Pipeline Orchestration',
    subtitle: 'Constructing resilient, hands-free production and syndication engines.',
    inputs: [
      'Validated content briefs and editorial blueprints',
      'Bespoke brand voice calibration datasets',
      'Primary research data and client knowledge vaults',
      'CMS schemas (WordPress, Webflow, Ghost)'
    ],
    operations: [
      'Configure n8n multi-step webhooks and automation triggers',
      'Deploy multi-tier prompt chains with negative constraint filters',
      'Implement Tesseract OCR for automated technical slide processing',
      'Automate CMS draft staging via secure REST API integrations'
    ],
    deliverables: [
      'Autonomous Content Production Engine',
      'Airtable-to-CMS Staging Middleware',
      'Omnichannel Syndication Workflows (LinkedIn, X, Newsletter)'
    ],
    qualityGate: 'Zero manual copy-pasting required from research ingestion to CMS staging.'
  },
  {
    id: 'guardrails',
    stageNum: '04',
    title: 'Editorial Guardrails & Closed-Loop Attribution',
    subtitle: 'Protecting brand reputation with strict human-in-the-loop governance and revenue tracking.',
    inputs: [
      'Automated staging outputs',
      'Brand tone and stylistic compliance checklists',
      'Hemingway readability index targets',
      'GA4 event telemetry and CRM attribution tracking'
    ],
    operations: [
      'Conduct multi-pass human editorial review for authentic nuance',
      'Verify technical claims, statistics, and domain citations',
      'Scan for generic AI phrasing and enforce active voice',
      'Track lead attribution and revenue contribution in GA4/HubSpot'
    ],
    deliverables: [
      'Editorial Quality Assurance Protocol',
      'Executive Monthly Attribution Dashboard',
      'Continuous Feedback Loop for Pipeline Tuning'
    ],
    qualityGate: '100% human sign-off required prior to public syndication.'
  }
];

const techStack = [
  {
    category: 'Search & SERP Intelligence',
    items: ['Google Search Console', 'Semrush', 'Ahrefs', 'Screaming Frog', 'Surfer SEO']
  },
  {
    category: 'Workflow Orchestration',
    items: ['n8n', 'Make.com', 'Zapier', 'Python Scripting', 'REST APIs', 'Webhooks']
  },
  {
    category: 'AI & Data Processing',
    items: ['OpenAI GPT-4o', 'Claude API', 'Tesseract OCR', 'Airtable', 'Vector Embeddings']
  },
  {
    category: 'CMS & Analytics Staging',
    items: ['WordPress', 'Webflow', 'HubSpot', 'Google Analytics 4', 'Notion']
  }
];

const credentials = [
  {
    year: '2025',
    title: 'AI Automation & Process Design',
    issuer: 'n8n Academy',
    desc: 'Advanced workflow orchestration, API integration, and self-hosted automation infrastructure.'
  },
  {
    year: '2024',
    title: 'Advanced Search Engine Optimization',
    issuer: 'Semrush Academy',
    desc: 'Credential ID: 372617. Advanced technical audits, SERP analysis, and topic cluster architecture.'
  },
  {
    year: '2024',
    title: 'Marketing Automation Specialist',
    issuer: 'Coursera',
    desc: 'Multi-platform funnel architecture, CRM integration, and lifecycle marketing automation.'
  },
  {
    year: 'Academic',
    title: 'Bachelor of Science (B.Sc.), Construction Economics',
    issuer: 'Obafemi Awolowo University',
    desc: 'Rigorous foundation in structural cost estimation, quantity surveying, and material unit economics.'
  }
];

const performanceMetrics = [
  { metric: '50–65%', label: 'Organic Traffic Growth', desc: 'Sustained increase achieved within 90 days' },
  { metric: '15+ hrs', label: 'Time Reclaimed Weekly', desc: 'Saved for founders & marketing teams' },
  { metric: '520%', label: 'Average Client ROI', desc: 'Audited across active client accounts' },
  { metric: '95%+', label: 'Client Retention Rate', desc: 'Long-term ongoing systems partnerships' }
];

export default function MyApproach() {
  const [activeStage, setActiveStage] = useState('telemetry');

  return (
    <div className="min-h-screen relative overflow-x-clip" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="My Approach | Emmanuel Odebiyi"
        description="Explore Emmanuel Odebiyi's 4-stage engineering operating system for building autonomous marketing pipelines. Every recommendation backed by data, every result measured precisely."
        keywords="marketing methodology, data-driven approach, automation architecture, SEO strategy framework, content engineering operating system"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Link Nav */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2.5 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to About Profile
          </Link>
        </motion.div>
        
        {/* ── HERO SECTION ── */}
        <div className="mb-28 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-sans font-bold tracking-widest uppercase mb-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
            The Engineering Operating System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] font-display mb-8"
            style={{ color: 'var(--text-body)' }}
          >
            Not a consultant. <br />
            <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
              An architect who engineers outcomes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            I don’t hand you a list of generic tactics and hope for the best. I build complete, repeatable marketing systems — designed for your commercial model, measured against real business revenue, and engineered to run continuously.
          </motion.p>

          {/* 4 Core Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12 text-left"
          >
            {[
              { icon: <BarChart3 size={16} />, title: 'Backed by Data', desc: 'No gut feel. Every strategic choice is grounded in SERP telemetry and competitive analysis.' },
              { icon: <Target size={16} />, title: 'Measured Precisely', desc: 'Clear, audited metrics: traffic growth, time reclaimed, and pipeline attribution.' },
              { icon: <Repeat size={16} />, title: 'Built to Repeat', desc: 'Automation outlasts motivation. Systems continue running long after deployment.' },
              { icon: <MessageSquare size={16} />, title: 'Explained Clearly', desc: 'Zero technical smoke and mirrors. Complete operational clarity at every stage.' }
            ].map((p, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    {p.icon}
                  </div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-body)' }}>{p.title}</h4>
                  <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg transition-all"
              style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
            >
              Request an Architecture Audit
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/my-story"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border text-sm font-bold hover:brightness-110 transition-all"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            >
              Read Origin Story
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* ── 4-STAGE OPERATING SYSTEM ARCHITECTURE ── */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>The Operational Framework</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              The 4-Stage Content Engineering System
            </h2>
            <p className="text-sm font-light mt-2" style={{ color: 'var(--text-muted)' }}>
              From baseline telemetry to autonomous publishing and revenue attribution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Stage Selector Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {operatingSystem.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className="w-full text-left p-5 rounded-xl border transition-all relative overflow-hidden"
                    style={{
                      backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-page)',
                      borderColor: isActive ? 'var(--text-body)' : 'var(--border-card)',
                      color: isActive ? 'var(--text-body)' : 'var(--text-muted)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: isActive ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                        Stage {stage.stageNum}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                          Active Blueprint
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold tracking-tight mb-1" style={{ color: 'var(--text-body)' }}>
                      {stage.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                      {stage.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Blueprint Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {operatingSystem.map((stage) => {
                  if (stage.id !== activeStage) return null;
                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 sm:p-8 rounded-2xl border shadow-xl space-y-6 text-left"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                    >
                      {/* Panel Header */}
                      <div className="border-b pb-5" style={{ borderColor: 'var(--border-card)' }}>
                        <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent-amber)' }}>
                          <span>Stage {stage.stageNum} Specification</span>
                        </div>
                        <h3 className="text-2xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                          {stage.title}
                        </h3>
                        <p className="text-sm font-light mt-1" style={{ color: 'var(--text-muted)' }}>
                          {stage.subtitle}
                        </p>
                      </div>

                      {/* Inputs & Operations Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Inputs */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                            <Database size={14} /> System Inputs
                          </h4>
                          <ul className="space-y-2">
                            {stage.inputs.map((inp, idx) => (
                              <li key={idx} className="text-xs font-light leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent-amber)' }} />
                                <span>{inp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Operations */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                            <Cpu size={14} /> Core Operations
                          </h4>
                          <ul className="space-y-2">
                            {stage.operations.map((op, idx) => (
                              <li key={idx} className="text-xs font-light leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                                <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                                <span>{op}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <Sliders size={14} /> Direct Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.deliverables.map((del, idx) => (
                            <span 
                              key={idx}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            >
                              ✦ {del}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quality Gate Box */}
                      <div 
                        className="p-4 rounded-xl border flex items-start gap-3"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--accent-amber)' }}
                      >
                        <ShieldCheck size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-amber)' }} />
                        <div>
                          <div className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                            Verification Gate
                          </div>
                          <p className="text-xs font-light mt-0.5 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                            {stage.qualityGate}
                          </p>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ── TOOLS & TECHNOLOGY STACK ── */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Technical Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Curated Production Stack
            </h2>
            <p className="text-sm font-light mt-2" style={{ color: 'var(--text-muted)' }}>
              The proven tools, APIs, and frameworks orchestrating my autonomous marketing pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {techStack.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider pb-3 mb-4 border-b" style={{ borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-xs font-medium rounded-md border"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CERTIFICATIONS & CREDENTIALS ── */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Rigorous Validation</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Credentials & Academic Background
            </h2>
            <p className="text-sm font-light mt-2" style={{ color: 'var(--text-muted)' }}>
              Combining analytical construction economics with advanced industry certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {credentials.map((cred, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl border flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                      {cred.issuer}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                      {cred.year}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold tracking-tight mb-2" style={{ color: 'var(--text-body)' }}>
                    {cred.title}
                  </h4>
                  <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {cred.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLIENT PERFORMANCE BENCHMARKS ── */}
        <div className="mb-32">
          <div 
            className="p-8 sm:p-12 rounded-2xl border shadow-xl text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>
                  Validated Outcomes
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  Client Performance Matrix
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  When marketing is engineered as an autonomous operating system rather than manual guesswork, business outcomes become predictable and compounding.
                </p>
                <div className="pt-2">
                  <Link
                    to="/resume"
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest hover:underline"
                    style={{ color: 'var(--accent-amber)' }}
                  >
                    View Complete Professional Resume <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                {performanceMetrics.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                      {stat.metric}
                    </div>
                    <div className="text-xs font-bold mt-1" style={{ color: 'var(--text-body)' }}>
                      {stat.label}
                    </div>
                    <div className="text-[10px] font-light mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CALL TO ACTION ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="rounded-2xl p-10 md:p-14 border shadow-xl text-left"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                System Deployment
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Ready to deploy an autonomous growth engine?
              </h3>
              <p className="text-base font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Let’s schedule a 30-minute discovery session to analyze your current marketing infrastructure and map out your automation roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 justify-center w-full lg:w-auto">
              <Link 
                to="/resume"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border text-sm font-bold hover:brightness-110 transition-all text-center"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                <FileDown size={16} />
                Download Resume
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg transition-all text-center"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Book Discovery Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
