import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Users, Building2, Bot, PenTool } from 'lucide-react';
import Lottie from 'lottie-react';

// ─── Lottie Loader component with smooth entry transition ───────────────────

const LottieLoader = ({ path, style }: { path: string; style?: React.CSSProperties }) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (active) {
          setAnimationData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading Lottie animation:", err);
        if (active) {
          setIsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [path]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-8 h-8 rounded-full border-2 animate-spin" 
              style={{
                borderColor: 'color-mix(in srgb, var(--text-body) 10%, transparent)',
                borderTopColor: 'var(--text-body)'
              }}
            />
          </motion.div>
        ) : animationData ? (
          <motion.div
            key="lottie"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center"
          >
            <Lottie 
              animationData={animationData} 
              loop={true} 
              autoplay={true} 
              style={style} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-500 font-mono text-[10px]"
          >
            Failed to load animation
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Problem Data ─────────────────────────────────────────────────────────────

interface Problem {
  id: number;
  tag: string;
  headline: string;
  body: string;
  detail: string;
  icon: React.ElementType;
  animationPath: string;
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

// ─── Word-by-Word Component ───────────────────────────────────────────────

const ProblemWord = ({ 
  word, 
  scrollYProgress, 
  start, 
  end, 
  accentColor 
}: { 
  word: string; 
  scrollYProgress: any; 
  start: number; 
  end: number; 
  accentColor: string;
}) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: 'inline-block' }}
      className="will-change-[opacity,transform] translate-z-0"
    >
      {word}
    </motion.span>
  );
};


// ─── Word-by-Word Scroll Reveal ───────────────────────────────────────────────

