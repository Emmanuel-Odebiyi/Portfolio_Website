import React from 'react';
import { motion } from 'motion/react';

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
    <div className="relative w-full overflow-hidden bg-white py-20 border-y border-zinc-100">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-8 md:gap-12 items-center"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {duplicatedTools.map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-zinc-50 border border-zinc-100 group transition-all duration-300 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-50/50"
            >
              {tool.logo ? (
                <img 
                  src={tool.logo} 
                  alt={tool.name} 
                  className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center text-zinc-400 group-hover:text-emerald-500 transition-colors duration-500">
                  {tool.icon}
                </div>
              )}
              <span className="text-xl font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors duration-500">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient Overlays for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};
