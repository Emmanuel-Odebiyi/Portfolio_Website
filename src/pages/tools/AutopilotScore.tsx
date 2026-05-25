import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Gauge, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Mail,
  Lock,
  Unlock,
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign,
  Download
} from 'lucide-react';

// --- Types ---

type MaturityLevel = 'Manual' | 'Task-Level' | 'Integrated' | 'Orchestrated' | 'Autonomous';

interface PillarScore {
  score: number; // 0-20 per pillar
  label: string;
  gap: string;
  fix: string;
}

interface AutopilotResults {
  score: number;          // 0-100 composite
  level: MaturityLevel;
  color: string;
  summary: string;
  bottleneck: string;
  pillarScores: {
    processDoc: PillarScore;
    systemIntegration: PillarScore;
    decisionAutonomy: PillarScore;
    dataReporting: PillarScore;
    customerJourney: PillarScore;
  };
  thermostatPassed: boolean; // Does your system self-correct?
  nextLevelRoadmap: string[];
}

interface FormData {
  companyName: string;
  // Pillar 1: Process Documentation (0-20)
  processDocumented: number;   // 1-5: Are your core workflows documented?
  processFollowable: number;   // 1-5: Can a new hire follow them without verbal guidance?
  // Pillar 2: System Integration (0-20)
  toolsCommunicate: number;    // 1-5: Do your tools talk to each other via APIs?
  dataFlowAutomatic: number;   // 1-5: Does data flow without manual bridging?
  // Pillar 3: Decision Autonomy (0-20)
  teamDecisions: number;       // 1-5: Can your team make decisions without you?
  guardrailsExist: number;     // 1-5: Are there clear if-this-then-that rules?
  // Pillar 4: Data & Reporting (0-20)
  dashboardAutomatic: number;  // 1-5: Do dashboards update automatically?
  metricsTracked: number;      // 1-5: Are KPIs tracked in real-time?
  // Pillar 5: Customer Journey Automation (0-20)
  onboardingAutomated: number; // 1-5: Is client onboarding automated?
  supportRetention: number;    // 1-5: Are support and retention flows automated?
}

// --- Constants ---

const INITIAL_FORM: FormData = {
  companyName: '',
  processDocumented: 3,
  processFollowable: 2,
  toolsCommunicate: 2,
  dataFlowAutomatic: 2,
  teamDecisions: 3,
  guardrailsExist: 2,
  dashboardAutomatic: 2,
  metricsTracked: 2,
  onboardingAutomated: 2,
  supportRetention: 2,
};

const MATURITY_LEVELS: Record<MaturityLevel, { name: string; color: string; range: string; summary: string }> = {
  Manual: {
    name: 'Manual / Firefighting',
    color: '#ef4444',
    range: '0-20',
    summary: 'Everything depends on you. No documented processes. Daily "heroics" required.',
  },
  'Task-Level': {
    name: 'Task-Level / Repeatable',
    color: '#f59e0b',
    range: '21-40',
    summary: 'Some tools in place but isolated. Task automation exists but systems don\'t communicate.',
  },
  Integrated: {
    name: 'Integrated / Systematic',
    color: '#3b82f6',
    range: '41-60',
    summary: 'Systems communicate. Workflows span departments. Standard KPIs are established.',
  },
  Orchestrated: {
    name: 'Orchestrated / Strategic',
    color: '#8b5cf6',
    range: '61-80',
    summary: 'Centralized governance. Cross-functional automation. Team runs most operations independently.',
  },
  Autonomous: {
    name: 'Autonomous / Intelligent',
    color: '#10b981',
    range: '81-100',
    summary: 'Self-optimizing systems. AI-driven decisions. Business runs profitably without daily intervention.',
  },
};

// --- Helper Components ---

const GaugeChart = ({ score, color }: { score: number; color: string }) => {
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="rgba(255, 255, 255, 0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold text-white font-display"
        >
          {score}
        </motion.span>
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Score</span>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      className="h-full bg-brand-gradient"
    />
  </div>
);

