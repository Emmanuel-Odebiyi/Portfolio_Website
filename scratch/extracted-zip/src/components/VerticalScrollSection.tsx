import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface VerticalItem {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  illustration?: string;
  color?: string;
  author?: string;
  role?: string;
}

interface VerticalScrollSectionProps {
  items: VerticalItem[];
  sectionId: string;
}

export const VerticalScrollSection: React.FC<VerticalScrollSectionProps> = ({ items, sectionId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [items.length]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id={sectionId} className="relative bg-white">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to section ${i + 1}`}
          >
            <span className={`absolute right-6 px-2 py-1 rounded bg-zinc-900 text-white text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
              {sectionId === 'numbers' ? `Case 0${i + 1}` : `Review 0${i + 1}`}
            </span>
            <div className={`w-2 h-2 rounded-full border transition-all duration-500 ${
              activeIndex === i 
                ? 'bg-zinc-900 border-zinc-900 scale-150 shadow-lg shadow-zinc-200' 
                : 'bg-transparent border-zinc-300 hover:border-zinc-400'
            }`} />
          </button>
        ))}
      </div>

      <div className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth no-scrollbar">
        {items.map((item, index) => (
          <section 
            key={item.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-start h-screen w-full flex items-center justify-center bg-white overflow-hidden px-6 relative"
          >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  {item.subtitle && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]"
                    >
                      {item.subtitle}
                    </motion.p>
                  )}
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
                    {item.title}
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="text-2xl lg:text-3xl text-zinc-500 font-light leading-relaxed max-w-xl">
                    {item.content}
                  </div>
                  
                  {item.author && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-8 border-t border-zinc-100"
                    >
                      <p className="text-xl font-bold text-zinc-900">{item.author}</p>
                      <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest mt-1">{item.role}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {item.illustration && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative aspect-square rounded-[4rem] bg-zinc-50 border border-zinc-100 p-16 flex items-center justify-center group"
                >
                  <motion.img 
                    src={item.illustration} 
                    alt={item.title}
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div 
                    className="absolute inset-0 opacity-[0.04] rounded-[4rem] group-hover:opacity-[0.06] transition-opacity"
                    style={{ backgroundColor: item.color || '#000' }}
                  />
                  {/* Decorative elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-full blur-2xl opacity-50" />
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl opacity-30" />
                </motion.div>
              )}
            </div>
            
            {/* Section Progress Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-300 uppercase tracking-[0.5em]">
              0{index + 1} / 0{items.length}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
