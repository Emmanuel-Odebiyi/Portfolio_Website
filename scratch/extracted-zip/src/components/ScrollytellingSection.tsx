import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
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
}

const WordReveal = ({ text, progress }: { text: string; progress: number }) => {
  const words = text.split(' ');
  const isComplete = progress >= 0.95;

  return (
    <motion.div 
      animate={{ opacity: isComplete ? 1 : 0.8 }}
      className="flex flex-wrap gap-x-2 gap-y-1"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = progress > end ? 1 : progress < start ? 0.1 : (progress - start) / (end - start);
        
        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="inline-block transition-opacity duration-300"
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({ title, milestones, themeColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate active milestone index
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * milestones.length), milestones.length - 1);
      setActiveIndex(index);
    });
  }, [scrollYProgress, milestones.length]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-zinc-50">
      {/* Global Sticky Timeline Header */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
          <div className="hidden md:block">
            <h2 className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">{title}</h2>
          </div>
          
          <div className="flex-1 relative h-1 bg-zinc-100 rounded-full">
            {/* Background Progress Line */}
            <motion.div
              className="absolute top-0 left-0 h-full origin-left rounded-full z-10"
              style={{ scaleX: smoothProgress, backgroundColor: themeColor, width: '100%' }}
            />
            
            {/* Milestone Dots */}
            <div className="absolute inset-0 flex justify-between items-center -top-1.5">
              {milestones.map((_, i) => {
                const isCompleted = i < activeIndex;
                const isActive = i === activeIndex;
                
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.25 : 1,
                        backgroundColor: isCompleted || isActive ? themeColor : "#f4f4f5",
                        borderColor: isActive ? themeColor : "transparent",
                      }}
                      className="w-4 h-4 rounded-full border-2 z-20 shadow-sm transition-colors duration-300"
                    />
                    {isActive && (
                      <motion.div
                        layoutId={`active-ring-${title}`}
                        className="absolute -inset-2 rounded-full border border-zinc-200 z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      />
                    )}
                    <div className="absolute top-6 whitespace-nowrap hidden lg:block">
                      <span className={`text-[9px] font-mono uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-zinc-900 font-bold' : 'text-zinc-400'}`}>
                        Step 0{i + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase hidden sm:block">
            {Math.round(smoothProgress.get() * 100)}% Complete
          </div>
        </div>
      </div>

      <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Milestones Content */}
        <div className="relative w-full max-w-7xl px-6 h-full flex items-center justify-center">
          {milestones.map((milestone, index) => {
            const start = index / milestones.length;
            const end = (index + 1) / milestones.length;
            
            // Local progress for this milestone (0 to 1)
            const milestoneProgress = useTransform(
              scrollYProgress,
              [start + 0.05, start + 0.3], // Reveal window
              [0, 1]
            );

            // Visibility window
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0]
            );

            const y = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [30, 0, 0, -30]
            );

            return (
              <motion.div
                key={milestone.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  opacity, 
                  y,
                  pointerEvents: activeIndex === index ? 'auto' : 'none'
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
                  <div className="space-y-10 order-2 lg:order-1">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]"
                      >
                        <span className="w-8 h-px bg-zinc-200" />
                        Milestone 0{index + 1}
                      </motion.div>
                      <h3 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
                        {milestone.title}
                      </h3>
                    </div>
                    
                    <div className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light max-w-xl">
                      <WordReveal text={milestone.text} progress={milestoneProgress.get()} />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-zinc-100"
                        style={{ backgroundColor: `${milestone.color}10`, color: milestone.color }}
                      >
                        <milestone.icon size={24} />
                      </div>
                      <div className="h-px flex-1 bg-zinc-100" />
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-zinc-200/50 border border-zinc-100 flex items-center justify-center p-8 lg:p-16 group">
                      {/* Abstract Illustration Container */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, 0]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-0 opacity-10 blur-3xl rounded-full"
                          style={{ backgroundColor: milestone.color }}
                        />
                        
                        <motion.img
                          src={milestone.illustration}
                          alt={milestone.title}
                          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                          referrerPolicy="no-referrer"
                          animate={{ 
                            y: [0, -15, 0],
                            rotate: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          whileHover={{ scale: 1.05 }}
                        />
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-8 right-8 w-12 h-12 border border-zinc-100 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      </div>
                      <div className="absolute bottom-8 left-8 flex gap-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-1 h-1 rounded-full bg-zinc-100" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-5 h-8 rounded-full border-2 border-zinc-300 flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-zinc-400 rounded-full" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
