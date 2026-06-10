import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Terminal
} from 'lucide-react';
import { SEO } from '../../components/SEO';

export default function OAULibrary() {
  const [consoleLine, setConsoleLine] = useState(0);

  const consoleLogs = [
    "[INFO] Initializing OAU Cataloging Agent...",
    "[INFO] Loading 3-month backlog dataset (12,450 manuscripts)...",
    "[API] Connecting to OpenAI GPT-4o API...",
    "[RUN] Processing Batch 1 (Manuscript IDs 0001 - 0100)...",
    "[PARSER] Abstract analyzed. Category identified: 'Pre-colonial Yoruba Warfare'",
    "[PARSER] Metadata extracted: Title, Author, Year, Language, Subject Tags.",
    "[DB] Syncing metadata values to library catalog...",
    "[SUCCESS] Batch 1 processed in 8.4 seconds (100% accuracy verified)",
    "[RUN] Processing Batch 2 (Manuscript IDs 0101 - 0200)...",
    "[DB] Syncing metadata values...",
    "[INFO] Process complete. Backlog cleared."
  ];

  const handleNextLine = () => {
    setConsoleLine(prev => (prev < consoleLogs.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="OAU Library AI Cataloging Case Study | Emmanuel Odebiyi"
        description="How I eliminated a 3-month manuscript cataloging backlog using Python and OpenAI API, saving 80% processing time with 91% accuracy."
        keywords="library catalog automation, academic NLP extraction, Python scraping OpenAI, GPT-4o metadata processing, OAU Library automation"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        
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
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}
            >
              <Cpu size={12} />
              Featured Case Study · Academic Workflow Automation
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display" style={{ color: 'var(--text-body)' }}>
              Clearing Gaps and Backlogs—With <br />
              <span className="italic font-medium text-amber-500">Intelligent AI Pipelines.</span>
            </h1>

            <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              Obafemi Awolowo University (OAU) Library faced a critical 3-month backlog of manual academic and historical manuscript cataloging. By writing a Python script leveraging OpenAI's language models, I cleared the backlog in weeks, achieving a 91% classification accuracy and 80% time savings.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Python Scripting", "OpenAI GPT-4o API", "NLP Metadata Parsing", "Academic Databases"].map((tag) => (
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
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>OAU Library & Research</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Timeline</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>3 Weeks</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Scope</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>12,000+ Records</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Key Metric</p>
                    <p className="text-base font-bold text-amber-500">80% Time Saved</p>
                  </div>
                </div>

                <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="text-5xl font-bold font-display text-amber-500">91% Accuracy</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>LLM Cataloging Quality Audits</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Triple metric grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { val: '80%', title: 'Time Savings', desc: 'Manuscript parsing that took highly trained librarians 20–30 minutes per record was completed by the AI engine in under 5 seconds.' },
            { val: '91%', title: 'Cataloging Accuracy', desc: 'Extensive comparisons between human curators and the AI outputs verified a 91% accuracy match on subject classifications and citation formats.' },
            { val: '0 Backlog', title: 'Completely Cleared', desc: 'The entire 3-month manual entry backlog of local and regional research papers was cataloged and fully synced to the search index in weeks.' }
          ].map((card, i) => (
            <div 
              key={i}
              className="p-8 rounded-3xl border space-y-4 interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-5xl font-bold font-display text-amber-500">{card.val}</div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>{card.title}</div>
              <p className="font-light text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width interactive preview mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-32 rounded-[2.5rem] overflow-hidden border shadow-2xl relative group p-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <img 
            src="/images/oau_library_automation.png" 
            alt="OAU Library AI Academic Cataloging System Dashboard Mockup" 
            width={1280}
            height={800}
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 text-left">
          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--color-danger)' }}>The Problem</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Massive Manual Catalog Gaps</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              OAU Library possessed a vast archive of local academic papers, historical documents, and theses. But their indexing system was severely throttled by manual entry requirements:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-red-500" />
                <span>Drowning in entry backlog: Over 12,000 historic documents awaiting indexing and shelf categorization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-red-500" />
                <span>Staff burnout: Hand-reading dense abstracts to extract core subject matters, authors, and classification headers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-red-500" />
                <span>Stale libraries: Research remained locked in physical stacks since it was undiscoverable on digital systems.</span>
              </li>
            </ul>
          </div>

          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-blue)' }}>The Solution</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Designing The NLP Academic Extraction Pipeline</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              I designed a high-speed Python automation tool backed by OpenAI GPT models to ingest text and format records instantly:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Automated Document Scraping:</strong> Script ingested raw textual archives and digitizations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Intelligent Abstract Parsing:</strong> Leveraged Custom Prompts to extract title, catalog category, and descriptors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Direct Database Injection:</strong> Programmed a relational mapping system to sync records directly into the search catalog.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Console Execution Box */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] block" style={{ color: 'var(--text-muted)' }}>Interactive Pipeline Mockup</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Interactive AI Indexing Console</h2>
          </div>

          <div 
            className="max-w-4xl mx-auto rounded-3xl border overflow-hidden shadow-2xl"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div 
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                <Terminal size={16} className="text-amber-500" />
                <span className="text-xs font-mono">oau_catalog_agent.py</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
            </div>

            <div className="p-8 font-mono text-xs space-y-3 min-h-[300px] flex flex-col justify-between" style={{ color: 'var(--text-body)' }}>
              <div className="space-y-2">
                {consoleLogs.slice(0, consoleLine + 1).map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.includes("[SUCCESS]") ? "text-emerald-500 font-bold" :
                      log.includes("[API]") ? "text-indigo-400 font-bold" :
                      log.includes("[PARSER]") ? "text-amber-500 font-bold" : "text-zinc-400"
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Click to advance parser script</span>
                <button
                  onClick={handleNextLine}
                  className="px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-surface-alt)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-body)'
                  }}
                >
                  {consoleLine < consoleLogs.length - 1 ? "Next Step →" : "Restart Script"}
                </button>
              </div>
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
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Workflow Architecture</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
            Ready to Clear Your Repetitive Gaps?
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Book a free 30-minute operational walkthrough. Let's design custom scripts and AI agent integrations that turn your manual, repetitive backlogs into high-speed automation engines.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg hover:brightness-110 shadow-2xl transition-all font-sans font-bold uppercase tracking-wider"
            style={{ 
              backgroundColor: 'var(--btn-cta-bg)', 
              color: 'var(--btn-cta-text)',
              boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)'
            }}
          >
            Clear My Operational Bottlenecks
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
