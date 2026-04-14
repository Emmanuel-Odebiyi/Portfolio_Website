"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

import { cn } from "../../lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  textClassName?: string;
  progress?: MotionValue<number>;
  range?: [number, number];
}

const TextRevealByWordInternal = ({ 
  text, 
  textClassName, 
  progress, 
  customRange 
}: { 
  text: string; 
  textClassName?: string; 
  progress: MotionValue<number>; 
  customRange: [number, number]; 
}) => {
  // Split by spaces but preserve newlines!
  // A robust way to tokenize including newlines:
  const words = text.split(/(\n|<br\/>)/).flatMap(s => s.split(" ")).filter(Boolean);
  const totalWords = words.length;

  return (
    <div
      className={cn(
        "flex flex-wrap font-bold text-zinc-900",
        textClassName
      )}
    >
      {words.map((word, i) => {
        // If it's a newline string, break the flex column!
        if (word === "\n" || word === "<br/>") {
          return <div key={i} className="basis-full h-1 md:h-3" />;
        }

        const start = customRange[0] + (i / totalWords) * (customRange[1] - customRange[0]);
        const end = customRange[0] + ((i + 1) / totalWords) * (customRange[1] - customRange[0]);
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

const TextRevealWithScroll = ({ text, className, textClassName }: Omit<TextRevealByWordProps, 'progress' | 'range'>) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 60%", "end 60%"]
  });

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[150vh]", className)}>
      <div className={"sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent"}>
        <TextRevealByWordInternal 
          text={text} 
          textClassName={textClassName} 
          progress={scrollYProgress} 
          customRange={[0, 1]} 
        />
      </div>
    </div>
  );
};

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  textClassName,
  progress,
  range = [0, 1]
}) => {
  if (progress) {
    return (
      <TextRevealByWordInternal 
        text={text} 
        textClassName={textClassName} 
        progress={progress} 
        customRange={range as [number, number]} 
      />
    );
  }

  return (
    <TextRevealWithScroll 
      text={text} 
      className={className} 
      textClassName={textClassName} 
    />
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute text-zinc-400 opacity-40"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-zinc-900"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
