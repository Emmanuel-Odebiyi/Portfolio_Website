import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { id: 1, label: 'Workflow Audit & Process Mapping', color: 'amber', icon: <Activity size={18} />, desc: 'We document every repetitive manual task your team performs — email handling, data entry, report generation, follow-ups — and map them into an automation blueprint.', saves: '2–4 hrs/task' },
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
  { name: 'n8n', color: 'amber', logo: 'https://cdn.simpleicons.org/n8n' },
  { name: 'Zapier', color: 'orange', logo: 'https://cdn.simpleicons.org/zapier' },
  { name: 'Make', color: 'purple', logo: 'https://cdn.simpleicons.org/make' },
  { name: 'HubSpot', color: 'orange', logo: 'https://cdn.simpleicons.org/hubspot' },
  { name: 'Python', color: 'blue', logo: 'https://cdn.simpleicons.org/python' },
];

const colorMap: Record<string, string> = {
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
};

export default function BusinessProcessAutomation() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'What kinds of tasks can actually be automated?', a: 'More than most people expect: lead capture and CRM updates, email follow-up sequences, report generation, invoice processing, social media scheduling, data entry between platforms, internal notifications, and much more. If a human is doing it the same way every time, it can almost certainly be automated.' },
    { q: 'What tools do you use to build automations?', a: 'I primarily use n8n (for complex, self-hosted workflows), Zapier and Make.com (for SaaS integrations), HubSpot (for CRM automation), and Python for custom API work. The right tool is always chosen based on your existing stack and needs — not the other way around.' },
    { q: 'Will this break our existing systems?', a: 'No. I build around your existing stack wherever possible. Every automation is tested in isolation before going live, and documented rollback procedures exist for every workflow. Nothing gets deployed until it\'s verified stable.' },
    { q: 'What if I don\'t know where to start?', a: 'That\'s exactly what the process audit phase is for. You don\'t need to know what to automate — I\'ll observe your current workflows, identify the highest-ROI opportunities, and propose a prioritised automation roadmap.' },
    { q: 'Do I need a technical team to maintain these?', a: 'No. Every automation is documented in plain language and includes a short training session so your team can manage it independently. For anything complex, I offer ongoing support as a monthly add-on.' },
  ];

  return (
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      <SEO
        title="Business Process Automation | Emmanuel Odebiyi"
        description="Eliminate repetitive tasks and reclaim 10–20 hours per week. I map your inefficient workflows and build stable custom automation systems."
        keywords="business process automation, n8n automation Nigeria, workflow automation, Zapier Make HubSpot integration"
      />

      {/* Aurora glows */}
      <div className="absolute top-[-15%] left-[-5%] w-[65vw] h-[65vw] bg-amber-600/6 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[30%] w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* ── BACK NAV ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/services" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] pt-8">

          {/* LEFT: Copy + Before/After Widget */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 tracking-[0.2em] uppercase"
            >
              <Cpu size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
              Service 03 — Process Automation
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white"
              >
                Stop bleeding{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
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
              className="text-lg sm:text-xl text-zinc-400 font-light leading-relaxed"
            >
              Most growing businesses have entire workflows that could — and should — be automated.
              I map the inefficiency{' '}
              <strong className="text-white font-semibold">and build the system that eliminates it.</strong>
            </motion.p>

            {/* Before / After comparison mini-widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                <div className="flex items-center gap-2 text-red-400">
                  <Clock size={13} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Before</span>
                </div>
                <div className="text-2xl font-black text-red-400">20+ hrs</div>
                <div className="text-[10px] text-zinc-500 font-mono leading-snug">lost to manual tasks every single week</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Zap size={13} className="animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">After</span>
                </div>
                <div className="text-2xl font-black text-emerald-400">0 hrs</div>
                <div className="text-[10px] text-zinc-500 font-mono leading-snug">same work, running on autopilot 24/7</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-base hover:brightness-110 shadow-2xl shadow-amber-500/30 active:scale-95 transition-all group"
              >
                Automate My Business Processes
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#workflow-system"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 font-medium text-base hover:bg-white/10 hover:text-white transition-all"
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
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/8 to-red-500/5 rounded-[2rem] blur-[60px] pointer-events-none" />

            <div className="relative h-full rounded-[2rem] bg-zinc-950/90 border border-white/10 backdrop-blur-xl overflow-hidden p-8">
              {/* Top status bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Workflow Automation Map</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  RUNNING
                </span>
              </div>

              {/* Node flow graph */}
              <div className="relative flex flex-col gap-4">
                {/* Row 1: Input triggers */}
                <div className="flex gap-3 justify-start">
                  {[
                    { label: 'Lead Form', color: 'amber' },
                    { label: 'Email Inbox', color: 'orange' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                      className={`px-3 py-2 rounded-xl text-[10px] font-mono font-bold border ${
                        node.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                        'bg-orange-500/10 border-orange-500/30 text-orange-400'
                      }`}
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
                  className="h-px bg-gradient-to-r from-amber-500/40 via-orange-500/40 to-transparent origin-left"
                />

                {/* Row 2: Automation engines */}
                <div className="flex gap-3">
                  {[
                    { label: 'n8n', color: 'amber' },
                    { label: 'Zapier', color: 'orange' },
                    { label: 'Make.com', color: 'purple' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                      className={`px-3 py-2.5 rounded-xl text-[10px] font-mono font-black border shadow-lg ${
                        node.color === 'amber' ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-amber-500/10' :
                        node.color === 'orange' ? 'bg-orange-500/15 border-orange-500/40 text-orange-300 shadow-orange-500/10' :
                        'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-purple-500/10'
                      }`}
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
                  className="h-px bg-gradient-to-r from-purple-500/40 via-blue-500/30 to-emerald-500/40 origin-left"
                />

                {/* Row 3: Destinations */}
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: 'HubSpot CRM', color: 'teal' },
                    { label: 'Google Sheets', color: 'emerald' },
                    { label: 'Slack Alerts', color: 'indigo' },
                    { label: 'Reports', color: 'blue' },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.1, duration: 0.4 }}
                      className={`px-3 py-2 rounded-xl text-[10px] font-mono border ${
                        node.color === 'teal' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' :
                        node.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                        node.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' :
                        'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      }`}
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
                className="absolute bottom-6 left-8 right-8 flex items-center justify-between p-4 rounded-2xl bg-amber-500/8 border border-amber-500/20"
              >
                <span className="text-xs text-zinc-400 font-mono">Time saved this week</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">18.5 hrs</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ── STATS ── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {STATS.map((r) => (
            <motion.div key={r.label} variants={fadeUp}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-amber-500/30 transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-1">{r.val}</div>
              <div className="text-sm font-semibold text-white mb-1">{r.label}</div>
              <div className="text-xs text-zinc-500 font-mono">{r.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── WORKFLOW STEPS ── */}
        <div id="workflow-system" className="mb-32">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">The Six-Phase Process</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">How I Build Your Automation System</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 font-light max-w-xl mx-auto">Click each phase to understand exactly what happens and what it saves your team.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-2">
              {WORKFLOW_STEPS.map((step, idx) => (
                <button key={step.id} onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${
                    activeStep === idx ? 'bg-white/10 border-white/20 shadow-xl' : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                  }`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
                    activeStep === idx ? colorMap[step.color] : 'bg-white/5 border-white/10 text-zinc-500'
                  }`}>{step.icon}</div>
                  <div className="flex-1 min-w-0">
                    <span className={`font-semibold text-sm tracking-tight block transition-colors ${activeStep === idx ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                      Phase {step.id}: {step.label}
                    </span>
                  </div>
                  {activeStep === idx && (
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-md border shrink-0 ${colorMap[step.color]}`}>{step.saves}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[2.5rem] bg-zinc-950/80 border border-white/10 p-8 sm:p-12 h-full backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }} className="space-y-6">
                    <span className={`text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${colorMap[WORKFLOW_STEPS[activeStep].color]}`}>
                      Phase {WORKFLOW_STEPS[activeStep].id} of {WORKFLOW_STEPS.length}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{WORKFLOW_STEPS[activeStep].label}</h3>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg">{WORKFLOW_STEPS[activeStep].desc}</p>
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${colorMap[WORKFLOW_STEPS[activeStep].color]}`}>
                      <Clock size={16} className="shrink-0" />
                      <span className="font-mono text-sm font-bold">Savings: {WORKFLOW_STEPS[activeStep].saves}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <Link to="/contact"
                  className="mt-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 font-bold text-center block hover:brightness-110 shadow-lg active:scale-95 transition-all text-sm uppercase tracking-wider text-white">
                  Automate My Business Processes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── TOOLS ── */}
        <div className="mb-32">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">The Automation Stack</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">Built on Industry-Leading Tools</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
            {TOOLS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/8 transition-all">
                <img src={t.logo} alt={t.name} className="w-7 h-7 object-contain grayscale hover:grayscale-0 transition-all" />
                <span className="font-bold text-white text-sm">{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RESULT CALLOUT ── */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-32 p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 text-center relative overflow-hidden">
          <Zap className="mx-auto text-amber-400 mb-6" size={40} />
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-snug mb-4">
            Your team stops doing repetitive work —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              and starts doing meaningful work.
            </span>
          </h3>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg mb-8">
            10–20 hours reclaimed per week on average. Real time back in your business, redirected to the work that actually drives growth.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-amber-500/30 active:scale-95 transition-all">
            Automate My Business Processes <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* ── FAQ ── */}
        <div className="mb-24 max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12 space-y-4">
            <motion.span variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">Common Questions</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-white tracking-tight">Questions About Process Automation</motion.h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-md">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown size={18} className={`text-zinc-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-zinc-400 font-light leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center space-y-6">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Next Step</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Book Your Free Automation Audit</h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            30 minutes. I'll identify the top 3 workflows in your business that are ready to be automated — and tell you exactly what the system would look like.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-amber-500/20 active:scale-95 transition-all">
            Book Your Free Strategy Call <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-zinc-600 font-mono mt-3">No commitment. No sales pressure. Just strategy.</p>
        </motion.div>
      </div>
    </div>
  );
}
