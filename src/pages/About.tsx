import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Mail,
  MessageSquare,
  BookOpen,
  Target,
  Music,
  Tv,
  Lightbulb,
  Trophy,
  Quote
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { NumberTicker } from '../components/NumberTicker';
import { BlurFade } from '../components/ui/blur-fade';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { useTransform } from 'motion/react';
import { FramerTextReveal } from '../components/ui/framer-text-reveal';
import { TextRevealByWord } from '../components/ui/text-reveal';
import { TextEffect } from '../components/ui/text-effect';
import { ScrollMaskText } from '../components/animations/ScrollMaskText';

const STORY_TEXT = `I didn't grow up in Lagos. I grew up in Osogbo—solid city, great people, but not exactly the tech startup capital of Nigeria.\nI went to Obafemi Awolowo University to study Construction Economics. Safe choice. Practical degree.\nBut somewhere between structural analysis classes and building cost estimates, I discovered I had a knack for something completely different: writing words that made people want to read them.\nNot academic writing. The kind of writing that connects brands with real humans and turns strangers into customers.\nWhile my classmates were chasing construction internships, I was taking content writing gigs from anyone who'd pay me.\nAnd honestly? It was magic.`;

const StoryView = ({ progress }: { progress: any }) => {
  const progressWidth = useTransform(progress, [0.05, 0.8], ["0%", "100%"]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-50 rounded-[inherit]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-zinc-200 z-50">
        <motion.div style={{ width: progressWidth }} className="h-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
      </div>

      {/* Story Content — Framer Motion scroll and stagger matching responsive DOM height! */}
      <div className="px-6 md:px-12 lg:px-16 w-full h-full flex flex-col items-center justify-start overflow-hidden relative">
        {/* Miniature UI Logo — Positioned on the far left 'binding' side of the tab */}
        <div className="absolute top-[10%] left-[6%] md:left-[8%] z-50 pointer-events-none">
          <img
            src="/logo.svg"
            alt="Emmanuel Odebiyi Logo"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 opacity-100 select-none grayscale"
          />
        </div>

        <div className="max-w-2xl w-full h-full pb-4">
          <FramerTextReveal 
            text={STORY_TEXT}
            progress={progress}
            textClassName="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-sans leading-[2.1] lg:leading-[2.2] tracking-normal font-medium"
          />
        </div>
      </div>
      
      {/* Fades */}
      <div className="absolute top-0 left-0 w-full h-[6vh] md:h-[15vh] bg-gradient-to-b from-zinc-50 via-zinc-50/90 to-transparent z-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[6vh] md:h-[15vh] bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent z-40 pointer-events-none" />
    </div>
  );
};


