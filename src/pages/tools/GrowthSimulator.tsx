import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Users, 
  Briefcase, 
  Globe, 
  Zap, 
  MousePointer2, 
  BarChart3,
  Mail,
  Building2,
  Info,
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
  Legend
} from 'recharts';

// --- Types ---

type Industry = 'SaaS' | 'E-commerce' | 'Marketing Agency' | 'Other';

interface SimulatorInputs {
  visitors: number;
  leads: number;
  revenue: number;
  contentPerMonth: number;
  adSpend: number;
  industry: Industry;
  otherIndustryName?: string;
  currency: string;
}

interface ProjectionPoint {
  month: number;
  manualVisitors: number;
  autopilotVisitors: number;
  manualLeads: number;
  autopilotLeads: number;
  manualRevenue: number;
  autopilotRevenue: number;
  milestone?: string;
}

// --- Constants ---

const INITIAL_INPUTS: SimulatorInputs = {
  visitors: 5000,
  leads: 100,
  revenue: 25000,
  contentPerMonth: 2,
  adSpend: 1000,
  industry: 'SaaS',
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

const MILESTONES: Record<number, string> = {
  2: "Automated lead nurture activates",
  4: "Content flywheel gains traction",
  6: "SEO compounding begins",
  9: "Pipeline becomes predictable",
  12: "T2D3 trajectory achieved",
};

const INDUSTRY_PARAMS: Record<Industry, {
  manualGrowth: number;
  autopilotGrowth: number;
  conversionUplift: number;
  revenueMultiplier: (month: number) => number;
  churnReduction: number;
}> = {
  'SaaS': {
    manualGrowth: 0.02,
    autopilotGrowth: 0.05,
    conversionUplift: 1.20,
    revenueMultiplier: (m) => 1 + (m * 0.025),
    churnReduction: 0.30,
  },
  'E-commerce': {
    manualGrowth: 0.015,
    autopilotGrowth: 0.04,
    conversionUplift: 1.15,
    revenueMultiplier: (m) => 1 + (m % 3 === 0 ? 0.08 : 0.02),
    churnReduction: 0.20,
  },
  'Marketing Agency': {
    manualGrowth: 0.01,
    autopilotGrowth: 0.035,
    conversionUplift: 1.12,
    revenueMultiplier: () => 1.10,
    churnReduction: 0.25,
  },
  'Other': {
    manualGrowth: 0.015,
    autopilotGrowth: 0.035,
    conversionUplift: 1.10,
    revenueMultiplier: () => 1.05,
    churnReduction: 0.15,
  },
};

// --- Components ---

const InputField = ({ label, icon: Icon, value, onChange, type = "number", min = 0 }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
      <Icon size={14} className="text-emerald-500" /> {label}
    </label>
    <input 
      type={type}
      min={min}
      value={value}
      onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
      className="w-full border rounded-2xl px-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all font-sans"
      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
    />
  </div>
);

const InsightCard = ({ title, description, type = 'info' }: { title: string; description: string; type?: 'info' | 'success' | 'warning' }) => {
  return (
    <div className="p-6 rounded-3xl border backdrop-blur-md flex gap-4 items-start interactive-card" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
      <div className={`mt-1 shrink-0 ${type === 'success' ? 'text-emerald-500' : type === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
        {type === 'success' ? <CheckCircle2 size={20} /> : type === 'warning' ? <AlertCircle size={20} /> : <Info size={20} />}
      </div>
      <div className="space-y-1">
        <p className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>{title}</p>
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{description}</p>
      </div>
    </div>
  );
};

export default function GrowthSimulator() {
  const [inputs, setInputs] = useState<SimulatorInputs>(INITIAL_INPUTS);
  const [prevCurrency, setPrevCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [metricToggle, setMetricToggle] = useState<'revenue' | 'visitors'>('revenue');

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
        revenue: Math.round(inputs.revenue * rate),
        adSpend: Math.round(inputs.adSpend * rate),
      });
      setPrevCurrency(newCurrency);
    } else {
      setInputs({ ...inputs, currency: newCurrency });
      setPrevCurrency(newCurrency);
    }
  };

  // --- Logic ---

  const projections = useMemo(() => {
    const data: ProjectionPoint[] = [];
    const params = INDUSTRY_PARAMS[inputs.industry];
    
    const leadToRevRatio = inputs.revenue / (inputs.leads || 1);
    const visitorToLeadRatio = inputs.leads / (inputs.visitors || 1);

    for (let i = 0; i <= 12; i++) {
      const manualVisitors = inputs.visitors * Math.pow(1 + params.manualGrowth, i);
      const manualLeads = manualVisitors * visitorToLeadRatio;
      const manualRevenue = manualLeads * leadToRevRatio;

      const autopilotVisitors = inputs.visitors * Math.pow(1 + params.autopilotGrowth, i);
      const autopilotLeads = autopilotVisitors * visitorToLeadRatio * params.conversionUplift;
      let autopilotRevenue = autopilotLeads * leadToRevRatio * params.revenueMultiplier(i);
      
      const churnSavings = manualRevenue * 0.05 * params.churnReduction * i;
      autopilotRevenue += churnSavings;

      data.push({
        month: i,
        manualVisitors: Math.round(manualVisitors),
        autopilotVisitors: Math.round(autopilotVisitors),
        manualLeads: Math.round(manualLeads),
        autopilotLeads: Math.round(autopilotLeads),
        manualRevenue: Math.round(manualRevenue),
        autopilotRevenue: Math.round(autopilotRevenue),
        milestone: (MILESTONES as any)[i],
      });
    }

    return data;
  }, [inputs]);

  const gap = useMemo(() => {
    const last = projections[12];
    return {
      revenue: last.autopilotRevenue - last.manualRevenue,
      visitors: last.autopilotVisitors - last.manualVisitors,
      percent: Math.round(((last.autopilotRevenue / last.manualRevenue) - 1) * 100)
    };
  }, [projections]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreywnvb';
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          tool: 'Growth Simulator',
          inputs,
          gap: {
            revenue: gap.revenue,
            visitors: gap.visitors,
            percent: gap.percent
          }
        }),
      });
      setIsUnlocked(true);
    } catch (error) {
      console.error('Submission failed:', error);
      setIsUnlocked(true);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: inputs.currency, 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-x-clip print-area" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Revenue Scaling Planner | Emmanuel Odebiyi"
        description="Model different growth scenarios to map the easiest path to scaling your revenue. Compare manual vs automated growth trajectories across 12 months."
        keywords="revenue scaling planner, growth simulator, T2D3 growth model, automation ROI projections"
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
          .text-emerald-500, .text-emerald-400 {
            color: #047857 !important;
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
            <p className="text-xs uppercase tracking-wider text-slate-500">Growth Intelligence & Growth Projections Report</p>
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
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20 print-hide">
          <Link to="/growth-intelligence-lab" className="inline-flex items-center gap-2 transition-colors text-sm font-sans font-bold uppercase tracking-widest group border rounded-full px-4 py-1.5" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Back to Lab
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display leading-[1.1] break-words" style={{ color: 'var(--text-body)' }}>
            Revenue Scaling <span style={{ color: 'var(--accent-teal)' }}>Planner™</span>
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto animate-none" style={{ color: 'var(--text-muted)' }}>
            Model different growth scenarios to map the easiest path to scaling your revenue with zero guesswork.
          </p>
        </div>

              {/* Onboarding Guide Banner */}
              <div className="p-8 rounded-[2rem] border relative overflow-hidden text-left mb-8 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent shadow-xl animate-none" style={{ borderColor: 'var(--border-card)' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full" />
                <h4 className="text-sm font-mono uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2 font-bold">
                  <Zap size={16} className="animate-pulse text-emerald-500" /> Simulator Guide
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>1. What it is</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      A growth engine mapping 12-month scaling trajectories based on operational models.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>2. What to fill</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Input your current traffic, leads, revenue, content outputs, and ad budget.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>3. What you get</p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Interactive charts, automatic benchmark comparison reports, and simulated growth metrics.
                    </p>
                  </div>
                </div>
              </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-[2.5rem] p-8 border backdrop-blur-md shadow-2xl space-y-8 text-left" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Growth Inputs</h3>
                  <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>Define your current baseline.</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((s) => (
                    <div 
                      key={s} 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold bg-emerald-500 text-slate-950"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                {/* Step 1: Core Financials */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">1</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 1: Baseline Metrics</h4>
                  </div>
                  
                  {/* Currency Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                      <TrendingUp size={14} className="text-emerald-500" /> Preferred Currency
                    </label>
                    <select
                      value={inputs.currency}
                      onChange={(e) => handleCurrencyChange(e.target.value)}
                      className="w-full border rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer font-sans"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.code} - {curr.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputField 
                    label="Monthly Website Visitors" 
                    icon={Globe} 
                    value={inputs.visitors} 
                    onChange={(v: number) => setInputs({ ...inputs, visitors: v })} 
                  />
                  <InputField 
                    label="Monthly New Leads / Signups" 
                    icon={MousePointer2} 
                    value={inputs.leads} 
                    onChange={(v: number) => setInputs({ ...inputs, leads: v })} 
                  />
                  <InputField 
                    label={`Monthly Sales / Revenue (${CURRENCIES.find(c => c.code === inputs.currency)?.symbol})`} 
                    icon={TrendingUp} 
                    value={inputs.revenue} 
                    onChange={(v: number) => setInputs({ ...inputs, revenue: v })} 
                  />
                </div>
                
                {/* Step 2: Industry */}
                <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">2</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 2: Industry Segment</h4>
                  </div>
                  <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                    <Briefcase size={14} className="text-emerald-500" /> Industry
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['SaaS', 'E-commerce', 'Marketing Agency', 'Other'] as Industry[]).map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setInputs({ ...inputs, industry: ind })}
                        className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                          inputs.industry === ind 
                            ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10 font-bold' 
                            : 'text-zinc-400 hover:border-zinc-400'
                        }`}
                        style={{
                          backgroundColor: inputs.industry === ind ? 'var(--accent-teal)' : 'var(--bg-page)',
                          borderColor: inputs.industry === ind ? 'var(--accent-teal)' : 'var(--border-card)',
                          color: inputs.industry === ind ? '#0E1C2A' : 'var(--text-muted)'
                        }}
                      >
                        {ind}
                        {inputs.industry === ind && <CheckCircle2 size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {inputs.industry === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <InputField 
                        label="Specify Industry" 
                        icon={Building2} 
                        type="text"
                        value={inputs.otherIndustryName || ''} 
                        onChange={(v: string) => setInputs({ ...inputs, otherIndustryName: v })} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step 3: Marketing Outputs */}
                <div className="pt-6 border-t space-y-6" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">3</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Step 3: Growth Catalysts</h4>
                  </div>
                  <InputField 
                    label="Articles / Month" 
                    icon={Zap} 
                    value={inputs.contentPerMonth} 
                    onChange={(v: number) => setInputs({ ...inputs, contentPerMonth: v })} 
                  />
                  <InputField 
                    label={`Monthly Ad Spend (${CURRENCIES.find(c => c.code === inputs.currency)?.symbol})`} 
                    icon={BarChart3} 
                    value={inputs.adSpend} 
                    onChange={(v: number) => setInputs({ ...inputs, adSpend: v })} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Chart Card */}
            <div className="rounded-[3rem] p-8 md:p-12 border backdrop-blur-md shadow-2xl space-y-10" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>12-Month Growth Trajectory</h3>
                  <p className="font-light" style={{ color: 'var(--text-muted)' }}>Visualizing the compounding impact of automation.</p>
                </div>
                <div className="flex p-1 rounded-2xl self-start" style={{ backgroundColor: 'var(--bg-page)' }}>
                  <button 
                    onClick={() => setMetricToggle('revenue')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${metricToggle === 'revenue' ? 'text-slate-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                    style={{
                      backgroundColor: metricToggle === 'revenue' ? 'var(--accent-teal)' : 'transparent',
                      color: metricToggle === 'revenue' ? '#0E1C2A' : 'var(--text-muted)'
                    }}
                  >
                    Revenue
                  </button>
                  <button 
                    onClick={() => setMetricToggle('visitors')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${metricToggle === 'visitors' ? 'text-slate-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                    style={{
                      backgroundColor: metricToggle === 'visitors' ? 'var(--accent-teal)' : 'transparent',
                      color: metricToggle === 'visitors' ? '#0E1C2A' : 'var(--text-muted)'
                    }}
                  >
                    Traffic
                  </button>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projections} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-card)" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                      tickFormatter={(val) => {
                        const symbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';
                        return metricToggle === 'revenue' ? `${symbol}${val/1000}k` : `${val/1000}k`;
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '16px', backdropFilter: 'blur(10px)' }}
                      formatter={(val: number, name: string) => [
                        metricToggle === 'revenue' ? formatCurrency(val) : val.toLocaleString(), 
                        name.includes('autopilot') ? 'Autopilot Path' : 'Manual Path'
                      ]}
                    />
                    <Legend 
                      verticalAlign="top" 
                      align="right" 
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    <Line 
                      name="Manual Path"
                      type="monotone" 
                      dataKey={metricToggle === 'revenue' ? 'manualRevenue' : 'manualVisitors'} 
                      stroke="#059669" 
                      strokeWidth={3} 
                      dot={false}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      name="Autopilot Path"
                      type="monotone" 
                      dataKey={metricToggle === 'revenue' ? 'autopilotRevenue' : 'autopilotVisitors'} 
                      stroke="#34d399" 
                      strokeWidth={5} 
                      dot={{ r: 4, fill: '#34d399', strokeWidth: 2, stroke: '#0a0f1e' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gap Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <div className="space-y-2">
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>The Opportunity Gap</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-emerald-500 font-display">+{gap.percent}%</span>
                    <span style={{ color: 'var(--text-muted)' }} className="font-light">Growth Potential</span>
                  </div>
                </div>
                <div className="p-6 rounded-3xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    The difference between these two paths is <span className="font-bold animate-pulse" style={{ color: 'var(--text-body)' }}>{formatCurrency(gap.revenue)}</span> in annual revenue and <span className="font-bold" style={{ color: 'var(--text-body)' }}>{gap.visitors.toLocaleString()}</span> more organic visitors.
                  </p>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard 
                type="warning"
                title="Manual Growth is Linear"
                description="Staying manual keeps your growth steady but limited by your team's physical capacity to produce content and manage leads."
              />
              <InsightCard 
                type="success"
                title="Automation Compounds"
                description="With automation, your content output triples, compounding into consistent traffic and lead growth that scales without hiring."
              />
              {inputs.industry === 'Marketing Agency' && (
                <div className="md:col-span-2">
                  <InsightCard 
                    type="info"
                    title="Capacity Unlock"
                    description="By automating your fulfillment and lead gen, you can take on 2–3 more clients immediately without hiring a single new account manager."
                  />
                </div>
              )}
              {inputs.industry === 'Other' && (
                <div className="md:col-span-2">
                  <InsightCard 
                    type="info"
                    title={`${inputs.otherIndustryName || 'Custom Industry'} Efficiency`}
                    description="Automation in your sector typically results in a 5-10% immediate efficiency gain, allowing you to scale operations without increasing overhead costs."
                  />
                </div>
              )}
            </div>

            {/* Email Gate */}
            {!isUnlocked ? (
              <div className="rounded-[3rem] p-10 md:p-16 border backdrop-blur-md relative overflow-hidden shadow-2xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                <div className="relative z-10 space-y-10 max-w-xl">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-500 border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                      <Lock size={32} />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>See Full Growth Breakdown</h3>
                    <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                      Unlock the monthly comparison table, SEO milestone annotations, and industry-specific benchmark analysis.
                    </p>
                  </div>

                  <form onSubmit={handleUnlock} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input 
                          required
                          type="text" 
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border rounded-2xl pl-12 pr-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-sans"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input 
                          required
                          type="email" 
                          placeholder="Work Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border rounded-2xl pl-12 pr-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-sans"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full border rounded-2xl pl-12 pr-6 py-4 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-sans"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full py-5 text-slate-950 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer shadow-lg hover:brightness-110"
                      style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                    >
                      {loading ? 'Generating Report...' : 'Generate Full Growth Report'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 print-area"
              >
                {/* Success Feedback Card */}
                <div className="p-8 rounded-[2.5rem] border backdrop-blur-md flex items-start gap-4 shadow-xl print-hide animate-none" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Growth Projections Unlocked!</h4>
                    <p className="text-sm font-light mt-1" style={{ color: 'var(--text-muted)' }}>
                      We've also emailed a copy of your custom growth projections report to <span className="text-emerald-400 font-semibold">{email}</span>.
                    </p>
                  </div>
                </div>

                {/* Full Report Table */}
                <div className="rounded-[3rem] border backdrop-blur-md shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="p-8 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-card)' }}>
                    <h4 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Monthly Performance Comparison</h4>
                    <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Autopilot
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" /> Manual
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b text-[10px] font-mono text-zinc-400 uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                          <th className="px-8 py-4">Month</th>
                          <th className="px-8 py-4">Visitors (M vs A)</th>
                          <th className="px-8 py-4">Leads (M vs A)</th>
                          <th className="px-8 py-4">Revenue (M vs A)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--border-card)' }}>
                        {projections.map((row) => (
                          <tr key={row.month} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="space-y-1">
                                <span className="font-bold" style={{ color: 'var(--text-body)' }}>Month {row.month}</span>
                                {row.milestone && (
                                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                                    <Zap size={10} /> {row.milestone}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-500 text-xs line-through">{row.manualVisitors.toLocaleString()}</span>
                                <span className="text-emerald-400 font-bold">{row.autopilotVisitors.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-500 text-xs line-through">{row.manualLeads.toLocaleString()}</span>
                                <span className="text-emerald-400 font-bold">{row.autopilotLeads.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-500 text-xs line-through">{formatCurrency(row.manualRevenue)}</span>
                                <span className="text-emerald-400 font-bold">{formatCurrency(row.autopilotRevenue)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmark Note */}
                <div className="p-8 rounded-3xl border backdrop-blur-md flex items-start gap-4 shadow-xl" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0 border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                    <BarChart3 size={20} />
                  </div>
                  <p className="text-sm font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-bold" style={{ color: 'var(--text-body)' }}>Benchmark Note:</span> These projections are modelled on real client results across {inputs.industry === 'Other' ? (inputs.otherIndustryName || 'various') : inputs.industry} sectors. Actual outcomes depend on niche competition, content quality, and your starting baseline.
                  </p>
                </div>
 
                {/* Final CTA */}
                <div className="border rounded-[4rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden shadow-2xl backdrop-blur-lg" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                      See what this looks like <br />
                      <span className="text-emerald-500 font-bold">for your business.</span>
                    </h2>
                    <p className="text-lg font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                      The simulator shows the math. We show you the strategy. Book a free call to map your specific automation growth path.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link 
                        to="/contact"
                        className="px-10 py-5 text-slate-950 font-bold rounded-2xl transition-all inline-flex items-center gap-3 group print-hide hover:brightness-110"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                      >
                        Book a Free Strategy Call
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                      <button 
                        onClick={() => window.print()}
                        className="px-10 py-5 text-slate-950 font-bold rounded-2xl transition-all inline-flex items-center gap-3 cursor-pointer print-hide hover:brightness-110"
                        style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)' }}
                      >
                        <Download size={20} />
                        Download PDF Report
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
