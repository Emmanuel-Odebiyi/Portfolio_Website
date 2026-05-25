import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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

// ─── Line-by-Line Reveal Text ─────────────────────────────────────────────────

const LineReveal = ({
  lines,
  scrollYProgress,
  startP,
  endP,
}: {
  lines: string[];
  scrollYProgress: any;
  startP: number;
  endP: number;
}) => {
  const step = (endP - startP) / Math.max(lines.length, 1);
  return (
    <>
      {lines.map((line, i) => {
        const ls = startP + i * step;
        const le = Math.min(ls + step * 1.5, endP);
        const opacity = useTransform(scrollYProgress, [ls, le], [0.15, 1]);
        const y = useTransform(scrollYProgress, [ls, le], [20, 0]);
        const filter = useTransform(scrollYProgress, [ls, le], ['blur(4px)', 'blur(0px)']);
        return (
          <motion.span
            key={i}
            className="block overflow-hidden"
            style={{ opacity, y, filter }}
          >
            {line}
          </motion.span>
        );
      })}
    </>
  );
};

// ─── Main Intersection Observer Hook ───────────────────────────────────────────

const useElementVisibility = (ref: React.RefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isVisible;
};

// ─── Main SolutionSection ─────────────────────────────────────────────────────

export const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const SCROLL_HEIGHT = `${SOLUTIONS.length * 180}vh`;

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (p: number) => {
      setActiveIndex(Math.min(Math.floor(p * SOLUTIONS.length), SOLUTIONS.length - 1));
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="The Solution Section"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[var(--dark-mid)]">

        {/* Aurora blobs for the solution section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-orb-1 absolute rounded-full" style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="aurora-orb-2 absolute rounded-full" style={{ width: '45vw', height: '45vw', maxWidth: 600, maxHeight: 600, bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(245,158,11,0.20) 0%, transparent 70%)', filter: 'blur(90px)' }} />
          <div className="aurora-orb-3 absolute rounded-full" style={{ width: '35vw', height: '35vw', maxWidth: 450, maxHeight: 450, top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        {/* ── Headline Block ── */}
        <div className="shrink-0 pt-28 pb-6 px-6 md:px-16 text-center z-10">
          <p className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(251,191,36,0.95)' }}>
            The Solution
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.05] max-w-4xl mx-auto mb-4">
            <LineReveal
              lines={['What If Your Marketing', 'Could Run Itself?']}
              scrollYProgress={scrollYProgress}
              startP={0}
              endP={0.15}
            />
          </h2>
          <motion.p 
            style={{
              opacity: useTransform(scrollYProgress, [0.05, 0.15], [0, 1]),
              y: useTransform(scrollYProgress, [0.05, 0.15], [10, 0]),
              color: 'rgba(226,232,240,0.9)',
            }}
            className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            I build intelligent content marketing systems that produce consistent,
            high-quality output — without you lifting a finger after setup.
          </motion.p>
        </div>

        {/* ── Horizontal Accordion Panels ── */}
        <div className="flex-1 flex flex-row overflow-hidden px-4 pb-4 md:px-8 md:pb-8">
          {SOLUTIONS.map((solution, index) => {
            const isActive = index === activeIndex;
            const SolutionIcon = solution.Icon;
            
            return (
              <motion.div
                key={solution.id}
                className="relative overflow-hidden h-full rounded-[2rem] md:rounded-[3rem] mx-1 md:mx-2 first:ml-0 last:mr-0 border border-zinc-100"
                animate={{ 
                    flex: isActive ? 12 : 1,
                    // High-end glassmorphism effect
                    filter: isActive ? 'brightness(110%) saturate(120%)' : 'brightness(70%) saturate(80%)',
                    scale: isActive ? 1 : 0.96,
                    boxShadow: isActive ? `0 0 80px ${solution.accentColor}20` : 'none'
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                style={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.4)', // Dark slate glass
                  backdropFilter: 'blur(20px)',
                  border: isActive ? `1.5px solid ${solution.accentColor}60` : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {/* Collapsed label (vertical text) */}
                {!isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-2"
                  >
                    <SolutionIcon 
                      size={24} 
                      style={{ color: solution.accentColor }} 
                      className="mb-8 drop-shadow-sm" 
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 whitespace-nowrap"
                      style={{ color: solution.accentColor }}
                    >
                      {solution.title}
                    </span>
                  </motion.div>
                )}

                {/* Expanded content */}
                {isActive && (
                  <motion.div
                    key={`content-${solution.id}`}
                    className="absolute inset-0 flex flex-col justify-center px-8 md:px-16"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="max-w-3xl">
                      {/* Highly popped, bouncy icon wrapper with full saturation */}
                      <motion.div
                        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8"
                        style={{ 
                          backgroundColor: solution.accentColor, 
                          boxShadow: `0 12px 30px -10px ${solution.accentColor}` 
                        }}
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.25, bounce: 0.5, duration: 0.8 }}
                      >
                        <SolutionIcon size={40} color="#ffffff" strokeWidth={2.5} />
                      </motion.div>
                      
                      <span
                        className="text-xs font-bold uppercase tracking-[0.3em] block mb-3 opacity-60"
                        style={{ color: solution.accentColor }}
                      >
                        {solution.title}
                      </span>
                      
                      <h3
                        className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-white"
                      >
                        {solution.subtitle}
                      </h3>
                      
                      <p
                        className="text-base md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light text-slate-100"
                      >
                        {solution.description}
                      </p>
                    </div>

                    {/* Giant 3D Perspective Faint Decorative Icon */}
                    <motion.div
                      className="hidden xl:block absolute -right-20 -bottom-24 pointer-events-none"
                      style={{ color: solution.accentColor }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.6, 
                        rotateX: 45, 
                        rotateY: 25, 
                        rotateZ: -10,
                        x: 100,
                        y: 100
                      }}
                      animate={{ 
                        opacity: 0.15, 
                        scale: 1, 
                        rotateX: 10, 
                        rotateY: -15, 
                        rotateZ: -5,
                        x: 0,
                        y: 0 
                      }}
                      transition={{ type: 'spring', damping: 18, stiffness: 90, delay: 0.2 }}
                    >
                      <SolutionIcon 
                        size={600} 
                        strokeWidth={0.8} 
                        // Simulate a 3D extrusion and deep glowing shadow
                        style={{ 
                          filter: `
                            drop-shadow(-2px 4px 0px ${solution.accentColor}50)
                            drop-shadow(-4px 8px 0px ${solution.accentColor}30)
                            drop-shadow(-15px 25px 30px ${solution.accentColor}80)
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
    </div>
  );
};
