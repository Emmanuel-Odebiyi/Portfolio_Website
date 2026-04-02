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
  DollarSign
} from 'lucide-react';

// --- Types ---

type Tier = 'Manual' | 'Partial' | 'Systematic' | 'Autopilot';

interface AutopilotResults {
  score: number;
  tier: Tier;
  color: string;
  summary: string;
  bottleneck: string;
  categoryScores: {
    systems: number;
    content: number;
    growth: number;
    visibility: number;
  };
}

interface FormData {
  companyName: string;
  toolIntegration: 'Never' | 'Sometimes' | 'Always';
  contentCreation: 'Fully manual' | 'AI-assisted' | 'Mostly automated';
  leadHandling: 'Nothing consistent' | 'Manual follow-up' | 'Automated email sequence';
  reporting: 'Manual spreadsheets' | 'Dashboard built manually' | 'Automated live dashboard';
  onboarding: 'Ad hoc' | 'Checklist but manual' | 'Automated workflow';
  aiUsage: 'No' | 'Occasionally' | 'Regularly integrated';
  contentSpeed: '3+ days' | '1–2 days' | 'Same day' | 'Under 2 hours';
  processMaturity: '<25%' | '25–50%' | '50–75%' | '75%+';
}

// --- Constants ---

const INITIAL_FORM: FormData = {
  companyName: '',
  toolIntegration: 'Sometimes',
  contentCreation: 'AI-assisted',
  leadHandling: 'Manual follow-up',
  reporting: 'Dashboard built manually',
  onboarding: 'Checklist but manual',
  aiUsage: 'Occasionally',
  contentSpeed: '1–2 days',
  processMaturity: '25–50%',
};

