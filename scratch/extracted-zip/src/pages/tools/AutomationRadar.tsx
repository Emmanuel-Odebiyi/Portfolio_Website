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
type OpportunityLevel = 'Low' | 'Medium' | 'High';

interface FormData {
  companyName: string;
  industry: Industry;
  customIndustry?: string;
  teamSize: TeamSize;
  manualPublish: boolean;
  copyPaste: boolean;
  manualFollowUp: boolean;
  manualReporting: boolean;
  manualQualify: boolean;
  useCRM: 'yes' | 'no' | 'not-sure';
  definedWorkflow: boolean;
  adminHours: number;
}

interface DeptScore {
  name: string;
  points: number;
  level: OpportunityLevel;
  value: number; // for chart
  color: string;
  recommendations: string[];
  tools: string[];
}

// --- Constants ---

const INITIAL_FORM: FormData = {
  companyName: '',
  industry: 'SaaS',
  customIndustry: '',
  teamSize: 'Solo',
  manualPublish: false,
  copyPaste: false,
  manualFollowUp: false,
  manualReporting: false,
  manualQualify: false,
  useCRM: 'no',
  definedWorkflow: true,
  adminHours: 5,
};

const DEPT_NAMES = {
  CM: 'Content & Marketing',
  LS: 'Lead Gen & Sales',
  OA: 'Operations & Admin',
  CS: 'Customer Success',
};

// --- Helper Components ---

