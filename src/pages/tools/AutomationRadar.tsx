import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar as RadarIcon, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Zap, 
  ChevronRight, 
  Mail, 
  Lock,
  ArrowRight,
  BarChart3,
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
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// --- Types ---

type Industry = 'SaaS' | 'E-commerce' | 'Marketing Agency' | 'Others';
type TeamSize = 'Solo' | '2-5' | '6-20' | '20+';
type PriorityTier = 'Critical' | 'High Priority' | 'Moderate' | 'Optimized';

// Each department is scored across 5 weighted dimensions (1-5 scale)
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
  // Content & Marketing dimensions
  cm: DimensionScores;
  // Lead Gen & Sales dimensions
  ls: DimensionScores;
  // Operations & Admin dimensions
  oa: DimensionScores;
  // Customer Success dimensions
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

// Team size multiplier for hours calculation
const TEAM_MULTIPLIER: Record<TeamSize, number> = {
  'Solo': 1, '2-5': 3, '6-20': 10, '20+': 20
};

const DEPT_NAMES = {
  CM: 'Content & Marketing',
  LS: 'Lead Gen & Sales',
  OA: 'Operations & Admin',
  CS: 'Customer Success',
};

// --- Helper Components ---

const DIMENSION_LABELS: Record<keyof DimensionScores, { label: string; tooltip: string }> = {
  taskVolume: { label: 'How often do you repeat these tasks?', tooltip: 'How often does this manual task occur in your day? (1=Rarely, 5=Multiple times daily)' },
  timeConsumption: { label: 'How much time is lost here?', tooltip: 'How many total hours per week are burned on this? (1=Under 2 hours, 5=20+ hours)' },
  errorRate: { label: 'How often do mistakes happen?', tooltip: 'How often do typos or human errors require corrections? (1=Almost never, 5=Constantly)' },
  handoffs: { label: 'How many tools/people touch this task?', tooltip: 'How many steps or systems does data pass through? (1=Direct/Simple, 5=5+ handoffs)' },
  toolGap: { label: 'Do you have to manually copy-paste data?', tooltip: 'Are you copy-pasting info or bridging disconnected software manually? (1=No, fully automated, 5=Yes, constant copy-paste)' },
};

const DimensionSlider = ({
  dimKey, value, onChange
}: {
  dimKey: keyof DimensionScores; value: number; onChange: (v: number) => void;
  key?: React.Key;
}) => {
  const info = DIMENSION_LABELS[dimKey];
  const colors = ['bg-emerald-500', 'bg-lime-500', 'bg-amber-500', 'bg-orange-500', 'bg-rose-500'];
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-zinc-300 tracking-tight">{info.label}</label>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white ${colors[value - 1]}`}>{value}/5</span>
      </div>
      <p className="text-[10px] text-zinc-400 font-light">{info.tooltip}</p>
      <input
        type="range" min={1} max={5} step={1} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
        <span>Low</span><span>High</span>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/90 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">{data.name}</p>
        <p className={`text-sm font-bold ${data.color.replace('bg-', 'text-')}`}>
          {data.tier} — Score: {data.score}/100
        </p>
      </div>
    );
  }
  return null;
};

