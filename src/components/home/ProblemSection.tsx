import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Users, Building2, Bot, PenTool } from 'lucide-react';

// ─── Custom Premium React / SVG animations ───────────────────────────────────

const FreelancerAnimation = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-[#e85d4a] fill-none">
      <circle cx="100" cy="100" r="16" className="fill-zinc-900 stroke-current stroke-2" />
      <circle cx="100" cy="100" r="6" className="fill-current" />
      <g>
        <line x1="100" y1="100" x2="50" y2="70" className="stroke-zinc-700 stroke-2" strokeDasharray="4,4" />
        <circle cx="50" cy="70" r="10" className="fill-zinc-900 stroke-zinc-700 stroke-2" />
      </g>
      <g>
        <line x1="100" y1="100" x2="150" y2="70" className="stroke-zinc-700 stroke-2" strokeDasharray="4,4" />
        <circle cx="150" cy="70" r="10" className="fill-zinc-900 stroke-zinc-700 stroke-2" />
      </g>
      <g>
        <motion.line 
          x1="100" y1="100" 
          animate={{ x2: [100, 100, 100, 100], y2: [150, 150, 180, 180], opacity: [1, 1, 0, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="stroke-[#e85d4a] stroke-2"
          strokeDasharray="4,4"
        />
        <motion.g
          animate={{ 
            x: [0, 0, 0, 0], 
            y: [0, 0, 30, 30],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.circle 
            cx="100" cy="150" r="16" 
            animate={{ 
              scale: [1, 1.4, 1, 1], 
              opacity: [0.4, 0, 0.4, 0.4],
              stroke: ["#10b981", "#10b981", "#e85d4a", "#e85d4a"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="fill-none stroke-2" 
          />
          <motion.circle 
            cx="100" cy="150" r="10" 
            animate={{ 
              stroke: ["#10b981", "#10b981", "#e85d4a", "#e85d4a"],
              fill: ["rgba(16,185,129,0.1)", "rgba(16,185,129,0.1)", "rgba(232,93,74,0.1)", "rgba(232,93,74,0.1)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="stroke-2" 
          />
          <motion.text
            x="100" y="175"
            textAnchor="middle"
            className="text-[10px] font-mono fill-zinc-500 font-bold"
            animate={{
              opacity: [0, 0, 1, 1],
              fill: ["#10b981", "#10b981", "#e85d4a", "#e85d4a"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            OFFLINE
          </motion.text>
        </motion.g>
      </g>
    </svg>
  );
};

const AgencyAnimation = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-[#f59e0b] fill-none">
      <rect x="20" y="20" width="160" height="130" rx="16" className="stroke-zinc-700 stroke-2 fill-zinc-900/60" />
      <line x1="20" y1="50" x2="180" y2="50" className="stroke-zinc-700 stroke-2" />
      <circle cx="35" cy="35" r="4" className="fill-red-500" />
      <circle cx="47" cy="35" r="4" className="fill-yellow-500" />
      <circle cx="59" cy="35" r="4" className="fill-green-500" />
      <motion.path 
        d="M 40 110 L 70 80 L 100 95 L 130 65 L 160 80" 
        className="stroke-[#f59e0b] stroke-2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [1, 1, 0, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path 
        d="M 40 110 Q 55 130 70 110 T 100 120 T 130 100 T 160 130" 
        className="stroke-red-400 stroke-2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4,4"
        animate={{
          pathLength: [0, 0, 1, 1],
          opacity: [0, 0, 1, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g
        className="fill-zinc-950"
        animate={{
          opacity: [0, 0, 1, 0],
          scale: [0.8, 0.8, 1, 0.8],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ transformOrigin: "100px 90px" }}
      >
        <rect x="70" y="75" width="60" height="24" rx="6" className="stroke-red-500/50 stroke fill-zinc-950" />
        <text x="100" y="90" textAnchor="middle" className="text-[8px] font-mono font-bold fill-red-400">JUNIOR WORK</text>
      </motion.g>
    </svg>
  );
};

const AIToolsAnimation = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-[#8b5cf6] fill-none">
      <motion.line
        x1="20" x2="180"
        animate={{ y: [40, 160, 40] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="stroke-[#8b5cf6] stroke-2"
        style={{ filter: "drop-shadow(0 0 8px #8b5cf6)" }}
      />
      <g>
        <path d="M 30 50 Q 55 20 80 50 T 130 50 T 170 50" className="stroke-blue-400 stroke-2" strokeLinecap="round" />
        <path d="M 30 70 Q 60 90 90 60 T 150 70" className="stroke-indigo-400 stroke-2" strokeLinecap="round" />
      </g>
      <g>
        <rect x="30" y="110" width="140" height="8" rx="2" className="fill-zinc-800/80 stroke-zinc-700 stroke" />
        <rect x="30" y="125" width="140" height="8" rx="2" className="fill-zinc-800/80 stroke-zinc-700 stroke" />
        <rect x="30" y="140" width="110" height="8" rx="2" className="fill-zinc-800/80 stroke-zinc-700 stroke" />
      </g>
      <motion.g
        animate={{
          opacity: [0.1, 0.9, 0.1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <text x="100" y="175" textAnchor="middle" className="text-[10px] font-mono font-black fill-zinc-500 tracking-[0.25em]">AI SLOP DETECTED</text>
      </motion.g>
    </svg>
  );
};

const DIYAnimation = () => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full text-[#10b981] fill-none">
      <motion.g
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="origin-[100px_90px]"
      >
        <circle cx="100" cy="90" r="24" className="stroke-[#10b981] stroke-2 fill-zinc-900/60" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="96" y="58" width="8" height="12" rx="2"
            transform={`rotate(${angle} 100 90)`}
            className="fill-[#10b981]"
          />
        ))}
        <circle cx="100" cy="90" r="8" className="fill-zinc-950 stroke-[#10b981] stroke" />
      </motion.g>
      <g>
        <motion.g
          animate={{
            x: [180, 128, 180],
            y: [40, 75, 40],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="0" cy="0" r="18" className="fill-zinc-950 stroke-red-500/50 stroke" />
          <text x="0" y="3" textAnchor="middle" className="text-[6px] font-mono font-bold fill-red-400">FIRE 🔥</text>
        </motion.g>
        <motion.g
          animate={{
            x: [20, 72, 20],
            y: [50, 85, 50],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <circle cx="0" cy="0" r="22" className="fill-zinc-950 stroke-amber-500/50 stroke" />
          <text x="0" y="3" textAnchor="middle" className="text-[6px] font-mono font-bold fill-amber-400">SALES 📞</text>
        </motion.g>
      </g>
      <g>
        <rect x="30" y="150" width="140" height="8" rx="4" className="fill-zinc-800/80 stroke-zinc-700 stroke" />
        <motion.rect
          x="32" y="152"
          height="4" rx="2"
          animate={{
            width: ["0%", "40%", "40%", "0%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="fill-red-400"
        />
        <text x="100" y="174" textAnchor="middle" className="text-[9px] font-mono font-bold fill-zinc-500">BLOG POST: 40% (STUCK)</text>
      </g>
    </svg>
  );
};

const ProblemAnimation = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return <FreelancerAnimation />;
    case 2:
      return <AgencyAnimation />;
    case 3:
      return <AIToolsAnimation />;
    case 4:
      return <DIYAnimation />;
    default:
      return null;
  }
};

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
        style={{ top: 28, height: TRACK_HEIGHT, backgroundColor: 'rgba(255,255,255,0.25)' }}
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
                  backgroundColor: isActive || isPast ? problem.accentColor : '#e4e4e7',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg origin-center"
                style={{
                  boxShadow: isActive ? `0 0 20px ${problem.accentColor}55` : '0 1px 4px rgba(0,0,0,0.1)',
                }}
              >
                <motion.span
                  className="text-xl font-black leading-none"
                  animate={{
                    color: isActive || isPast ? '#fff' : '#d4d4d8',
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
            className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase"
            style={{ backgroundColor: `${problem.accentColor}20`, color: problem.accentColor }}
          >
            {problem.tag}
          </span>

          {/* Large number — improved contrast and numeric variant */}
          <div className="select-none pointer-events-none -mb-2 md:mb-0">
            <span
              className="text-6xl md:text-[10rem] font-black leading-none tracking-tighter block opacity-85"
              style={{ color: problem.accentColor, fontVariantNumeric: 'tabular-nums' }}
            >
              {String(problem.id).padStart(2, '0')}
            </span>
          </div>

          {/* Headline — word-by-word reveal */}
          <h2 className="text-2xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl -mt-2 md:-mt-4">
            <ScrollRevealText
              text={problem.headline}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.3}
            />
          </h2>

          {/* Body — word-by-word reveal */}
          <p className="text-sm md:text-2xl max-w-3xl leading-relaxed" style={{ color: 'rgba(241,245,249,0.95)' }}>
            <ScrollRevealText
              text={problem.body}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.3}
              endProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.65}
            />
          </p>

          {/* Detail — word-by-word reveal, colored italic */}
          <p className="text-sm md:text-xl italic font-semibold max-w-3xl leading-relaxed">
            <ScrollRevealText
              text={problem.detail}
              scrollYProgress={scrollYProgress}
              startProgress={textRevealStart + (textRevealEnd - textRevealStart) * 0.65}
              endProgress={textRevealEnd}
              style={{ color: problem.accentColor }}
            />
          </p>
        </div>

        {/* Icon Illustration — right side, matching the screenshot */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end -mb-4 md:mb-0">
          <div className="relative group/icon">
            {/* Subtle White "Lift" Gradient — separates from deep background without sharp edges */}
            <div 
              className="absolute inset-0 rounded-full blur-[60px] md:blur-[100px] opacity-40 group-hover/icon:opacity-50 transition-opacity duration-700"
              style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
            />
            
            {/* Primary Accent Glow (Existing) */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{ backgroundColor: problem.accentColor }}
            />

            {/* Icon container — ensured no background and added subtle drop-shadow */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 md:w-80 md:h-80 flex items-center justify-center relative z-10"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <ProblemAnimation id={problem.id} />
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[var(--dark-surface)]">
        {/* Section label — top center */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.35em] uppercase" style={{ color: 'rgba(251,191,36,1)', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', padding: '6px 16px', borderRadius: '999px', backdropFilter: 'blur(8px)', display: 'inline-block' }}>
            The Problem
          </span>
        </div>

        {/* Radial accent glow — shifts with active problem color, stronger on dark bg */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse 55% 55% at 65% 50%, ${PROBLEMS[activeIndex].accentColor}18 0%, transparent 70%)`,
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
                opacity: i === activeIndex ? 1 : 0.25,
                backgroundColor: i === activeIndex ? p.accentColor : 'rgba(255,255,255,0.3)',
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
