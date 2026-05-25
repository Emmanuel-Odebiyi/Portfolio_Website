import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import nodesImg from '../../assets/bento/nodes.png';
import growthImg from '../../assets/bento/growth.png';
import discoveryImg from '../../assets/bento/discovery.png';

// ─── INTERACTIVE BENTO CARD WRAPPER ───────────────────────────────────────────
interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(251, 191, 36, 0.08)', 
  delay = 0,
  ...props 
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.002 }}
      className={`relative bg-[#0d1222]/85 backdrop-blur-3xl rounded-[2.5rem] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-500 overflow-hidden group shadow-2xl ${className}`}
      {...props}
    >
      {/* Interactive mouse radial spotlight glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
        }}
      />
      
      {/* Ambient Grid overlay */}
      <div className="absolute inset-0 opacity-[0.01] group-hover:opacity-[0.025] transition-opacity pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      {/* Dynamic Hover Border light trail */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 border border-amber-500/20 rounded-[2.5rem]" 
        style={{
          maskImage: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, black, transparent)`
        }}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const FeaturedResults = () => {
  return (
    <section className="py-24 overflow-hidden bg-[var(--dark-base)] relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[160px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
              Real Businesses. <br />
              <span className="text-brand-gradient">Real Numbers.</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-[var(--text-secondary)] leading-relaxed">
              Verifiable commercial results built on hyper-optimized custom automation pipelines.
            </p>
          </div>
          
          <div className="shrink-0 flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/[0.02] backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300">Live ROI Ledgers</span>
          </div>
        </div>

        {/* Bento Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          
          {/* Bento Cell 1: Main Case Study (TechFlow Solutions) */}
          <BentoCard 
            className="md:col-span-8 p-8 md:p-12" 
            glowColor="rgba(245, 158, 11, 0.14)"
            delay={0}
          >
            <div className="h-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
              
              <div className="space-y-6 max-w-sm text-left relative z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-500 font-mono text-[9px] uppercase tracking-[0.2em] font-black">Case Study: TechFlow Solutions</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mt-2">
                  520% ROI <br />
                  <span className="text-brand-gradient">in 90 Days.</span>
                </h3>
                
                <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
                  Scaling organic growth and programmatic content distribution systems at exponential velocity.
                </p>
                
                <div className="pt-2">
                  <a 
                    href="/portfolio/techflow-solutions" 
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/[0.06] hover:bg-white text-white hover:text-zinc-900 text-xs font-mono font-black uppercase tracking-widest rounded-full transition-all duration-300 border border-white/10 shadow-lg group/btn overflow-hidden"
                  >
                    View Case Study 
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
              
              {/* Animated Floating nodes sphere */}
              <div className="relative w-full md:w-[350px] h-[280px] flex items-center justify-center overflow-visible">
                <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center z-10"
                >
                  <img 
                    src={nodesImg}
                    alt="Nodes Network" 
                    className="w-full h-full object-contain brightness-125 contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>
              
            </div>
          </BentoCard>

          {/* Bento Cell 2: Attributed Revenue */}
          <BentoCard 
            className="md:col-span-4 p-10 flex flex-col justify-between" 
            glowColor="rgba(99, 102, 241, 0.16)"
            delay={0.1}
          >
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-indigo-400 block">Performance Metric</span>
              <span className="text-6xl md:text-7xl font-black text-brand-gradient block tracking-tighter leading-none">$127k</span>
              <p className="text-white text-sm font-black uppercase tracking-wider">Attributed Revenue</p>
              <p className="text-slate-300 text-xs font-semibold leading-relaxed">Direct business impact in the first 90 days of automation activation.</p>
            </div>
            
            {/* Glowing SVG trend chart overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path d="M 0,48 Q 20,40 45,28 T 80,12 T 100,2" fill="none" stroke="url(#bento-gradient)" strokeWidth="2" />
                <path d="M 0,48 Q 20,40 45,28 T 80,12 T 100,2 L 100,50 L 0,50 Z" fill="url(#bento-fill)" />
                <defs>
                  <linearGradient id="bento-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <linearGradient id="bento-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </BentoCard>

          {/* Bento Cell 3: Scoove Africa Case */}
          <BentoCard 
            className="md:col-span-12 lg:col-span-4 p-10 flex flex-col justify-between min-h-[350px]" 
            glowColor="rgba(59, 130, 246, 0.14)"
            delay={0.2}
          >
            <div className="space-y-6 text-left relative z-20">
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400 block font-black">CASE STUDY: THE SCOOVE AFRICA</span>
                <span className="text-6xl font-black text-brand-gradient tracking-tighter block leading-none">65%</span>
                <p className="text-white font-bold text-lg leading-snug">Organic Growth Injected</p>
              </div>
              
              <div className="pt-2">
                <a 
                  href="/portfolio/scoove-africa" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white text-white hover:text-zinc-900 text-[10px] font-mono font-black uppercase tracking-wider rounded-full transition-all duration-300 border border-white/10 shadow"
                >
                  View Study <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Float animation globe */}
            <div className="absolute right-[-5%] bottom-[-5%] w-[50%] h-[70%] pointer-events-none">
              <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center z-10"
              >
                <img 
                  src={discoveryImg} 
                  alt="Discovery Globe" 
                  className="w-full h-full object-contain brightness-125 contrast-125 transition-transform duration-750 group-hover:scale-105" 
                />
              </motion.div>
            </div>
          </BentoCard>

          {/* Bento Cell 4: 40+ Articles (AI Blueprint) */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-4 p-10 flex flex-col justify-center text-center relative" 
            glowColor="rgba(168, 85, 247, 0.16)"
            delay={0.3}
          >
            {/* Elegant HUD Blueprint Layout border lines inside */}
            <div className="absolute inset-0 border border-white/5 m-3 rounded-[2rem] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <span className="absolute top-2 left-2 text-[7px] font-mono text-zinc-500">SYS_RUN.v4</span>
              <span className="absolute bottom-2 right-2 text-[7px] font-mono text-zinc-500">SEO_INDEXER</span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-6xl font-black text-brand-gradient tracking-tighter block leading-none">40+</span>
              <h4 className="text-white text-lg font-bold leading-none">Articles Monthly</h4>
              <p className="text-slate-300 text-xs font-mono uppercase tracking-[0.2em]">Proprietary AI Pipeline</p>
            </div>
          </BentoCard>

          {/* Bento Cell 5: Impression & CTR */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-4 p-10 flex flex-col justify-center items-center text-center relative" 
            glowColor="rgba(244, 63, 94, 0.14)"
            delay={0.4}
          >
            {/* HUD Blueprint Lines */}
            <div className="absolute inset-0 border border-white/5 m-3 rounded-[2rem] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <span className="absolute top-2 right-2 text-[7px] font-mono text-zinc-500">CTR_BOOST</span>
              <span className="absolute bottom-2 left-2 text-[7px] font-mono text-zinc-500">SERP_OPT</span>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-6xl font-black text-brand-gradient tracking-tighter block leading-none">40%</span>
              <h4 className="text-white text-lg font-bold leading-none">CTR Improvement</h4>
              <p className="text-slate-300 text-xs font-mono uppercase tracking-[0.2em]">Across SEO Portfolio</p>
            </div>
            
            <div className="absolute right-3 bottom-[-15%] w-[120px] h-[120px] opacity-[0.08] group-hover:opacity-20 transition-opacity pointer-events-none">
              <img src={growthImg} alt="" className="w-full h-full object-contain brightness-200" />
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default FeaturedResults;

