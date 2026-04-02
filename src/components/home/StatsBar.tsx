import React from 'react';
import { NumberTicker } from '../NumberTicker';

export const StatsBar = () => {
  return (
    <div className="bg-white/30 backdrop-blur-sm py-10 overflow-hidden border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-8">
        {[
          { label: "ROI delivered in 90 days", value: 520, suffix: "%" },
          { label: "traffic growth in 3 months", value: 65, suffix: "%" },
          { label: "hours saved every week", value: 15, suffix: "+" },
          { label: "client retention rate", value: 95, suffix: "%+" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group metric-card">
            <div className="flex items-baseline gap-1">
              <span className="text-brand-gradient font-bold text-sm">✓</span>
              <NumberTicker 
                value={stat.value} 
                suffix={stat.suffix} 
                className="text-4xl md:text-5xl font-bold text-zinc-900 group-hover:text-brand-gradient transition-colors"
              />
            </div>
            <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
