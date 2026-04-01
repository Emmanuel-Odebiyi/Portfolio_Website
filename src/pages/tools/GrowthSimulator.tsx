import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
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
  ChevronRight,
  Info
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
  ReferenceArea
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

const MILESTONES = {
  3: "Content velocity begins to compound",
  6: "SEO impact starts accelerating",
  9: "Lead pipeline stabilises and becomes predictable",
};

// --- Components ---

const InputField = ({ label, icon: Icon, value, onChange, type = "number", min = 0 }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
      <Icon size={14} className="text-zinc-400" /> {label}
    </label>
    <input 
      type={type}
      min={min}
      value={value}
      onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
      className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
    />
  </div>
);

const InsightCard = ({ title, description, type = 'info' }: { title: string; description: string; type?: 'info' | 'success' | 'warning' }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-100 text-blue-900 icon-blue-500',
    success: 'bg-deep-space-blue-50 border-deep-space-blue-100 text-deep-space-blue-900 icon-deep-space-blue-500',
    warning: 'bg-amber-50 border-amber-100 text-amber-900 icon-amber-500',
  };

  return (
    <div className={`p-6 rounded-3xl border ${colors[type]} flex gap-4 items-start`}>
      <div className="mt-1 shrink-0">
        {type === 'success' ? <CheckCircle2 size={20} /> : type === 'warning' ? <AlertCircle size={20} /> : <Info size={20} />}
      </div>
      <div className="space-y-1">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-sm opacity-80 font-light leading-relaxed">{description}</p>
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
    
    // Base rates
    const leadToRevRatio = inputs.revenue / (inputs.leads || 1);
    const visitorToLeadRatio = inputs.leads / (inputs.visitors || 1);

    // Manual Growth Rates (Monthly)
    const manualTrafficGrowth = 0.02; // ~6% per quarter
    
    // Autopilot Growth Rates (Monthly)
    const autopilotTrafficGrowth = 0.042; // ~65% annually
    const conversionUplift = 1.15; // 15% better conversion

    for (let i = 0; i <= 12; i++) {
      // Manual Path
      const manualVisitors = inputs.visitors * Math.pow(1 + manualTrafficGrowth, i);
      const manualLeads = manualVisitors * visitorToLeadRatio;
      const manualRevenue = manualLeads * leadToRevRatio;

      // Autopilot Path
      const autopilotVisitors = inputs.visitors * Math.pow(1 + autopilotTrafficGrowth, i);
      const autopilotLeads = autopilotVisitors * visitorToLeadRatio * conversionUplift;
      
      let autopilotRevenue = autopilotLeads * leadToRevRatio;
      
      // Industry specific adjustments
      if (inputs.industry === 'SaaS') {
        // SaaS compounding effect
        autopilotRevenue = autopilotRevenue * (1 + (i * 0.02));
      } else if (inputs.industry === 'Marketing Agency') {
        // Capacity unlock narrative handled in insights, but slightly boost rev
        autopilotRevenue = autopilotRevenue * 1.1;
      } else if (inputs.industry === 'Other') {
        // General automation efficiency factor (5% boost)
        autopilotRevenue = autopilotRevenue * 1.05;
      }

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
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-deep-space-blue-500" />
            Growth Forecasting Engine
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
            Growth <span className="text-zinc-300">Simulator™</span>
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
            Project your 12-month trajectory. Compare manual operations against an automated autopilot path.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-50 rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/50 space-y-8">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-zinc-900">Growth Inputs</h3>
                <p className="text-sm text-zinc-500 font-light">Define your current baseline metrics.</p>
              </div>

              <div className="space-y-6">
                {/* Currency Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} className="text-zinc-400" /> Preferred Currency
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

                <InputField 
                  label="Monthly Visitors" 
                  icon={Globe} 
                  value={inputs.visitors} 
                  onChange={(v: number) => setInputs({ ...inputs, visitors: v })} 
                />
                <InputField 
                  label="Monthly Organic Leads" 
                  icon={MousePointer2} 
                  value={inputs.leads} 
                  onChange={(v: number) => setInputs({ ...inputs, leads: v })} 
                />
                <InputField 
                  label={`Monthly Revenue (${CURRENCIES.find(c => c.code === inputs.currency)?.symbol})`} 
                  icon={TrendingUp} 
                  value={inputs.revenue} 
                  onChange={(v: number) => setInputs({ ...inputs, revenue: v })} 
                />
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} className="text-zinc-400" /> Industry
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(['SaaS', 'E-commerce', 'Marketing Agency', 'Other'] as Industry[]).map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setInputs({ ...inputs, industry: ind })}
                        className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                          inputs.industry === ind 
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                        }`}
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

                <div className="pt-4 border-t border-zinc-200 space-y-6">
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
          <div className="lg:col-span-8 space-y-8">
            
            {/* Chart Card */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-zinc-100 shadow-2xl shadow-zinc-200/60 space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">12-Month Growth Trajectory</h3>
                  <p className="text-zinc-500 font-light">Visualizing the compounding impact of automation.</p>
                </div>
                <div className="flex bg-zinc-100 p-1 rounded-2xl self-start">
                  <button 
                    onClick={() => setMetricToggle('revenue')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${metricToggle === 'revenue' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Revenue
                  </button>
                  <button 
                    onClick={() => setMetricToggle('visitors')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${metricToggle === 'visitors' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Traffic
                  </button>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projections} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#a1a1aa', fontSize: 12 }}
                      label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: '#a1a1aa', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#a1a1aa', fontSize: 12 }}
                      tickFormatter={(val) => {
                        const symbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';
                        return metricToggle === 'revenue' ? `${symbol}${val/1000}k` : `${val/1000}k`;
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '16px' }}
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
                      stroke="#f59e0b" 
                      strokeWidth={3} 
                      dot={false}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      name="Autopilot Path"
                      type="monotone" 
                      dataKey={metricToggle === 'revenue' ? 'autopilotRevenue' : 'autopilotVisitors'} 
                      stroke="#10b981" 
                      strokeWidth={5} 
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gap Callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-zinc-100">
                <div className="space-y-2">
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">The Opportunity Gap</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-deep-space-blue-500">+{gap.percent}%</span>
                    <span className="text-zinc-500 font-light">Growth Potential</span>
                  </div>
                </div>
                <div className="bg-deep-space-blue-50 p-6 rounded-3xl border border-deep-space-blue-100">
                  <p className="text-sm text-deep-space-blue-900 leading-relaxed">
                    The difference between these two paths is <span className="font-bold">{formatCurrency(gap.revenue)}</span> in annual revenue and <span className="font-bold">{gap.visitors.toLocaleString()}</span> more organic visitors.
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
              <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-10 max-w-xl">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-deep-space-blue-400">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">See Full Growth Breakdown</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
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
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/50 transition-all placeholder:text-zinc-600"
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
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/50 transition-all placeholder:text-zinc-600"
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
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/50 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full py-5 bg-deep-space-blue-500 text-zinc-900 font-bold rounded-2xl hover:bg-deep-space-blue-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                      {loading ? 'Generating Report...' : 'Generate Full Growth Report'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-deep-space-blue-500/10 blur-[100px] rounded-full" />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Full Report Table */}
                <div className="bg-white rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 overflow-hidden">
                  <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                    <h4 className="text-xl font-bold text-zinc-900">Monthly Performance Comparison</h4>
                    <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-deep-space-blue-500" /> Autopilot
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500" /> Manual
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                          <th className="px-8 py-4">Month</th>
                          <th className="px-8 py-4">Visitors (M vs A)</th>
                          <th className="px-8 py-4">Leads (M vs A)</th>
                          <th className="px-8 py-4">Revenue (M vs A)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {projections.map((row) => (
                          <tr key={row.month} className="hover:bg-zinc-50 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="space-y-1">
                                <span className="font-bold text-zinc-900">Month {row.month}</span>
                                {row.milestone && (
                                  <p className="text-[10px] text-deep-space-blue-600 font-bold uppercase tracking-tighter flex items-center gap-1">
                                    <Zap size={10} /> {row.milestone}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-400 text-xs line-through">{row.manualVisitors.toLocaleString()}</span>
                                <span className="text-deep-space-blue-600 font-bold">{row.autopilotVisitors.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-400 text-xs line-through">{row.manualLeads.toLocaleString()}</span>
                                <span className="text-deep-space-blue-600 font-bold">{row.autopilotLeads.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-zinc-400 text-xs line-through">{formatCurrency(row.manualRevenue)}</span>
                                <span className="text-deep-space-blue-600 font-bold">{formatCurrency(row.autopilotRevenue)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmark Note */}
                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-400 shrink-0">
                    <BarChart3 size={20} />
                  </div>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">
                    <span className="font-bold text-zinc-900">Benchmark Note:</span> These projections are modelled on real client results across {inputs.industry === 'Other' ? (inputs.otherIndustryName || 'various') : inputs.industry} sectors. Actual outcomes depend on niche competition, content quality, and your starting baseline.
                  </p>
                </div>

                {/* Final CTA */}
                <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden">
                  <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      See what this looks like <br />
                      <span className="text-deep-space-blue-500">for your business.</span>
                    </h2>
                    <p className="text-lg text-zinc-400 font-light">
                      The simulator shows the math. We show you the strategy. Book a free call to map your specific automation growth path.
                    </p>
                    <div className="pt-4">
                      <Link 
                        to="/contact"
                        className="px-10 py-5 bg-deep-space-blue-500 text-zinc-900 font-bold rounded-2xl hover:bg-deep-space-blue-400 transition-all shadow-2xl shadow-deep-space-blue-500/20 inline-flex items-center gap-3 group"
                      >
                        Book a Free Strategy Call
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-deep-space-blue-500/5 to-transparent" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
