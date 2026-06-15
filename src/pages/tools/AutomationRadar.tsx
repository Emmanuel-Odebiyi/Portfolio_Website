import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar as RadarIcon, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Lock,
  ArrowRight,
  RefreshCcw,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// --- Types ---

type Industry = 'SaaS' | 'E-commerce' | 'Marketing Agency' | 'Others';
type TeamSize = 'Solo' | '2-5' | '6-20' | '20+';
type PriorityTier = 'Critical' | 'High Priority' | 'Moderate' | 'Optimized';

interface DimensionScores {
  taskVolume: number;       // 25% weight - How often does manual task occur?
  timeConsumption: number;  // 25% weight - Hours/week burned on this
  errorRate: number;        // 20% weight - Frequency of mistakes/rework
  handoffs: number;         // 15% weight - People/systems data passes through
  toolGap: number;          // 15% weight - Manually bridging disconnected tools
}

interface FormData {
  companyName: string;
  industry: Industry;
  customIndustry?: string;
  teamSize: TeamSize;
  cm: DimensionScores;
  ls: DimensionScores;
  oa: DimensionScores;
  cs: DimensionScores;
}

interface DeptScore {
  name: string;
  score: number;           // 0-100 weighted score
  tier: PriorityTier;
  value: number;           // for radar chart
  color: string;
  dimensions: DimensionScores;
  hoursRecoverable: number;
  recommendations: string[];
  tools: string[];
}

// --- Constants ---

const DIMENSION_WEIGHTS = {
  taskVolume: 0.25,
  timeConsumption: 0.25,
  errorRate: 0.20,
  handoffs: 0.15,
  toolGap: 0.15,
};

const DEFAULT_DIMS: DimensionScores = {
  taskVolume: 3,
  timeConsumption: 3,
  errorRate: 2,
  handoffs: 2,
  toolGap: 3,
};

const INITIAL_FORM: FormData = {
  companyName: '',
  industry: 'SaaS',
  customIndustry: '',
  teamSize: '2-5',
  cm: { ...DEFAULT_DIMS },
  ls: { ...DEFAULT_DIMS },
  oa: { ...DEFAULT_DIMS },
  cs: { ...DEFAULT_DIMS },
};

const TEAM_MULTIPLIER: Record<TeamSize, number> = {
  'Solo': 1, '2-5': 3, '6-20': 10, '20+': 20
};

const DEPT_NAMES = {
  CM: 'Content & Marketing',
  LS: 'Lead Gen & Sales',
  OA: 'Operations & Admin',
  CS: 'Customer Success',
};

const DIMENSION_LABELS: Record<keyof DimensionScores, { label: string; tooltip: string }> = {
  taskVolume: { label: 'How often do you repeat these tasks?', tooltip: 'How often does this manual task occur in your day? (1=Rarely, 5=Multiple times daily)' },
  timeConsumption: { label: 'How much time is lost here?', tooltip: 'How many total hours per week are burned on this? (1=Under 2 hours, 5=20+ hours)' },
  errorRate: { label: 'How often do mistakes happen?', tooltip: 'How often do typos or human errors require corrections? (1=Almost never, 5=Constantly)' },
  handoffs: { label: 'How many tools/people touch this task?', tooltip: 'How many steps or systems does data pass through? (1=Direct/Simple, 5=5+ handoffs)' },
  toolGap: { label: 'Do you have to manually copy-paste data?', tooltip: 'Are you copy-pasting info or bridging disconnected software manually? (1=No, fully automated, 5=Yes, constant copy-paste)' },
};

const DIMENSION_HELPERS: Record<keyof DimensionScores, string[]> = {
  taskVolume: [
    "Rarely / Occasional",
    "Weekly repeat",
    "Daily task",
    "Multi-times daily",
    "Near-constant repetition"
  ],
  timeConsumption: [
    "< 2 hours/week",
    "2-5 hours/week",
    "5-10 hours/week",
    "10-20 hours/week",
    "20+ hours/week"
  ],
  errorRate: [
    "Virtually never",
    "Rare occurrence",
    "Occasional corrections needed",
    "Frequent typos/rework",
    "Constant errors/double-checks"
  ],
  handoffs: [
    "1 person (direct)",
    "2 people/systems",
    "3-4 steps/transfers",
    "5+ steps/handoffs",
    "Complex chain of tools/people"
  ],
  toolGap: [
    "Fully integrated APIs",
    "Minor manual export",
    "Regular copy-pasting",
    "Heavy manual bridging",
    "Constant copy-paste across tabs"
  ]
};

