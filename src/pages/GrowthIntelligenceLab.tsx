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
  Cpu, 
  Zap,
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  badge: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
  accent: string;
  path: string;
  outcomes: string[];
  systemMetric: string;
  renderMockup: () => React.ReactNode;
}

const tools: Tool[] = [
  {
    id: 'automation-radar',
    name: 'Workflow Bottleneck Finder™',
    badge: 'OPERATIONAL AUDIT',
    description: 'Diagnose team operations to pinpoint manual friction points and time sinks.',
    benefit: 'Reclaim up to 14+ hours of manual administrative tasks weekly.',
    icon: <Radar size={20} />,
    accent: 'var(--accent-teal)',
    path: '/tools/automation-radar',
    outcomes: ['Hours Lost Location Map', 'Task Friction Diagnostic'],
    systemMetric: 'SCANNING ACTIVE • 14.5 HRS DEFICIT',
    renderMockup: () => (
      <div className="relative w-full h-40 rounded-xl border overflow-hidden flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        {/* Radar concentric rings */}
        <div className="absolute w-32 h-32 rounded-full border flex items-center justify-center opacity-30" style={{ borderColor: 'var(--border-card)' }}>
          <div className="w-20 h-20 rounded-full border flex items-center justify-center opacity-50" style={{ borderColor: 'var(--border-card)' }}>
            <div className="w-10 h-10 rounded-full border" style={{ borderColor: 'var(--border-card)' }} />
          </div>
        </div>
        {/* Crosshairs */}
        <div className="absolute w-36 h-px opacity-30" style={{ backgroundColor: 'var(--border-card)' }} />
        <div className="absolute h-36 w-px opacity-30" style={{ backgroundColor: 'var(--border-card)' }} />
        
        {/* Radar sweep */}
        <div className="absolute w-16 h-16 origin-bottom-right bottom-1/2 right-1/2 overflow-hidden">
          <div 
            className="w-16 h-16 rounded-tl-full bg-gradient-to-tr from-transparent to-[var(--accent-teal)]"
            style={{
              animation: 'spin 4s linear infinite',
              transformOrigin: 'bottom right',
              opacity: 0.35
            }}
          />
        </div>

        {/* Tactical status pulses */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse" />
      </div>
    )
  },
  {
    id: 'autopilot-score',
    name: 'Business Freedom Calculator™',
    badge: 'FOUNDER AUTONOMY SCORE',
    description: 'Audit your current business operations to evaluate how smoothly you run without daily micromanagement.',
    benefit: 'Establish a clear, step-by-step autopilot roadmap for leadership.',
    icon: <Gauge size={20} />,
    accent: 'var(--cta-blue)',
    path: '/tools/autopilot-score',
    outcomes: ['Founder Freedom Index', 'Bottleneck Elimination Matrix'],
    systemMetric: 'INDEX: 82.4% • LEVEL 3 AUTONOMOUS',
    renderMockup: () => (
      <div className="relative w-full h-40 rounded-xl border overflow-hidden flex flex-col items-center justify-center p-4 space-y-2" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[var(--cta-blue)] animate-pulse" />
          <span className="font-mono text-2xl font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>82.4%</span>
        </div>
        <div className="w-48 h-2 rounded-full overflow-hidden bg-[var(--border-card)]">
          <div className="h-full bg-[var(--cta-blue)] rounded-full w-[82%]" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
          FOUNDER TIME DECOUPLED • SYS-STABLE
        </span>
      </div>
    )
  },
  {
    id: 'roi-time-machine',
    name: 'Time & Cost Savings Calculator™',
    badge: 'HOURS & DOLLARS SAVED',
    description: 'Calculate the exact operational hours and contractor capital saved via automation.',
    benefit: 'Map out 12 months of compounding time and dollar retention.',
    icon: <Timer size={20} />,
    accent: 'var(--accent-amber)',
    path: '/tools/roi-time-machine',
    outcomes: ['Hours Recaptured Forecast', 'Cash Savings Calculation'],
    systemMetric: '+384% ROI • 56.5 DAYS SAVED/YR',
    renderMockup: () => (
      <div className="relative w-full h-40 rounded-xl border overflow-hidden flex flex-col justify-between p-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-[var(--text-muted)]">ANNUAL PROJECTION</span>
          <span className="font-bold text-[var(--accent-amber)]">+384% DELTA</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline font-mono">
            <span className="text-xs text-[var(--text-muted)]">Time Recaptured</span>
            <span className="text-base font-bold" style={{ color: 'var(--text-body)' }}>56.5 Days / Year</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--border-card)] overflow-hidden">
            <div className="h-full bg-[var(--accent-amber)] w-[76%]" />
          </div>
        </div>
        <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>MANUAL: 80 HRS/MO</span>
          <span>AUTOMATED: 12 HRS/MO</span>
        </div>
      </div>
    )
  },
  {
    id: 'growth-simulator',
    name: '12-Month Growth Forecaster™',
    badge: '12-MONTH REVENUE MODEL',
    description: 'Model organic search and workflow scenarios to eliminate founder risk.',
    benefit: 'Forecast conversion milestones based on proven B2B benchmarks.',
    icon: <TrendingUp size={20} />,
    accent: 'var(--accent-teal)',
    path: '/tools/growth-simulator',
    outcomes: ['Compounding Growth Predictor', 'Resource Allocator Matrix'],
    systemMetric: 'SCENARIO-B • $127K MODEL',
    renderMockup: () => (
      <div className="relative w-full h-40 rounded-xl border overflow-hidden flex flex-col justify-between p-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-[var(--text-muted)]">PROJECTION CURVE</span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
        </div>
        <svg className="w-full h-16 overflow-visible" viewBox="0 0 100 40">
          <path
            d="M0,35 C20,32 40,24 60,18 C80,12 90,6 100,2"
            fill="none"
            stroke="var(--accent-teal)"
            strokeWidth="2"
          />
          <circle cx="60" cy="18" r="2.5" fill="var(--accent-amber)" />
          <circle cx="100" cy="2" r="3" fill="var(--accent-teal)" />
        </svg>
        <div className="flex justify-between text-[9px] font-mono text-[var(--text-muted)]">
          <span>BASELINE: $25K</span>
          <span className="text-[var(--accent-teal)] font-bold">PROJECTED: $152K</span>
        </div>
      </div>
    )
  }
];

