import React from 'react';
import { NumberTicker } from '../NumberTicker';

export const StatsBar = () => {
  return (
    <div
      className="relative py-10 overflow-hidden"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 80%, transparent)',
        borderTop: '1px solid var(--border-card)',
        borderBottom: '1px solid var(--border-card)',
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-8">
        {[
          { label: 'ROI delivered in 90 days',    value: 520, suffix: '%'  },
          { label: 'traffic growth in 3 months',  value: 65,  suffix: '%'  },
          { label: 'hours saved every week',       value: 15,  suffix: '+'  },
          { label: 'client retention rate',        value: 95,  suffix: '%+' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 group metric-card">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-sm" style={{ color: 'var(--accent-amber)' }}>✓</span>
              <NumberTicker
                value={stat.value}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl font-bold group-hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-body)' }}
              />
            </div>
            <span
              className="font-sans text-[10px] uppercase tracking-widest font-semibold"
              style={{ color: 'var(--text-muted)' }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
