import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollMaskText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Creates an intersection-observer like effect using scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 30%'] // Begins revealing near the bottom of viewport
  });

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })}
    </span>
  );
};

const Word = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  // Linearly interpolates opacity from 15% to 100% based on the word's position in the sequence
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    <span className="relative mr-[0.25em] mt-[0.05em] will-change-opacity">
      <span className="absolute opacity-0">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
