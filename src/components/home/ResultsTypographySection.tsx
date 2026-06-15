import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SENTENCES = [
  "The result: 4–8x more content.",
  "50–65% more traffic.",
  "10–20 hours saved every week.",
  "Marketing that stops being an expense",
  "and starts being a revenue engine."
];

// Helper to highlight specific impact words
const renderLine = (line: string) => {
  const words = line.split(" ");
  return words.map((word, i) => {
    const isHighlight =
      word.includes("4–8x") ||
      word.includes("50–65%") ||
      word.includes("10–20") ||
      word.includes("revenue");

    return (
      <span key={i} className="inline-block mr-[0.25em] mb-[0.1em]">
        {isHighlight ? (
          <span
            style={{
              display: 'inline',
              background: 'linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {word}
          </span>
        ) : (
          word
        )}
      </span>
    );
  });
};

// ─── Isolated animated line component — hooks called at component level ────────
const AnimatedLine = ({
  line,
  index,
  total,
  scrollYProgress,
}: {
  line: string;
  index: number;
  total: number;
  scrollYProgress: any;
  key?: React.Key;
}) => {
  const step = 1 / total;
  const start = index * step * 0.8;
  const end = start + step;

  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const y = useTransform(scrollYProgress, [start, end], [30, 0]);
  const filter = useTransform(scrollYProgress, [start, end], ['blur(12px)', 'blur(0px)']);

  return (
    <motion.span className="block" style={{ opacity, y, filter }}>
      {renderLine(line)}
    </motion.span>
  );
};

export const ResultsTypographySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section
      ref={containerRef}
      className="relative grain-overlay results-typography-section"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl w-full px-6 md:px-12 text-center">
          <div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15]"
            style={{ color: 'var(--text-body)' }}
          >
            {SENTENCES.map((line, i) => (
              <AnimatedLine
                key={i}
                line={line}
                index={i}
                total={SENTENCES.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
