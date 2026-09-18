import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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

  const handleCardClick = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const blockHeight = totalScrollable / SOLUTIONS.length;
    const targetScroll = absoluteTop + targetIndex * blockHeight + blockHeight * 0.35;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="The Solution Section"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>

        {/* ── Headline Block ── */}
        <div className="shrink-0 pt-14 md:pt-24 pb-2 md:pb-4 px-6 md:px-16 text-center z-10">
          <p className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase mb-2 md:mb-4" style={{ color: 'var(--accent-amber)' }}>
            The Solution
          </p>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] max-w-4xl mx-auto mb-2 md:mb-4" style={{ color: 'var(--text-body)' }}>
            <span className="block">What If Your Marketing</span>
            <span className="block">Could Run Itself?</span>
          </h2>
          <p 
            className="hidden md:block text-xs md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            I build intelligent content marketing systems that produce consistent,
            high-quality output — without you lifting a finger after setup.
          </p>
        </div>

        {/* ── Accordion Panels — Stacks vertically on mobile/tablet, horizontal on desktop ── */}
        <div className="flex-1 flex flex-col lg:flex-row solution-accordion-flex overflow-hidden px-4 pb-4 lg:px-8 lg:pb-8 gap-2 md:gap-3 lg:gap-0 max-h-[750px] my-auto w-full">
          {SOLUTIONS.map((solution, index) => {
            const isActive = index === activeIndex;
            const SolutionIcon = solution.Icon;
            
            return (
              <motion.div
                key={solution.id}
                onClick={() => handleCardClick(index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
                className="relative overflow-hidden rounded-2xl lg:rounded-[2.5rem] mx-0 lg:mx-2 first:ml-0 last:mr-0 flex-1 border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-amber)] focus-visible:outline-offset-2"
                animate={{ 
                    flex: isActive ? 8 : 1,
                    scale: isActive ? 1 : 0.98,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                style={{ 
                  backgroundColor: isActive 
                    ? 'var(--bg-surface)' 
                    : 'color-mix(in srgb, var(--bg-surface) 60%, var(--bg-page))',
                  borderColor: isActive 
                    ? `color-mix(in srgb, ${solution.accentColor} 45%, var(--border-card))` 
                    : 'var(--border-card)',
                  boxShadow: isActive 
                    ? `0 16px 40px rgba(0, 0, 0, 0.25), 0 0 36px ${solution.accentColor}18` 
                    : 'none',
                  // Mobile/tablet: wide horizontal strip. Desktop: narrow vertical strip.
                  minHeight: isActive 
                    ? 'var(--solution-card-active-height, clamp(280px, 45vh, 420px))' 
                    : 'var(--solution-card-inactive-height, 56px)',
                }}
              >
                {/* Collapsed label:
                    - Mobile/Tablet (< lg): wide horizontal strip → icon left + text right in a row
                    - Desktop (lg+): narrow vertical strip → icon top + text vertical writing-mode
                */}
                {!isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-2"
                  >
                    <SolutionIcon 
                      size={18} 
                      style={{ color: solution.accentColor }} 
                      className="drop-shadow-sm shrink-0" 
                    />
                    {/* Mobile+Tablet: horizontal readable text */}
                    <span
                      className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.25em] whitespace-nowrap"
                      style={{ color: solution.accentColor }}
                    >
                      {solution.title}
                    </span>
                    {/* Desktop: vertical writing-mode text */}
                    <span
                      className="hidden lg:block text-[9px] font-bold uppercase tracking-[0.35em] whitespace-nowrap vertical-text"
                      style={{ 
                        color: solution.accentColor,
                      }}
                    >
                      {solution.title}
                    </span>
                  </motion.div>
                )}

                {/* Expanded content */}
                {isActive && (
                  <motion.div
                    key={`content-${solution.id}`}
                    className="absolute inset-0 flex flex-col justify-start lg:justify-center px-6 md:px-16 py-6 lg:py-0 overflow-y-auto lg:overflow-visible no-scrollbar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="max-w-3xl">
                      {/* Highly popped, bouncy icon wrapper with full saturation */}
                      <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-xl lg:rounded-[1.5rem] flex items-center justify-center mb-3 lg:mb-8"
                        style={{ 
                          backgroundColor: solution.accentColor, 
                          boxShadow: `0 8px 24px -6px ${solution.accentColor}` 
                        }}
                        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.15, bounce: 0.5, duration: 0.6 }}
                      >
                        <SolutionIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 text-white" strokeWidth={2.5} />
                      </motion.div>
                      
                      <span
                        className="text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-1 lg:mb-3 opacity-60"
                        style={{ color: solution.accentColor }}
                      >
                        {solution.title}
                      </span>
                      
                      <h3
                        className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-black mb-2 lg:mb-8 leading-[1.1] tracking-tight"
                        style={{ color: 'var(--text-body)' }}
                      >
                        {solution.subtitle}
                      </h3>
                      
                      <p
                        className="text-xs md:text-base lg:text-lg xl:text-2xl leading-relaxed max-w-2xl font-light"
                        style={{ color: 'var(--text-muted)' }}
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