const DimensionSlider = ({
  dimKey, value, onChange
}: {
  dimKey: keyof DimensionScores; value: number; onChange: (v: number) => void; key?: React.Key;
}) => {
  const info = DIMENSION_LABELS[dimKey];
  const colors = ['bg-emerald-500', 'bg-lime-500', 'bg-amber-500', 'bg-orange-500', 'bg-rose-500'];
  const percentage = (value - 1) * 25;
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>{info.label}</label>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white ${colors[value - 1]}`}>{value}/5</span>
      </div>
      <p className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>{info.tooltip}</p>
      <input
        type="range" min={1} max={5} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500 transition-all"
        style={{ 
          background: `linear-gradient(to right, var(--accent-amber) 0%, var(--accent-amber) ${percentage}%, var(--bg-page) ${percentage}%, var(--bg-page) 100%)` 
        }}
      />
      <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
        <span>Low</span>
        <span className="font-bold text-amber-500 text-center px-1">{DIMENSION_HELPERS[dimKey][value - 1]}</span>
        <span>High</span>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border p-4 rounded-xl shadow-xl backdrop-blur-md text-left" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
        <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{data.name}</p>
        <p className={`text-sm font-bold ${data.color.replace('bg-', 'text-')}`}>
          {data.tier} — Score: {data.score}/100
        </p>
      </div>
    );
  }
  return null;
};

export default function AutomationRadar() {
  const [step, setStep] = useState<'input' | 'calculating' | 'results'>('input');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isEmailUnlocked, setIsEmailUnlocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [scanMessageIndex, setScanMessageIndex] = useState(0);

  const scanMessages = [
    "Analyzing workflow patterns...",
    "Mapping department bottlenecks...",
    "Calculating time-saving potential...",
    "Generating custom tool stack...",
    "Finalizing your Radar™..."
  ];

  const results = useMemo(() => {
    const calcWeightedScore = (dims: DimensionScores): number => {
      const raw =
        dims.taskVolume * DIMENSION_WEIGHTS.taskVolume +
        dims.timeConsumption * DIMENSION_WEIGHTS.timeConsumption +
        dims.errorRate * DIMENSION_WEIGHTS.errorRate +
        dims.handoffs * DIMENSION_WEIGHTS.handoffs +
        dims.toolGap * DIMENSION_WEIGHTS.toolGap;
      return Math.round(((raw - 1) / 4) * 100);
    };

    const scoreToPriority = (s: number): PriorityTier => {
      if (s >= 75) return 'Critical';
      if (s >= 50) return 'High Priority';
      if (s >= 25) return 'Moderate';
      return 'Optimized';
    };

    const tierToColor = (t: PriorityTier) => {
      if (t === 'Critical') return 'bg-rose-500';
      if (t === 'High Priority') return 'bg-amber-500';
      if (t === 'Moderate') return 'bg-blue-500';
      return 'bg-emerald-500';
    };

    const teamMult = TEAM_MULTIPLIER[formData.teamSize];
    const estimateHours = (dims: DimensionScores) => {
      const intensity = (dims.taskVolume + dims.timeConsumption) / 2;
      return Math.round(intensity * 1.5 * teamMult * 0.7);
    };

    const buildDept = (
      key: 'cm' | 'ls' | 'oa' | 'cs',
      name: string,
      recs: string[],
      tools: string[]
    ): DeptScore => {
      const dims = formData[key];
      const score = calcWeightedScore(dims);
      const tier = scoreToPriority(score);
      return {
        name, score, tier,
        value: score,
        color: tierToColor(tier),
        dimensions: dims,
        hoursRecoverable: estimateHours(dims),
        recommendations: recs,
        tools,
      };
    };

    const cm = buildDept('cm', DEPT_NAMES.CM, [
      'Automate social media distribution from your CMS.',
      'Implement an AI-driven content repurposing workflow.',
      'Set up automated SEO reporting and keyword tracking.',
    ], ['Zapier', 'Buffer', 'Jasper AI', 'Airtable']);

    const ls = buildDept('ls', DEPT_NAMES.LS, [
      'Deploy an automated lead qualification sequence.',
      'Integrate your CRM with your meeting scheduler.',
      'Set up automated follow-up triggers for dormant leads.',
    ], ['HubSpot', 'Calendly', 'Instantly.ai', 'Make.com']);

    const oa = buildDept('oa', DEPT_NAMES.OA, [
      'Build a centralized dashboard to eliminate manual reporting.',
      'Automate data syncing between your core business tools.',
      'Implement automated invoicing and expense tracking.',
    ], ['Airtable', 'Make.com', 'n8n', 'Looker Studio']);

    const cs = buildDept('cs', DEPT_NAMES.CS, [
      'Automate your client onboarding email sequence.',
      'Set up automated NPS or feedback collection triggers.',
      'Implement a self-service knowledge base or AI support bot.',
    ], ['Intercom', 'Zendesk', 'Zapier', 'Loom']);

    const depts = [cm, ls, oa, cs];
    const avgScore = depts.reduce((a, d) => a + d.score, 0) / depts.length;
    const readinessScore = Math.round(100 - avgScore);
    const biggestOpp = [...depts].sort((a, b) => b.score - a.score)[0];
    const hoursSaved = depts.reduce((a, d) => a + d.hoursRecoverable, 0);

    return { depts, readinessScore, biggestOpp, hoursSaved };
  }, [formData]);

  const handleStartScan = () => {
    setStep('calculating');
    
    const interval = setInterval(() => {
      setScanMessageIndex(prev => (prev + 1) % scanMessages.length);
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  const handleUnlockReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setShowSuccess(true);
      
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreywnvb';
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            tool: 'Automation Radar',
            company: formData.companyName,
            industry: formData.industry === 'Others' ? formData.customIndustry : formData.industry,
            inputs: formData,
            results: {
              readinessScore: results.readinessScore,
              biggestOpportunity: results.biggestOpp.name,
              hoursSaved: results.hoursSaved
            }
          }),
        });
        setIsEmailUnlocked(true);
      } catch (error) {
        console.error('Submission failed:', error);
        setIsEmailUnlocked(true);
      }
    }
  };

  if (step === 'calculating') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
        <div className="w-24 h-24 relative mb-12 z-10">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-amber-500/20 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-amber-500">
            <RadarIcon size={40} className="animate-pulse" />
          </div>
        </div>

        <div className="space-y-4 max-w-sm mx-auto z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={scanMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4 font-display" style={{ color: 'var(--text-body)' }}>
                {scanMessages[scanMessageIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
          <p className="font-light" style={{ color: 'var(--text-muted)' }}>
            Our AI is analyzing your workflows and mapping automation opportunities across all departments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden print-area" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Automation Radar | Emmanuel Odebiyi"
        description="Map your current marketing stack, uncover hidden bottlenecks, and get a prioritized automation roadmap with ROI estimates for each opportunity."
        keywords="automation radar, marketing bottleneck finder, operations audit tool, automation ROI estimator"
      />
      {/* Dynamic Print Stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 20mm 15mm 20mm 15mm;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            font-family: system-ui, -apple-system, sans-serif !important;
          }
          header, nav, footer, button, .no-print, #calculator-inputs, .pt-32, .pb-20, .absolute, .print-hide {
            display: none !important;
          }
          .min-h-screen {
            min-height: auto !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          .print-area {
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 0 !important;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #0f172a !important;
          }
          p, span, li, td, th, div {
            color: #334155 !important;
          }
          .text-white {
            color: #0f172a !important;
          }
          .text-zinc-400 {
            color: #64748b !important;
          }
          .text-amber-500, .text-amber-400 {
            color: #b45309 !important;
            font-weight: bold !important;
          }
          .border-white\\/10 {
            border-color: #cbd5e1 !important;
          }
          .bg-white\\/5 {
            background: #f8fafc !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 16px !important;
            box-shadow: none !important;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .space-y-32 > * + * {
            margin-top: 4rem !important;
          }
          .print-header {
            display: block !important;
            border-bottom: 2px solid #0f172a !important;
            padding-bottom: 8px !important;
            margin-bottom: 24px !important;
            font-family: inherit !important;
          }
          .print-footer {
            display: block !important;
            position: fixed;
            bottom: 0;
            width: 100%;
            border-top: 1px solid #cbd5e1 !important;
            padding-top: 8px !important;
            font-size: 10px !important;
            color: #64748b !important;
            text-align: center;
          }
        }
      `}} />

      {/* Hidden Print Header */}
      <div className="hidden print-header text-slate-950 font-display">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold tracking-tight">EMMANUEL ODEBIYI</h2>
            <p className="text-xs uppercase tracking-wider text-slate-500">Growth Intelligence & Automation Roadmap</p>
          </div>
          <div className="text-right text-xs font-mono">
            <p>radar.odebiyi.com</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Hidden Print Footer */}
      <div className="hidden print-footer">
        <p>© {new Date().getFullYear()} Emmanuel Odebiyi. All rights reserved. Generated on Emmanuel's Automation Lab.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 print-hide">
          <div className="space-y-4 text-left">
            <Link to="/growth-intelligence-lab" className="inline-flex items-center gap-2 transition-colors text-sm font-sans font-bold uppercase tracking-widest group border rounded-full px-4 py-1.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Lab
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Workday Bottleneck Finder<span style={{ color: 'var(--accent-amber)' }}>™</span>
            </h1>
            <p className="text-xl font-light max-w-2xl animate-none" style={{ color: 'var(--text-muted)' }}>
              Scan your daily operations to pinpoint exactly what is slowing down your team and wasting hours.
            </p>
          </div>
          {step === 'results' && (
            <button 
              onClick={() => {
                setStep('input');
                setIsEmailUnlocked(false);
                setShowSuccess(false);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer hover:brightness-110"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            >
              <RefreshCcw size={18} />
              New Scan
            </button>
          )}
        </div>

        {step === 'input' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 space-y-12">
              {/* Onboarding Guide Banner */}
              <div className="p-8 rounded-[2rem] border relative overflow-hidden text-left bg-gradient-to-br from-amber-500/10 via-transparent to-transparent shadow-xl" style={{ borderColor: 'var(--border-card)' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full" />
                <h4 className="text-sm font-mono uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2 font-bold">
                  <Zap size={16} className="animate-pulse text-amber-500" /> Onboarding Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>1. What it is</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      A precision diagnostic engine mapping friction points in your daily work tasks.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>2. What to fill</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Rate the frequency, time loss, errors, and manual tasks for each department on a 1-5 scale.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>3. What you get</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      An interactive radar map, custom time savings estimates, and a curated tools list.
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Stepper & Dots */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 text-left no-print">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Assessment Sections</span>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { label: 'Profile', id: 'step-profile' },
                    { label: 'Marketing', id: 'step-cm' },
                    { label: 'Sales', id: 'step-ls' },
                    { label: 'Ops', id: 'step-oa' },
                    { label: 'Success', id: 'step-cs' }
                  ].map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        const el = document.getElementById(s.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl transition-all border hover:border-amber-500/50 cursor-pointer text-left"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-card)',
                      }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                        style={{
                          backgroundColor: 'var(--bg-page)',
                          color: 'var(--accent-amber)'
                        }}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div id="step-profile" className="space-y-4 text-left scroll-mt-28">
                  <h3 className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>01. Business Profile</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Company Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all border font-sans"
                      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Industry</label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value as Industry})}
                        className="w-full rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all cursor-pointer font-sans border"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      >
                        <option value="SaaS">SaaS</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Marketing Agency">Marketing Agency</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Team Size</label>
                      <select 
                        value={formData.teamSize}
                        onChange={(e) => setFormData({...formData, teamSize: e.target.value as TeamSize})}
                        className="w-full rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all cursor-pointer font-sans border"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      >
                        <option value="Solo">Solo</option>
                        <option value="2-5">2-5</option>
                        <option value="6-20">6-20</option>
                        <option value="20+">20+</option>
                      </select>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {formData.industry === 'Others' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Specify Industry</label>
                        <input 
                          type="text"
                          placeholder="e.g. Real Estate, Healthcare..."
                          value={formData.customIndustry}
                          onChange={(e) => setFormData({...formData, customIndustry: e.target.value})}
                          className="w-full rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all border font-sans"
                          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
 
                {/* Department Dimension Scoring Sections */}
                {([
                  { key: 'cm' as const, num: '02', title: 'Content & Marketing', desc: 'Publishing, SEO, social scheduling, content repurposing' },
                  { key: 'ls' as const, num: '03', title: 'Lead Gen & Sales', desc: 'Lead qualification, follow-ups, CRM, pipeline management' },
                  { key: 'oa' as const, num: '04', title: 'Operations & Admin', desc: 'Data entry, reporting, invoicing, cross-tool syncing' },
                  { key: 'cs' as const, num: '05', title: 'Customer Success', desc: 'Onboarding, support tickets, feedback, retention' },
                ]).map((dept) => {
                  const deptKey = dept.key;
                  return (
                    <div id={`step-${deptKey}`} key={deptKey} className="scroll-mt-28 space-y-4 p-6 rounded-3xl border text-left" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                      <div className="space-y-1">
                        <h3 className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-body)' }}>{dept.num}. {dept.title}</h3>
                        <p className="text-[11px] font-light" style={{ color: 'var(--text-muted)' }}>{dept.desc}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        {(Object.keys(DIMENSION_LABELS) as (keyof DimensionScores)[]).map((dimKey) => {
                          const val = (formData[deptKey] as DimensionScores)[dimKey];
                          return (
                            <DimensionSlider
                              key={dimKey}
                              dimKey={dimKey}
                              value={val}
                              onChange={(v: number) => {
                                setFormData((prev) => {
                                  const updatedDept = {
                                    ...(prev[deptKey] as DimensionScores),
                                    [dimKey]: v
                                  } as DimensionScores;
                                  return {
                                    ...prev,
                                    [deptKey]: updatedDept
                                  } as FormData;
                                });
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
 
              <button
                onClick={handleStartScan}
                className="w-full py-6 text-slate-950 font-bold rounded-2xl transition-all shadow-xl hover:brightness-110 flex items-center justify-center gap-3 group cursor-pointer font-sans uppercase tracking-wider text-sm"
                style={{ 
                  backgroundColor: 'var(--btn-cta-bg)', 
                  color: 'var(--btn-cta-text)',
                  boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)'
                }}
              >
                Scan Workday Bottlenecks
                <Zap size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
 
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 text-left">
              <div className="p-10 rounded-[2.5rem] border backdrop-blur-md space-y-8" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-500 shadow-xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                  <RadarIcon size={32} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>How it works</h2>
                  <p className="text-lg font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                    Our diagnostic engine maps your answers against 50+ automation frameworks to identify where you're losing the most time and revenue.
                  </p>
                </div>
                <ul className="space-y-4">
                  {[
                    'Department-by-department analysis',
                    'Visual opportunity heatmap',
                    'Actionable tool recommendations',
                    'Estimated time-saving impact'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
                      <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Instant Results Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
              {/* Radar Chart */}
              <div className="lg:col-span-6 aspect-square rounded-[3rem] border p-8 flex items-center justify-center backdrop-blur-md" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="65%" 
                    data={results.depts}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  >
                    <PolarGrid stroke="rgba(14, 28, 42, 0.15)" />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 500 }}
                    />
                    <Radar
                      name="Opportunity"
                      dataKey="value"
                      stroke="#fbbf24"
                      fill="#fbbf24"
                      fillOpacity={0.3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Score & Summary */}
              <div className="lg:col-span-6 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                    {formData.companyName ? `${formData.companyName} Bottleneck Map` : 'Scan Results'}
                  </h3>
                  <div className="flex items-baseline gap-4">
                    <span className="text-8xl font-bold tracking-tighter font-display" style={{ color: 'var(--text-body)' }}>{results.readinessScore}</span>
                    <div className="space-y-1">
                      <span className="text-2xl font-bold" style={{ color: 'var(--text-muted)' }}>/ 100</span>
                      <p className="text-sm font-sans font-bold uppercase tracking-widest text-amber-500">Friction Index</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl border backdrop-blur-md space-y-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${results.biggestOpp.color}`}>
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Biggest Opportunity</p>
                      <p className="text-xl font-bold" style={{ color: 'var(--text-body)' }}>{results.biggestOpp.name}</p>
                    </div>
                  </div>
                  <p className="text-lg font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                    You are currently losing approximately <span className="font-bold animate-pulse" style={{ color: 'var(--text-body)' }}>{results.hoursSaved} hours/month</span> to manual work in <span className="font-bold" style={{ color: 'var(--text-body)' }}>{results.biggestOpp.name}</span> that can be fully automated.
                  </p>
                </div>

                <div className="p-8 rounded-3xl border shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <AnimatePresence mode="wait">
                    {isEmailUnlocked || showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center space-y-6"
                      >
                        <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", damping: 12, stiffness: 200 }}
                           className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20"
                        >
                           <CheckCircle2 size={40} />
                        </motion.div>
                        <div className="space-y-2 px-4">
                          <h4 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Roadmap Unlocked!</h4>
                          <p className="font-light" style={{ color: 'var(--text-muted)' }}>We've also emailed a copy of your custom automation roadmap to <span className="text-amber-500 font-semibold">{email}</span>.</p>
                        </div>
                        {!isEmailUnlocked && (
                          <motion.div 
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-amber-500 flex items-center gap-2 text-sm font-bold"
                          >
                            Unlocking full report...
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-8"
                      >
                        <div className="flex items-center gap-4" style={{ color: 'var(--text-body)' }}>
                          <Lock size={20} className="text-amber-500 shrink-0" />
                          <p className="text-sm font-light">Unlock the full department breakdown and tool roadmap.</p>
                        </div>
                        <form onSubmit={handleUnlockReport} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input 
                              required
                              type="text" 
                              placeholder="First Name" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full border rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-sans"
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                            <input 
                              required
                              type="email" 
                              placeholder="Email Address" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-sans"
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                          </div>
                          <button className="w-full py-5 text-slate-950 font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 cursor-pointer font-sans uppercase tracking-wider text-sm" style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}>
                            Unlock Full Report
                            <ArrowRight size={20} />
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Full Report Section (Conditional) */}
            <AnimatePresence>
              {isEmailUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-32 pt-20 border-t"
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  {/* Department Breakdown */}
                  <div className="space-y-16 text-left">
                    <div className="text-center space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Department Breakdown</h2>
                      <p className="text-xl font-light" style={{ color: 'var(--text-muted)' }}>Specific automation roadmaps for your business profile.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[...results.depts].sort((a, b) => b.score - a.score).map((dept, i) => (
                        <div key={dept.name} className="p-10 rounded-[3rem] border backdrop-blur-md space-y-8 relative overflow-hidden group interactive-card" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${dept.color}`} />
                          
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Priority 0{i+1}</span>
                              <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{dept.name}</h3>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest font-bold text-white ${dept.color}`}>
                              {dept.tier} — {dept.score}/100
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Recommendations</p>
                            <ul className="space-y-3">
                              {dept.recommendations.map((rec, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>
                                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dept.color}`} />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Suggested Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.tools.map(tool => (
                                <span key={tool} className="px-3 py-1 border rounded-lg text-xs font-medium" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Impact */}
                  <div className="border rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                    <div className="relative z-10 space-y-6">
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                        {formData.companyName ? `${formData.companyName}'s` : 'Estimated'} Annual Impact
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                        <div className="space-y-2">
                          <p className="text-6xl font-bold tracking-tighter font-display text-amber-500">{results.hoursSaved * 12}</p>
                          <p className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Hours Saved / Year</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold tracking-tighter font-display" style={{ color: 'var(--text-body)' }}>70%</p>
                          <p className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Admin Reduction</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold tracking-tighter font-display" style={{ color: 'var(--text-body)' }}>2.4x</p>
                          <p className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Scaling Capacity</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Final CTA */}
                  <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Want a custom automation roadmap?</h3>
                      <p className="text-xl font-light" style={{ color: 'var(--text-muted)' }}>
                        The Radar identifies the gaps. I build the systems to close them. Let's discuss how to implement these recommendations for your specific business.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link 
                        to="/about#contact-form"
                        className="px-10 py-5 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 group font-sans uppercase tracking-wider text-sm hover:brightness-110"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                      >
                        Book a Free 30-Minute Strategy Call
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                      <button 
                        onClick={() => window.print()}
                        className="px-10 py-5 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer font-sans uppercase tracking-wider text-sm hover:brightness-110"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                      >
                        <Download size={20} />
                        Download PDF Report
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function ArrowUpRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