const ScrollRevealText = ({
  text,
  scrollYProgress,
  startProgress,
  endProgress,
  accentColor = '#3b82f6',
  className = '',
  style = {},
}: {
  text: string;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const words = text.split(' ');
  const step = (endProgress - startProgress) / Math.max(words.length, 1);

  return (
    <span className={className} style={style}>
      {words.map((word, i) => {
        const wordStart = startProgress + i * step;
        const wordEnd = Math.min(wordStart + step * 2.5, endProgress);

        return (
          <React.Fragment key={i}>
            <ProblemWord 
              word={word} 
              scrollYProgress={scrollYProgress} 
              start={wordStart} 
              end={wordEnd} 
              accentColor={accentColor} 
            />
            {' '}
          </React.Fragment>
        );
      })}
    </span>
  );
};

// ─── Vertical Side Navigator (matches the user's template) ───────────────────

const VerticalNavigator = ({
  activeIndex,
  onNodeClick,
  progress,
}: {
  activeIndex: number;
  onNodeClick: (i: number) => void;
  progress: any;
}) => {
  const NODE_GAP = 96; // px between nodes
  const TRACK_HEIGHT = (PROBLEMS.length - 1) * NODE_GAP;

  // Smooth color transition for the track as it grows
  const fillColor = useTransform(
    progress,
    [...PROBLEMS.map((_, i) => i / PROBLEMS.length), 1],
    [...PROBLEMS.map(p => p.accentColor), PROBLEMS[PROBLEMS.length - 1].accentColor]
  );

  return (
    <div
      className="hidden lg:flex absolute left-[-100px] top-1/2 -translate-y-1/2 flex-col items-center pointer-events-auto"
      style={{ height: TRACK_HEIGHT + 56, width: 56 }}
      aria-label="Problem navigation"
    >
      {/* Background track line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[4px] rounded-full z-0"
        style={{ top: 28, height: TRACK_HEIGHT, backgroundColor: 'var(--border-card)' }}
      />

      {/* Filled progress line - Using scaleY for GPU acceleration */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[4px] rounded-full origin-top will-change-transform z-10"
        style={{ 
          top: 28, 
          height: TRACK_HEIGHT,
          scaleY: progress, 
          backgroundColor: fillColor 
        }}
      />

      {/* Nodes */}
      {PROBLEMS.map((problem, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <div key={problem.id} className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: i * NODE_GAP }}>
            <button
              onClick={() => onNodeClick(i)}
              className="relative flex items-center justify-center cursor-pointer outline-none group"
              style={{ width: 56, height: 56 }}
              aria-label={`Go to problem ${problem.id}`}
              title={problem.tag}
            >
              {/* Circle node wrapper - expands when active */}
              <motion.div
                animate={{
                  scale: isActive ? 1.25 : 1, // Enlarge active node
                  backgroundColor: isActive || isPast ? problem.accentColor : 'var(--bg-surface-alt)',
                  borderColor: isActive || isPast ? problem.accentColor : 'var(--border-card)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full flex items-center justify-center border shadow-lg origin-center"
                style={{
                  boxShadow: isActive ? `0 0 20px ${problem.accentColor}55` : '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <motion.span
                  className="text-xl font-black leading-none"
                  animate={{
                    color: isActive || isPast ? '#fff' : 'var(--text-muted)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {problem.id}
                </motion.span>
              </motion.div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

// ─── Problem Card (full-screen, fade in/out per scroll block) ─────────────────

const ProblemCard: React.FC<{
  problem: Problem;
  index: number;
  total: number;
  scrollYProgress: any;
}> = ({
  problem,
  index,
  total,
  scrollYProgress,
}) => {
  const block = 1 / total;
  const start = index * block;
  const end = (index + 1) * block;

  // Fade timing
  const fadeInStart = start;
  const fadeInEnd = start + block * 0.10;
  const fadeOutStart = end - block * 0.10;
  const fadeOutEnd = end;

  // Text reveal window (fills the middle 60% of the block)
  const textRevealStart = start + block * 0.08;
  const textRevealEnd = start + block * 0.70;

  // Build opacity keyframes
  let opacityKeyframes: number[];
  let opacityValues: number[];

  if (index === 0) {
    // First card: visible from start, fades out at end
    opacityKeyframes = [0, fadeOutStart, fadeOutEnd];
    opacityValues = [1, 1, 0];
  } else if (index === total - 1) {
    // Last card: fades in, stays visible
    opacityKeyframes = [fadeInStart, fadeInEnd, 1];
    opacityValues = [0, 1, 1];
  } else {
    // Middle cards: fade in, hold, fade out
    opacityKeyframes = [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd];
    opacityValues = [0, 1, 1, 0];
  }

  const opacity = useTransform(scrollYProgress, opacityKeyframes, opacityValues);
  const Icon = problem.icon;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24 pointer-events-none"
      style={{ opacity }}
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
        {/* Text Content — matches the screenshot layout */}
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1 text-left">

          {/* Tag pill — left aligned */}
          <span
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase border"
            style={{ 
              backgroundColor: `color-mix(in srgb, ${problem.accentColor} 12%, transparent)`, 
              borderColor: `color-mix(in srgb, ${problem.accentColor} 25%, transparent)`,
              color: problem.accentColor 
            }}
          >
            {problem.tag}
          </span>

          {/* Large number — improved contrast and numeric variant */}
          <div className="select-none pointer-events-none -mb-2 md:mb-0">
            <span
              className="text-6xl sm:text-8xl md:text-[10rem] font-black leading-none tracking-tighter block opacity-85"
              style={{ color: problem.accentColor, fontVariantNumeric: 'tabular-nums' }}
            >
              {String(problem.id).padStart(2, '0')}
            </span>
          </div>

          {/* Headline — word-by-word reveal */}
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl -mt-2 md:-mt-4" style={{ color: 'var(--text-body)' }}>
            <ScrollRevealText
              text={problem.headline}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.3}
            />
          </h2>

          {/* Body — word-by-word reveal */}
          <p className="text-sm sm:text-base md:text-2xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <ScrollRevealText
              text={problem.body}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.3}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.65}
            />
          </p>

          {/* Detail — word-by-word reveal, colored italic */}
          <p className="text-sm sm:text-base md:text-xl italic font-semibold max-w-3xl leading-relaxed">
            <ScrollRevealText
              text={problem.detail}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.65}
              endProgress={textRevealEnd}
              style={{ color: problem.accentColor }}
            />
          </p>
        </div>

        {/* Icon Illustration — right side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end mt-16 lg:mt-0 -mb-4 md:mb-0">
          <div className="relative group/icon">
            {/* Icon container — clean, no background glow */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 md:w-80 md:h-80 flex items-center justify-center relative z-10"
            >
              <div className="w-full h-full flex items-center justify-center">
                <LottieLoader 
                  path={problem.animationPath} 
                  style={{ width: '100%', height: '100%', background: 'transparent' }} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ProblemSection ──────────────────────────────────────────────────────

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const SCROLL_HEIGHT = `${PROBLEMS.length * 200}vh`;
  const [navVisible, setNavVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active problem index
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    return smoothProgress.on('change', (p: number) => {
      const idx = Math.min(
        Math.floor(p * PROBLEMS.length),
        PROBLEMS.length - 1
      );
      setActiveIndex(idx);
    });
  }, [smoothProgress]);

  // Navigate to a specific problem on dot click
  const handleNodeClick = (targetIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const blockHeight = totalScrollable / PROBLEMS.length;
    const targetScroll = absoluteTop + targetIndex * blockHeight + blockHeight * 0.3;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Hide main navbar while inside this section + control navigator visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const header = document.querySelector('header');
        if (!header) return;
        if (entry.isIntersecting) {
          (header as HTMLElement).style.opacity = '0';
          (header as HTMLElement).style.pointerEvents = 'none';
          setNavVisible(true);
        } else {
          (header as HTMLElement).style.opacity = '1';
          (header as HTMLElement).style.pointerEvents = 'auto';
          setNavVisible(false);
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      const header = document.querySelector('header');
      if (header) {
        (header as HTMLElement).style.opacity = '1';
        (header as HTMLElement).style.pointerEvents = 'auto';
      }
      setNavVisible(false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative grain-overlay"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="The Problem Section"
    >
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-surface-alt) 80%, transparent)' }}>
        {/* Section label — top center */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <span 
            className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.35em] uppercase border" 
            style={{ 
              color: 'var(--accent-amber)', 
              backgroundColor: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)', 
              borderColor: 'color-mix(in srgb, var(--accent-amber) 25%, transparent)',
              padding: '6px 16px', 
              borderRadius: '999px', 
              display: 'inline-block' 
            }}
          >
            The Problem
          </span>
        </div>

        {/* Problem cards stacked */}
        <div className="absolute inset-0">
          {PROBLEMS.map((problem, index) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              index={index}
              total={PROBLEMS.length}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Bottom progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.id}
              animate={{
                width: i === activeIndex ? 24 : 6,
                opacity: i === activeIndex ? 1 : 0.25,
                backgroundColor: i === activeIndex ? p.accentColor : 'var(--text-muted)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        {/* Vertical navigator — wrapped in a content-aligned container to keep it close to the text */}
        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24 pointer-events-none z-[200]">
          <div className="w-full max-w-6xl relative h-full">
            <VerticalNavigator
              activeIndex={activeIndex}
              onNodeClick={handleNodeClick}
              progress={smoothProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
