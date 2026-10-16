import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Mail,
  MessageSquare,
  BookOpen,
  Target,
  Sparkles,
  Workflow,
  Search,
  CheckCircle2,
  Globe,
  Clock,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { NumberTicker } from '../components/NumberTicker';
import { OrbitalTestimonials } from '../components/ui/OrbitalTestimonials';
import { OptimizedImage } from '../components/common/OptimizedImage';

/* ─── Fade-up animation variants ─── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px" },
  transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] as [number, number, number, number] },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * 0.1 },
});

export default function About() {
  return (
    <div className="pt-0 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="About Emmanuel Odebiyi | Content Marketing Automation Specialist"
        description="Systems architect and senior content strategist building autonomous marketing engines that deliver 520% ROI. Executive profile, methodology, and verified results."
        keywords="marketing automation specialist, content automation architect, AI content systems, SEO strategist Nigeria, Emmanuel Odebiyi"
      />
      
      {/* ═══════════════════════════════════════════
           01. HERO SECTION (EXPANSIVE CINEMATIC)
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[550px] sm:min-h-[600px] md:min-h-[750px] flex flex-col justify-end pb-10 sm:pb-12 md:pb-16 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        
        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <OptimizedImage
            src="/images/about-hero-landscape.webp"
            alt="Emmanuel Odebiyi Portrait"
            className="w-full h-full object-cover object-[50%_25%]"
            draggable={false}
          />

          {/* Localized subtle bottom-only gradient strictly behind text baseline */}
          <div 
            className="absolute inset-x-0 bottom-0 h-64 md:h-72 pointer-events-none z-5"
            style={{
              background: 'linear-gradient(to top, rgba(14, 28, 42, 0.88) 0%, rgba(14, 28, 42, 0.4) 50%, transparent 100%)'
            }}
          />
        </div>

        {/* Floating Status Badge */}
        <div className="absolute left-6 md:left-12 lg:left-24 top-32 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold backdrop-blur-md shadow-lg"
            style={{ 
              backgroundColor: 'rgba(14, 28, 42, 0.75)', 
              borderColor: 'rgba(255, 255, 255, 0.15)', 
              color: '#ffffff' 
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Custom Automations</span>
          </motion.div>
        </div>

        {/* Content container aligned at the bottom */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 z-10 relative">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pointer-events-none">
            {/* Left - Headline */}
            <div className="lg:col-span-8 text-left space-y-4 pointer-events-auto">
              <h1 className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] font-bold tracking-tight leading-[1.1] md:leading-[1.05] text-white [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)] font-display">
                Emmanuel is engineering <span className="text-emerald-400 font-extrabold [text-shadow:_0_2px_14px_rgba(0,0,0,0.9)]">content marketing automation</span> systems that turn chaos into growth engines.
              </h1>
            </div>

            {/* Right - Bio & CTA */}
            <div className="lg:col-span-4 lg:col-start-9 text-left space-y-6 pointer-events-auto">
              <p className="text-xs sm:text-sm md:text-base lg:text-[1.05rem] font-medium leading-relaxed text-zinc-100 [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)] font-sans">
                By integrating smart editorial workflows with systems built on n8n and Make, he constructs self-running pipelines that publish, distribute, and optimize content automatically.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  to="/contact"
                  className="px-6 py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all bg-white text-zinc-950 hover:bg-zinc-100"
                >
                  Book Strategy Call
                </Link>
                <Link 
                  to="/portfolio"
                  className="px-6 py-3 rounded-xl font-bold text-sm tracking-wide border border-white/25 text-white bg-black/30 backdrop-blur-sm hover:bg-white/15 transition-all"
                >
                  View Audited Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           02. EXECUTIVE STATEMENT & PHILOSOPHY
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b relative z-10" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-wider" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
            EXECUTIVE PROFILE
          </motion.div>

          <motion.h2 
            {...fadeUp}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] font-display"
            style={{ color: 'var(--text-body)' }}
          >
            Content Systems Architect &amp; <br />
            <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
              B2B Growth Specialist.
            </span>
          </motion.h2>

          <motion.p 
            {...fadeUp}
            className="text-lg md:text-xl font-normal leading-relaxed text-[var(--text-muted)] max-w-3xl mx-auto font-sans"
          >
            I bridge the gap between high-ranking editorial writing and programmatic workflow automation. For growing B2B SaaS and technology companies, I engineer self-operating marketing engines that publish consistently, rank organically, and attribute direct revenue—without burning out the founder or requiring a bloated in-house department.
          </motion.p>
        </div>

        {/* 3 Core Pillars of Execution */}
        <div className="max-w-6xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <motion.div 
              {...stagger(0)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 01</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Editorial Authority</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Published across global platforms including StoryChief, Herbvity, and Scoove Africa. I craft high-intent B2B guides and topic clusters that educate decision-makers and convert organic searchers into pipeline.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--accent-amber)]" style={{ borderColor: 'var(--border-card)' }}>
                <CheckCircle2 size={14} />
                <span>Zero Fluff • Authentic Brand Voice</span>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              {...stagger(1)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}>
                  <Workflow className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 02</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Pipeline Automation</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Production workflows orchestrated with n8n, Make, Zapier, and Python microservices. Centralized databases in Airtable, multi-platform publishing in WordPress/Webflow, and CRM sync in HubSpot.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--cta-blue)]" style={{ borderColor: 'var(--border-card)' }}>
                <Clock size={14} />
                <span>15+ Hours Saved Every Week</span>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              {...stagger(2)}
              className="p-8 rounded-2xl border flex flex-col justify-between shadow-sm"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">PILLAR 03</span>
                  <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Attribution &amp; ROI</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Search Console query telemetry, keyword difficulty gap models, and closed-loop GA4 revenue tracking. We eliminate marketing speculation with mathematically audited client dashboards.
                </p>
              </div>
              <div className="pt-6 border-t mt-6 flex items-center gap-2 text-xs font-bold text-[var(--accent-teal)]" style={{ borderColor: 'var(--border-card)' }}>
                <ShieldCheck size={14} />
                <span>520% ROI Audited in Production</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           03. AUDITED BENCHMARKS & GLOBAL FOOTPRINT
         ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-b" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>MEASURABLE TRACK RECORD</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Audited Production Benchmarks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: 520, suffix: '%', label: 'ROI Delivered in 90 Days', sub: 'TechFlow Solutions · $127K Revenue Linked' },
              { value: 65,  suffix: '%', label: 'Organic Traffic Lift', sub: 'The Scoove Africa · 3-Month Scale' },
              { value: 15,  suffix: '+', label: 'Hours Reclaimed Weekly', sub: 'Across Active Client Operations' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...stagger(i)}
                className="text-center p-8 rounded-2xl border shadow-sm"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-3 font-display" style={{ color: 'var(--accent-amber)' }}>
                  <NumberTicker value={stat.value} delay={0.2 + i * 0.15} className="text-5xl sm:text-6xl md:text-7xl font-bold font-display" />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs font-sans font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-body)' }}>{stat.label}</p>
                <p className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 pt-2" style={{ color: 'var(--text-muted)' }}>
            <Globe size={16} className="text-[var(--accent-teal)] shrink-0" />
            <span>Operating remotely from Nigeria with technology teams across the US, UK, Canada, and Europe.</span>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           04. VERIFIED TESTIMONIALS
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 overflow-visible border-b" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-12 overflow-visible">
          <motion.div {...fadeUp} className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>CLIENT ENDORSEMENTS</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Verified Client Words</h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans">
              Real feedback from founders, product managers, and marketing leaders who scaled with my systems.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="w-full">
            <OrbitalTestimonials
              testimonials={[
                {
                  headline: "Bright spirit & thorough researcher",
                  quote: "Emmanuel is a bright spirit with oozing positivity. Every time he submits work it's with a positive attitude and enthusiasm. He is thorough in his research and asks questions if he has any need to. I would be happy to work with him again in the future.",
                  name: "Brock Yates",
                  title: "Operational Project Manager, Mel Technologies LLC (Switzerland)",
                  image: "/images/testimonials/Brock.webp",
                  rating: 5
                },
                {
                  headline: "Great articles & solid search strategy",
                  quote: "Emmanuel delivered great articles and content workflows, taking his time to research the subject thoroughly before designing our search strategy. The better you guide and the more precise you describe your tasks, the better output you'll get.",
                  name: "Phillip Stemann",
                  title: "Founder, Planzer.io",
                  image: "/images/testimonials/Phillip.webp",
                  rating: 5
                },
                {
                  headline: "Exceptional systems & marketing builder",
                  quote: "Emmanuel is an exceptional systems builder and marketing architect. He built a content mapping database and automated syndication pipeline for us that drastically reduced our publishing overhead. His focus on data accuracy is something I really admire.",
                  name: "Daniel Olutoki",
                  title: "Retail Merchandiser, Xiaomi Nigeria",
                  image: "/images/testimonials/Daniel.webp",
                  rating: 5
                },
                {
                  headline: "Outstanding SEO & publishing workflows",
                  quote: "Emmanuel understands how to scale search engine visibility using technical SEO automation. He helped us research, optimize, and distribute articles using automated brand voice checks, guaranteeing speed without sacrificing editorial standards.",
                  name: "Adewunmi Adedayo",
                  title: "Journalist & SEO Content Writer",
                  image: "/images/testimonials/Adewunmi.webp",
                  rating: 5
                },
                {
                  headline: "Brilliant AI automation partner",
                  quote: "Emmanuel's approach to merging AI workflows with content strategy is brilliant. He doesn't just build scripts; he architects robust publishing engines using n8n and OpenAI that maintain brand voice at scale. His systems saved our team countless manual hours.",
                  name: "Nkemdirim Madueme",
                  title: "AI Automation Builder",
                  image: "/images/testimonials/Nkemdirim.webp",
                  rating: 5
                },
                {
                  headline: "Fast execution & distribution tech expert",
                  quote: "Emmanuel is an exceptional strategist who perfectly blends SEO and content automation. He designed a system to automate our organic marketing and social media publishing pipeline. He's fast, understands distribution tech deeply, and delivers outstanding results.",
                  name: "Esther Adeniji",
                  title: "Product Manager, UBA Group",
                  image: "/images/testimonials/Esther.webp",
                  rating: 5
                },
                {
                  headline: "Completely transformed our content pipeline",
                  quote: "Emmanuel completely transformed the content pipeline at Scoove Africa. By designing custom n8n workflows integrated with Make, he automated our entire publishing cycle, boosting traffic by 65% in 3 months. His deep understanding of technical SEO and automation is state of the art.",
                  name: "Olayiide Bolaji-Daniel",
                  title: "Senior Technical SEO Manager & CEO, Scoove Africa",
                  image: "/images/testimonials/Bolaji.webp",
                  rating: 5
                }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           05. OPERATING PRINCIPLES
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--accent-amber)' }}>CORE OPERATING CREED</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Working harder doesn't guarantee better results. <br />
              <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>Systems do.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent-amber)]">RULE 01</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Data Over Guesswork</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                Every marketing action starts with verified search intent, keyword difficulty models, and operational gap audits. We build what the market is already searching for.
              </p>
            </div>

            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--cta-blue)]">RULE 02</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Human Quality Guardrails</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                Automation never means generic machine slop. Our pipelines embed strict editorial quality gates, readability formulas, and human review steps to preserve brand voice.
              </p>
            </div>

            <div className="p-6 rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent-teal)]">RULE 03</span>
              <h4 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>Compounding Architecture</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                One article is an asset; twenty interconnected articles form an authority engine. We design modular systems where every published asset strengthens the whole domain.
              </p>
            </div>
          </div>

          <blockquote className="border-l-4 pl-6 py-2 max-w-3xl mx-auto" style={{ borderColor: 'var(--accent-amber)' }}>
            <p className="text-lg sm:text-xl italic leading-relaxed text-[var(--text-muted)] font-serif">
              "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
            </p>
            <cite className="block mt-2 text-xs font-mono font-bold not-italic text-[var(--text-muted)]">— PROVERBS 22:29</cite>
          </blockquote>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
           06. DEEP DIVE PORTAL CARDS (MY STORY & MY APPROACH)
         ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
          
          <motion.div {...fadeUp} className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>EXPLORE IN DEPTH</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Two Sides of the Same Coin
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans">
              Dive into the personal journey that forced me into systems, or inspect the technical framework that powers client results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: My Story */}
            <Link to="/my-story" className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-8 sm:p-10 rounded-2xl border shadow-sm flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                      THE NARRATIVE EVOLUTION
                    </span>
                    <div className="p-2.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-amber)' }}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold font-display group-hover:text-[var(--accent-amber)] transition-colors" style={{ color: 'var(--text-body)' }}>
                      My Story: The Writer Who Built a Machine
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-sans font-normal">
                      From studying Construction Economics in Osogbo to hitting the 24-hour freelance burnout ceiling—and the exact automation epiphany that changed everything.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Osogbo Roots', 'The 2:00 AM Ceiling', 'Automation Epiphany', 'Lessons Learned'].map((tag) => (
                      <span key={tag} className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t flex items-center justify-between text-xs font-bold text-[var(--accent-amber)] group-hover:translate-x-1 transition-transform" style={{ borderColor: 'var(--border-card)' }}>
                  <span>Read The Full Story</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>

            {/* Card 2: My Approach */}
            <Link to="/my-approach" className="group block">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-8 sm:p-10 rounded-2xl border shadow-sm flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-md"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}>
                      THE OPERATING SYSTEM
                    </span>
                    <div className="p-2.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--cta-blue)' }}>
                      <Target className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold font-display group-hover:text-[var(--cta-blue)] transition-colors" style={{ color: 'var(--text-body)' }}>
                      My Approach: Data, Systems &amp; Zero Guesswork
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-sans font-normal">
                      The engineering methodology behind 520% ROI. Explore the 4-phase operating framework: Telemetry audits, topic architecture, pipeline orchestration, and editorial guardrails.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Stack Telemetry', 'Topic Architecture', 'Pipeline Orchestration', 'Quality Guardrails'].map((tag) => (
                      <span key={tag} className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t flex items-center justify-between text-xs font-bold text-[var(--cta-blue)] group-hover:translate-x-1 transition-transform" style={{ borderColor: 'var(--border-card)' }}>
                  <span>Inspect The Methodology</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           07. FINAL ACTION CTA
         ═══════════════════════════════════════════ */}
      <section id="contact-cta" className="py-24 md:py-32 border-t" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          
          <motion.div {...fadeUp} className="space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>NEXT STEPS</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Ready to Turn Content Chaos into a Predictable Growth Engine?
            </h2>
            <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto font-sans font-normal">
              Book a zero-pressure 30-minute operational review. We will map your current manual bottlenecks and project your exact automation ROI.
            </p>
          </motion.div>

          <motion.div {...stagger(1)} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link 
              to="/contact"
              className="px-8 py-4 font-bold text-sm rounded-xl transition-all hover:brightness-110 flex items-center justify-center gap-3 shadow-lg"
              style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
            >
              Book Strategy Call <ArrowRight size={16} />
            </Link>
            <Link 
              to="/resume"
              className="px-8 py-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-3 border shadow-sm hover:brightness-105"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
            >
              View Full Resume
            </Link>
          </motion.div>
          
          <motion.div {...stagger(2)} className="flex justify-center flex-wrap items-center gap-8 text-xs font-sans font-bold uppercase tracking-widest pt-4" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2"><Mail size={14} style={{ color: 'var(--accent-amber)' }} /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} style={{ color: 'var(--accent-amber)' }} /> No pitch, just clear operational strategy</span>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
