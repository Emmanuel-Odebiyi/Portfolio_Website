import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lock,
  Unlock,
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
  processDocumented: number;   // 1-5: Are your core workflows documented?
  processFollowable: number;   // 1-5: Can a new hire follow them without verbal guidance?
  toolsCommunicate: number;    // 1-5: Do your tools talk to each other via APIs?
  dataFlowAutomatic: number;   // 1-5: Does data flow without manual bridging?
  teamDecisions: number;       // 1-5: Can your team make decisions without you?
  guardrailsExist: number;     // 1-5: Are there clear if-this-then-that rules?
  dashboardAutomatic: number;  // 1-5: Do dashboards update automatically?
  metricsTracked: number;      // 1-5: Are KPIs tracked in real-time?
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
          stroke="var(--border-card)"
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
          className="text-4xl font-bold font-display"
          style={{ color: 'var(--text-body)' }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Score</span>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      className="h-full rounded-full transition-all duration-500"
      style={{ backgroundColor: 'var(--accent-blue)' }}
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

  const PILLAR_HELPERS: Record<string, string[]> = {
    processDocumented: [
      "Nothing documented",
      "Some sticky notes",
      "Key tasks written",
      "Organized SOP library",
      "Fully mapped digital playbook"
    ],
    processFollowable: [
      "Needs constant help",
      "Frequent questions",
      "Gets by with minor help",
      "90% independent",
      "100% self-serve execution"
    ],
    toolsCommunicate: [
      "Totally separated",
      "Manual file uploads",
      "Some Zapier integrations",
      "Fully connected core hub",
      "Seamless ecosystem APIs"
    ],
    dataFlowAutomatic: [
      "Constant copy-paste",
      "Daily data re-entry",
      "Occasional manual sync",
      "Rare manual bridging",
      "Never - data flows automatically"
    ],
    teamDecisions: [
      "Founder must approve everything",
      "Team asks for most things",
      "Team decides simple things",
      "Team manages daily ops",
      "Fully decentralized team autonomy"
    ],
    guardrailsExist: [
      "No rules defined",
      "Some verbal rules",
      "Written 'If-Then' rules",
      "Automated alert flags",
      "Self-correcting system workflows"
    ],
    dashboardAutomatic: [
      "Completely manual entry",
      "Weekly manual updates",
      "Partially automated sheets",
      "Live tracking dashboard",
      "Instant automated updates"
    ],
    metricsTracked: [
      "No tracking at all",
      "Monthly review only",
      "Weekly updates",
      "Daily performance clear",
      "Real-time live metrics stream"
    ],
    onboardingAutomated: [
      "Fully manual emails",
      "Onboarding templates",
      "Triggered welcome sequence",
      "Self-serve onboarding portal",
      "Zero-touch client ingestion"
    ],
    supportRetention: [
      "Ad-hoc manual follow-up",
      "Calendar reminders",
      "Automatic support tickets",
      "Automated NPS & health check",
      "AI-driven proactive retention"
    ]
  };

  const PillarSlider = ({ qKey, label, tooltip, value, onChange }: { qKey: string; label: string; tooltip: string; value: number; onChange: (v: number) => void }) => {
    const colors = ['bg-rose-500', 'bg-blue-500', 'bg-blue-500', 'bg-blue-500', 'bg-emerald-500'];
    const percentage = (value - 1) * 25;
    const helperText = PILLAR_HELPERS[qKey]?.[value - 1] || `${value}/5`;
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>{label}</label>
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full text-white ${colors[value - 1]}`}>{value}/5</span>
        </div>
        <p className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>{tooltip}</p>
        <input type="range" min={1} max={5} step={1} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all"
          style={{ 
            background: `linear-gradient(to right, var(--accent-blue) 0%, var(--accent-blue) ${percentage}%, var(--bg-page) ${percentage}%, var(--bg-page) 100%)` 
          }}
        />
        <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          <span>Low</span>
          <span className="font-bold text-blue-500 text-center px-1">{helperText}</span>
          <span>High</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-x-clip print-area" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Business Freedom Calculator | Emmanuel Odebiyi"
        description="Find out exactly how close your business is to running smoothly without you. Score across 5 pillars: process, integration, autonomy, data, and customer journey."
        keywords="business freedom calculator, autopilot score, automation maturity assessment, operations readiness"
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
          .text-blue-500, .text-blue-400 {
            color: #2563eb !important;
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
              {/* Onboarding Guide Banner */}
              <div className="p-8 rounded-[2rem] border relative overflow-hidden text-left bg-gradient-to-br from-blue-500/10 via-transparent to-transparent shadow-xl animate-none" style={{ borderColor: 'var(--border-card)' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-xl rounded-full" />
                <h4 className="text-sm font-mono uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2 font-bold">
                  <Zap size={16} className="animate-pulse text-blue-500" /> Scorecard Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>1. What it is</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      An operations diagnostic score evaluating your business's ability to run without founder intervention.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>2. What to fill</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Complete 3 rapid-fire pages mapping documentation, software connectivity, and customer flows.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>3. What you get</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      A maturity level rating (Manual to Autonomous), benchmark comparison stats, and a step-by-step scaling plan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Link to="/growth-intelligence-lab" className="inline-flex items-center gap-2 transition-colors text-sm font-sans font-bold uppercase tracking-widest group border rounded-full px-4 py-1.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Lab
                </Link>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display leading-[1.1] break-words" style={{ color: 'var(--text-body)' }}>
                  Business Autopilot <span style={{ color: 'var(--accent-blue)' }}>Scorecard™</span>
                </h1>
                <p className="text-xl font-light max-w-2xl mx-auto animate-none" style={{ color: 'var(--text-muted)' }}>
                  Find out exactly how close your business is to running smoothly and profitably without you or your daily intervention.
                </p>
              </div>

              <div className="rounded-[3rem] p-8 md:p-12 border backdrop-blur-md shadow-2xl space-y-10" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Step {formStep} of 3</span>
                    <h3 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>
                      {formStep === 1 ? 'Foundation & Integration' : formStep === 2 ? 'Autonomy & Intelligence' : 'Customer & Execution'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-white/5 bg-black/10 px-3 py-1.5 rounded-2xl">
                      {[1, 2, 3].map((s) => (
                        <button
                          key={s}
                          onClick={() => setFormStep(s)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all border cursor-pointer`}
                          style={{
                            backgroundColor: formStep === s ? 'var(--accent-blue)' : 'transparent',
                            borderColor: formStep === s ? 'var(--accent-blue)' : 'transparent',
                            color: formStep === s ? '#0E1C2A' : 'var(--text-muted)'
                          }}
                          title={`Go to Step ${s}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="w-24">
                      <ProgressBar current={formStep} total={3} />
                    </div>
                  </div>
                </div>

                <div className="space-y-8 text-left">
                  {formStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-body)' }}>Company Name</label>
                        <input type="text" placeholder="e.g. Acme Corp" value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full border rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-sans"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        />
                      </div>
                      <div className="p-6 rounded-3xl border backdrop-blur-md space-y-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pillar 1: Team & Workday Guidelines</h4>
                        <PillarSlider qKey="processDocumented" label="Are your daily work steps clearly documented?" tooltip="1=Nothing is written down, 5=We have clear, written step-by-step guides for everything"
                          value={formData.processDocumented} onChange={(v) => setFormData({...formData, processDocumented: v})} />
                        <PillarSlider qKey="processFollowable" label="Can a new team member follow them without hand-holding?" tooltip="1=Requires constant supervision, 5=They can easily handle it 100% self-serve"
                          value={formData.processFollowable} onChange={(v) => setFormData({...formData, processFollowable: v})} />
                      </div>
                      <div className="p-6 rounded-3xl border backdrop-blur-md space-y-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pillar 2: Software Communication</h4>
                        <PillarSlider qKey="toolsCommunicate" label="Do your software systems talk to each other automatically?" tooltip="1=All software is completely separated, 5=All our tools sync with each other seamlessly"
                          value={formData.toolsCommunicate} onChange={(v) => setFormData({...formData, toolsCommunicate: v})} />
                        <PillarSlider qKey="dataFlowAutomatic" label="Do you copy-paste data between software manually?" tooltip="1=Yes, constantly copying data by hand, 5=No, data syncs automatically"
                          value={formData.dataFlowAutomatic} onChange={(v) => setFormData({...formData, dataFlowAutomatic: v})} />
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="p-6 rounded-3xl border backdrop-blur-md space-y-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pillar 3: Team Autonomy & Trust</h4>
                        <PillarSlider qKey="teamDecisions" label="Can your team handle daily issues without asking you?" tooltip="1=Everything needs founder approval, 5=Team is fully empowered to solve things"
                          value={formData.teamDecisions} onChange={(v) => setFormData({...formData, teamDecisions: v})} />
                        <PillarSlider qKey="guardrailsExist" label="Are there clear guidelines for handling common situations?" tooltip="1=No guidelines exist, 5=Comprehensive step-by-step rules are defined"
                          value={formData.guardrailsExist} onChange={(v) => setFormData({...formData, guardrailsExist: v})} />
                      </div>
                      <div className="p-6 rounded-3xl border backdrop-blur-md space-y-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pillar 4: Progress Visibility</h4>
                        <PillarSlider qKey="dashboardAutomatic" label="Do your company progress boards update automatically?" tooltip="1=All updates are entered manually, 5=Fully live, self-updating boards"
                          value={formData.dashboardAutomatic} onChange={(v) => setFormData({...formData, dashboardAutomatic: v})} />
                        <PillarSlider qKey="metricsTracked" label="Do you know your business performance metrics in real-time?" tooltip="1=No tracking at all, 5=We know exactly how we are doing daily without manual calculation"
                          value={formData.metricsTracked} onChange={(v) => setFormData({...formData, metricsTracked: v})} />
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="p-6 rounded-3xl border backdrop-blur-md space-y-5" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pillar 5: Customer Journey Experience</h4>
                        <PillarSlider qKey="onboardingAutomated" label="Are new clients welcomed and onboarded automatically?" tooltip="1=Fully manual and ad-hoc email writing, 5=Smooth, self-serve automated onboarding"
                          value={formData.onboardingAutomated} onChange={(v) => setFormData({...formData, onboardingAutomated: v})} />
                        <PillarSlider qKey="supportRetention" label="Does software help you check in on clients automatically?" tooltip="1=All support/check-ins are manual, 5=Self-service flows + automated check-in triggers"
                          value={formData.supportRetention} onChange={(v) => setFormData({...formData, supportRetention: v})} />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <button
                    onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                    disabled={formStep === 1}
                    className="flex items-center gap-2 text-sm font-bold transition-all cursor-pointer disabled:opacity-0"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  
                  {formStep < 3 ? (
                    <button
                      onClick={() => setFormStep(prev => prev + 1)}
                      className="px-8 py-4 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-110"
                      style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartScan}
                      className="px-8 py-4 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg cursor-pointer hover:brightness-110"
                      style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
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
              style={{ backgroundColor: 'var(--bg-page)' }}
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 animate-spin" style={{ borderColor: 'var(--border-card)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={32} className="text-blue-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest animate-pulse">
                  {scanMessages[scanMessageIndex]}
                </p>
                <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Calculating Readiness...</h3>
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
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                    {formData.companyName ? `${formData.companyName} Autopilot Score` : 'Assessment Results'}
                  </h3>
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                    {MATURITY_LEVELS[results.level].name}
                  </h2>
                </div>
                <div className="flex items-center gap-6 p-6 rounded-[2.5rem] border backdrop-blur-md" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <GaugeChart score={results.score} color={results.color} />
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Classification</span>
                    <p className="text-xl font-bold font-display" style={{ color: results.color }}>{MATURITY_LEVELS[results.level].name}</p>
                  </div>
                </div>
              </div>

              {/* Instant Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                <div className="lg:col-span-7 space-y-8">
                  <div className="p-10 rounded-[3rem] border backdrop-blur-md space-y-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-2xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>The Verdict</h4>
                      <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        {results.summary}
                      </p>
                      <div className="pt-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 shrink-0 border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <AlertCircle size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Biggest Bottleneck</p>
                          <p className="text-lg font-medium" style={{ color: 'var(--text-body)' }}>{results.bottleneck}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benchmark Comparison */}
                  <div className="p-10 rounded-[3rem] border backdrop-blur-md space-y-8" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-blue-500" size={24} />
                      <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Benchmark Comparison</h4>
                    </div>
                    <p className="text-lg font-light" style={{ color: 'var(--text-muted)' }}>
                      At your current score of <span className="font-bold" style={{ color: 'var(--text-body)' }}>{results.score}</span>, most businesses are losing approximately:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <Clock size={16} className="text-blue-500" />
                          <span className="text-xs font-mono uppercase tracking-widest">Time Lost</span>
                        </div>
                        <p className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{Math.round((100 - results.score) * 0.25)} hrs<span className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>/week</span></p>
                      </div>
                      <div className="p-6 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <DollarSign size={16} className="text-blue-500" />
                          <span className="text-xs font-mono uppercase tracking-widest">Revenue Leak</span>
                        </div>
                        <p className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>${Math.round((100 - results.score) * 150)}<span className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>/month</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Gate */}
                <div className="lg:col-span-5">
                  <div className="sticky top-32 p-10 rounded-[3rem] border backdrop-blur-md shadow-2xl space-y-8" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-blue-500 border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                        {isEmailUnlocked ? <Unlock size={28} /> : <Lock size={28} />}
                      </div>
                      <h4 className="text-2xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Unlock Full Breakdown</h4>
                      <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        Get the category-by-category score breakdown, gap analysis, and actionable system recommendations.
                      </p>
                    </div>

                    {!isEmailUnlocked ? (
                      <form onSubmit={handleUnlockReport} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl border placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-sans"
                            style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                          <input 
                            required
                            type="email"
                            placeholder="john@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl border placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-sans"
                            style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-5 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl hover:brightness-110"
                          style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                        >
                          {showSuccess ? 'Report Unlocked!' : 'Unlock Report'}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-slate-950 shrink-0">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>Full Report Unlocked!</p>
                            <p className="text-xs font-light mt-1" style={{ color: 'var(--text-muted)' }}>We've also sent a copy of your custom Autopilot roadmap to <span className="text-blue-400 font-semibold">{email}</span>.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => document.getElementById('full-report')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full py-5 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:brightness-110"
                          style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
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
                  className="space-y-20 pt-20 border-t"
                  style={{ borderColor: 'var(--border-card)' }}
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Detailed Breakdown</h2>
                    <p className="text-xl font-light max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                      A category-by-category analysis of your business systems and automation readiness.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {(Object.values(results.pillarScores) as PillarScore[]).map((pillar) => (
                      <div key={pillar.label} className="p-10 rounded-[3rem] border backdrop-blur-md space-y-8 interactive-card" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{pillar.label}</h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{pillar.score}</span>
                            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>/20</span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000" 
                            style={{ width: `${(pillar.score / 20) * 100}%` }}
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>The Gap</p>
                            <p className="font-light animate-none text-sm" style={{ color: 'var(--text-muted)' }}>{pillar.gap}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-blue-500">The Fix</p>
                            <p className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>{pillar.fix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="border rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden backdrop-blur-md" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                        Ready to move from <span className="text-blue-500">{results.level}</span> to Autopilot?
                      </h2>
                      <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                        The score gives you the diagnosis. I provide the cure. Let's build the systems that allow your business to scale without your constant involvement.
                      </p>
                      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                          to="/about#contact-form"
                          className="px-12 py-6 text-slate-950 font-bold rounded-2xl transition-all inline-flex items-center gap-3 group print-hide hover:brightness-110"
                          style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                        >
                          Get a Custom Proposal
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <button 
                          onClick={() => window.print()}
                          className="px-12 py-6 text-slate-950 font-bold rounded-2xl transition-all inline-flex items-center gap-3 cursor-pointer print-hide hover:brightness-110"
                          style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                        >
                          <Download size={24} />
                          Download PDF Report
                        </button>
                      </div>
                    </div>
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer hover:brightness-110"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
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
