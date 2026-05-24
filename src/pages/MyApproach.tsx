import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BarChart3, Clock, Target, CheckCircle2, 
  MessageSquare, Repeat, Zap, Bot, Award, Database, Terminal, 
  BookOpen, Calendar, Cpu, Search, Check, ShieldCheck, ChevronRight, FileDown,
  Layers, Settings, Sparkles, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const capabilities = [
  {
    id: 'seo',
    title: 'SEO & Content Strategy',
    icon: <Search className="text-blue-400 w-5 h-5" />,
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
    icon: <Zap className="text-amber-400 w-5 h-5" />,
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
    icon: <Bot className="text-purple-400 w-5 h-5" />,
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
    icon: <Terminal className="text-teal-400 w-5 h-5" />,
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
    color: 'border-blue-500 text-blue-400 bg-blue-500/10',
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
    color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    items: [
      { title: 'Advanced Search Engine Optimization', issuer: 'Semrush', desc: 'Credential ID: 372617' },
      { title: 'Certified Copywriter', issuer: 'Living Your Dream Africa' }
    ]
  },
  {
    year: '2023',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    items: [
      { title: 'Prompt Engineering for Generative AI', issuer: 'LinkedIn Learning' },
      { title: 'Prompt Engineering: How to Talk to the AIs', issuer: 'LinkedIn Learning' }
    ]
  },
  {
    year: 'Education',
    color: 'border-teal-500 text-teal-400 bg-teal-500/10',
    items: [
      { title: 'Strategy of Content Marketing', issuer: 'UC Davis' },
      { title: 'Bachelor\'s Degree, Construction Economics', issuer: 'Obafemi Awolowo University' }
    ]
  }
];

