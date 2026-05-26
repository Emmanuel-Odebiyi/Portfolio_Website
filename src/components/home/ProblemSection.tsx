import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Bot, PenTool } from 'lucide-react';
import Lottie from 'lottie-react';

// ─── Problem Data ─────────────────────────────────────────────────────────────

interface Problem {
  id: number;
  tag: string;
  headline: string;
  body: string;
  detail: string;
  icon: React.ElementType;
  animationPath?: string;
  accentColor: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    tag: 'The Freelancer Problem',
    headline: "They Were Great — Until They Weren't.",
    body: "You hired a freelancer. They were great for a while. Then they got overloaded, quality dropped, and one day — they just stopped responding.",
    detail: "Now you're back to square one, sifting through proposals and hoping this one sticks.",
    icon: Users,
    animationPath: '/animation/freelancer.json',
    accentColor: '#e85d4a',
  },
  {
    id: 2,
    tag: 'The Agency Problem',
    headline: 'Slick Deck. Impressive Pitch. Junior Work.',
    body: "You tried an agency. Slick deck. Impressive pitch. Then the invoice arrived: $8,000/month, six-month minimum.",
    detail: "Three months later you're getting junior work at senior prices, and a simple revision takes two weeks.",
    icon: Building2,
    animationPath: '/animation/agency.json',
    accentColor: '#f59e0b',
  },
  {
    id: 3,
    tag: 'The AI Tools Problem',
    headline: 'ChatGPT Felt Like a Breakthrough. Then You Read It Back.',
    body: "It sounded like every other bland, generic article online. Worse, it sounded nothing like you.",
    detail: "Your brand voice? Gone. Your differentiation? Erased. Your audience can tell — and they're clicking away.",
    icon: Bot,
    animationPath: '/animation/ai-tools.json',
    accentColor: '#8b5cf6',
  },
  {
    id: 4,
    tag: 'The DIY Problem',
    headline: "You're the Expert. So You Should Write It — Right?",
    body: "Except you're also the one running sales calls, managing the team, solving operational fires, and keeping clients happy.",
    detail: "So the blog post gets written at 11 PM — when it gets written at all. Three weeks later, nothing published. Again.",
    icon: PenTool,
    animationPath: '/animation/diy.json',
    accentColor: '#10b981',
  },
];

// ─── Problem Card with Viewport Detection (Scroll Spy) ────────────────────────

const ProblemCardSpy = ({ 
  problem, 
  index, 
  onVisible 
}: { 
  problem: Problem; 
  index: number; 
  onVisible: () => void; 
}) => {
  const Icon = problem.icon;
  return (
    <motion.div
      onViewportEnter={onVisible}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-[60vh] flex items-center justify-center py-16 scroll-mt-28"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="space-y-4 md:space-y-6 text-left order-2 lg:order-1">
          <span
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase"
            style={{ backgroundColor: `${problem.accentColor}20`, color: problem.accentColor }}
          >
            {problem.tag}
          </span>

          <div className="select-none pointer-events-none -mb-2 md:mb-0">
            <span
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter block opacity-85 font-display italic"
              style={{ color: problem.accentColor }}
            >
              {String(problem.id).padStart(2, '0')}
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl -mt-2 md:-mt-4">
            {problem.headline}
          </h2>

          <p className="text-sm md:text-xl lg:text-2xl max-w-3xl leading-relaxed text-slate-300">
            {problem.body}
          </p>

          <p className="text-sm md:text-lg lg:text-xl italic font-semibold max-w-3xl leading-relaxed" style={{ color: problem.accentColor }}>
            {problem.detail}
          </p>
        </div>

        {/* Graphic Illustration */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative group/icon">
            <div 
              className="absolute inset-0 rounded-full blur-[60px] md:blur-[100px] opacity-40 group-hover/icon:opacity-50 transition-opacity duration-700"
              style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
            />
            
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{ backgroundColor: problem.accentColor }}
            />

            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 md:w-80 md:h-80 flex items-center justify-center relative z-10"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
            >
              {problem.animationPath ? (
                <Lottie 
                  path={problem.animationPath} 
                  loop={true} 
                  autoplay={true} 
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
                />
              ) : (
                <Icon
                  size={48}
                  strokeWidth={1}
                  style={{ 
                    color: problem.accentColor, 
                    filter: `drop-shadow(0 0 20px ${problem.accentColor}40)`
                  }}
                  className="md:w-24 md:h-24"
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ProblemSection ──────────────────────────────────────────────────────

export const ProblemSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 bg-[var(--dark-surface)] grain-overlay overflow-hidden">
      {/* Radial ambient glow shifting colors based on active problem */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 55% 55% at 65% 50%, ${PROBLEMS[activeIndex].accentColor}12 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Section Tag */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase" style={{ color: 'rgba(251,191,36,1)', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', padding: '6px 16px', borderRadius: '999px', backdropFilter: 'blur(8px)', display: 'inline-block' }}>
          The Problem
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8">
        
        {/* Left Column: Sticky Timeline Sidebar (Desktop Only) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-[30vh] flex flex-col items-center">
            {/* Timeline Background Track */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full z-0 h-[288px] bg-white/10"
              style={{ top: 28 }}
            />
            {/* Active Progress Line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full origin-top z-10"
              style={{
                top: 28,
                height: `${(activeIndex / (PROBLEMS.length - 1)) * 288}px`,
                backgroundColor: PROBLEMS[activeIndex].accentColor,
                boxShadow: `0 0 10px ${PROBLEMS[activeIndex].accentColor}`,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 25 }}
            />

            {PROBLEMS.map((problem, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <button
                  key={problem.id}
                  onClick={() => {
                    const element = document.getElementById(`problem-card-${i}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="relative z-20 flex items-center justify-center w-14 h-14 my-5 outline-none first:mt-0 last:mb-0 group cursor-pointer"
                  aria-label={`Go to problem ${problem.id}`}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive || isPast ? problem.accentColor : 'rgba(255,255,255,0.05)',
                      borderColor: isActive ? problem.accentColor : 'rgba(255,255,255,0.15)',
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center border font-mono font-black transition-all"
                    style={{
                      boxShadow: isActive ? `0 0 20px ${problem.accentColor}40` : 'none',
                    }}
                  >
                    <span className={isActive || isPast ? "text-white text-sm" : "text-gray-400 text-sm"}>
                      {problem.id}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Stack of beautifully animated cards that scroll naturally */}
        <div className="space-y-20 lg:space-y-28">
          {PROBLEMS.map((problem, index) => (
            <div
              key={problem.id}
              id={`problem-card-${index}`}
              className="scroll-mt-36"
            >
              <ProblemCardSpy
                problem={problem}
                index={index}
                onVisible={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
