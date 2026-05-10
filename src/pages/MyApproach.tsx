import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Zap, Search, Bot, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyApproach() {
  return (
    <div className="pt-32 pb-20 bg-[#0B0F19] text-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6">
        <Link to="/about" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to About
        </Link>
        
        <div className="space-y-16">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-xs font-mono tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
              The Methodology
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-white">
              My <span className="text-gray-500">Approach.</span>
            </h1>
          </div>

          <div className="prose prose-invert prose-2xl font-light text-gray-400 leading-relaxed space-y-12">
            <p className="text-3xl font-bold text-brand-gradient leading-tight">
              Authority + Data + Simplicity + Action
            </p>
            
            <p>
              I don't just give you tools—I build complete systems that produce results. Every strategy is backed by data, every claim is quantified with metrics, and every process is designed for repeatable success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Systematic', 
                  desc: 'Process-oriented, workflow-focused, repeatable methods that don\'t rely on "inspiration".',
                  icon: <Layers className="text-brand-gradient" size={32} />
                },
                { 
                  title: 'Data-Driven', 
                  desc: 'Every claim quantified with metrics. We track what works and kill what doesn\'t.',
                  icon: <Search className="text-brand-gradient" size={32} />
                },
                { 
                  title: 'Practical', 
                  desc: 'Actionable implementation over abstract theory. I build things that actually run.',
                  icon: <Zap className="text-brand-gradient" size={32} />
                },
                { 
                  title: 'Clear', 
                  desc: 'Complex automation explained without jargon. You own the system, you understand it.',
                  icon: <Bot className="text-brand-gradient" size={32} />
                },
              ].map((val, i) => (
                <motion.div 
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl space-y-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-sm">
                    {val.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white">{val.title}</h4>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>

            <p>
              My goal is to make your marketing as predictable as your operations. By automating the repetitive and optimizing the strategic, we create a growth engine that scales with your business.
            </p>

            <div className="pt-20 text-center">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-gradient text-zinc-900 font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20"
              >
                Scale Your Growth <Zap size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
