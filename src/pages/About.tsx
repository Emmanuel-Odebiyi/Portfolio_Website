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
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import { BlurFade } from '../components/ui/blur-fade';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { useTransform } from 'motion/react';
import { GSAPTextReveal } from '../components/ui/gsap-text-reveal';
import { Globe } from '../components/ui/globe';
import { TextRevealByWord } from '../components/ui/text-reveal';
import { TextEffect } from '../components/ui/text-effect';
import { KineticText } from '../components/animations/KineticText';
import { ScrollMaskText } from '../components/animations/ScrollMaskText';
import { GooeyText } from '../components/ui/gooey-text-morphing';

const STORY_TEXT = `I didn't grow up in Lagos. I grew up in Osogbo—solid city, great people, but not exactly the tech startup capital of Nigeria.\nI went to Obafemi Awolowo University to study Construction Economics. Safe choice. Practical degree.\nBut somewhere between structural analysis classes and building cost estimates, I discovered I had a knack for something completely different: writing words that made people want to read them.\nNot academic writing. The kind of writing that connects brands with real humans and turns strangers into customers.\nWhile my classmates were chasing construction internships, I was taking content writing gigs from anyone who'd pay me.\nAnd honestly? It was magic.`;

const StoryView = ({ progress }: { progress: any }) => {
  const progressWidth = useTransform(progress, [0.05, 0.8], ["0%", "100%"]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-50 rounded-[inherit]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-zinc-200 z-50">
        <motion.div style={{ width: progressWidth }} className="h-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
      </div>

      {/* Story Content — GSAP takes over the perfect internal scroll and stagger matching the real DOM height! */}
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
          <GSAPTextReveal 
            text={STORY_TEXT}
            textClassName="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] text-zinc-900 font-sans leading-[2] lg:leading-[2.2] tracking-normal font-medium"
          />
        </div>
      </div>
      
      {/* Fades */}
      <div className="absolute top-0 left-0 w-full h-[15vh] bg-gradient-to-b from-zinc-50 via-zinc-50/90 to-transparent z-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[15vh] bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent z-40 pointer-events-none" />
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
  const [hoverSide, setHoverSide] = useState<'burnout' | 'balance' | null>(null);
  
  return (
    <div className="pt-0 pb-20 bg-[#0B0F19] text-white min-h-screen">
      <SEO 
        title="About Emmanuel Odebiyi | Automation Specialist"
        description="How I went from drowning in content deadlines to building AI-powered marketing systems that deliver 520% ROI. My story, methodology, and why it works."
        keywords="marketing automation expert, content automation specialist, AI content systems, SEO and content strategist Nigeria"
      />
      
      {/* ═══════════════════════════════════════════
          HERO SECTION — Cinematic Split
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0 flex flex-row">
          {/* Left — Monochrome Burnout */}
          <div className="w-1/2 h-full relative overflow-hidden text-zinc-400">
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi — the burnout era" 
              animate={{ opacity: hoverSide === 'burnout' ? 0.6 : 0.4 }}
              style={{ filter: `brightness(${hoverSide === 'burnout' ? 1.25 : 1.1}) contrast(1.5) grayscale(100%)` }}
              className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover object-[38%_20%] md:object-[30%_20%] lg:object-[25%_20%] transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-zinc-950/20 transition-opacity duration-700 ${hoverSide === 'burnout' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          {/* Right — Color Reveal */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi — the balance era" 
              animate={{ opacity: hoverSide === 'balance' ? 0 : 0.4 }}
              style={{ filter: 'brightness(1.1) contrast(1.6) grayscale(100%)' }}
              className="absolute right-0 bottom-0 h-full w-[200%] max-w-none object-cover object-[62%_20%] md:object-[70%_20%] lg:object-[75%_20%] transition-all duration-1000"
            />
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi — in color" 
              animate={{ opacity: hoverSide === 'balance' ? 0.9 : 0, scale: hoverSide === 'balance' ? 1.05 : 1 }}
              style={{ filter: `brightness(${hoverSide === 'balance' ? 0.8 : 1.1}) contrast(1.4)` }}
              className="absolute right-0 bottom-0 h-full w-[200%] max-w-none object-cover object-[62%_20%] md:object-[70%_20%] lg:object-[75%_20%] transition-all duration-1000"
            />
            <div className={`absolute inset-0 bg-zinc-950/40 transition-opacity duration-700 ${hoverSide === 'balance' ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-700 ${hoverSide === 'balance' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
        {/* Halftone */}
        <div className="absolute inset-0 z-15 opacity-40 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        
        {/* Left and Right stacked/split text container */}
        <div className="absolute inset-x-0 bottom-20 md:bottom-28 lg:bottom-32 z-30 px-6 md:px-12 lg:px-24 pointer-events-none flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-0">
          {/* Left Text — Origin Story */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2 lg:gap-4 text-left pointer-events-none max-w-lg"
          >
            <span className="text-[10px] md:text-[11px] font-mono text-gray-300 tracking-[0.4em] uppercase">The Origin Story</span>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] md:leading-[0.85] drop-shadow-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block"
              >
                I Used to Be
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block"
              >
                the
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className={`block transition-all duration-700 line-through decoration-zinc-100 decoration-[6px] italic ${hoverSide === 'burnout' ? 'text-zinc-100' : 'text-zinc-400'}`}
              >
                Burnout.
              </motion.span>
            </h1>
          </motion.div>

          {/* Right Text — Now I Build The Machine */}
          <div className="flex flex-col items-end gap-2 lg:gap-3 text-right pointer-events-none max-w-lg">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] italic transition-all duration-700 ${hoverSide === 'balance' ? 'text-white' : 'text-zinc-100'}`}
            >
              Now I Build
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] italic text-blue-400"
            >
              The Machine.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-xs md:text-sm lg:text-base text-zinc-300 font-medium max-w-[280px] md:max-w-[320px] leading-relaxed mt-1"
            >
              Transforming chaos into <strong className="text-blue-400 font-extrabold">520% ROI</strong> through battle-tested automation.
            </motion.p>
          </div>
        </div>

        {/* Hover Zones */}
        <div className="absolute inset-0 z-40 flex flex-row pointer-events-auto cursor-default">
           <div className="w-1/2 h-full" onMouseEnter={() => setHoverSide('burnout')} onMouseLeave={() => setHoverSide(null)} />
           <div className="w-1/2 h-full" onMouseEnter={() => setHoverSide('balance')} onMouseLeave={() => setHoverSide(null)} />
        </div>
        {/* Scroll Indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2 z-50">
          <div className="w-1 h-2 bg-blue-500 rounded-full" />
        </motion.div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 1 — "Hey, I'm Emmanuel." (dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0B0F19] relative z-20">
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <div className="min-h-[140px] flex flex-col justify-start">
            <TypewriterEffect 
              words={[{ text: "Hey," }, { text: "I'm" }, { text: "Emmanuel." }]} 
              className="text-left text-4xl md:text-5xl font-black text-white tracking-tight leading-tight" 
              cursorClassName="bg-blue-500 h-8 md:h-12" 
            />
            <BlurFade delay={0.8} yOffset={20}>
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mt-6">
                I automate content marketing for businesses that are tired of the chaos.
              </p>
            </BlurFade>
          </div>

          {/* Empathy pull-quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 text-lg md:text-xl text-gray-400 italic leading-relaxed mt-10">
            <ScrollMaskText text="You know the feeling—it's Sunday night, you're staring at a blank document that should've been written three days ago, and you're wondering why something that's supposed to drive growth feels more like drowning in quicksand." />
          </blockquote>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mt-10">
            <ScrollMaskText text="I've been there. Actually lived there for years." />
          </p>

          <motion.p {...stagger(4)} className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-10">
            Now? I build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">systems</span> that got me out—and I build them for businesses like yours.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 2 — Proof Bar
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-950/40 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {/* Section Label */}
          <motion.div {...fadeUp} className="text-center space-y-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">The Short Version</span>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              I help growing businesses <span className="text-white font-semibold">(5–50 people, $500K–$10M revenue)</span> automate their content marketing so they can stop managing chaos and start seeing predictable results.
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
                className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-xl"
              >
                <motion.div 
                  animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl md:text-8xl font-black text-transparent bg-[length:200%_auto] bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-200 to-indigo-600 leading-none mb-3 drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <NumberTicker value={stat.value} delay={0.3 + i * 0.2} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-inherit" />
                  <span>{stat.suffix}</span>
                </motion.div>
                <p className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-xs text-gray-300">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* 3D Globe — between stats and global text */}
          <div className="relative w-full py-12">
            <Globe />
          </div>

          {/* Global Badge */}
          <motion.p {...fadeUp} className="text-center text-sm md:text-base font-semibold text-gray-300 tracking-wider">
            Working remotely from Nigeria with businesses globally — US, UK, Canada, and beyond. <br className="hidden md:block" />
            <span className="text-white font-bold block mt-2 text-lg">Time zones don't matter when you build systems that run 24/7.</span>
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
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight">
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
      <section className="py-24 md:py-32 bg-[#0B0F19] border-t border-white/10">
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-mono text-red-400/80 uppercase tracking-[0.3em]">The Breaking Point</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
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

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mt-10">
            <ScrollMaskText text="The work never stops. The budgets never match the effort. And the pressure? Relentless." />
          </p>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mt-10">
            <ScrollMaskText text="I'd have clients wanting 10 blog posts by Friday with a budget that barely covered research for one. I'd spend 8 hours crafting the perfect piece, only to have the client ghost when it was time to pay." />
          </p>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mt-10">
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
              textClassName="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            />
          </div>

          <motion.p {...stagger(5)} className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
            <span className="text-red-600 font-black">The irony?</span> My clients were drowning in the exact same struggle.
          </motion.p>

          {/* Full-width dark callout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 text-white py-10 px-8 rounded-2xl text-center border border-white/10 backdrop-blur-md"
          >
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              We were all trapped in the same broken system.
            </p>
          </motion.div>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 5 — The Pivot Moment
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-950/40 text-white border-y border-white/10">
        <article className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-4">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-[0.3em]">The Moment Everything Changed</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
              November 2022.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">ChatGPT launched.</span>
            </h2>
          </motion.div>

          <motion.p {...stagger(1)} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
            Half the writers I knew panicked. "AI is going to replace us!" I had a different thought:
          </motion.p>

          {/* Pivotal Question */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -5 }}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
            className="text-3xl md:text-4xl lg:text-5xl font-black italic text-center text-blue-600 drop-shadow-sm leading-tight py-6"
          >
            "Wait... could this actually solve my&nbsp;problem?"
          </motion.p>

          <motion.p {...stagger(2)} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed text-center max-w-2xl mx-auto">
            My problem wasn't lack of skill. <span className="text-white font-semibold">It was lack of scale.</span>
          </motion.p>

          {/* Mindset Shift Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <motion.div 
              {...stagger(3)}
              className="p-8 rounded-2xl bg-white/5 border border-red-500/20 shadow-xl backdrop-blur-md space-y-4"
            >
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Old Thinking</span>
              <p className="text-xl md:text-2xl font-bold text-gray-300 italic leading-snug">"How do I write faster?"</p>
              <p className="text-xl md:text-2xl font-bold text-gray-300 italic leading-snug">"How do I manage more clients?"</p>
            </motion.div>
            <motion.div 
              {...stagger(4)}
              className="p-8 rounded-2xl bg-white/5 border border-blue-500/20 ring-1 ring-blue-500/10 shadow-xl backdrop-blur-md space-y-4"
            >
              <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">New Thinking</span>
              <p className="text-xl md:text-2xl font-bold text-white italic leading-snug">"How do I build systems that write automatically?"</p>
              <p className="text-xl md:text-2xl font-bold text-white italic leading-snug">"How do I build systems that manage themselves?"</p>
            </motion.div>
          </div>

          <div className="h-[200px] md:h-[250px] flex items-center justify-center my-12 w-full overflow-hidden relative">
            <GooeyText 
              texts={["Writing Articles", "Building Engines", "Trading Time", "Scaling Impact", "Freelancer", "Automator"]} 
              textClassName="text-white font-black italic tracking-tighter text-4xl md:text-6xl lg:text-7xl drop-shadow-sm"
              morphTime={1.2}
              cooldownTime={1.5}
            />
          </div>
          <motion.p {...stagger(5)} className="text-center text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 pt-4">
            That shift changed everything.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 6 — Testimonials
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">What People Say</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Real Words from Real People</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                quote: "Emmanuel is a vast dynamic copywriter with a wealth of profound experience. While working with him, he was all about delivering the best possible quality and nothing less. His ability to make ethical research to input correct data is something I really admire. He's worth your money!",
                name: "Daniel Olutoki",
                title: "Retail Merchandiser, Xiaomi Nigeria"
              },
              {
                quote: "Emmanuel is a great writer. He carefully and strategically researches his content. He executes his tasks excellently. Emmanuel is also best when it comes to meeting deadlines, as he works hard to make sure his clients are satisfied. I highly recommend Emmanuel as a Professional Content Writer.",
                name: "Adewunmi Adedayo",
                title: "Journalist & SEO Content Writer"
              },
              {
                quote: "Emmanuel is a very creative and talented writer who puts in great amount of work and effort in anything that he does. His ability to pull in the attention of his audience through his words is second to none. Time after time, he has produced high quality work. His reliability and adaptability makes him great to work with.",
                name: "Nkemdirim Madueme",
                title: "AI Automation Builder"
              }
            ].map((testimonial, i) => (
              <motion.figure
                key={testimonial.name}
                {...stagger(i)}
                className="relative rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 hover:border-white/20 hover:shadow-2xl transition-all duration-500"
              >
                <Quote className="absolute top-6 right-8 w-10 h-10 text-white/10" />
                <blockquote className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-6 relative z-10 mt-6">
                  <ScrollMaskText text={`"${testimonial.quote}"`} />
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
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
      <section className="py-24 md:py-32 bg-[#0B0F19] text-white border-y border-white/10">
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 uppercase tracking-[0.3em]">What I Believe</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight min-h-[100px]">
              <TextEffect per="word" preset="slide">
                Working harder doesn't guarantee better results.
              </TextEffect>
            </h2>
          </motion.div>

          <motion.p {...stagger(1)} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            I know. In a world obsessed with hustle culture, that sounds almost blasphemous. But I've seen it play out too many times. You can grind 80-hour weeks and get nowhere. Or you can build the right system and get exceptional results with 20 hours of focused work.
          </motion.p>

          <motion.p {...stagger(2)} className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
            The difference isn't effort. It's systems.
          </motion.p>

          {/* Scripture */}
          <motion.blockquote {...stagger(3)} className="border-l-4 border-blue-500 pl-6 py-3">
            <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed">
              "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
            </p>
            <cite className="block mt-3 text-sm font-mono text-gray-400 not-italic">— Proverbs 22:29</cite>
          </motion.blockquote>

          <motion.p {...stagger(4)} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            My faith shapes how I work. I believe in doing exceptional work, using the gifts God's given me wisely, and serving others with integrity. That means building systems that genuinely work—not just collecting fees and disappearing.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 8 — Personal Life
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-950/40 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">Beyond the Keyboard</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">When I'm Not Building Systems</h2>
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
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
                className="relative overflow-hidden p-8 rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 group shadow-xl hover:shadow-2xl hover:border-white/20 hover:shadow-blue-500/10 cursor-default backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-gray-300 group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-colors duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-300">{item.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 9 — Where I'm Going
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0B0F19]">
        <article className="max-w-3xl mx-auto px-6 space-y-10">
          <motion.div {...fadeUp} className="space-y-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">Where I'm Going</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
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

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mt-10">
            <ScrollMaskText text="Today, I build content marketing automation systems for businesses across continents. I'm certified in AI automation (n8n Academy), advanced SEO (Semrush), and marketing automation." />
          </p>

          {/* Certification badges */}
          <motion.div {...stagger(2)} className="flex flex-wrap gap-3">
            {['AI Automation · n8n', 'Advanced SEO · Semrush', 'Marketing Automation · Coursera', 'Prompt Engineering · LinkedIn'].map(cert => (
              <span key={cert} className="px-4 py-2 rounded-full bg-white/5 text-gray-300 text-xs font-mono tracking-wide border border-white/10 backdrop-blur-sm">{cert}</span>
            ))}
          </motion.div>

          <motion.p {...stagger(3)} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            But honestly? The metrics matter less than the mission. I get to solve the exact problem I once lived. The overwhelmed business owner juggling 47 priorities? <strong className="text-white font-semibold">Been there.</strong> The person who knows what needs to happen but doesn't have bandwidth? <strong className="text-white font-semibold">Lived that.</strong>
          </motion.p>

          <motion.div {...stagger(4)} className="space-y-6">
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              <strong className="text-white font-bold">Future focus:</strong> I'm targeting opportunities with businesses in the US, UK, and Canada—operating at a global standard and working with companies pushing boundaries.
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              I'm expanding into <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 font-bold">motion graphics and 3D visualization</strong> for content marketing. Because the future of content isn't just written—it's visual, interactive, immersive.
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              And I'm <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 font-bold">building in public</strong>, sharing what I learn, showing other professionals what's possible when you combine traditional marketing skills with modern automation.
            </p>
          </motion.div>

          <motion.p {...stagger(5)} className="text-2xl md:text-3xl font-black italic text-white tracking-tight pt-4">
            Now I build the solution I wish I'd had back then.
          </motion.p>
        </article>
      </section>


      {/* ═══════════════════════════════════════════
          JOURNEY CARDS — My Story / My Approach
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0B0F19] relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center space-y-2 mb-16">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">Want to Go Deeper?</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Explore the Full Picture</h2>
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
      <section id="contact-cta" className="py-24 md:py-32 bg-zinc-950/50 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <motion.div {...fadeUp} className="space-y-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em]">Next Steps</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-snug">Ready to Build <br/>Something That Works?</h2>
          </motion.div>

          <motion.div {...stagger(1)} className="flex flex-col sm:flex-row justify-center gap-8">
            <Link 
              to="/resume"
              className="px-10 py-5 border border-white/20 text-white font-bold rounded-[2rem] hover:bg-white/10 bg-white/5 transition-all flex items-center justify-center gap-3"
            >
              View My Resume <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact"
              className="px-10 py-5 bg-brand-gradient text-zinc-900 font-bold rounded-[2rem] hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3"
            >
              Book Your Call <ArrowRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div {...stagger(2)} className="flex justify-center flex-wrap items-center gap-8 text-gray-400 font-mono text-xs uppercase tracking-widest pt-8">
            <span className="flex items-center gap-2"><Mail size={14} className="text-brand-gradient" /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} className="text-brand-gradient" /> No pitch, just strategy</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
