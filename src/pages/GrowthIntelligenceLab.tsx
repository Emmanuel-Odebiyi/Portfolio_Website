import React from 'react';
import { motion } from 'framer-motion';
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
    accent: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    path: '/tools/automation-radar',
    outcomes: ['Hours Lost Location Map', 'Task Friction Analysis'],
    systemMetric: 'SCANNING FRICTION ACTIVE',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Radar concentric rings */}
        <div className="absolute w-36 h-36 rounded-full border border-blue-500/10 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-blue-500/30" />
          </div>
        </div>
        {/* Radar crosshairs */}
        <div className="absolute w-40 h-px bg-blue-500/5" />
        <div className="absolute h-40 w-px bg-blue-500/5" />
        
        {/* Radar rotating sweep line */}
        <div className="absolute w-20 h-20 origin-bottom-right bottom-1/2 right-1/2 overflow-hidden">
          <div 
            className="w-20 h-20 rounded-tl-full bg-gradient-to-tr from-transparent to-blue-500/20"
            style={{
              animation: 'spin 4s linear infinite',
              transformOrigin: 'bottom right',
            }}
          />
        </div>

        {/* Floating pulse targets */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-sky-400 rounded-full" />

        {/* CSS Spin Keyframes */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        
        <span className="absolute bottom-3 left-4 font-mono text-[9px] text-blue-400/60 uppercase tracking-widest">
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
    accent: 'from-purple-500 to-indigo-400',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    path: '/tools/autopilot-score',
    outcomes: ['Founder Freedom Index Rating', 'Scale Bottleneck Index'],
    systemMetric: 'FREEDOM SCALE CALIBRATING',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex flex-col items-center justify-center p-4">
        {/* Semi-circular gauge */}
        <div className="relative w-32 h-20 overflow-hidden flex items-end justify-center">
          <div className="absolute w-28 h-28 rounded-full border-[10px] border-zinc-800" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
          <div className="absolute w-28 h-28 rounded-full border-[10px] border-transparent border-t-purple-500 border-l-purple-500 animate-pulse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(45deg)' }} />
          
          {/* Needle indicator */}
          <div 
            className="absolute bottom-0 w-1.5 h-12 bg-white origin-bottom rounded-t-full"
            style={{
              transform: 'rotate(25deg)',
              animation: 'gaugeWobble 3s ease-in-out infinite alternate',
              transformOrigin: 'bottom center'
            }}
          />
        </div>
        
        {/* Metric digital readout */}
        <div className="text-center mt-2 space-y-1">
          <span className="font-mono text-xl font-bold text-white tracking-wider">82.4%</span>
          <p className="font-mono text-[9px] text-purple-400/60 uppercase tracking-widest">AUTOPILOT INDEX ACTIVE</p>
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
    accent: 'from-amber-500 to-rose-500',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    path: '/tools/roi-time-machine',
    outcomes: ['Hours Recaptured Forecast', 'Cash Savings Calculation'],
    systemMetric: 'TIME & CASH TRACKING ON',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[9px] text-rose-400/60 uppercase tracking-widest">TEMPORAL SAVINGS MODEL</span>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">+384%</span>
        </div>
        
        {/* Floating statistics display */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-500 text-xs font-light">Time Recaptured</span>
            <span className="font-mono text-lg font-bold text-white tracking-tight">56.5 Days / yr</span>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '74%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500" 
            />
          </div>
        </div>

        <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
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
    accent: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    path: '/tools/growth-simulator',
    outcomes: ['Compounding Growth Predictor', 'Resource Allocator Planner'],
    systemMetric: 'SCALING MODEL LOADED',
    renderMockup: () => (
      <div className="relative w-full h-44 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex flex-col justify-between p-4">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] text-emerald-400/60 uppercase tracking-widest">SCENARIO Scale-B</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Vector SVG scaling chart */}
        <div className="flex-1 w-full flex items-end">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,45 C15,42 30,30 45,28 C60,26 75,12 100,2"
              fill="none"
              stroke="url(#chartGrad)"
              strokeWidth="2.5"
              className="stroke-emerald-400"
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
            <circle cx="45" cy="28" r="3" className="fill-emerald-400 animate-ping" />
            <circle cx="45" cy="28" r="2" className="fill-white" />
            <circle cx="100" cy="2" r="3.5" className="fill-emerald-300" />
          </svg>
        </div>

        <style>{`
          @keyframes drawChart {
            to { strokeDashoffset: 0; }
          }
        `}</style>
        
        <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 uppercase">
          <span>Q1 Baseline</span>
          <span className="text-white font-bold">12-Mo Target</span>
        </div>
      </div>
    )
  }
];

