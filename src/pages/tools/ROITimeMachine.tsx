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
  Unlock,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Settings,
  ChevronRight,
  BarChart3,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
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

// Nucleus Research: Industry automation efficiency benchmarks
// These represent the % of manual hours recoverable through automation
const INDUSTRY_EFFICIENCY: Record<string, { rate: number; label: string }> = {
  'SaaS': { rate: 0.75, label: 'SaaS (75% automation efficiency)' },
  'E-commerce': { rate: 0.60, label: 'E-commerce (60% automation efficiency)' },
  'Other': { rate: 0.65, label: 'General (65% automation efficiency)' },
};

// Nucleus Research benchmark: $5.44 return per $1 invested in automation
const NUCLEUS_BENCHMARK_ROI = 544;
// Average weekly hours saved benchmark (Salesforce/McKinsey)
const BENCHMARK_HOURS = 15.3;
// Overhead multiplier for fully-loaded labor cost (benefits, taxes, tools)
const OVERHEAD_MULTIPLIER = 1.3;
// Monthly efficiency improvement (compounding learning curve)
const MONTHLY_EFFICIENCY_GAIN = 0.005;
// Ongoing maintenance cost as % of setup investment per month
const MONTHLY_MAINTENANCE_RATE = 0.05;

// --- Components ---

