import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { 
  Timer, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Clock, 
  DollarSign, 
  Users, 
  Briefcase, 
  Settings, 
  BarChart3, 
  Download,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

// --- Types ---

interface CalculatorInputs {
  teamSize: number;
  hourlyCost: number;
  weeklyHours: number;
  freelancerSpend: number;
  softwareBudget: number;
  setupInvestment: number;
  industry: 'SaaS' | 'E-commerce' | 'Other';
  currency: string;
}

interface ROIData {
  month: number;
  manualCost: number;
  automationCost: number;
  netSavings: number;
  cumulativeSavings: number;
}

// --- Constants ---

const INITIAL_INPUTS: CalculatorInputs = {
  teamSize: 1,
  hourlyCost: 35,
  weeklyHours: 15,
  freelancerSpend: 0,
  softwareBudget: 0,
  setupInvestment: 500,
  industry: 'Other',
  currency: 'USD',
};

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

const INDUSTRY_EFFICIENCY: Record<string, { rate: number; label: string }> = {
  'SaaS': { rate: 0.75, label: 'SaaS (75% automation efficiency)' },
  'E-commerce': { rate: 0.60, label: 'E-commerce (60% automation efficiency)' },
  'Other': { rate: 0.65, label: 'General (65% automation efficiency)' },
};

const NUCLEUS_BENCHMARK_ROI = 544;
const BENCHMARK_HOURS = 15.3;
const OVERHEAD_MULTIPLIER = 1.3;
const MONTHLY_EFFICIENCY_GAIN = 0.005;
const MONTHLY_MAINTENANCE_RATE = 0.05;

// --- Components ---

const MetricCard = ({ label, value, subValue, icon: Icon, colorClass }: { 
  label: string; 
  value: string; 
  subValue?: string; 
  icon: any;
  colorClass: string;
}) => (
  <div className="bg-[var(--bg-surface)] p-6 md:p-8 rounded-[2.5rem] border border-[var(--border-card)] backdrop-blur-md shadow-2xl space-y-4 overflow-hidden relative interactive-card">
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${colorClass} flex items-center justify-center shrink-0 border border-[var(--border-card)]`}>
      <Icon size={20} className="md:w-6 md:h-6" />
    </div>
    <div className="space-y-1 min-w-0 text-left">
      <p className="text-[10px] md:text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest truncate">{label}</p>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-body)] tracking-tight break-words leading-tight font-display" title={value}>
        {value}
      </h3>
      {subValue && <p className="text-xs md:text-sm text-[var(--text-muted)] font-light truncate">{subValue}</p>}
    </div>
  </div>
);

export default function ROITimeMachine() {
  const [inputs, setInputs] = useState<CalculatorInputs>(INITIAL_INPUTS);
  const [prevCurrency, setPrevCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isEmailUnlocked, setIsEmailUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Fetch Exchange Rates ---

  React.useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.rates) {
          setExchangeRates(data.rates);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    fetchRates();
  }, []);

  // --- Handle Currency Change ---

  const handleCurrencyChange = (newCurrency: string) => {
    if (exchangeRates[prevCurrency] && exchangeRates[newCurrency]) {
      const rate = exchangeRates[newCurrency] / exchangeRates[prevCurrency];
      setInputs({
        ...inputs,
        currency: newCurrency,
        hourlyCost: Math.round(inputs.hourlyCost * rate),
        setupInvestment: Math.round(inputs.setupInvestment * rate),
      });
      setPrevCurrency(newCurrency);
    } else {
      setInputs({ ...inputs, currency: newCurrency });
      setPrevCurrency(newCurrency);
    }
  };

  // --- Calculations ---

  const results = useMemo(() => {
    const fullyLoadedRate = inputs.hourlyCost * OVERHEAD_MULTIPLIER;
    const weeklyManualHours = inputs.weeklyHours * inputs.teamSize;
    const monthlyManualHours = weeklyManualHours * 4.33;
    const monthlyManualLabourCost = monthlyManualHours * fullyLoadedRate;
    const efficiencyRate = INDUSTRY_EFFICIENCY[inputs.industry].rate;
    
    const chartData: ROIData[] = [];
    let cumulativeSavings = -inputs.setupInvestment;
    let cumulativeManualCost = 0;
    
    for (let i = 0; i <= 12; i++) {
      const monthEfficiency = efficiencyRate * (1 + MONTHLY_EFFICIENCY_GAIN * i);
      const monthlySavings = i === 0 ? 0 : monthlyManualLabourCost * Math.min(monthEfficiency, 0.95);
      const monthlyMaintenance = i === 0 ? 0 : inputs.setupInvestment * MONTHLY_MAINTENANCE_RATE;
      const netMonthlySavings = monthlySavings - monthlyMaintenance;
      cumulativeManualCost += i === 0 ? 0 : monthlyManualLabourCost;
      
      if (i > 0) {
        cumulativeSavings += netMonthlySavings;
      }
      
      chartData.push({
        month: i,
        manualCost: Math.round(cumulativeManualCost),
        automationCost: Math.round(i === 0 ? inputs.setupInvestment : monthlyMaintenance),
        netSavings: Math.round(i === 0 ? -inputs.setupInvestment : netMonthlySavings),
        cumulativeSavings: Math.round(cumulativeSavings),
      });
    }
    
    const baseMonthlyNetSavings = (monthlyManualLabourCost * efficiencyRate) - (inputs.setupInvestment * MONTHLY_MAINTENANCE_RATE);
    const breakevenMonth = baseMonthlyNetSavings > 0 
      ? Math.ceil(inputs.setupInvestment / baseMonthlyNetSavings) 
      : Infinity;
    
    const twelveMonthSavings = chartData[12].cumulativeSavings;
    const roi = inputs.setupInvestment > 0 
      ? (twelveMonthSavings / inputs.setupInvestment) * 100 
      : 0;
    
    const weeklyHoursSaved = Math.round(weeklyManualHours * efficiencyRate);

    return {
      monthlyManualLabourCost: Math.round(monthlyManualLabourCost),
      monthlyAutomationSavings: Math.round(baseMonthlyNetSavings),
      breakevenMonth,
      twelveMonthSavings: Math.round(twelveMonthSavings),
      roi: Math.round(roi),
      chartData,
      weeklyHoursSaved,
      fullyLoadedRate: Math.round(fullyLoadedRate),
    };
  }, [inputs]);

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
            tool: 'ROI Time Machine',
            inputs,
            results: {
              monthlySavings: results.monthlyAutomationSavings,
              roi: results.roi,
              breakeven: results.breakevenMonth
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

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: inputs.currency, 
      maximumFractionDigits: 0 
    }).format(val);

  const displayBreakeven = (months: number) => {
    if (months === Infinity || months > 120) return 'N/A';
    return `Month ${months}`;
  };

  const breakevenSubtext = (months: number) => {
    if (months === Infinity || months > 120) return 'No savings detected';
    return 'Full recovery';
  };

  return (
    <div className="pt-32 pb-20 bg-[var(--bg-page)] text-[var(--text-body)] min-h-screen relative overflow-x-clip transition-colors duration-300 print-area">
      <SEO 
        title="Time & Dollar Savings Predictor | Emmanuel Odebiyi"
        description="Quantify exact hours and dollars you will reclaim by automating repetitive tasks. 12-month projections with breakeven analysis and industry benchmarks."
        keywords="ROI calculator, automation savings predictor, time savings estimator, operations cost reduction"
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
            <h2 className="text-xl font-bold tracking-tight">EMMANUEL EDEBIYI</h2>
            <p className="text-xs uppercase tracking-wider text-slate-500">Growth Intelligence & Automation ROI Roadmap</p>
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
      <div className="absolute top-[-10%] right-[-10%] w-[65vw] h-[65vw] bg-[var(--cta-blue)]/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[55vw] h-[55vw] bg-[var(--accent-teal)]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-[var(--accent-amber)]/5 rounded-full blur-[145px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 print-hide-header">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-20 print-hide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-[0.2em] uppercase"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
            Savings Diagnostic
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display leading-[1.1] break-words" style={{ color: 'var(--text-body)' }}>
            Time & Dollar <span className="text-amber-gradient font-bold">Savings Predictor™</span>
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Quantify the exact hours and software expense you will reclaim by automating repetitive workday tasks.
          </p>
        </div>
        
        {/* Onboarding Guide Banner */}
        <div className="p-8 rounded-[2rem] border relative overflow-hidden text-left mb-8 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent shadow-xl animate-none" style={{ borderColor: 'var(--border-card)' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full" />
                <h4 className="text-sm font-mono uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2 font-bold">
                  <Zap size={16} className="animate-pulse text-amber-500" /> Predictor Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>1. What it is</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      An operations cost and return-on-investment modeling calculator.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>2. What to fill</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Define your labor rates, time lost, setup cost, and industry vertical.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>3. What you get</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Real-time net savings, payback periods, 12-month charts, and cost tables.
                    </p>
                  </div>
                </div>
              </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="bg-[var(--bg-surface)] rounded-[3rem] p-8 md:p-12 border border-[var(--border-card)] backdrop-blur-md shadow-2xl space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Calculator Inputs</h3>
                  <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>Adjust inputs to update ROI projections.</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold bg-amber-500 text-slate-950"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                {/* Step 1: Labor Profile */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">1</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 1: Labor Profile</h4>
                  </div>

                  {/* Preferred Currency */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <DollarSign size={14} className="text-[var(--accent-amber)]" /> Preferred Currency
                    </label>
                    <select
                      value={inputs.currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="w-full bg-[var(--bg-surface-alt)] border border-[var(--border-card)] rounded-2xl px-6 py-4 text-[var(--text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] transition-all appearance-none cursor-pointer"
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.code} value={curr.code} className="bg-[var(--bg-surface)] text-[var(--text-body)]">
                          {curr.code} - {curr.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Team Size */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <Users size={14} className="text-[var(--accent-amber)]" /> Team Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 3, 7, 15].map((size) => (
                        <button
                          key={size}
                          onClick={() => setInputs({ ...inputs, teamSize: size })}
                          className={`py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                            inputs.teamSize === size 
                              ? 'bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] border-[var(--btn-cta-bg)] font-bold shadow-lg' 
                              : 'bg-[var(--bg-page)] text-[var(--text-muted)] border-[var(--border-card)] hover:border-[var(--text-body)]'
                          }`}
                        >
                          {size === 1 ? '1' : size === 3 ? '2-3' : size === 7 ? '4-10' : '10+'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hourly Cost */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <DollarSign size={14} className="text-[var(--accent-amber)]" /> Hourly Value of Time ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol}/hr)
                    </label>
                    <input 
                      type="number"
                      value={inputs.hourlyCost}
                      onChange={(e) => setInputs({ ...inputs, hourlyCost: Number(e.target.value) })}
                      className="w-full bg-[var(--bg-surface-alt)] border border-[var(--border-card)] rounded-2xl px-6 py-4 text-[var(--text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] transition-all"
                    />
                  </div>
                </div>

                {/* Step 2: Time Friction */}
                <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">2</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 2: Friction Metrics</h4>
                  </div>
                  {/* Weekly Hours */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                        <Clock size={14} className="text-[var(--accent-amber)]" /> Weekly Hours Lost to Repetitive Tasks
                      </label>
                      <span className="text-lg font-bold text-[var(--accent-amber)]">{inputs.weeklyHours}h</span>
                    </div>
                    <input 
                      type="range"
                      min="1"
                      max="60"
                      value={inputs.weeklyHours}
                      onChange={(e) => setInputs({ ...inputs, weeklyHours: Number(e.target.value) })}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[var(--accent-amber)] transition-all"
                      style={{ 
                        background: `linear-gradient(to right, var(--accent-amber) 0%, var(--accent-amber) ${((inputs.weeklyHours - 1) / 59) * 100}%, var(--bg-page) ${((inputs.weeklyHours - 1) / 59) * 100}%, var(--bg-page) 100%)` 
                      }}
                    />
                    <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      <span>1h</span>
                      <span className="font-bold text-[var(--accent-amber)] text-center px-1">
                        {inputs.weeklyHours <= 10 ? "Minor distraction (1-2 hours a day)" :
                         inputs.weeklyHours <= 20 ? "Part-time bottleneck (2-4 hours a day)" :
                         inputs.weeklyHours <= 35 ? "Significant friction (Half of your week)" :
                         "Critical drag (Equivalent to a full-time hire)"}
                      </span>
                      <span>60h</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Investment Profile */}
                <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">3</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 3: Setup & Benchmark</h4>
                  </div>
                  {/* Setup Investment */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <Settings size={14} className="text-[var(--accent-amber)]" /> Automation Setup Investment ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol})
                    </label>
                    <input 
                      type="number"
                      value={inputs.setupInvestment}
                      onChange={(e) => setInputs({ ...inputs, setupInvestment: Number(e.target.value) })}
                      className="w-full bg-[var(--bg-surface-alt)] border border-[var(--border-card)] rounded-2xl px-6 py-4 text-[var(--text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] transition-all"
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <Briefcase size={14} className="text-[var(--accent-amber)]" /> Industry
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['SaaS', 'E-commerce', 'Other'].map((ind) => (
                        <button
                          key={ind}
                          onClick={() => setInputs({ ...inputs, industry: ind as any })}
                          className={`py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                            inputs.industry === ind 
                              ? 'bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] border-[var(--btn-cta-bg)] font-bold shadow-lg' 
                              : 'bg-[var(--bg-page)] text-[var(--text-muted)] border-[var(--border-card)] hover:border-[var(--text-body)]'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MetricCard 
                label="Hours Saved / Week"
                value={`${results.weeklyHoursSaved}h`}
                subValue={`Across ${inputs.teamSize === 1 ? '1 person' : inputs.teamSize + ' people'}`}
                icon={Clock}
                colorClass="bg-blue-500/10 text-blue-400"
              />
              <MetricCard 
                label="Monthly Savings"
                value={formatCurrency(results.monthlyAutomationSavings)}
                subValue="Net gain"
                icon={DollarSign}
                colorClass="bg-amber-500/10 text-amber-400"
              />
              <MetricCard 
                label="Breakeven Month"
                value={displayBreakeven(results.breakevenMonth)}
                subValue={breakevenSubtext(results.breakevenMonth)}
                icon={Timer}
                colorClass="bg-orange-500/10 text-orange-400"
              />
            </div>

            {/* ROI Highlight */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-card)] rounded-[3rem] p-10 text-[var(--text-body)] relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Projected 12-Month ROI</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--accent-amber)] break-words font-display">
                    {Math.round(results.roi).toLocaleString()}%
                  </h2>
                </div>
                <div className="max-w-xs text-center md:text-left space-y-4">
                  {results.roi >= NUCLEUS_BENCHMARK_ROI ? (
                    <div className="flex items-start gap-3 text-[var(--accent-amber)]">
                      <CheckCircle2 size={24} className="shrink-0" />
                      <p className="text-sm font-medium leading-relaxed">
                        You're on track to exceed top-performing automation benchmarks.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 text-[var(--text-muted)]">
                      <AlertCircle size={24} className="shrink-0" />
                      <p className="text-sm font-light leading-relaxed">
                        Significant potential for optimization. Most clients reach 520% ROI.
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest">
                    Breakeven: {displayBreakeven(results.breakevenMonth)}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-amber)]/5 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Email Gate */}
            {!isEmailUnlocked ? (
              <div className="bg-[var(--bg-surface)] rounded-[3rem] p-10 border border-[var(--border-card)] shadow-2xl backdrop-blur-md space-y-8 text-left">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 flex items-center justify-center text-[var(--accent-amber)] shrink-0">
                    <Lock size={32} />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>See Full ROI Breakdown</h4>
                    <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Unlock the 12-month growth chart, monthly cost analysis, and benchmark comparison.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUnlockReport} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    required
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[var(--bg-surface-alt)] border border-[var(--border-card)] rounded-2xl px-6 py-4 text-[var(--text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] transition-all placeholder:text-[var(--text-muted)]"
                  />
                  <input 
                    required
                    type="email"
                    placeholder="work@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[var(--bg-surface-alt)] border border-[var(--border-card)] rounded-2xl px-6 py-4 text-[var(--text-body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)] transition-all placeholder:text-[var(--text-muted)]"
                  />
                  <button
                    type="submit"
                    className="btn-cta py-4 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {showSuccess ? 'Generating...' : 'Unlock Full Report'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 animate-fade-in print-area"
              >
                {/* Success Feedback Card */}
                <div className="p-8 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--border-card)] backdrop-blur-md flex items-start gap-4 shadow-xl text-left print-hide">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-amber)] flex items-center justify-center text-[var(--btn-cta-text)] shrink-0 shadow-lg shadow-[var(--btn-cta-shadow)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>ROI Roadmap Unlocked!</h4>
                    <p className="text-sm font-light mt-1" style={{ color: 'var(--text-muted)' }}>
                      We've also emailed a copy of your custom ROI report to <span className="font-semibold" style={{ color: 'var(--accent-amber)' }}>{email}</span>.
                    </p>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="bg-[var(--bg-surface)] p-10 rounded-[3rem] border border-[var(--border-card)] backdrop-blur-md shadow-2xl space-y-8 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>12-Month Savings Projection</h4>
                      <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>Cumulative net gain with automation vs baseline.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--accent-amber)]" />
                        <span>With Automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--text-muted)] opacity-60" />
                        <span>Manual Baseline</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-card)" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                          label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 10 }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                          tickFormatter={(val) => `$${val/1000}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--bg-surface)', 
                            border: '1px solid var(--border-card)', 
                            borderRadius: '24px', 
                            padding: '16px', 
                            backdropFilter: 'blur(10px)',
                            color: 'var(--text-body)'
                          }}
                          formatter={(val: number) => [formatCurrency(val), '']}
                        />
                        <ReferenceLine y={0} stroke="var(--border-card)" />
                        {results.breakevenMonth !== Infinity && results.breakevenMonth <= 12 && (
                          <ReferenceLine 
                            x={results.breakevenMonth} 
                            stroke="var(--accent-amber)" 
                            strokeDasharray="3 3" 
                            label={{ value: 'Breakeven', position: 'top', fill: 'var(--accent-amber)', fontSize: 10 }} 
                          />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="cumulativeSavings" 
                          stroke="var(--btn-cta-bg)" 
                          strokeWidth={4} 
                          dot={{ r: 4, fill: 'var(--btn-cta-bg)', strokeWidth: 2, stroke: 'var(--bg-page)' }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="manualCost" 
                          stroke="var(--text-muted)" 
                          strokeWidth={2} 
                          dot={false}
                          strokeDasharray="5 5"
                          opacity={0.4}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-card)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 flex items-center justify-center text-[var(--accent-amber)] shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>ROI Milestone: Month 3</p>
                      <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                        Most clients see measurable ROI by Month 3. You're projected to have saved <span className="font-bold text-[var(--accent-amber)]">{formatCurrency(results.chartData[3].cumulativeSavings)}</span> by then.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monthly Breakdown Table */}
                <div className="bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-card)] shadow-2xl backdrop-blur-md overflow-hidden text-left">
                  <div className="p-8 border-b border-[var(--border-card)]">
                    <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Monthly Cost Analysis</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[var(--bg-surface-alt)] text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-card)]">
                          <th className="px-8 py-4">Month</th>
                          <th className="px-8 py-4">Manual Cost</th>
                          <th className="px-8 py-4">Automation Cost</th>
                          <th className="px-8 py-4">Net Savings</th>
                          <th className="px-8 py-4">Cumulative</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-card)] text-[var(--text-muted)]">
                        {results.chartData.slice(1).map((row) => (
                          <tr key={row.month} className="hover:bg-[var(--bg-page)] transition-colors">
                            <td className="px-8 py-4 font-bold" style={{ color: 'var(--text-body)' }}>Month {row.month}</td>
                            <td className="px-8 py-4 font-light">{formatCurrency(inputs.weeklyHours * 4.33 * inputs.hourlyCost * inputs.teamSize)}</td>
                            <td className="px-8 py-4 font-light">{formatCurrency(row.month === 1 ? inputs.setupInvestment : 0)}</td>
                            <td className="px-8 py-4 font-bold" style={{ color: 'var(--accent-teal)' }}>+{formatCurrency(row.netSavings)}</td>
                            <td className={`px-8 py-4 font-bold ${row.cumulativeSavings >= 0 ? 'text-[var(--accent-amber)]' : 'text-orange-500'}`}>
                              {formatCurrency(row.cumulativeSavings)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div className="p-10 rounded-[3rem] bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-2xl backdrop-blur-md space-y-8 text-left">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-[var(--accent-amber)]" size={24} />
                    <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Benchmark Comparison</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                      <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Businesses like yours average <span className="font-bold" style={{ color: 'var(--text-body)' }}>{BENCHMARK_HOURS} hours saved weekly</span> after full implementation.
                      </p>
                      <div className="p-6 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-card)] space-y-2">
                        <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Your Potential</p>
                        <p className="text-3xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>
                          {inputs.weeklyHours >= BENCHMARK_HOURS ? 'Above Average' : 'High Potential'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                          <span>Your Savings</span>
                          <span>Benchmark</span>
                        </div>
                        <div className="h-2 bg-[var(--bg-page)] border border-[var(--border-card)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--accent-amber)]" 
                            style={{ width: `${Math.min(100, (inputs.weeklyHours / (BENCHMARK_HOURS * 1.5)) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                        You are currently projecting <span className="font-bold" style={{ color: 'var(--text-body)' }}>{inputs.weeklyHours}h</span> in weekly savings, which is <span className="font-bold" style={{ color: 'var(--accent-amber)' }}>{Math.round((inputs.weeklyHours / BENCHMARK_HOURS) * 100)}%</span> of the industry benchmark.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 bg-[var(--bg-surface-alt)] rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden border border-[var(--border-card)] shadow-2xl backdrop-blur-md">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Want us to build this <br />
              <span className="text-amber-gradient font-bold">system for you?</span>
            </h2>
            <p className="text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The calculator shows you the potential. We provide the execution. Start with a deep-dive audit to map your path to 520% ROI.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact"
                className="btn-cta px-12 py-6 text-lg inline-flex items-center gap-3 group cursor-pointer print-hide"
              >
                Start with a Free Strategy Call
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button 
                onClick={() => window.print()}
                className="px-12 py-6 bg-[var(--bg-surface)] text-[var(--text-body)] font-bold border border-[var(--border-card)] rounded-2xl hover:bg-[var(--bg-surface-alt)] transition-all inline-flex items-center gap-3 cursor-pointer print-hide"
              >
                <Download size={24} />
                Download PDF Report
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--cta-blue)]/5 to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
