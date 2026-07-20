import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="min-h-screen relative overflow-x-clip font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="B2B SaaS Content Automation Case Study | Emmanuel Odebiyi"
        description="How I built an automated content marketing engine that delivered a 520% ROI in 90 days for TechFlow Solutions."
        keywords="SaaS growth automation, B2B content marketing automation, n8n workflows, HubSpot CMS API, AI content strategy"
      />

      {/* Full-bleed Header Banner */}
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] relative overflow-hidden">
        <img 
          src="/images/headers/techflow_header.png" 
          alt="TechFlow Solutions Header Banner" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/30 to-transparent" />
      </div>

      <div className="relative z-10 pb-24 max-w-7xl mx-auto px-6 -mt-16 sm:-mt-24 md:-mt-32">
        
        {/* Back navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-blue)' }}
            >
              <Zap size={12} />
              Featured Case Study · SaaS Automation
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display" style={{ color: 'var(--text-body)' }}>
              Scaling Content Out by 500%—With <br />
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>Zero Added Workload.</span>
            </h1>

            <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              TechFlow Solutions had a manual, chaotic writing process that produced 8 articles per month. Through a custom automated pipeline, I scaled their content engine to 40+ high-quality posts, yielding a 520% ROI in 90 days.
            </p>

            <div className="flex flex-wrap gap-3">
              {["n8n Workflow", "OpenAI API", "HubSpot API", "B2B SaaS"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div 
              className="p-8 rounded-[2.5rem] border backdrop-blur-md shadow-2xl relative overflow-hidden text-left"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-6">
                <span className="text-xs font-sans font-bold uppercase tracking-widest block text-center lg:text-left" style={{ color: 'var(--text-muted)' }}>Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Client</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>TechFlow Solutions</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Timeline</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>90 Days</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Industry</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>B2B SaaS / Tech</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Key Metric</p>
                    <p className="text-base font-bold" style={{ color: 'var(--accent-teal)' }}>520% ROI</p>
                  </div>
                </div>

                <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>$127,000</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Directly Attributed Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GA4 Metrics Dual Panel */}
        <div className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] block text-[var(--accent-blue)]">Verified Analytics Evidence</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>GA4 Performance Dashboards</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] border shadow-2xl flex flex-col justify-between space-y-6"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">Organic Traffic Acquisition</span>
                <h4 className="text-2xl font-bold font-display mt-4" style={{ color: 'var(--text-body)' }}>+80% Organic Sessions</h4>
                <p className="text-sm font-light mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>GA4 traffic report showing the expansion of search-driven users after keyword gaps and topical clusters were automated.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-card)' }}>
                <img 
                  src="/images/techflow_ga4_traffic.png" 
                  alt="Google Analytics GA4 Acquisition report showing +80% organic sessions" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] border shadow-2xl flex flex-col justify-between space-y-6"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">Revenue & ROI Attribution</span>
                <h4 className="text-2xl font-bold font-display mt-4" style={{ color: 'var(--text-body)' }}>$127K Revenue / 520% ROI</h4>
                <p className="text-sm font-light mt-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>Conversion tracking report displaying directly attributed sales conversions and campaign return-on-investment indicators.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-card)' }}>
                <img 
                  src="/images/techflow_ga4_conversions.png" 
                  alt="Google Analytics GA4 Conversions report showing attributed revenue and ROI" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6 text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--color-danger)' }}>The Challenge</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}> Chaotic Manual Pipelines & Stagnant Output</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              TechFlow Solutions knew content marketing was a major growth channel, but their execution was manual and highly exhausting. 
            </p>
            <ul className="space-y-3 text-sm font-light text-zinc-300" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span>Team was spent: publishing only 8 posts/month while sacrificing core product work.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span>No keyword clustering: articles were drafted sporadically without strategic SEO intent.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span>Stagnant traffic: spending $6,000+ monthly on writers with no measurable ROI.</span>
              </li>
            </ul>
          </div>

          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6 text-left"
            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-blue)' }}>The Solution</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Deploying a Multi-Agent Content Automation Engine</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              I designed and integrated a full automated marketing pipeline that replaced the manual steps, from keyword identification to publishing.
            </p>
            <ul className="space-y-3 text-sm font-light text-zinc-300" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                <span>Automated clustering: mapping search queries and generating outlines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                <span>Context-aware draft generation: feeding target semantic vocabulary to custom agents.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-blue)' }} />
                <span>HubSpot direct integration: programmatically formatting and scheduling pages.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Workflow Visualization */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] block" style={{ color: 'var(--text-muted)' }}>System Architecture</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>The Content Factory Workflow</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="w-full text-left p-5 rounded-2xl border flex items-center gap-4 group cursor-pointer transition-all interactive-card"
                  style={{
                    backgroundColor: activeStep === idx ? 'var(--bg-surface-alt)' : 'var(--bg-surface)',
                    borderColor: activeStep === idx ? 'var(--text-body)' : 'var(--border-card)'
                  }}
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      borderColor: 'var(--border-card)',
                      color: activeStep === idx ? 'var(--accent-blue)' : 'var(--text-muted)'
                    }}
                  >
                    {step.icon}
                  </div>
                  <span 
                    className="font-bold text-sm transition-colors"
                    style={{ color: activeStep === idx ? 'var(--text-body)' : 'var(--text-muted)' }}
                  >
                    {step.title}
                  </span>
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
                      Active Node
                    </span>
                    <h3 className="text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                      {steps[activeStep].title}
                    </h3>
                    <p className="font-light leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>
                      {steps[activeStep].desc}
                    </p>
                    <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                      <p className="text-xs font-sans font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Technical Implementation</p>
                      <p className="text-sm font-light leading-relaxed animate-none" style={{ color: 'var(--text-body)' }}>
                        {steps[activeStep].details}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-sans font-bold" style={{ color: 'var(--accent-teal)' }}>
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
        <div 
          className="mb-32 p-10 sm:p-16 rounded-[3rem] border relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Interactive Calculator</span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                Simulate Your Automation Efficiency
              </h3>
              <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                Move the slider to adjust the targeted monthly article output and see how much team energy and resource cost is saved by moving from manual drafting to an automated workflow system.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-sans font-bold" style={{ color: 'var(--text-muted)' }}>
                  <span>Target Monthly Output</span>
                  <span style={{ color: 'var(--text-body)' }}>{articlesCount} Articles</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="100" 
                  value={articlesCount}
                  onChange={(e) => setArticlesCount(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                  style={{ backgroundColor: 'var(--border-card)', accentColor: 'var(--accent-blue)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div 
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{hoursSaved}h</div>
                <div className="text-[9px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Manual Hours Saved/Mo</div>
              </div>
              <div 
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-3xl font-bold font-display" style={{ color: 'var(--accent-blue)' }}>{Math.round((manualTime / Math.max(0.1, automatedTime)) * 10) / 10}x</div>
                <div className="text-[9px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Speed Multiplier</div>
              </div>
              <div 
                className="p-6 rounded-2xl border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-3xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>${dollarsSaved.toLocaleString()}</div>
                <div className="text-[9px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Implied Monthly Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* The Outcomes & Impact */}
        <div className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Measurable Outcomes</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>The Impact (90 Days Later)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div 
              className="p-6 rounded-2xl border space-y-4 interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-5xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>520%</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>Marketing ROI</div>
              <p className="font-light text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Achieved a massive 520% return on marketing spend in just 90 days after deploying the automated system.
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl border space-y-4 interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-5xl font-bold font-display" style={{ color: 'var(--accent-blue)' }}>+500%</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>Content Output</div>
              <p className="font-light text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Articles scaled cleanly from 8 per month to a stable average of 40 articles, targeting commercial intent keywords.
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl border space-y-4 interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-5xl font-bold font-display" style={{ color: 'var(--accent-blue)' }}>+80%</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>Organic Traffic</div>
              <p className="font-light text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Search impressions grew steadily, leading to an 80% boost in high-intent visitors arriving on core landing pages.
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl border space-y-4 interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-5xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>$127k</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>Attributed Revenue</div>
              <p className="font-light text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                With programmatically placed CTAs, TechFlow attributed $127,000 in monthly revenue directly to automated content.
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
          className="text-center space-y-6 pt-12 border-t"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Automation Consulting</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
            Ready to Automate Your Growth?
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Book a free 30-minute system walkthrough. Let's map out how content automation can free up your team and scale your lead generation on autopilot.
          </p>
          <Link 
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Let's Build Your System
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
