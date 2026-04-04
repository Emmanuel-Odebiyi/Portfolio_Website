import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Mail,
  MessageSquare,
  BookOpen,
  Target
} from 'lucide-react';
import { SEO } from '../components/SEO';

export default function About() {
  const [hoverSide, setHoverSide] = useState<'burnout' | 'balance' | null>(null);
  
  return (
    <div className="pt-0 pb-20 bg-white">
      <SEO 
        title="About Emmanuel Odebiyi | From Burnout Writer to Marketing Automation Specialist"
        description="How I went from drowning in content deadlines to building AI-powered marketing systems that deliver 520% ROI. My story, methodology, and why it works."
        keywords="marketing automation expert, content automation specialist, AI content systems, SEO and content strategist Nigeria"
      />
      
      {/* Hero Section with Personal Narrative Image */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-zinc-950">
        
        {/* Background Image Layer - Shared Centered Base */}
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
          {/* Left/Top Half - Permanently Monochrome Burnout */}
          <div className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden">
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi Burnout" 
              animate={{ 
                opacity: hoverSide === 'burnout' ? 0.6 : 0.4
              }}
              style={{
                filter: `brightness(${hoverSide === 'burnout' ? 1.25 : 1.1}) contrast(1.5) grayscale(100%)`
              }}
              className="absolute left-0 top-0 h-[200%] w-full md:h-full md:w-[200%] max-w-none object-cover object-[center_15%] md:object-[25%_20%] transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-zinc-950/20 transition-opacity duration-700 ${hoverSide === 'burnout' ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Right/Bottom Half - Interactive Color Balance Reveal */}
          <div className="w-full h-1/2 md:w-1/2 md:h-full relative overflow-hidden">
            {/* Grayscale Base Image */}
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi Balance" 
              animate={{ opacity: hoverSide === 'balance' ? 0 : 0.4 }}
              style={{ filter: 'brightness(1.1) contrast(1.6) grayscale(100%)' }}
              className="absolute right-0 bottom-0 h-[200%] w-full md:h-full md:w-[200%] max-w-none object-cover object-[center_15%] md:object-[75%_20%] transition-all duration-1000"
            />
            {/* Color Overlay Revealed on Hover */}
            <motion.img 
              src="/about-transformation.jpg"
              alt="Emmanuel Odebiyi Balance Color" 
              animate={{ 
                opacity: hoverSide === 'balance' ? 0.9 : 0,
                scale: hoverSide === 'balance' ? 1.05 : 1
              }}
              style={{ 
                filter: `brightness(${hoverSide === 'balance' ? 0.8 : 1.1}) contrast(1.4)` 
              }}
              className="absolute right-0 bottom-0 h-[200%] w-full md:h-full md:w-[200%] max-w-none object-cover object-[center_15%] md:object-[75%_20%] transition-all duration-1000"
            />
            {/* Dramatically Darker Hover Overlay for Text Legibility */}
            <div className={`absolute inset-0 bg-zinc-950/40 transition-opacity duration-700 ${hoverSide === 'balance' ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-700 ${hoverSide === 'balance' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>

        {/* Global Halftone Pattern Overlay */}
        <div className="absolute inset-0 z-15 opacity-40 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        
        {/* Cinematic Narrative Split - Perfect Bottom Mirrors */}
        <div className="w-full max-w-[1500px] px-8 md:px-24 absolute inset-0 z-30 flex flex-col md:flex-row justify-between items-end pointer-events-none pb-24 md:pb-32">
          {/* Left Text Block: Burnout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-[35%] flex flex-col items-center md:items-start gap-4 text-center md:text-left"
          >
            <span className="text-[10px] md:text-[11px] font-mono text-zinc-400 tracking-[0.4em] uppercase">The Origin Story</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
              I Used to Be <br className="hidden md:block" /> the <br />
              <span className={`transition-all duration-700 line-through decoration-zinc-100 decoration-[6px] italic ${hoverSide === 'burnout' ? 'text-zinc-100 brightness-200' : 'text-zinc-400 brightness-100'}`}>Burnout.</span>
            </h1>
          </motion.div>

          {/* Right Text Block: The Machine */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-[35%] flex flex-col items-center md:items-end text-center md:text-right gap-6 mt-16 md:mt-0"
          >
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] italic transition-all duration-700 ${hoverSide === 'balance' ? 'text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'text-zinc-100'}`}>
              Now I Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 inline-block drop-shadow-sm brightness-125">The Machine.</span>
            </h2>
            <p className="text-sm md:text-lg text-zinc-300 font-medium max-w-[320px] leading-relaxed opacity-90">
              Transforming chaos into <strong className="text-blue-400 font-extrabold brightness-125">520% ROI</strong> through battle-tested automation.
            </p>
          </motion.div>
        </div>

        {/* Interactive Hover Coverage Overlays - Highest Z-Index for Total Response */}
        <div className="absolute inset-0 z-40 flex flex-col md:flex-row pointer-events-auto cursor-default">
           <div 
             className="w-full h-1/2 md:w-1/2 md:h-full" 
             onMouseEnter={() => setHoverSide('burnout')}
             onMouseLeave={() => setHoverSide(null)}
           />
           <div 
             className="w-full h-1/2 md:w-1/2 md:h-full" 
             onMouseEnter={() => setHoverSide('balance')}
             onMouseLeave={() => setHoverSide(null)}
           />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-blue-500 rounded-full" />
        </motion.div>
      </section>

      {/* Opening narrative block */}
      <section className="py-32 bg-white relative z-20">
        <div className="max-w-3xl mx-auto px-6 space-y-12 text-xl md:text-2xl text-zinc-600 font-light leading-relaxed">
          {[
            {
              content: "Most content marketers burn out trying to keep up. I burned out too — and then I reverse-engineered why, and built something better.",
              emphasis: true,
              dropCap: true
            },
            {
              content: "Growing businesses face a brutal contradiction: content marketing drives growth, but producing it consistently is expensive, time-consuming, and unsustainable. So most businesses are stuck choosing between doing it badly or not doing it at all.",
              emphasis: false
            },
            {
              content: "I solve that exact problem.",
              highlight: true
            },
            {
              content: "I design and build automated marketing systems that deliver enterprise-level content output — without the enterprise price tag, the management overhead, or the constant scramble to keep things moving.",
              point: "enterprise-level content output"
            },
            {
              content: "Marketing that runs while you build. That's what I create.",
              final: true
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
            >
              {item.dropCap ? (
                <p>
                  <span className="first-letter:text-7xl first-letter:font-black first-letter:text-zinc-900 first-letter:mr-3 first-letter:float-left">
                    {item.content}
                  </span>
                </p>
              ) : item.highlight ? (
                <p className="text-zinc-900 font-bold text-3xl md:text-4xl tracking-tight">
                  {item.content}
                </p>
              ) : item.final ? (
                <p className="text-brand-gradient font-black text-2xl md:text-3xl italic">
                  {item.content}
                </p>
              ) : (
                <p>
                  {item.point ? (
                    item.content.split(item.point).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <strong className="text-zinc-900 font-black underline decoration-indigo-500 decoration-2 underline-offset-4">{item.point}</strong>}
                      </React.Fragment>
                    ))
                  ) : item.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Large Premium journey Cards with Paper Texture */}
      <section className="py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "My Story",
                desc: "The journey from a writer to an automation specialist, and the lessons learned along the way.",
                href: "/about#story",
                icon: <BookOpen className="w-8 h-8" />,
                color: "bg-zinc-900",
                rotation: -1.5
              },
              {
                title: "My Approach",
                desc: "Data, Systems, and Zero Guesswork. The methodology behind the results.",
                href: "/about#approach",
                icon: <Target className="w-8 h-8" />,
                color: "bg-blue-950",
                rotation: 1.5
              }
            ].map((card) => (
              <Link key={card.title} to={card.href} className="group block perspective-2000">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: card.rotation }}
                  whileInView={{ opacity: 1, scale: 1, rotate: card.rotation }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotate: 0, 
                    y: -25, 
                    scale: 1.05,
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                  }}
                  className={`relative p-16 rounded-[4rem] ${card.color} border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] h-[650px] flex flex-col items-center text-center overflow-hidden transition-all duration-500`}
                >
                  {/* Premium Paper/Noise Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                  
                  {/* Internal Depth Glow */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white mb-12 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:scale-110">
                    {card.icon}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                    {card.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-[320px] mb-auto">
                    {card.desc}
                  </p>

                  {/* Reveal CTA */}
                  <div className="mt-12 flex items-center gap-4 text-white font-black text-[12px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                    Learn More <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-500" />
                  </div>

                  {/* Top Edge Polish */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-cta" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Next Steps</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-snug">Ready to Build <br/>Something That Works?</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Link 
              to="/resume"
              className="px-10 py-5 border-2 border-zinc-200 text-zinc-900 font-bold rounded-[2rem] hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
            >
              View My Resume <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact"
              className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-[2rem] hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-3"
            >
              Book Your Call <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="flex justify-center flex-wrap items-center gap-8 text-zinc-400 font-mono text-xs uppercase tracking-widest pt-8">
            <span className="flex items-center gap-2"><Mail size={14} className="text-brand-gradient" /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} className="text-brand-gradient" /> No pitch, just strategy</span>
          </div>
        </div>
      </section>
    </div>
  );
}
