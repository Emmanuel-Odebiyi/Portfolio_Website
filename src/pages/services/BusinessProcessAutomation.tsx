import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Cpu, CheckCircle2, Clock,
  Zap, Settings, Database, ChevronDown, Activity, RefreshCw
} from 'lucide-react';
import { SEO } from '../../components/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const WORKFLOW_STEPS = [
  { id: 1, label: 'Workflow Audit & Process Mapping', color: 'amber', icon: <Activity size={18} />, desc: 'We document every repeatable manual task your team performs — email handling, data entry, report generation, follow-ups — and map them into an automation blueprint.', saves: '2–4 hrs/task' },
  { id: 2, label: 'Custom Automation Design', color: 'purple', icon: <Settings size={18} />, desc: 'Using n8n, Zapier, or Make.com, I design the exact automation logic that replaces each manual workflow — tested, documented, and built to your specific stack.', saves: '0 manual steps' },
  { id: 3, label: 'Tool & Platform Integration', color: 'blue', icon: <Database size={18} />, desc: 'Your CRM, email platform, spreadsheets, project management tools, and databases are all wired together. No more copy-pasting between tabs.', saves: '100% sync' },
  { id: 4, label: 'Automated Reporting & Tracking', color: 'teal', icon: <Activity size={18} />, desc: 'Reports that used to take hours now generate automatically and land in your inbox on schedule. Real-time dashboards replace manual data pulls.', saves: '5–10 hrs/week' },
  { id: 5, label: 'Documentation & Team Training', color: 'indigo', icon: <CheckCircle2 size={18} />, desc: 'Every automation is documented with clear instructions. Your team gets a short walkthrough so they can manage and adapt the system confidently.', saves: 'Full self-sufficiency' },
  { id: 6, label: 'Ongoing Optimization & Support', color: 'emerald', icon: <RefreshCw size={18} />, desc: 'As your business evolves, so does your automation stack. I monitor for errors, add new workflows, and optimize performance on an ongoing basis.', saves: 'Continuous ROI' },
];

const STATS = [
  { val: '10–20hrs', label: 'Reclaimed Per Week', sub: 'Average across all clients' },
  { val: '70%', label: 'Time Savings', sub: 'On repetitive task categories' },
  { val: '0', label: 'Manual Steps Remaining', sub: 'In fully automated workflows' },
  { val: '1wk', label: 'To First Automation Live', sub: 'Typical deployment timeline' },
];

const TOOLS = [
  { name: 'n8n', color: 'var(--accent-amber)', logo: 'https://cdn.simpleicons.org/n8n' },
  { name: 'Zapier', color: 'var(--accent-amber)', logo: 'https://cdn.simpleicons.org/zapier' },
  { name: 'Make', color: 'var(--accent-teal)', logo: 'https://cdn.simpleicons.org/make' },
  { name: 'HubSpot', color: 'var(--accent-amber)', logo: 'https://cdn.simpleicons.org/hubspot' },
  { name: 'Python', color: 'var(--cta-blue)', logo: 'https://cdn.simpleicons.org/python' },
];

