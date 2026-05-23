import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Zap, Bot, Search, Cpu, Globe, Rocket, 
  Terminal, ShieldAlert, Sparkles, Check, CheckCircle2, ChevronRight,
  TrendingUp, RefreshCw, Layers, Settings, Activity, Play, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      
      {/* Dynamic Mesh Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-15%] w-[65vw] h-[65vw] bg-blue-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Navigation Tag */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link to="/about" className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
        </motion.div>
        
        {/* Hero Section */}
        <div className="mb-24 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient animate-pulse" />
            The Origin Story
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white mb-8"
          >
            I Used to Be <br className="hidden sm:block" /> the Burnout. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400">
              Now I Build the Systems.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl"
          >
            I went from drowning in deadlines to designing automated marketing engines that deliver 520% ROI — and now I build them for businesses like yours.
          </motion.p>
        </div>

        {/* ── INTERACTIVE BRAIN-BUSTING SIMULATOR SECTION ── */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Context Pane */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">Experience Simulator</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Play the Game. <br /> See the System.
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                Most content marketers burn out trying to keep up. I burned out too — and then I reverse-engineered why, and built something better.
              </p>
              <p className="text-zinc-400 font-light leading-relaxed">
                Growing businesses face a brutal contradiction: content marketing drives growth, but producing it consistently is expensive, time-consuming, and unsustainable.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-white text-base flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check size={18} />
                </div>
                <span>I solve that exact problem.</span>
              </div>
            </div>

            {/* Right Simulator Card Box */}
            <div className="lg:col-span-7">
              <div className="rounded-[2.5rem] bg-zinc-950/70 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl p-6 sm:p-8 relative">
                
                {/* Simulator Mode Header Slider */}
                <div className="flex bg-white/5 p-1.5 rounded-full mb-8 relative border border-white/5">
                  <button 
                    onClick={() => { setSimMode('burnout'); setTasksDone(0); }}
                    className={`flex-1 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center justify-center gap-2 ${simMode === 'burnout' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <AlertCircle size={16} />
                    Manual Burnout Hustle
                  </button>
                  <button 
                    onClick={() => { setSimMode('autopilot'); setTasksDone(0); }}
                    className={`flex-1 py-3 rounded-full text-sm font-bold transition-all relative z-10 flex items-center justify-center gap-2 ${simMode === 'autopilot' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
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
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden">
                        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-zinc-400">
                          <span>Burnout Stress Capacity</span>
                          <span className={stressLevel > 75 ? 'text-red-500 font-bold' : ''}>{stressLevel}%</span>
                        </div>
                        <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-600" 
                            animate={{ width: `${stressLevel}%` }}
                            transition={{ type: 'spring', stiffness: 80 }}
                          />
                        </div>
                        {stressLevel > 75 && (
                          <motion.p 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-red-500 text-xs font-mono uppercase flex items-center gap-2"
                          >
                            <ShieldAlert size={12} /> CRITICAL LEVEL! BURN-OUT INEVITABLE.
                          </motion.p>
                        )}
                      </div>

                      {/* Click sandbox */}
                      <div className="h-40 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
                        {stressLevel >= 100 ? (
                          <div className="space-y-2">
                            <span className="text-red-500 font-black text-2xl tracking-tight block">🔥 OVERLOAD COLLAPSE</span>
                            <p className="text-xs text-zinc-400 font-light">Deadlines missed. Client retainers lost. Creative energy fully empty.</p>
                            <button 
                              onClick={() => { setStressLevel(40); setTasksDone(0); }}
                              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                            >
                              Restart Career Loop
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Active Manual Tasks Waiting</span>
                            <span className="text-white text-3xl font-black">{tasksDone} / 40</span>
                            <p className="text-xs text-zinc-400 font-light max-w-sm">Every draft is written manually. Press the button frantically to keep up!</p>
                          </div>
                        )}

                        {/* Floating task indicators */}
                        {clickForce.map((item) => (
                          <motion.span
                            key={item.id}
                            initial={{ opacity: 1, y: item.y, x: item.x, scale: 1 }}
                            animate={{ opacity: 0, y: item.y - 60, scale: 0.7 }}
                            transition={{ duration: 0.8 }}
                            className="absolute font-mono text-xs font-bold text-red-400 pointer-events-none select-none"
                          >
                            📝 Write Draft (+8% Stress)
                          </motion.span>
                        ))}
                      </div>

                      {/* Execution triggers */}
                      <button 
                        onClick={handleManualClick}
                        disabled={stressLevel >= 100}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-base hover:brightness-110 shadow-lg shadow-red-500/20 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        <Play size={18} />
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
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Manual Effort</span>
                          <span className="text-lg font-black text-emerald-400">0%</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Articles Done</span>
                          <span className="text-lg font-black text-white">{tasksDone} / 40</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">ROI Predictability</span>
                          <span className="text-lg font-black text-blue-400">520%</span>
                        </div>
                      </div>

                      {/* Log monitor screen */}
                      <div className="h-40 rounded-2xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-blue-400 overflow-y-auto no-scrollbar space-y-1 text-left">
                        {sysLog.length === 0 ? (
                          <div className="text-zinc-500 flex flex-col items-center justify-center h-full text-center p-4">
                            <Cpu className="text-zinc-600 mb-2 animate-spin" style={{ animationDuration: '4s' }} />
                            <span>System is Idle. Click below to launch custom content micro-services.</span>
                          </div>
                        ) : (
                          sysLog.map((log, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="leading-relaxed border-l-2 border-blue-500/30 pl-2 py-0.5"
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
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:brightness-110 shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
                        Launch Automation Engine
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* ── SCROLL TIMELINE CHAPTERS (Using Rewritten Copy) ── */}
        <div className="mb-32 space-y-28 relative">
          {/* Timeline Center Line decorator */}
          <div className="hidden md:block absolute left-10 top-0 w-px h-full bg-gradient-to-b from-blue-500/40 via-purple-500/10 to-transparent z-0" />

          {/* Intro statement */}
          <div className="p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative z-10">
            <h4 className="text-zinc-300 font-light leading-relaxed text-lg md:text-xl max-w-4xl">
              "I design and build automated marketing systems that deliver enterprise-level content output — without the enterprise price tag, the management overhead, or the constant scramble to keep things moving. <strong>Marketing that runs while you build. That's what I create.</strong>"
            </h4>
          </div>

          {/* Chapter 1 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10"
          >
            <div className="shrink-0 flex md:justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shadow-xl backdrop-blur-md">
                <Search size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Chapter 01 — The Hustle</span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-snug">
                Where It Started — Falling in Love with Words and Running Into Walls
              </h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                I fell in love with writing right after secondary school. The idea that words could connect brands with the right people, earn trust, and drive real business outcomes — that felt like something worth mastering.
              </p>
              <div className="border-l-4 border-red-500/50 pl-4 py-1 space-y-3 mt-4">
                <h5 className="font-bold text-white uppercase text-xs tracking-wider text-red-400">The Hard Reality</h5>
                <p className="text-zinc-400 font-light text-base leading-relaxed">
                  Budgets that didn't match the work. Clients who needed high volumes of content but couldn't afford the traditional way of getting it. Quality expectations that demanded more hours than were on the invoice. Constant deadline pressure with no sustainable system underneath any of it.
                </p>
                <span className="text-white font-semibold text-base block mt-2">I was living the exact problem I now solve.</span>
              </div>
            </div>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10"
          >
            <div className="shrink-0 flex md:justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shadow-xl backdrop-blur-md">
                <Activity size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Chapter 02 — The Observation</span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-snug">
                The Pattern I Couldn't Ignore
              </h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                As more projects came in, something became impossible to miss:
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {[
                  { label: 'Freelancers', val: 'were unreliable' },
                  { label: 'Agencies', val: 'were out of budget' },
                  { label: 'In-House Teams', val: 'burned out the best people' },
                  { label: 'DIY Approach', val: 'meant it never got done' }
                ].map((item) => (
                  <div key={item.label} className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-sm font-light text-zinc-300">
                      <strong className="font-bold text-white">{item.label}</strong> {item.val}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 font-bold text-amber-400 mt-4 text-base">
                The problem wasn't effort. The problem was that no one had built a real system.
              </div>
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-16 relative z-10"
          >
            <div className="shrink-0 flex md:justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shadow-xl backdrop-blur-md">
                <Bot size={28} />
              </div>
            </div>
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Chapter 03 — The Pivot</span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-snug">
                The Turning Point — When I Stopped Fearing AI and Started Building With It
              </h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                When AI tools emerged, most content writers panicked. <strong className="text-white">I saw an opportunity.</strong>
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden mt-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
                <h5 className="font-bold text-white text-base mb-2">The Golden Question:</h5>
                <p className="text-zinc-300 font-light italic leading-relaxed text-base">
                  "What if you could combine AI's speed and scale with human strategy, brand understanding, and systematic processes? What if you could build something that actually ran — reliably, consistently, without constant babysitting?"
                </p>
                <span className="text-purple-400 font-bold block mt-4 text-sm font-mono tracking-widest uppercase">That question changed everything.</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── TECHNICAL MASTERY TERMINAL (Interactive Sandbox) ── */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-sm font-mono text-zinc-500 tracking-[0.25em] uppercase mb-3">Skill Engine</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Three Years of Building — So You Don't Have To</h3>
            </div>
            <p className="text-zinc-400 font-light max-w-md">
              I spent three years mastering the exact disciplines that make autonomous content marketing engines possible. Select a track below to run trace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left selector keys */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {[
                { id: 'seo', title: 'SEO Expertise Core', desc: 'Making content discoverable & ranking.', color: 'border-blue-500/30 hover:border-blue-500 text-blue-400 bg-blue-500/5' },
                { id: 'ai', title: 'AI Implementation Core', desc: 'Configuring prompt logic & quality gates.', color: 'border-purple-500/30 hover:border-purple-500 text-purple-400 bg-purple-500/5' },
                { id: 'automation', title: 'Process Automation Core', desc: 'Orchestrating microservice ecosystems.', color: 'border-teal-500/30 hover:border-teal-500 text-teal-400 bg-teal-500/5' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                    activeTab === tab.id
                      ? 'bg-white/10 border-white/30 text-white font-bold shadow-xl'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-mono block mb-1 uppercase tracking-widest opacity-60">0{tab.id === 'seo' ? '1' : tab.id === 'ai' ? '2' : '3'} // Node</span>
                  <h4 className="text-lg font-bold text-white tracking-tight">{tab.title}</h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">{tab.desc}</p>
                </button>
              ))}
            </div>

            {/* Right code trace sandbox */}
            <div className="lg:col-span-8">
              <div className="rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-2xl p-6 sm:p-8 flex flex-col h-full justify-between font-mono relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                {/* Embedded Terminal Frame Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">developer@emmanuel.io:~</span>
                </div>

                {/* Stream Output */}
                <div className="space-y-2 min-h-48 text-sm text-left flex flex-col justify-start">
                  <AnimatePresence>
                    {terminalLogs.map((log, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={log.includes('FAIL') || log.includes('error') ? 'text-red-400' : log.includes('PASS') || log.includes('100%') ? 'text-emerald-400' : 'text-zinc-300'}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isStreamingLog && (
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-4 bg-zinc-400 mt-1" 
                    />
                  )}
                </div>

                {/* Explanatory text block beneath sandbox */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'seo' && (
                      <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400 font-sans text-sm font-light text-left leading-relaxed">
                        <strong className="text-white font-bold">SEO Expertise:</strong> Keyword research, on-page optimization, topic cluster architecture, and SERP analysis. Making sure content doesn't just exist — it ranks, hooks readers, and drives authority.
                      </motion.div>
                    )}
                    {activeTab === 'ai' && (
                      <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400 font-sans text-sm font-light text-left leading-relaxed">
                        <strong className="text-white font-bold">AI Implementation:</strong> Prompt engineering, API orchestrations, automated editorial workflows, and brand voice validation gates. Scale output 10x without compromising brand standards.
                      </motion.div>
                    )}
                    {activeTab === 'automation' && (
                      <motion.div key="automation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400 font-sans text-sm font-light text-left leading-relaxed">
                        <strong className="text-white font-bold">Business Process Automation:</strong> Constructing reliable cross-app pipelines using n8n, Zapier, Make, custom Python scripts, and REST APIs. Systems that operate like clockwork.
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
          <div className="rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Mission text */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] block animate-pulse">The Objective</span>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Today — On a <br /> Clear Mission.
                </h3>
                <p className="text-zinc-300 font-light leading-relaxed text-base sm:text-lg">
                  I'm giving growing businesses access to the kind of marketing infrastructure that used to be reserved for companies with million-dollar budgets.
                </p>
                <p className="text-zinc-400 font-light leading-relaxed">
                  These aren't projections. They're what I've delivered — for real businesses, with measurable results.
                </p>
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 font-bold text-white text-base">
                  Your marketing should run while you build. That's what I create.
                </div>
              </div>

              {/* Big Counters Dashboard */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { val: '520%', label: 'Average ROI', desc: 'delivered per system', color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-400' },
                  { val: '65%', label: 'Traffic Growth', desc: 'achieved within 90 days', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400' },
                  { val: '70%', label: 'Time Savings', desc: 'reclaimed weekly', color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/30 text-teal-400' }
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                    }}
                    className={`p-6 rounded-2xl border bg-gradient-to-br ${stat.color} flex flex-col justify-between text-center`}
                  >
                    <span className="text-3xl font-black text-white">{stat.val}</span>
                    <div className="mt-4">
                      <strong className="text-sm font-bold text-white block tracking-tight">{stat.label}</strong>
                      <span className="text-[10px] text-zinc-400 font-light mt-1 block">{stat.desc}</span>
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
          className="relative rounded-[3rem] p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Stop Burning Out?
              </h3>
              <p className="text-lg text-zinc-400 font-light max-w-xl">
                Let's discuss how we can build a scalable marketing autopilot engine customized for your product or brand.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              <Link 
                to="/resume"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all text-center group"
              >
                View Detailed Resume
              </Link>

              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-brand-gradient text-white font-bold hover:brightness-110 shadow-lg shadow-indigo-500/25 transition-all text-center group"
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
