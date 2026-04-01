import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface Milestone {
  id: number;
  title: string;
  text: string;
  icon: LucideIcon;
  illustration: string;
  color: string;
}

interface ScrollytellingSectionProps {
  title: string;
  milestones: Milestone[];
  themeColor: string;
  variant?: 'problem' | 'solution';
}

// ----------------------------------------------------
// 1. Fully Optimized Word Reveal (0 React render lag)
// ----------------------------------------------------
export const WordReveal = ({ text, wordProgress, className = "" }: { text: string; wordProgress: MotionValue<number>; className?: string }) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);

        // Native framer-motion transforms for hyper-smooth 60fps interpolation
        const opacity = useTransform(wordProgress, [start, end], [0, 1]);
        const y = useTransform(wordProgress, [start, end], [10, 0]);

        return (
          <motion.span
            key={i}
            style={{ opacity, y }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

// ----------------------------------------------------
// 2. High-Quality Contextual Illustration Block
// ----------------------------------------------------
const IllustrationBlock = ({ icon: Icon, color }: { icon: LucideIcon; color: string }) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center group transform-gpu">
      {/* Organic Background glow - unclipped */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full blur-3xl transform-gpu"
        style={{ backgroundColor: color }}
      />

      {/* Central Floating Vector */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center transform-gpu"
      >
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={180} className="w-40 h-40 lg:w-64 lg:h-64 opacity-90 drop-shadow-2xl" style={{ color }} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Auxiliary Vectors */}
      <motion.div
        animate={{ y: [-30, 30, -30], x: [15, -15, 15], rotate: [0, 45, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-12 lg:right-24 w-12 h-12 rounded-2xl border border-zinc-200/50 flex items-center justify-center shadow-sm transform-gpu backdrop-blur-sm"
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      </motion.div>
      <motion.div
        animate={{ y: [35, -35, 35], x: [-20, 20, -20], rotate: [0, -45, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-16 left-12 lg:left-24 w-16 h-16 rounded-full border border-zinc-200/50 flex items-center justify-center shadow-sm transform-gpu backdrop-blur-sm"
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      </motion.div>
    </div>
  );
};

// ----------------------------------------------------
// 3. Isolated Scroll Section
// ----------------------------------------------------
const ScrollSection = ({ milestone, opacity, wordProgress }: { key?: React.Key, milestone: Milestone, opacity: MotionValue<number>, wordProgress: MotionValue<number> }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center px-6 pointer-events-none transform-gpu"
      style={{ opacity }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Text Content */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs uppercase tracking-[0.25em]">
              <span className="w-8 h-px bg-zinc-200" />
              <span style={{ color: milestone.color }}>Phase 0{milestone.id}</span>
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
              {milestone.title}
            </h3>
          </div>

          <div className="text-xl md:text-[1.4rem] text-zinc-500 font-light leading-[1.8] max-w-2xl pb-4">
            <WordReveal text={milestone.text} wordProgress={wordProgress} />
          </div>
        </div>

        {/* Vector Contextual Illustration */}
        <div className="order-1 lg:order-2 flex lg:justify-end justify-center w-full">
          <IllustrationBlock icon={milestone.icon} color={milestone.color} />
        </div>

      </div>
    </motion.div>
  );
};

// ----------------------------------------------------
// 4. Per-Milestone Animator — fixes React Hook violation
//    (hooks were previously called inside a .map() loop)
//    Each milestone gets its own component instance so
//    useTransform is called legally at the top level.
// ----------------------------------------------------
const AnimatedMilestone = ({
  milestone,
  index,
  total,
  scrollYProgress,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const block = 1 / total;
  const start = index * block;
  const end = (index + 1) * block;

  // Tight non-overlapping opacity windows:
  // Each milestone is fully opaque over the MIDDLE of its block.
  // Crossfade in/out is only 6% wide — a quick, clean snap.
  const FADE = block * 0.06;

  let opacityFrames: number[];
  let opacityVals: number[];

  if (index === 0) {
    // First: already visible at scroll=0, hold, then fade out near the end
    opacityFrames = [0, end - FADE, end];
    opacityVals   = [1, 1, 0];
  } else if (index === total - 1) {
    // Last: fade in at start of its block, hold through to end
    opacityFrames = [start, start + FADE, 1];
    opacityVals   = [0, 1, 1];
  } else {
    // Middle: fade in, hold, fade out
    opacityFrames = [start, start + FADE, end - FADE, end];
    opacityVals   = [0, 1, 1, 0];
  }

  const opacity = useTransform(scrollYProgress, opacityFrames, opacityVals);

  // Word reveal fires over the first 45% of the block
  const wordStart = index === 0 ? 0 : start + FADE;
  const wordEnd   = index === 0 ? block * 0.45 : start + FADE + block * 0.45;
  const wordProgress = useTransform(
    scrollYProgress,
    [wordStart, Math.min(wordEnd, end - FADE)],
    [0, 1]
  );

  return (
    <ScrollSection
      milestone={milestone}
      opacity={opacity}
      wordProgress={wordProgress}
    />
  );
};

import { ProblemNavigator } from './ProblemNavigator';

// ----------------------------------------------------
// 5. Main Component
// ----------------------------------------------------
export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({ title, milestones, themeColor, variant = 'problem' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Navbar Visibility Control — hides the floating header inside the scrolly zone
  // so it never intercepts scroll-linked click targets.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const header = document.querySelector('header');
        if (header) {
          if (entry.isIntersecting) {
            header.style.opacity = '0';
            header.style.pointerEvents = 'none';
          } else {
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
          }
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      const header = document.querySelector('header');
      if (header) {
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
      }
    };
  }, []);

  const SCROLL_HEIGHT = `${milestones.length * 250}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  // Active milestone tracker — drives the ProblemNavigator dots
  const [currentActiveId, setCurrentActiveId] = React.useState(milestones[0].id);
  React.useEffect(() => {
    return smoothProgress.on('change', (p) => {
      const idx = Math.min(Math.floor(p * milestones.length), milestones.length - 1);
      setCurrentActiveId(milestones[idx].id);
    });
  }, [smoothProgress, milestones]);

  const handleNodeClick = (id: number) => {
    if (containerRef.current) {
      const index = milestones.findIndex(m => m.id === id);
      if (index === -1) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const totalScrollableHeight = container.scrollHeight - window.innerHeight;

      const blockHeight = totalScrollableHeight / milestones.length;
      // Scroll to the midpoint of the block for max opacity visibility
      const targetScroll = absoluteTop + (index * blockHeight) + (blockHeight * 0.5);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const navNodes = milestones.map(m => ({
    id: m.id,
    label: variant === 'problem' ? `Problem 0${m.id}` : `Step 0${m.id}`
  }));

  return (
    <motion.div
      ref={containerRef}
      className="relative z-[100] transition-colors duration-700"
      style={{ height: SCROLL_HEIGHT, backgroundColor: 'transparent' }}
    >
      {/*
        ProblemNavigator is ONLY rendered for the 'problem' variant.
        This prevents two overlapping fixed tracker bars when the
        solution scrollytelling section is also on the page.
      */}
      {variant === 'problem' && (
        <ProblemNavigator
          nodes={navNodes}
          activeId={currentActiveId}
          onNodeClick={handleNodeClick}
          accentColor={themeColor}
          progress={smoothProgress}
        />
      )}

      {/* Scrollytelling Execution Stack — offset below both main nav (64px) + tracker bar (~46px) */}
      <div className="sticky top-[110px] h-[calc(100vh-110px)] w-full overflow-hidden flex items-center relative">
        {milestones.map((milestone, index) => (
          <AnimatedMilestone
            key={milestone.id}
            milestone={milestone}
            index={index}
            total={milestones.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </motion.div>
  );
};