export default function GrowthIntelligenceLab() {
  return (
    <div className="pt-36 pb-24 bg-[#030712] text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="Growth Intelligence Lab | Emmanuel Odebiyi"
        description="Interactive simulators to calculate bottlenecks, forecast scaling potential, and evaluate process maturity for your business operations."
        keywords="growth intelligence lab, automation diagnostics, business scaling simulator, operations audit tool"
      />
      {/* Immersive mesh glow elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[50%] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 tracking-[0.2em] uppercase backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse" />
          Interactive Diagnostics Room
        </motion.div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Growth Intelligence <br />
            <span className="text-zinc-500 font-light">Laboratory.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Interactive simulators built with high-growth operations frameworks to calculate bottlenecks, forecast scaling potential, and evaluate process maturity.
          </motion.p>
        </div>

        <motion.button
          onClick={() => document.getElementById('lab-grid')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-zinc-100 transition-all shadow-xl shadow-white/5 font-mono text-xs uppercase tracking-widest"
        >
          Select a Simulator ↓
        </motion.button>
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
                  className="relative h-full p-8 lg:p-10 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 flex flex-col justify-between"
                  style={{
                    boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
                  }}
                >
                  {/* Internal Glow on Hover */}
                  <div 
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                    style={{ background: tool.glowColor }}
                  />

                  {/* Top content */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase border border-zinc-800/80 px-3.5 py-1.5 rounded-full bg-zinc-950/40">
                        {tool.badge}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {tool.systemMetric}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-white bg-gradient-to-br ${tool.accent.replace('from', 'to')}`}>
                          {tool.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {tool.name}
                        </h3>
                      </div>
                      <p className="text-zinc-400 font-light leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Rendering the custom live interactive mockup representation */}
                  <div className="my-8">
                    {tool.renderMockup()}
                  </div>

                  {/* Bottom metrics and Action Call */}
                  <div className="space-y-6 pt-4 border-t border-zinc-800/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Key Diagnostic Value</span>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent`}>
                          {tool.benefit}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-zinc-200 group-hover:translate-x-1.5 transition-all duration-300">
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
          className="bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden"
          style={{
            boxShadow: `0 30px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
          }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-mono text-zinc-400 tracking-[0.3em] uppercase">SYSTEM MANIFESTO</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-snug">
                Why build an <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Operations Engine?</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Most agencies and SaaS platforms grow by adding headcount to compensate for friction. We build automated systems that replace manual handoffs with APIs and databases. These diagnostics estimate the exact scope of friction in your systems so you can make math-based growth decisions.
              </p>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Database size={18} className="text-blue-400" />, title: 'Zero Data Loss', desc: 'Sync processes securely across teams with high reliability.' },
                { icon: <Cpu size={18} className="text-purple-400" />, title: 'Continuous Flow', desc: 'Keep lead flows, publishing, and customer queues running 24/7.' },
                { icon: <Layers size={18} className="text-rose-400" />, title: 'Frictionless APIs', desc: 'Connect siloed applications into a unified control panel.' },
                { icon: <Fingerprint size={18} className="text-emerald-400" />, title: 'Total Ownership', desc: 'Secure custom databases built for your specific workflow.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4 hover:border-zinc-700 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white text-sm font-bold tracking-tight">{item.title}</h4>
                    <p className="text-xs text-zinc-500 font-light leading-normal">{item.desc}</p>
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
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Need a custom operations blueprint?</h3>
          <p className="text-lg text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            The simulators show you where the gaps are. Let's build a customized system to fill them.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/services"
            className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl hover:bg-zinc-100 transition-all font-mono text-xs uppercase tracking-widest w-full sm:w-auto"
          >
            Explore Services
          </Link>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-transparent text-white border border-zinc-800 font-bold rounded-2xl hover:bg-zinc-900 transition-all font-mono text-xs uppercase tracking-widest w-full sm:w-auto"
          >
            Connect Strategically
          </Link>
        </div>
      </section>
    </div>
  );
}
