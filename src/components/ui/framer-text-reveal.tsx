import React, { useRef, useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "motion/react";
import { cn } from "../../lib/utils";

interface FramerTextRevealProps {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  textClassName?: string;
}

export const FramerTextReveal: React.FC<FramerTextRevealProps> = ({
  text,
  progress,
  className,
  textClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const paragraphs = text.split(/\n+/).filter(Boolean);
  
  // Calculate total words
  const totalWords = paragraphs.reduce((acc, p) => acc + p.split(" ").filter(Boolean).length, 0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && textWrapperRef.current) {
        const viewportHeight = containerRef.current.clientHeight;
        const textHeight = textWrapperRef.current.clientHeight;
        
        // Ensure scroll amount dynamically maps based on viewport size.
        // We add some bottom spacing padding to scroll slightly past the last line beautifully.
        const extraPadding = viewportHeight * 0.15;
        const scrollAmt = Math.max(0, textHeight - viewportHeight + extraPadding);
        setMaxScroll(scrollAmt);
      }
    };

    // Delay measurement slightly to ensure DOM layout has fully settled.
    const timer = setTimeout(measure, 100);

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [text]);

  // Scroll ranges: Active scrolling runs between progress 0.05 and 0.8
  const rangeStart = 0.05;
  const rangeEnd = 0.8;
  const totalRange = rangeEnd - rangeStart;

  // Custom transformer for y scroll offset which responds to layout dimensions
  const y = useTransform(progress, (val: number) => {
    if (val <= rangeStart) return 0;
    if (val >= rangeEnd) return -maxScroll;
    const ratio = (val - rangeStart) / totalRange;
    return -maxScroll * ratio;
  });

  let globalWordIndex = 0;

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
      <motion.div
        ref={textWrapperRef}
        style={{ y }}
        className={cn("flex flex-col gap-6 pt-[20%] pb-20 relative z-10", textClassName)}
      >
        {paragraphs.map((p, pIndex) => {
          const words = p.split(" ").filter(Boolean);
          return (
            <div key={pIndex} className="flex flex-wrap mb-4">
              {words.map((word, wIndex) => {
                const index = globalWordIndex++;
                const wordStart = rangeStart + (index / totalWords) * totalRange;
                const wordEnd = Math.min(rangeEnd, wordStart + (1.3 / totalWords) * totalRange); // Overlap words slightly for organic transition flow

                return (
                  <Word
                    key={`${pIndex}-${wIndex}`}
                    word={word}
                    progress={progress}
                    start={wordStart}
                    end={wordEnd}
                  />
                );
              })}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

const Word: React.FC<WordProps> = ({ word, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  // Transitions from subtle gray watermark to a dark charcoal color, staying high-contrast regardless of site theme
  const color = useTransform(progress, [start, end], ["#a1a1aa", "#18181b"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="reveal-word relative mx-1 lg:mx-1.5 font-bold"
    >
      {word}
    </motion.span>
  );
};