// --- Main Component ---

export default function AutopilotScore() {
  const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isEmailUnlocked, setIsEmailUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [scanMessageIndex, setScanMessageIndex] = useState(0);

  const scanMessages = [
    "Analyzing tool integrations...",
    "Evaluating content operations...",
    "Mapping lead handling workflows...",
    "Benchmarking reporting visibility...",
    "Calculating system maturity index...",
    "Generating custom roadmap..."
  ];

  const results = useMemo((): AutopilotResults => {
    // Pillar scoring: each pillar has 2 questions scored 1-5, normalized to 0-20
    const calcPillar = (q1: number, q2: number): number => Math.round(((q1 + q2 - 2) / 8) * 20);

    const processDoc = calcPillar(formData.processDocumented, formData.processFollowable);
    const systemIntegration = calcPillar(formData.toolsCommunicate, formData.dataFlowAutomatic);
    const decisionAutonomy = calcPillar(formData.teamDecisions, formData.guardrailsExist);
    const dataReporting = calcPillar(formData.dashboardAutomatic, formData.metricsTracked);
    const customerJourney = calcPillar(formData.onboardingAutomated, formData.supportRetention);

    const finalScore = processDoc + systemIntegration + decisionAutonomy + dataReporting + customerJourney;

    let level: MaturityLevel = 'Manual';
    if (finalScore > 80) level = 'Autonomous';
    else if (finalScore > 60) level = 'Orchestrated';
    else if (finalScore > 40) level = 'Integrated';
    else if (finalScore > 20) level = 'Task-Level';

    // Thermostat Test: passes if systemIntegration + dataReporting > 25
    const thermostatPassed = (systemIntegration + dataReporting) > 25;

    const pillarData = [
      { key: 'processDoc', score: processDoc, label: 'Process Documentation',
        gap: 'Core workflows are undocumented or inconsistent.',
        fix: 'Document your top 5 repeatable workflows in an SOP format. Use Notion or Loom walkthroughs.' },
      { key: 'systemIntegration', score: systemIntegration, label: 'System Integration',
        gap: 'Tools are disconnected. Humans manually bridge data between systems.',
        fix: 'Implement a centralized automation hub (Zapier/Make/n8n) to sync data between CRM, email, and analytics.' },
      { key: 'decisionAutonomy', score: decisionAutonomy, label: 'Decision Autonomy',
        gap: 'Team cannot make decisions without founder approval.',
        fix: 'Establish clear guardrail rules: "If X happens, do Y." Empower decentralized decisions within defined limits.' },
      { key: 'dataReporting', score: dataReporting, label: 'Data & Reporting',
        gap: 'Decision-making is delayed by manual data collection and report building.',
        fix: 'Connect data sources to a live dashboard (Looker Studio, Databox) for real-time KPI visibility.' },
      { key: 'customerJourney', score: customerJourney, label: 'Customer Journey',
        gap: 'Client onboarding, support, and retention are manually managed.',
        fix: 'Build automated onboarding sequences, NPS triggers, and self-service support with AI chatbots.' },
    ];

    const bottleneck = [...pillarData].sort((a, b) => a.score - b.score)[0];

    // Next-level roadmap
    const roadmaps: Record<MaturityLevel, string[]> = {
      Manual: ['Document your top 5 workflows', 'Choose one automation tool (Zapier or Make)', 'Automate one repetitive task this week'],
      'Task-Level': ['Connect your CRM to your email platform', 'Build a basic KPI dashboard', 'Set up one automated lead follow-up sequence'],
      Integrated: ['Implement cross-department workflow orchestration', 'Create decision guardrails for your team', 'Set up automated anomaly alerts'],
      Orchestrated: ['Deploy AI-driven decision support systems', 'Implement predictive analytics', 'Build self-healing automated workflows'],
      Autonomous: ['Focus on continuous optimization', 'Explore AI agents for strategic decisions', 'Scale to new markets using your automated engine'],
    };

    return {
      score: finalScore,
      level,
      color: MATURITY_LEVELS[level].color,
      summary: MATURITY_LEVELS[level].summary,
      bottleneck: bottleneck.gap,
      pillarScores: {
        processDoc: { score: processDoc, label: 'Process Documentation', gap: pillarData[0].gap, fix: pillarData[0].fix },
        systemIntegration: { score: systemIntegration, label: 'System Integration', gap: pillarData[1].gap, fix: pillarData[1].fix },
        decisionAutonomy: { score: decisionAutonomy, label: 'Decision Autonomy', gap: pillarData[2].gap, fix: pillarData[2].fix },
        dataReporting: { score: dataReporting, label: 'Data & Reporting', gap: pillarData[3].gap, fix: pillarData[3].fix },
        customerJourney: { score: customerJourney, label: 'Customer Journey', gap: pillarData[4].gap, fix: pillarData[4].fix },
      },
      thermostatPassed,
      nextLevelRoadmap: roadmaps[level],
    };
  }, [formData]);

  const handleStartScan = () => {
    setStep('loading');
    const interval = setInterval(() => {
      setScanMessageIndex(prev => (prev + 1) % scanMessages.length);
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
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
            tool: 'Autopilot Score',
            company: formData.companyName,
            inputs: formData,
            results: {
              score: results.score,
              level: results.level,
              bottleneck: results.bottleneck
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

  const PillarSlider = ({ label, tooltip, value, onChange }: { label: string; tooltip: string; value: number; onChange: (v: number) => void }) => {
    const colors = ['bg-rose-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-emerald-500'];
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-zinc-300 tracking-tight">{label}</label>
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white ${colors[value - 1]}`}>{value}/5</span>
        </div>
        <p className="text-[10px] text-zinc-400 font-light">{tooltip}</p>
        <input type="range" min={1} max={5} step={1} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>
    );
  };

  return (
    <div className="pt-32 pb-20 bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden print-area">
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
            <p className="text-xs uppercase tracking-wider text-slate-500">Growth Intelligence & Autopilot Scorecard</p>
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

      <div className="max-w-7xl mx-auto px-6 relative z-10 print-hide-header">
        
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Freedom Assessment
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-display">
                  Business Freedom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 font-bold">Calculator™</span>
                </h1>
                <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                  Find out exactly how close your business is to running smoothly and profitably without you or your daily intervention.
                </p>
              </div>

              <div className="bg-white/5 rounded-[3rem] p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl space-y-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Step {formStep} of 3</span>
                    <h3 className="text-lg font-bold text-white font-display">
                      {formStep === 1 ? 'Foundation & Integration' : formStep === 2 ? 'Autonomy & Intelligence' : 'Customer & Execution'}
                    </h3>
                  </div>
                  <div className="w-32">
                    <ProgressBar current={formStep} total={3} />
                  </div>
                </div>

                <div className="space-y-8">
                  {formStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Company Name</label>
                        <input type="text" placeholder="e.g. Acme Corp" value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                        />
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">Pillar 1: Team & Workday Guidelines</h4>
                        <PillarSlider label="Are your daily work steps clearly documented?" tooltip="1=Nothing is written down, 5=We have clear, written step-by-step guides for everything"
                          value={formData.processDocumented} onChange={(v) => setFormData({...formData, processDocumented: v})} />
                        <PillarSlider label="Can a new team member follow them without hand-holding?" tooltip="1=Requires constant supervision, 5=They can easily handle it 100% self-serve"
                          value={formData.processFollowable} onChange={(v) => setFormData({...formData, processFollowable: v})} />
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">Pillar 2: Software Communication</h4>
                        <PillarSlider label="Do your software systems talk to each other automatically?" tooltip="1=All software is completely separated, 5=All our tools sync with each other seamlessly"
                          value={formData.toolsCommunicate} onChange={(v) => setFormData({...formData, toolsCommunicate: v})} />
                        <PillarSlider label="Do you copy-paste data between software manually?" tooltip="1=Yes, constantly copying data by hand, 5=No, data syncs automatically"
                          value={formData.dataFlowAutomatic} onChange={(v) => setFormData({...formData, dataFlowAutomatic: v})} />
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">Pillar 3: Team Autonomy & Trust</h4>
                        <PillarSlider label="Can your team handle daily issues without asking you?" tooltip="1=Everything needs founder approval, 5=Team is fully empowered to solve things"
                          value={formData.teamDecisions} onChange={(v) => setFormData({...formData, teamDecisions: v})} />
                        <PillarSlider label="Are there clear guidelines for handling common situations?" tooltip="1=No guidelines exist, 5=Comprehensive step-by-step rules are defined"
                          value={formData.guardrailsExist} onChange={(v) => setFormData({...formData, guardrailsExist: v})} />
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">Pillar 4: Progress Visibility</h4>
                        <PillarSlider label="Do your company progress boards update automatically?" tooltip="1=All updates are entered manually, 5=Fully live, self-updating boards"
                          value={formData.dashboardAutomatic} onChange={(v) => setFormData({...formData, dashboardAutomatic: v})} />
                        <PillarSlider label="Do you know your business performance metrics in real-time?" tooltip="1=No tracking at all, 5=We know exactly how we are doing daily without manual calculation"
                          value={formData.metricsTracked} onChange={(v) => setFormData({...formData, metricsTracked: v})} />
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
                        <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">Pillar 5: Customer Journey Experience</h4>
                        <PillarSlider label="Are new clients welcomed and onboarded automatically?" tooltip="1=Fully manual and ad-hoc email writing, 5=Smooth, self-serve automated onboarding"
                          value={formData.onboardingAutomated} onChange={(v) => setFormData({...formData, onboardingAutomated: v})} />
                        <PillarSlider label="Does software help you check in on clients automatically?" tooltip="1=All support/check-ins are manual, 5=Self-service flows + automated check-in triggers"
                          value={formData.supportRetention} onChange={(v) => setFormData({...formData, supportRetention: v})} />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <button
                    onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                    disabled={formStep === 1}
                    className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white disabled:opacity-0 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  
                  {formStep < 3 ? (
                    <button
                      onClick={() => setFormStep(prev => prev + 1)}
                      className="px-8 py-4 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartScan}
                      className="px-8 py-4 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      Calculate Score
                      <Zap size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40 space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-amber-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={32} className="text-amber-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest animate-pulse">
                  {scanMessages[scanMessageIndex]}
                </p>
                <h3 className="text-2xl font-bold text-white font-display">Calculating Readiness...</h3>
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                    {formData.companyName ? `${formData.companyName} Freedom Score` : 'Assessment Results'}
                  </h3>
                  <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight font-display">
                    {MATURITY_LEVELS[results.level].name}
                  </h2>
                </div>
                <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                  <GaugeChart score={results.score} color={results.color} />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Classification</span>
                    <p className="text-xl font-bold font-display" style={{ color: results.color }}>{MATURITY_LEVELS[results.level].name}</p>
                  </div>
                </div>
              </div>

              {/* Instant Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-8">
                  <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md text-white space-y-6 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-2xl font-bold tracking-tight font-display">The Verdict</h4>
                      <p className="text-xl text-zinc-300 font-light leading-relaxed">
                        {results.summary}
                      </p>
                      <div className="pt-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                          <AlertCircle size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Biggest Bottleneck</p>
                          <p className="text-lg font-medium text-white">{results.bottleneck}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
                  </div>

                  {/* Benchmark Comparison */}
                  <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-8">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-amber-500" size={24} />
                      <h4 className="text-xl font-bold text-white font-display">Benchmark Comparison</h4>
                    </div>
                    <p className="text-lg text-zinc-400 font-light">
                      At your current score of <span className="font-bold text-white">{results.score}</span>, most businesses are losing approximately:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock size={16} className="text-amber-500" />
                          <span className="text-xs font-mono uppercase tracking-widest">Time Lost</span>
                        </div>
                        <p className="text-3xl font-bold text-white font-display">{Math.round((100 - results.score) * 0.25)} hrs<span className="text-sm font-light text-zinc-400">/week</span></p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <DollarSign size={16} className="text-amber-500" />
                          <span className="text-xs font-mono uppercase tracking-widest">Revenue Leak</span>
                        </div>
                        <p className="text-3xl font-bold text-white font-display">${Math.round((100 - results.score) * 150)}<span className="text-sm font-light text-zinc-400">/month</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Gate */}
                <div className="lg:col-span-5">
                  <div className="sticky top-32 p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-8">
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-amber-500">
                        {isEmailUnlocked ? <Unlock size={28} /> : <Lock size={28} />}
                      </div>
                      <h4 className="text-2xl font-bold text-white tracking-tight font-display">Unlock Full Breakdown</h4>
                      <p className="text-zinc-400 font-light leading-relaxed">
                        Get the category-by-category score breakdown, gap analysis, and actionable system recommendations.
                      </p>
                    </div>

                    {!isEmailUnlocked ? (
                      <form onSubmit={handleUnlockReport} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Full Name</label>
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Email Address</label>
                          <input 
                            required
                            type="email"
                            placeholder="john@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-amber-500/10"
                        >
                          {showSuccess ? 'Report Unlocked!' : 'Unlock Report'}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shrink-0">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Full Report Unlocked!</p>
                            <p className="text-xs text-zinc-400 font-light mt-1">We've also sent a copy of your custom Autopilot roadmap to <span className="text-amber-400 font-semibold">{email}</span>.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => document.getElementById('full-report')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full py-5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/10"
                        >
                          View Breakdown ↓
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Report Section (Gated) */}
              {isEmailUnlocked && (
                <motion.div 
                  id="full-report"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-20 pt-20 border-t border-white/10"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display">Detailed Breakdown</h2>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                      A category-by-category analysis of your business systems and automation readiness.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.values(results.pillarScores).map((pillar) => (
                      <div key={pillar.label} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-8">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-white font-display">{pillar.label}</h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white font-display">{pillar.score}</span>
                            <span className="text-xs font-mono text-zinc-400">/20</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-amber-400 transition-all duration-1000" 
                            style={{ width: `${(pillar.score / 20) * 100}%` }}
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">The Gap</p>
                            <p className="text-zinc-300 font-light">{pillar.gap}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">The Fix</p>
                            <p className="text-white font-medium">{pillar.fix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="bg-slate-900/80 border border-white/10 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden backdrop-blur-md">
                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-display">
                        Ready to move from <span className="text-amber-400">{results.level}</span> to Autopilot?
                      </h2>
                      <p className="text-xl text-zinc-400 font-light leading-relaxed">
                        The score gives you the diagnosis. I provide the cure. Let's build the systems that allow your business to scale without your constant involvement.
                      </p>
                      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                          to="/about#contact-form"
                          className="px-12 py-6 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-2xl shadow-amber-500/20 inline-flex items-center gap-3 group print-hide"
                        >
                          Get a Custom Proposal
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <button 
                          onClick={() => window.print()}
                          className="px-12 py-6 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 transition-all inline-flex items-center gap-3 cursor-pointer print-hide"
                        >
                          <Download size={24} />
                          Download PDF Report
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              )}

              {/* Reset Button */}
              <div className="flex justify-center pt-12">
                <button
                  onClick={() => {
                    setStep('input');
                    setFormStep(1);
                    setFormData(INITIAL_FORM);
                    setIsEmailUnlocked(false);
                    setShowSuccess(false);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all cursor-pointer"
                >
                  Start New Assessment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