/* ─── Fade-up animation variant ─── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "0px" } as any,
  transition: { duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9] as any },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * 0.1 },
});

export default function About() {
  return (
    <div className="pt-0 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="About Emmanuel Odebiyi | Automation Specialist"
        description="How I went from drowning in content deadlines to building AI-powered marketing systems that deliver 520% ROI. My story, methodology, and why it works."
        keywords="marketing automation expert, content automation specialist, AI content systems, SEO and content strategist Nigeria"
      />
      
      {/* ═══════════════════════════════════════════
           HERO SECTION
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[550px] sm:min-h-[600px] md:min-h-[750px] flex flex-col justify-end pb-10 sm:pb-12 md:pb-16 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
        
        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <img
            src="/images/about-hero-landscape.png"
            alt="Emmanuel Odebiyi Portrait"
            className="w-full h-full object-cover object-[50%_30%]"
            draggable={false}
          />
          {/* Subtle Halftone Overlay for premium print effect */}
          <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.22] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: 'radial-gradient(circle, #000 1.2px, transparent 1.2px)', backgroundSize: '6px 6px' }} />
          
          {/* Soft Blur overlay at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-36 backdrop-blur-[2px] pointer-events-none z-5" 
               style={{ 
                  maskImage: 'linear-gradient(to top, black, transparent)', 
                  WebkitMaskImage: 'linear-gradient(to top, black, transparent)' 
                }} />

          {/* Background Gradient Overlays for contrast & readability in light/dark themes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/55 to-transparent dark:from-[var(--bg-page)] dark:via-[var(--bg-page)]/80 dark:to-black/40 z-5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)]/20 via-transparent to-[var(--bg-page)]/20 z-5 pointer-events-none" />
        </div>

        {/* Floating Status Badge */}
        <div className="absolute left-6 md:left-12 lg:left-24 top-32 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold backdrop-blur-md shadow-lg"
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)', 
              borderColor: 'var(--border-card)', 
              color: 'var(--text-body)' 
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Automations</span>
          </motion.div>
        </div>

        {/* Content container aligned at the bottom */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 z-10 relative">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pointer-events-none">
            {/* Left - Headline */}
            <div className="lg:col-span-8 text-left space-y-4 pointer-events-auto">
              <h1 className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] font-black tracking-tight leading-[1.1] md:leading-[1.05] drop-shadow-sm" style={{ color: 'var(--text-body)' }}>
                Emmanuel is engineering <span className="text-brand-gradient">content marketing automation</span> systems that turn chaos into growth engines.
              </h1>
            </div>

            {/* Right - Bio & CTA */}
            <div className="lg:col-span-4 lg:col-start-9 text-left space-y-6 pointer-events-auto">
              <p className="text-xs sm:text-sm md:text-base lg:text-[1.05rem] font-medium leading-relaxed drop-shadow-sm" style={{ color: 'var(--text-muted)' }}>
                By integrating smart content workflows with systems built on n8n and Make, he constructs self-running pipelines that publish, distribute, and optimize content automatically.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#contact-cta"
                  className="px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: 'var(--text-body)', color: 'var(--bg-page)' }}
                >
                  Email Me
                </a>
                <Link 
                  to="/portfolio"
                  className="px-6 py-3 rounded-full font-bold text-sm tracking-wide border hover:bg-[var(--bg-surface-alt)] transition-all"
                  style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 1 — "Hey, I'm Emmanuel." (dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20" style={{ backgroundColor: 'var(--bg-page)' }}>
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <div className="min-h-[140px] flex flex-col justify-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center sm:text-left text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight"
              style={{ color: 'var(--text-body)' }}
            >
              Hey, I'm Emmanuel.
            </motion.h2>
            <BlurFade delay={0.5} yOffset={20}>
              <p className="text-xl md:text-2xl font-light leading-relaxed mt-6" style={{ color: 'var(--text-muted)' }}>
                I automate content marketing for businesses that are tired of the chaos.
              </p>
            </BlurFade>
          </div>

          {/* Empathy pull-quote */}
          <blockquote className="border-l-4 pl-6 py-2 text-lg md:text-xl italic leading-relaxed mt-10" style={{ borderColor: 'var(--accent-amber)', color: 'var(--text-muted)' }}>
            <ScrollMaskText text="You know the feeling—it's Sunday night, you're staring at a blank document that should've been written three days ago, and you're wondering why something that's supposed to drive growth feels more like drowning in quicksand." />
          </blockquote>

          <p className="text-lg md:text-xl font-light leading-relaxed mt-10" style={{ color: 'var(--text-muted)' }}>
            <ScrollMaskText text="I've been there. Actually lived there for years." />
          </p>

          <motion.p {...stagger(4)} className="text-2xl md:text-3xl font-bold tracking-tight mt-10" style={{ color: 'var(--text-body)' }}>
            Now? I build the <span className="italic" style={{ color: 'var(--accent-amber)' }}>systems</span> that got me out—and I build them for businesses like yours.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 2 — Proof Bar
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-body)' }}>
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {/* Section Label */}
          <motion.div {...fadeUp} className="text-center space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>The Short Version</span>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
              I help growing businesses <span className="font-semibold" style={{ color: 'var(--text-body)' }}>(5–50 people, $500K–$10M revenue)</span> automate their content marketing so they can stop managing chaos and start seeing predictable results.
            </p>
          </motion.div>

          {/* Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: 520, suffix: '%', label: 'ROI Delivered', sub: 'TechFlow Solutions · 90 days' },
              { value: 65,  suffix: '%', label: 'Traffic Growth', sub: 'The Scoove Africa · 3 months' },
              { value: 15,  suffix: '+', label: 'Hours Saved Weekly', sub: 'Average across all clients' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...stagger(i)}
                className="text-center p-8 rounded-3xl border transition-all duration-500"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-6xl md:text-8xl font-black leading-none mb-3 font-display" style={{ color: 'var(--accent-amber)' }}>
                  <NumberTicker value={stat.value} delay={0.3 + i * 0.2} className="text-6xl md:text-8xl font-black font-display" />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm font-sans font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.sub}</p>
              </motion.div>
            ))}
          </div>



          {/* Global Badge */}
          <motion.p {...fadeUp} className="text-center text-sm md:text-base font-medium tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Working remotely from Nigeria with businesses globally — US, UK, Canada, and beyond. <br className="hidden md:block" />
            <span className="font-bold block mt-2 text-lg" style={{ color: 'var(--text-body)' }}>Time zones don't matter when you build systems that run 24/7.</span>
          </motion.p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 3 — Origin Story (Immersive Sticky)
      ═══════════════════════════════════════════ */}
      <section className="relative z-[400] bg-transparent">
        <ContainerScroll
          titleComponent={
            <>
              <motion.div {...fadeUp} className="space-y-4 mb-8">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">The Origin</span>
                <h2 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                  How a Kid from Osogbo <br />
                  <span className="text-blue-600">Ended Up Here</span>
                </h2>
              </motion.div>
            </>
          }
        >
          {(scrollYProgress) => (
             <StoryView progress={scrollYProgress} />
          )}
        </ContainerScroll>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 4 — Breaking Point
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-sans font-bold text-red-500/80 uppercase tracking-[0.3em]">The Breaking Point</span>
            <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight" style={{ color: 'var(--text-body)' }}>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              The Part Where It All Falls Apart
            </motion.span>
          </h2>
          </motion.div>

          <p className="text-lg md:text-xl font-light leading-relaxed mt-10" style={{ color: 'var(--text-muted)' }}>
            <ScrollMaskText text="The work never stops. The budgets never match the effort. And the pressure? Relentless." />
          </p>

          <p className="text-lg md:text-xl font-light leading-relaxed mt-10" style={{ color: 'var(--text-muted)' }}>
            <ScrollMaskText text="I'd have clients wanting 10 blog posts by Friday with a budget that barely covered research for one. I'd spend 8 hours crafting the perfect piece, only to have the client ghost when it was time to pay." />
          </p>

          <p className="text-lg md:text-xl font-light leading-relaxed mt-10" style={{ color: 'var(--text-muted)' }}>
            <ScrollMaskText text="Because there were only 24 hours in a day. And I was already using most of them." />
          </p>

          {/* 2AM Pull-Quote — full-bleed sticky text reveal */}
          <div className="-mx-6 lg:-mx-24 mt-20 mb-8">
            <div className="flex items-center gap-3 mb-8 px-6 lg:px-0">
              <div className="w-6 h-px bg-red-400/60" />
              <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-[0.4em]">2:00 AM</span>
            </div>
            <TextRevealByWord
              text="I remember writing at 2 AM because it was the only quiet time I had. I remember choosing between sleep and deadlines. Deadlines always won."
              className="h-[180vh]"
              textClassName="text-2xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-tight"
            />
          </div>

          <motion.p {...stagger(5)} className="text-lg md:text-xl font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <span className="font-black" style={{ color: '#dc2626' }}>The irony?</span> My clients were drowning in the exact same struggle.
          </motion.p>

          {/* Full-width dark callout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-10 px-8 rounded-2xl text-center border"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ color: 'var(--text-body)' }}>
              We were all trapped in the same broken system.
            </p>
          </motion.div>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 5 — The Pivot Moment
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-y" style={{ backgroundColor: 'var(--bg-surface-alt)', color: 'var(--text-body)', borderColor: 'var(--border-card)' }}>
        <article className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--accent-amber)' }}>The Moment Everything Changed</span>
            <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-[0.85]" style={{ color: 'var(--text-body)' }}>
              November 2022.<br />
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>ChatGPT launched.</span>
            </h2>
          </motion.div>

          <motion.p {...stagger(1)} className="text-lg md:text-xl font-light leading-relaxed text-center max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Half the writers I knew panicked. "AI is going to replace us!" I had a different thought:
          </motion.p>

          {/* Pivotal Question */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display italic text-center leading-tight py-6"
            style={{ color: 'var(--accent-amber)' }}
          >
            "Wait... could this actually solve my&nbsp;problem?"
          </motion.p>

          <motion.p {...stagger(2)} className="text-lg md:text-xl font-light leading-relaxed text-center max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            My problem wasn't lack of skill. <span className="font-semibold" style={{ color: 'var(--text-body)' }}>It was lack of scale.</span>
          </motion.p>

          {/* Mindset Shift Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <motion.div 
              {...stagger(3)}
              className="p-8 rounded-2xl border space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <span className="text-xs font-sans font-bold text-red-500/80 uppercase tracking-widest">Old Thinking</span>
              <p className="text-xl md:text-2xl font-bold italic leading-snug" style={{ color: 'var(--text-muted)' }}>"How do I write faster?"</p>
              <p className="text-xl md:text-2xl font-bold italic leading-snug" style={{ color: 'var(--text-muted)' }}>"How do I manage more clients?"</p>
            </motion.div>
            <motion.div 
              {...stagger(4)}
              className="p-8 rounded-2xl border space-y-4"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent-amber)' }}
            >
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>New Thinking</span>
              <p className="text-xl md:text-2xl font-bold italic leading-snug" style={{ color: 'var(--text-body)' }}>"How do I build systems that write automatically?"</p>
              <p className="text-xl md:text-2xl font-bold italic leading-snug" style={{ color: 'var(--text-body)' }}>"How do I build systems that manage themselves?"</p>
            </motion.div>
          </div>

          <motion.p {...stagger(5)} className="text-center text-2xl md:text-3xl font-bold font-display italic pt-4" style={{ color: 'var(--accent-amber)' }}>
            That shift changed everything.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 6 — Testimonials
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>What People Say</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Real words from real people.</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                quote: "Emmanuel is a bright spirit with oozing positivity. Everytime he submits work it's with a positive attitude and enthusiasm. He is thorough in his research and asks questions if he has any need to. I would be happy to work with him again in the future and I believe anyone else who gets the opportunity to as well is lucky.",
                name: "Brock Yates",
                title: "Operational Project Manager, Mel Technologies LLC (Switzerland)",
                image: "/images/testimonials/Brock.jpg"
              },
              {
                quote: "Emmanuel delivered great articles and content workflows, taking his time to research the subject thoroughly before designing our search strategy. The better you guide and the more precise you describe your tasks, the better output you'll get. Thank you, Emmanuel.",
                name: "Phillip Stemann",
                title: "Founder, Planzer.io",
                image: "/images/testimonials/Phillip.jpg"
              },
              {
                quote: "Emmanuel is an exceptional systems builder and marketing architect. He built a content mapping database and automated syndication pipeline for us that drastically reduced our publishing overhead. His focus on data accuracy and quality assurance is something I really admire. Highly recommended!",
                name: "Daniel Olutoki",
                title: "Retail Merchandiser, Xiaomi Nigeria",
                image: "/images/testimonials/Daniel.jpg"
              },
              {
                quote: "Emmanuel understands how to scale search engine visibility using technical SEO automation. He helped us research, optimize, and distribute articles using automated brand voice checks, guaranteeing speed without sacrificing editorial standards. He is outstanding at building workflows that deliver.",
                name: "Adewunmi Adedayo",
                title: "Journalist & SEO Content Writer",
                image: "/images/testimonials/Adewunmi.jpg"
              },
              {
                quote: "Emmanuel's approach to merging AI workflows with content strategy is brilliant. He doesn't just build scripts; he architects robust publishing engines using n8n and OpenAI that maintain brand voice at scale. His systems saved our team countless manual hours. An invaluable automation partner!",
                name: "Nkemdirim Madueme",
                title: "AI Automation Builder",
                image: "/images/testimonials/Nkemdirim.jpg"
              },
              {
                quote: "Emmanuel is an exceptional strategist who perfectly blends SEO and content automation. He designed a system to automate our organic marketing and social media publishing pipeline. He's fast, understands distribution tech deeply, and delivers outstanding results. I'd recommend him to any growth team!",
                name: "Esther Adeniji",
                title: "Product Manager, UBA Group",
                image: "/images/testimonials/Esther.jpg"
              },
              {
                quote: "Emmanuel is a brilliant system developer and content architect. He built a custom workflow that allows us to generate, edit, and publish high-quality 2,000 to 5,000-word guides with perfect SEO integration. The traffic results are compounding, and the system runs smoothly.",
                name: "Taiwo Sotikare",
                title: "CEO, Business World Africa",
                image: "/images/testimonials/Taiwo.jpg"
              },
              {
                quote: "Emmanuel completely transformed the content pipeline at Scoove Africa. By designing custom n8n workflows integrated with Make, he automated our entire publishing cycle, boosting traffic by 65% in 3 months. His deep understanding of technical SEO and automation is state of the art.",
                name: "Olayiide Bolaji-Daniel",
                title: "Senior Technical SEO Manager, 360⁰ Growth Hacking & CEO, Scoove Africa",
                image: "/images/testimonials/Bolaji.jpg"
              }
            ].map((testimonial, i) => (
              <motion.figure
                key={testimonial.name}
                {...stagger(i)}
                className="relative rounded-3xl border p-8 md:p-10 transition-all duration-500"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <Quote className="absolute top-6 right-8 w-10 h-10" style={{ color: 'var(--border-card)' }} />
                <blockquote className="text-lg md:text-xl font-light leading-relaxed mb-6 relative z-10 mt-6" style={{ color: 'var(--text-muted)' }}>
                  <ScrollMaskText text={`"${testimonial.quote}"`} />
                </blockquote>
                <figcaption className="flex items-center gap-3 text-left">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full object-cover border" 
                      style={{ borderColor: 'var(--border-card)' }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--accent-amber)', color: '#fff' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-bold" style={{ color: 'var(--text-body)' }}>{testimonial.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{testimonial.title}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 7 — What I Believe
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-y" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)', borderColor: 'var(--border-card)' }}>
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--accent-amber)' }}>What I Believe</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight min-h-[100px]">
              <TextEffect per="word" preset="slide">
                Working harder doesn't guarantee better results.
              </TextEffect>
            </h2>
          </motion.div>

          <motion.p {...stagger(1)} className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I know. In a world obsessed with hustle culture, that sounds almost blasphemous. But I've seen it play out too many times. You can grind 80-hour weeks and get nowhere. Or you can build the right system and get exceptional results with 20 hours of focused work.
          </motion.p>

          <motion.p {...stagger(2)} className="text-2xl md:text-3xl font-bold font-display italic" style={{ color: 'var(--accent-amber)' }}>
            The difference isn't effort. It's systems.
          </motion.p>

          {/* Scripture */}
          <motion.blockquote {...stagger(3)} className="border-l-4 pl-6 py-3" style={{ borderColor: 'var(--accent-amber)' }}>
            <p className="text-xl md:text-2xl italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
            </p>
            <cite className="block mt-3 text-sm font-sans not-italic" style={{ color: 'var(--text-muted)' }}>— Proverbs 22:29</cite>
          </motion.blockquote>

          <motion.p {...stagger(4)} className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            My faith shapes how I work. I believe in doing exceptional work, using the gifts God's given me wisely, and serving others with integrity. That means building systems that genuinely work—not just collecting fees and disappearing.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 8 — Personal Life
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Beyond the Keyboard</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>When I'm not building systems.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Music className="w-6 h-6" />, title: 'Gospel Music', desc: "Not just any gospel—I'm particular about production quality. Good theology AND good sound engineering. Both matter." },
              { icon: <Tv className="w-6 h-6" />, title: 'Anime', desc: "Currently working through whatever series everyone says I need to see. I'm that person who gets recommendations 3 years late but binges them in a&nbsp;weekend." },
              { icon: <Lightbulb className="w-6 h-6" />, title: 'Learning', desc: "Last month it was motion graphics. This month, who knows. That learning obsession that drove me into automation? It hasn't stopped." },
              { icon: <Trophy className="w-6 h-6" />, title: 'Soccer', desc: "Because sitting at a laptop 12 hours a day needs balance. And because competitive sports teach you things about systems and teamwork that no course ever will." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden p-8 rounded-3xl border transition-all duration-300 cursor-default"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-6" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface-alt)', color: 'var(--accent-amber)' }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-body)' }}>{item.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: item.desc }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 9 — Where I'm Going
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg-page)' }}>
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Where I'm Going</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight" style={{ color: 'var(--text-body)' }}>
             <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
             >
               The Next Chapter
             </motion.span>
          </h2>
          </motion.div>

          <p className="text-lg md:text-xl font-light leading-relaxed mt-10" style={{ color: 'var(--text-muted)' }}>
            <ScrollMaskText text="Today, I build content marketing automation systems for businesses across continents. I'm certified in AI automation (n8n Academy), advanced SEO (Semrush), and marketing automation." />
          </p>

          {/* Certification badges */}
          <motion.div {...stagger(2)} className="flex flex-wrap gap-3">
            {['AI Automation · n8n', 'Advanced SEO · Semrush', 'Marketing Automation · Coursera', 'Prompt Engineering · LinkedIn'].map(cert => (
              <span key={cert} className="px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide border" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)', borderColor: 'var(--border-card)' }}>{cert}</span>
            ))}
          </motion.div>

          <motion.p {...stagger(3)} className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            But honestly? The metrics matter less than the mission. I get to solve the exact problem I once lived. The overwhelmed business owner juggling 47 priorities? <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>Been there.</strong> The person who knows what needs to happen but doesn't have bandwidth? <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>Lived that.</strong>
          </motion.p>

          <motion.div {...stagger(4)} className="space-y-6">
            <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong className="font-bold" style={{ color: 'var(--text-body)' }}>Future focus:</strong> I'm targeting opportunities with businesses in the US, UK, and Canada—operating at a global standard and working with companies pushing boundaries.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              I'm expanding into <strong className="font-bold italic" style={{ color: 'var(--accent-amber)' }}>motion graphics and 3D visualization</strong> for content marketing. Because the future of content isn't just written—it's visual, interactive, immersive.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              And I'm <strong className="font-bold italic" style={{ color: 'var(--accent-amber)' }}>building in public</strong>, sharing what I learn, showing other professionals what's possible when you combine traditional marketing skills with modern automation.
            </p>
          </motion.div>

          <motion.p {...stagger(5)} className="text-2xl md:text-3xl font-bold font-display italic tracking-tight pt-4" style={{ color: 'var(--text-body)' }}>
            Now I build the solution I wish I'd had back then.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          JOURNEY CARDS — My Story / My Approach
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center space-y-2 mb-16">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Want to Go Deeper?</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Explore the full picture.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "My Story",
                desc: "The journey from a writer to an automation specialist, and the lessons learned along the way.",
                href: "/my-story",
                icon: <BookOpen className="w-8 h-8" />,
                color: "bg-[#0B0F19]/80 backdrop-blur-md",
                rotation: -1.5
              },
              {
                title: "My Approach",
                desc: "Data, Systems, and Zero Guesswork. The methodology behind the results.",
                href: "/my-approach",
                icon: <Target className="w-8 h-8" />,
                color: "bg-[#0B0F19]/80 backdrop-blur-md",
                rotation: 1.5
              }
            ].map((card) => (
              <Link key={card.title} to={card.href} className="group block perspective-2000">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: card.rotation }}
                  whileInView={{ opacity: 1, scale: 1, rotate: card.rotation }}
                  viewport={{ once: true }}
                  whileHover={{ rotate: 0, y: -25, scale: 1.05, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
                  className={`relative p-16 rounded-[4rem] ${card.color} border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] h-[650px] flex flex-col items-center text-center overflow-hidden transition-all duration-500`}
                >
                  <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white mb-12 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">{card.title}</h3>
                  <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-[320px] mb-auto">{card.desc}</p>
                  <div className="mt-12 flex items-center gap-4 text-white font-black text-[12px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                    Learn More <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════ */}
      <section id="contact-cta" className="py-24 md:py-32 border-t" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <motion.div {...fadeUp} className="space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Next Steps</span>
            <h2 className="text-5xl md:text-6xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>Ready to Build <br/>Something That Works?</h2>
          </motion.div>

          <motion.div {...stagger(1)} className="flex flex-col sm:flex-row justify-center gap-8">
            <Link 
              to="/resume"
              className="px-10 py-5 font-bold rounded-[2rem] transition-all flex items-center justify-center gap-3 border"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-body)' }}
            >
              View My Resume <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact"
              className="px-10 py-5 font-bold rounded-[2rem] transition-all hover:brightness-110 flex items-center justify-center gap-3"
              style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
            >
              Book Your Call <ArrowRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div {...stagger(2)} className="flex justify-center flex-wrap items-center gap-8 text-xs font-sans font-bold uppercase tracking-widest pt-8" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-2"><Mail size={14} style={{ color: 'var(--accent-amber)' }} /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} style={{ color: 'var(--accent-amber)' }} /> No pitch, just strategy</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
