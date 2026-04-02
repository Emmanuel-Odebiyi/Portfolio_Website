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

  const imageMask = {
    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, rgba(0,0,0,1) 40%, transparent 85%)',
    maskImage: 'radial-gradient(circle at center, black 0%, rgba(0,0,0,1) 40%, transparent 85%)',
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
             Real Businesses. <span className="text-brand-gradient">Real Numbers.</span> 
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light">
            Measurable impact, delivered through data-driven automation.
          </p>
        </div>

        {/* The "Together but Separate" Bento — Dasboard Shell Approach */}
        <div className="bg-zinc-50 p-4 md:p-6 rounded-[3rem] border border-zinc-200 shadow-sm relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            
            {/* Cell 1: Main Case Study (TechFlow) */}
            <motion.div 
              {...fadeIn}
              className="md:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative z-10"
            >
              <div className="relative z-20 h-full flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="space-y-6 max-w-sm text-left">
                   <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest block font-bold">Case Study: TechFlow Solutions</span>
                   <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight">
                     <span className="text-brand-gradient">520% ROI</span> <br />
                     in 90 Days.
                   </h3>
                   <p className="text-zinc-500 text-base font-light leading-relaxed">
                     Scaling organic growth and content systems at exponential velocity.
                   </p>
                   <button className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-brand-gradient text-white text-sm font-bold rounded-2xl transition-all shadow-lg group/btn overflow-hidden mt-2">
                      View Case Study <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                   </button>
                </div>
                
                <div 
                  className="relative w-full md:w-[350px] h-[300px] flex items-center justify-center overflow-visible"
                  style={imageMask}
                >
                  <img 
                    src={nodesImg}
                    alt="Nodes Network" 
                    className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125 transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Cell 2: Revenue Generated */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="md:col-span-4 bg-white p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-all z-10"
            >
              <div className="relative z-10 space-y-2">
                <span className="text-5xl md:text-7xl font-bold text-brand-gradient block">$127k</span>
                <p className="text-zinc-900 text-sm font-bold uppercase tracking-wider">Attributed Revenue</p>
                <p className="text-zinc-500 text-sm">First quarter directly delivered impact.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Cell 3: Scoove Africa Case */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="md:col-span-12 lg:col-span-4 relative bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col justify-center gap-8 z-10"
            >
              <div className="relative z-20 space-y-6">
                <div className="space-y-2">
                   <span className="text-5xl md:text-6xl font-bold text-brand-gradient">65%</span>
                   <p className="text-zinc-900 font-bold text-lg leading-none">Organic Growth</p>
                   <p className="text-zinc-400 text-xs font-mono uppercase tracking-[0.2em]">The Scoove Africa</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-brand-gradient text-white text-xs font-bold rounded-xl transition-all shadow-md group/btn overflow-hidden w-fit">
                  View Case Study <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              
              <div 
                className="absolute right-[-10%] bottom-[-10%] w-[55%] h-[80%] p-4"
                style={imageMask}
              >
                 <img 
                  src={discoveryImg} 
                  alt="Discovery" 
                  className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125 transition-transform duration-1000 group-hover:scale-110" 
                 />
              </div>
            </motion.div>

            {/* Cell 4: 40+ Articles */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.3 }}
              className="md:col-span-6 lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col justify-center text-center group shadow-sm hover:shadow-md transition-all z-10"
            >
               <span className="text-5xl md:text-6xl font-bold text-brand-gradient block mb-2">40+</span>
               <p className="text-zinc-900 text-base font-bold">Articles Monthly</p>
               <p className="text-zinc-500 text-sm">Proprietary AI Pipeline</p>
            </motion.div>

            {/* Cell 5: Impression & CTR */}
            <motion.div 
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
              className="md:col-span-6 lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-zinc-100 group shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-center items-center text-center z-10"
            >
               <div className="relative z-10 space-y-2">
                  <span className="text-5xl md:text-6xl font-bold text-brand-gradient block mb-2">40%</span>
                  <p className="text-zinc-900 text-base font-bold">CTR Improvement</p>
                  <p className="text-zinc-500 text-sm">Across SEO Portfolio</p>
               </div>
               
               <div 
                 className="absolute right-0 bottom-[-15%] w-[150px] h-[150px] opacity-10 grayscale"
                 style={imageMask}
               >
                 <img src={growthImg} alt="" className="w-full h-full object-contain mix-blend-multiply" />
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResults;