// --- Main Component ---

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

  // --- Weighted Scoring Logic (Industry-Standard Impact-Feasibility Model) ---

  const results = useMemo(() => {
    // Calculate weighted score for a department (0-100)
    const calcWeightedScore = (dims: DimensionScores): number => {
      const raw =
        dims.taskVolume * DIMENSION_WEIGHTS.taskVolume +
        dims.timeConsumption * DIMENSION_WEIGHTS.timeConsumption +
        dims.errorRate * DIMENSION_WEIGHTS.errorRate +
        dims.handoffs * DIMENSION_WEIGHTS.handoffs +
        dims.toolGap * DIMENSION_WEIGHTS.toolGap;
      // Normalize from 1-5 scale to 0-100
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

    // Estimate recoverable hours: higher score = more hours wasted
    const teamMult = TEAM_MULTIPLIER[formData.teamSize];
    const estimateHours = (dims: DimensionScores) => {
      const intensity = (dims.taskVolume + dims.timeConsumption) / 2;
      // Base hours per person scaled by intensity, with 70% automation efficiency
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

  // --- Handlers ---

  const handleStartScan = () => {
    setStep('calculating');
    
    // Cycle through messages
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

  // --- Render Helpers ---

  if (step === 'calculating') {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Decorative Aura Overlays */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[-5%] left-[20%] w-[55vw] h-[55vw] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
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
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4 font-display">
                {scanMessages[scanMessageIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
          <p className="text-zinc-400 font-light">
            Our AI is analyzing your workflows and mapping automation opportunities across all departments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white pt-32 pb-20 relative overflow-hidden print-area">
      <SEO 
        title="Automation Radar — Find Hidden Bottlenecks | Emmanuel Odebiyi"
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
          /* Grid adjustments */
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .space-y-32 > * + * {
            margin-top: 4rem !important;
          }
          /* Custom Print Header */
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

      {/* Decorative Aura Overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[20%] w-[55vw] h-[55vw] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 print-hide">
          <div className="space-y-4">
            <Link to="/growth-intelligence-lab" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Lab
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-display">
              Workday Bottleneck Finder<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400">™</span>
            </h1>
            <p className="text-xl text-zinc-400 font-light max-w-2xl">
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
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">01. Business Profile</h3>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Company Name</label>
                        <input 
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Industry</label>
                          <select 
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value as Industry})}
                            className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all cursor-pointer"
                          >
                            <option value="SaaS" className="bg-slate-900">SaaS</option>
                            <option value="E-commerce" className="bg-slate-900">E-commerce</option>
                            <option value="Marketing Agency" className="bg-slate-900">Marketing Agency</option>
                            <option value="Others" className="bg-slate-900">Others</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Team Size</label>
                          <select 
                            value={formData.teamSize}
                            onChange={(e) => setFormData({...formData, teamSize: e.target.value as TeamSize})}
                            className="w-full bg-slate-900/90 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all cursor-pointer"
                          >
                            <option className="bg-slate-900">Solo</option>
                            <option className="bg-slate-900">2-5</option>
                            <option className="bg-slate-900">6-20</option>
                            <option className="bg-slate-900">20+</option>
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
                            <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Specify Industry</label>
                            <input 
                              type="text"
                              placeholder="e.g. Real Estate, Healthcare..."
                              value={formData.customIndustry}
                              onChange={(e) => setFormData({...formData, customIndustry: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
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
                ]).map((dept) => (
                  <div key={dept.key} className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="space-y-1">
                      <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">{dept.num}. {dept.title}</h3>
                      <p className="text-[11px] text-zinc-400 font-light">{dept.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      {(Object.keys(DIMENSION_LABELS) as (keyof DimensionScores)[]).map((dimKey) => (
                        <DimensionSlider
                          key={dimKey}
                          dimKey={dimKey}
                          value={formData[dept.key][dimKey]}
                          onChange={(v) => setFormData({
                            ...formData,
                            [dept.key]: { ...formData[dept.key], [dimKey]: v }
                          })}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
 
              <button
                onClick={handleStartScan}
                className="w-full py-6 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 group"
              >
                Scan Workday Bottlenecks
                <Zap size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
 
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 shadow-xl">
                  <RadarIcon size={32} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white tracking-tight font-display">How it works</h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
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
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-light">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Radar Chart */}
              <div className="lg:col-span-6 aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-8 flex items-center justify-center backdrop-blur-md">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="65%" 
                    data={results.depts}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  >
                    <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }}
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
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                    {formData.companyName ? `${formData.companyName} Bottleneck Map` : 'Scan Results'}
                  </h3>
                  <div className="flex items-baseline gap-4">
                    <span className="text-8xl font-bold text-white tracking-tighter font-display">{results.readinessScore}</span>
                    <div className="space-y-1">
                      <span className="text-2xl font-bold text-zinc-400">/ 100</span>
                      <p className="text-sm font-mono uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400 font-bold">Friction Index</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${results.biggestOpp.color}`}>
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Biggest Opportunity</p>
                      <p className="text-xl font-bold text-white">{results.biggestOpp.name}</p>
                    </div>
                  </div>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    You are currently losing approximately <span className="text-white font-bold">{results.hoursSaved} hours/month</span> to manual work in <span className="text-white font-bold">{results.biggestOpp.name}</span> that can be fully automated.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-center">
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
                          <h4 className="text-2xl font-bold text-white font-display">Roadmap Unlocked!</h4>
                          <p className="text-zinc-400 font-light">We've also emailed a copy of your custom automation roadmap to <span className="text-amber-400 font-semibold">{email}</span>.</p>
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
                        <div className="flex items-center gap-4 text-zinc-300">
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
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                            />
                            <input 
                              required
                              type="email" 
                              placeholder="Email Address" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                            />
                          </div>
                          <button className="w-full py-5 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3">
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
                  className="space-y-32 pt-20 border-t border-white/10"
                >
                  {/* Department Breakdown */}
                  <div className="space-y-16">
                    <div className="text-center space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display">Department Breakdown</h2>
                      <p className="text-xl text-zinc-400 font-light">Specific automation roadmaps for your business profile.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[...results.depts].sort((a, b) => b.score - a.score).map((dept, i) => (
                        <div key={dept.name} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-8 relative overflow-hidden group">
                          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${dept.color}`} />
                          
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Priority 0{i+1}</span>
                              <h3 className="text-2xl font-bold text-white font-display">{dept.name}</h3>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold text-white ${dept.color}`}>
                              {dept.tier} — {dept.score}/100
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Recommendations</p>
                            <ul className="space-y-3">
                              {dept.recommendations.map((rec, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-zinc-300 font-light leading-relaxed">
                                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dept.color}`} />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Suggested Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.tools.map(tool => (
                                <span key={tool} className="px-3 py-1 bg-white/10 border border-white/5 rounded-lg text-xs font-medium text-zinc-300">
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
                  <div className="bg-slate-900/80 border border-white/10 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden backdrop-blur-md">
                    <div className="relative z-10 space-y-6">
                      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-display">
                        {formData.companyName ? `${formData.companyName}'s` : 'Estimated'} Annual Impact
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-amber-400 tracking-tighter font-display">{results.hoursSaved * 12}</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-400">Hours Saved / Year</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-white tracking-tighter font-display">70%</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-400">Admin Reduction</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-white tracking-tighter font-display">2.4x</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-400">Scaling Capacity</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Final CTA */}
                  <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display">Want a custom automation roadmap?</h3>
                      <p className="text-xl text-zinc-400 font-light">
                        The Radar identifies the gaps. I build the systems to close them. Let's discuss how to implement these recommendations for your specific business.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link 
                        to="/about#contact-form"
                        className="px-10 py-5 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 transition-all flex items-center gap-2 group"
                      >
                        Book a Free 30-Minute Strategy Call
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                      <button 
                        onClick={() => window.print()}
                        className="px-10 py-5 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
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
