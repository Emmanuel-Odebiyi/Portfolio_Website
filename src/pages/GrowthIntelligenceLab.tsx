import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { 
  Radar, 
  Gauge, 
  Timer, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  ChevronRight,
  Database,
  Cpu,
  Fingerprint,
  Layers
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  badge: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  path: string;
  outcomes: string[];
  systemMetric: string;
  // Beautiful interactive mockup renderer for premium aesthetic
  renderMockup: () => React.ReactNode;
}

const tools: Tool[] = [
  {
    id: 'automation-radar',
    name: 'Workday Bottleneck Finder™',
    badge: 'DAILY FRICTION AUDIT',
    description: 'Scan your daily operations to pinpoint exactly what is slowing down your team and wasting hours.',
    benefit: 'Reclaim up to 14+ hours of weekly admin tasks.',
    icon: <Radar size={24} />,
    accent: 'var(--cta-blue)',
    glowColor: 'var(--btn-cta-shadow)',
    path: '/tools/automation-radar',
    outcomes: ['Hours Lost Location Map', 'Task Friction Analysis'],
    systemMetric: 'SCANNING FRICTION ACTIVE',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl border overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        {/* Radar concentric rings */}
        <div className="absolute w-36 h-36 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--border-card)', opacity: 0.3 }}>
          <div className="w-24 h-24 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--border-card)', opacity: 0.5 }}>
            <div className="w-12 h-12 rounded-full border" style={{ borderColor: 'var(--border-card)' }} />
          </div>
        </div>
        {/* Radar crosshairs */}
        <div className="absolute w-40 h-px" style={{ backgroundColor: 'var(--border-card)', opacity: 0.3 }} />
        <div className="absolute h-40 w-px" style={{ backgroundColor: 'var(--border-card)', opacity: 0.3 }} />
        
        {/* Radar rotating sweep line */}
        <div className="absolute w-20 h-20 origin-bottom-right bottom-1/2 right-1/2 overflow-hidden">
          <div 
            className="w-20 h-20 rounded-tl-full bg-gradient-to-tr from-transparent to-[var(--cta-blue)]"
            style={{
              animation: 'spin 4s linear infinite',
              transformOrigin: 'bottom right',
              opacity: 0.25
            }}
          />
        </div>

        {/* Floating pulse targets */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--cta-blue)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-amber)' }} />
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--cta-blue)' }} />

        {/* CSS Spin Keyframes */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        
        <span className="absolute bottom-3 left-4 font-sans font-bold text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
          SCANNING WORKFLOW LEAKS
        </span>
      </div>
    )
  },
  {
    id: 'autopilot-score',
    name: 'Business Freedom Calculator™',
    badge: 'FOUNDER FREEDOM GAUGE',
    description: 'Measure how close your business is to running smoothly on autopilot without your daily intervention.',
    benefit: 'Benchmark your scaling independence index.',
    icon: <Gauge size={24} />,
    accent: 'var(--accent-amber)',
    glowColor: 'var(--btn-cta-shadow)',
    path: '/tools/autopilot-score',
    outcomes: ['Founder Freedom Index Rating', 'Scale Bottleneck Index'],
    systemMetric: 'FREEDOM SCALE CALIBRATING',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl border overflow-hidden flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        {/* Semi-circular gauge */}
        <div className="relative w-32 h-20 overflow-hidden flex items-end justify-center">
          <div className="absolute w-28 h-28 rounded-full border-[10px]" style={{ borderColor: 'var(--border-card)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', opacity: 0.3 }} />
          <div className="absolute w-28 h-28 rounded-full border-[10px] border-transparent border-t-[var(--accent-amber)] border-l-[var(--accent-amber)] animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(45deg)' }} />
          
          {/* Needle indicator */}
          <div 
            className="absolute bottom-0 w-1.5 h-12 origin-bottom rounded-t-full"
            style={{
              backgroundColor: 'var(--text-body)',
              transform: 'rotate(25deg)',
              animation: 'gaugeWobble 3s ease-in-out infinite alternate',
              transformOrigin: 'bottom center'
            }}
          />
        </div>
        
        {/* Metric digital readout */}
        <div className="text-center mt-2 space-y-1">
          <span className="font-sans text-xl font-bold tracking-wider" style={{ color: 'var(--text-body)' }}>82.4%</span>
          <p className="font-sans font-bold text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>AUTOPILOT INDEX ACTIVE</p>
        </div>

        <style>{`
          @keyframes gaugeWobble {
            0% { transform: rotate(-30deg); }
            50% { transform: rotate(45deg); }
            100% { transform: rotate(20deg); }
          }
        `}</style>
      </div>
    )
  },
  {
    id: 'roi-time-machine',
    name: 'Time & Dollar Savings Predictor™',
    badge: 'TIME RECAPTURE ESTIMATOR',
    description: 'Calculate the exact hours and software expense you will save by automating your repetitive tasks.',
    benefit: 'Map out your 12-month savings blueprint.',
    icon: <Timer size={24} />,
    accent: 'var(--accent-amber)',
    glowColor: 'var(--btn-cta-shadow)',
    path: '/tools/roi-time-machine',
    outcomes: ['Hours Recaptured Forecast', 'Cash Savings Calculation'],
    systemMetric: 'TIME & CASH TRACKING ON',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl border overflow-hidden flex flex-col justify-between p-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="flex justify-between items-start">
          <span className="font-sans font-bold text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>TEMPORAL SAVINGS MODEL</span>
          <span className="font-sans text-[10px] px-2 py-0.5 rounded border font-bold" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}>+384%</span>
        </div>
        
        {/* Floating statistics display */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Time Recaptured</span>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>56.5 Days / yr</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-card)' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '74%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="h-full" 
              style={{ backgroundColor: 'var(--accent-amber)' }}
            />
          </div>
        </div>

        <div className="flex justify-between text-[9px] font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
          <span>Manual: 80 hrs/mo</span>
          <span>Automated: 12 hrs/mo</span>
        </div>
      </div>
    )
  },
  {
    id: 'growth-simulator',
    name: 'Revenue Scaling Planner™',
    badge: 'FUTURE REVENUE MODELLER',
    description: 'Model different marketing and workflow scenarios to find the easiest, zero-risk path to your next revenue milestone.',
    benefit: 'Eliminate scaling risk with clear forecasting.',
    icon: <TrendingUp size={24} />,
    accent: 'var(--accent-teal)',
    glowColor: 'var(--btn-cta-shadow)',
    path: '/tools/growth-simulator',
    outcomes: ['Compounding Growth Predictor', 'Resource Allocator Planner'],
    systemMetric: 'SCALING MODEL LOADED',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl border overflow-hidden flex flex-col justify-between p-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="flex justify-between items-center">
          <span className="font-sans font-bold text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>SCENARIO Scale-B</span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
        </div>

        {/* Vector SVG scaling chart */}
        <div className="flex-1 w-full flex items-end">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,45 C15,42 30,30 45,28 C60,26 75,12 100,2"
              fill="none"
              stroke="var(--accent-teal)"
              strokeWidth="2.5"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: 'drawChart 3s ease-out forwards infinite'
              }}
            />
            <path
              d="M0,45 C15,42 30,30 45,28 C60,26 75,12 100,2 L100,50 L0,50 Z"
              fill="url(#chartGrad)"
            />
            
            {/* Interactive nodes */}
            <circle cx="45" cy="28" r="3" fill="var(--accent-teal)" className="animate-ping" />
            <circle cx="45" cy="28" r="2" fill="var(--bg-page)" />
            <circle cx="100" cy="2" r="3.5" fill="var(--accent-amber)" />
          </svg>
        </div>

        <style>{`
          @keyframes drawChart {
            to { strokeDashoffset: 0; }
          }
        `}</style>
        
        <div className="flex justify-between items-center text-[9px] font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
          <span>Q1 Baseline</span>
          <span className="font-bold animate-pulse" style={{ color: 'var(--text-body)' }}>12-Mo Target</span>
        </div>
      </div>
    )
  }
];

