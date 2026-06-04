import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Zap, 
  FileCode,
  ShieldAlert,
  ShieldCheck,
  Server
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
    <div className="bg-[#0B0F19] text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="OAU Library AI Cataloging Case Study | Emmanuel Odebiyi"
        description="How I eliminated a 3-month manuscript cataloging backlog using Python and OpenAI API, saving 80% processing time with 91% accuracy."
        keywords="library catalog automation, academic NLP extraction, Python scraping OpenAI, GPT-4o metadata processing, OAU Library automation"
      />

      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 tracking-[0.2em] uppercase">
              <Cpu size={12} className="text-amber-400" />
              Featured Case Study · Academic Workflow Automation
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Clearing Gaps and Backlogs—With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">Intelligent AI Pipelines.</span>
            </h1>

            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Obafemi Awolowo University (OAU) Library faced a critical 3-month backlog of manual academic and historical manuscript cataloging. By writing a Python script leveraging OpenAI's language models, I cleared the backlog in weeks, achieving a 91% classification accuracy and 80% time savings.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Python Scripting</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">OpenAI GPT-4o API</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">NLP Metadata Parsing</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Academic Databases</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Client</p>
                    <p className="text-base font-semibold text-white">OAU Library & Research</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Timeline</p>
                    <p className="text-base font-semibold text-white">3 Weeks</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Scope</p>
                    <p className="text-base font-semibold text-white">12,000+ Records</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Key Metric</p>
                    <p className="text-base font-semibold text-amber-400">80% Time Saved</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">91% Accuracy</div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">LLM Cataloging Quality Audits</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Triple metric grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
            <div className="text-5xl font-black text-amber-400">80%</div>
            <div className="text-lg font-bold text-white">Time Savings</div>
            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              Manuscript parsing that took highly trained librarians 20–30 minutes per record was completed by the AI engine in under 5 seconds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
            <div className="text-5xl font-black text-amber-400">91%</div>
            <div className="text-lg font-bold text-white font-mono">Cataloging Accuracy</div>
            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              Extensive comparisons between human curators and the AI outputs verified a 91% accuracy match on subject classifications and citation formats.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
            <div className="text-5xl font-black text-amber-400">0 Backlog</div>
            <div className="text-lg font-bold text-white">Completely Cleared</div>
            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              The entire 3-month manual entry backup of local and regional research papers was cataloged and fully synced to the search index in weeks.
            </p>
          </div>
        </div>

        {/* Full-width interactive preview mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-32 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group bg-zinc-950/40 p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 pointer-events-none" />
          <img 
            src="/images/oau_library_automation.png" 
            alt="OAU Library AI Academic Cataloging System Dashboard Mockup" 
            width={1280}
            height={800}
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest">The Problem</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Massive Manual Catalog Gaps</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              OAU Library possessed a vast archive of local academic papers, historical documents, and theses. But their indexing system was severely throttled by manual entry requirements:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Drowning in entry backlog: Over 12,000 historic documents awaiting indexing and shelf categorization.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Staff burnout: Hand-reading dense abstracts to extract core subject matters, authors, and classification headers.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Stale libraries: Research remained locked in physical stacks since it was undiscoverable on digital systems.
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 space-y-6">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">The Solution</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Designing The NLP Academic Extraction Pipeline</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              I designed a high-speed Python automation tool backed by OpenAI GPT models to ingest text and format records instantly:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <strong>Automated Document Scraping:</strong> Script ingested raw textual archives and digitizations.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <strong>Intelligent Abstract Parsing:</strong> Leveraged Custom Prompts to extract title, catalog category, and descriptors.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <strong>Direct Database Injection:</strong> Programmed a relational mapping system to sync records directly into the search catalog.
              </li>
            </ul>
          </div>
        </div>

        {/* Console Execution Box */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Interactive Pipeline Mockup</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Interactive AI Indexing Console</h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-amber-400" />
                <span className="text-xs font-mono text-zinc-300">oau_catalog_agent.py</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
            </div>

            <div className="p-8 font-mono text-xs text-zinc-300 space-y-3 min-h-[300px] flex flex-col justify-between">
              <div className="space-y-2">
                {consoleLogs.slice(0, consoleLine + 1).map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.includes("[SUCCESS]") ? "text-emerald-400" :
                      log.includes("[API]") ? "text-indigo-400" :
                      log.includes("[PARSER]") ? "text-amber-400" : "text-zinc-400"
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[10px] text-zinc-500">Click to advance parser script</span>
                <button
                  onClick={handleNextLine}
                  className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 active:scale-95 transition-all"
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
          className="text-center space-y-6 pt-12 border-t border-white/10"
        >
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Workflow Architecture</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Clear Your Repetitive Gaps?
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Book a free 30-minute operational walkthrough. Let's design custom scripts and AI agent integrations that turn your manual, repetitive backlogs into high-speed automation engines.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-amber-500/20 active:scale-95 transition-all"
          >
            Clear My Operational Bottlenecks
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