const Question = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: boolean; 
  onChange: (v: boolean) => void 
}) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-emerald-500/30 transition-all group">
    <span className="text-sm text-zinc-600 font-light group-hover:text-zinc-900 transition-colors">{label}</span>
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${value ? 'bg-emerald-500' : 'bg-zinc-200'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-zinc-100">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">{data.name}</p>
        <p className={`text-sm font-bold ${data.color.replace('bg-', 'text-')}`}>
          {data.level} Opportunity
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

  // --- Scoring Logic ---

  const results = useMemo(() => {
    const { 
      manualPublish, 
      definedWorkflow, 
      manualFollowUp, 
      useCRM, 
      manualQualify, 
      copyPaste, 
      manualReporting, 
      adminHours 
    } = formData;

    const calculateLevel = (pts: number): OpportunityLevel => {
      if (pts >= 60) return 'High';
      if (pts >= 30) return 'Medium';
      return 'Low';
    };

    const levelToValue = (lvl: OpportunityLevel) => lvl === 'High' ? 90 : (lvl === 'Medium' ? 60 : 25);
    const levelToColor = (lvl: OpportunityLevel) => lvl === 'High' ? 'bg-rose-500' : (lvl === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500');

    // Content & Marketing
    const cmPts = (manualPublish ? 45 : 0) + (!definedWorkflow ? 45 : 0);
    const cmLvl = calculateLevel(cmPts);
    const cm: DeptScore = {
      name: DEPT_NAMES.CM,
      points: cmPts,
      level: cmLvl,
      value: levelToValue(cmLvl),
      color: levelToColor(cmLvl),
      recommendations: [
        'Automate social media distribution from your CMS.',
        'Implement an AI-driven content repurposing workflow.',
        'Set up automated SEO reporting and keyword tracking.'
      ],
      tools: ['Zapier', 'Buffer', 'Jasper AI', 'Airtable']
    };

    // Lead Gen & Sales
    const lsPts = (manualFollowUp ? 30 : 0) + (useCRM !== 'yes' ? 30 : 0) + (manualQualify ? 30 : 0);
    const lsLvl = calculateLevel(lsPts);
    const ls: DeptScore = {
      name: DEPT_NAMES.LS,
      points: lsPts,
      level: lsLvl,
      value: levelToValue(lsLvl),
      color: levelToColor(lsLvl),
      recommendations: [
        'Deploy an automated lead qualification sequence.',
        'Integrate your CRM with your meeting scheduler.',
        'Set up automated follow-up triggers for dormant leads.'
      ],
      tools: ['HubSpot', 'Calendly', 'Instantly.ai', 'Make.com']
    };

    // Operations & Admin
    const oaPts = (copyPaste ? 30 : 0) + (manualReporting ? 30 : 0) + (adminHours >= 15 ? 30 : 0);
    const oaLvl = calculateLevel(oaPts);
    const oa: DeptScore = {
      name: DEPT_NAMES.OA,
      points: oaPts,
      level: oaLvl,
      value: levelToValue(oaLvl),
      color: levelToColor(oaLvl),
      recommendations: [
        'Build a centralized dashboard to eliminate manual reporting.',
        'Automate data syncing between your core business tools.',
        'Implement an automated invoicing and expense tracking system.'
      ],
      tools: ['Airtable', 'Make.com', 'n8n', 'Looker Studio']
    };

    // Customer Success
    const csPts = (manualFollowUp ? 45 : 0) + (useCRM !== 'yes' ? 45 : 0);
    const csLvl = calculateLevel(csPts);
    const cs: DeptScore = {
      name: DEPT_NAMES.CS,
      points: csPts,
      level: csLvl,
      value: levelToValue(csLvl),
      color: levelToColor(csLvl),
      recommendations: [
        'Automate your client onboarding email sequence.',
        'Set up automated NPS or feedback collection triggers.',
        'Implement a self-service knowledge base or AI support bot.'
      ],
      tools: ['Intercom', 'Zendesk', 'Zapier', 'Loom']
    };

    const depts = [cm, ls, oa, cs];
    const avgOpp = depts.reduce((acc, d) => acc + d.value, 0) / depts.length;
    const readinessScore = Math.round(100 - avgOpp);
    const biggestOpp = [...depts].sort((a, b) => b.value - a.value)[0];
    const hoursSaved = Math.round(adminHours * 4 * 0.7); // Estimated 70% reduction in admin hours

    return {
      depts,
      readinessScore,
      biggestOpp,
      hoursSaved
    };
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

  const handleUnlockReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      // Simulate sending data
      console.log("Sending report to:", { 
        name, 
        email, 
        companyName: formData.companyName,
        industry: formData.industry === 'Others' ? formData.customIndustry : formData.industry,
        results 
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setIsEmailUnlocked(true);
      }, 2000);
    }
  };

  // --- Render Helpers ---

  if (step === 'calculating') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 relative mb-12">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-emerald-500/20 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
            <RadarIcon size={40} className="animate-pulse" />
          </div>
        </div>

        <div className="space-y-4 max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={scanMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-4">
                {scanMessages[scanMessageIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
          <p className="text-zinc-500 font-light">
            Our AI is analyzing your workflows and mapping automation opportunities across all departments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Link to="/growth-intelligence-lab" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-sm font-mono uppercase tracking-widest group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Lab
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight">
              Automation Radar<span className="text-emerald-500">™</span>
            </h1>
            <p className="text-xl text-zinc-500 font-light max-w-2xl">
              Diagnose your business operations and uncover hidden automation opportunities across every department.
            </p>
          </div>
          {step === 'results' && (
            <button 
              onClick={() => {
                setStep('input');
                setIsEmailUnlocked(false);
                setShowSuccess(false);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50 transition-all"
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
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Company Name</label>
                        <input 
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Industry</label>
                          <select 
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value as Industry})}
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          >
                            <option value="SaaS">SaaS</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Marketing Agency">Marketing Agency</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Team Size</label>
                          <select 
                            value={formData.teamSize}
                            onChange={(e) => setFormData({...formData, teamSize: e.target.value as TeamSize})}
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          >
                            <option>Solo</option>
                            <option>2-5</option>
                            <option>6-20</option>
                            <option>20+</option>
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
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Specify Industry</label>
                            <input 
                              type="text"
                              placeholder="e.g. Real Estate, Healthcare..."
                              value={formData.customIndustry}
                              onChange={(e) => setFormData({...formData, customIndustry: e.target.value})}
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">02. Workflows & Operations</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Question 
                      label="Do you manually publish blog or social content?" 
                      value={formData.manualPublish} 
                      onChange={(v) => setFormData({...formData, manualPublish: v})} 
                    />
                    <Question 
                      label="Do you copy-paste data between tools weekly?" 
                      value={formData.copyPaste} 
                      onChange={(v) => setFormData({...formData, copyPaste: v})} 
                    />
                    <Question 
                      label="Do you manually send follow-up emails or DMs?" 
                      value={formData.manualFollowUp} 
                      onChange={(v) => setFormData({...formData, manualFollowUp: v})} 
                    />
                    <Question 
                      label="Do you build reports manually each week or month?" 
                      value={formData.manualReporting} 
                      onChange={(v) => setFormData({...formData, manualReporting: v})} 
                    />
                    <Question 
                      label="Do you manually qualify or respond to leads?" 
                      value={formData.manualQualify} 
                      onChange={(v) => setFormData({...formData, manualQualify: v})} 
                    />
                    <Question 
                      label="Do you have a defined content publishing workflow?" 
                      value={formData.definedWorkflow} 
                      onChange={(v) => setFormData({...formData, definedWorkflow: v})} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">03. Systems</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Do you use a CRM (Customer Relationship Management - a tool to manage leads and clients)?</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['yes', 'no', 'not-sure'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFormData({...formData, useCRM: opt as any})}
                          className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                            formData.useCRM === opt 
                              ? 'bg-zinc-900 text-white border-zinc-900' 
                              : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {opt.charAt(0).toUpperCase() + opt.slice(1).replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">04. Manual Task Load</h3>
                    <span className="text-2xl font-bold text-emerald-500">{formData.adminHours} hrs/week</span>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="40" 
                      value={formData.adminHours}
                      onChange={(e) => setFormData({...formData, adminHours: parseInt(e.target.value)})}
                      className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      <span>0 hrs</span>
                      <span>20 hrs</span>
                      <span>40 hrs</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartScan}
                className="w-full py-6 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-3 group"
              >
                Generate Automation Radar
                <Zap size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
                  <RadarIcon size={32} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">How it works</h2>
                  <p className="text-lg text-zinc-500 font-light leading-relaxed">
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
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 font-light">
                      <CheckCircle2 size={18} className="text-emerald-500" />
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
              <div className="lg:col-span-6 aspect-square bg-zinc-50 rounded-[3rem] border border-zinc-100 p-8 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="65%" 
                    data={results.depts}
                    margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  >
                    <PolarGrid stroke="#e4e4e7" />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={{ fill: '#71717a', fontSize: 10, fontWeight: 500 }}
                    />
                    <Radar
                      name="Opportunity"
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.4}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Score & Summary */}
              <div className="lg:col-span-6 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                    {formData.companyName ? `${formData.companyName} Radar` : 'Scan Results'}
                  </h3>
                  <div className="flex items-baseline gap-4">
                    <span className="text-8xl font-bold text-zinc-900 tracking-tighter">{results.readinessScore}</span>
                    <div className="space-y-1">
                      <span className="text-2xl font-bold text-zinc-400">/ 100</span>
                      <p className="text-sm font-mono uppercase tracking-widest text-emerald-500 font-bold">Readiness Score</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${results.biggestOpp.color}`}>
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Biggest Opportunity</p>
                      <p className="text-xl font-bold text-zinc-900">{results.biggestOpp.name}</p>
                    </div>
                  </div>
                  <p className="text-lg text-zinc-500 font-light leading-relaxed">
                    You are currently losing approximately <span className="text-zinc-900 font-bold">{results.hoursSaved} hours/month</span> to manual work in <span className="text-zinc-900 font-bold">{results.biggestOpp.name}</span> that can be fully automated.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm overflow-hidden min-h-[300px] flex flex-col justify-center">
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
                          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20"
                        >
                          <CheckCircle2 size={40} />
                        </motion.div>
                        <div className="space-y-2">
                          <h4 className="text-2xl font-bold text-zinc-900">Report Sent!</h4>
                          <p className="text-zinc-500 font-light">Check your inbox for your custom automation roadmap.</p>
                        </div>
                        {!isEmailUnlocked && (
                          <motion.div 
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-emerald-500 flex items-center gap-2 text-sm font-bold"
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
                        <div className="flex items-center gap-4 text-zinc-400">
                          <Lock size={20} />
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
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                            <input 
                              required
                              type="email" 
                              placeholder="Email Address" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                            />
                          </div>
                          <button className="w-full py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3">
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
                  className="space-y-32 pt-20 border-t border-zinc-100"
                >
                  {/* Department Breakdown */}
                  <div className="space-y-16">
                    <div className="text-center space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">Department Breakdown</h2>
                      <p className="text-xl text-zinc-500 font-light">Specific automation roadmaps for your business profile.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[...results.depts].sort((a, b) => b.value - a.value).map((dept, i) => (
                        <div key={dept.name} className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 space-y-8 relative overflow-hidden group">
                          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${dept.color}`} />
                          
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Priority 0{i+1}</span>
                              <h3 className="text-2xl font-bold text-zinc-900">{dept.name}</h3>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold text-white ${dept.color}`}>
                              {dept.level} Opportunity
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recommendations</p>
                            <ul className="space-y-3">
                              {dept.recommendations.map((rec, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-zinc-600 font-light leading-relaxed">
                                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dept.color}`} />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Suggested Stack</p>
                            <div className="flex flex-wrap gap-2">
                              {dept.tools.map(tool => (
                                <span key={tool} className="px-3 py-1 bg-white border border-zinc-100 rounded-lg text-xs font-medium text-zinc-500">
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
                  <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        {formData.companyName ? `${formData.companyName}'s` : 'Estimated'} Annual Impact
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-emerald-400 tracking-tighter">{results.hoursSaved * 12}</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">Hours Saved / Year</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-white tracking-tighter">70%</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">Admin Reduction</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-6xl font-bold text-white tracking-tighter">2.4x</p>
                          <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">Scaling Capacity</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Final CTA */}
                  <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">Want a custom automation roadmap?</h3>
                      <p className="text-xl text-zinc-500 font-light">
                        The Radar identifies the gaps. I build the systems to close them. Let's discuss how to implement these recommendations for your specific business.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link 
                        to="/about#contact-form"
                        className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
                      >
                        Book a Free 30-Minute Strategy Call
                        <ArrowUpRight size={20} />
                      </Link>
                      <button className="px-10 py-5 bg-white text-zinc-900 border border-zinc-200 font-bold rounded-2xl hover:bg-zinc-50 transition-all flex items-center gap-2">
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
