import React from 'react';
import { NumberTicker } from '../NumberTicker';

export const StatsBar = () => {
  return (
    <div
      className="relative py-10 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Subtle amber glow behind the bar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(245,158,11,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-8">
        {[
          { label: 'ROI delivered in 90 days',    value: 520, suffix: '%'  },
          { label: 'traffic growth in 3 months',  value: 65,  suffix: '%'  },
          { label: 'hours saved every week',       value: 15,  suffix: '+'  },
          { label: 'client retention rate',        value: 95,  suffix: '%+' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group metric-card">
            <div className="flex items-baseline gap-1">
              <span className="text-amber-gradient font-bold text-sm">✓</span>
              <NumberTicker
                value={stat.value}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-bold text-white group-hover:text-amber-gradient transition-colors"
              />
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'rgba(226,232,240,0.9)' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
