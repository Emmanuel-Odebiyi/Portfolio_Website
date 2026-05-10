import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Radar, 
  Gauge, 
  Timer, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Target, 
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
  path: string;
  outcomes: string[];
}

const tools: Tool[] = [
  {
    id: 'automation-radar',
    name: 'Automation Radar™',
    description: 'Identify hidden bottlenecks in your current workflows.',
    benefit: 'Uncover 10+ hours of weekly savings.',
    icon: <Radar size={32} />,
    color: 'bg-white/5',
    accent: 'text-blue-400',
    path: '/tools/automation-radar',
    outcomes: ['Efficiency Audit', 'Bottleneck Mapping']
  },
  {
    id: 'autopilot-score',
    name: 'Full Autopilot Score™',
    description: 'Measure how much of your business runs without you.',
    benefit: 'Benchmark your system intelligence.',
    icon: <Gauge size={32} />,
    color: 'bg-white/5',
    accent: 'text-purple-400',
    path: '/tools/autopilot-score',
    outcomes: ['System Maturity Index', 'Scale Readiness']
  },
  {
    id: 'roi-time-machine',
    name: 'ROI Time Machine™',
    description: 'Predict the financial impact of automating your marketing.',
    benefit: 'Calculate your 12-month growth trajectory.',
    icon: <Timer size={32} />,
    color: 'bg-white/5',
    accent: 'text-brand-gradient',
    path: '/tools/roi-time-machine',
    outcomes: ['Revenue Projection', 'Cost Reduction Analysis']
  },
  {
    id: 'growth-simulator',
    name: 'Growth Simulator™',
    description: 'Model different scaling scenarios for your SaaS or Agency.',
    benefit: 'Visualize your path to the next $1M.',
    icon: <TrendingUp size={32} />,
    color: 'bg-white/5',
    accent: 'text-orange-400',
    path: '/tools/growth-simulator',
    outcomes: ['Scenario Modeling', 'Resource Planning']
  }
];

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  return (
    <Link to={tool.path} className="block group">
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        className={`relative h-full p-8 rounded-[2.5rem] ${tool.color} border border-white/10 shadow-xl shadow-indigo-500/10 backdrop-blur-sm overflow-hidden transition-all duration-500`}
      >
        {/* Subtle Glow Effect */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${tool.accent.replace('text', 'bg')}`} />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <div className={`w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center ${tool.accent}`}>
              {tool.icon}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {tool.name}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {tool.description}
              </p>
              <p className={`font-bold ${tool.accent}`}>
                {tool.benefit}
              </p>
            </div>
          </div>

          {/* Hover Reveal Content / Mobile CTA */}
          <div className="mt-8 space-y-6">
            <div className="h-px bg-white/10 w-full" />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">
                {tool.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <div className={`w-1 h-1 rounded-full ${tool.accent.replace('text', 'bg')}`} />
                    {outcome}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform duration-300 w-full sm:w-auto justify-end">
                <span className="sm:hidden text-sm uppercase tracking-widest text-gray-500 font-mono mr-auto">Interactive Tool</span>
                <span>Launch Tool</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function GrowthIntelligenceLab() {
  return (
    <div className="pt-32 pb-20 bg-[#0B0F19] text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white tracking-[0.2em] uppercase backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
          Growth Intelligence Lab
        </motion.div>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            Powerful Tools to <br />
            <span className="text-gray-500">Diagnose & Scale.</span>
          </h1>
          <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Interactive frameworks designed to help you predict growth, automate bottlenecks, and benchmark your system intelligence.
          </p>
        </div>

        <motion.button
          onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-brand-gradient text-zinc-900 font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20"
        >
          Start with a Tool ↓
        </motion.button>
      </section>

      {/* Tools Grid */}
      <section id="tools-grid" className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Value Reinforcement */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-snug">
                Why use the <br />
                <span className="text-brand-gradient">Intelligence Lab?</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Most businesses guess their way to growth. We use data-driven simulations to remove the guesswork. These tools are the exact frameworks I use with high-growth SaaS companies to identify scaling opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Data-Driven', desc: 'Move beyond intuition with hard metrics.' },
                { title: 'Actionable', desc: 'Get immediate insights you can implement.' },
                { title: 'Predictive', desc: 'See your future growth before it happens.' },
                { title: 'Benchmarked', desc: 'Compare your systems to industry leaders.' }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gradient/10 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-white tracking-tight">Want help implementing this?</h3>
          <p className="text-xl text-gray-400 font-light">
            Tools give you the map. I help you drive the car. Let's discuss your custom automation strategy.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/services"
            className="px-10 py-5 bg-brand-gradient text-zinc-900 font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20"
          >
            Explore Services
          </Link>
          <Link 
            to="/contact"
            className="px-10 py-5 bg-transparent text-white border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            Contact Emmanuel
          </Link>
        </div>
      </section>
    </div>
  );
}
