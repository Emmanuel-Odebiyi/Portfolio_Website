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
  Clock,
  Workflow,
  Link as LinkIcon,
  Check,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

type Step = 1 | 2 | 3 | 4 | 'success';

interface FormData {
  bottleneck: string;
  customBottleneck: string;
  successVision: string;
  budget: string;
  name: string;
  email: string;
  companyUrl: string;
}

const BOTTLENECK_OPTIONS = [
  { 
    id: 'content', 
    label: 'Content Production', 
    icon: MessageSquare, 
    desc: 'Struggling to produce high-value content consistently.',
    badge: 'Velocity Gap'
  },
  { 
    id: 'seo', 
    label: 'SEO & Organic Growth', 
    icon: Globe, 
    desc: 'Publishing articles but not ranking or driving leads.',
    badge: 'Visibility Gap'
  },
  { 
    id: 'workflows', 
    label: 'Manual Operations', 
    icon: Workflow, 
    desc: 'Team drowning in repetitive publishing & editing tasks.',
    badge: 'Efficiency Gap'
  },
  { 
    id: 'leads', 
    label: 'Lead Nurturing Systems', 
    icon: Target, 
    desc: 'Traffic exists, but leads fall out of our conversion pipeline.',
    badge: 'Conversion Gap'
  },
  { 
    id: 'other', 
    label: 'Custom Challenge', 
    icon: Zap, 
    desc: 'Something else is holding your organic growth back.',
    badge: 'Unique Stack'
  }
];

const BUDGET_OPTIONS = [
  {
    range: '< $1,000 / mo',
    scope: 'Foundation Scope',
    details: 'Ideal for basic workflow mapping and SEO baseline setup.'
  },
  {
    range: '$1,000 - $3,000 / mo',
    scope: 'Accelerator Flow',
    details: 'Comprehensive content pipeline automation & target keyword ranking.'
  },
  {
    range: '$3,000 - $5,000 / mo',
    scope: 'Omnichannel Scale',
    details: 'Full-scale automated distribution engine, deep SEO optimization.'
  },
  {
    range: '$5,000+ / mo',
    scope: 'Enterprise Core',
    details: 'Bespoke AI-driven growth systems, fully integrated custom pipes.'
  }
];

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-lg mx-auto mb-16 space-y-3">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Sparkles size={11} className="text-blue-400" />
          Blueprint Phase {currentStep} of {totalSteps}
        </span>
        <span className="text-[#60a5fa] font-bold">{Math.round(progress)}% Configured</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden p-[1px]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        />
      </div>
    </div>
  );
};

