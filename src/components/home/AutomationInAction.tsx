import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, ChevronRight, 
  Sparkles, Layers, Box, LucideIcon,
  FileText, Search, Share2, UserCheck, BarChart3
} from 'lucide-react';
import blueNodes from '../../assets/automation/blue_nodes.png';
import amberNodes from '../../assets/automation/amber_nodes.png';

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

interface WorkflowTemplate {
  id: string;
  category: string;
  count: string;
  title: string;
  icon: LucideIcon;
  problem: string;
  impact: string;
  deliverables: string[];
}

const WORKFLOWS: WorkflowTemplate[] = [
  {
    id: 'content',
    category: 'Content Output',
    count: '01',
    title: 'Automated Content Engine',
    icon: FileText,
    problem: 'Stop publishing when you have time. Start publishing on a system.',
    impact: '8 to 40+ articles monthly, on schedule. Marketing that grows while you sleep.',
    deliverables: [
      'Full editorial calendar automation',
      'AI-assisted generator pipeline',
      'Quality control & audit framework',
      'Auto-scheduling to CMS'
    ]
  },
  {
    id: 'seo',
    category: 'Search Visibility',
    count: '02',
    title: 'SEO-Optimized Infrastructure',
    icon: Search,
    problem: "SEO isn't luck—it's architecture. Transition from Position 24 to Position 9.",
    impact: 'Average ranking Position 9 across core clusters. Performance tracked always.',
    deliverables: [
      'Topical authority mapping',
      'Technical SEO health monitoring',
      'Keyword gap & SERP analysis',
      'Automated on-page optimization'
    ]
  },
  {
    id: 'distro',
    category: 'Platform Distribution',
    count: '03',
    title: 'Self-Spreading Distribution',
    icon: Share2,
    problem: 'One pillar piece should be everywhere. Blog → Social → Email → LinkedIn.',
    impact: 'Your audience sees you everywhere, every week—without you writing a word.',
    deliverables: [
      'Multi-platform cross-posting',
      'Auto-formatting for LinkedIn/X',
      'Weekly newsletter synchronization',
      'Social media distribution hook'
    ]
  },
  {
    id: 'voice',
    category: 'AI Alignment',
    count: '04',
    title: 'Brand Voice Preservation',
    icon: UserCheck,
    problem: 'Generic AI output doesn’t convert. It must sound like you wrote it.',
    impact: 'Your tone, language, and positioning preserved at scale. Zero generic fluff.',
    deliverables: [
      'Custom brand voice audit & tuning',
      'Style-guide enforcement via AI',
      'Human-centric quality gates',
      'Strategic brand alignment'
    ]
  },
  {
    id: 'data',
    category: 'Real-Time Insights',
    count: '05',
    title: 'Performance & Growth Engine',
    icon: BarChart3,
    problem: 'No more guessing. You know exactly what’s working, and what’s next.',
    impact: '10–20 hours saved weekly. Marketing that is an engine, not an expense.',
    deliverables: [
      'Real-time performance dashboard',
      'Automated KPI monitoring',
      'Growth simulator integration',
      'Weekly ROI status reports'
    ]
  }
];

const PROVIDERS = [
  { name: 'N8N WORKFLOW', iconColor: 'text-orange-500', image: amberNodes },
  { name: 'MAKE AUTOMATION', iconColor: 'text-purple-500', image: blueNodes },
  { name: 'ZAPIER PIPELINE', iconColor: 'text-orange-600', image: amberNodes }
];

