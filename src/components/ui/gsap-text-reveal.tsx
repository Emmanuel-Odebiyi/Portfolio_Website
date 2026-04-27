import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

// Register ScrollTrigger exactly once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPTextRevealProps {
  text: string;
  className?: string;
  textClassName?: string;
}

export const GSAPTextReveal: React.FC<GSAPTextRevealProps> = ({
  text,
  className,
  textClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  const paragraphs = text.split(/\n+/).filter(Boolean);

  useEffect(() => {
    if (!containerRef.current || !textWrapperRef.current) return;

    // Find the h-[400vh] parent from ContainerScroll to use as scroll trigger
    const superParent = containerRef.current.closest('[class*="h-\\[400vh\\]"]') 
      || containerRef.current.closest('.h-\\[400vh\\]')
      || containerRef.current.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".reveal-word", containerRef.current!);

      // Calculate how far the text block needs to scroll up
      const viewportHeight = containerRef.current?.clientHeight || 0;
      const textHeight = textWrapperRef.current?.clientHeight || 0;
      const maxScroll = Math.max(0, textHeight - viewportHeight + 80);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: superParent || containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.8,
        }
      });

      // 1. Scroll the text block upwards over the full timeline duration
      tl.to(textWrapperRef.current, {
        y: -maxScroll,
        ease: "none",
        duration: 10, // relative duration units (scrub maps this proportionally)
      }, 0);

      // 2. Each word transitions individually from gray → dark
      //    Using fromTo so the inactive state is guaranteed to be gray at t=0
      words.forEach((word, i) => {
        const startTime = (i / words.length) * 9;
        const endTime = startTime + (9 / words.length);
        tl.fromTo(word,
          { color: "#a1a1aa", opacity: 0.08 },  // subtle watermark — barely visible
          { color: "#18181b", opacity: 1, ease: "none", duration: endTime - startTime },
          startTime
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
      {/* Increased pt to push first line into a clean starting position */}
      <div ref={textWrapperRef} className={cn("flex flex-col gap-5 pt-[22%] relative z-10", textClassName)}>
        {paragraphs.map((p, pIndex) => (
          <div key={pIndex} className="flex flex-wrap">
            {p.split(" ").map((word, wIndex) => (
              <span
                key={`${pIndex}-${wIndex}`}
                className="reveal-word relative mx-1 lg:mx-1.5 font-bold"
                style={{ color: "#a1a1aa", opacity: 0.08 }}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
