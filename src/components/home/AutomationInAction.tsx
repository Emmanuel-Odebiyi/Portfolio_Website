import React from 'react';
import { WorkflowCardStack } from './WorkflowCardStack';

export const AutomationInAction = () => {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-5xl w-full mx-auto px-6 md:px-10 flex flex-col gap-10">

        {/* Section header */}
        <div className="text-left max-w-2xl">
          <span className="text-xs font-mono tracking-widest uppercase font-bold block mb-3"
            style={{ color: 'var(--accent-amber)' }}>
            System Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight font-display"
            style={{ color: 'var(--text-body)' }}>
            The High-ROI <br />
            <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>
              Automation Lab.
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}>
            Real workflows I've built — running live across n8n, Make, and Zapier.
          </p>
        </div>

        {/* Auto-scrolling workflow card stack */}
        <WorkflowCardStack />

      </div>
    </section>
  );
};