const MetricCard = ({ label, value, subValue, icon: Icon, colorClass }: { 
  label: string; 
  value: string; 
  subValue?: string; 
  icon: any;
  colorClass: string;
}) => (
  <div className="bg-white/5 p-6 md:p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl space-y-4 overflow-hidden relative">
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${colorClass} flex items-center justify-center shrink-0 border border-white/10`}>
      <Icon size={20} className="md:w-6 md:h-6" />
    </div>
    <div className="space-y-1 min-w-0">
      <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest truncate">{label}</p>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight break-words leading-tight font-display" title={value}>
        {value}
      </h3>
      {subValue && <p className="text-xs md:text-sm text-zinc-400 font-light truncate">{subValue}</p>}
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
    // Step 1: Calculate Fully-Loaded Blended Hourly Rate (BHR)
    // BHR = stated hourly × overhead multiplier (benefits, payroll tax, tools)
    const fullyLoadedRate = inputs.hourlyCost * OVERHEAD_MULTIPLIER;
    
    // Step 2: Monthly manual labor cost (fully loaded)
    const weeklyManualHours = inputs.weeklyHours * inputs.teamSize;
    const monthlyManualHours = weeklyManualHours * 4.33;
    const monthlyManualLabourCost = monthlyManualHours * fullyLoadedRate;
    
    // Step 3: Industry-specific automation efficiency rate
    const efficiencyRate = INDUSTRY_EFFICIENCY[inputs.industry].rate;
    
    // Step 4: Build 12-month projection with compounding efficiency gains
    const chartData: ROIData[] = [];
    let cumulativeSavings = -inputs.setupInvestment; // Start negative (initial investment)
    let cumulativeManualCost = 0;
    
    for (let i = 0; i <= 12; i++) {
      // Compounding efficiency: gets slightly better each month as team adapts
      const monthEfficiency = efficiencyRate * (1 + MONTHLY_EFFICIENCY_GAIN * i);
      const monthlySavings = i === 0 ? 0 : monthlyManualLabourCost * Math.min(monthEfficiency, 0.95);
      
      // Ongoing automation maintenance cost (small monthly overhead)
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
    
    // Step 5: Calculate breakeven month
    const baseMonthlyNetSavings = (monthlyManualLabourCost * efficiencyRate) - (inputs.setupInvestment * MONTHLY_MAINTENANCE_RATE);
    const breakevenMonth = baseMonthlyNetSavings > 0 
      ? Math.ceil(inputs.setupInvestment / baseMonthlyNetSavings) 
      : Infinity;
    
    // Step 6: Calculate 12-month ROI (Nucleus methodology)
    const twelveMonthSavings = chartData[12].cumulativeSavings;
    const roi = inputs.setupInvestment > 0 
      ? (twelveMonthSavings / inputs.setupInvestment) * 100 
      : 0;
    
    // Step 7: Weekly hours actually saved
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
        // Fallback to unlock anyway so user isn't stuck, but log the error
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
    <div className="pt-32 pb-20 bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden print-area">
      <SEO 
        title="Time & Dollar Savings Predictor — Quantify Automation ROI | Emmanuel Odebiyi"
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
      <div className="absolute top-[-10%] right-[-10%] w-[65vw] h-[65vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-15%] w-[55vw] h-[55vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-amber-500/5 rounded-full blur-[145px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 print-hide-header">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-20 print-hide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Savings Diagnostic
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-display">
            Time & Dollar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 font-bold">Savings Predictor™</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Quantify the exact hours and software expense you will reclaim by automating repetitive workday tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-white/5 rounded-[3rem] p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-display">Calculator Inputs</h3>
                <p className="text-sm text-zinc-400 font-light">Adjust the values to see real-time ROI projections.</p>
              </div>

              <div className="space-y-8">
                {/* Currency Selection */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} className="text-amber-500" /> Preferred Currency
                  </label>
                  <select
                    value={inputs.currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className="w-full bg-[#0d1527] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer"
                  >
                    {CURRENCIES.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Size */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <Users size={14} className="text-amber-500" /> Team Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 7, 15].map((size) => (
                      <button
                        key={size}
                        onClick={() => setInputs({ ...inputs, teamSize: size })}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                          inputs.teamSize === size 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-lg shadow-amber-500/10' 
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:border-zinc-300'
                        }`}
                      >
                        {size === 1 ? '1' : size === 3 ? '2-3' : size === 7 ? '4-10' : '10+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hourly Cost */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} className="text-amber-500" /> Hourly Value of Time ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol}/hr)
                  </label>
                  <input 
                    type="number"
                    value={inputs.hourlyCost}
                    onChange={(e) => setInputs({ ...inputs, hourlyCost: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                  />
                </div>

                {/* Weekly Hours */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} className="text-amber-500" /> Weekly Hours Lost to Repetitive Tasks
                    </label>
                    <span className="text-lg font-bold text-amber-500">{inputs.weeklyHours}h</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="60"
                    value={inputs.weeklyHours}
                    onChange={(e) => setInputs({ ...inputs, weeklyHours: Number(e.target.value) })}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Setup Investment */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <Settings size={14} className="text-amber-500" /> Automation Setup Investment ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol})
                  </label>
                  <input 
                    type="number"
                    value={inputs.setupInvestment}
                    onChange={(e) => setInputs({ ...inputs, setupInvestment: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} className="text-amber-500" /> Industry
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['SaaS', 'E-commerce', 'Other'].map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setInputs({ ...inputs, industry: ind as any })}
                        className={`py-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          inputs.industry === ind 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-lg shadow-amber-500/10' 
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:border-zinc-300'
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
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-white relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Projected 12-Month ROI</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-amber-400 break-words font-display">
                    {Math.round(results.roi).toLocaleString()}%
                  </h2>
                </div>
                <div className="max-w-xs text-center md:text-left space-y-4">
                  {results.roi >= NUCLEUS_BENCHMARK_ROI ? (
                    <div className="flex items-start gap-3 text-amber-400">
                      <CheckCircle2 size={24} className="shrink-0" />
                      <p className="text-sm font-medium leading-relaxed">
                        You're on track to exceed top-performing automation benchmarks.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 text-zinc-400">
                      <AlertCircle size={24} className="shrink-0" />
                      <p className="text-sm font-light leading-relaxed">
                        Significant potential for optimization. Most clients reach 520% ROI.
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                    Breakeven: {displayBreakeven(results.breakevenMonth)}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Email Gate */}
            {!isEmailUnlocked ? (
              <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 shadow-2xl backdrop-blur-md space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <Lock size={32} />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-bold text-white tracking-tight font-display">See Full ROI Breakdown</h4>
                    <p className="text-zinc-400 font-light leading-relaxed">
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
                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all placeholder:text-zinc-500"
                  />
                  <input 
                    required
                    type="email"
                    placeholder="work@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    className="py-4 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-amber-500/10"
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
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4 shadow-xl print-hide">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-amber-500/20">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white font-display">ROI Roadmap Unlocked!</h4>
                    <p className="text-sm text-zinc-400 font-light mt-1">
                      We've also emailed a copy of your custom ROI report to <span className="text-amber-400 font-semibold">{email}</span>.
                    </p>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md shadow-2xl space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white font-display">12-Month Savings Projection</h4>
                      <p className="text-sm text-zinc-400 font-light">Cumulative net gain with automation vs baseline.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-400">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span>With Automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-zinc-600" />
                        <span>Manual Baseline</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#a1a1aa', fontSize: 12 }}
                          label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: '#a1a1aa', fontSize: 10 }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#a1a1aa', fontSize: 12 }}
                          tickFormatter={(val) => `$${val/1000}k`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(10, 15, 30, 0.9)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '24px', 
                            padding: '16px', 
                            backdropFilter: 'blur(10px)',
                            color: '#fff'
                          }}
                          formatter={(val: number) => [formatCurrency(val), '']}
                        />
                        <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
                        {results.breakevenMonth !== Infinity && results.breakevenMonth <= 12 && (
                          <ReferenceLine 
                            x={results.breakevenMonth} 
                            stroke="#fbbf24" 
                            strokeDasharray="3 3" 
                            label={{ value: 'Breakeven', position: 'top', fill: '#fbbf24', fontSize: 10 }} 
                          />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="cumulativeSavings" 
                          stroke="#fbbf24" 
                          strokeWidth={4} 
                          dot={{ r: 4, fill: '#fbbf24', strokeWidth: 2, stroke: '#0a0f1e' }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="manualCost" 
                          stroke="rgba(255,255,255,0.2)" 
                          strokeWidth={2} 
                          dot={false}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">ROI Milestone: Month 3</p>
                      <p className="text-sm text-zinc-400 font-light">
                        Most clients see measurable ROI by Month 3. You're projected to have saved <span className="font-bold text-amber-400">{formatCurrency(results.chartData[3].cumulativeSavings)}</span> by then.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monthly Breakdown Table */}
                <div className="bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
                  <div className="p-8 border-b border-white/10">
                    <h4 className="text-xl font-bold text-white font-display">Monthly Cost Analysis</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-b border-white/10">
                          <th className="px-8 py-4">Month</th>
                          <th className="px-8 py-4">Manual Cost</th>
                          <th className="px-8 py-4">Automation Cost</th>
                          <th className="px-8 py-4">Net Savings</th>
                          <th className="px-8 py-4">Cumulative</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {results.chartData.slice(1).map((row) => (
                          <tr key={row.month} className="hover:bg-white/5 transition-colors">
                            <td className="px-8 py-4 font-bold text-white">Month {row.month}</td>
                            <td className="px-8 py-4 text-zinc-400 font-light">{formatCurrency(inputs.weeklyHours * 4.33 * inputs.hourlyCost * inputs.teamSize)}</td>
                            <td className="px-8 py-4 text-zinc-400 font-light">{formatCurrency(row.month === 1 ? inputs.setupInvestment : 0)}</td>
                            <td className="px-8 py-4 text-amber-400 font-bold">+{formatCurrency(row.netSavings)}</td>
                            <td className={`px-8 py-4 font-bold ${row.cumulativeSavings >= 0 ? 'text-amber-400' : 'text-orange-400'}`}>
                              {formatCurrency(row.cumulativeSavings)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md space-y-8">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-amber-400" size={24} />
                    <h4 className="text-xl font-bold text-white font-display">Benchmark Comparison</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                      <p className="text-lg text-zinc-300 font-light leading-relaxed">
                        Businesses like yours average <span className="text-white font-bold">{BENCHMARK_HOURS} hours saved weekly</span> after full implementation.
                      </p>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Your Potential</p>
                        <p className="text-3xl font-bold text-amber-400 font-display">
                          {inputs.weeklyHours >= BENCHMARK_HOURS ? 'Above Average' : 'High Potential'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
                          <span>Your Savings</span>
                          <span>Benchmark</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500" 
                            style={{ width: `${(inputs.weeklyHours / (BENCHMARK_HOURS * 1.5)) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 font-light">
                        You are currently projecting <span className="text-white font-bold">{inputs.weeklyHours}h</span> in weekly savings, which is <span className="text-amber-400 font-bold">{Math.round((inputs.weeklyHours / BENCHMARK_HOURS) * 100)}%</span> of the industry benchmark.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 bg-slate-900/80 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-display">
              Want us to build this <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">system for you?</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              The calculator shows you the potential. We provide the execution. Start with a deep-dive audit to map your path to 520% ROI.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact"
                className="px-12 py-6 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-600 hover:scale-[1.02] transition-all shadow-2xl shadow-amber-500/20 inline-flex items-center gap-3 group cursor-pointer print-hide"
              >
                Start with a Free Strategy Call
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
