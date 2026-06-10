import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2,
  FileText, Search, Share2, UserCheck, BarChart3
} from 'lucide-react';
import blueNodes from '../../assets/automation/blue_nodes.png';
import amberNodes from '../../assets/automation/amber_nodes.png';

const WORKFLOWS = [
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
    ],
    image: amberNodes
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
    ],
    image: blueNodes
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
    ],
    image: amberNodes
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
    ],
    image: blueNodes
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
    ],
    image: amberNodes
  }
];

export const AutomationInAction = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = WORKFLOWS[activeIndex];

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full -skew-x-12 translate-x-20 z-0 border-l pointer-events-none" style={{ background: 'rgba(0,0,0,0.01)', borderColor: 'var(--border-card)' }} />
      
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex flex-col justify-between gap-12">
        
        {/* Condensed Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-mono tracking-widest text-[var(--accent-amber)] uppercase font-bold block mb-3">System Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight font-display" style={{ color: 'var(--text-body)' }}>
              The High-ROI <br />
              <span className="italic font-medium text-[var(--accent-amber)]">Automation Lab.</span>
            </h2>
          </div>
          
          <p className="text-sm md:text-base font-semibold max-w-sm leading-relaxed shrink-0 py-2 pl-5 border-l-2 text-left" style={{ borderColor: 'var(--accent-amber)', color: 'var(--text-muted)' }}>
            I map the inefficiency and build the systems that eliminate it — <span className="font-bold block mt-1" style={{ color: 'var(--text-body)' }}>reclaiming 10 to 20 hours of your week.</span>
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tab list */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {WORKFLOWS.map((w, idx) => {
              const TabIcon = w.icon;
              const isActive = activeIndex === idx;
              return (
                <button
                  key={w.id}
                  onClick={() => setActiveIndex(idx)}
                  className="w-full text-left p-4 rounded-xl transition-all relative border flex items-center gap-4 group"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    borderColor: isActive ? 'var(--border-card)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
                  }}
                >
                  <div className="p-2.5 rounded-lg transition-all shrink-0"
                    style={{
                      backgroundColor: isActive ? 'var(--accent-amber)' : 'var(--bg-page)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      border: '1px solid var(--border-card)',
                    }}
                  >
                    <TabIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest block mb-0.5" style={{ color: isActive ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                      System {w.count}
                    </span>
                    <h3 className="text-sm font-bold" style={{ color: isActive ? 'var(--text-body)' : 'var(--text-muted)' }}>
                      {w.category}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Tab Details Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6"
              >
                {/* Visual Image container with subtle layout */}
                <div 
                  className="relative h-[220px] md:h-[280px] lg:h-[320px] shrink-0 border rounded-2xl overflow-hidden flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <img 
                    src={active.image} 
                    alt={active.title} 
                    className="w-full h-full object-cover opacity-60 hover:opacity-85 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/20 to-transparent pointer-events-none" />
                </div>

                {/* Problem vs Outcome details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="text-left">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent-amber)' }}>Core Problem</h4>
                    <p className="text-base font-bold leading-snug" style={{ color: 'var(--text-body)' }}>{active.problem}</p>
                  </div>
                  <div className="text-left md:border-l md:pl-6" style={{ borderColor: 'var(--border-card)' }}>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--cta-blue)' }}>System Outcome</h4>
                    <p className="text-base font-bold leading-snug italic" style={{ color: 'var(--text-body)' }}>{active.impact}</p>
                  </div>
                </div>

                {/* Deliverables Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {active.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border text-left" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-body)' }}>{item}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Simple Themed CTA section */}
        <div className="text-center mt-6">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-xl shadow-lg border-none transition-all duration-300 hover:scale-[1.02]"
            style={{ 
              backgroundColor: 'var(--btn-cta-bg)', 
              color: 'var(--btn-cta-text)',
              boxShadow: '0 4px 20px var(--btn-cta-shadow)' 
            }}
          >
            <span className="text-base font-bold">Book a Free Strategy Call</span>
            <ArrowRight className="w-4 h-4 text-[var(--btn-cta-text)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