const OptionCard = ({ selected, onClick, icon: Icon, label, desc, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-3xl border text-left transition-all duration-300 group relative overflow-hidden ${
      selected 
        ? 'bg-blue-500/10 border-blue-500/30 text-white shadow-xl shadow-blue-500/5' 
        : 'bg-[#0f172a]/40 border-white/5 hover:border-white/15 text-zinc-300 hover:bg-[#0f172a]/70'
    }`}
  >
    {/* Dynamic Background Hover Accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="flex items-start gap-5 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'bg-blue-500/20 text-[#60a5fa]' : 'bg-white/5 text-zinc-500 group-hover:text-[#60a5fa]'
      }`}>
        <Icon size={22} />
      </div>
      <div className="space-y-1.5 flex-1 pr-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-white">{label}</span>
          <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
            selected ? 'border-blue-500/30 bg-blue-500/10 text-blue-300' : 'border-white/5 bg-white/5 text-zinc-500'
          }`}>
            {badge}
          </span>
        </div>
        <p className={`text-sm font-light leading-relaxed ${selected ? 'text-zinc-300' : 'text-zinc-500'}`}>
          {desc}
        </p>
      </div>
      {selected && (
        <div className="shrink-0 mt-1">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <Check size={11} strokeWidth={3} />
          </div>
        </div>
      )}
    </div>
  </button>
);

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    bottleneck: '',
    customBottleneck: '',
    successVision: '',
    budget: '',
    name: '',
    email: '',
    companyUrl: '',
  });

  const nextStep = () => setStep((prev) => (prev as number + 1) as Step);
  const prevStep = () => setStep((prev) => (prev as number - 1) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreywnvb';
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStep('success');
      } else {
        const data = await response.json();
        setSubmitError(data?.errors?.[0]?.message || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch(step) {
      case 1: return !!formData.bottleneck && (formData.bottleneck !== 'other' || !!formData.customBottleneck);
      case 2: return !!formData.successVision && formData.successVision.trim().length > 5;
      case 3: return !!formData.budget;
      case 4: return !!formData.name && emailRegex.test(formData.email) && !!formData.companyUrl;
      default: return true;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#0a0f1e] text-[#f8fafc] min-h-screen relative overflow-hidden flex flex-col justify-center">
      <SEO 
        title="Collaborate with Emmanuel Odebiyi | Design Your Custom Growth Blueprint"
        description="Initiate your organic scaling discussion. Analyze bottlenecks, outline target vision milestones, define budgets, and construct a bespoke technical pipeline."
        keywords="growth marketing automation, B2B organic lead strategies, n8n workflow consultant, Emmanuel Odebiyi"
      />
      
      {/* Background Glow Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        <AnimatePresence mode="wait">
          {step !== 'success' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Top Meta Header */}
              <div className="text-center space-y-5">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 tracking-[0.2em] uppercase"
                >
                  <Sparkles size={11} className="text-blue-400" />
                  Engineering Scale
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none font-display">
                  Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic">Growth Engine</span>
                </h1>
                <p className="text-zinc-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                  Let's dissect your bottlenecks and construct an automated operational blueprint built exclusively for your business.
                </p>
              </div>

              <ProgressIndicator currentStep={step as number} totalSteps={4} />

              {/* Central Wizard Window */}
              <div className="min-h-[380px] bg-[#0f172a]/20 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-left">
                        <h2 className="text-2xl font-bold text-white font-sans">Core Operational Bottleneck</h2>
                        <p className="text-sm text-zinc-500 font-light">What specific growth vector is blocked or draining your team's energy right now?</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {BOTTLENECK_OPTIONS.map((opt) => (
                          <OptionCard 
                            key={opt.id}
                            selected={formData.bottleneck === opt.id}
                            onClick={() => setFormData({ ...formData, bottleneck: opt.id })}
                            {...opt}
                          />
                        ))}
                      </div>

                      <AnimatePresence>
                        {formData.bottleneck === 'other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2.5 pt-4 text-left">
                              <label className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] flex items-center gap-2">
                                <MessageSquare size={12} /> Please specify your challenge
                              </label>
                              <textarea 
                                placeholder="Explain in detail what's holding you back..."
                                value={formData.customBottleneck}
                                onChange={(e) => setFormData({ ...formData, customBottleneck: e.target.value })}
                                className="w-full bg-[#0f172a]/60 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all min-h-[100px] resize-none text-sm font-sans"
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
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2 text-left">
                        <h2 className="text-2xl font-bold text-white">Target 6-Month Vision</h2>
                        <p className="text-sm text-zinc-500 font-light">What does operational success and conversion scaling look like 180 days from today?</p>
                      </div>
                      
                      <div className="space-y-3.5 text-left">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] flex items-center gap-2">
                          <Target size={12} /> Desired Outcomes & Target KPIs
                        </label>
                        <textarea 
                          placeholder="e.g., We want to establish a content automation stack to publish twice weekly, rank top-10 for key industry terms, and automate leads distribution to Hubspot..."
                          value={formData.successVision}
                          onChange={(e) => setFormData({ ...formData, successVision: e.target.value })}
                          className="w-full bg-[#0f172a]/60 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all min-h-[160px] resize-none text-sm leading-relaxed font-sans"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-left">
                        <h2 className="text-2xl font-bold text-white">Strategic Investment Range</h2>
                        <p className="text-sm text-zinc-500 font-light">Select the monthly growth budget you are ready to allocate to build and run this engine.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {BUDGET_OPTIONS.map((opt) => (
                          <button
                            key={opt.range}
                            onClick={() => setFormData({ ...formData, budget: opt.range })}
                            className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group ${
                              formData.budget === opt.range 
                                ? 'bg-blue-500/10 border-blue-500/30 text-white shadow-xl' 
                                : 'bg-[#0f172a]/40 border-white/5 hover:border-white/15 text-zinc-300 hover:bg-[#0f172a]/70'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                formData.budget === opt.range ? 'bg-blue-500/20 text-[#60a5fa]' : 'bg-white/5 text-zinc-500'
                              }`}>
                                <DollarSign size={18} />
                              </div>
                              <div className="space-y-1.5 flex-1 pr-4">
                                <p className="font-bold text-white text-base">{opt.range}</p>
                                <p className={`text-[10px] font-mono uppercase tracking-widest ${formData.budget === opt.range ? 'text-blue-300' : 'text-zinc-500'}`}>
                                  {opt.scope}
                                </p>
                                <p className="text-xs text-zinc-500 font-light leading-relaxed mt-1">
                                  {opt.details}
                                </p>
                              </div>
                              {formData.budget === opt.range && (
                                <div className="shrink-0 mt-0.5">
                                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    <Check size={9} strokeWidth={3} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-left">
                        <h2 className="text-2xl font-bold text-white">Blueprint Handoff Details</h2>
                        <p className="text-sm text-zinc-500 font-light">Who should receive the initial review, audit points, and pipeline architecture recommendation?</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        
                        {/* Name Input */}
                        <div className="space-y-2 col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] flex items-center gap-1.5">
                            <User size={12} /> Full Name
                          </label>
                          <div className="relative group">
                            <input 
                              required
                              type="text"
                              placeholder="E.g., John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[#0f172a]/60 border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all text-sm font-sans"
                            />
                            <User size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2 col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] flex items-center gap-1.5">
                            <Mail size={12} /> Business Email
                          </label>
                          <div className="relative group">
                            <input 
                              required
                              type="email"
                              placeholder="E.g., john@yourcompany.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-[#0f172a]/60 border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all text-sm font-sans"
                            />
                            <Mail size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        {/* Company URL Input */}
                        <div className="space-y-2 col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] flex items-center gap-1.5">
                            <Building size={12} /> Company URL
                          </label>
                          <div className="relative group">
                            <input 
                              required
                              type="url"
                              placeholder="E.g., https://yourcompany.com"
                              value={formData.companyUrl}
                              onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                              className="w-full bg-[#0f172a]/60 border border-white/10 rounded-2xl px-5 py-4 pl-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all text-sm font-sans"
                            />
                            <LinkIcon size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                          </div>
                        </div>

                      </div>

                      {submitError && (
                        <div className="p-4 bg-red-950/20 border border-red-500/20 text-red-400 rounded-2xl text-xs font-mono text-center">
                          {submitError}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Navigation within Window */}
                <div className="flex items-center justify-between pt-8 mt-10 border-t border-white/5">
                  {step > 1 ? (
                    <button 
                      onClick={prevStep}
                      className="flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors font-bold"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}
                  
                  {step < 4 ? (
                    <button 
                      disabled={!isStepValid()}
                      onClick={nextStep}
                      className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center gap-2 disabled:opacity-30 font-mono text-xs uppercase tracking-widest ml-auto"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      disabled={!isStepValid() || loading}
                      onClick={handleSubmit}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-30 font-mono text-xs uppercase tracking-widest ml-auto relative overflow-hidden"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Build Blueprint
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-6"
            >
              <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-blue-500/30 text-[#60a5fa] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/5">
                <CheckCircle2 size={36} />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display">
                  Configuration Logged, {formData.name.split(' ')[0]}.
                </h2>
                <p className="text-zinc-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                  I am already reviewing your operational profile and company sitemap. Here is exactly how we construct your roadmap:
                </p>
              </div>
              
              {/* Structured Success Roadmap */}
              <div className="max-w-2xl mx-auto text-left">
                <div className="bg-[#0f172a]/20 rounded-[2rem] p-8 md:p-10 border border-white/5 backdrop-blur-md space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] font-bold">Onboarding Process</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-blue-400 text-xs shrink-0 mt-0.5">
                        01
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Pre-Audit Analysis</h4>
                        <p className="text-zinc-500 text-xs font-light leading-relaxed mt-1">
                          I will scrape your domain, analyze current keyword gaps, and map out the exact structural bottlenecks within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-blue-400 text-xs shrink-0 mt-0.5">
                        02
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Discovery Call Alignment</h4>
                        <p className="text-zinc-500 text-xs font-light leading-relaxed mt-1">
                          We will hold a tactical 30-minute session to isolate operational growth levers. Zero pushy pitches—purely alignment and logic.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-blue-400 text-xs shrink-0 mt-0.5">
                        03
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Blueprint Delivery</h4>
                        <p className="text-zinc-500 text-xs font-light leading-relaxed mt-1">
                          If aligned, I present your modular automation stack and strategic keyword plan to hit your 6-month organic goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking Embed/Link Callouts */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/portfolio"
                  className="w-full sm:w-auto px-8 py-4.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  Explore Systems Case Studies
                  <ChevronRight size={14} />
                </Link>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/10 text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  Book Discovery Session
                  <Calendar size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
