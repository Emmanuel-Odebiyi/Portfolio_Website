import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, BarChart3, Target, CheckCircle2, 
  MessageSquare, Repeat, Zap, Bot, Award, Terminal, 
  ChevronRight, FileDown, Layers, Settings, Sparkles, TrendingUp, Activity, Check, ShieldCheck,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const capabilities = [
  {
    id: 'seo',
    title: 'SEO & Content Strategy',
    icon: <Target className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />,
    items: [
      { name: 'Keyword research and competitor gap analysis', desc: 'Finding high-impact terms your competitors missed.' },
      { name: 'On-page optimization and technical SEO', desc: 'Structuring pages so search engine bots index them flawlessly.' },
      { name: 'Content calendar development and editorial planning', desc: 'Scheduling content strategically for consistent authority growth.' },
      { name: 'SERP analysis and strategic ranking frameworks', desc: 'Reverse-engineering Google top ranks to duplicate success.' },
      { name: 'Topic cluster architecture for topical authority', desc: 'Interlinking related topics to signal deep subject expertise.' }
    ]
  },
  {
    id: 'automation',
    title: 'Marketing Automation',
    icon: <Zap className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />,
    items: [
      { name: 'n8n workflow automation and orchestration', desc: 'Building complex self-hosted visual automation pipelines.' },
      { name: 'Zapier and Make.com integration design', desc: 'Connecting SaaS tools seamlessly without writing boilerplate.' },
      { name: 'API integration and webhook configuration', desc: 'Configuring custom data pathways between specialized web services.' },
      { name: 'Multi-platform cross-posting and distribution', desc: 'Syndicating single assets to many channels instantly.' },
      { name: 'Real-time performance tracking dashboards', desc: 'Centralizing critical metrics into a unified view for instant insight.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI Implementation',
    icon: <Bot className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />,
    items: [
      { name: 'Prompt engineering and system design', desc: 'Designing bulletproof prompts that deliver reliable machine outputs.' },
      { name: 'ChatGPT API integration and custom workflows', desc: 'Feeding context and instructions to LLMs programmatically.' },
      { name: 'Content quality control and optimization systems', desc: 'Automating the validation of outputs against editorial guidelines.' },
      { name: 'Brand voice preservation at scale', desc: 'Tuning generators to consistently capture your unique brand identity.' },
      { name: 'Automated editorial and publishing workflows', desc: 'Handling everything from research to draft to final polish.' }
    ]
  },
  {
    id: 'tech',
    title: 'Technical Capabilities',
    icon: <Terminal className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />,
    items: [
      { name: 'Python scripting for custom automation', desc: 'Writing modular scripts to extract data, process media, or call APIs.' },
      { name: 'Tesseract OCR implementation', desc: 'Extracting clean structured text from images, receipts, and documents.' },
      { name: 'REST API integration', desc: 'Bridging data pools through robust endpoints and authentications.' },
      { name: 'Microservices architecture design', desc: 'Keeping software modules decoupled, resilient, and highly performant.' },
      { name: 'Process mapping and workflow optimization', desc: 'Identifying operational bottlenecks and engineering them away.' }
    ]
  }
];

const tools = [
  {
    category: 'SEO & Analytics',
    items: ['Semrush', 'Ahrefs', 'Ubersuggest', 'Google Analytics', 'Google Search Console']
  },
  {
    category: 'Content & Optimization',
    items: ['Surfer SEO', 'Frase', 'Hemingway Editor', 'Grammarly']
  },
  {
    category: 'Automation',
    items: ['n8n', 'Zapier', 'Make.com', 'HubSpot', 'Buffer']
  },
  {
    category: 'CMS & Platforms',
    items: ['WordPress', 'Webflow', 'Notion', 'Google Workspace']
  }
];

const certifications = [
  {
    year: '2025',
    color: 'var(--text-body)',
    items: [
      { title: 'AI Automation & Process Design', issuer: 'n8n Academy' },
      { title: 'Marketing Automation Specialist', issuer: 'Coursera' },
      { title: 'API Integration & Workflow Automation', issuer: 'Implementation Hub' },
      { title: 'HubSpot Marketing Software Certification', issuer: 'HubSpot Academy' },
      { title: 'Document Processing with OCR Technology', issuer: 'Technical Arsenal' }
    ]
  },
  {
    year: '2024',
    color: 'var(--text-body)',
    items: [
      { title: 'Advanced Search Engine Optimization', issuer: 'Semrush', desc: 'Credential ID: 372617' },
      { title: 'Certified Copywriter', issuer: 'Living Your Dream Africa' }
    ]
  },
  {
    year: '2023',
    color: 'var(--text-body)',
    items: [
      { title: 'Prompt Engineering for Generative AI', issuer: 'LinkedIn Learning' },
      { title: 'Prompt Engineering: How to Talk to the AIs', issuer: 'LinkedIn Learning' }
    ]
  },
  {
    year: 'Education',
    color: 'var(--text-body)',
    items: [
      { title: 'Strategy of Content Marketing', issuer: 'UC Davis' },
      { title: 'Bachelor\'s Degree, Construction Economics', issuer: 'Obafemi Awolowo University' }
    ]
  }
];

const results = [
  { metric: 'Traffic Growth', value: '50–65%', label: 'increase within 3–6 months' },
  { metric: 'Time Savings', value: '10–20 hrs', label: 'reclaimed per week' },
  { metric: 'CTR Improvement', value: '35–40%', label: 'boost' },
  { metric: 'ROI Delivered', value: '300–520%', label: 'average range' },
  { metric: 'Client Retention', value: '95%+', label: 'partnerships (6–24 months)' }
];

export default function MyApproach() {
  const [activeTab, setActiveTab] = useState('seo');

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="My Approach | Emmanuel Odebiyi"
        description="Every recommendation backed by data, every result measured precisely. Explore Emmanuel Odebiyi's 5-phase methodology for building autonomous growth engines."
        keywords="marketing methodology, data-driven approach, automation architecture, SEO strategy framework"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Link Nav */}
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
        
        {/* ── HERO: BLUEPRINT SCHEMATIC ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh] pt-8">

          {/* LEFT: Approach Hook */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              The Methodology
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-display"
                style={{ color: 'var(--text-body)' }}
              >
                Not a consultant.
                <br />
                <span className="italic font-medium animate-none" style={{ color: 'var(--accent-amber)' }}>
                  An architect.
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-light" style={{ color: 'var(--text-muted)' }}>
                  Who engineers outcomes.
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
              I don't give you tools and leave. I don't hand over tactics and hope for the best.
              I build{' '}
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>complete systems — designed for your business, measured against real outcomes.</strong>
            </motion.p>

            {/* The four commitments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-3"
            >
              {[
                { icon: <BarChart3 size={14} />, text: 'Every recommendation is backed by data' },
                { icon: <Target size={14} />, text: 'Every result is measured precisely' },
                { icon: <Repeat size={14} />, text: 'Every system is built to repeat' },
                { icon: <MessageSquare size={14} />, text: 'Everything is explained clearly' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <div 
                    className="p-1.5 rounded-lg shrink-0 border"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
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
                to="/my-story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border text-base transition-all font-bold hover:brightness-110"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                Read My Story
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: System Schematic Blueprint */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            {/* Blueprint card */}
            <div className="relative rounded-[2rem] border backdrop-blur-xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              
              {/* Header bar */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>System Architecture — v2025</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DEPLOYED
                </span>
              </div>

              {/* 5-phase pipeline */}
              <div className="p-6 space-y-1">
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Engagement Pipeline — 5 Phase Protocol</p>
                {[
                  { phase: '01', label: 'Discovery & Audit', desc: 'Current stack + gaps', icon: <Search size={14} />, delay: 0.4 },
                  { phase: '02', label: 'Strategy Architecture', desc: 'Data-driven roadmap', icon: <Layers size={14} />, delay: 0.55 },
                  { phase: '03', label: 'System Build', desc: 'Workflows + content engine', icon: <Settings size={14} />, delay: 0.7 },
                  { phase: '04', label: 'Automation Deploy', desc: 'n8n, Zapier, APIs live', icon: <Zap size={14} />, delay: 0.85 },
                  { phase: '05', label: 'Optimize & Report', desc: 'Monthly performance loop', icon: <TrendingUp size={14} />, delay: 1.0 },
                ].map((step, i) => (
                  <div key={i} className="text-left">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: step.delay, duration: 0.5 }}
                      className="flex items-center gap-4 p-3.5 rounded-xl border transition-all"
                      style={{ 
                        backgroundColor: i <= 2 ? 'var(--bg-page)' : 'var(--bg-surface-alt)',
                        borderColor: 'var(--border-card)'
                      }}
                    >
                      {/* Phase icon */}
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                      >
                        {step.icon}
                      </div>
                      {/* Labels */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-sans font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>PHASE {step.phase}</span>
                          {i < 2 && <span className="text-[8px] font-sans font-bold uppercase tracking-widest border px-1.5 py-0.5 rounded" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>✓ Done</span>}
                          {i === 2 && (
                            <span className="text-[8px] font-sans font-bold uppercase tracking-widest border px-1.5 py-0.5 rounded flex items-center gap-1" style={{ color: 'var(--accent-amber)', backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                              <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-amber)' }} /> Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>{step.label}</p>
                        <p className="text-[9px] font-light mt-0.5" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                      </div>
                    </motion.div>
                    {i < 4 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: step.delay + 0.2, duration: 0.3 }}
                        className="w-px h-3 ml-7 origin-top"
                        style={{ backgroundColor: 'var(--border-card)' }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* System health footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="flex items-center justify-between px-6 py-4 border-t"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="flex items-center gap-2 text-[9px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  <Activity size={10} style={{ color: 'var(--accent-amber)' }} />
                  System Health
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Uptime', val: '99.9%' },
                    { label: 'ROI Avg', val: '520%' },
                    { label: 'Clients', val: '95%+' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>{s.val}</div>
                      <div className="text-[8px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>


        {/* 4 Pillars Section */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left"
          >
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Pillars of Execution</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-left" style={{ color: 'var(--text-body)' }}>The Core Commitments</h3>
            </div>
            <p className="font-light max-w-md text-left" style={{ color: 'var(--text-muted)' }}>
              Every system I deploy runs on these four foundational pillars, ensuring absolute alignment with your metrics.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { 
                title: 'Every recommendation is backed by data.', 
                desc: 'No gut-feel advice. Every decision comes from research, competitive analysis, and frameworks I\'ve tested and refined across multiple industries.',
                icon: <BarChart3 size={26} />
              },
              { 
                title: 'Every result is measured precisely.', 
                desc: 'Not "traffic improved." Exactly 65% increase in 90 days. Not "you\'ll save time." Specifically 15+ hours reclaimed every single week.',
                icon: <Target size={26} />
              },
              { 
                title: 'Every system is built to repeat.', 
                desc: 'Systems beat effort. Consistency beats intensity. Automation compounds. I build things that keep working long after our collaboration ends.',
                icon: <Repeat size={26} />
              },
              { 
                title: 'Everything is explained clearly.', 
                desc: 'Complex automation doesn\'t have to be confusing. I make sure you understand what\'s running, why it works, and what to expect — without drowning you in jargon.',
                icon: <MessageSquare size={26} />
              },
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }
                }}
                className="group relative p-8 md:p-10 rounded-[2rem] border shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden text-left"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div 
                    className="w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                  >
                    {pillar.icon}
                  </div>
                  <h4 className="text-2xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>{pillar.title}</h4>
                  <p className="text-base font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5 Core Principles Grid */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Philosophical DNA</span>
            <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Core Principles</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Systematic', desc: 'Repeatable, workflow-based, process-driven by default' },
              { title: 'Data-Driven', desc: 'Every claim quantified, every strategy backed by numbers' },
              { title: 'Practical', desc: 'Implementation over theory. Results over activity.' },
              { title: 'Clear', desc: 'Complex automation explained so anyone can understand it' },
              { title: 'Results-Focused', desc: 'Outcomes are the only metric that matters', span: 'col-span-2 md:col-span-1' }
            ].map((principle, idx) => (
              <motion.div
                key={principle.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.08, duration: 0.5 } }
                }}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 flex flex-col justify-between text-left ${principle.span || ''}`}
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-4">
                  <span className="font-sans font-bold text-xs" style={{ color: 'var(--text-muted)' }}>0{idx + 1}</span>
                  <h4 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{principle.title}</h4>
                  <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Capabilities Section ("What I Actually Do") */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left"
          >
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Skills & Expertise</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-left" style={{ color: 'var(--text-body)' }}>What I Actually Do (And Do Well)</h3>
            </div>
            <p className="font-light max-w-md text-left" style={{ color: 'var(--text-muted)' }}>
              A deep, battle-tested skillset bridging strategic search engine optimization, generative intelligence pipelines, and complex systems architecture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-2 text-left">
              <div 
                className="flex items-center gap-2 mb-2 px-4 py-2 rounded-xl border text-xs font-sans font-bold uppercase tracking-widest w-fit animate-pulse"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
              >
                <Sparkles size={12} />
                Click below to view details ➔
              </div>
              <div className="flex flex-col gap-2 w-full">
                {capabilities.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border group relative"
                    style={{ 
                      backgroundColor: activeTab === tab.id ? 'var(--bg-surface)' : 'var(--bg-page)',
                      borderColor: activeTab === tab.id ? 'var(--text-body)' : 'var(--border-card)',
                      color: activeTab === tab.id ? 'var(--text-body)' : 'var(--text-muted)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-transparent' : 'bg-transparent'}`}>
                        {tab.icon}
                      </div>
                      <span className="text-sm tracking-tight font-bold">{tab.title}</span>
                    </div>
                    {activeTab !== tab.id ? (
                      <div 
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-widest"
                        style={{ color: 'var(--accent-amber)' }}
                      >
                        View <ArrowRight size={10} />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="hidden lg:block transition-transform duration-300 translate-x-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Panels */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {capabilities.map((tab) => tab.id === activeTab && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 rounded-[2rem] border shadow-2xl space-y-6 text-left"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="flex items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-card)' }}>
                      <div 
                        className="w-12 h-12 rounded-xl border flex items-center justify-center"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                      >
                        {tab.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{tab.title}</h4>
                        <p className="text-xs uppercase tracking-widest font-sans font-bold" style={{ color: 'var(--text-muted)' }}>Specialized Direct Deliverables</p>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {tab.items.map((item, idx) => (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                          className="flex gap-4 p-4 rounded-xl border border-transparent transition-colors group"
                        >
                          <div 
                            className="mt-1 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-300"
                            style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
                          >
                            <Check size={14} />
                          </div>
                          <div>
                            <h5 className="font-bold text-base tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>{item.name}</h5>
                            <p className="text-sm font-light mt-1" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tools I Use */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>The Stack</span>
            <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Tools I Use</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tools.map((group, idx) => (
              <motion.div
                key={group.category}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }
                }}
                className="p-6 rounded-[1.5rem] border backdrop-blur-sm transition-all duration-300 text-left"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <h4 className="text-xs font-sans font-bold uppercase tracking-[0.15em] border-b pb-4 mb-4" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-card)' }}>{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-default"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Timeline */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Validation & Background</span>
            <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Certifications & Education</h3>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full" style={{ backgroundColor: 'var(--border-card)' }} />

            <div className="space-y-16">
              {certifications.map((cert, certIdx) => (
                <div key={cert.year} className="relative flex flex-col md:flex-row items-stretch">
                  
                  {/* Timeline Badge Node */}
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 z-10 flex items-center justify-center mb-6 md:mb-0">
                    <div 
                      className="px-4 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-[0.15em] shadow-lg"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--text-body)', color: 'var(--text-body)' }}
                    >
                      {cert.year}
                    </div>
                  </div>

                  {/* Left Side (Even items on desktop) */}
                  <div className={`flex-1 md:pr-12 ${certIdx % 2 === 0 ? 'md:block text-left md:text-right' : 'hidden md:block opacity-0 pointer-events-none'}`}>
                    {certIdx % 2 === 0 && (
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6 text-left"
                      >
                        {cert.items.map((item) => (
                          <div 
                            key={item.title} 
                            className="p-5 rounded-2xl border shadow-lg text-left backdrop-blur-sm inline-block w-full"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                          >
                            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold mb-1 uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                              <Award size={12} /> {item.issuer}
                            </span>
                            <h4 className="text-base font-bold tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>{item.title}</h4>
                            {item.desc && <p className="text-xs font-sans font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Odd items on desktop, all items on mobile) */}
                  <div className={`flex-1 md:pl-12 ${certIdx % 2 !== 0 ? 'md:block text-left' : 'md:block text-left'}`}>
                    {(certIdx % 2 !== 0) && (
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6 text-left"
                      >
                        {cert.items.map((item) => (
                          <div 
                            key={item.title} 
                            className="p-5 rounded-2xl border shadow-lg backdrop-blur-sm w-full text-left"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                          >
                            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold mb-1 uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                              <Award size={12} /> {item.issuer}
                            </span>
                            <h4 className="text-base font-bold tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>{item.title}</h4>
                            {item.desc && <p className="text-xs font-sans font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary Dashboard */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left"
          >
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--text-muted)' }}>Client Performance Matrix</span>
              <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-left" style={{ color: 'var(--text-body)' }}>The Pattern Repeats. Client After Client.</h3>
            </div>
            <p className="font-light max-w-md text-left" style={{ color: 'var(--text-muted)' }}>
              A bird's eye view of actual validated results delivered across past content systems, SEO deployments, and automations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Stats Dashboard */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {results.map((res, idx) => (
                <motion.div
                  key={res.metric}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.08, duration: 0.5 } }
                  }}
                  className="p-6 rounded-2xl border backdrop-blur-sm flex flex-col justify-between"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{res.metric}</span>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-bold font-display leading-none" style={{ color: 'var(--text-body)' }}>{res.value}</span>
                    <p className="text-xs font-light mt-1" style={{ color: 'var(--text-muted)' }}>{res.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Impact Highlights */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="lg:col-span-5 p-8 rounded-[2rem] border shadow-2xl flex flex-col justify-between relative overflow-hidden text-left"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center text-amber-400" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                    <Sparkles size={18} style={{ color: 'var(--accent-amber)' }} />
                  </div>
                  <h4 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>Business Outcomes</h4>
                </div>

                <ul className="space-y-4">
                  {[
                    'You publish 4–8x more content, consistently',
                    'Organic traffic grows 50–65% within 6 months',
                    'Your team reclaims 10–20 hours every single week',
                    'Content stops being a cost center and generates measurable revenue'
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      <div className="mt-1 shrink-0" style={{ color: 'var(--accent-amber)' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6 mt-8" style={{ borderColor: 'var(--border-card)' }}>
                <p className="text-xs font-sans font-bold uppercase tracking-widest leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  * Metrics represent averages validated across 2023–2025 client accounts.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Dual CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-[2.5rem] p-12 md:p-16 border overflow-hidden shadow-2xl text-left"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight" style={{ color: 'var(--text-body)' }}>
                Ready to Build <br /> Something That Works?
              </h3>
              <p className="text-lg font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Let's end the guesswork. Select an option below to audit your business systems or access my full professional portfolio and resume.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              <Link 
                to="/resume"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl font-bold hover:brightness-110 transition-all text-center group border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                <FileDown size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                Download PDF Resume
              </Link>

              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl font-bold hover:brightness-110 shadow-lg transition-all text-center group"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Book Your Call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