export default function GrowthIntelligenceLab() {
  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Growth Intelligence Lab | Emmanuel Odebiyi"
        description="Interactive simulators to calculate bottlenecks, forecast scaling potential, and evaluate process maturity for your business operations."
        keywords="growth intelligence lab, automation diagnostics, business scaling simulator, operations audit tool"
      />
      
      {/* Background Matrix/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, var(--text-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--text-muted) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60%_50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60%_50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-[0.2em] backdrop-blur-md"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)]" />
          Interactive Diagnostics Room
        </motion.div>
        
        <div className="space-y-6 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] font-display"
            style={{ color: 'var(--text-body)' }}
          >
            Growth Intelligence <br />
            <span className="italic font-medium font-display" style={{ color: 'var(--accent-amber)' }}>Laboratory.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            Interactive simulators built with high-growth operations frameworks to calculate bottlenecks, forecast scaling potential, and evaluate process maturity.
          </motion.p>
        </div>

        <button
          onClick={() => document.getElementById('lab-grid')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-cta text-xs uppercase tracking-widest cursor-pointer"
        >
          Select a Simulator ↓
        </button>
      </section>

      {/* Bento-Inspired Systems Grid */}
      <section id="lab-grid" className="max-w-7xl mx-auto px-6 mb-36 relative z-10 scroll-mt-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                to={tool.path} 
                className="block group h-full"
              >
                <div 
                  className="relative h-full p-8 lg:p-10 rounded-[2.5rem] border backdrop-blur-md overflow-hidden flex flex-col justify-between interactive-card"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-card)',
                    boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)`
                  }}
                >
                  {/* Internal Glow on Hover */}
                  <div 
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[90px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
                    style={{ background: tool.glowColor }}
                  />

                  {/* Top content */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span 
                        className="text-[10px] font-sans font-bold tracking-widest uppercase border px-3.5 py-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                      >
                        {tool.badge}
                      </span>
                      <span className="font-sans font-bold text-[9px] tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                        {tool.systemMetric}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl border flex items-center justify-center"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        >
                          {tool.icon}
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                          {tool.name}
                        </h3>
                      </div>
                      <p className="font-light leading-relaxed text-base" style={{ color: 'var(--text-muted)' }}>
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Rendering the custom live interactive mockup representation */}
                  <div className="my-8">
                    {tool.renderMockup()}
                  </div>

                  {/* Bottom metrics and Action Call */}
                  <div className="space-y-6 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-sans font-bold text-zinc-500 uppercase tracking-widest">Key Diagnostic Value</span>
                        <p className="text-sm font-bold" style={{ color: 'var(--accent-teal)' }}>
                          {tool.benefit}
                        </p>
                      </div>

                      <div 
                        className="flex items-center gap-2 text-xs font-sans font-bold group-hover:translate-x-1.5 transition-all duration-300 uppercase tracking-widest"
                        style={{ color: 'var(--text-body)' }}
                      >
                        <span>LAUNCH WORKSPACE</span>
                        <ArrowRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operations Engineering Manifesto */}
      <section className="max-w-7xl mx-auto px-6 mb-36 relative z-10">
        <div 
          className="border backdrop-blur-md rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderColor: 'var(--border-card)',
            boxShadow: `0 30px 60px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)`
          }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>SYSTEM MANIFESTO</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-snug font-display" style={{ color: 'var(--text-body)' }}>
                Why build an <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>Operations Engine?</span>
              </h2>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Most agencies and SaaS platforms grow by adding headcount to compensate for friction. We build automated systems that replace manual handoffs with APIs and databases. These diagnostics estimate the exact scope of friction in your systems so you can make math-based growth decisions.
              </p>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Database size={18} />, title: 'Zero Data Loss', desc: 'Sync processes securely across teams with high reliability.', color: 'var(--cta-blue)' },
                { icon: <Cpu size={18} />, title: 'Continuous Flow', desc: 'Keep lead flows, publishing, and customer queues running 24/7.', color: 'var(--accent-amber)' },
                { icon: <Layers size={18} />, title: 'Frictionless APIs', desc: 'Connect siloed applications into a unified control panel.', color: 'var(--accent-amber)' },
                { icon: <Fingerprint size={18} />, title: 'Total Ownership', desc: 'Secure custom databases built for your specific workflow.', color: 'var(--accent-teal)' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl border space-y-4 transition-all interactive-card"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                >
                  <div 
                    className="w-9 h-9 rounded-lg border flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{item.title}</h4>
                    <p className="text-xs font-light leading-normal" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Need a custom operations blueprint?</h3>
          <p className="text-lg font-light max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            The simulators show you where the gaps are. Let's build a customized system to fill them.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/services"
            className="btn-cta text-xs uppercase tracking-widest w-full sm:w-auto text-center"
          >
            Explore Services
          </Link>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-transparent border-[var(--border-card)] border font-bold rounded-2xl hover:bg-[var(--bg-surface-alt)] transition-all text-xs uppercase tracking-widest w-full sm:w-auto text-center"
            style={{ color: 'var(--text-body)' }}
          >
            Connect Strategically
          </Link>
        </div>
      </section>
    </div>
  );
}
