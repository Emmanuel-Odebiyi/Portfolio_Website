import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Cpu, Mail, BarChart3, LucideIcon } from 'lucide-react';

// ─── Solution Data ────────────────────────────────────────────────────────────

interface Solution {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  Icon: LucideIcon;
}

const SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: 'Automated Publishing',
    subtitle: '8 to 40+ articles monthly.',
    description:
      'Your content publishes automatically on schedule — without you lifting a finger after setup. You stay focused on your business while your blog stays alive.',
    bgColor: '#FFF4E5',
    accentColor: '#f59e0b',
    textColor: '#451a03',
    Icon: Zap,
  },
  {
    id: 2,
    title: 'SEO-Optimized',
    subtitle: 'Position 24 → Position 9.',
    description:
      'Optimized from day one. Say goodbye to guesswork and watch your average ranking climb rapidly as search engines reward your consistent, targeted output.',
    bgColor: '#E5F7E8',
    accentColor: '#10b981',
    textColor: '#052e16',
    Icon: Search,
  },
  {
    id: 3,
    title: 'Omnichannel Distribution',
    subtitle: 'Blog → Social → Email → LinkedIn.',
    description:
      'Distributed across every single platform automatically so your audience sees you everywhere — the moment you publish, not three weeks later.',
    bgColor: '#E5F0FF',
    accentColor: '#3b82f6',
    textColor: '#172554',
    Icon: Mail,
  },
  {
    id: 4,
    title: 'Brand Alignment',
    subtitle: 'Your voice, preserved.',
    description:
      'It sounds like you wrote it. The entire system is custom-built around your unique tone, expertise, and audience — so your differentiation is never erased.',
    bgColor: '#F0E5FF',
    accentColor: '#8b5cf6',
    textColor: '#2e1065',
    Icon: Cpu,
  },
  {
    id: 5,
    title: 'Data Intelligence',
    subtitle: 'Performance tracked always.',
    description:
      'You will know exactly what is working, what is generating revenue, and what to conquer next — with live dashboards built right into your system.',
    bgColor: '#FFE5E5',
    accentColor: '#e85d4a',
    textColor: '#450a0a',
    Icon: BarChart3,
  },
];

// ─── Main SolutionSection ─────────────────────────────────────────────────────

export const SolutionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 bg-[var(--dark-mid)] overflow-hidden">
      {/* Aurora glowing background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb-1 absolute rounded-full" style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="aurora-orb-2 absolute rounded-full" style={{ width: '45vw', height: '45vw', maxWidth: 600, maxHeight: 600, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', filter: 'blur(90px)' }} />
        <div className="aurora-orb-3 absolute rounded-full" style={{ width: '35vw', height: '35vw', maxWidth: 450, maxHeight: 450, top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col h-auto min-h-[85vh] relative z-10">
        
        {/* Headline Block */}
        <div className="shrink-0 text-center pb-12">
          <p className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(251,191,36,0.95)' }}>
            The Solution
          </p>
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter leading-[1.05] max-w-4xl mx-auto mb-4">
            What If Your Marketing<br />Could Run Itself?
          </h2>
          <p className="text-sm md:text-xl max-w-2xl mx-auto leading-relaxed text-slate-300">
            I build intelligent content marketing systems that produce consistent,
            high-quality output — without you lifting a finger after setup.
          </p>
        </div>

        {/* Accordion Panels — Stacks vertically on mobile/tablet, horizontal on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pb-4 gap-4 lg:gap-3 min-h-[480px]">
          {SOLUTIONS.map((solution, index) => {
            const isActive = index === activeIndex;
            const SolutionIcon = solution.Icon;
            
            return (
              <motion.div
                key={solution.id}
                onMouseEnter={() => {
                  if (window.innerWidth > 1024) setActiveIndex(index);
                }}
                onClick={() => setActiveIndex(index)}
                className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] border flex-1 cursor-pointer transition-all"
                animate={{ 
                  flex: isActive ? 6 : 1.2,
                  filter: isActive ? 'brightness(110%) saturate(120%)' : 'brightness(65%) saturate(80%)',
                  scale: isActive ? 1 : 0.98,
                  boxShadow: isActive ? `0 0 60px ${solution.accentColor}25` : 'none'
                }}
                transition={{ type: 'spring', stiffness: 140, damping: 22 }}
                style={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.45)', // Dark slate glass
                  backdropFilter: 'blur(20px)',
                  border: isActive ? `1.5px solid ${solution.accentColor}60` : '1px solid rgba(255,255,255,0.06)',
                  minHeight: isActive ? '260px' : '64px',
                }}
              >
                {/* Collapsed label (horizontal on mobile, vertical vertical text on desktop) */}
                {!isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-row lg:flex-col items-center justify-between lg:justify-center p-5 gap-3"
                  >
                    <SolutionIcon 
                      size={20} 
                      style={{ color: solution.accentColor }} 
                      className="drop-shadow-sm shrink-0" 
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.25em] lg:tracking-[0.4em] lg:[writing-mode:vertical-lr] lg:rotate-180 whitespace-nowrap"
                      style={{ color: solution.accentColor }}
                    >
                      {solution.title}
                    </span>
                    <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center lg:hidden">
                      <span className="text-[10px] text-white/40">+</span>
                    </div>
                  </motion.div>
                )}

                {/* Expanded content */}
                {isActive && (
                  <motion.div
                    key={`content-${solution.id}`}
                    className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="max-w-2xl relative z-10 text-left">
                      {/* saturated icon wrapper */}
                      <motion.div
                        className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center mb-4 md:mb-6"
                        style={{ 
                          backgroundColor: solution.accentColor, 
                          boxShadow: `0 8px 24px -6px ${solution.accentColor}` 
                        }}
                        initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.1, bounce: 0.4, duration: 0.5 }}
                      >
                        <SolutionIcon className="w-5 h-5 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                      </motion.div>
                      
                      <span
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-2 opacity-80"
                        style={{ color: solution.accentColor }}
                      >
                        {solution.title}
                      </span>
                      
                      <h3
                        className="text-xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.15] tracking-tight text-white font-sans"
                      >
                        {solution.subtitle}
                      </h3>
                      
                      <p
                        className="text-xs md:text-base lg:text-lg leading-relaxed max-w-xl font-light text-slate-200"
                      >
                        {solution.description}
                      </p>
                    </div>

                    {/* Giant 3D Perspective Faint Decorative Icon */}
                    <motion.div
                      className="hidden xl:block absolute -right-24 -bottom-24 pointer-events-none"
                      style={{ color: solution.accentColor }}
                      initial={{ opacity: 0, scale: 0.6, rotateX: 30, rotateY: 15, rotateZ: -10, x: 80, y: 80 }}
                      animate={{ opacity: 0.1, scale: 1, rotateX: 10, rotateY: -15, rotateZ: -5, x: 0, y: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.15 }}
                    >
                      <SolutionIcon 
                        size={480} 
                        strokeWidth={0.8} 
                        style={{ 
                          filter: `
                            drop-shadow(-2px 4px 0px ${solution.accentColor}40)
                            drop-shadow(-4px 8px 0px ${solution.accentColor}20)
                            drop-shadow(-15px 25px 30px ${solution.accentColor}60)
                          `
                        }} 
                      />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
