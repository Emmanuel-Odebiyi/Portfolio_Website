import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ArrowRight, Zap, PenTool, Bot, Rocket, Search, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function MyStory() {
  return (
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-32 pb-24 max-w-6xl mx-auto px-6">
        
        {/* Nav */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link to="/about" className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to About
          </Link>
        </motion.div>
        
        {/* Hero Section */}
        <div className="mb-24 md:mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] uppercase text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient animate-pulse" />
            The Origin Story
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white mb-8"
          >
            From Writer to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400">
              Automation Architect.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl"
          >
            I went from drowning in deadlines to designing automated marketing engines that deliver 520% ROI — and now I build them for businesses like yours.
          </motion.p>
        </div>

        {/* Story Timeline Steps */}
        <div className="space-y-24 md:space-y-32 relative">
          
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-0 left-[2.5rem] w-px h-full bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent -z-10" />

          {/* Chapter 1 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-24 shrink-0 flex items-start justify-start">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-xl flex items-center justify-center text-blue-400 backdrop-blur-md">
                <PenTool size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 01 — The Hustle</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Falling in love with words and running into walls.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                I fell in love with writing right after secondary school. The idea that words could connect brands with the right people, earn trust, and drive real business outcomes — that felt like something worth mastering.
                <br /><br />
                <strong className="text-white font-semibold">Reality hit hard.</strong>
                <br /><br />
                Budgets that didn't match the work. Clients who needed high volumes of content but couldn't afford the traditional way of getting it. Quality expectations that demanded more hours than were on the invoice. Constant deadline pressure with no sustainable system underneath any of it.
                <br /><br />
                <span className="text-blue-400 font-medium italic">"I was living the exact problem I now solve."</span>
              </p>
            </div>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-24 shrink-0 flex items-start justify-start">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-xl flex items-center justify-center text-amber-400 backdrop-blur-md">
                <Search size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 02 — The Pattern</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">The pattern I couldn't ignore.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                As more projects came in, something became impossible to miss: Every business knew content worked. Every business struggled to do it consistently. 
                <br /><br />
                Freelancers were unreliable. Agencies were out of budget. Doing it in-house meant burning out the best people. And doing it yourself meant it never got done.
                <br /><br />
                <strong className="text-white font-semibold underline decoration-blue-500/50 underline-offset-4">The problem wasn't effort. The problem was that no one had built a real system.</strong>
              </p>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="w-full max-w-4xl mx-auto rounded-[2.5rem] bg-white/5 border border-white/10 p-4 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand-gradient/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="aspect-video rounded-[2rem] overflow-hidden bg-black">
              <video 
                src="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-24 shrink-0 flex items-start justify-start">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-xl flex items-center justify-center text-indigo-400 backdrop-blur-md">
                <Bot size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 03 — The Turning Point</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">When I stopped fearing AI and started building with it.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                When AI tools emerged, most content writers panicked. <strong className="text-white">I saw an opportunity.</strong>
                <br /><br />
                What if you could combine AI's speed and scale with human strategy, brand understanding, and systematic processes? What if you could build something that actually ran — reliably, consistently, without constant babysitting?
                <br /><br />
                That question changed everything.
              </p>
            </div>
          </motion.div>

          {/* Chapter 4 — Expertise Grid */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-24 shrink-0 flex items-start justify-start">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-xl flex items-center justify-center text-teal-400 backdrop-blur-md">
                <Zap size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 04 — The Build</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Three years of building — so you don't have to.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                I spent the next three years mastering the exact skills that make this possible:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 max-w-4xl">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Globe size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">SEO Expertise</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Not just writing, but making it discoverable. Topic cluster architecture and SERP analysis to ensure content doesn't just exist — it ranks.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Cpu size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">AI Implementation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Building complete AI-powered systems. Prompt engineering and automated quality control that actually works at scale.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 md:col-span-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Bot size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Process Automation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    n8n, Zapier, Make, and REST APIs. Building complete marketing ecosystems that run like clockwork, with or without you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chapter 5 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16"
          >
            <div className="md:w-24 shrink-0 flex items-start justify-start">
              <div className="w-20 h-20 rounded-3xl bg-brand-gradient shadow-xl flex items-center justify-center text-white backdrop-blur-md">
                <Rocket size={32} />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 05 — The Mission</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">On a clear mission.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                I'm giving growing businesses access to the kind of marketing infrastructure that used to be reserved for companies with million-dollar budgets.
                <br /><br />
                <span className="text-2xl md:text-3xl font-bold text-white block mb-4">520% ROI. 65% traffic growth. 70% time savings.</span>
                These aren't projections. They're what I've delivered — for real businesses, with measurable results.
              </p>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-32 p-12 md:p-16 rounded-[3rem] bg-white/5 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Your marketing should run while you build.</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Stop guessing and start automating. Let's discuss how a custom content system can transform your revenue trajectory.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gradient text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20 group"
          >
            Book Your Audit <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