export const AutomationInAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [providerIndex, setProviderIndex] = useState(0);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to active tab
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const index = Math.min(
        Math.max(Math.floor(latest * WORKFLOWS.length), 0),
        WORKFLOWS.length - 1
      );
      if (index !== activeIndex) {
        setActiveIndex(index);
        setProviderIndex(0); // Restart slideshow on new tab
      }
    });
  }, [smoothProgress, activeIndex]);

  // Handle Automatic Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setProviderIndex((prev) => (prev + 1) % PROVIDERS.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [activeIndex]);

  const active = WORKFLOWS[activeIndex];
  const activeProvider = PROVIDERS[providerIndex];

  // Function to allow clicking tabs to scroll to that section
  const handleTabClick = (idx: number) => {
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight;
      const segmentHeight = height / WORKFLOWS.length;
      window.scrollTo({
        top: top + (idx * segmentHeight) + (segmentHeight / 2),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="relative h-[500vh] z-20 grain-overlay" style={{ backgroundColor: '#0f172a' }}>
      
      {/* Sticky Container */}
      <div className="sticky top-0 min-h-screen pt-24 pb-8 overflow-hidden flex flex-col justify-center" style={{ backgroundColor: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full -skew-x-12 translate-x-20 z-0 border-l pointer-events-none" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.04)' }} />
        
        <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10 flex flex-col h-full justify-between gap-6">
          
          {/* Condensed Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}
              >
                <Sparkles className="w-3 h-3" style={{ color: '#f59e0b' }} />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest" style={{ color: '#f59e0b' }}>Automation in Action</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-tighter leading-tight">
                The High-ROI <br />
                <span className="text-brand-gradient">Automation Lab.</span>
              </h2>
            </div>
            
            {/* Simplified Top Right Content */}
            <p className="text-sm md:text-base font-medium max-w-sm leading-relaxed shrink-0 py-2 rounded-r-xl pl-5" style={{ color: 'rgba(226,232,240,0.9)', borderLeft: '2px solid #f59e0b' }}>
              I map the inefficiency and build the systems that eliminate it—<span className="text-white font-bold block mt-1">Reclaiming 10 to 20 hours of your week.</span>
            </p>
          </div>

          {/* Optimized Layout Grid flex-grow to fill middle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch flex-grow min-h-0">
            
            {/* Left: Interactive Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-2">
               {WORKFLOWS.map((w, idx) => {
                 const Icon = w.icon;
                 return (
                  <button
                    key={w.id}
                    onClick={() => handleTabClick(idx)}
                    className={`w-full text-left p-3 lg:p-4 rounded-2xl transition-all relative border flex items-center gap-3 group ${
                      activeIndex === idx 
                        ? 'border-zinc-200 bg-white shadow-xl shadow-zinc-200/40 ring-1 ring-zinc-100' 
                        : 'border-transparent hover:bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    <div className={`p-2 lg:p-2.5 rounded-xl transition-colors shrink-0 ${activeIndex === idx ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-500 group-hover:text-zinc-800 border border-zinc-200 shadow-sm'}`}>
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    
                    <div className="flex-grow">
                      <span className={`text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-widest block mb-0.5 ${activeIndex === idx ? 'text-brand-gradient' : 'text-zinc-400'}`}>
                        System {w.count}
                      </span>
                      <h3 className={`text-sm lg:text-base font-bold ${activeIndex === idx ? 'text-zinc-900' : 'text-zinc-500'}`}>
                        {w.category}
                      </h3>
                    </div>

                    {activeIndex === idx && (
                      <motion.div layoutId="tab-indicator" className="absolute right-3 lg:right-4">
                         <ChevronRight className="w-4 h-4 text-brand-gradient" />
                      </motion.div>
                    )}
                  </button>
                 );
               })}
            </div>

            {/* Right: Massive Canvas & Condensed Data */}
            <div className="lg:col-span-8 flex flex-col justify-center gap-4 min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.99, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.99, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col h-full gap-4"
                >
                  {/* Image Showcase with Gradient Overlay */}
                  <div className="relative h-[250px] md:h-[300px] lg:h-[380px] shrink-0 bg-[#0f172a] border border-white/10 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex items-center justify-center group shadow-2xl">
                     
                     {/* The Slideshow Container */}
                     <div className="absolute inset-0">
                        <AnimatePresence mode="wait">
                           <motion.div 
                             key={activeProvider.name}
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 0.6 }}
                             exit={{ opacity: 0 }}
                             transition={{ duration: 1 }}
                             className="absolute inset-0"
                           >
                             <img 
                                src={activeProvider.image} 
                                alt={activeProvider.name} 
                                className="w-full h-full object-cover"
                             />
                           </motion.div>
                        </AnimatePresence>
                     </div>

                     {/* Grid Overlay */}
                     <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                     {/* Template Label */}
                     <div className="absolute top-4 left-6 lg:top-6 lg:left-8 flex items-center gap-2 lg:gap-3 z-10">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-brand-gradient animate-pulse" />
                        <span className="text-[8px] lg:text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">env_production://{active.id}</span>
                     </div>

                     {/* Gradient Overlay for Content */}
                     <div className="absolute bottom-0 left-0 right-0 pt-24 pb-6 px-6 lg:pb-8 lg:px-10 z-10 flex flex-col justify-end"
                          style={{ background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.9) 50%, transparent 100%)' }}>
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-8 items-start md:items-end">
                          <div className="flex-grow">
                            <h4 className="text-amber-400 text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-1 lg:mb-2">Core Problem</h4>
                            <p className="text-lg lg:text-xl font-bold leading-tight text-white">
                              {active.problem}
                            </p>
                          </div>
                          <div className="shrink-0 md:pl-8 md:border-l border-white/10 md:max-w-[320px]">
                             <h4 className="text-brand-gradient text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-1 lg:mb-2">System Outcome</h4>
                             <p className="text-sm lg:text-base font-medium text-slate-100 leading-snug italic">
                               {active.impact}
                             </p>
                          </div>
                        </div>
                     </div>

                     {/* Slideshow Indicators */}
                     <div className="absolute bottom-3 right-6 lg:right-8 flex items-center gap-1.5 z-20 opacity-40">
                        {PROVIDERS.map((_, i) => (
                           <div key={i} className={`h-1 rounded-full transition-all duration-300 ${providerIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-slate-500'}`} />
                        ))}
                     </div>
                  </div>

                  {/* Technical Deliverables - Compacted */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {active.deliverables.map((item, i) => (
                      <div key={i} className="flex flex-col gap-2 p-3 lg:p-4 bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-zinc-200 shadow-sm group hover:shadow-md hover:border-zinc-300 transition-all text-left">
                         <Layers className="w-4 h-4 text-zinc-400 group-hover:text-brand-gradient transition-colors" />
                         <span className="text-[10px] lg:text-xs font-semibold text-zinc-700 leading-snug lg:leading-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Balanced CTA Section */}
          <div className="text-center shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-6 px-8 py-3.5 lg:px-14 lg:py-5 bg-zinc-900 text-white rounded-full overflow-hidden shadow-xl"
            >
               <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative z-10 flex flex-col items-start text-left">
                  <span className="text-[8px] lg:text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 mb-0.5 group-hover:text-white/80 transition-colors">Take Action</span>
                  <span className="text-base lg:text-xl font-black tracking-tight">Book Your Free Call</span>
               </div>
               <div className="relative z-10 p-1.5 lg:p-2 rounded-full bg-white/10 group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
               </div>
            </motion.button>
            
            <div className="mt-4 flex items-center justify-center gap-4 lg:gap-8">
               {['No Commitments', 'Expert Advice', 'Proven Results'].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5 lg:gap-2 group">
                     <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-gradient" />
                     <span className="text-[9px] lg:text-[10px] font-mono font-black uppercase tracking-widest text-zinc-800 leading-none">{label}</span>
                  </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

