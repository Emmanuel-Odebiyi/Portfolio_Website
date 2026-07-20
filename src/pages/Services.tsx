import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Cpu, ArrowRight, CheckCircle2, Workflow,
  Plus, Minus, Sliders, Calendar, Settings, Clock, Award
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ToolsTicker, Tool } from '../components/ToolsTicker';

const toolData: Tool[] = [
  { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier' },
  { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n' },
  { name: 'Make', logo: 'https://cdn.simpleicons.org/make' },
  { name: 'HubSpot', logo: 'https://cdn.simpleicons.org/hubspot' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai' },
];

export default function Services() {
  // Calculator States
  const [articlesCount, setArticlesCount] = useState(12);
  const [manualHours, setManualHours] = useState(25);
  const [customerValue, setCustomerValue] = useState(1500);
  const [activeBlueprint, setActiveBlueprint] = useState<'content' | 'seo' | 'automation'>('content');
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  React.useEffect(() => {
    if (!isAutoCycling) return;
    const services: ('content' | 'seo' | 'automation')[] = ['content', 'seo', 'automation'];
    const timer = setInterval(() => {
      setActiveBlueprint((prev) => {
        const nextIdx = (services.indexOf(prev) + 1) % services.length;
        return services[nextIdx];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoCycling]);

  // Calculations
  const reclaimedHours = Math.round(manualHours * 0.8);
  const valueGenerated = Math.round((articlesCount * 2.8 * customerValue * 0.04));
  const efficiencyScore = Math.max(10, Math.round(100 - (manualHours * 1.5) + (articlesCount * 1.2)));

  const articlesPercent = ((articlesCount - 4) / 36) * 100;
  const hoursPercent = ((manualHours - 5) / 55) * 100;
  const valuePercent = ((customerValue - 500) / 4500) * 100;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly will I see results?",
      answer: "Most clients see measurable improvements in content output and traffic within the first 60 days. SEO results typically compound over 3–6 months — the earlier we start, the faster the gains."
    },
    {
      question: "Do you work with businesses outside Nigeria?",
      answer: "Yes. I work remotely with clients across Africa, the UK, US, Canada, and beyond. Time zones are never a barrier."
    },
    {
      question: "What size business is this right for?",
      answer: "I work best with growing businesses — typically SMBs and mid-market companies that have validated their offer but haven't yet built a scalable marketing system."
    },
    {
      question: "Will the content actually sound like me?",
      answer: "Yes. Before building anything, I conduct a brand voice audit. Every piece of content goes through quality review to ensure it reflects your tone, language, and positioning — not generic AI output."
    },
    {
      question: "What if I already have some systems in place?",
      answer: "Even better. I'll audit what you have, identify the gaps, and build around your existing stack wherever possible. Nothing gets rebuilt unnecessarily."
    }
  ];

  return (
    <div
      className="min-h-screen relative overflow-x-clip"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}
    >
      <SEO 
        title="Done-For-You Marketing Systems | Emmanuel Odebiyi"
        description="Done-for-you content marketing automation, technical SEO, and process workflows. Month-to-month contracts. High ROI systems for growing businesses."
        keywords="marketing automation Nigeria, B2B content automation, technical SEO architecture, n8n workflows"
      />

      <div className="relative z-10 pt-28 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto px-6">

        {/* ── Page Header — Centered ── */}
        <div className="mb-16 md:mb-24 border-b pb-12 flex flex-col items-center text-center" style={{ borderColor: 'var(--border-card)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto flex flex-col items-center text-center"
          >
            <span
              className="text-xs font-sans font-bold uppercase tracking-widest block mb-4 text-center"
              style={{ color: 'var(--accent-amber)' }}
            >
              Done-For-You Systems
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 font-display text-center"
              style={{ color: 'var(--text-body)' }}
            >
              Marketing that{' '}
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                runs itself.
              </span>
            </h1>
            <p
              className="text-xl font-light leading-relaxed max-w-2xl text-center mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Consistent content. Higher rankings. Time back in your week. No team required.
            </p>
          </motion.div>
        </div>

        {/* ── Intro Panel ── */}
        <div
          className="p-8 sm:p-12 rounded-[2rem] border mb-32"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-body)' }}
              >
                Growing businesses don't need more marketing advice.{' '}
                <span style={{ color: 'var(--accent-amber)' }}>They need a system that actually runs.</span>
              </h2>
              <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                One that publishes consistently, ranks in search, and generates leads on autopilot. That's what I build. Custom-engineered marketing systems that deliver enterprise output without enterprise complexity, cost, or management overhead.
              </p>
            </div>
            <div
              className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-8"
              style={{ borderColor: 'var(--border-card)' }}
            >
              {['No retainers', 'No bloated contracts', 'Just measurable growth'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-teal)' }} className="shrink-0" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── IMPACT ESTIMATOR ── */}
        <div className="mb-16 md:mb-32">
          <div className="mb-16 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
            <span
              className="text-xs font-sans font-bold uppercase tracking-widest block mb-3"
              style={{ color: 'var(--accent-amber)' }}
            >
              Free Estimator
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight font-display mb-3"
              style={{ color: 'var(--text-body)' }}
            >
              What could your system{' '}
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                return?
              </span>
            </h2>
            <p className="font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Adjust the parameters below based on your current workload to see what switching to an automated setup could realistically return.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Control Panel */}
            <div
              className="lg:col-span-7 rounded-[2rem] p-6 sm:p-10 space-y-8 border text-left"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-2">
                <h3
                  className="text-xl font-bold flex items-center gap-2.5"
                  style={{ color: 'var(--text-body)' }}
                >
                  <Sliders size={18} style={{ color: 'var(--accent-amber)' }} />
                  Your current situation
                </h3>
                <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
                  Move the sliders below to match your current marketing workload. The panel on the right updates in real time.
                </p>
              </div>

              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center relative">
                  <label className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-body)' }}>
                    Target monthly content volume
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[var(--accent-amber)] font-bold tracking-wider animate-pulse uppercase">
                      ← Drag to adjust
                    </span>
                  </label>
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-bold border font-sans"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)',
                      color: 'var(--accent-amber)',
                      borderColor: 'color-mix(in srgb, var(--accent-amber) 25%, transparent)'
                    }}
                  >
                    {articlesCount} articles / mo
                  </span>
                </div>
                <input
                  type="range" min="4" max="40" value={articlesCount}
                  onChange={(e) => setArticlesCount(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-transparent border border-zinc-200 dark:border-zinc-800"
                  style={{ 
                    accentColor: 'var(--accent-amber)',
                    background: `linear-gradient(to right, var(--accent-amber) 0%, var(--accent-amber) ${articlesPercent}%, var(--border-card) ${articlesPercent}%, var(--border-card) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  <span>4 (conservative)</span>
                  <span>40 (full scale)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-body)' }}>
                    Monthly hours spent on manual writing & formatting
                  </label>
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-bold border font-sans"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--cta-blue) 10%, transparent)',
                      color: 'var(--cta-blue)',
                      borderColor: 'color-mix(in srgb, var(--cta-blue) 25%, transparent)'
                    }}
                  >
                    {manualHours} hrs / mo
                  </span>
                </div>
                <input
                  type="range" min="5" max="60" value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-transparent border border-zinc-200 dark:border-zinc-800"
                  style={{ 
                    accentColor: 'var(--cta-blue)',
                    background: `linear-gradient(to right, var(--cta-blue) 0%, var(--cta-blue) ${hoursPercent}%, var(--border-card) ${hoursPercent}%, var(--border-card) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  <span>5 hrs</span>
                  <span>60 hrs (burnout zone)</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-body)' }}>
                    Average lifetime value of one client (LTV)
                  </label>
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-bold border font-sans"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--accent-teal) 10%, transparent)',
                      color: 'var(--accent-teal)',
                      borderColor: 'color-mix(in srgb, var(--accent-teal) 25%, transparent)'
                    }}
                  >
                    ${customerValue.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range" min="500" max="5000" step="250" value={customerValue}
                  onChange={(e) => setCustomerValue(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-transparent border border-zinc-200 dark:border-zinc-800"
                  style={{ 
                    accentColor: 'var(--accent-teal)',
                    background: `linear-gradient(to right, var(--accent-teal) 0%, var(--accent-teal) ${valuePercent}%, var(--border-card) ${valuePercent}%, var(--border-card) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  <span>$500</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div
              className="lg:col-span-5 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between border text-left"
              style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-6">
                <span
                  className="text-[10px] font-sans font-bold uppercase tracking-widest block"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Estimated returns
                </span>

                <div className="p-5 rounded-2xl border space-y-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>Value generated / mo</span>
                  <div className="overflow-hidden h-10 flex items-center">
                    <motion.span
                      key={valueGenerated}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-3xl sm:text-4xl font-bold font-display inline-block"
                      style={{ color: 'var(--accent-amber)' }}
                    >
                      ${valueGenerated.toLocaleString()}
                    </motion.span>
                  </div>
                  <p className="text-[10px] font-light leading-relaxed animate-fade-in" style={{ color: 'var(--text-muted)' }}>
                    Based on traffic growth and conversion-to-LTV pipeline scaling.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border space-y-1" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>Hours reclaimed / mo</span>
                  <div className="overflow-hidden h-10 flex items-center">
                    <motion.span
                      key={reclaimedHours}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-3xl sm:text-4xl font-bold font-display inline-block"
                      style={{ color: 'var(--accent-teal)' }}
                    >
                      {reclaimedHours} saved
                    </motion.span>
                  </div>
                  <p className="text-[10px] font-light leading-relaxed animate-fade-in" style={{ color: 'var(--text-muted)' }}>
                    That's {Math.round(reclaimedHours / 8)} full business days back every month.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border space-y-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
                  <div className="flex justify-between items-center text-xs font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    <span>Workflow efficiency</span>
                    <motion.span
                      key={efficiencyScore}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ color: efficiencyScore > 75 ? 'var(--accent-teal)' : efficiencyScore > 45 ? 'var(--accent-amber)' : '#ef4444', fontWeight: 700 }}
                    >
                      {efficiencyScore}%
                    </motion.span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-card)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      animate={{
                        width: `${efficiencyScore}%`,
                        backgroundColor: efficiencyScore > 75 ? 'var(--accent-teal)' : efficiencyScore > 45 ? 'var(--accent-amber)' : '#ef4444'
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="mt-8 py-4 rounded-xl font-bold text-center block transition-all text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] hover:brightness-110 hover:shadow-lg duration-300"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Get my custom system built
              </Link>
            </div>
          </div>
        </div>

        {/* ── CORE SERVICES ── */}
        <div className="mb-16 md:mb-32">
          <div className="mb-16 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
            <span
              className="text-xs font-sans font-bold uppercase tracking-widest block mb-3 text-left"
              style={{ color: 'var(--accent-amber)' }}
            >
              Core Services
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
              <h2
                className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-left"
                style={{ color: 'var(--text-body)' }}
              >
                What I{' '}
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                  actually build.
                </span>
              </h2>
              <span className="text-xs font-sans font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                Click each service to see what's included →
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Selector */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {[
                { id: 'content', title: 'Content Marketing Automation', desc: 'Stop publishing when you have time. Start publishing on a system.', icon: <Workflow size={20} /> },
                { id: 'seo', title: 'SEO Strategy & Optimization', desc: "Ranking higher isn't luck. It's architecture.", icon: <Search size={20} /> },
                { id: 'automation', title: 'Business Process Automation', desc: "Reclaim 10–20 hours back every week.", icon: <Cpu size={20} /> }
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveBlueprint(service.id as any);
                    setIsAutoCycling(false);
                  }}
                  className="w-full text-left p-6 rounded-2xl transition-all duration-300 border flex gap-4 items-start"
                  style={{
                    backgroundColor: activeBlueprint === service.id ? 'var(--bg-surface)' : 'transparent',
                    borderColor: activeBlueprint === service.id ? 'var(--border-card)' : 'transparent',
                    boxShadow: activeBlueprint === service.id ? '0 4px 16px rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <div
                    className="p-3 rounded-xl border shrink-0 transition-all"
                    style={{
                      backgroundColor: activeBlueprint === service.id ? 'color-mix(in srgb, var(--accent-amber) 12%, transparent)' : 'var(--bg-surface-alt)',
                      borderColor: 'var(--border-card)',
                      color: activeBlueprint === service.id ? 'var(--accent-amber)' : 'var(--text-muted)',
                    }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-grow">
                    <h3
                      className="text-sm font-bold mb-1 flex items-center gap-2"
                      style={{ color: activeBlueprint === service.id ? 'var(--text-body)' : 'var(--text-muted)' }}
                    >
                      {service.title}
                      {activeBlueprint === service.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] animate-pulse shrink-0" />
                      )}
                    </h3>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {service.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-8">
              <div
                className="rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between h-full border text-left"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <AnimatePresence mode="wait">
                  {activeBlueprint === 'content' && (
                    <motion.div key="content" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                      <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>How it works</span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                        Stop publishing when you have time.{' '}
                        <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>Start publishing on a system.</span>
                      </h3>
                      <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Most businesses don't have a content problem. They have a consistency problem. Great ideas, no reliable engine to get them out. I build the engine.
                      </p>
                      <div className="p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-sans font-semibold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface-alt)' }}>
                        {['1. Keyword & cluster audit', '2. AI brand-voice writing', '3. Multi-channel distribution'].map((step, i) => (
                          <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}>
                            {step}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t pt-6" style={{ borderColor: 'var(--border-card)' }}>
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>What's included:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                          {['Full content strategy & editorial calendar', 'AI-assisted content creation — brand tuned', 'Automated publishing workflow (8–40+ posts)', 'Blog, LinkedIn, Email multi-distribution'].map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <CheckCircle2 size={14} style={{ color: 'var(--accent-teal)' }} className="shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border font-bold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'color-mix(in srgb, var(--accent-amber) 8%, transparent)', color: 'var(--text-body)' }}>
                        Result: Your audience sees you everywhere, every week — without you writing a single word.
                      </div>
                      <Link to="/services/content-marketing-automation" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:brightness-110" style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}>
                        Build my content engine <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  )}

                  {activeBlueprint === 'seo' && (
                    <motion.div key="seo" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                      <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>How it works</span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                        Ranking higher isn't luck.{' '}
                        <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>It's architecture.</span>
                      </h3>
                      <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        You can publish great content and still get zero traffic. SEO is what determines whether your content gets found — or gets buried. I build SEO strategies from the foundation up.
                      </p>
                      <div className="p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-sans font-semibold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface-alt)' }}>
                        {['1. Keyword gap scan', '2. Topic cluster layout', '3. Technical audit sync'].map((step, i) => (
                          <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}>
                            {step}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t pt-6" style={{ borderColor: 'var(--border-card)' }}>
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>What's included:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                          {['In-depth keyword & competitor gap scan', 'Topic cluster architecture for authority', 'On-page optimization across all posts', 'Technical SEO audit & indexing optimization'].map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <CheckCircle2 size={14} style={{ color: 'var(--accent-teal)' }} className="shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border font-bold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'color-mix(in srgb, var(--cta-blue) 8%, transparent)', color: 'var(--text-body)' }}>
                        Result: Content that doesn't just exist — it ranks, gets clicked, and brings in the right traffic.
                      </div>
                      <Link to="/services/seo-strategy-optimization" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:brightness-110" style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}>
                        Build my SEO foundation <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  )}

                  {activeBlueprint === 'automation' && (
                    <motion.div key="automation" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
                      <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--accent-amber)' }}>How it works</span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                        The hours you lose to repetitive tasks{' '}
                        <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>are hours you're not growing.</span>
                      </h3>
                      <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Marketing isn't the only place where manual, repetitive work is stealing your time. Most growing businesses have entire workflows that could — and should — be automated.
                      </p>
                      <div className="p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-sans font-semibold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface-alt)' }}>
                        {['1. Task audit map', '2. n8n/Zapier build', '3. API sync & launch'].map((step, i) => (
                          <div key={i} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}>
                            {step}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 border-t pt-6" style={{ borderColor: 'var(--border-card)' }}>
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>What's included:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-light" style={{ color: 'var(--text-muted)' }}>
                          {['Full workflow audit and process mapping', 'Custom n8n, Zapier & Make.com integrations', 'Integration of CRM (HubSpot), Sheets & DBs', 'Ongoing workflow training & technical logs'].map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                              <CheckCircle2 size={14} style={{ color: 'var(--accent-teal)' }} className="shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border font-bold" style={{ borderColor: 'var(--border-card)', backgroundColor: 'color-mix(in srgb, var(--accent-teal) 8%, transparent)', color: 'var(--text-body)' }}>
                        Result: Reclaim 10–20 hours per week — so your team can focus on building, not administrating.
                      </div>
                      <Link to="/services/business-process-automation" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:brightness-110" style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}>
                        Automate my business <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── ENGAGEMENT MODEL ── */}
        <div className="mb-16 md:mb-32">
          <div className="mb-16 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--accent-amber)' }}>
              Engagement Model
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              Month-to-month.{' '}
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>No lock-in.</span>
            </h2>
            <p className="mt-3 font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
              I don't believe in locking clients into long-term retainers. Everything I offer is transparent, month-to-month, and measured on deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Week 1 setup', icon: <Settings style={{ color: 'var(--accent-amber)' }} size={24} />, step: '01', desc: 'System audit & tech stack connection. We audit existing software accounts, identify integration gaps, establish n8n connections, and deploy brand voice parameters.' },
              { title: 'Month 1 deliverables', icon: <Clock style={{ color: 'var(--cta-blue)' }} size={24} />, step: '02', desc: 'Workflow testing & content rollout. We execute keyword topic clusters, configure automatic publishing webhooks to HubSpot/WordPress, and ship initial batches of articles.' },
              { title: 'Ongoing scaling', icon: <Award style={{ color: 'var(--accent-teal)' }} size={24} />, step: '03', desc: 'Continuous optimization & performance tracking. We analyze SERP positions, trace lead capture loops, refine prompts to protect content standards, and deliver performance reports.' }
            ].map((step) => (
              <div
                key={step.title}
                className="p-8 rounded-[2rem] border flex flex-col justify-between transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface-alt)' }}>
                      {step.icon}
                    </div>
                    <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      Step {step.step}
                    </span>
                  </div>
                  <div className="space-y-3 text-left">
                    <h3 className="text-xl font-bold capitalize tracking-tight" style={{ color: 'var(--text-body)' }}>{step.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOLS TICKER ── */}
        <div className="py-20 flex flex-col items-center border-y mb-32" style={{ borderColor: 'var(--border-card)' }}>
          <div className="text-center space-y-4 mb-16 px-6">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>
              Tech Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
              The tools that{' '}
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
                power the systems.
              </span>
            </h2>
          </div>
          <ToolsTicker tools={toolData} />
        </div>

        {/* ── FAQs ── */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-32">
          <div className="mb-16 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
            <span className="text-xs font-sans font-bold uppercase tracking-widest block mb-3" style={{ color: 'var(--accent-amber)' }}>
              Common Questions
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Things people ask.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="rounded-3xl border overflow-hidden"
                style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                >
                  <span
                    className="text-lg font-bold pr-8 transition-colors"
                    style={{ color: 'var(--text-body)' }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: openFaq === i ? 'var(--accent-amber)' : 'transparent',
                      borderColor: openFaq === i ? 'var(--accent-amber)' : 'var(--border-card)',
                      color: openFaq === i ? '#fff' : 'var(--text-muted)',
                    }}
                  >
                    {openFaq === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-8 pb-8 font-light leading-relaxed text-base pt-2 border-t mt-2 mx-8"
                        style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] p-12 md:p-16 border overflow-hidden"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>No obligations</span>
              <h2
                className="text-3xl sm:text-5xl font-bold font-display tracking-tight leading-tight"
                style={{ color: 'var(--text-body)' }}
              >
                Not sure which service is right for you?
              </h2>
              <p className="text-lg font-light max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Let's figure it out together. Book a free 30-minute call and I'll tell you exactly what I'd build — and what results to expect.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-5 rounded-2xl font-bold transition-all text-center group hover:brightness-110"
                style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
              >
                Book a free strategy call
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
