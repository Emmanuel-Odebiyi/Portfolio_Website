import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Target, 
  MessageSquare, 
  Mail, 
  User, 
  Calendar, 
  DollarSign,
  ChevronRight,
  Sparkles,
  Clock,
  Workflow,
  Link as LinkIcon,
  Check,
  Building,
  Copy,
  ExternalLink,
  ShieldCheck,
  Send,
  CalendarCheck,
  Linkedin,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

type BlueprintStep = 1 | 2 | 3 | 4;
type FormMode = 'quick' | 'blueprint';

interface QuickFormData {
  name: string;
  email: string;
  companyUrl: string;
  message: string;
}

interface BlueprintFormData {
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
    desc: 'Struggling to produce high-value technical and editorial content consistently.',
    badge: 'Velocity Gap'
  },
  { 
    id: 'seo', 
    label: 'SEO & Organic Growth', 
    icon: Globe, 
    desc: 'Publishing articles regularly but failing to rank or capture high-intent buyers.',
    badge: 'Visibility Gap'
  },
  { 
    id: 'workflows', 
    label: 'Manual Operations', 
    icon: Workflow, 
    desc: 'Team spending dozens of hours weekly on manual drafting, CMS entry, and formatting.',
    badge: 'Efficiency Gap'
  },
  { 
    id: 'leads', 
    label: 'Lead Capture & Nurture', 
    icon: Target, 
    desc: 'Organic traffic exists, but visitors leave without converting into qualified sales pipeline.',
    badge: 'Conversion Gap'
  },
  { 
    id: 'other', 
    label: 'Custom Architecture', 
    icon: Zap, 
    desc: 'A distinct operational challenge or bespoke pipeline requirement.',
    badge: 'Custom Stack'
  }
];

const BUDGET_OPTIONS = [
  {
    range: '< $1,000 / mo',
    scope: 'Foundation Scope',
    details: 'Focused on workflow mapping, content audits, and SEO baseline setup.'
  },
  {
    range: '$1,000 - $3,000 / mo',
    scope: 'Accelerator Flow',
    details: 'Automated content pipeline buildout, keyword targeting, and monthly high-intent output.'
  },
  {
    range: '$3,000 - $5,000 / mo',
    scope: 'Omnichannel Scale',
    details: 'Full-scale automated distribution engine, deep SEO optimization, and workflow integrations.'
  },
  {
    range: '$5,000+ / mo',
    scope: 'Enterprise Core',
    details: 'Custom AI-driven content systems, dedicated pipeline management, and complete operational governance.'
  }
];

const CALENDLY_URL = 'https://calendly.com/emmanuelodebiyi';
const DIRECT_EMAIL = 'emmanuel@emmanuel.name.ng';

