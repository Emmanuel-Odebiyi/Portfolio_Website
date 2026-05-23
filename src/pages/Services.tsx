import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, Search, Cpu, Layers, ArrowRight, CheckCircle2, Workflow,
  Plus, Minus, Sparkles, Sliders, Calendar, ArrowUpRight, Code,
  Settings, Clock, Award, ShieldCheck, HelpCircle
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { TextEffect } from '../components/ui/text-effect';
import { ToolsTicker, Tool } from '../components/ToolsTicker';

const toolData: Tool[] = [
  { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier' },
  { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n' },
  { name: 'Make', logo: 'https://cdn.simpleicons.org/make' },
  { name: 'HubSpot', logo: 'https://cdn.simpleicons.org/hubspot' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai' },
];

export default function Services() {
  // Calculator States
  const [articlesCount, setArticlesCount] = useState(12);
  const [manualHours, setManualHours] = useState(25);
  const [customerValue, setCustomerValue] = useState(1500);

  // Accordion active capability blueprint state
  const [activeBlueprint, setActiveBlueprint] = useState<'content' | 'seo' | 'automation'>('content');

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculations
  const reclaimedHours = Math.round(manualHours * 0.8);
  // Organic growth is assumed to bring a standard factor conversion: 3.5 conversions per 10 items
  const valueGenerated = Math.round((articlesCount * 2.8 * customerValue * 0.04));
  const efficiencyScore = Math.max(10, Math.round(100 - (manualHours * 1.5) + (articlesCount * 1.2)));

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly will I see results?",
      answer: "Most clients see measurable improvements in content output and traffic within the first 60 days. SEO results typically compound over 3–6 months — the earlier we start, the faster the gains."
    },
    {
      question: "Do you work with businesses outside Nigeria?",
      answer: "Yes. I work remotely with clients across Africa, the UK, US, Canada, and beyond. Time zones are never a barrier."
    },
    {
      question: "What size business is this right for?",
      answer: "I work best with growing businesses — typically SMBs and mid-market companies that have validated their offer but haven't yet built a scalable marketing system."
    },
    {
      question: "Will the content actually sound like me?",
      answer: "Yes. Before building anything, I conduct a brand voice audit. Every piece of content goes through quality review to ensure it reflects your tone, language, and positioning — not generic AI output."
    },
    {
      question: "What if I already have some systems in place?",
      answer: "Even better. I'll audit what you have, identify the gaps, and build around your existing stack wherever possible. Nothing gets rebuilt unnecessarily."
    }
  ];

  return (
    <div className="bg-[#0a0f1e] text-white selection:bg-indigo-500 selection:text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="DFY Marketing Systems | Content Marketing Automation, SEO & Workflow Systems"
        description="Done-for-you content marketing automation, technical SEO strategy, and workflow process automations. Month-to-month contracts. High ROI systems for growing businesses."
        keywords="marketing automation Nigeria, B2B content automation, technical SEO architecture, n8n workflows"
      />

      {/* Decorative Aura Overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[20%] w-[55vw] h-[55vw] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* Header Block */}
        <div className="max-w-4xl mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Bespoke Growth Architecture
          </motion.div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
            Done-For-You <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400">
              Marketing Systems
            </span> <br />
            That Produce Revenue.
          </h1>
          
          <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl pt-2">
            Consistent content. Higher rankings. Time back in your week. No team required.
          </p>
        </div>

        {/* Intro Manifesto Panel */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Growing businesses don't need more marketing advice. <br className="hidden sm:block" />
                <span className="text-indigo-400">They need a system that actually runs.</span>
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed">
                One that publishes consistently, ranks in search, and generates leads on autopilot. That's what I build. Custom-engineered marketing systems that deliver enterprise output without enterprise complexity, cost, or management overhead.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 font-mono text-xs uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>No retainers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>No bloated contracts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Just measurable growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE IMPACT ESTIMATOR (Calculator Widget) ── */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Autopilot Calculator</span>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Estimate Your System's Impact
            </h3>
            <p className="text-zinc-400 font-light max-w-xl mx-auto">
              Drag the parameters below based on your current manual resource overhead to see the direct returns of upgrading to an autonomous setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Control Panel (Left) */}
            <div className="lg:col-span-7 rounded-[2.5rem] bg-white/5 border border-white/10 p-6 sm:p-10 space-y-8 backdrop-blur-md">
              <h4 className="text-xl font-bold flex items-center gap-2.5">
                <Sliders size={18} className="text-indigo-400" />
                System Input Parameters
              </h4>

              {/* Slider 1: Article Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-300">Target Monthly Content Volume</label>
                  <span className="px-3 py-1 bg-indigo-500/10 rounded-lg text-indigo-400 font-mono text-sm font-bold border border-indigo-500/20">
                    {articlesCount} Articles / mo
                  </span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="40" 
                  value={articlesCount} 
                  onChange={(e) => setArticlesCount(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>4 (Conservative)</span>
                  <span>40 (Enterprise-Level Scale)</span>
                </div>
              </div>

              {/* Slider 2: Manual Work Hours */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-300">Current Monthly Hours Spent on Manual Formatting & Writing</label>
                  <span className="px-3 py-1 bg-amber-500/10 rounded-lg text-amber-400 font-mono text-sm font-bold border border-amber-500/20">
                    {manualHours} Hours / mo
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={manualHours} 
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>5 Hrs</span>
                  <span>60 Hrs (High Burnout Risk)</span>
                </div>
              </div>

              {/* Slider 3: Customer Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-300">Average Lifetime Value of One Client (LTV)</label>
                  <span className="px-3 py-1 bg-teal-500/10 rounded-lg text-teal-400 font-mono text-sm font-bold border border-teal-500/20">
                    ${customerValue.toLocaleString()} USD
                  </span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="250"
                  value={customerValue} 
                  onChange={(e) => setCustomerValue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>$500</span>
                  <span>$5,000 (Premium Offer)</span>
                </div>
              </div>
            </div>

            {/* Results Display Panel (Right) */}
            <div className="lg:col-span-5 rounded-[2.5rem] bg-zinc-950 border border-white/10 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[50px] pointer-events-none" />
              
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">Simulated Output</span>
                
                {/* Generated Value */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Estimated Generated Value / mo</span>
                  <span className="text-3xl sm:text-4xl font-black text-indigo-400">${valueGenerated.toLocaleString()}</span>
                  <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                    *Calculated based on traffic growth and Conversion-to-LTV pipeline scaling curves.
                  </p>
                </div>

                {/* Reclaimed Hours */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Manual Hours Reclaimed / mo</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">{reclaimedHours} Hours Saved</span>
                  <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                    Equivalent to recovering over {Math.round(reclaimedHours / 8)} full business workdays every single month.
                  </p>
                </div>

                {/* Efficiency Gauge */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    <span>Workflow Efficiency Score</span>
                    <span className={efficiencyScore > 75 ? 'text-emerald-400 font-bold' : efficiencyScore > 45 ? 'text-amber-400' : 'text-red-400'}>
                      {efficiencyScore}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${efficiencyScore > 75 ? 'bg-emerald-500' : efficiencyScore > 45 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${efficiencyScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="mt-8 py-4.5 rounded-xl bg-brand-gradient text-zinc-900 font-bold text-center block hover:brightness-110 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-sm uppercase tracking-wider"
              >
                Claim My System Setup
              </Link>
            </div>

          </div>
        </div>

        {/* ── CORE SERVICES ARCHITECTURE BLUEPRINTS (Process Maps) ── */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Core Services</span>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Core Capabilities & Blueprints
            </h3>
            <p className="text-zinc-400 font-light max-w-xl mx-auto">
              Click a capability tab to review the exact visual operational blueprint I design, build, and support for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Selector column (Left) */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {[
                { id: 'content', title: 'Content Marketing Automation', desc: 'Stop Publishing When You Have Time. Start Publishing on a System.', icon: <Workflow size={20} /> },
                { id: 'seo', title: 'SEO Strategy & Optimization', desc: "Ranking Higher Isn't Luck. It's Architecture.", icon: <Search size={20} /> },
                { id: 'automation', title: 'Business Process Automation', desc: "Reclaim 10–20 Hours Reclaimed Per Week.", icon: <Cpu size={20} /> }
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveBlueprint(service.id as any)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border flex gap-4 items-start ${
                    activeBlueprint === service.id
                      ? 'bg-white/10 border-white/20 text-white font-bold shadow-xl'
                      : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <div className={`p-3 rounded-xl border shrink-0 ${activeBlueprint === service.id ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10'}`}>
                    {service.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white tracking-tight leading-snug">{service.title}</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{service.desc.substring(0, 55)}...</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Visual process detail window (Right) */}
            <div className="lg:col-span-8">
              <div className="rounded-[2.5rem] bg-zinc-950/70 border border-white/10 p-6 sm:p-10 flex flex-col justify-between h-full backdrop-blur-md shadow-2xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {activeBlueprint === 'content' && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase block">Content Engine Flow Map</span>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                        Stop Publishing When You Have Time. <span className="text-indigo-400">Start Publishing on a System.</span>
                      </h4>
                      <p className="text-zinc-400 font-light leading-relaxed">
                        Most businesses don't have a content problem. They have a consistency problem. Great ideas, no reliable engine to get them out. I build the engine.
                      </p>

                      {/* Content Pipeline diagram */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                          1. Keyword & Cluster Audit
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                          2. AI Brand-Voice Writing
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                          3. Multi-Channel Distribution
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-white/10 pt-6">
                        <h5 className="font-bold text-white text-sm uppercase tracking-wider text-indigo-400">What's Included:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300 font-light">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Full content strategy & editorial calendar</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>AI-assisted content creation — brand tuned</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Automated publishing workflow (8-40+ posts)</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Blog, LinkedIn, Email multi-distribution</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 font-bold text-white text-base">
                        Result: Your audience sees you everywhere, every week — without you writing a single word.
                      </div>
                    </motion.div>
                  )}

                  {activeBlueprint === 'seo' && (
                    <motion.div
                      key="seo"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase block">Search Architecture Blueprint</span>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                        Ranking Higher Isn't Luck. <span className="text-indigo-400">It's Architecture.</span>
                      </h4>
                      <p className="text-zinc-400 font-light leading-relaxed">
                        You can publish great content and still get zero traffic. SEO is what determines whether your content gets found — or gets buried. I build SEO strategies from the foundation up.
                      </p>

                      {/* SEO flow diagram */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                          1. Keyword Gap Scan
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg">
                          2. Topic Cluster Layout
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                          3. Technical Audit Sync
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-white/10 pt-6">
                        <h5 className="font-bold text-white text-sm uppercase tracking-wider text-indigo-400">What's Included:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300 font-light">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>In-depth keyword & competitor gap scan</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Topic cluster architecture for authority</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>On-page optimization across all posts</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Technical SEO audit & indexing optimization</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 font-bold text-white text-base">
                        Result: Content that doesn't just exist — it ranks, it gets clicked, and it brings in the right traffic.
                      </div>
                    </motion.div>
                  )}

                  {activeBlueprint === 'automation' && (
                    <motion.div
                      key="automation"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      <span className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase block">Process Automation Core</span>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                        The Hours You're Losing to Repetitive Tasks <span className="text-indigo-400">Are Hours You're Not Growing.</span>
                      </h4>
                      <p className="text-zinc-400 font-light leading-relaxed">
                        Marketing isn't the only place where manual, repetitive work is stealing your time. Most growing businesses have entire workflows that could — and should — be automated.
                      </p>

                      {/* Process flow diagram */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
                          1. Task Audit Map
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                          2. n8n/Zapier Building
                        </div>
                        <div className="flex items-center justify-center text-zinc-500">
                          <ArrowRight size={16} className="rotate-90 sm:rotate-0" />
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                          3. API Sync Launch
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-white/10 pt-6">
                        <h5 className="font-bold text-white text-sm uppercase tracking-wider text-indigo-400">What's Included:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300 font-light">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Full workflow audit and process mapping</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Custom n8n, Zapier & Make.com integrations</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Integration of CRM (HubSpot), Sheets & DBs</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                            <span>Ongoing workflow training & technical logs</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 font-bold text-white text-base">
                        Result: Reclaim 10–20 hours per week, allowing your team to stop doing manual entry and focus on building.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>

        {/* ── ROADMAP DELIVERABLES (Week-by-Week Engagement) ── */}
        <div className="mb-32">
          <div className="text-center mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Engagement Model</span>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Month-to-Month. No Lock-In. No Surprises.
            </h3>
            <p className="text-zinc-400 font-light max-w-xl mx-auto">
              I don't believe in locking clients into long-term retainers. Everything I offer is transparent, month-to-month, and measured on deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Week 1 setup', icon: <Settings className="text-indigo-400" size={24} />, desc: 'System Audit & Tech stack connection. We audit existing software accounts, identify integrations gaps, establish n8n connections, and deploy brand voice parameters.' },
              { title: 'Month 1 Deliverables', icon: <Clock className="text-purple-400" size={24} />, desc: 'Workflow testing & Content rollout. We execute keyword topic clusters, configure automatic publishing webhooks to HubSpot/WordPress, and ship initial batches of articles.' },
              { title: 'Ongoing Scaling', icon: <Award className="text-emerald-400" size={24} />, desc: 'Continuous optimization & ROI traces. We analyze active SERP positions, trace lead capture loops, refine prompts to protect content standards, and deliver performance charts.' }
            ].map((step, idx) => (
              <div 
                key={step.title}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/20 shadow-xl transition-all relative flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="font-mono text-xs text-zinc-600 font-bold group-hover:text-zinc-500 transition-colors">PHASE // 0{idx + 1}</span>
                  </div>
                  <div className="space-y-3 text-left">
                    <h4 className="text-xl font-bold text-white capitalize tracking-tight">{step.title}</h4>
                    <p className="text-zinc-400 font-light text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Tools Ticker Stack */}
        <div className="py-20 flex flex-col items-center border-y border-white/10 mb-32">
          <div className="text-center space-y-4 mb-16 px-6">
             <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">Tech Ecosystem</span>
             <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Specialized SEO & <br className="sm:hidden" /> Automation Stack.
             </h3>
             <p className="text-lg text-zinc-400 font-light">
               We leverage industry-leading tools to build indestructible workflows.
             </p>
          </div>
          <ToolsTicker tools={toolData} />
        </div>

        {/* ── FAQS SECTION (All 5 Copy doc FAQs) ── */}
        <div className="max-w-3xl mx-auto mb-32">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Common Queries</span>
            <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight">FAQ</h3>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold pr-8 transition-colors ${openFaq === i ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-indigo-500 text-zinc-900 border-none rotate-180' : 'bg-white/10 border-white/20 text-zinc-400'}`}>
                    {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-zinc-400 font-light leading-relaxed text-base pt-2 border-t border-white/10 mt-2 mx-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SERVICES PAGE DUAL CTA ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-[3rem] p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">No obligations</span>
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Not Sure Which Service Is Right for You?
              </h3>
              <p className="text-lg text-zinc-400 font-light max-w-xl">
                Let's figure it out together. Book a free 30-minute call and I'll tell you exactly what I'd build — and what results to expect.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-2xl bg-brand-gradient text-zinc-900 font-bold hover:brightness-110 shadow-lg shadow-indigo-500/25 transition-all text-center group"
              >
                Book Your Free Strategy Call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
