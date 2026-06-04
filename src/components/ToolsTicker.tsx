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
    <div className="relative w-full overflow-hidden bg-transparent py-16 border-y border-white/5 flex justify-center">
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
                className="flex items-center gap-4 px-6 py-4.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 transition-colors duration-500">
                    {tool.icon}
                  </div>
                )}
                <span className="text-lg font-bold text-zinc-400 group-hover:text-white transition-colors duration-500">
                  {tool.name}
                </span>
              </div>
            </MagneticPull>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays for smooth fade in dark theme */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0f1e] via-[#0a0f1e]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0f1e] via-[#0a0f1e]/70 to-transparent z-10 pointer-events-none" />
    </div>
  );
};
