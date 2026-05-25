import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import nodesImg from '../../assets/bento/nodes.png';
import growthImg from '../../assets/bento/growth.png';
import discoveryImg from '../../assets/bento/discovery.png';

const FeaturedResults = () => {
  const fadeIn: any = {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <section className="py-24 overflow-hidden bg-[var(--dark-base)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
             Real Businesses. <span className="text-amber-gradient">Real Numbers.</span>
          </h2>
          <p className="text-lg md:text-xl font-light text-[var(--text-secondary)]">
            Measurable impact, delivered through data-driven automation.
          </p>
        </div>

        {/* The "Together but Separate" Bento */}
        <div className="p-4 md:p-6 rounded-[3rem] relative z-0" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            
            {/* Cell 1: Main Case Study (TechFlow) */}
            <motion.div 
              {...fadeIn}
              className="md:col-span-8 bg-[#111827]/65 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/15 shadow-2xl hover:border-white/25 transition-all group overflow-hidden relative z-10"
            >
              <div className="relative z-20 h-full flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="space-y-6 max-w-sm text-left">
                   <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest block font-bold">Case Study: TechFlow Solutions</span>
                   <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                     <span className="text-brand-gradient">520% ROI</span> <br />
                     in 90 Days.
                   </h3>
                   <p className="text-slate-100 text-base font-medium leading-relaxed">
                     Scaling organic growth and content systems at exponential velocity.
                   </p>
                   <button className="flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-brand-gradient text-white text-sm font-bold rounded-2xl transition-all border border-white/20 group/btn overflow-hidden mt-2">
                      View Case Study <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                   </button>
                </div>
                
                <div 
                  className="relative w-full md:w-[350px] h-[300px] flex items-center justify-center overflow-visible"
                >
                  {/* Background Glow for image */}
                  <div className="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full" />
                  <img 
                    src={nodesImg}
                    alt="Nodes Network" 
                    className="w-full h-full object-contain brightness-125 contrast-125 transition-transform duration-1000 group-hover:scale-105 relative z-10"
                  />
                </div>
              </div>
            </motion.div>

            {/* Cell 2: Revenue Generated */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="md:col-span-4 bg-[#111827]/65 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/15 flex flex-col justify-center relative overflow-hidden group shadow-2xl hover:border-white/25 transition-all z-10"
            >
              <div className="relative z-10 space-y-2 text-center md:text-left">
                <span className="text-5xl md:text-7xl font-bold text-brand-gradient block">$127k</span>
                <p className="text-white text-sm font-black uppercase tracking-wider">Attributed Revenue</p>
                <p className="text-slate-100 text-sm">First quarter directly delivered impact.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Cell 3: Scoove Africa Case */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="md:col-span-12 lg:col-span-4 relative bg-[#111827]/65 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/15 shadow-2xl hover:border-white/25 transition-all group overflow-hidden flex flex-col justify-center gap-8 z-10"
            >
              <div className="relative z-20 space-y-6">
                <div className="space-y-2">
                   <span className="text-5xl md:text-6xl font-black text-brand-gradient">65%</span>
                   <p className="text-white font-bold text-lg leading-none">Organic Growth</p>
                   <p className="text-slate-200 text-xs font-mono uppercase tracking-[0.2em]">The Scoove Africa</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-brand-gradient text-white text-xs font-bold rounded-xl transition-all border border-white/20 group/btn overflow-hidden w-fit">
                  View Case Study <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              
              <div 
                className="absolute right-[-10%] bottom-[-10%] w-[55%] h-[80%] p-4"
              >
                 <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full" />
                 <img 
                  src={discoveryImg} 
                  alt="Discovery" 
                  className="w-full h-full object-contain brightness-125 contrast-125 transition-transform duration-1000 group-hover:scale-110 relative z-10" 
                 />
              </div>
            </motion.div>

            {/* Cell 4: 40+ Articles */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.3 }}
              className="md:col-span-6 lg:col-span-4 bg-[#111827]/65 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/15 flex flex-col justify-center text-center group shadow-2xl hover:border-white/25 transition-all z-10"
            >
               <span className="text-5xl md:text-6xl font-black text-brand-gradient block mb-2">40+</span>
               <p className="text-white text-base font-bold">Articles Monthly</p>
               <p className="text-slate-100 text-sm font-medium">Proprietary AI Pipeline</p>
            </motion.div>

            {/* Cell 5: Impression & CTR */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
              className="md:col-span-6 lg:col-span-4 bg-[#111827]/65 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/15 group shadow-2xl hover:border-white/25 transition-all relative overflow-hidden flex flex-col justify-center items-center text-center z-10"
            >
               <div className="relative z-10 space-y-2">
                  <span className="text-5xl md:text-6xl font-black text-brand-gradient block mb-2">40%</span>
                  <p className="text-white text-base font-bold">CTR Improvement</p>
                  <p className="text-slate-100 text-sm font-medium">Across SEO Portfolio</p>
               </div>
               
               <div 
                 className="absolute right-0 bottom-[-15%] w-[150px] h-[150px] opacity-20"
               >
                 <img src={growthImg} alt="" className="w-full h-full object-contain brightness-200" />
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResults;
