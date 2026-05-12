import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Search, Zap, Bot, ArrowRight, BarChart3, Clock, Target, CheckCircle2, MessageSquare, Repeat } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function MyApproach() {
  return (
    <div className="bg-[#0a0f1e] text-white min-h-screen relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[100px]" />
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
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            The Methodology
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white mb-8"
          >
            How I Work: <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 text-6xl md:text-8xl">
              Data, Systems, and <br className="hidden md:block" /> Zero Guesswork.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl"
          >
            I don't give you tools and leave. I don't hand over tactics and hope for the best. I build complete systems — designed for your business, built on proven frameworks, and measured against real outcomes.
          </motion.p>
        </div>

        {/* The 4 Principles */}
        <div className="mb-32">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-white mb-12 flex items-center gap-4"
          >
            <span className="w-8 h-1 bg-brand-gradient rounded-full" />
            Core Principles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { 
                title: 'Data-Backed Decisions', 
                desc: 'No gut-feel advice. Every decision comes from research, competitive analysis, and frameworks I\'ve tested and refined across multiple industries.',
                icon: <BarChart3 className="text-blue-400" size={28} />
              },
              { 
                title: 'Measured Outcomes', 
                desc: 'Not "traffic improved." Exactly 65% increase in 90 days. Not "you\'ll save time." Specifically 15+ hours reclaimed every week.',
                icon: <Target className="text-amber-400" size={28} />
              },
              { 
                title: 'Built to Repeat', 
                desc: 'Systems beat effort. Consistency beats intensity. Automation compounds. I build things that keep working long after the project ends.',
                icon: <Repeat className="text-indigo-400" size={28} />
              },
              { 
                title: 'Radical Clarity', 
                desc: 'Complex automation doesn\'t have to be confusing. I make sure you understand what\'s running, why it works, and what to expect.',
                icon: <MessageSquare className="text-teal-400" size={28} />
              },
            ].map((val, i) => (
              <motion.div 
                key={val.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }
                }}
                className="group p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {val.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">{val.title}</h4>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The End Goal */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-gradient opacity-10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="relative p-12 md:p-20 border border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">The Goal: Absolute <br className="hidden md:block" /> Business Predictability.</h3>
              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                Consistency beats intensity every single time. My goal is to build a marketing engine that doesn't just run—it compounds your growth while you focus on building.
              </p>
              <ul className="pt-4 space-y-4">
                {[
                  '15+ hours reclaimed every week',
                  '65% traffic growth within 90 days',
                  'Repeatable systems, not one-off tactics'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                    <CheckCircle2 size={20} className="text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-gradient/5 group-hover:bg-brand-gradient/10 transition-colors duration-500" />
                <Bot size={48} className="text-amber-400 mb-6" />
                <div className="text-5xl font-black text-white mb-2">65%</div>
                <div className="text-sm font-mono text-gray-400 uppercase tracking-widest">Average Traffic Growth</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-32 text-center"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-brand-gradient hover:text-white transition-all shadow-2xl shadow-indigo-500/20 group"
          >
            Audit Your Current Strategy <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