export default function GrowthIntelligenceLab() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Growth Intelligence Lab | Interactive Calculators & Audits"
        description="Interactive calculators, bottleneck finders, and ROI modeling tools for B2B SaaS founders. Audited numbers, real operational forecasts."
        keywords="growth intelligence, marketing calculators, automation ROI calculator, content bottleneck finder"
      />

      {/* Header — Raycast Instrument Aesthetics */}
      <section className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans font-bold tracking-widest uppercase" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
            <Terminal size={14} className="text-[var(--accent-amber)]" />
            LAB INSTRUMENTS &amp; CALCULATORS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.98] font-display" style={{ color: 'var(--text-body)' }}>
            Interactive Calculators. <br />
            <span className="italic font-serif font-normal text-[var(--accent-amber)]">
              Operational Clarity.
            </span>
          </h1>

          <p className="text-lg md:text-xl font-normal leading-relaxed text-[var(--text-muted)] font-sans max-w-2xl">
            It is not about saving time. It is about never wasting it. Use these interactive instruments to audit bottlenecks, calculate automation ROI, and simulate scaling curves in minutes.
          </p>
        </div>
      </section>

      {/* 2x2 Instrument Grid (Raycast Density) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="p-8 space-y-6">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-muted)]">
                    <span className="p-1.5 rounded-lg border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                      {tool.icon}
                    </span>
                    <span>{tool.badge}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold text-[var(--accent-amber)]" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                    READY
                  </span>
                </div>

                {/* Title & Prose */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                    {tool.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] font-normal leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Live Mockup Screen */}
                <div className="pt-2">
                  {tool.renderMockup()}
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    OUTPUT SPECIFICATION:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tool.outcomes.map((outcome, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-md border"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      >
                        <CheckCircle2 size={12} className="text-[var(--accent-teal)]" />
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="px-8 py-5 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-page)' }}>
                <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                  {tool.systemMetric}
                </span>
                <Link
                  to={tool.path}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:brightness-110"
                  style={{
                    backgroundColor: 'var(--cta-blue)',
                    color: '#ffffff'
                  }}
                >
                  <span>Launch Instrument</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisory Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-amber)] font-bold">BESPOKE ARCHITECTURE</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Need a Custom System Built for Your Stack?
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              I audit, architect, and deploy custom n8n, Zapier, Webhook, and OpenAI pipelines connected directly to HubSpot, Airtable, and custom web applications.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all shadow-md hover:brightness-110"
            style={{ backgroundColor: 'var(--text-body)', color: 'var(--bg-page)' }}
          >
            Request Systems Architecture Call →
          </Link>
        </div>
      </section>

    </div>
  );
}