const TIERS: Record<Tier, { name: string; color: string; summary: string }> = {
  Manual: {
    name: 'Manual Mode',
    color: '#ef4444', // Red
    summary: 'You’re doing everything by hand. You are the bottleneck.',
  },
  Partial: {
    name: 'Partial Pilot',
    color: '#f59e0b', // Amber
    summary: 'You have tools, but they don’t communicate effectively.',
  },
  Systematic: {
    name: 'Systematic',
    color: '#3b82f6', // Blue
    summary: 'You have strong foundations and are ready to scale automation.',
  },
  Autopilot: {
    name: 'Autopilot Ready',
    color: '#10b981', // Green
    summary: 'You are close to a fully self-sustaining system.',
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
          stroke="#f4f4f5"
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
          className="text-4xl font-bold text-zinc-900"
        >
          {score}
        </motion.span>
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Score</span>
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
    // Scoring Logic
    const scores = {
      toolIntegration: formData.toolIntegration === 'Never' ? 0 : formData.toolIntegration === 'Sometimes' ? 50 : 100,
      contentCreation: formData.contentCreation === 'Fully manual' ? 0 : formData.contentCreation === 'AI-assisted' ? 60 : 100,
      leadHandling: formData.leadHandling === 'Nothing consistent' ? 0 : formData.leadHandling === 'Manual follow-up' ? 30 : 100,
      reporting: formData.reporting === 'Manual spreadsheets' ? 0 : formData.reporting === 'Dashboard built manually' ? 50 : 100,
      onboarding: formData.onboarding === 'Ad hoc' ? 0 : formData.onboarding === 'Checklist but manual' ? 50 : 100,
      aiUsage: formData.aiUsage === 'No' ? 0 : formData.aiUsage === 'Occasionally' ? 50 : 100,
      contentSpeed: formData.contentSpeed === '3+ days' ? 0 : formData.contentSpeed === '1–2 days' ? 40 : formData.contentSpeed === 'Same day' ? 80 : 100,
      processMaturity: formData.processMaturity === '<25%' ? 0 : formData.processMaturity === '25–50%' ? 40 : formData.processMaturity === '50–75%' ? 80 : 100,
    };

    const systems = (scores.toolIntegration + scores.aiUsage) / 2;
    const content = (scores.contentCreation + scores.contentSpeed) / 2;
    const growth = (scores.leadHandling + scores.onboarding) / 2;
    const visibility = (scores.reporting + scores.processMaturity) / 2;

    const finalScore = Math.round((systems + content + growth + visibility) / 4);

    let tier: Tier = 'Manual';
    if (finalScore > 75) tier = 'Autopilot';
    else if (finalScore > 50) tier = 'Systematic';
    else if (finalScore > 25) tier = 'Partial';

    const bottlenecks = [
      { cat: 'Systems & AI', score: systems, msg: 'Your tools are disconnected, creating data silos.' },
      { cat: 'Content Operations', score: content, msg: 'Content creation is slow and heavily manual.' },
      { cat: 'Lead Handling', score: growth, msg: 'Lead follow-up is inconsistent and manual.' },
      { cat: 'Reporting & Visibility', score: visibility, msg: 'You lack real-time visibility into performance.' },
    ].sort((a, b) => a.score - b.score);

    return {
      score: finalScore,
      tier,
      color: TIERS[tier].color,
      summary: TIERS[tier].summary,
      bottleneck: bottlenecks[0].msg,
      categoryScores: { systems, content, growth, visibility }
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
              tier: results.tier,
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

  const renderInput = (label: string, options: string[], field: keyof FormData) => (
    <div className="space-y-3">
      <label className="text-sm font-bold text-zinc-900 tracking-tight">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFormData({ ...formData, [field]: opt })}
            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between group ${
              formData[field] === opt 
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200' 
                : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
            }`}
          >
            {opt}
            {formData[field] === opt && <CheckCircle2 size={16} className="text-deep-space-blue-400" />}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
                  Diagnostic Tool
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
                  Full Autopilot <span className="text-zinc-300">Score™</span>
                </h1>
                <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                  Measure how much of your business runs without you and identify the exact systems holding you back from scaling.
                </p>
              </div>

              <div className="bg-zinc-50 rounded-[3rem] p-8 md:p-12 border border-zinc-100 shadow-xl shadow-zinc-200/50 space-y-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Step {formStep} of 3</span>
                    <h3 className="text-lg font-bold text-zinc-900">
                      {formStep === 1 ? 'Systems & AI' : formStep === 2 ? 'Operations' : 'Growth & Visibility'}
                    </h3>
                  </div>
                  <div className="w-32">
                    <ProgressBar current={formStep} total={3} />
                  </div>
                </div>

                <div className="space-y-8">
                  {formStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Company Name</label>
                        <input 
                          type="text"
                          placeholder="e.g. Acme Corp"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                        />
                      </div>
                      {renderInput('Do your marketing, CRM, and email tools connect automatically?', ['Never', 'Sometimes', 'Always'], 'toolIntegration')}
                      {renderInput('Do you use AI in your business?', ['No', 'Occasionally', 'Regularly integrated'], 'aiUsage')}
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      {renderInput('How is your content created?', ['Fully manual', 'AI-assisted', 'Mostly automated'], 'contentCreation')}
                      {renderInput('How long does it take to publish one piece of content?', ['3+ days', '1–2 days', 'Same day', 'Under 2 hours'], 'contentSpeed')}
                      {renderInput('What percentage of your work is repeatable?', ['<25%', '25–50%', '50–75%', '75%+'], 'processMaturity')}
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      {renderInput('When a new lead comes in, what happens?', ['Nothing consistent', 'Manual follow-up', 'Automated email sequence'], 'leadHandling')}
                      {renderInput('How do you track marketing performance?', ['Manual spreadsheets', 'Dashboard built manually', 'Automated live dashboard'], 'reporting')}
                      {renderInput('How do you onboard new clients?', ['Ad hoc', 'Checklist but manual', 'Automated workflow'], 'onboarding')}
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-zinc-200">
                  <button
                    onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                    disabled={formStep === 1}
                    className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-zinc-900 disabled:opacity-0 transition-all"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                  
                  {formStep < 3 ? (
                    <button
                      onClick={() => setFormStep(prev => prev + 1)}
                      className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all flex items-center gap-2"
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartScan}
                      className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all flex items-center gap-2 shadow-lg shadow-deep-space-blue-200"
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
                <div className="w-24 h-24 rounded-full border-4 border-zinc-100 border-t-deep-space-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={32} className="text-brand-gradient animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest animate-pulse">
                  {scanMessages[scanMessageIndex]}
                </p>
                <h3 className="text-2xl font-bold text-zinc-900">Calculating Readiness...</h3>
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
                    {formData.companyName ? `${formData.companyName} Autopilot Score` : 'Assessment Results'}
                  </h3>
                  <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight">
                    {TIERS[results.tier].name}
                  </h2>
                </div>
                <div className="flex items-center gap-6 bg-zinc-50 p-6 rounded-[2.5rem] border border-zinc-100">
                  <GaugeChart score={results.score} color={results.color} />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Classification</span>
                    <p className="text-xl font-bold" style={{ color: results.color }}>{results.tier}</p>
                  </div>
                </div>
              </div>

              {/* Instant Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-8">
                  <div className="p-10 rounded-[3rem] bg-zinc-900 text-white space-y-6 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-2xl font-bold tracking-tight">The Verdict</h4>
                      <p className="text-xl text-zinc-300 font-light leading-relaxed">
                        {results.summary}
                      </p>
                      <div className="pt-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-deep-space-blue-400 shrink-0">
                          <AlertCircle size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Biggest Bottleneck</p>
                          <p className="text-lg font-medium text-white">{results.bottleneck}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gradient/10 blur-[80px] rounded-full" />
                  </div>

                  {/* Benchmark Comparison */}
                  <div className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 space-y-8">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-brand-gradient" size={24} />
                      <h4 className="text-xl font-bold text-zinc-900">Benchmark Comparison</h4>
                    </div>
                    <p className="text-lg text-zinc-500 font-light">
                      At your current score of <span className="font-bold text-zinc-900">{results.score}</span>, most businesses are losing approximately:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white border border-zinc-100 space-y-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock size={16} />
                          <span className="text-xs font-mono uppercase tracking-widest">Time Lost</span>
                        </div>
                        <p className="text-3xl font-bold text-zinc-900">{Math.round((100 - results.score) * 0.25)} hrs<span className="text-sm font-light text-zinc-400">/week</span></p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white border border-zinc-100 space-y-2">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <DollarSign size={16} />
                          <span className="text-xs font-mono uppercase tracking-widest">Revenue Leak</span>
                        </div>
                        <p className="text-3xl font-bold text-zinc-900">${Math.round((100 - results.score) * 150)}<span className="text-sm font-light text-zinc-400">/month</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Gate */}
                <div className="lg:col-span-5">
                  <div className="sticky top-32 p-10 rounded-[3rem] bg-white border border-zinc-200 shadow-2xl shadow-zinc-200/50 space-y-8">
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-deep-space-blue-50 flex items-center justify-center text-brand-gradient">
                        {isEmailUnlocked ? <Unlock size={28} /> : <Lock size={28} />}
                      </div>
                      <h4 className="text-2xl font-bold text-zinc-900 tracking-tight">Unlock Full Breakdown</h4>
                      <p className="text-zinc-500 font-light leading-relaxed">
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
                            className="w-full px-6 py-4 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
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
                            className="w-full px-6 py-4 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-brand-gradient transition-all flex items-center justify-center gap-2 group"
                        >
                          {showSuccess ? 'Report Unlocked!' : 'Unlock Report'}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-deep-space-blue-50 border border-deep-space-blue-100 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                            <CheckCircle2 size={20} />
                          </div>
                          <p className="text-sm font-medium text-deep-space-blue-900">Full report unlocked for {name}</p>
                        </div>
                        <button
                          onClick={() => document.getElementById('full-report')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full py-5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-brand-gradient transition-all flex items-center justify-center gap-2"
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
                  className="space-y-20 pt-20 border-t border-zinc-100"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">Detailed Breakdown</h2>
                    <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                      A category-by-category analysis of your business systems and automation readiness.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { 
                        id: 'systems', 
                        name: 'Systems & AI', 
                        score: results.categoryScores.systems,
                        gap: 'Tools are disconnected or AI is underutilized.',
                        fix: 'Implement a centralized automation hub (like Zapier or Make) to sync data between your CRM and marketing tools.'
                      },
                      { 
                        id: 'content', 
                        name: 'Content Operations', 
                        score: results.categoryScores.content,
                        gap: 'Content creation relies on manual effort and slow workflows.',
                        fix: 'Build an AI-assisted content engine that handles drafting, formatting, and scheduling automatically.'
                      },
                      { 
                        id: 'growth', 
                        name: 'Lead Handling', 
                        score: results.categoryScores.growth,
                        gap: 'Leads are slipping through the cracks due to manual follow-up.',
                        fix: 'Set up automated lead qualification and instant email sequences to engage prospects within 5 minutes.'
                      },
                      { 
                        id: 'visibility', 
                        name: 'Reporting & Visibility', 
                        score: results.categoryScores.visibility,
                        gap: 'Decision making is delayed by manual data collection.',
                        fix: 'Connect your data sources to a live dashboard for real-time visibility into your key growth metrics.'
                      },
                    ].map((cat) => (
                      <div key={cat.id} className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 space-y-8">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-zinc-900">{cat.name}</h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-zinc-900">{cat.score}</span>
                            <span className="text-xs font-mono text-zinc-400">/100</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-gradient transition-all duration-1000" 
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">The Gap</p>
                            <p className="text-zinc-600 font-light">{cat.gap}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-mono text-brand-gradient uppercase tracking-widest">The Fix</p>
                            <p className="text-zinc-900 font-medium">{cat.fix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final CTA */}
                  <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Ready to move from <span className="text-brand-gradient">{results.tier}</span> to Autopilot?
                      </h2>
                      <p className="text-xl text-zinc-400 font-light leading-relaxed">
                        The score gives you the diagnosis. I provide the cure. Let's build the systems that allow your business to scale without your constant involvement.
                      </p>
                      <div className="pt-8">
                        <Link 
                          to="/about#contact-form"
                          className="px-12 py-6 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-brand-gradient hover:text-white transition-all shadow-2xl shadow-indigo-500/20 inline-flex items-center gap-3 group"
                        >
                          Get a Custom Proposal
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-deep-space-blue-500/10 to-transparent pointer-events-none" />
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50 transition-all"
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
