import React from 'react';
import { motion } from 'framer-motion';
import { MagneticPull } from './ui/MagneticPull';

export interface Tool {
  name: string;
  icon?: React.ReactNode;
  logo?: string;
}

interface ToolsTickerProps {
  tools: Tool[];
}

export const ToolsTicker: React.FC<ToolsTickerProps> = ({ tools }) => {
  // Triple the tools to ensure enough length for seamless loop
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-16 border-y flex justify-center" style={{ borderColor: 'var(--border-card)' }}>
      <div className="flex whitespace-nowrap overflow-hidden max-w-[100vw]">
        <motion.div
          className="flex gap-6 md:gap-8 items-center min-w-max"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedTools.map((tool, i) => (
            <MagneticPull key={i} strength={0.25} radius={14}>
              <div
                className="flex items-center gap-4 px-6 py-4.5 rounded-2xl border group transition-all duration-300 shadow-sm hover:shadow-md hover:border-[color-mix(in_srgb,var(--accent-amber)_40%,transparent)] hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] cursor-default"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 flex items-center justify-center transition-colors duration-500 group-hover:text-[var(--accent-amber)]" style={{ color: 'var(--text-muted)' }}>
                    {tool.icon}
                  </div>
                )}
                <span className="text-lg font-bold transition-colors duration-300 group-hover:text-[var(--text-body)]" style={{ color: 'var(--text-muted)' }}>
                  {tool.name}
                </span>
              </div>
            </MagneticPull>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays for smooth fade in theme color */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-page), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-page), transparent)' }} />
    </div>
  );
};