const results = [
  { metric: 'Traffic Growth', value: '50–65%', label: 'increase within 3–6 months', color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30' },
  { metric: 'Time Savings', value: '10–20 hrs', label: 'reclaimed per week', color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' },
  { metric: 'CTR Improvement', value: '35–40%', label: 'boost', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30' },
  { metric: 'ROI Delivered', value: '300–520%', label: 'average range', color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' },
  { metric: 'Client Retention', value: '95%+', label: 'partnerships (6–24 months)', color: 'from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30' }
];

export default function MyApproach() {
  const [activeTab, setActiveTab] = useState('seo');
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      
      {/* Premium Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] left-[-20%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-emerald-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Back Link Nav */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link to="/about" className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
        </motion.div>
        
        {/* Hero Section */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] uppercase text-zinc-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            The Methodology
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white mb-8"
          >
            How I Work: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400">
              Data, Systems, & <br className="hidden sm:block" /> Zero Guesswork.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl"
          >
            I don't give you tools and leave. I don't hand over tactics and hope for the best. I build complete systems — designed for your business, built on proven frameworks, and measured against real outcomes.
          </motion.p>
        </div>

        {/* 4 Pillars Section */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">Pillars of Execution</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">The Core Commitments</h3>
            </div>
            <p className="text-zinc-400 font-light max-w-md">
              Every system I deploy runs on these four foundational pillars, ensuring absolute alignment with your metrics.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { 
                title: 'Every recommendation is backed by data.', 
                desc: 'No gut-feel advice. Every decision comes from research, competitive analysis, and frameworks I\'ve tested and refined across multiple industries.',
                icon: <BarChart3 className="text-blue-400" size={26} />,
                accent: 'rgba(37,99,235,0.1)'
              },
              { 
                title: 'Every result is measured precisely.', 
                desc: 'Not "traffic improved." Exactly 65% increase in 90 days. Not "you\'ll save time." Specifically 15+ hours reclaimed every single week.',
                icon: <Target className="text-amber-400" size={26} />,
                accent: 'rgba(245,158,11,0.1)'
              },
              { 
                title: 'Every system is built to repeat.', 
                desc: 'Systems beat effort. Consistency beats intensity. Automation compounds. I build things that keep working long after our collaboration ends.',
                icon: <Repeat className="text-purple-400" size={26} />,
                accent: 'rgba(139,92,246,0.1)'
              },
              { 
                title: 'Everything is explained clearly.', 
                desc: 'Complex automation doesn\'t have to be confusing. I make sure you understand what\'s running, why it works, and what to expect — without drowning you in jargon.',
                icon: <MessageSquare className="text-teal-400" size={26} />,
                accent: 'rgba(20,184,166,0.1)'
              },
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }
                }}
                onMouseEnter={() => setHoveredPillar(i)}
                onMouseLeave={() => setHoveredPillar(null)}
                className="group relative p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Custom glow decoration on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
                  style={{ 
                    background: `radial-gradient(circle at 10% 10%, ${pillar.accent} 0%, transparent 50%)`
                  }} 
                />

                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight leading-snug">{pillar.title}</h4>
                  <p className="text-base text-zinc-400 font-light leading-relaxed">{pillar.desc}</p>
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
            <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">Philosophical DNA</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Core Principles</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Systematic', desc: 'Repeatable, workflow-based, process-driven by default', color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400' },
              { title: 'Data-Driven', desc: 'Every claim quantified, every strategy backed by numbers', color: 'from-purple-500/10 to-violet-500/10 border-purple-500/20 text-purple-400' },
              { title: 'Practical', desc: 'Implementation over theory. Results over activity.', color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20 text-teal-400' },
              { title: 'Clear', desc: 'Complex automation explained so anyone can understand it', color: 'from-cyan-500/10 to-sky-500/10 border-cyan-500/20 text-cyan-400' },
              { title: 'Results-Focused', desc: 'Outcomes are the only metric that matters', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400', span: 'col-span-2 md:col-span-1' }
            ].map((principle, idx) => (
              <motion.div
                key={principle.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.08, duration: 0.5 } }
                }}
                className={`p-6 rounded-2xl border bg-gradient-to-br ${principle.color} ${principle.span || ''} backdrop-blur-sm hover:scale-[1.03] hover:border-white/20 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs opacity-60">0{idx + 1}</span>
                  <h4 className="text-lg font-bold text-white tracking-tight">{principle.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Capabilities Section ("What I Actually Do") */}
        <div className="mb-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">Skills & Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">What I Actually Do (And Do Well)</h3>
            </div>
            <p className="text-zinc-400 font-light max-w-md">
              A deep, battle-tested skillset bridging strategic search engine optimization, generative intelligence pipelines, and complex systems architecture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest w-fit animate-pulse">
                <Sparkles size={12} className="fill-blue-400" />
                Click below to view details ➔
              </div>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-4 lg:pb-0">
                {capabilities.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between shrink-0 lg:shrink border group relative ${
                      activeTab === tab.id
                        ? 'bg-white/10 border-white/20 text-white font-bold shadow-lg'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                    }`}
                    style={{ minWidth: '220px' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-white/10' : 'bg-transparent'}`}>
                        {tab.icon}
                      </div>
                      <span className="text-sm tracking-tight">{tab.title}</span>
                    </div>
                    {activeTab !== tab.id ? (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-blue-400">
                        View <ArrowRight size={10} />
                      </div>
                    ) : (
                      <ChevronRight size={16} className={`hidden lg:block transition-transform duration-300 translate-x-1`} />
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
                    className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-6"
                  >
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {tab.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white tracking-tight">{tab.title}</h4>
                        <p className="text-xs text-zinc-400 uppercase tracking-widest font-mono">Specialized Direct Deliverables</p>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {tab.items.map((item, idx) => (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                          className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                        >
                          <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                            <Check size={14} />
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-base tracking-tight leading-snug">{item.name}</h5>
                            <p className="text-sm text-zinc-400 font-light mt-1">{item.desc}</p>
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
            <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">The Stack</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Tools I Use</h3>
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
                className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 border-b border-white/10 pb-4 mb-4">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/10 hover:text-white hover:scale-105 transition-all cursor-default"
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
            <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">Validation & Background</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Certifications & Education</h3>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent" />

            <div className="space-y-16">
              {certifications.map((cert, certIdx) => (
                <div key={cert.year} className="relative flex flex-col md:flex-row items-stretch">
                  
                  {/* Timeline Badge Node (Desktop Center, Mobile Left aligned) */}
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 z-10 flex items-center justify-center mb-6 md:mb-0">
                    <div className={`px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.15em] font-black shadow-lg ${cert.color}`}>
                      {cert.year}
                    </div>
                  </div>

                  {/* Left Side (Even items on desktop, empty on odd) */}
                  <div className={`flex-1 md:pr-12 ${certIdx % 2 === 0 ? 'md:block text-left md:text-right' : 'hidden md:block opacity-0 pointer-events-none'}`}>
                    {certIdx % 2 === 0 && (
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6"
                      >
                        {cert.items.map((item) => (
                          <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-left backdrop-blur-sm inline-block w-full">
                            <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-mono font-bold mb-1 uppercase tracking-wider">
                              <Award size={12} /> {item.issuer}
                            </span>
                            <h4 className="text-base font-bold text-white tracking-tight leading-snug">{item.title}</h4>
                            {item.desc && <p className="text-xs text-zinc-500 font-mono mt-1">{item.desc}</p>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Odd items on desktop, all items on mobile) */}
                  <div className={`flex-1 md:pl-12 ${certIdx % 2 !== 0 ? 'md:block' : 'md:block text-left'}`}>
                    {(certIdx % 2 !== 0 || window.innerWidth < 768) && (
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={fadeUp}
                        className="space-y-6"
                      >
                        {cert.items.map((item) => (
                          <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm w-full">
                            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold mb-1 uppercase tracking-wider">
                              <Award size={12} /> {item.issuer}
                            </span>
                            <h4 className="text-base font-bold text-white tracking-tight leading-snug">{item.title}</h4>
                            {item.desc && <p className="text-xs text-zinc-500 font-mono mt-1">{item.desc}</p>}
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
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase mb-3">Client Performance Matrix</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">The Pattern Repeats. Client After Client.</h3>
            </div>
            <p className="text-zinc-400 font-light max-w-md">
              A bird's eye view of actual validated results delivered across past content systems, SEO deployments, and automations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Stats Dashboard */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((res, idx) => (
                <motion.div
                  key={res.metric}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.08, duration: 0.5 } }
                  }}
                  className={`p-6 rounded-2xl border bg-gradient-to-br ${res.color} backdrop-blur-sm flex flex-col justify-between`}
                >
                  <span className="text-xs font-mono uppercase tracking-wider opacity-60">{res.metric}</span>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-black text-white leading-none">{res.value}</span>
                    <p className="text-xs font-light text-zinc-400 mt-1">{res.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Impact Highlights */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="lg:col-span-5 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Sparkles size={18} />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Business Outcomes Delivered</h4>
                </div>

                <ul className="space-y-4">
                  {[
                    'You publish 4–8x more content, consistently',
                    'Organic traffic grows 50–65% within 6 months',
                    'Your team reclaims 10–20 hours every single week',
                    'Content stops being a cost center and generates measurable revenue'
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-zinc-300 font-light leading-relaxed">
                      <div className="mt-1 shrink-0 text-emerald-400">
                        <ShieldCheck size={16} />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6 mt-8">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                  * Metrics represent averages validated across 2023–2025 client accounts.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Dual CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-[3rem] p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Build <br /> Something That Works?
              </h3>
              <p className="text-lg text-zinc-400 font-light max-w-xl">
                Let's end the guesswork. Select an option below to audit your business systems or access my full professional portfolio and resume.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              {/* Option 1: Resume Link */}
              <Link 
                to="/resume"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all text-center group"
              >
                <FileDown size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                Download PDF Resume
              </Link>

              {/* Option 2: Contact Call Link */}
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-2xl bg-brand-gradient text-white font-bold hover:brightness-110 shadow-lg shadow-indigo-500/25 transition-all text-center group"
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
