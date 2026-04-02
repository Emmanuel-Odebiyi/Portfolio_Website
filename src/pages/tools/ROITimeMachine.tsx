import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
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
  BarChart3
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

const INDUSTRY_MULTIPLIERS = {
  'SaaS': 0.8,
  'E-commerce': 0.65,
  'Other': 0.7,
};

const BENCHMARK_ROI = 520;
const BENCHMARK_HOURS = 15.3;

// --- Components ---

const MetricCard = ({ label, value, subValue, icon: Icon, colorClass }: { 
  label: string; 
  value: string; 
  subValue?: string; 
  icon: any;
  colorClass: string;
}) => (
  <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 space-y-4 overflow-hidden">
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${colorClass} flex items-center justify-center shrink-0`}>
      <Icon size={20} className="md:w-6 md:h-6" />
    </div>
    <div className="space-y-1 min-w-0">
      <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-widest truncate">{label}</p>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight break-words leading-tight" title={value}>
        {value}
      </h3>
      {subValue && <p className="text-xs md:text-sm text-zinc-500 font-light truncate">{subValue}</p>}
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
    const monthlyManualLabourCost = (inputs.weeklyHours * 4.33) * inputs.hourlyCost * inputs.teamSize;
    const monthlyAutomationSavings = monthlyManualLabourCost * INDUSTRY_MULTIPLIERS[inputs.industry];
    
    const breakevenMonth = monthlyAutomationSavings > 0 
      ? Math.ceil(inputs.setupInvestment / monthlyAutomationSavings) 
      : Infinity;
    
    const twelveMonthSavings = (12 * monthlyAutomationSavings) - inputs.setupInvestment;
    const roi = inputs.setupInvestment > 0 
      ? (twelveMonthSavings / inputs.setupInvestment) * 100 
      : 0;

    const chartData: ROIData[] = Array.from({ length: 13 }, (_, i) => {
      const month = i;
      const manualCost = monthlyManualLabourCost * i;
      const automationCost = i === 0 ? inputs.setupInvestment : 0;
      const netSavings = i === 0 ? -inputs.setupInvestment : monthlyAutomationSavings;
      const cumulativeSavings = (monthlyAutomationSavings * i) - inputs.setupInvestment;

      return {
        month,
        manualCost,
        automationCost,
        netSavings,
        cumulativeSavings,
      };
    });

    return {
      monthlyManualLabourCost,
      monthlyAutomationSavings,
      breakevenMonth,
      twelveMonthSavings,
      roi,
      chartData,
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
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
            Financial Diagnostic
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
            ROI Time <span className="text-zinc-300">Machine™</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
            Quantify the exact financial impact of automation. Predict your savings, ROI, and breakeven point with data-driven precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Input Panel */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-zinc-50 rounded-[3rem] p-8 md:p-12 border border-zinc-100 shadow-xl shadow-zinc-200/50 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">Calculator Inputs</h3>
                <p className="text-sm text-zinc-500 font-light">Adjust the values to see real-time ROI projections.</p>
              </div>

              <div className="space-y-8">
                {/* Currency Selection */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} /> Preferred Currency
                  </label>
                  <select
                    value={inputs.currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all appearance-none cursor-pointer"
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
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Users size={14} /> Team Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 7, 15].map((size) => (
                      <button
                        key={size}
                        onClick={() => setInputs({ ...inputs, teamSize: size })}
                        className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                          inputs.teamSize === size 
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200' 
                            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {size === 1 ? '1' : size === 3 ? '2-3' : size === 7 ? '4-10' : '10+'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hourly Cost */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} /> Avg. Hourly Cost ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol}/hr)
                  </label>
                  <input 
                    type="number"
                    value={inputs.hourlyCost}
                    onChange={(e) => setInputs({ ...inputs, hourlyCost: Number(e.target.value) })}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                  />
                </div>

                {/* Weekly Hours */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} /> Weekly Hours (Repetitive Tasks)
                    </label>
                    <span className="text-lg font-bold text-brand-gradient">{inputs.weeklyHours}h</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="60"
                    value={inputs.weeklyHours}
                    onChange={(e) => setInputs({ ...inputs, weeklyHours: Number(e.target.value) })}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-deep-space-blue-500"
                  />
                </div>

                {/* Setup Investment */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Settings size={14} /> Automation Setup Investment ({CURRENCIES.find(c => c.code === inputs.currency)?.symbol})
                  </label>
                  <input 
                    type="number"
                    value={inputs.setupInvestment}
                    onChange={(e) => setInputs({ ...inputs, setupInvestment: Number(e.target.value) })}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} /> Industry
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['SaaS', 'E-commerce', 'Other'].map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setInputs({ ...inputs, industry: ind as any })}
                        className={`py-3 rounded-xl border text-xs font-medium transition-all ${
                          inputs.industry === ind 
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200' 
                            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
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
                value={`${inputs.weeklyHours}h`}
                subValue="Per team member"
                icon={Clock}
                colorClass="bg-blue-50 text-blue-600"
              />
              <MetricCard 
                label="Monthly Savings"
                value={formatCurrency(results.monthlyAutomationSavings)}
                subValue="Net gain"
                icon={DollarSign}
                colorClass="bg-deep-space-blue-50 text-brand-gradient"
              />
              <MetricCard 
                label="Breakeven Month"
                value={displayBreakeven(results.breakevenMonth)}
                subValue={breakevenSubtext(results.breakevenMonth)}
                icon={Timer}
                colorClass="bg-orange-50 text-orange-600"
              />
            </div>

            {/* ROI Highlight */}
            <div className="bg-zinc-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Projected 12-Month ROI</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-deep-space-blue-400 break-words">
                    {Math.round(results.roi).toLocaleString()}%
                  </h2>
                </div>
                <div className="max-w-xs text-center md:text-left space-y-4">
                  {results.roi >= BENCHMARK_ROI ? (
                    <div className="flex items-start gap-3 text-deep-space-blue-400">
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gradient/10 blur-[80px] rounded-full" />
            </div>

            {/* Email Gate */}
            {!isEmailUnlocked ? (
              <div className="bg-zinc-50 rounded-[3rem] p-10 border border-zinc-200 shadow-xl shadow-zinc-200/50 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-white shadow-sm flex items-center justify-center text-zinc-400 shrink-0">
                    <Lock size={32} />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-bold text-zinc-900 tracking-tight">See Full ROI Breakdown</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">
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
                    className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                  />
                  <input 
                    required
                    type="email"
                    placeholder="work@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all flex items-center justify-center gap-2 group"
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
                className="space-y-12"
              >
                {/* Chart Section */}
                <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-zinc-900">12-Month Savings Projection</h4>
                      <p className="text-sm text-zinc-500 font-light">Cumulative net gain with automation vs baseline.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-gradient" />
                        <span>With Automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-zinc-200" />
                        <span>Manual Baseline</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
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
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          formatter={(val: number) => [formatCurrency(val), '']}
                        />
                        <ReferenceLine y={0} stroke="#e4e4e7" />
                        {results.breakevenMonth !== Infinity && results.breakevenMonth <= 12 && (
                          <ReferenceLine x={results.breakevenMonth} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Breakeven', position: 'top', fill: '#f59e0b', fontSize: 10 }} />
                        )}
                        <Line 
                          type="monotone" 
                          dataKey="cumulativeSavings" 
                          stroke="#10b981" 
                          strokeWidth={4} 
                          dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="manualCost" 
                          stroke="#e4e4e7" 
                          strokeWidth={2} 
                          dot={false}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-deep-space-blue-50 border border-deep-space-blue-100 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shrink-0">
                      <TrendingUp size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-deep-space-blue-900">ROI Milestone: Month 3</p>
                      <p className="text-sm text-deep-space-blue-700 font-light">
                        Most clients see measurable ROI by Month 3. You're projected to have saved <span className="font-bold">{formatCurrency(results.chartData[3].cumulativeSavings)}</span> by then.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monthly Breakdown Table */}
                <div className="bg-white rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 overflow-hidden">
                  <div className="p-8 border-b border-zinc-100">
                    <h4 className="text-xl font-bold text-zinc-900">Monthly Cost Analysis</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                          <th className="px-8 py-4">Month</th>
                          <th className="px-8 py-4">Manual Cost</th>
                          <th className="px-8 py-4">Automation Cost</th>
                          <th className="px-8 py-4">Net Savings</th>
                          <th className="px-8 py-4">Cumulative</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {results.chartData.slice(1).map((row) => (
                          <tr key={row.month} className="hover:bg-zinc-50 transition-colors">
                            <td className="px-8 py-4 font-bold text-zinc-900">Month {row.month}</td>
                            <td className="px-8 py-4 text-zinc-500 font-light">{formatCurrency(inputs.weeklyHours * 4.33 * inputs.hourlyCost * inputs.teamSize)}</td>
                            <td className="px-8 py-4 text-zinc-500 font-light">{formatCurrency(row.month === 1 ? inputs.setupInvestment : 0)}</td>
                            <td className="px-8 py-4 text-brand-gradient font-bold">+{formatCurrency(row.netSavings)}</td>
                            <td className={`px-8 py-4 font-bold ${row.cumulativeSavings >= 0 ? 'text-brand-gradient' : 'text-orange-500'}`}>
                              {formatCurrency(row.cumulativeSavings)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div className="p-10 rounded-[3rem] bg-zinc-900 text-white space-y-8">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-brand-gradient" size={24} />
                    <h4 className="text-xl font-bold">Benchmark Comparison</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                      <p className="text-lg text-zinc-400 font-light leading-relaxed">
                        Businesses like yours average <span className="text-white font-bold">{BENCHMARK_HOURS} hours saved weekly</span> after full implementation.
                      </p>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Your Potential</p>
                        <p className="text-3xl font-bold text-deep-space-blue-400">
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
                            className="h-full bg-brand-gradient" 
                            style={{ width: `${(inputs.weeklyHours / (BENCHMARK_HOURS * 1.5)) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 font-light">
                        You are currently projecting <span className="text-white font-bold">{inputs.weeklyHours}h</span> in weekly savings, which is <span className="text-deep-space-blue-400 font-bold">{Math.round((inputs.weeklyHours / BENCHMARK_HOURS) * 100)}%</span> of the industry benchmark.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 bg-zinc-900 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Want us to build this <br />
              <span className="text-brand-gradient">system for you?</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              The calculator shows you the potential. We provide the execution. Start with a deep-dive audit to map your path to 520% ROI.
            </p>
            <div className="pt-8">
              <Link 
                to="/services"
                className="px-12 py-6 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-brand-gradient hover:text-white transition-all shadow-2xl shadow-indigo-500/20 inline-flex items-center gap-3 group"
              >
                Start with a $200 Deep-Dive Audit
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-deep-space-blue-500/10 to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
