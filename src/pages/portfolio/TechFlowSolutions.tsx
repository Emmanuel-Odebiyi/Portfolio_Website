import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  BarChart3, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Settings, 
  Workflow, 
  Share2, 
  Users, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { SEO } from '../../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function TechFlowSolutions() {
  const [activeStep, setActiveStep] = useState(0);
  const [articlesCount, setArticlesCount] = useState(40);

  const steps = [
    {
      title: "1. Topic Cluster Mapping",
      desc: "Automatically maps competitor keyword gaps and clusters target terms to build high topical authority.",
      icon: <FileText size={18} />,
      metric: "500+ Keywords Mapped",
      details: "The system scans top competitors, extracts their ranking keywords, identifies search volume clusters with high intent, and builds an automatic 6-month editorial calendar."
    },
    {
      title: "2. Content Engine Orchestration",
      desc: "Generates semantic, rich, and context-aware article outlines and content using specialized multi-agent prompts.",
      icon: <Cpu size={18} />,
      metric: "99% Brand Voice Match",
      details: "Using a combination of customized GPT models trained on the client's past successful copies, the engine drafts highly technical articles that sound professional and human."
    },
    {
      title: "3. Automated SEO Quality Check",
      desc: "Scans and optimizes each piece against strict readability, search intent, schema, and meta tag criteria.",
      icon: <ShieldCheck size={18} />,
      metric: "100% SEO Compliance",
      details: "The script programmatically inserts internal links to relevant landing pages, validates H2/H3 layouts, and generates optimized meta descriptions and image alt tags."
    },
    {
      title: "4. Auto-Publishing Webhook",
      desc: "Instantly formats and pushes completed articles straight to HubSpot and WordPress on a structured schedule.",
      icon: <Workflow size={18} />,
      metric: "Zero-Click Delivery",
      details: "No copying and pasting. Once the system approves an article, it triggers a secure webhook that formats, uploads, and schedules the post on the website's CMS."
    },
    {
      title: "5. Multi-Channel Distribution",
      desc: "Repurposes each blog post into automated, ready-to-share social snippets and email newsletters.",
      icon: <Share2 size={18} />,
      metric: "3x Social Reach",
      details: "An n8n sub-workflow extracts key highlights and translates the article into formatted LinkedIn posts, tweets, and a summarized email broadcast."
    }
  ];

  // Calculate simulated metrics
  const manualTimePerArticle = 4.5; // hours
  const automatedTimePerArticle = 0.1; // hours
  const manualTime = articlesCount * manualTimePerArticle;
  const automatedTime = Math.round(articlesCount * automatedTimePerArticle * 10) / 10;
  const hoursSaved = Math.round(manualTime - automatedTime);
  const dollarsSaved = hoursSaved * 75; // Assuming $75/hr resource cost

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="B2B SaaS Content Automation Case Study | Emmanuel Odebiyi"
        description="How I built an automated content marketing engine that delivered a 520% ROI in 90 days for TechFlow Solutions."
        keywords="SaaS growth automation, B2B content marketing automation, n8n workflows, HubSpot CMS API, AI content strategy"
      />

      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        
        {/* Back navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 tracking-[0.2em] uppercase">
              <Zap size={12} className="text-blue-400" />
              Featured Case Study · SaaS Automation
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Scaling Content Out by 500%—With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Zero Added Workload.</span>
            </h1>

            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              TechFlow Solutions had a manual, chaotic writing process that produced 8 articles per month. Through a custom automated pipeline, I scaled their content engine to 40+ high-quality posts, yielding a 520% ROI in 90 days.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">n8n Workflow</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">OpenAI API</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">HubSpot API</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">B2B SaaS</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Client</p>
                    <p className="text-base font-semibold text-white">TechFlow Solutions</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Timeline</p>
                    <p className="text-base font-semibold text-white">90 Days</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Industry</p>
                    <p className="text-base font-semibold text-white">B2B SaaS / Tech</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Key Metric</p>
                    <p className="text-base font-semibold text-emerald-400">520% ROI</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">$127,000</div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Directly Attributed Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width interactive preview screenshot */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-32 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group bg-zinc-950/40 p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 pointer-events-none" />
          <img 
            src="/images/techflow_dashboard.png" 
            alt="TechFlow Content Automation Analytics Dashboard Mockup" 
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest">The Challenge</span>
            <h3 className="text-3xl font-bold text-white tracking-tight"> Chaotic Manual Pipelines & Stagnant Output</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              TechFlow Solutions knew content marketing was a major growth channel, but their execution was manual and highly exhausting. 
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Team was spent: publishing only 8 posts/month while sacrificing core product work.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                No keyword clustering: articles were drafted sporadically without strategic SEO intent.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Stagnant traffic: spending $6,000+ monthly on writers with no measurable ROI.
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 space-y-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">The Solution</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Deploying a Multi-Agent Content Automation Engine</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              I designed and integrated a full automated marketing pipeline that replaced the manual steps, from keyword identification to publishing.
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                Automated clustering: mapping search queries and generating perfect outlines.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                Context-aware draft generation: feeding target semantic vocabulary to custom agents.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                HubSpot direct integration: programmatically formatting and scheduling pages.
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Workflow Visualization */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] block">System Architecture</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">The Content Factory Workflow</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border flex items-center gap-4 group ${
                    activeStep === idx 
                      ? 'bg-white/10 border-white/20 shadow-xl' 
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
                    activeStep === idx ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`font-semibold text-sm transition-colors ${activeStep === idx ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                    {step.title}
                  </span>
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
                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10">
                      Active Node
                    </span>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg">
                      {steps[activeStep].desc}
                    </p>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Technical Implementation</p>
                      <p className="text-sm text-zinc-300 font-light leading-relaxed">
                        {steps[activeStep].details}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-emerald-400">
                      <CheckCircle2 size={16} />
                      {steps[activeStep].metric}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic ROI Time Machine Widget */}
        <div className="mb-32 p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Interactive Calculator</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Simulate Your Automation Efficiency
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                Move the slider to adjust the targeted monthly article output and see how much team energy and resource cost is saved by moving from manual drafting to an automated workflow system.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-zinc-400">Target Monthly Output</span>
                  <span className="text-white font-bold">{articlesCount} Articles</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="100" 
                  value={articlesCount}
                  onChange={(e) => setArticlesCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-black text-white">{hoursSaved}h</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Manual Hours Saved/Mo</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-black text-indigo-400">{Math.round((manualTime / Math.max(0.1, automatedTime)) * 10) / 10}x</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Speed Multiplier</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-black text-emerald-400">${dollarsSaved.toLocaleString()}</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Implied Monthly Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* The Outcomes & Impact */}
        <div className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Measurable Outcomes</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">The Impact (90 Days Later)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="text-5xl font-black text-emerald-400">+500%</div>
              <div className="text-lg font-bold text-white">Content Output Increase</div>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Articles scaled cleanly from 8 per month to a stable average of 40 articles, targeting diverse commercial keyword clusters and establishing rapid topical authority.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="text-5xl font-black text-indigo-400">+80%</div>
              <div className="text-lg font-bold text-white">Organic Traffic Growth</div>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Search impressions grew steadily, leading to an 80% boost in high-intent visitors arriving on core landing and pricing pages directly from articles.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="text-5xl font-black text-blue-400">$127k</div>
              <div className="text-lg font-bold text-white">Attributed Revenue</div>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                With programmatically placed, clear CTAs and smart internal links, TechFlow attributed $127,000 in monthly recurring revenue directly to automated content campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 pt-12 border-t border-white/10"
        >
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Automation Consulting</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Automate Your Growth?
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Book a free 30-minute system walkthrough. Let's map out how content automation can free up your team and scale your lead generation on autopilot.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            Let's Build Your System
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