export default function BusinessProcessAutomation() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [cycleProgress, setCycleProgress] = useState(0);

  // Auto-cycle workflow steps on mount with progress indicator
  React.useEffect(() => {
    if (!isAutoCycling) {
      setCycleProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setCycleProgress(prev => {
        if (prev >= 100) {
          setActiveStep(current => (current + 1) % WORKFLOW_STEPS.length);
          return 0;
        }
        return prev + 2.857; // 3500ms -> 35 ticks of 100ms. 100 / 35 = 2.857
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const faqs = [
    { q: 'What kinds of tasks can actually be automated?', a: 'More than most people expect: lead capture and CRM updates, email follow-up sequences, report generation, invoice processing, social media scheduling, data entry between platforms, internal notifications, and much more. If a human is doing it the same way every time, it can almost certainly be automated.' },
    { q: 'What tools do you use to build automations?', a: 'I primarily use n8n (for complex, self-hosted workflows), Zapier and Make.com (for SaaS integrations), HubSpot (for CRM automation), and Python for custom API work. The right tool is always chosen based on your existing stack and needs — not the other way around.' },
    { q: 'Will this break our existing systems?', a: 'No. I build around your existing stack wherever possible. Every automation is tested in isolation before going live, and documented rollback procedures exist for every workflow. Nothing gets deployed until it\'s verified stable.' },
    { q: 'What if I don\'t know where to start?', a: 'That\'s exactly what the process audit phase is for. You don\'t need to know what to automate — I\'ll observe your current workflows, identify the highest-ROI opportunities, and propose a prioritised automation roadmap.' },
    { q: 'Do I need a technical team to maintain these?', a: 'No. Every automation is documented in plain language and includes a short training session so your team can manage it independently. For anything complex, I offer ongoing support as a monthly add-on.' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO
        title="Business Process Automation | Emmanuel Odebiyi"
        description="Eliminate repetitive tasks and reclaim 10–20 hours per week. I map your inefficient workflows and build stable custom automation systems."
        keywords="business process automation, n8n automation Nigeria, workflow automation, Zapier Make HubSpot integration"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* ── BACK NAV ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] pt-8">

          {/* LEFT: Copy + Before/After Widget */}
          <div className="space-y-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest text-center"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <Cpu size={12} className="animate-spin" style={{ animationDuration: '3s', color: 'var(--accent-amber)' }} />
              Service 03 — Process Automation
            </motion.div>

            <div className="text-center flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-display text-center"
                style={{ color: 'var(--text-body)' }}
              >
                Stop bleeding{' '}
                <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                  hours every week
                </span>
                <br />
                on tasks a machine can do.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl font-light leading-relaxed text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              Most growing businesses have entire workflows that could — and should — be automated.
              I map the inefficiency{' '}
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>and build the system that eliminates it.</strong>
            </motion.p>

            {/* Before / After comparison mini-widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
            >
              <div 
                className="p-4 rounded-2xl border space-y-2 text-left interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                  <Clock size={13} />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Before</span>
                </div>
                <div className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>20+ hrs</div>
                <div className="text-[10px] font-light leading-snug" style={{ color: 'var(--text-muted)' }}>lost to manual tasks every single week</div>
              </div>
              <div 
                className="p-4 rounded-2xl border space-y-2 text-left interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="flex items-center gap-2" style={{ color: 'var(--accent-teal)' }}>
                  <Zap size={13} className="animate-pulse" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">After</span>
                </div>
                <div className="text-2xl font-bold font-display" style={{ color: 'var(--accent-teal)' }}>0 hrs</div>
                <div className="text-[10px] font-light leading-snug" style={{ color: 'var(--text-muted)' }}>same work, running on autopilot 24/7</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contact"
                className="btn-cta text-base group"
              >
                Automate My Business
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#workflow-system"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border text-base transition-all font-bold"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                See the System <ChevronDown size={16} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Animated node-flow circuit */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
            style={{ height: '480px' }}
          >
            <div 
              className="relative h-full rounded-[2rem] border backdrop-blur-xl overflow-hidden p-8"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              {/* Top status bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Workflow Automation Map</span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase" style={{ color: 'var(--accent-amber)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse" />
                  RUNNING
                </span>
              </div>

              {/* Node flow graph */}
              <div className="relative flex flex-col gap-4 text-left">
                {/* Row 1: Input triggers */}
                <div className="flex gap-3 justify-start">
                  {[
                    { label: 'Lead Form', color: 'var(--accent-amber)' },
                    { label: 'Email Inbox', color: 'var(--accent-amber)' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                      className="px-3 py-2 rounded-xl text-[10px] font-sans font-bold border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: node.color }}
                    >
                      {node.label}
                    </motion.div>
                  ))}
                </div>

                {/* Connector line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="h-px origin-left"
                  style={{ backgroundColor: 'var(--border-card)', opacity: 0.5 }}
                />

                {/* Row 2: Automation engines */}
                <div className="flex gap-3">
                  {[
                    { label: 'n8n', color: 'var(--accent-amber)' },
                    { label: 'Zapier', color: 'var(--accent-amber)' },
                    { label: 'Make.com', color: 'var(--accent-teal)' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                      className="px-3 py-2.5 rounded-xl text-[10px] font-sans font-bold border shadow-lg"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: node.color }}
                    >
                      ⚡ {node.label}
                    </motion.div>
                  ))}
                </div>

                {/* Connector line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="h-px origin-left"
                  style={{ backgroundColor: 'var(--border-card)', opacity: 0.5 }}
                />

                {/* Row 3: Destinations */}
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: 'HubSpot CRM', color: 'var(--accent-teal)' },
                    { label: 'Google Sheets', color: 'var(--accent-teal)' },
                    { label: 'Slack Alerts', color: 'var(--accent-amber)' },
                    { label: 'Reports', color: 'var(--cta-blue)' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.1, duration: 0.4 }}
                      className="px-3 py-2 rounded-xl text-[10px] font-sans font-bold border"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: node.color }}
                    >
                      ✓ {node.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom savings badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="absolute bottom-6 left-8 right-8 flex items-center justify-between p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <span className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>Time saved this week</span>
                <span className="text-xl font-bold font-display" style={{ color: 'var(--accent-amber)' }}>18.5 hrs</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ── STATS ── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {STATS.map((r) => (
            <motion.div key={r.label} variants={fadeUp}
              className="p-6 rounded-2xl border backdrop-blur-md text-center transition-colors interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-3xl sm:text-4xl font-bold font-display mb-1" style={{ color: 'var(--accent-amber)' }}>{r.val}</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{r.label}</div>
              <div className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{r.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── WORKFLOW STEPS ── */}
        <div id="workflow-system" className="mb-32">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>The Six-Phase Process</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>How I Build Your Automation System</motion.h2>
            <motion.p variants={fadeUp} className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>Click each phase to understand exactly what happens and what it saves your team.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step selector */}
            <div className="lg:col-span-5 flex flex-wrap lg:flex-col gap-2 justify-center lg:justify-start pb-4 lg:pb-0 w-full relative">
              {WORKFLOW_STEPS.map((step, idx) => (
                <button 
                  key={step.id} 
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoCycling(false);
                  }}
                  className="inline-flex shrink-0 lg:w-full text-left p-3.5 lg:p-5 rounded-full lg:rounded-2xl transition-all duration-300 border items-center gap-3 lg:gap-4 group cursor-pointer relative overflow-hidden"
                  style={{ 
                    backgroundColor: activeStep === idx ? 'var(--bg-surface-alt)' : 'var(--bg-surface)', 
                    borderColor: activeStep === idx ? 'var(--text-body)' : 'var(--border-card)' 
                  }}
                >
                  <div 
                    className="w-7 h-7 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center border transition-all shrink-0"
                    style={{ 
                      backgroundColor: 'var(--bg-page)', 
                      borderColor: 'var(--border-card)', 
                      color: activeStep === idx ? 'var(--accent-amber)' : 'var(--text-muted)' 
                    }}
                  >{step.icon}</div>
                  <div className="flex-grow lg:flex-1 min-w-0">
                    <span 
                      className="font-bold text-xs lg:text-sm tracking-tight block transition-colors"
                      style={{ color: activeStep === idx ? 'var(--text-body)' : 'var(--text-muted)' }}
                    >
                      Phase {step.id}: {step.label}
                    </span>
                  </div>
                  {activeStep === idx && (
                    <span 
                      className="text-[10px] font-sans font-bold px-2 py-1 rounded-md border shrink-0 hidden lg:inline-block"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
                    >
                      {step.saves}
                    </span>
                  )}
                  {activeStep === idx && isAutoCycling && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[var(--accent-amber)] transition-all duration-100" style={{ width: `${cycleProgress}%` }} />
                  )}
                </button>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div 
                className="rounded-[2.5rem] border p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6 text-left">
                  <span 
                    className="text-xs font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                  >
                    Phase {WORKFLOW_STEPS[activeStep].id} of {WORKFLOW_STEPS.length}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>{WORKFLOW_STEPS[activeStep].label}</h3>
                  <p className="font-light leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>{WORKFLOW_STEPS[activeStep].desc}</p>
                  <div 
                    className="p-4 rounded-xl border flex items-center gap-3 w-fit"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
                  >
                    <Clock size={16} className="shrink-0" />
                    <span className="font-sans text-sm font-bold">Savings: {WORKFLOW_STEPS[activeStep].saves}</span>
                  </div>
                </div>
                <Link 
                  to="/contact"
                  className="btn-cta mt-8 text-center block text-sm uppercase tracking-wider cursor-pointer"
                >
                  Automate My Business Processes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── TOOLS ── */}
        <div className="mb-32">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>The Automation Stack</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Built on Industry-Leading Tools</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((t) => (
              <motion.div 
                key={t.name} 
                variants={fadeUp}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all hover:scale-[1.05] duration-300 shadow-sm hover:shadow-md cursor-default"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <img src={t.logo} alt={t.name} width={28} height={28} className="w-7 h-7 object-contain opacity-90 hover:opacity-100 hover:scale-110 hover:brightness-110 transition-all duration-300" />
                <span className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RESULT CALLOUT ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }} 
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
          className="mb-32 p-10 sm:p-16 rounded-[3rem] border text-center relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <Zap className="mx-auto mb-6" size={40} style={{ color: 'var(--accent-amber)' }} />
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight leading-snug mb-4 font-display" style={{ color: 'var(--text-body)' }}>
            Your team stops doing repetitive work —{' '}
            <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
              and starts doing meaningful work.
            </span>
          </h3>
          <p className="font-light max-w-2xl mx-auto text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            10–20 hours reclaimed per week on average. Real time back in your business, redirected to the work that actually drives growth.
          </p>
          <Link 
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Automate My Business Processes <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* ── FAQ ── */}
        <div className="mb-24 max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Common Questions</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Questions About Process Automation</motion.h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="rounded-2xl border overflow-hidden transition-all interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:brightness-95 transition-all cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
                >
                  <span className="font-bold pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.35 }} 
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }} 
          className="text-center space-y-6"
        >
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Next Step</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>Book Your Free Automation Audit</h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            30 minutes. I'll identify the top 3 workflows in your business that are ready to be automated — and tell you exactly what the system would look like.
          </p>
          <Link 
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Book Your Free Strategy Call <ArrowRight size={20} />
          </Link>
          <p className="text-xs font-sans font-bold mt-3" style={{ color: 'var(--text-muted)' }}>No commitment. No sales pressure. Just strategy.</p>
        </motion.div>
      </div>
    </div>
  );
}
