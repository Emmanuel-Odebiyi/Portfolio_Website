import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, Bot, Cpu, Rocket, 
  Terminal, ShieldAlert, Sparkles, Check, CheckCircle2, ChevronRight,
  RefreshCw, Settings, Play, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

export default function MyStory() {
  // Simulator State
  const [simMode, setSimMode] = useState<'burnout' | 'autopilot'>('burnout');
  const [stressLevel, setStressLevel] = useState(40);
  const [tasksDone, setTasksDone] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sysLog, setSysLog] = useState<string[]>([]);
  const [clickForce, setClickForce] = useState<{ id: number; x: number; y: number }[]>([]);

  // Skill Terminal State
  const [activeTab, setActiveTab] = useState<'seo' | 'ai' | 'automation'>('seo');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isStreamingLog, setIsStreamingLog] = useState(false);

  // Manual Click handler for Stressed Mode
  const handleManualClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (simMode !== 'burnout') return;
    
    // Add floating task particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setClickForce((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setClickForce((prev) => prev.filter((item) => item.id !== id));
    }, 1000);

    // Update Simulator values
    setStressLevel((prev) => Math.min(prev + 8, 100));
    setTasksDone((prev) => prev + 1);
  };

  // Autopilot generator runner
  const startAutopilotSim = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setTasksDone(0);
    setSysLog([]);
    
    const logs = [
      '⚡ [n8n]: Initializing content generation schedule...',
      '🔍 [Semrush API]: Pulling top-ranking keywords for B2B SaaS...',
      '📈 [Strategy]: Assembling topic cluster tree (5 subtopics)...',
      '🤖 [OpenAI GPT-4o]: Drafting article drafts with verified brand voice...',
      '📄 [Hemingway Editor]: Analyzing readability rating... OK',
      '🎨 [SEO Checker]: Validating headers & metadata rules... PASS',
      '🚀 [WordPress API]: Publishing draft post automatically...',
      '✉️ [Make.com]: Cross-posting newsletter block to HubSpot...',
      '🐦 [Buffer API]: Scheduling distribution triggers (LinkedIn & X)...',
      '🎉 [Automation Hub]: Workflow completed. 40+ articles queued!'
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setSysLog((prev) => [...prev, logs[currentLog]]);
        setTasksDone((prev) => prev + 4);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 700);
  };

  // Skill Terminal Streams
  const runTerminalStream = (skillId: 'seo' | 'ai' | 'automation') => {
    setIsStreamingLog(true);
    setTerminalLogs([]);

    const streams = {
      seo: [
        'Connecting to Google Search Console API...',
        'Extracting raw query impression matrices...',
        'Evaluating topic cluster index points...',
        'Found competitor keyword gap: "B2B automation ROI frameworks" (KD: 24, SV: 1.2K/mo)',
        'Recommended Action: Construct Pillar Page + 4 Child posts',
        'Topical Authority Score increased by +12.4%'
      ],
      ai: [
        'Loading brand_voice_template.json (Persona: Editorial Tech Pro)...',
        'Calling OpenAI Chat Completion [model: gpt-4o-2024-05-13]...',
        'Streaming context layers and few-shot formatting tokens...',
        'System prompt instruction applied: "Avoid corporate fluff. Prioritize active voice."',
        'Running Editorial Quality Guard filters (Length check, cliché scan)...',
        'Draft validated against brand voice standards: 100% MATCH'
      ],
      automation: [
        'n8n workflow trigger received: cron_daily_0900_GMT',
        'Fetching unprocessed drafts from Airtable database...',
        'Posting raw content chunk to custom microservice...',
        'Tesseract OCR: extracting textual arrays from client slides... done',
        'Broadcasting distribution payload to HubSpot & Make webhook...',
        'Workflow execution complete (0 errors, execution time: 1.28s)'
      ]
    };

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < streams[skillId].length) {
        setTerminalLogs((prev) => [...prev, `> ${streams[skillId][idx]}`]);
        idx++;
      } else {
        clearInterval(interval);
        setIsStreamingLog(false);
      }
    }, 450);
  };

  useEffect(() => {
    runTerminalStream(activeTab);
  }, [activeTab]);

  // Burnout stress dissipation
  useEffect(() => {
    if (simMode !== 'burnout') return;
    const interval = setInterval(() => {
      setStressLevel((prev) => Math.max(prev - 2, 20));
    }, 1200);
    return () => clearInterval(interval);
  }, [simMode]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="My Story | Emmanuel Odebiyi"
        description="Discover how Emmanuel Odebiyi went from drowning in deadlines to building automated marketing engines that deliver 520% ROI on autopilot."
        keywords="emmanuel odebiyi story, content marketing transformation, AI automation journey, burnout to systems architect"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Navigation Tag */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link 
            to="/about" 
            className="inline-flex items-center gap-3 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
        </motion.div>
        
        {/* ── HERO: TRANSFORMATION ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh] pt-8">

          {/* LEFT: Story Hook */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-sans font-bold tracking-widest uppercase"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              The Origin Story
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-display"
                style={{ color: 'var(--text-body)' }}
              >
                The writer who got{' '}
                <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                  tired of grinding.
                </span>
                <br />
                So he built a{' '}
                <span className="italic font-medium" style={{ color: 'var(--cta-blue)' }}>
                  machine.
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl font-light leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              I went from drowning in deadlines and losing clients to pricing pressure — 
              to building automated marketing engines that deliver{' '}
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>520% ROI on autopilot.</strong>
              {' '}This is that story.
            </motion.p>

            {/* Transformation stat badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { val: '3 yrs', label: 'of building' },
                { val: '520%', label: 'avg ROI delivered' },
                { val: '0hrs', label: 'manual content work' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-base font-bold" style={{ color: 'var(--text-body)' }}>{b.val}</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest animate-none" style={{ color: 'var(--text-muted)' }}>{b.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base hover:brightness-110 shadow-2xl transition-all group"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Work With Me
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/my-approach"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border text-base transition-all font-bold hover:brightness-110"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                See My Methodology
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Transformation Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Card container */}
            <div className="relative rounded-[2rem] border backdrop-blur-xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>

              {/* Card top header */}
              <div className="flex items-center gap-2 p-5 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Emmanuel Odebiyi — Identity Log</span>
              </div>

              {/* Before / After toggle */}
              <div className="p-6 space-y-5">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('story-sim');
                      if (el) el.setAttribute('data-mode', 'before');
                      el?.querySelectorAll('[data-before]').forEach(e => (e as HTMLElement).style.display = 'flex');
                      el?.querySelectorAll('[data-after]').forEach(e => (e as HTMLElement).style.display = 'none');
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-sans font-bold tracking-widest uppercase border transition-all"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                  >
                    ⚠ Before — 2021
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('story-sim');
                      if (el) el.setAttribute('data-mode', 'after');
                      el?.querySelectorAll('[data-before]').forEach(e => (e as HTMLElement).style.display = 'none');
                      el?.querySelectorAll('[data-after]').forEach(e => (e as HTMLElement).style.display = 'flex');
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-sans font-bold tracking-widest uppercase border transition-all"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                  >
                    ✦ After — 2025
                  </button>
                </div>

                {/* State display */}
                <div id="story-sim" className="space-y-3">
                  {/* BEFORE stats */}
                  {[
                    { label: 'Stress Level', val: '94%', bar: 94, color: 'red', prefix: '🔥' },
                    { label: 'Articles / mo (manual)', val: '4', bar: 10, color: 'orange', prefix: '✍' },
                    { label: 'Revenue Predictability', val: '12%', bar: 12, color: 'red', prefix: '📉' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      data-before
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                        <span>{stat.prefix} {stat.label}</span>
                        <span style={{ color: 'var(--accent-amber)' }}>{stat.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.bar}%` }}
                          transition={{ delay: 0.9 + i * 0.1, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: 'var(--accent-amber)' }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* AFTER stats — hidden by default, shown via button */}
                  {[
                    { label: 'System Uptime', val: '99.9%', bar: 99, color: 'emerald', prefix: '⚡' },
                    { label: 'Articles / mo (automated)', val: '40+', bar: 100, color: 'blue', prefix: '🤖' },
                    { label: 'Client ROI Average', val: '520%', bar: 85, color: 'indigo', prefix: '📈' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      data-after
                      style={{ display: 'none' }}
                      className="flex flex-col gap-1.5"
                    >
                      <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                        <span>{stat.prefix} {stat.label}</span>
                        <span style={{ color: 'var(--accent-amber)' }}>{stat.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${stat.bar}%`, backgroundColor: 'var(--accent-amber)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Journey progress bar */}
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-[9px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    <span>Burnout Writer</span>
                    <span>Systems Architect</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--bg-page)' }}>
                    <motion.div
                      initial={{ width: '15%' }}
                      animate={{ width: '88%' }}
                      transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--accent-amber)' }}
                    />
                  </div>
                </div>

                {/* Floating achievement pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { text: '520% ROI' },
                    { text: 'n8n Certified' },
                    { text: '40+ articles/mo' },
                    { text: 'SEO Specialist' },
                  ].map((badge, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.08, duration: 0.4 }}
                      className="text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                    >
                      ✦ {badge.text}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>


        {/* ── INTERACTIVE SIMULATOR SECTION ── */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Context Pane */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Experience Simulator</span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-left" style={{ color: 'var(--text-body)' }}>
                Play the game. <br /> See the system.
              </h3>
              <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Most content marketers burn out trying to keep up. I burned out too — and then I reverse-engineered why, and built something better.
              </p>
              <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Growing businesses face a brutal contradiction: content marketing drives growth, but producing it consistently is expensive, time-consuming, and unsustainable.
              </p>
              <div 
                className="p-4 rounded-xl border font-bold text-base flex items-center gap-3"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                <div 
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 font-bold"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                >
                  <Check size={18} />
                </div>
                <span>I solve that exact problem.</span>
              </div>
            </div>

            {/* Right Simulator Card Box */}
            <div className="lg:col-span-7">
              <div 
                className="rounded-[2rem] border overflow-hidden shadow-2xl p-6 sm:p-8 relative"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                
                {/* Simulator Mode Header Slider */}
                <div 
                  className="flex p-1.5 rounded-full mb-8 relative border"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <button 
                    onClick={() => { setSimMode('burnout'); setTasksDone(0); }}
                    className="flex-1 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: simMode === 'burnout' ? 'var(--text-body)' : 'transparent',
                      color: simMode === 'burnout' ? 'var(--bg-page)' : 'var(--text-muted)'
                    }}
                  >
                    <AlertCircle size={16} />
                    Manual Burnout Hustle
                  </button>
                  <button 
                    onClick={() => { setSimMode('autopilot'); setTasksDone(0); }}
                    className="flex-1 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: simMode === 'autopilot' ? 'var(--text-body)' : 'transparent',
                      color: simMode === 'autopilot' ? 'var(--bg-page)' : 'var(--text-muted)'
                    }}
                  >
                    <Sparkles size={16} />
                    Autonomous Autopilot
                  </button>
                </div>

                {/* Simulator Display Screen */}
                <AnimatePresence mode="wait">
                  {simMode === 'burnout' ? (
                    <motion.div
                      key="burnout"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      {/* Stress Level Meter */}
                      <div 
                        className="p-6 rounded-2xl border space-y-3 relative overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                      >
                        <div className="flex justify-between items-center text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          <span>Burnout Stress Capacity</span>
                          <span style={{ color: 'var(--accent-amber)' }}>{stressLevel}%</span>
                        </div>
                        <div className="h-4 rounded-full overflow-hidden border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                          <motion.div 
                            className="h-full" 
                            style={{ backgroundColor: 'var(--accent-amber)' }}
                            animate={{ width: `${stressLevel}%` }}
                            transition={{ type: 'spring', stiffness: 80 }}
                          />
                        </div>
                        {stressLevel > 75 && (
                          <motion.p 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-2"
                            style={{ color: 'var(--accent-amber)' }}
                          >
                            <ShieldAlert size={12} /> CRITICAL LEVEL! BURN-OUT INEVITABLE.
                          </motion.p>
                        )}
                      </div>

                      {/* Click sandbox */}
                      <div 
                        className="h-40 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden text-center p-4"
                        style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
                      >
                        {stressLevel >= 100 ? (
                          <div className="space-y-2">
                            <span className="font-bold text-2xl tracking-tight block" style={{ color: 'var(--accent-amber)' }}>🔥 OVERLOAD COLLAPSE</span>
                            <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Deadlines missed. Client retainers lost. Creative energy fully empty.</p>
                            <button 
                              onClick={() => { setStressLevel(40); setTasksDone(0); }}
                              className="px-4 py-1.5 border rounded-lg text-xs font-sans font-bold uppercase tracking-widest transition-colors"
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            >
                              Restart Career Loop
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Active Manual Tasks Waiting</span>
                            <span className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{tasksDone} / 40</span>
                            <p className="text-xs font-light max-w-sm" style={{ color: 'var(--text-muted)' }}>Every draft is written manually. Press the button frantically to keep up!</p>
                          </div>
                        )}

                        {/* Floating task indicators */}
                        {clickForce.map((item) => (
                          <motion.span
                            key={item.id}
                            initial={{ opacity: 1, y: item.y, x: item.x, scale: 1 }}
                            animate={{ opacity: 0, y: item.y - 60, scale: 0.7 }}
                            transition={{ duration: 0.8 }}
                            className="absolute font-sans text-xs font-bold uppercase tracking-widest pointer-events-none select-none"
                            style={{ color: 'var(--accent-amber)' }}
                          >
                            📝 Write Draft (+8% Stress)
                          </motion.span>
                        ))}
                      </div>

                      {/* Execution triggers */}
                      <button 
                        onClick={handleManualClick}
                        disabled={stressLevel >= 100}
                        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 shadow-lg active:scale-95 transition-all uppercase tracking-widest font-sans disabled:opacity-50"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
                      >
                        <Play size={18} className="inline mr-2" />
                        Manual Content Spin-up!
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="autopilot"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      {/* Dashboard parameters */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Manual Effort</span>
                          <span className="text-lg font-bold" style={{ color: 'var(--accent-amber)' }}>0%</span>
                        </div>
                        <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Articles Done</span>
                          <span className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>{tasksDone} / 40</span>
                        </div>
                        <div className="p-4 rounded-xl border text-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>ROI Predictability</span>
                          <span className="text-lg font-bold" style={{ color: 'var(--cta-blue)' }}>520%</span>
                        </div>
                      </div>

                      {/* Log monitor screen */}
                      <div 
                        className="h-40 rounded-2xl border p-4 font-mono text-xs overflow-y-auto no-scrollbar space-y-1 text-left"
                        style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      >
                        {sysLog.length === 0 ? (
                          <div className="text-zinc-500 flex flex-col items-center justify-center h-full text-center p-4">
                            <Cpu className="mb-2 animate-spin" style={{ color: 'var(--accent-amber)', animationDuration: '4s' }} />
                            <span style={{ color: 'var(--text-muted)' }}>System is Idle. Click below to launch custom content micro-services.</span>
                          </div>
                        ) : (
                          sysLog.map((log, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="leading-relaxed border-l-2 pl-2 py-0.5"
                              style={{ borderLeftColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            >
                              {log}
                            </motion.div>
                          ))
                        )}
                      </div>

                      {/* Autopilot trigger button */}
                      <button 
                        onClick={startAutopilotSim}
                        disabled={isGenerating}
                        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 shadow-lg active:scale-95 transition-all uppercase tracking-widest font-sans disabled:opacity-50"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
                      >
                        <RefreshCw size={18} className={`inline mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                        Launch Automation Engine
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* ── SCROLL TIMELINE CHAPTERS ── */}
        <div className="mb-32 space-y-28 relative">
          {/* Timeline Center Line decorator */}
          <div className="hidden md:block absolute left-10 top-0 w-px h-full z-0" style={{ backgroundColor: 'var(--border-card)' }} />

          {/* Intro statement */}
          <div 
            className="p-8 md:p-12 rounded-[2rem] border shadow-2xl relative z-10 text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <blockquote className="font-light leading-relaxed text-lg md:text-xl max-w-4xl" style={{ color: 'var(--text-body)' }}>
              "I design and build automated marketing systems that deliver enterprise-level content output — without the enterprise price tag, the management overhead, or the constant scramble to keep things moving. <strong>Marketing that runs while you build. That's what I create.</strong>"
            </blockquote>
          </div>

          {/* Chapter 1 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10 text-left"
          >
            <div className="shrink-0 flex md:justify-center">
              <div 
                className="w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xl backdrop-blur-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Bot size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500" style={{ color: 'var(--text-muted)' }}>Chapter 01 — The Hustle</span>
              <h3 className="text-3xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>
                Where it started — falling in love with words and running into walls.
              </h3>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                I fell in love with writing right after secondary school. The idea that words could connect brands with the right people, earn trust, and drive real business outcomes — that felt like something worth mastering.
              </p>
              <div 
                className="border-l-4 pl-4 py-1 space-y-3 mt-4"
                style={{ borderLeftColor: 'var(--accent-amber)', backgroundColor: 'var(--bg-surface-alt)' }}
              >
                <h5 className="font-sans font-bold uppercase text-xs tracking-widest" style={{ color: 'var(--accent-amber)' }}>The Hard Reality</h5>
                <p className="font-light text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Budgets that didn't match the work. Clients who needed high volumes of content but couldn't afford the traditional way of getting it. Quality expectations that demanded more hours than were on the invoice. Constant deadline pressure with no sustainable system underneath any of it.
                </p>
                <span className="font-bold text-base block mt-2" style={{ color: 'var(--text-body)' }}>I was living the exact problem I now solve.</span>
              </div>
            </div>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10 text-left"
          >
            <div className="shrink-0 flex md:justify-center">
              <div 
                className="w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xl backdrop-blur-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Cpu size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Chapter 02 — The Observation</span>
              <h3 className="text-3xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>
                The pattern I couldn't ignore.
              </h3>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                As more projects came in, something became impossible to miss:
              </p>
              <div 
                className="p-6 rounded-2xl border grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                {[
                  { label: 'Freelancers', val: 'were unreliable' },
                  { label: 'Agencies', val: 'were out of budget' },
                  { label: 'In-House Teams', val: 'burned out the best people' },
                  { label: 'DIY Approach', val: 'meant it never got done' }
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
                    <span className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                      <strong className="font-bold" style={{ color: 'var(--text-body)' }}>{item.label}</strong> {item.val}
                    </span>
                  </div>
                ))}
              </div>
              <div 
                className="p-4 rounded-xl border font-bold mt-4 text-base"
                style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                The problem wasn't effort. The problem was that no one had built a real system.
              </div>
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10 text-left"
          >
            <div className="shrink-0 flex md:justify-center">
              <div 
                className="w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xl backdrop-blur-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Rocket size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-zinc-500" style={{ color: 'var(--text-muted)' }}>Chapter 03 — The Pivot</span>
              <h3 className="text-3xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>
                The turning point — when I stopped fearing AI and started building with it.
              </h3>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                When AI tools emerged, most content writers panicked. <strong className="font-bold" style={{ color: 'var(--text-body)' }}>I saw an opportunity.</strong>
              </p>
              <div 
                className="p-6 rounded-2xl border backdrop-blur-sm relative overflow-hidden mt-4"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <h5 className="font-bold text-base mb-2" style={{ color: 'var(--text-body)' }}>The Golden Question:</h5>
                <p className="font-light italic leading-relaxed text-base" style={{ color: 'var(--text-muted)' }}>
                  "What if you could combine AI's speed and scale with human strategy, brand understanding, and systematic processes? What if you could build something that actually ran — reliably, consistently, without constant babysitting?"
                </p>
                <span className="font-bold block mt-4 text-sm font-sans tracking-widest uppercase" style={{ color: 'var(--accent-amber)' }}>That question changed everything.</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── TECHNICAL MASTERY TERMINAL ── */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left"
          >
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Skill Engine</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-left" style={{ color: 'var(--text-body)' }}>Three years of building — so you don't have to.</h3>
            </div>
            <p className="font-light max-w-md text-left" style={{ color: 'var(--text-muted)' }}>
              I spent three years mastering the exact disciplines that make autonomous content marketing engines possible. Select a track below to run trace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector keys */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center text-left">
              <div 
                className="flex items-center gap-2 mb-2 px-4 py-2 rounded-xl border text-xs font-sans font-bold uppercase tracking-widest w-fit animate-pulse"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Sparkles size={12} />
                Click below to run trace ➔
              </div>
              {[
                { id: 'seo', title: 'SEO Expertise Core', desc: 'Making content discoverable & ranking.' },
                { id: 'ai', title: 'AI Implementation Core', desc: 'Configuring prompt logic & quality gates.' },
                { id: 'automation', title: 'Process Automation Core', desc: 'Orchestrating microservice ecosystems.' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="w-full text-left p-5 rounded-2xl transition-all duration-300 border group relative"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--bg-surface)' : 'var(--bg-page)',
                    borderColor: activeTab === tab.id ? 'var(--text-body)' : 'var(--border-card)',
                    color: activeTab === tab.id ? 'var(--text-body)' : 'var(--text-muted)'
                  }}
                >
                  <span className="text-[10px] font-sans font-bold block mb-1 uppercase tracking-widest opacity-60">0{tab.id === 'seo' ? '1' : tab.id === 'ai' ? '2' : '3'} // Node</span>
                  <div className="flex-1 pr-6">
                    <h4 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{tab.title}</h4>
                    <p className="text-xs font-light mt-1" style={{ color: 'var(--text-muted)' }}>{tab.desc}</p>
                  </div>
                  {activeTab !== tab.id && (
                    <div 
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest"
                      style={{ color: 'var(--accent-amber)' }}
                    >
                      Run <ArrowRight size={10} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Right code trace sandbox */}
            <div className="lg:col-span-8">
              <div 
                className="rounded-[2rem] border shadow-2xl p-6 sm:p-8 flex flex-col h-full justify-between font-mono relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                {/* Embedded Terminal Frame Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>developer@emmanuel.io:~</span>
                </div>

                {/* Stream Output */}
                <div className="space-y-2 min-h-48 text-sm text-left flex flex-col justify-start">
                  <AnimatePresence>
                    {terminalLogs.map((log, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={log.includes('FAIL') || log.includes('error') ? 'text-red-400 font-bold' : log.includes('PASS') || log.includes('100%') ? 'text-emerald-500 font-bold' : 'text-zinc-300'}
                        style={{ color: (log.includes('FAIL') || log.includes('error')) ? '' : (log.includes('PASS') || log.includes('100%')) ? '' : 'var(--text-body)' }}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isStreamingLog && (
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-4 mt-1" 
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                  )}
                </div>

                {/* Explanatory text block beneath sandbox */}
                <div className="border-t pt-6 mt-6" style={{ borderColor: 'var(--border-card)' }}>
                  <AnimatePresence mode="wait">
                    {activeTab === 'seo' && (
                      <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-sans text-sm font-light text-left leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        <strong className="font-bold" style={{ color: 'var(--text-body)' }}>SEO Expertise:</strong> Keyword research, on-page optimization, topic cluster architecture, and SERP analysis. Making sure content doesn't just exist — it ranks, hooks readers, and drives authority.
                      </motion.div>
                    )}
                    {activeTab === 'ai' && (
                      <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-sans text-sm font-light text-left leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        <strong className="font-bold" style={{ color: 'var(--text-body)' }}>AI Implementation:</strong> Prompt engineering, API orchestrations, automated editorial workflows, and brand voice validation gates. Scale output 10x without compromising brand standards.
                      </motion.div>
                    )}
                    {activeTab === 'automation' && (
                      <motion.div key="automation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-sans text-sm font-light text-left leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        <strong className="font-bold" style={{ color: 'var(--text-body)' }}>Business Process Automation:</strong> Constructing reliable cross-app pipelines using n8n, Zapier, Make, custom Python scripts, and REST APIs. Systems that operate like clockwork.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── TODAY'S MISSION & RESULTS BLOCK ── */}
        <div className="mb-32">
          <div 
            className="rounded-[2.5rem] border p-8 md:p-16 relative overflow-hidden shadow-2xl"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Mission text */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>The Objective</span>
                <h3 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight text-left" style={{ color: 'var(--text-body)' }}>
                  Today — on a <br /> clear mission.
                </h3>
                <p className="font-light leading-relaxed text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
                  I'm giving growing businesses access to the kind of marketing infrastructure that used to be reserved for companies with million-dollar budgets.
                </p>
                <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  These aren't projections. They're what I've delivered — for real businesses, with measurable results.
                </p>
                <div 
                  className="p-4 rounded-xl border font-bold text-base"
                  style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  Your marketing should run while you build. That's what I create.
                </div>
              </div>

              {/* Big Counters Dashboard */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { val: '520%', label: 'Average ROI', desc: 'delivered per system' },
                  { val: '65%', label: 'Traffic Growth', desc: 'achieved within 90 days' },
                  { val: '70%', label: 'Time Savings', desc: 'reclaimed weekly' }
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                    }}
                    className="p-6 rounded-2xl border flex flex-col justify-between text-center"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                  >
                    <span className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{stat.val}</span>
                    <div className="mt-4">
                      <strong className="text-sm font-bold block tracking-tight" style={{ color: 'var(--text-body)' }}>{stat.label}</strong>
                      <span className="text-[10px] font-light mt-1 block" style={{ color: 'var(--text-muted)' }}>{stat.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Premium Dual CTA block */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-[2.5rem] p-12 md:p-16 border overflow-hidden shadow-2xl text-left"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight" style={{ color: 'var(--text-body)' }}>
                Ready to Stop Burning Out?
              </h3>
              <p className="text-lg font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Let's discuss how we can build a scalable marketing autopilot engine customized for your product or brand.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              <Link 
                to="/resume"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl font-bold hover:brightness-110 transition-all text-center group border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                View Detailed Resume
              </Link>

              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl font-bold hover:brightness-110 shadow-lg transition-all text-center group"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Book a Free Call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
