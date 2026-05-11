import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ArrowRight, Zap, PenTool, Bot, Rocket } from 'lucide-react';
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
            How a passion for words evolved into a relentless pursuit of systems, efficiency, and predictable business growth.
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
              <h3 className="text-3xl md:text-4xl font-bold text-white">Falling in love with the blank page.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                Right out of secondary school, I fell in love with writing. The power of words to connect brands with audiences felt like magic. I threw myself into mastering the craft, quickly realizing that great content could shift perspectives and drive action. 
                <br /><br />
                But the reality of the industry was brutal: tight budgets, relentless deadlines, and constant pressure. Clients demanded consistency and scale that human writers alone struggled to maintain without burning out.
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
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 02 — The Realization</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">The massive execution gap.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                I noticed a recurring theme: every business leader knew that content marketing was essential for growth. Yet, almost everyone struggled to execute it consistently. 
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 max-w-3xl">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2">Freelancers</h4>
                  <p className="text-sm text-gray-400">Often ghosted or couldn't grasp deep B2B technical nuances.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2">Agencies</h4>
                  <p className="text-sm text-gray-400">Too expensive and layered in bureaucracy that slowed things down.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2">DIY Execution</h4>
                  <p className="text-sm text-gray-400">Founders writing blog posts at 11 PM on Sundays, burning out quickly.</p>
                </div>
              </div>
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
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 03 — The Pivot</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">When AI emerged, I didn't panic.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                While others saw a threat, I saw an unprecedented opportunity. If I could combine the infinite efficiency of AI with the strategic nuance of human marketing, I could solve the execution gap forever.
                <br /><br />
                I went dark. For three years, I obsessively mastered SEO architecture, advanced AI workflows, and API-level business automation (Make.com, n8n, Zapier). I stopped just "writing" and started engineering complete marketing infrastructures.
              </p>
            </div>
          </motion.div>

          {/* Chapter 4 */}
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
              <h2 className="text-sm font-mono text-gray-500 tracking-[0.2em] uppercase">Chapter 04 — The Present</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">I don't just write. I build engines.</h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
                Today, I partner with B2B SaaS companies and forward-thinking businesses to construct autonomous growth engines. These aren't just collections of tools; they are cohesive systems that publish consistently, rank higher, and generate revenue—all while saving founders 15+ hours every week.
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to build your growth engine?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Stop guessing and start automating. Let's discuss how a custom content system can transform your revenue trajectory.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gradient text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20 group"
          >
            Book a Strategy Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
