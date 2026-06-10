import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1.5">
          <Sparkles size={11} className="text-[var(--accent-amber)] animate-pulse" />
          Blueprint Phase {currentStep} of {totalSteps}
        </span>
        <span className="font-bold" style={{ color: 'var(--accent-amber)' }}>{Math.round(progress)}% Configured</span>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden p-[1px] border" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--accent-amber)', boxShadow: '0 0 10px var(--btn-cta-shadow)' }}
        />
      </div>
    </div>
  );
};

const OptionCard = ({ selected, onClick, icon: Icon, label, desc, badge }: any) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-3xl border text-left transition-all duration-300 group relative overflow-hidden cursor-pointer ${
      selected 
        ? 'bg-[var(--bg-surface-alt)] border-[var(--accent-amber)] text-[var(--text-body)] shadow-xl shadow-[var(--accent-amber)]/5' 
        : 'bg-[var(--bg-surface)] border-[var(--border-card)] hover:border-[var(--accent-amber)]/45 text-[var(--text-body)] hover:bg-[var(--bg-surface-alt)]'
    }`}
  >
    {/* Dynamic Background Hover Accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-amber)]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="flex items-start gap-5 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)]' : 'bg-[var(--bg-page)] text-[var(--text-muted)] group-hover:text-[var(--accent-amber)]'
      }`}>
        <Icon size={22} />
      </div>
      <div className="space-y-1.5 flex-1 pr-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg" style={{ color: 'var(--text-body)' }}>{label}</span>
          <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
            selected ? 'border-[var(--accent-amber)]/30 bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]' : 'border-[var(--border-card)] bg-[var(--bg-page)] text-[var(--text-muted)]'
          }`}>
            {badge}
          </span>
        </div>
        <p className={`text-sm font-light leading-relaxed ${selected ? 'text-[var(--text-body)]/90' : 'text-[var(--text-muted)]'}`}>
          {desc}
        </p>
      </div>
      
      {/* Visual checked/unchecked indicator */}
      <div className="shrink-0 mt-1.5">
        {selected ? (
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent-amber)' }}>
            <Check size={11} strokeWidth={3} />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 transition-all group-hover:border-[var(--accent-amber)]" style={{ borderColor: 'var(--border-card)' }} />
        )}
      </div>
    </div>
  </button>
);

interface Step4Fields {
  name: string;
  email: string;
  companyUrl: string;
}

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

  // react-hook-form for Step 4 contact detail fields
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors: step4Errors, isValid: isStep4Valid },
    getValues: getStep4Values,
  } = useForm<Step4Fields>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', companyUrl: '' },
  });

  const nextStep = () => setStep((prev) => (prev as number + 1) as Step);
  const prevStep = () => setStep((prev) => (prev as number - 1) as Step);

  const handleSubmit = rhfHandleSubmit(async (step4Data) => {
    setLoading(true);
    setSubmitError(null);
    const payload = { ...formData, ...step4Data };
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreywnvb';
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setFormData((prev) => ({ ...prev, ...step4Data }));
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
  });

  const isStepValid = () => {
    switch(step) {
      case 1: return !!formData.bottleneck && (formData.bottleneck !== 'other' || !!formData.customBottleneck);
      case 2: return !!formData.successVision && formData.successVision.trim().length > 5;
      case 3: return !!formData.budget;
      case 4: return isStep4Valid;
      default: return true;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[var(--bg-page)] text-[var(--text-body)] min-h-screen relative overflow-hidden flex flex-col justify-center transition-colors duration-300">
      <SEO 
        title="Collaborate with Emmanuel Odebiyi | Contact"
        description="Initiate your organic scaling discussion. Analyze bottlenecks, outline target vision milestones, define budgets, and construct a bespoke technical pipeline."
        keywords="growth marketing automation, B2B organic lead strategies, n8n workflow consultant, Emmanuel Odebiyi"
      />
      
      {/* Background Glow Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[var(--cta-blue)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-[var(--accent-amber)]/5 blur-[120px] rounded-full pointer-events-none" />

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
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                >
                  <Sparkles size={11} className="text-[var(--accent-amber)] animate-pulse" />
                  Engineering Scale
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none font-display" style={{ color: 'var(--text-body)' }}>
                  Architect Your <span className="text-amber-gradient font-bold italic">Growth Engine</span>
                </h1>
                <p className="font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Let's dissect your bottlenecks and construct an automated operational blueprint built exclusively for your business.
                </p>
              </div>

              <ProgressIndicator currentStep={step as number} totalSteps={4} />

              {/* Central Wizard Window */}
              <div className="min-h-[380px] border rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md relative overflow-hidden flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
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
                        <h2 className="text-2xl font-bold font-sans" style={{ color: 'var(--text-body)' }}>Core Operational Bottleneck</h2>
                        <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                          Identify the main area holding your business back. <strong>Select one of the options below to begin:</strong>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent-amber)' }}>
                            Click an option below to select:
                          </span>
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
                              <label className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--accent-amber)' }}>
                                <MessageSquare size={12} /> Please specify your challenge
                              </label>
                              <textarea 
                                placeholder="Explain in detail what's holding you back..."
                                value={formData.customBottleneck}
                                onChange={(e) => setFormData({ ...formData, customBottleneck: e.target.value })}
                                className="w-full border rounded-2xl px-5 py-4 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all min-h-[100px] resize-none text-base"
                                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
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
                        <h2 className="text-2xl font-bold font-sans" style={{ color: 'var(--text-body)' }}>Target 6-Month Vision</h2>
                        <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>What does operational success and conversion scaling look like 180 days from today?</p>
                      </div>
                      
                      <div className="space-y-3.5 text-left">
                        <label className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--accent-amber)' }}>
                          <Target size={12} /> Desired Outcomes & Target KPIs
                        </label>
                        <textarea 
                          placeholder="e.g., We want to establish a content automation stack to publish twice weekly, rank top-10 for key industry terms, and automate leads distribution to Hubspot..."
                          value={formData.successVision}
                          onChange={(e) => setFormData({ ...formData, successVision: e.target.value })}
                          className="w-full border rounded-2xl px-6 py-5 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all min-h-[160px] resize-none text-base leading-relaxed"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
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
                        <h2 className="text-2xl font-bold font-sans" style={{ color: 'var(--text-body)' }}>Strategic Investment Range</h2>
                        <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                          Choose the monthly budget you are ready to invest. <strong>Select one budget tier below to proceed:</strong>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent-amber)' }}>
                            Click a budget tier below to select:
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {BUDGET_OPTIONS.map((opt) => (
                            <button
                              key={opt.range}
                              onClick={() => setFormData({ ...formData, budget: opt.range })}
                              className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                                formData.budget === opt.range 
                                  ? 'bg-[var(--bg-surface-alt)] border-[var(--accent-amber)] text-[var(--text-body)] shadow-xl' 
                                  : 'bg-[var(--bg-surface)] border-[var(--border-card)] hover:border-[var(--accent-amber)]/45 text-[var(--text-body)] hover:bg-[var(--bg-surface-alt)]'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  formData.budget === opt.range ? 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)]' : 'bg-[var(--bg-page)] text-[var(--text-muted)]'
                                }`}>
                                  <DollarSign size={18} />
                                </div>
                                <div className="space-y-1.5 flex-1 pr-4">
                                  <p className="font-bold text-base" style={{ color: 'var(--text-body)' }}>{opt.range}</p>
                                  <p className={`text-[10px] font-mono uppercase tracking-widest ${formData.budget === opt.range ? 'text-[var(--accent-amber)]' : 'text-[var(--text-muted)]'}`}>
                                    {opt.scope}
                                  </p>
                                  <p className="text-xs font-light leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
                                    {opt.details}
                                  </p>
                                </div>
                                <div className="shrink-0 mt-0.5">
                                  {formData.budget === opt.range ? (
                                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent-amber)' }}>
                                      <Check size={9} strokeWidth={3} />
                                    </div>
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 transition-all group-hover:border-[var(--accent-amber)]" style={{ borderColor: 'var(--border-card)' }} />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
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
                        <h2 className="text-2xl font-bold font-sans" style={{ color: 'var(--text-body)' }}>Blueprint Handoff Details</h2>
                        <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>Who should receive the initial review, audit points, and pipeline architecture recommendation?</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        
                        {/* Name Input */}
                        <div className="space-y-2 col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                            <User size={12} /> Full Name
                          </label>
                          <div className="relative group">
                            <input 
                              type="text"
                              placeholder="E.g., John Doe"
                              {...register('name', { required: 'Full name is required' })}
                              className={`w-full border rounded-2xl px-5 py-4 pl-12 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-base ${step4Errors.name ? 'border-red-500/50 focus:border-red-500/70' : 'border-[var(--border-card)]'}`}
                              style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}
                            />
                            <User size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} />
                          </div>
                          {step4Errors.name && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400 font-mono pl-1">
                              {step4Errors.name.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2 col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                            <Mail size={12} /> Business Email
                          </label>
                          <div className="relative group">
                            <input 
                              type="email"
                              placeholder="E.g., john@yourcompany.com"
                              {...register('email', {
                                required: 'Business email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' }
                              })}
                              className={`w-full border rounded-2xl px-5 py-4 pl-12 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-base ${step4Errors.email ? 'border-red-500/50 focus:border-red-500/70' : 'border-[var(--border-card)]'}`}
                              style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}
                            />
                            <Mail size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} />
                          </div>
                          {step4Errors.email && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400 font-mono pl-1">
                              {step4Errors.email.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Company URL Input */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                            <Building size={12} /> Company URL
                          </label>
                          <div className="relative group">
                            <input 
                              type="url"
                              placeholder="E.g., https://yourcompany.com"
                              {...register('companyUrl', {
                                required: 'Company URL is required',
                                pattern: { value: /^https?:\/\/.+/, message: 'Must start with https://' }
                              })}
                              className={`w-full border rounded-2xl px-5 py-4 pl-12 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-base ${step4Errors.companyUrl ? 'border-red-500/50 focus:border-red-500/70' : 'border-[var(--border-card)]'}`}
                              style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}
                            />
                            <LinkIcon size={16} className="absolute left-4.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} />
                          </div>
                          {step4Errors.companyUrl && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-400 font-mono pl-1">
                              {step4Errors.companyUrl.message}
                            </motion.p>
                          )}
                        </div>

                      </div>

                      {submitError && (
                        <div className="p-4 rounded-2xl text-xs font-mono text-center border" style={{ backgroundColor: 'color-mix(in srgb, var(--danger) 10%, transparent)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                          {submitError}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Navigation within Window */}
                <div className="flex items-center justify-between pt-8 mt-10 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  {step > 1 ? (
                    <button 
                      onClick={prevStep}
                      className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors font-bold cursor-pointer hover:brightness-110"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}
                  
                  {step < 4 ? (
                    <button 
                      disabled={!isStepValid()}
                      onClick={nextStep}
                      className="px-8 py-3.5 font-bold rounded-xl border transition-all flex items-center gap-2 disabled:opacity-30 font-mono text-xs uppercase tracking-widest ml-auto cursor-pointer hover:brightness-110"
                      style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      disabled={!isStepValid() || loading}
                      onClick={() => handleSubmit()}
                      className="btn-cta px-8 py-3.5 font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-30 font-mono text-xs uppercase tracking-widest ml-auto relative overflow-hidden cursor-pointer"
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
              <div className="relative w-24 h-24 mx-auto">
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'var(--accent-amber)' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center border"
                  style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)', 
                    borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)', 
                    color: 'var(--accent-amber)',
                    boxShadow: '0 20px 40px -10px var(--btn-cta-shadow)'
                  }}
                >
                  <CheckCircle2 size={40} />
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                  Configuration Logged, {formData.name.split(' ')[0]}.
                </h2>
                <p className="font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  I am already reviewing your operational profile and company sitemap. Here is exactly how we construct your roadmap:
                </p>
              </div>
              
              {/* Structured Success Roadmap */}
              <div className="max-w-2xl mx-auto text-left">
                <div className="rounded-[2rem] p-8 md:p-10 border backdrop-blur-md space-y-6" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <h3 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-amber)' }}>Onboarding Process</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--accent-amber) 20%, transparent)', color: 'var(--accent-amber)' }}>
                        01
                      </div>
                      <div>
                        <h4 className="text-sm font-bold animate-none" style={{ color: 'var(--text-body)' }}>Pre-Audit Analysis</h4>
                        <p className="text-xs font-light leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
                          I will scrape your domain, analyze current keyword gaps, and map out the exact structural bottlenecks within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--accent-amber) 20%, transparent)', color: 'var(--accent-amber)' }}>
                        02
                      </div>
                      <div>
                        <h4 className="text-sm font-bold animate-none" style={{ color: 'var(--text-body)' }}>Discovery Call Alignment</h4>
                        <p className="text-xs font-light leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
                          We will hold a tactical 30-minute session to isolate operational growth levers. Zero pushy pitches—purely alignment and logic.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--accent-amber) 20%, transparent)', color: 'var(--accent-amber)' }}>
                        03
                      </div>
                      <div>
                        <h4 className="text-sm font-bold animate-none" style={{ color: 'var(--text-body)' }}>Blueprint Delivery</h4>
                        <p className="text-xs font-light leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
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
                  className="w-full sm:w-auto px-8 py-4.5 rounded-2xl transition-all border text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 hover-glow-text"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  Explore Systems Case Studies
                  <ChevronRight size={14} />
                </Link>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-cta w-full sm:w-auto px-8 py-4.5 rounded-2xl text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2"
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
