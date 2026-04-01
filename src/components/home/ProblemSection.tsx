import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Users, Building2, Bot, PenTool } from 'lucide-react';

// ─── Problem Data ─────────────────────────────────────────────────────────────

interface Problem {
  id: number;
  tag: string;
  headline: string;
  body: string;
  detail: string;
  icon: React.ElementType;
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
    accentColor: '#e85d4a',
  },
  {
    id: 2,
    tag: 'The Agency Problem',
    headline: 'Slick Deck. Impressive Pitch. Junior Work.',
    body: "You tried an agency. Slick deck. Impressive pitch. Then the invoice arrived: $8,000/month, six-month minimum.",
    detail: "Three months later you're getting junior work at senior prices, and a simple revision takes two weeks.",
    icon: Building2,
    accentColor: '#f59e0b',
  },
  {
    id: 3,
    tag: 'The AI Tools Problem',
    headline: 'ChatGPT Felt Like a Breakthrough. Then You Read It Back.',
    body: "It sounded like every other bland, generic article online. Worse, it sounded nothing like you.",
    detail: "Your brand voice? Gone. Your differentiation? Erased. Your audience can tell — and they're clicking away.",
    icon: Bot,
    accentColor: '#8b5cf6',
  },
  {
    id: 4,
    tag: 'The DIY Problem',
    headline: "You're the Expert. So You Should Write It — Right?",
    body: "Except you're also the one running sales calls, managing the team, solving operational fires, and keeping clients happy.",
    detail: "So the blog post gets written at 11 PM — when it gets written at all. Three weeks later, nothing published. Again.",
    icon: PenTool,
    accentColor: '#10b981',
  },
];

// ─── Word-by-Word Scroll Reveal ───────────────────────────────────────────────

const ScrollRevealText = ({
  text,
  scrollYProgress,
  startProgress,
  endProgress,
  className = '',
  style = {},
}: {
  text: string;
  scrollYProgress: any;
  startProgress: number;
  endProgress: number;
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
        const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.12, 1]);
        const y = useTransform(scrollYProgress, [wordStart, wordEnd], [8, 0]);

        return (
          <React.Fragment key={i}>
            <motion.span
              style={{ opacity, y, display: 'inline-block' }}
              className="will-change-[opacity,transform]"
            >
              {word}
            </motion.span>
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

  // Linear progress mapping: map 0-1 scroll to 0-TRACK_HEIGHT pixels
  const fillHeight = useTransform(
    progress,
    [...PROBLEMS.map((_, i) => i / PROBLEMS.length), 1],
    [...PROBLEMS.map((_, i) => i * NODE_GAP), TRACK_HEIGHT]
  );

  // Smooth color transition for the track as it grows
  const fillColor = useTransform(
    progress,
    [...PROBLEMS.map((_, i) => i / PROBLEMS.length), 1],
    [...PROBLEMS.map(p => p.accentColor), PROBLEMS[PROBLEMS.length - 1].accentColor]
  );

  return (
    <div
      className="absolute left-16 md:left-24 lg:left-32 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-center"
      style={{ height: TRACK_HEIGHT + 56 }}
      aria-label="Problem navigation"
    >
      {/* Background track line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full"
        style={{ top: 28, height: TRACK_HEIGHT, backgroundColor: '#e4e4e7' }}
      />

      {/* Filled progress line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full origin-top"
        style={{ 
          top: 28, 
          height: fillHeight, 
          backgroundColor: fillColor 
        }}
      />

      {/* Nodes */}
      {PROBLEMS.map((problem, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;

        return (
          <div key={problem.id} className="absolute" style={{ top: i * NODE_GAP }}>
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
                  backgroundColor: isActive || isPast ? problem.accentColor : '#e4e4e7',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md origin-center"
                style={{
                  boxShadow: isActive ? `0 0 20px ${problem.accentColor}55` : '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <motion.span
                  className="text-xl font-black leading-none"
                  animate={{
                    color: isActive || isPast ? '#fff' : '#a1a1aa',
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

const ProblemCard = ({
  problem,
  index,
  total,
  scrollYProgress,
}: {
  problem: Problem;
  index: number;
  total: number;
  scrollYProgress: any;
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
        <div className="space-y-6 order-2 lg:order-1">

          {/* Tag pill — left aligned */}
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
            style={{ backgroundColor: `${problem.accentColor}20`, color: problem.accentColor }}
          >
            {problem.tag}
          </span>

          {/* Large number — higher contrast */}
          <div>
            <span
              className="text-8xl md:text-[10rem] font-black leading-none select-none tracking-tighter block"
              style={{ color: `${problem.accentColor}A6` }}
            >
              {String(problem.id).padStart(2, '0')}
            </span>
          </div>

          {/* Headline — word-by-word reveal */}
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] max-w-3xl -mt-4">
            <ScrollRevealText
              text={problem.headline}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.4}
            />
          </h2>

          {/* Body — word-by-word reveal */}
          <p className="text-lg md:text-2xl text-zinc-600 max-w-3xl leading-relaxed">
            <ScrollRevealText
              text={problem.body}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.4}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.75}
            />
          </p>

          {/* Detail — word-by-word reveal, colored italic */}
          <p className="text-lg md:text-xl italic font-semibold max-w-3xl leading-relaxed">
            <ScrollRevealText
              text={problem.detail}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.75}
              endProgress={textRevealEnd}
              style={{ color: problem.accentColor }}
            />
          </p>
        </div>

        {/* Icon Illustration — right side, matching the screenshot */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow blob */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{ backgroundColor: problem.accentColor }}
            />
            {/* Icon container */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] border flex items-center justify-center"
              style={{
                backgroundColor: `${problem.accentColor}10`,
                borderColor: `${problem.accentColor}25`,
              }}
            >
              <Icon
                size={72}
                strokeWidth={1}
                style={{ color: problem.accentColor }}
                className="md:w-24 md:h-24"
              />
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
      className="relative"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="The Problem Section"
    >
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-white">
        {/* Section label — top center */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase text-zinc-800 bg-zinc-100/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
            The Problem
          </span>
        </div>

        {/* Subtle radial accent glow — shifts with active problem color */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse 50% 50% at 65% 50%, ${PROBLEMS[activeIndex].accentColor}06 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

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
                opacity: i === activeIndex ? 1 : 0.3,
                backgroundColor: i === activeIndex ? p.accentColor : '#d4d4d8',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>

        {/* Vertical navigator — left side, naturally sticky in this container */}
        <VerticalNavigator
          activeIndex={activeIndex}
          onNodeClick={handleNodeClick}
          progress={smoothProgress}
        />
      </div>
    </div>
  );
};
