import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const comparisonData = [
  {
    title: "Agencies",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="18" rx="1.5" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <rect x="14" y="9" width="7" height="12" rx="1.5" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <path d="M10 6H14" stroke="var(--accent-amber)" strokeWidth="1.5" />
        <path d="M6 7H7M6 11H7M6 15H7M17 12H18M17 16H18" stroke="var(--accent-amber)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    advantages: [
      "You work directly with me — not a rotating junior team",
      "30–50% lower cost — no inflated agency overhead",
      "Faster results — no internal bureaucracy slowing things down",
      "Month-to-month — no 6-month commitments or lock-in clauses"
    ]
  },
  {
    title: "Freelancers",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="var(--accent-blue)" strokeWidth="1.5" />
        <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 7C21 5.5 19.5 4 18 5M3 7C3 5.5 4.5 4 6 5" stroke="var(--accent-blue)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    advantages: [
      "Complete systems — not fragmented, one-off deliverables",
      "Strategic thinking — not just execution without a plan",
      "Reliable, long-term partnership — not a disappearing act",
      "Integrated approach — everything works together, by design"
    ]
  },
  {
    title: "DIY",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="#8b5cf6" strokeWidth="1.5" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="#8b5cf6" strokeWidth="1.5" />
      </svg>
    ),
    advantages: [
      "Expert-built from day one — no learning curves on your time",
      "Proven frameworks — not trial-and-error guesswork",
      "Hours back every week — not another project on your plate",
      "Focus on results — not mastering 12 different tools"
    ]
  },
  {
    title: "In-House Hiring",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--accent-teal)" strokeWidth="1.5" />
        <circle cx="9" cy="7" r="4" stroke="var(--accent-teal)" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="var(--accent-teal)" strokeWidth="1.5" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--accent-teal)" strokeWidth="1.5" />
      </svg>
    ),
    advantages: [
      "$30K–$50K annually — not $80K–$120K+ with benefits and HR costs",
      "Broader expertise: SEO + content + automation + AI — not one specialty",
      "Zero HR overhead — no recruitment, onboarding, or management",
      "Immediate execution — not a 3-month ramp-up before results begin"
    ]
  }
];

export const ProviderComparison: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-gradient/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-24 cursor-default">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border font-sans text-[10px] uppercase tracking-[0.4em] font-black"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            The Difference
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-[1.1]"
            style={{ color: 'var(--text-body)' }}
          >
            Why This Works When <br className="hidden md:block" />
            <span className="text-brand-gradient">Everything Else Hasn't.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {comparisonData.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group rounded-[2.5rem] p-8 lg:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid transparent',
                backgroundClip: 'padding-box, border-box',
                backgroundImage: 'linear-gradient(var(--bg-surface), var(--bg-surface)), linear-gradient(135deg, var(--border-card), var(--border-card))'
              }}
            >
              <div className="flex items-center gap-5 mb-10 pb-8 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <div className="p-4 rounded-2xl shadow-sm border group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                  {col.icon}
                </div>
                <h4 className="text-xl lg:text-2xl font-black tracking-tight italic opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-body)' }}>vs. {col.title}</h4>
              </div>
              
              <ul className="space-y-8">
                {col.advantages.map((adv, j) => {
                  // Logic to highlight "crucial" parts of the text
                  const parts = adv.split(' — ');
                  return (
                    <li key={j} className="flex gap-4 items-start group/item">
                      <div 
                        className="mt-1 flex-none w-5 h-5 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--accent-teal) 10%, transparent)' }}
                      >
                        <CheckCircle2 size={12} style={{ color: 'var(--accent-teal)' }} />
                      </div>
                      <span className="text-sm lg:text-base leading-relaxed font-medium transition-colors" style={{ color: 'var(--text-muted)' }}>
                        {parts.length > 1 ? (
                          <>
                            <span className="font-bold" style={{ color: 'var(--text-body)' }}>{parts[0]}</span>
                            <span className="opacity-70 block mt-1 text-xs lg:text-sm font-semibold">— {parts[1]}</span>
                          </>
                        ) : (
                          adv
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
