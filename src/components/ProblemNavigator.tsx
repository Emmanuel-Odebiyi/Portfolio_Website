import React from 'react';
import { motion, AnimatePresence, MotionValue } from 'motion/react';

interface ProblemNode {
  id: number;
  label: string;
}

interface ProblemNavigatorProps {
  nodes: ProblemNode[];
  activeId: number;
  onNodeClick: (id: number) => void;
  accentColor?: string;
  progress: MotionValue<number>;
}

export const ProblemNavigator: React.FC<ProblemNavigatorProps> = ({
  nodes,
  activeId,
  onNodeClick,
  accentColor = "#64748b",
  progress,
}) => {
  const N = nodes.length;

  return (
    // Sits BELOW the main navbar (which is ~64px). We add mt-[64px] so this 
    // tracker never overlaps the nav links and never intercepts nav clicks.
    <div
      className="fixed top-[64px] left-0 right-0 z-[200] pointer-events-none"
      aria-label="Problem tracker"
    >
      <div className="w-full bg-white/70 backdrop-blur-md border-b border-zinc-100/70 pointer-events-auto">
        <div className="relative max-w-5xl mx-auto px-10 sm:px-20 md:px-28 py-4">

          {/* "Problems" label — top left */}
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-400 select-none">
            Problems
          </span>

          {/* Track + Nodes row */}
          <div className="relative flex items-center w-full" style={{ height: 14 }}>

            {/* Dotted background track — vertically centred at height/2 = 7px */}
            <div
              className="absolute left-0 right-0 rounded-full"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                height: 2,
                backgroundImage: `repeating-linear-gradient(to right, #d4d4d8 0px, #d4d4d8 4px, transparent 4px, transparent 8px)`,
              }}
            />

            {/* Active fill track */}
            <motion.div
              className="absolute left-0 rounded-full origin-left"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                height: 2,
                width: '100%',
                backgroundColor: accentColor,
                scaleX: progress,
              }}
            />

            {/* Nodes — dots centred vertically on the line */}
            {nodes.map((node, i) => {
              const isActive = activeId === node.id;
              const leftPercent = N === 1 ? 0 : (i / (N - 1)) * 100;

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${leftPercent}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNodeClick(node.id);
                    }}
                    className="relative flex items-center justify-center cursor-pointer outline-none"
                    style={{ width: 28, height: 28 }}
                    aria-label={node.label}
                    title={node.label}
                  >
                    {/* Glow ring */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="glow"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.18, scale: 2.6 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            width: 14,
                            height: 14,
                            backgroundColor: accentColor,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Dot */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        backgroundColor: isActive ? accentColor : '#d4d4d8',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="rounded-full border-2 border-white shadow"
                      style={{
                        width: 12,
                        height: 12,
                        boxShadow: isActive ? `0 0 12px ${accentColor}55` : undefined,
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