export default function Contact() {
  const [formMode, setFormMode] = useState<FormMode>('quick');
  const [blueprintStep, setBlueprintStep] = useState<BlueprintStep>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [lagosTime, setLagosTime] = useState<string>('');

  // Live Lagos (WAT, GMT+1) clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setLagosTime(formatter.format(new Date()));
      } catch {
        setLagosTime('10:00 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy email handler
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DIRECT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      // Fallback
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    }
  };

  // Quick form state
  const {
    register: registerQuick,
    handleSubmit: handleSubmitQuick,
    formState: { errors: quickErrors, isValid: isQuickValid },
    reset: resetQuick,
  } = useForm<QuickFormData>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', companyUrl: '', message: '' }
  });

  // Blueprint form state
  const [blueprintData, setBlueprintData] = useState<BlueprintFormData>({
    bottleneck: '',
    customBottleneck: '',
    successVision: '',
    budget: '',
    name: '',
    email: '',
    companyUrl: '',
  });

  const {
    register: registerBlueprintStep4,
    handleSubmit: handleSubmitBlueprintStep4,
    formState: { errors: blueprintStep4Errors, isValid: isBlueprintStep4Valid },
    reset: resetBlueprintStep4,
  } = useForm<{ name: string; email: string; companyUrl: string }>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', companyUrl: '' }
  });

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreywnvb';

  // Handle Quick Inquiry Submit
  const onQuickSubmit = handleSubmitQuick(async (data) => {
    setLoading(true);
    setSubmitError(null);
    const payload = {
      inquiryType: 'Quick Inquiry',
      name: data.name,
      email: data.email,
      companyUrl: data.companyUrl,
      message: data.message,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSubmittedName(data.name);
        setIsSuccess(true);
        resetQuick();
      } else {
        const resData = await response.json().catch(() => null);
        setSubmitError(resData?.errors?.[0]?.message || 'Submission failed. Please email directly or try again.');
      }
    } catch {
      setSubmitError('Network connection issue. Please email emmanuel@emmanuel.name.ng directly.');
    } finally {
      setLoading(false);
    }
  });

  // Blueprint Step Navigation
  const isBlueprintCurrentStepValid = () => {
    switch (blueprintStep) {
      case 1:
        return !!blueprintData.bottleneck && (blueprintData.bottleneck !== 'other' || !!blueprintData.customBottleneck);
      case 2:
        return !!blueprintData.successVision && blueprintData.successVision.trim().length > 5;
      case 3:
        return !!blueprintData.budget;
      case 4:
        return isBlueprintStep4Valid;
      default:
        return true;
    }
  };

  const nextBlueprintStep = () => {
    if (!isBlueprintCurrentStepValid()) {
      if (blueprintStep === 1) {
        setSubmitError(blueprintData.bottleneck === 'other' && !blueprintData.customBottleneck 
          ? 'Please describe your custom challenge before proceeding.' 
          : 'Please select a core bottleneck to proceed.');
      } else if (blueprintStep === 2) {
        setSubmitError('Please summarize your target 6-month outcomes.');
      } else if (blueprintStep === 3) {
        setSubmitError('Please choose an estimated monthly investment range.');
      }
      return;
    }
    setSubmitError(null);
    setBlueprintStep((prev) => (prev + 1) as BlueprintStep);
  };

  const prevBlueprintStep = () => {
    setSubmitError(null);
    setBlueprintStep((prev) => (prev - 1) as BlueprintStep);
  };

  // Handle Blueprint Form Submit
  const onBlueprintSubmit = handleSubmitBlueprintStep4(async (step4Data) => {
    setLoading(true);
    setSubmitError(null);
    const payload = {
      inquiryType: 'Project Blueprint',
      bottleneck: blueprintData.bottleneck,
      customBottleneck: blueprintData.customBottleneck,
      successVision: blueprintData.successVision,
      budget: blueprintData.budget,
      name: step4Data.name,
      email: step4Data.email,
      companyUrl: step4Data.companyUrl,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSubmittedName(step4Data.name);
        setIsSuccess(true);
        resetBlueprintStep4();
      } else {
        const resData = await response.json().catch(() => null);
        setSubmitError(resData?.errors?.[0]?.message || 'Submission failed. Please email directly or try again.');
      }
    } catch {
      setSubmitError('Network connection issue. Please email emmanuel@emmanuel.name.ng directly.');
    } finally {
      setLoading(false);
    }
  });

  const handleResetForm = () => {
    setIsSuccess(false);
    setSubmittedName('');
    setSubmitError(null);
    setBlueprintStep(1);
    setBlueprintData({
      bottleneck: '',
      customBottleneck: '',
      successVision: '',
      budget: '',
      name: '',
      email: '',
      companyUrl: '',
    });
  };

  return (
    <div className="pt-32 pb-24 bg-[var(--bg-page)] text-[var(--text-body)] min-h-screen relative overflow-x-clip transition-colors duration-300">
      <SEO 
        title="Direct Contact & Project Ingestion | Emmanuel Odebiyi"
        description="Connect with Emmanuel Odebiyi, Content Marketing Strategist & Marketing Automation Specialist. Schedule a 30-minute discovery session or submit your project scope."
        keywords="contact emmanuel odebiyi, hire marketing automation consultant, B2B SaaS content strategist, content automation Lagos"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="space-y-4 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div 
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-card)', 
              color: 'var(--text-muted)' 
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold" style={{ color: 'var(--text-body)' }}>Open for Partnerships & Advisory</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
            Let's Build Something <span className="text-amber-gradient italic">That Actually Scales</span>
          </h1>

          <p className="text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Direct communication channel for B2B founders, growth leaders, and editorial teams. Choose between a rapid message or a structured project scope.
          </p>
        </div>

        {/* Editorial Split Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ═══════════════════════════════════════════
               LEFT COLUMN: EXECUTIVE CONSOLE & CHANNELS
             ═══════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div 
              className="p-7 rounded-2xl border space-y-5 transition-all relative overflow-hidden"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center border"
                    style={{ 
                      backgroundColor: 'color-mix(in srgb, var(--accent-amber) 12%, transparent)', 
                      borderColor: 'color-mix(in srgb, var(--accent-amber) 25%, transparent)', 
                      color: 'var(--accent-amber)' 
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent-amber)' }}>
                      Direct Channel
                    </span>
                    <h2 className="text-base font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                      Executive Inbox
                    </h2>
                  </div>
                </div>

                <a 
                  href={`mailto:${DIRECT_EMAIL}`}
                  className="text-xs font-mono font-semibold flex items-center gap-1 transition-colors hover:brightness-125"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  Email <ExternalLink size={12} />
                </a>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center justify-between gap-3 font-mono text-xs"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <span className="truncate select-all font-medium" style={{ color: 'var(--text-body)' }}>
                  {DIRECT_EMAIL}
                </span>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 cursor-pointer transition-all hover:brightness-110 active:scale-95"
                  style={{ 
                    backgroundColor: emailCopied ? 'color-mix(in srgb, var(--accent-amber) 20%, transparent)' : 'var(--bg-surface-alt)', 
                    borderColor: emailCopied ? 'var(--accent-amber)' : 'var(--border-card)',
                    color: emailCopied ? 'var(--accent-amber)' : 'var(--text-muted)'
                  }}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {emailCopied ? (
                    <>
                      <Check size={13} strokeWidth={2.5} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Response commitment: usually replied to within 24 business hours. No promotional fluff or automated cold follow-up chains.
              </p>
            </div>

            {/* Live Operational Status & Timezone */}
            <div 
              className="p-7 rounded-2xl border space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2" style={{ color: 'var(--accent-amber)' }}>
                  <Clock size={13} /> Operational Telemetry
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div 
                  className="p-4 rounded-xl border space-y-1"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Lagos Local Time
                  </span>
                  <span className="text-lg font-bold font-mono tracking-tight block" style={{ color: 'var(--text-body)' }}>
                    {lagosTime || '10:00 AM'}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    WAT (GMT+1)
                  </span>
                </div>

                <div 
                  className="p-4 rounded-xl border space-y-1"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                    Working Hours
                  </span>
                  <span className="text-sm font-bold font-sans block" style={{ color: 'var(--text-body)' }}>
                    Mon to Fri
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    09:00 to 18:00 WAT
                  </span>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center gap-3 text-xs"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <ShieldCheck size={18} className="shrink-0 text-emerald-400" />
                <span className="font-light" style={{ color: 'var(--text-muted)' }}>
                  Active client capacity: <strong style={{ color: 'var(--text-body)' }}>2 retainer slots</strong> available for upcoming sprints.
                </span>
              </div>
            </div>

            {/* Direct Discovery Scheduling Card */}
            <div 
              className="p-7 rounded-2xl border space-y-4"
              style={{ 
                backgroundColor: 'var(--bg-surface)', 
                borderColor: 'var(--border-card)'
              }}
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2" style={{ color: 'var(--accent-amber)' }}>
                  <CalendarCheck size={13} /> Direct Video Alignment
                </span>
                <h3 className="text-base font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                  Prefer a 30-Minute Tactical Call?
                </h3>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Book directly on my calendar. We isolate operational bottlenecks and map whether automated content pipelines fit your current growth stage. Zero sales pressure.
                </p>
              </div>

              <a 
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta w-full py-3.5 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                Schedule Discovery Session
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Verification & Proof Links */}
            <div 
              className="p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <Link 
                to="/portfolio" 
                className="flex items-center gap-1.5 transition-colors hover:brightness-125"
                style={{ color: 'var(--text-muted)' }}
              >
                <Workflow size={13} />
                <span>Systems Case Studies</span>
              </Link>
              <span style={{ color: 'var(--border-card)' }}>|</span>
              <Link 
                to="/writing-portfolio" 
                className="flex items-center gap-1.5 transition-colors hover:brightness-125"
                style={{ color: 'var(--text-muted)' }}
              >
                <FileText size={13} />
                <span>Editorial Samples</span>
              </Link>
              <span style={{ color: 'var(--border-card)' }}>|</span>
              <a 
                href="https://linkedin.com/in/emmanuel-odebiyi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:brightness-125"
                style={{ color: 'var(--text-muted)' }}
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* ═══════════════════════════════════════════
               RIGHT COLUMN: INTERACTIVE INGESTION FORM
             ═══════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            
            <div 
              className="rounded-2xl border p-7 md:p-10 transition-all backdrop-blur-md relative overflow-hidden"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* Mode Toggle Switcher */}
                    <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: 'var(--border-card)' }}>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block" style={{ color: 'var(--accent-amber)' }}>
                          Step 1 of Consultation
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold font-sans mt-1" style={{ color: 'var(--text-body)' }}>
                          {formMode === 'quick' ? 'Send a Direct Message' : 'Build Your Project Blueprint'}
                        </h2>
                      </div>

                      <div 
                        className="inline-flex p-1 rounded-xl border shrink-0 text-xs font-mono"
                        style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                        role="tablist"
                        aria-label="Inquiry format selection"
                      >
                        <button
                          type="button"
                          role="tab"
                          aria-selected={formMode === 'quick'}
                          onClick={() => {
                            setFormMode('quick');
                            setSubmitError(null);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                            formMode === 'quick'
                              ? 'shadow-sm'
                              : 'border-transparent hover:text-[var(--text-body)]'
                          }`}
                          style={formMode === 'quick' ? {
                            backgroundColor: 'var(--bg-surface-alt)',
                            color: 'var(--accent-amber)',
                            borderColor: 'color-mix(in srgb, var(--accent-amber) 35%, transparent)'
                          } : {
                            color: 'var(--text-muted)'
                          }}
                        >
                          Quick Note
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={formMode === 'blueprint'}
                          onClick={() => {
                            setFormMode('blueprint');
                            setSubmitError(null);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                            formMode === 'blueprint'
                              ? 'shadow-sm'
                              : 'border-transparent hover:text-[var(--text-body)]'
                          }`}
                          style={formMode === 'blueprint' ? {
                            backgroundColor: 'var(--bg-surface-alt)',
                            color: 'var(--accent-amber)',
                            borderColor: 'color-mix(in srgb, var(--accent-amber) 35%, transparent)'
                          } : {
                            color: 'var(--text-muted)'
                          }}
                        >
                          Project Scope
                        </button>
                      </div>
                    </div>

                    {/* ─────────────────────────────────────────
                         MODE A: QUICK INQUIRY FORM
                       ───────────────────────────────────────── */}
                    {formMode === 'quick' && (
                      <form onSubmit={onQuickSubmit} className="space-y-6">
                        <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          Drop a note with your core question, project overview, or general inquiry. You will receive a direct reply within 24 business hours.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Name */}
                          <div className="space-y-2 col-span-1">
                            <label htmlFor="quickName" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                              <User size={12} /> Full Name
                            </label>
                            <input 
                              id="quickName"
                              type="text"
                              placeholder="E.g., Sarah Mitchell"
                              autoComplete="name"
                              {...registerQuick('name', { required: 'Name is required' })}
                              className={`w-full border rounded-xl px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-sm ${quickErrors.name ? 'border-red-500/50' : ''}`}
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                            {quickErrors.name && (
                              <p className="text-[10px] text-red-400 font-mono">{quickErrors.name.message}</p>
                            )}
                          </div>

                          {/* Email */}
                          <div className="space-y-2 col-span-1">
                            <label htmlFor="quickEmail" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                              <Mail size={12} /> Work Email
                            </label>
                            <input 
                              id="quickEmail"
                              type="email"
                              placeholder="E.g., sarah@company.com"
                              autoComplete="email"
                              {...registerQuick('email', { 
                                required: 'Work email is required',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid work email' }
                              })}
                              className={`w-full border rounded-xl px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-sm ${quickErrors.email ? 'border-red-500/50' : ''}`}
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                            {quickErrors.email && (
                              <p className="text-[10px] text-red-400 font-mono">{quickErrors.email.message}</p>
                            )}
                          </div>

                          {/* Company URL */}
                          <div className="space-y-2 md:col-span-2">
                            <label htmlFor="quickCompany" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                              <Building size={12} /> Company Website or Profile
                            </label>
                            <input 
                              id="quickCompany"
                              type="text"
                              placeholder="E.g., https://acme.io"
                              autoComplete="url"
                              {...registerQuick('companyUrl', { required: 'Company URL is required' })}
                              className={`w-full border rounded-xl px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-sm ${quickErrors.companyUrl ? 'border-red-500/50' : ''}`}
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                            {quickErrors.companyUrl && (
                              <p className="text-[10px] text-red-400 font-mono">{quickErrors.companyUrl.message}</p>
                            )}
                          </div>

                          {/* Message */}
                          <div className="space-y-2 md:col-span-2">
                            <label htmlFor="quickMessage" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                              <MessageSquare size={12} /> Message or Project Brief
                            </label>
                            <textarea 
                              id="quickMessage"
                              rows={4}
                              placeholder="Tell me briefly about what you are building, your primary bottleneck, or how we might collaborate..."
                              {...registerQuick('message', { 
                                required: 'Please include a brief message',
                                minLength: { value: 10, message: 'Message should be at least 10 characters' }
                              })}
                              className={`w-full border rounded-xl px-4 py-3 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 transition-all text-sm resize-none ${quickErrors.message ? 'border-red-500/50' : ''}`}
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                            />
                            {quickErrors.message && (
                              <p className="text-[10px] text-red-400 font-mono">{quickErrors.message.message}</p>
                            )}
                          </div>
                        </div>

                        {submitError && (
                          <div className="p-3.5 rounded-xl text-xs font-mono text-center border" style={{ backgroundColor: 'color-mix(in srgb, var(--danger) 10%, transparent)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                            {submitError}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                            Direct transmission to Emmanuel
                          </span>

                          <button
                            type="submit"
                            disabled={loading || !isQuickValid}
                            className={`btn-cta px-7 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer transition-all ${
                              loading || !isQuickValid ? 'opacity-55 cursor-not-allowed' : ''
                            }`}
                          >
                            {loading ? (
                              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>Send Message</span>
                                <Send size={13} />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ─────────────────────────────────────────
                         MODE B: PROJECT BLUEPRINT WIZARD
                       ───────────────────────────────────────── */}
                    {formMode === 'blueprint' && (
                      <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-1.5">
                              <Sparkles size={11} className="text-[var(--accent-amber)]" />
                              Phase {blueprintStep} of 4: {
                                blueprintStep === 1 ? 'Identify Bottleneck' :
                                blueprintStep === 2 ? '6-Month Vision' :
                                blueprintStep === 3 ? 'Investment Scope' : 'Direct Contacts'
                              }
                            </span>
                            <span className="font-bold" style={{ color: 'var(--accent-amber)' }}>
                              {(blueprintStep / 4) * 100}% Configured
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full overflow-hidden border p-[1px]" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: 'var(--accent-amber)' }}
                              initial={false}
                              animate={{ width: `${(blueprintStep / 4) * 100}%` }}
                              transition={{ duration: 0.35, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Step 1: Bottlenecks */}
                        {blueprintStep === 1 && (
                          <div className="space-y-4 text-left">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                                What is your main operational bottleneck?
                              </h3>
                              <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
                                Select the core operational friction slowing down your growth:
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {BOTTLENECK_OPTIONS.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = blueprintData.bottleneck === opt.id;
                                return (
                                  <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => {
                                      setSubmitError(null);
                                      setBlueprintData({ ...blueprintData, bottleneck: opt.id });
                                    }}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative ${
                                      isSelected
                                        ? 'bg-[var(--bg-surface-alt)] border-[var(--accent-amber)] text-[var(--text-body)] shadow-md'
                                        : 'bg-[var(--bg-page)] border-[var(--border-card)] hover:border-[var(--accent-amber)]/40 text-[var(--text-muted)] hover:text-[var(--text-body)]'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                        isSelected ? 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)]' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                                      }`}>
                                        <Icon size={16} />
                                      </div>
                                      <div className="space-y-1 flex-1 pr-2">
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-xs" style={{ color: 'var(--text-body)' }}>{opt.label}</span>
                                          <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                            isSelected ? 'border-[var(--accent-amber)]/40 bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]' : 'border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-muted)]'
                                          }`}>
                                            {opt.badge}
                                          </span>
                                        </div>
                                        <p className="text-[11px] font-light leading-relaxed">
                                          {opt.desc}
                                        </p>
                                      </div>
                                      <div className="shrink-0 mt-0.5">
                                        {isSelected ? (
                                          <div className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent-amber)' }}>
                                            <Check size={10} strokeWidth={3} />
                                          </div>
                                        ) : (
                                          <div className="w-4 h-4 rounded-full border" style={{ borderColor: 'var(--border-card)' }} />
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {blueprintData.bottleneck === 'other' && (
                              <div className="pt-2 space-y-1.5">
                                <label htmlFor="customBottleneck" className="text-[10px] font-mono uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>
                                  Specify your custom challenge
                                </label>
                                <textarea
                                  id="customBottleneck"
                                  rows={3}
                                  placeholder="Describe the operational challenge holding your pipeline back..."
                                  value={blueprintData.customBottleneck}
                                  onChange={(e) => setBlueprintData({ ...blueprintData, customBottleneck: e.target.value })}
                                  className="w-full border rounded-xl p-3 text-xs placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 resize-none"
                                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Step 2: 6-Month Vision */}
                        {blueprintStep === 2 && (
                          <div className="space-y-4 text-left">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                                Target 6-Month Outcomes & Vision
                              </h3>
                              <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
                                What does operational success look like 180 days from now?
                              </p>
                            </div>

                            <div className="space-y-2 pt-1">
                              <label htmlFor="successVision" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                                <Target size={12} /> Desired KPIs & Milestones
                              </label>
                              <textarea
                                id="successVision"
                                rows={5}
                                placeholder="E.g., We want to publish 4 high-authority B2B articles weekly, rank top-10 for target commercial keywords, and automate syndication directly to LinkedIn and our newsletter..."
                                value={blueprintData.successVision}
                                onChange={(e) => setBlueprintData({ ...blueprintData, successVision: e.target.value })}
                                className="w-full border rounded-xl p-4 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 resize-none leading-relaxed"
                                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Step 3: Budget Range */}
                        {blueprintStep === 3 && (
                          <div className="space-y-4 text-left">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                                Estimated Monthly Investment
                              </h3>
                              <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
                                Select the scope tier that aligns with your operational budget:
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {BUDGET_OPTIONS.map((opt) => {
                                const isSelected = blueprintData.budget === opt.range;
                                return (
                                  <button
                                    key={opt.range}
                                    type="button"
                                    onClick={() => {
                                      setSubmitError(null);
                                      setBlueprintData({ ...blueprintData, budget: opt.range });
                                    }}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'bg-[var(--bg-surface-alt)] border-[var(--accent-amber)] text-[var(--text-body)] shadow-md'
                                        : 'bg-[var(--bg-page)] border-[var(--border-card)] hover:border-[var(--accent-amber)]/40 text-[var(--text-muted)] hover:text-[var(--text-body)]'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                        isSelected ? 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)]' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                                      }`}>
                                        <DollarSign size={16} />
                                      </div>
                                      <div className="space-y-1 flex-1 pr-2">
                                        <p className="font-bold text-xs" style={{ color: 'var(--text-body)' }}>{opt.range}</p>
                                        <p className={`text-[9px] font-mono uppercase tracking-widest ${isSelected ? 'text-[var(--accent-amber)]' : 'text-[var(--text-muted)]'}`}>
                                          {opt.scope}
                                        </p>
                                        <p className="text-[11px] font-light leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
                                          {opt.details}
                                        </p>
                                      </div>
                                      <div className="shrink-0 mt-0.5">
                                        {isSelected ? (
                                          <div className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent-amber)' }}>
                                            <Check size={10} strokeWidth={3} />
                                          </div>
                                        ) : (
                                          <div className="w-4 h-4 rounded-full border" style={{ borderColor: 'var(--border-card)' }} />
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Step 4: Contact & Final Review */}
                        {blueprintStep === 4 && (
                          <div className="space-y-4 text-left">
                            <div className="space-y-1">
                              <h3 className="text-lg font-bold font-sans" style={{ color: 'var(--text-body)' }}>
                                Where should I send your strategic blueprint?
                              </h3>
                              <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
                                Add your verified contact details so I can audit your current domain before following up:
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                              <div className="space-y-1.5 col-span-1">
                                <label htmlFor="bpName" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                                  <User size={12} /> Full Name
                                </label>
                                <input
                                  id="bpName"
                                  type="text"
                                  placeholder="E.g., David Chen"
                                  autoComplete="name"
                                  {...registerBlueprintStep4('name', { required: 'Name is required' })}
                                  className={`w-full border rounded-xl px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 ${blueprintStep4Errors.name ? 'border-red-500/50' : ''}`}
                                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                                />
                                {blueprintStep4Errors.name && (
                                  <p className="text-[10px] text-red-400 font-mono">{blueprintStep4Errors.name.message}</p>
                                )}
                              </div>

                              <div className="space-y-1.5 col-span-1">
                                <label htmlFor="bpEmail" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                                  <Mail size={12} /> Business Email
                                </label>
                                <input
                                  id="bpEmail"
                                  type="email"
                                  placeholder="E.g., david@company.com"
                                  autoComplete="email"
                                  {...registerBlueprintStep4('email', { 
                                    required: 'Email is required',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                                  })}
                                  className={`w-full border rounded-xl px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 ${blueprintStep4Errors.email ? 'border-red-500/50' : ''}`}
                                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                                />
                                {blueprintStep4Errors.email && (
                                  <p className="text-[10px] text-red-400 font-mono">{blueprintStep4Errors.email.message}</p>
                                )}
                              </div>

                              <div className="space-y-1.5 md:col-span-2">
                                <label htmlFor="bpCompany" className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--accent-amber)' }}>
                                  <Building size={12} /> Company Domain or Product URL
                                </label>
                                <input
                                  id="bpCompany"
                                  type="text"
                                  placeholder="E.g., https://acmesoftware.com"
                                  autoComplete="url"
                                  {...registerBlueprintStep4('companyUrl', { required: 'Company URL is required' })}
                                  className={`w-full border rounded-xl px-4 py-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-amber)]/30 ${blueprintStep4Errors.companyUrl ? 'border-red-500/50' : ''}`}
                                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                                />
                                {blueprintStep4Errors.companyUrl && (
                                  <p className="text-[10px] text-red-400 font-mono">{blueprintStep4Errors.companyUrl.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {submitError && (
                          <div className="p-3.5 rounded-xl text-xs font-mono text-center border" style={{ backgroundColor: 'color-mix(in srgb, var(--danger) 10%, transparent)', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                            {submitError}
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                          {blueprintStep > 1 ? (
                            <button
                              type="button"
                              onClick={prevBlueprintStep}
                              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer hover:brightness-125"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              <ArrowLeft size={14} /> Back
                            </button>
                          ) : (
                            <div />
                          )}

                          {blueprintStep < 4 ? (
                            <button
                              type="button"
                              onClick={nextBlueprintStep}
                              className="px-6 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:brightness-110 ml-auto"
                              style={{ 
                                backgroundColor: 'var(--bg-surface-alt)', 
                                borderColor: 'var(--border-card)', 
                                color: 'var(--text-body)' 
                              }}
                            >
                              Next Phase
                              <ArrowRight size={14} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={loading || !isBlueprintStep4Valid}
                              onClick={onBlueprintSubmit}
                              className={`btn-cta px-7 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 cursor-pointer transition-all ml-auto ${
                                loading || !isBlueprintStep4Valid ? 'opacity-55 cursor-not-allowed' : ''
                              }`}
                            >
                              {loading ? (
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <span>Submit Project Blueprint</span>
                                  <Send size={13} />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* ─────────────────────────────────────────
                       SUCCESS STATE
                     ───────────────────────────────────────── */
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 py-4"
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border"
                      style={{ 
                        backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)',
                        borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)',
                        color: 'var(--accent-amber)'
                      }}
                    >
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent-amber)' }}>
                        Inquiry Received
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                        Thank you{submittedName ? `, ${submittedName.split(' ')[0]}` : ''}. I have your notes.
                      </h2>
                      <p className="text-xs md:text-sm font-light max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Your details are queued for direct review. Here is what happens next:
                      </p>
                    </div>

                    {/* 3-Step Milestone Roadmap */}
                    <div 
                      className="text-left p-6 md:p-8 rounded-2xl border space-y-5"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                    >
                      <div className="flex items-start gap-3.5">
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border"
                          style={{ 
                            backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)', 
                            borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)',
                            color: 'var(--accent-amber)'
                          }}
                        >
                          01
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>Pre-Audit Analysis (24 Hours)</h4>
                          <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            I review your website, keyword gaps, and operational friction points to prepare strategic context.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border"
                          style={{ 
                            backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)', 
                            borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)',
                            color: 'var(--accent-amber)'
                          }}
                        >
                          02
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>Tactical Alignment Call</h4>
                          <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            We hold a focused 30-minute session to verify alignment. Pure operational logic with zero sales pressure.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border"
                          style={{ 
                            backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)', 
                            borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)',
                            color: 'var(--accent-amber)'
                          }}
                        >
                          03
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>Tailored Architecture Delivery</h4>
                          <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            If aligned, you receive a concrete content automation architecture and keyword roadmap.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a 
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cta w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                      >
                        <Calendar size={13} />
                        Book Tactical Call Now
                        <ExternalLink size={12} />
                      </a>

                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        style={{ 
                          backgroundColor: 'var(--bg-surface-alt)', 
                          borderColor: 'var(--border-card)', 
                          color: 'var(--text-body)' 
                        }}
                      >
                        Send Another Note
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
