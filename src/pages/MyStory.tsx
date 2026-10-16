import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, Bot, Cpu, Rocket, 
  Terminal, Sparkles, Check, CheckCircle2, ChevronRight,
  TrendingUp, ShieldCheck, Database, Layers, Compass, Clock, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
};

interface ComparisonRow {
  aspect: string;
  manual: string;
  automated: string;
}

const comparisonLedger: ComparisonRow[] = [
  {
    aspect: 'Operating Model',
    manual: 'Linear effort-to-output. Writing every paragraph, title, and metadata field manually. Trapped in time-for-money billing.',
    automated: 'Modular pipeline architecture. Automated research scraping, structured prompt chaining, and direct CMS staging.'
  },
  {
    aspect: 'Production Capacity',
    manual: '4 to 6 long-form articles per month before severe creative fatigue and quality decline set in.',
    automated: '40+ authoritative, multi-channel assets queued per month with zero degradation in editorial quality.'
  },
  {
    aspect: 'Time Allocation',
    manual: '55–65+ hours weekly on manual typing, repetitive formatting, image uploads, and admin overhead.',
    automated: '4–6 hours weekly focused strictly on high-level editorial review, narrative tuning, and pipeline optimization.'
  },
  {
    aspect: 'Quality & Governance',
    manual: 'Erratic variance. Rushed deadlines cause missed typos, inconsistent brand voice, and shallow depth.',
    automated: 'Strict multi-stage guardrails. Automated readability scoring, brand voice calibration, and fact-check validation.'
  },
  {
    aspect: 'Business ROI',
    manual: 'High client churn, unpredictable monthly retainers, and constant pricing friction against low-cost agencies.',
    automated: 'Predictable 12+ month client retention with an audited 520% average ROI delivered across accounts.'
  }
];

