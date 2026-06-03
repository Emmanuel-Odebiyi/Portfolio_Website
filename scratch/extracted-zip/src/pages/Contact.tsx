import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Target, 
  MessageSquare, 
  Building2, 
  Mail, 
  User, 
  Calendar, 
  DollarSign,
  Briefcase,
  ChevronRight,
  Sparkles,
  Phone,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---

type Step = 1 | 2 | 3 | 4 | 5 | 'success';

interface FormData {
  intent: string;
  customIntent: string;
  industry: string;
  stage: string;
  painPoints: string[];
  customPainPoint: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
}

// --- Constants ---

const INTENT_OPTIONS = [
  { id: 'automation', label: 'Automation', icon: Zap, desc: 'Scale operations without hiring.' },
  { id: 'seo-content', label: 'SEO / Content', icon: Globe, desc: 'Dominate organic search.' },
  { id: 'growth-system', label: 'Full Growth System', icon: Target, desc: 'The complete end-to-end engine.' },
  { id: 'other', label: 'Something else', icon: MessageSquare, desc: 'Custom strategy or consultation.' },
];

const STAGE_OPTIONS = ['Early Stage / Startup', 'Growth / Scaling', 'Established Enterprise', 'Agency / Partner'];

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

const BASE_BUDGETS = [
  { min: 0, max: 5000, label: '< $5,000 / mo' },
  { min: 5000, max: 15000, label: '$5,000 - $15,000 / mo' },
  { min: 15000, max: 30000, label: '$15,000 - $30,000 / mo' },
  { min: 30000, max: Infinity, label: '$30,000+ / mo' }
];

const PAIN_POINT_OPTIONS = [
  'Growth has plateaued',
  'Manual tasks are eating my time',
  'Low lead quality',
  'SEO traffic is declining',
  'Systems are breaking at scale',
  'Need a clear strategy'
];

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 1 month',
  '1-3 months',
  'Just exploring'
];

// --- Components ---

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-12 space-y-2">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-emerald-500"
        />
      </div>
    </div>
  );
};

