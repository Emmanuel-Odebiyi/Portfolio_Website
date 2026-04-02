import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Zap, Cpu, Search, Share2, TrendingUp, Rocket, Bot, MousePointer2 } from 'lucide-react';

interface TickerRowProps {
  icons: React.ReactNode[];
  speed: number;
  reverse?: boolean;
}

const TickerRow: React.FC<TickerRowProps> = ({ icons, speed, reverse = false }) => {
  // Triple icons for seamless loop
  const duplicatedIcons = [...icons, ...icons, ...icons];

  return (
    <div className="flex overflow-hidden relative w-full py-4">
      <motion.div
        className="flex gap-4 md:gap-6 shrink-0"
        animate={{
          x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedIcons.map((icon, i) => (
          <div
            key={i}
            className="w-16 h-16 md:w-20 md:h-20 flex-none rounded-2xl md:rounded-3xl bg-white/40 backdrop-blur-md border border-zinc-200/50 flex items-center justify-center group hover:bg-white hover:border-zinc-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50"
          >
            <div className="text-zinc-400 group-hover:text-brand-gradient transition-colors duration-500 transform group-hover:scale-110">
              {icon}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const IntegrationTicker: React.FC = () => {
  // Placeholder icons for Row 1 (n8n/Any 10)
  const n8nIcons = [
    <Box size={32} />, <Layers size={32} />, <Zap size={32} />, 
    <Cpu size={32} />, <Search size={32} />, <Share2 size={32} />,
    <TrendingUp size={32} />, <Rocket size={32} />, <Bot size={32} />,
    <MousePointer2 size={32} />
  ];

  // Placeholder icons for Row 2 (Make.com)
  const makeIcons = Array(10).fill(<div className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />).map((dot, i) => (
    <div key={i} className="relative">
      <Box size={28} />
      <div className="absolute -top-1 -right-1">{dot}</div>
    </div>
  ));

  // Placeholder icons for Row 3 (Zapier)
  const zapierIcons = Array(10).fill(null).map((_, i) => (
    <div key={i} className="relative">
      <Layers size={28} />
      <Zap size={10} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-gradient" />
    </div>
  ));

  return (
    <section className="py-24 bg-transparent relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center space-y-6 mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-zinc-100 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black"
          >
            Integrations
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900"
          >
            Over <span className="text-brand-gradient">500+</span> Connected Nodes.
          </motion.h3>
          <p className="text-zinc-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Use pre-built nodes for common apps. Custom API connections for everything else.
          </p>
        </div>

        {/* Ticker Rows */}
        <div className="space-y-4 md:space-y-6">
          <TickerRow icons={n8nIcons} speed={40} />
          <TickerRow icons={makeIcons} speed={35} reverse={true} />
          <TickerRow icons={zapierIcons} speed={45} />
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-zinc-900 text-white rounded-full font-bold text-sm shadow-xl hover:bg-black transition-all flex items-center gap-3 mx-auto group"
          >
            <span>Browse All Integrations</span>
            <Search size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </motion.button>
        </div>
      </div>

      {/* Edge Fades - Enhanced with deeper gradients for smoother masking */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-white via-white to-transparent z-20 pointer-events-none" />
    </section>
  );
};
