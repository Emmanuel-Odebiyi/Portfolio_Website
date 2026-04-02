import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyStory() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <section className="max-w-4xl mx-auto px-6">
        <Link to="/about" className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-gradient transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to About
        </Link>
        
        <div className="space-y-16">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-space-blue-50 text-brand-gradient text-xs font-mono tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
              The Deep Dive
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-zinc-900">
              My <span className="text-zinc-300">Story.</span>
            </h1>
          </div>

          <div className="prose prose-zinc prose-2xl font-light text-zinc-600 leading-relaxed space-y-12">
            <p>
              Right out of secondary school, I fell in love with writing. The power of words to connect brands with audiences was magic. But the reality was brutal: tight budgets, constant pressure, and clients who needed consistency they couldn't afford.
            </p>
            
            <div className="aspect-video rounded-[3rem] bg-zinc-100 overflow-hidden">
              <video 
                src="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <p>
              I noticed every business knew content marketing worked, but everyone struggled to execute. Freelancers ghosted, agencies were too expensive, and DIY meant writing blog posts at 11 PM on Sundays.
            </p>

            <div className="p-12 rounded-[3rem] bg-zinc-50 border border-zinc-100 space-y-8">
              <h3 className="text-3xl font-bold text-zinc-900">The Turning Point</h3>
              <p className="text-xl">
                When AI emerged, I didn't panic. I saw an opportunity to combine AI efficiency with human strategy. I spent three years mastering SEO, AI implementation, and business automation to solve the execution gap.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {['AI Efficiency', 'Human Strategy', 'Systematic Processes'].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                    <CheckCircle2 className="text-brand-gradient" size={20} />
                    <span className="font-bold text-zinc-900 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Today, I don't just write; I build engines. Engines that power growth, save time, and deliver predictable ROI for B2B SaaS companies and innovative institutions.
            </p>

            <div className="pt-20 text-center">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200"
              >
                Let's Build Your Story <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