const OptionCard = ({ selected, onClick, icon: Icon, label, desc }: any) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-[2rem] border text-left transition-all duration-300 group ${
      selected 
        ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl shadow-zinc-200' 
        : 'bg-white border-zinc-100 hover:border-zinc-300 text-zinc-900'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'bg-white/10 text-emerald-400' : 'bg-zinc-50 text-zinc-400 group-hover:text-emerald-500'
      }`}>
        <Icon size={24} />
      </div>
      <div className="space-y-1">
        <p className="font-bold text-lg">{label}</p>
        <p className={`text-sm font-light leading-relaxed ${selected ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {desc}
        </p>
      </div>
      {selected && (
        <div className="ml-auto mt-1">
          <CheckCircle2 size={20} className="text-emerald-400" />
        </div>
      )}
    </div>
  </button>
);

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<FormData>({
    intent: '',
    customIntent: '',
    industry: '',
    stage: '',
    painPoints: [],
    customPainPoint: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
  });

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

  const budgetOptions = React.useMemo(() => {
    const rate = exchangeRates[selectedCurrency] || 1;
    const symbol = CURRENCIES.find(c => c.code === selectedCurrency)?.symbol || '$';

    return BASE_BUDGETS.map(b => {
      const min = Math.round(b.min * rate);
      const max = Math.round(b.max * rate);

      if (b.max === Infinity) {
        return `${symbol}${min.toLocaleString()}+ / mo`;
      }
      if (b.min === 0) {
        return `< ${symbol}${max.toLocaleString()} / mo`;
      }
      return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()} / mo`;
    });
  }, [selectedCurrency, exchangeRates]);

  const nextStep = () => setStep((prev) => (prev as number + 1) as Step);
  const prevStep = () => setStep((prev) => (prev as number - 1) as Step);

  const togglePainPoint = (point: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setStep('success'), 1000);
  };

  const isStepValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch(step) {
      case 1: return !!formData.intent && (formData.intent !== 'other' || !!formData.customIntent);
      case 2: return !!formData.industry && !!formData.stage;
      case 3: return formData.painPoints.length > 0 || !!formData.customPainPoint;
      case 4: return !!formData.budget && !!formData.timeline;
      case 5: return !!formData.name && emailRegex.test(formData.email) && !!formData.company;
      default: return true;
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto px-6">
        
        <AnimatePresence mode="wait">
          {step !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
                >
                  <Sparkles size={12} className="text-emerald-500" />
                  Work With Me
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[0.95]">
                  Let's build something <br />
                  <span className="text-zinc-300">that actually works.</span>
                </h1>
                <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
                  This isn't a standard contact form. It's the start of a conversation about your growth.
                </p>
              </div>

              <ProgressIndicator currentStep={step as number} totalSteps={5} />

              {/* Step Content */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900">What do you need help with?</h2>
                        <p className="text-zinc-500 font-light">Select the primary focus of our collaboration.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INTENT_OPTIONS.map((opt) => (
                          <OptionCard 
                            key={opt.id}
                            selected={formData.intent === opt.id}
                            onClick={() => setFormData({ ...formData, intent: opt.id })}
                            {...opt}
                          />
                        ))}
                      </div>

                      <AnimatePresence>
                        {formData.intent === 'other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 max-w-2xl mx-auto pt-4">
                              <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={14} className="text-zinc-400" /> Please specify
                              </label>
                              <textarea 
                                placeholder="Briefly describe what you're looking for..."
                                value={formData.customIntent}
                                onChange={(e) => setFormData({ ...formData, customIntent: e.target.value })}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all min-h-[100px] resize-none"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900">Tell me about your business.</h2>
                        <p className="text-zinc-500 font-light">This helps me understand your operational context.</p>
                      </div>
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Building2 size={14} className="text-zinc-400" /> Industry
                          </label>
                          <input 
                            type="text"
                            placeholder="e.g. SaaS, E-commerce, Fintech"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={14} className="text-zinc-400" /> Business Stage
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {STAGE_OPTIONS.map((s) => (
                              <button
                                key={s}
                                onClick={() => setFormData({ ...formData, stage: s })}
                                className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                                  formData.stage === s 
                                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                                }`}
                              >
                                {s}
                                {formData.stage === s && <CheckCircle2 size={16} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900">What's currently not working?</h2>
                        <p className="text-zinc-500 font-light">Select all that apply or describe your challenge.</p>
                      </div>
                      <div className="max-w-2xl mx-auto space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {PAIN_POINT_OPTIONS.map((p) => (
                            <button
                              key={p}
                              onClick={() => togglePainPoint(p)}
                              className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                                formData.painPoints.includes(p)
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                                  : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'
                              }`}
                            >
                              {p}
                              {formData.painPoints.includes(p) && <CheckCircle2 size={16} className="text-emerald-500" />}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <MessageSquare size={14} className="text-zinc-400" /> Other Challenges
                          </label>
                          <textarea 
                            placeholder="Describe your specific situation..."
                            value={formData.customPainPoint}
                            onChange={(e) => setFormData({ ...formData, customPainPoint: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all min-h-[120px] resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900">Scale & Readiness.</h2>
                        <p className="text-zinc-500 font-light">Almost done — just a few more details.</p>
                      </div>
                      <div className="max-w-md mx-auto space-y-8">
                        {/* Currency Toggle */}
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={14} className="text-zinc-400" /> Preferred Currency
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {CURRENCIES.map((curr) => (
                              <button
                                key={curr.code}
                                onClick={() => setSelectedCurrency(curr.code)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                  selectedCurrency === curr.code
                                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg'
                                    : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'
                                }`}
                              >
                                {curr.code}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <DollarSign size={14} className="text-zinc-400" /> Monthly Investment Range
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {budgetOptions.map((b) => (
                              <button
                                key={b}
                                onClick={() => setFormData({ ...formData, budget: b })}
                                className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                                  formData.budget === b 
                                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                                }`}
                              >
                                {b}
                                {formData.budget === b && <CheckCircle2 size={16} />}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Calendar size={14} className="text-zinc-400" /> Desired Timeline
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {TIMELINE_OPTIONS.map((t) => (
                              <button
                                key={t}
                                onClick={() => setFormData({ ...formData, timeline: t })}
                                className={`px-6 py-4 rounded-2xl border text-sm font-medium transition-all text-left flex items-center justify-between ${
                                  formData.timeline === t 
                                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400'
                                }`}
                              >
                                {t}
                                {formData.timeline === t && <CheckCircle2 size={16} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold text-zinc-900">Final Step: Contact Details.</h2>
                        <p className="text-zinc-500 font-light">Where should I send my initial thoughts?</p>
                      </div>
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <User size={14} className="text-zinc-400" /> Full Name
                          </label>
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={14} className="text-zinc-400" /> Work / Personal Email
                          </label>
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Building2 size={14} className="text-zinc-400" /> Company Name
                          </label>
                          <input 
                            required
                            type="text"
                            placeholder="Company Inc."
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between max-w-md mx-auto pt-8 border-t border-zinc-100">
                {step > 1 ? (
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-zinc-500 font-bold hover:text-zinc-900 transition-colors"
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                ) : <div />}
                
                {step < 5 ? (
                  <button 
                    disabled={!isStepValid()}
                    onClick={nextStep}
                    className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-zinc-900"
                  >
                    Next Step
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button 
                    disabled={!isStepValid()}
                    onClick={handleSubmit}
                    className="px-10 py-5 bg-emerald-500 text-zinc-900 font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                  >
                    Send Message
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>

              {/* Alternative Contact */}
              <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-100">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Email Me</p>
                    <p className="font-bold text-zinc-900">emmayoodebiyi001@gmail.com</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Call / WhatsApp</p>
                    <p className="font-bold text-zinc-900">+234 812 345 6789</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <Clock size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Response Time</p>
                    <p className="font-bold text-zinc-900">Within 24-48 Hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-20"
            >
              <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-zinc-900 tracking-tight">Got it, {formData.name.split(' ')[0]}.</h2>
                <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
                  I'll personally review your details and get back to you within 24–48 hours with some initial thoughts on your growth strategy.
                </p>
              </div>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/growth-intelligence-lab"
                  className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
                >
                  Explore the Lab
                  <ChevronRight size={20} />
                </Link>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-zinc-900 border border-zinc-200 font-bold rounded-2xl hover:bg-zinc-50 transition-all flex items-center gap-2"
                >
                  Book a Discovery Call
                  <Calendar size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
