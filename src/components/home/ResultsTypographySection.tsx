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

export const ResultsTypographySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position relative to this section
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scroll progress to give it that buttery "fader" feel
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
      {/* Sticky viewport bounds the text to the center area */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden py-12 md:py-16 lg:py-20">
        
        {/* We constrain the max-width to center it and apply pure text-center for alignment */}
        <div className="max-w-4xl w-full px-6 md:px-12 text-center">
          
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.2]" style={{ color: 'var(--text-body)' }}>
            {SENTENCES.map((line, i) => {
              // Calculate stagger logic: Each line gets a 15% window of the scroll length to fade in
              const step = 1 / SENTENCES.length;
              const start = i * step * 0.8; // multiplying by 0.8 condenses the reveal so it finishes before the absolute bottom
              const end = start + step;

              const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
              const y = useTransform(scrollYProgress, [start, end], [30, 0]);
              const filter = useTransform(scrollYProgress, [start, end], ['blur(12px)', 'blur(0px)']);
              
              return (
                <motion.span 
                  key={i} 
                  className="block"
                  style={{ opacity, y, filter }}
                >
                  {renderLine(line)}
                </motion.span>
              );
            })}
          </p>
          
        </div>
      </div>
    </section>
  );
};
