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
  Link as LinkIcon
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
  { id: 'content', label: 'Content Production', icon: MessageSquare, desc: 'We cannot produce enough high-quality content.' },
  { id: 'seo', label: 'SEO Rankings', icon: Globe, desc: 'We are publishing, but not ranking or getting traffic.' },
  { id: 'workflows', label: 'Manual Workflows', icon: Workflow, desc: 'Our team is drowning in repetitive tasks.' },
  { id: 'leads', label: 'Lead Nurturing', icon: Target, desc: 'Leads are falling through the cracks.' },
  { id: 'other', label: 'Other', icon: Zap, desc: 'Something else is holding us back.' }
];

const BUDGET_OPTIONS = [
  '< $1,000 / mo',
  '$1,000 - $3,000 / mo',
  '$3,000 - $5,000 / mo',
  '$5,000+ / mo'
];

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
          className="h-full bg-brand-gradient"
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
        selected ? 'bg-white/10 text-deep-space-blue-400' : 'bg-zinc-50 text-zinc-400 group-hover:text-brand-gradient'
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
          <CheckCircle2 size={20} className="text-deep-space-blue-400" />
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
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <SEO 
        title="Contact Emmanuel Odebiyi | Book a Free Marketing Automation Strategy Call"
        description="Book a free 30-minute call to discuss automating your content marketing and SEO. No pitch — just honest conversation and a clear path forward. Response within 24 hours."
        keywords="marketing automation consultation, content automation expert, SEO specialist hire, book strategy call"
      />
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
                  <Sparkles size={12} className="text-brand-gradient" />
                  Work With Me
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
                  Let's build something{' '}
                  <span className="text-zinc-300">that actually works.</span>
                </h1>
                <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
                  This isn't a standard contact form. It's the start of a conversation about your growth.
                </p>
              </div>

              <ProgressIndicator currentStep={step as number} totalSteps={4} />

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
                        <h2 className="text-3xl font-bold text-zinc-900">The Problem</h2>
                        <p className="text-zinc-500 font-light">What is the primary bottleneck in your business right now?</p>
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
                            <div className="space-y-2 max-w-2xl mx-auto pt-4">
                              <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={14} className="text-zinc-400" /> Please specify
                              </label>
                              <textarea 
                                placeholder="Briefly describe what's holding you back..."
                                value={formData.customBottleneck}
                                onChange={(e) => setFormData({ ...formData, customBottleneck: e.target.value })}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all min-h-[100px] resize-none"
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
                        <h2 className="text-3xl font-bold text-zinc-900">The Vision</h2>
                        <p className="text-zinc-500 font-light">What does success look like in 6 months?</p>
                      </div>
                      <div className="max-w-2xl mx-auto space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Target size={14} className="text-zinc-400" /> Your Goal
                          </label>
                          <textarea 
                            placeholder="e.g., We want to double our organic traffic, and reduce manual reporting hours by 10 hours a week..."
                            value={formData.successVision}
                            onChange={(e) => setFormData({ ...formData, successVision: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all min-h-[180px] resize-none"
                          />
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
                        <h2 className="text-3xl font-bold text-zinc-900">Readiness</h2>
                        <p className="text-zinc-500 font-light">Current Monthly Marketing Budget</p>
                      </div>
                      <div className="max-w-md mx-auto space-y-8">
                        <div className="grid grid-cols-1 gap-3">
                          {BUDGET_OPTIONS.map((b) => (
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
                        <h2 className="text-3xl font-bold text-zinc-900">Contact Details.</h2>
                        <p className="text-zinc-500 font-light">Where should I send my initial thoughts?</p>
                      </div>
                      <div className="max-w-md mx-auto space-y-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-1">
                            <User size={14} className="text-zinc-400" /> Full Name
                          </label>
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-1">
                            <Mail size={14} className="text-zinc-400" /> Work Email
                          </label>
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-1">
                            <LinkIcon size={14} className="text-zinc-400" /> Company URL
                          </label>
                          <input 
                            required
                            type="url"
                            placeholder="https://yourcompany.com"
                            value={formData.companyUrl}
                            onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
                          />
                        </div>
                        {submitError && (
                          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                            {submitError}
                          </div>
                        )}
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
                
                {step < 4 ? (
                  <button 
                    disabled={!isStepValid()}
                    onClick={nextStep}
                    className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-zinc-900"
                  >
                    Next Step
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button 
                    disabled={!isStepValid() || loading}
                    onClick={handleSubmit}
                    className="px-10 py-5 bg-brand-gradient text-zinc-900 font-bold rounded-2xl hover:bg-deep-space-blue-400 transition-all flex items-center gap-2 shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && <ArrowRight size={20} />}
                  </button>
                )}
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12 py-10"
            >
              <div className="w-24 h-24 rounded-[2.5rem] bg-deep-space-blue-50 text-brand-gradient flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/10">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-bold text-zinc-900 tracking-tight">Got it, {formData.name.split(' ')[0]}.</h2>
                <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
                  I'll personally review your details. Here is how we move forward:
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto text-left">
                <div className="bg-zinc-50 rounded-[2rem] p-10 border border-zinc-100 space-y-8">
                  <h3 className="text-xl font-bold text-zinc-900 font-mono tracking-tight uppercase">How It Works</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-zinc-900 shrink-0 border border-zinc-200 text-sm">1</div>
                      <p className="text-zinc-600 text-lg pt-1"><strong className="text-zinc-900">Review:</strong> I look at your details to ensure we are a good fit for each other.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-zinc-900 shrink-0 border border-zinc-200 text-sm">2</div>
                      <p className="text-zinc-600 text-lg pt-1"><strong className="text-zinc-900">Discovery Call:</strong> We jump on a 30-minute discovery call (no sales pitch, just strategy and identifying levers).</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-zinc-900 shrink-0 border border-zinc-200 text-sm">3</div>
                      <p className="text-zinc-600 text-lg pt-1"><strong className="text-zinc-900">The Blueprint:</strong> If it makes sense, I build your custom automated growth blueprint.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  to="/portfolio"
                  className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
                >
                  View Case Studies
                  <ChevronRight size={20} />
                </Link>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-zinc-900 border border-zinc-200 font-bold rounded-2xl hover:bg-zinc-50 transition-all flex items-center gap-2"
                >
                  Book a Discovery Call Now
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