export default function MyStory() {
  // Terminal state
  const [activeTab, setActiveTab] = useState<'seo' | 'ai' | 'automation'>('seo');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isStreamingLog, setIsStreamingLog] = useState(false);
  const [isTerminalAutoCycling, setIsTerminalAutoCycling] = useState(true);
  const [terminalProgress, setTerminalProgress] = useState(0);

  const runTerminalStream = (skillId: 'seo' | 'ai' | 'automation') => {
    setIsStreamingLog(true);
    setTerminalLogs([]);

    const streams = {
      seo: [
        'Connecting to Google Search Console API [Telemetry Endpoint]...',
        'Extracting query impression matrices and cannibalization clusters...',
        'Evaluating high-intent search gaps: "B2B automation ROI frameworks"...',
        'Competitor SERP audit complete: 1,200/mo search volume (Keyword Difficulty: 24)',
        'Synthesizing 1 Pillar Blueprint + 4 Supporting Semantic Cluster Nodes...',
        'Status: Topical Authority score projected to increase +14.2% within 60 days.'
      ],
      ai: [
        'Loading brand_voice_taxonomy.json [Tone: Editorial Authority & Precision]...',
        'Executing multi-pass prompt chain via OpenAI GPT-4o API...',
        'Streaming domain context and negative prompt constraints (Zero Corporate Clichés)...',
        'Running Editorial Quality Guard: Readability Target = Grade 8.2 (Hemingway Index)...',
        'Passing through Brand Voice Validation Filters: 100% Parameter Match.',
        'Status: High-authority draft generated with complete data citations.'
      ],
      automation: [
        'n8n orchestration workflow triggered: cron_daily_0900_GMT...',
        'Ingesting validated draft payloads from Airtable Database...',
        'Converting markdown structures to native CMS blocks (WordPress & Webflow REST API)...',
        'Executing Tesseract OCR extraction on client technical diagrams... Complete.',
        'Dispatching omnichannel syndication hooks to HubSpot, LinkedIn, and Email Subscribers...',
        'Status: Pipeline execution finished in 1.42s (0 errors logged).'
      ]
    };

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < streams[skillId].length) {
        setTerminalLogs((prev) => [...prev, streams[skillId][idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsStreamingLog(false);
      }
    }, 400);

    return interval;
  };

  useEffect(() => {
    const interval = runTerminalStream(activeTab);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTab]);

  useEffect(() => {
    if (!isTerminalAutoCycling) {
      setTerminalProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setTerminalProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => {
            const tabs: ('seo' | 'ai' | 'automation')[] = ['seo', 'ai', 'automation'];
            const nextIdx = (tabs.indexOf(current) + 1) % tabs.length;
            return tabs[nextIdx];
          });
          return 0;
        }
        return prev + 2.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isTerminalAutoCycling]);

  return (
    <div className="min-h-screen relative overflow-x-clip" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="My Story | Emmanuel Odebiyi"
        description="From hitting the freelance ceiling to building automated marketing engines that deliver 520% ROI. The evolution of Emmanuel Odebiyi from manual copywriter to systems architect."
        keywords="emmanuel odebiyi story, content marketing transformation, AI automation journey, systems architect, B2B content pipeline"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Navigation */}
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
            The Origin & Evolution
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] font-display mb-8"
            style={{ color: 'var(--text-body)' }}
          >
            The writer who hit the wall. <br />
            <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
              And engineered a way through.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            I spent years trading hours for words — battling 2 AM deadlines, chasing invoices, and watching manual effort get overwhelmed by demand. Here is how I dismantled the freelance treadmill and built autonomous marketing pipelines that deliver <strong className="font-bold" style={{ color: 'var(--text-body)' }}>520% average client ROI</strong>.
          </motion.p>

          {/* Quick Metrics Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12"
          >
            {[
              { val: '3+ Years', label: 'Systems Engineering' },
              { val: '520%', label: 'Audited Average ROI' },
              { val: '0 Hours', label: 'Manual Repetition' },
              { val: '40+ Pieces', label: 'Monthly Asset Output' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl border text-center"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-xl sm:text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{stat.val}</div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
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
              Discuss Your Project
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/my-approach"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border text-sm font-bold hover:brightness-110 transition-all"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            >
              Inspect My Methodology
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* ── BEFORE VS. AFTER COMPARISON LEDGER ── */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>The Operational Shift</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Manual Grind vs. The Autonomous Engine
            </h2>
            <p className="text-sm font-light mt-2" style={{ color: 'var(--text-muted)' }}>
              A side-by-side audit of how systemic automation transforms velocity, reliability, and business outcomes.
            </p>
          </div>

          <div 
            className="rounded-2xl border overflow-hidden shadow-xl"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            {/* Table Header */}
            <div 
              className="grid grid-cols-1 md:grid-cols-12 border-b text-xs font-sans font-bold uppercase tracking-widest"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-page)' }}
            >
              <div className="p-4 md:col-span-3 text-left" style={{ color: 'var(--text-muted)' }}>Dimension</div>
              <div className="p-4 md:col-span-4 text-left border-t md:border-t-0 md:border-l" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                Manual Freelance Hustle (2020–2022)
              </div>
              <div className="p-4 md:col-span-5 text-left border-t md:border-t-0 md:border-l" style={{ borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                ✦ Autonomous Production Engine (2023–Present)
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y" style={{ borderColor: 'var(--border-card)' }}>
              {comparisonLedger.map((row, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div className="p-4 md:p-5 md:col-span-3 font-bold text-sm text-left flex items-center" style={{ color: 'var(--text-body)' }}>
                    {row.aspect}
                  </div>
                  <div className="p-4 md:p-5 md:col-span-4 text-sm font-light text-left border-t md:border-t-0 md:border-l leading-relaxed" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                    {row.manual}
                  </div>
                  <div className="p-4 md:p-5 md:col-span-5 text-sm font-normal text-left border-t md:border-t-0 md:border-l leading-relaxed" style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                      <span>{row.automated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ledger Takeaway Footer */}
            <div 
              className="p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
            >
              <span className="font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Result: 10x throughput with 90% less operational friction.
              </span>
              <span className="font-bold flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                <TrendingUp size={14} /> Proven across B2B SaaS, Professional Services & Technical Content
              </span>
            </div>
          </div>
        </div>

        {/* ── 4-CHAPTER NARRATIVE TIMELINE ── */}
        <div className="mb-32 space-y-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>The Detailed Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Four Chapters of Transformation
            </h2>
            <p className="text-sm font-light mt-2" style={{ color: 'var(--text-muted)' }}>
              From structural cost estimation in Osogbo to enterprise marketing pipelines.
            </p>
          </div>

          {/* Chapter 01 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="p-8 sm:p-12 rounded-2xl border shadow-xl relative overflow-hidden text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    Chapter 01
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    The Foundation & Osogbo
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  Quantity Surveying & The Economics of Words
                </h3>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  My professional journey didn’t begin in an advertising agency. It began in classrooms studying Quantity Surveying and Construction Economics at Obafemi Awolowo University. In construction, there is zero tolerance for guesswork. Every foundation requires exact calculations: cost estimating, bill of quantities, structural stress tolerances, and material efficiency.
                </p>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  When I started writing professionally, I realized the broader creative marketing industry was treating content like romantic guesswork. Nobody was treating content as load-bearing structural material designed to support commercial pipeline weight. That analytical background became my unfair advantage.
                </p>
              </div>

              <div 
                className="lg:w-80 p-6 rounded-xl border shrink-0 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                    <Compass size={14} /> Core Realization
                  </div>
                  <blockquote className="text-sm font-medium italic leading-snug" style={{ color: 'var(--text-body)' }}>
                    "Words connect ideas to capital. But without an engineered foundation, even the most poetic copy collapses under market pressure."
                  </blockquote>
                </div>
                <div className="mt-6 pt-4 border-t text-[10px] font-sans font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  Discipline: Structural Cost Economics
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapter 02 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="p-8 sm:p-12 rounded-2xl border shadow-xl relative overflow-hidden text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    Chapter 02
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    2020 – 2022
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  The Freelance Ceiling & The 2:00 AM Crisis
                </h3>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  By 2021, I was writing for tech startups and B2B SaaS firms around the world. On paper, it was working: my client list was growing, and demand was high. In reality, I was drowning. Writing 40,000 to 50,000 words each month by hand meant 14-hour workdays, staring at blank Google Docs at 2:00 AM, battling creative exhaustion, and sacrificing weekends.
                </p>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  When clients asked for more volume to support rapid product launches, I had to say no. When I charged higher rates to match the time required, I met friction against low-cost offshore agencies. I hit the inescapable physical ceiling of manual labor: <em>you cannot scale a business when you are the single point of failure.</em>
                </p>
              </div>

              <div 
                className="lg:w-80 p-6 rounded-xl border shrink-0 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                    <Clock size={14} /> The Bottleneck
                  </div>
                  <blockquote className="text-sm font-medium italic leading-snug" style={{ color: 'var(--text-body)' }}>
                    "Effort has a hard biological limit. If your growth depends solely on typing faster, you have built a cage, not a business."
                  </blockquote>
                </div>
                <div className="mt-6 pt-4 border-t text-[10px] font-sans font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  Friction: The 24-Hour Physical Ceiling
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapter 03 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="p-8 sm:p-12 rounded-2xl border shadow-xl relative overflow-hidden text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    Chapter 03
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    November 2022 – 2023
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  The Automation Epiphany: Reverse-Engineering AI
                </h3>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  When large language models erupted into the mainstream in late 2022, freelance writers responded with either existential dread or lazy complacency. Most simply used generic prompts like "write me a 1,000-word blog post," flooding the web with robotic, cliché-ridden fluff that sounded like every other SaaS landing page.
                </p>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  I saw a fundamentally different opportunity. The model was not the final product; it was merely the raw electrical current. To harness it, you needed an industrial pipeline. I invested heavily in mastering n8n workflow orchestration, Python scripting, REST APIs, Semrush data extraction, and multi-tier prompt chaining. I created automated guardrails that audited tone, banned corporate jargon, verified data points, and preserved human brand nuance at scale.
                </p>
              </div>

              <div 
                className="lg:w-80 p-6 rounded-xl border shrink-0 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                    <Zap size={14} /> The Paradigm Shift
                  </div>
                  <blockquote className="text-sm font-medium italic leading-snug" style={{ color: 'var(--text-body)' }}>
                    "I didn't need software that typed faster. I needed an autonomous factory that operated reliably while I focused on strategy."
                  </blockquote>
                </div>
                <div className="mt-6 pt-4 border-t text-[10px] font-sans font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  Stack: n8n, Python, OpenAI, Webhooks
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapter 04 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="p-8 sm:p-12 rounded-2xl border shadow-xl relative overflow-hidden text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                    Chapter 04
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    Present Day
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  The Systems Architect: 520% ROI & Closed-Loop Attribution
                </h3>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Today, I no longer sell one-off articles or hours on a clock. I partner with growth-minded founders, technology executives, and high-impact brands as a Marketing Systems Architect. I build custom Growth Intelligence Labs that connect search intent discovery directly to automated production, publishing, and analytics attribution.
                </p>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Our results speak for themselves: client campaigns consistently generate 50% to 65% organic traffic expansion in under 90 days, reclaiming 15+ hours of leadership time every week, while delivering an audited 520% average ROI. Marketing is no longer an unpredictable expense — it is an automated, self-sustaining revenue engine.
                </p>
              </div>

              <div 
                className="lg:w-80 p-6 rounded-xl border shrink-0 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                    <ShieldCheck size={14} /> The Result
                  </div>
                  <blockquote className="text-sm font-medium italic leading-snug" style={{ color: 'var(--text-body)' }}>
                    "Content marketing is no longer a cost center or a manual grind. It is an engineered revenue asset that compounds over time."
                  </blockquote>
                </div>
                <div className="mt-6 pt-4 border-t text-[10px] font-sans font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  Outcome: Autonomous Growth Infrastructure
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── TECHNICAL MASTERY TERMINAL ── */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left"
          >
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>Architectural Telemetry</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Under the Hood: The Engine in Motion
              </h2>
            </div>
            <p className="font-light max-w-md text-left text-sm" style={{ color: 'var(--text-muted)' }}>
              Explore the real-time execution traces powering my autonomous marketing systems across search intelligence, prompt engineering, and pipeline automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left selector buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center text-left">
              <div 
                className="flex items-center gap-2 mb-1 px-3.5 py-1.5 rounded-lg border text-xs font-sans font-bold uppercase tracking-widest w-fit"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Sparkles size={12} className={isTerminalAutoCycling ? "animate-spin" : ""} style={{ animationDuration: '4s' }} />
                <span>{isTerminalAutoCycling ? "Telemetry Stream Active" : "Interactive Inspection"}</span>
              </div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                Select a discipline to inspect its live execution stream:
              </p>
              {[
                { id: 'seo', num: '01', title: 'SEO & SERP Cluster Engine', desc: 'Google Search Console, keyword gap matrices, and topical maps.' },
                { id: 'ai', num: '02', title: 'AI Brand Voice & Quality Gates', desc: 'Context layering, Hemingway scoring, and zero-cliché guardrails.' },
                { id: 'automation', num: '03', title: 'Pipeline Orchestration Engine', desc: 'n8n microservices, Airtable database sync, and CMS staging.' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsTerminalAutoCycling(false);
                  }}
                  className="w-full text-left p-4 rounded-xl transition-all duration-200 border group relative overflow-hidden"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--bg-surface)' : 'var(--bg-page)',
                    borderColor: activeTab === tab.id ? 'var(--text-body)' : 'var(--border-card)',
                    color: activeTab === tab.id ? 'var(--text-body)' : 'var(--text-muted)'
                  }}
                >
                  <span className="text-[10px] font-sans font-bold block mb-1 uppercase tracking-widest opacity-60">
                    Module {tab.num}
                  </span>
                  <div className="flex-1 pr-4">
                    <h4 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{tab.title}</h4>
                    <p className="text-xs font-light mt-1" style={{ color: 'var(--text-muted)' }}>{tab.desc}</p>
                  </div>
                  {activeTab === tab.id && isTerminalAutoCycling && (
                    <div className="absolute bottom-0 left-0 h-1 bg-[var(--accent-amber)] transition-all duration-100" style={{ width: `${terminalProgress}%` }} />
                  )}
                </button>
              ))}
            </div>

            {/* Right code trace sandbox */}
            <div className="lg:col-span-8">
              <div 
                className="rounded-2xl border shadow-xl p-6 flex flex-col h-full justify-between font-mono relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                {/* Embedded Terminal Frame Header */}
                <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    pipeline-daemon // emmanuel.architecture.local
                  </span>
                </div>

                {/* Stream Output */}
                <div className="space-y-2 min-h-48 text-xs text-left flex flex-col justify-start">
                  <AnimatePresence>
                    {terminalLogs.map((log, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={log.includes('100%') || log.includes('Complete') || log.includes('projected') ? 'text-emerald-500 font-bold' : 'text-zinc-300'}
                        style={{ color: (log.includes('100%') || log.includes('Complete') || log.includes('projected')) ? '' : 'var(--text-body)' }}
                      >
                        <span className="text-zinc-500 mr-2">&gt;</span>{log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isStreamingLog && (
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-3.5 mt-1" 
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                  )}
                </div>

                {/* Explanatory footer */}
                <div className="border-t pt-4 mt-4 font-sans text-xs font-light text-left leading-relaxed" style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  {activeTab === 'seo' && (
                    <div><strong className="font-bold" style={{ color: 'var(--text-body)' }}>Search Engine Intelligence:</strong> We systematically identify commercial-intent queries with high business value, eliminating random guesswork through structural topical mapping.</div>
                  )}
                  {activeTab === 'ai' && (
                    <div><strong className="font-bold" style={{ color: 'var(--text-body)' }}>Editorial Quality Guardrails:</strong> Every AI-generated asset is constrained by strict multi-step prompt chains, readability indexes, and human review gates to protect brand trust.</div>
                  )}
                  {activeTab === 'automation' && (
                    <div><strong className="font-bold" style={{ color: 'var(--text-body)' }}>Autonomous Pipeline Infrastructure:</strong> Connecting data stores to CMS deployments with zero manual copy-pasting, reducing distribution cycle time by over 90%.</div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── CTA PORTAL BLOCK ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="rounded-2xl p-10 md:p-14 border shadow-xl text-left"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                Next Step
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Ready to replace manual grind with scalable architecture?
              </h3>
              <p className="text-base font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Let’s analyze your current content production bottlenecks and build an autonomous engine tailored to your team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 justify-center w-full lg:w-auto">
              <Link 
                to="/my-approach"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border text-sm font-bold hover:brightness-110 transition-all text-center"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                Inspect Methodology
                <ChevronRight size={16} />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg transition-all text-center"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Schedule Architecture Call
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
