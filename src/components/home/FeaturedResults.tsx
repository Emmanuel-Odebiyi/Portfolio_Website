import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const FeaturedResults = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
            Real Businesses. Real Numbers. 
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl">
            No projections. No fluff. Just the measurable impact of automated systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[240px] md:auto-rows-[300px]">
          
          {/* Cell 1: Main Header & Visual (TechFlow) */}
          <motion.div 
            {...fadeIn}
            className="md:col-span-8 md:row-span-2 relative bg-zinc-50 rounded-[2.5rem] overflow-hidden p-8 md:p-12 border border-zinc-100 group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4 block">Case Study: TechFlow Solutions</span>
                <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight max-w-xl">
                  520% ROI <br /> Delivered in 90 Days.
                </h3>
              </div>
              <div className="flex items-center gap-4 group-hover:gap-6 transition-all">
                <button className="flex items-center gap-2 text-zinc-900 font-semibold group/btn">
                  Read Case Study <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* 3D Asset: Interconnected Nodes */}
            <img 
              src="/assets/bento/nodes.png"
              alt="Systems Nodes"
              className="absolute right-[-10%] bottom-[-10%] w-2/3 h-2/3 md:w-3/4 md:h-3/4 object-contain opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
          </motion.div>

          {/* Cell 2: Growth Stats (TechFlow Articles) */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:row-span-1 bg-zinc-50 rounded-[2rem] border border-zinc-100 p-8 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="text-6xl md:text-7xl font-bold text-zinc-900 mb-2 block">40+</span>
              <p className="text-zinc-500 font-medium leading-snug">
                Articles published monthly. <br />
                Up from just 8.
              </p>
            </div>
            <img 
              src="/assets/bento/cube.png"
              alt="Data Cube"
              className="absolute right-[-20%] top-[-10%] w-1/2 h-1/2 object-contain opacity-30 mix-blend-multiply grayscale group-hover:rotate-12 transition-transform duration-700 pointer-events-none"
            />
          </motion.div>

          {/* Cell 3: Revenue (TechFlow) */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 bg-zinc-50 rounded-[2rem] border border-zinc-100 p-8 flex flex-col justify-center group"
          >
            <span className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2 block leading-none">$127k</span>
            <p className="text-zinc-500 font-medium leading-snug">
              In directly attributed revenue. <br />
              First quarter alone.
            </p>
          </motion.div>

          {/* Cell 4: Scoove Africa Case (Span 4) */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 md:row-span-2 relative bg-zinc-50 rounded-[2.5rem] overflow-hidden p-8 md:p-12 border border-zinc-100 group"
          >
             <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                   <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4 block">Case Study: The Scoove Africa</span>
                   <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight">65%</h3>
                   <p className="text-zinc-600 font-semibold text-xl md:text-2xl mt-2">Organic Growth</p>
                   <p className="text-zinc-500 mt-4 leading-relaxed max-w-xs">
                     Average ranking climbed from Position 24 to Position 9. 
                   </p>
                </div>
                <button className="flex items-center gap-2 text-zinc-900 font-semibold group/btn mt-8">
                  Read More <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
             </div>
             <img 
              src="/assets/bento/search.png"
              alt="Search Nodes"
              className="absolute right-[-15%] bottom-[-10%] w-2/3 h-2/3 object-contain opacity-60 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 pointer-events-none"
            />
          </motion.div>

          {/* Cell 5: Scoove Impressions (Span 4) */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="md:col-span-4 md:row-span-1 bg-zinc-50 rounded-[2rem] border border-zinc-100 p-8 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="text-5xl md:text-6xl font-bold text-zinc-900 mb-2 block">25k+</span>
              <p className="text-zinc-500 font-medium">Monthly impressions via programmatic SEO architecture.</p>
            </div>
            <img 
              src="/assets/bento/pillar.png"
              alt="Crystal Growth"
              className="absolute left-[-20%] bottom-[-20%] w-1/2 h-1/2 object-contain opacity-40 mix-blend-multiply group-hover:translate-y-[-10px] transition-transform duration-700 pointer-events-none"
            />
          </motion.div>

          {/* Cell 6: CTR Improvement (Span 4) */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.5 }}
            className="md:col-span-4 md:row-span-1 bg-[#EEF2FF] rounded-[2rem] p-8 flex flex-col justify-center border border-indigo-100 group"
          >
            <span className="text-5xl md:text-6xl font-bold text-indigo-900 mb-2 block">40%</span>
            <p className="text-indigo-700/80 font-medium">Click-through rate improvement in the first 90 days.</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedResults;
