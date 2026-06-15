import React from 'react';
import { motion } from 'motion/react';
const steps = [
  {
    number: "01",
    title: "Strategy Session",
    timeline: "Week 1",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="url(#strategy-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="6" stroke="url(#strategy-grad)" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="url(#strategy-grad)" />
        <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="url(#strategy-grad)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="strategy-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FF8E53" />
          </linearGradient>
        </defs>
      </svg>
    ),
    accentColor: "#FF6B6B",
    desc: "A 90-minute deep dive into your business, audience, and goals. I audit your current marketing, identify the gaps, and map your path to systematic growth.",
    investment: "90 minutes",
    outcome: "A clear, custom roadmap — no guesswork"
  },
  {
    number: "02",
    title: "System Build",
    timeline: "Weeks 2–4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#build-grad)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="url(#build-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="url(#build-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 7V17M22 7V17M12 12V22" stroke="url(#build-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="2" fill="#FF9F43" />
        <circle cx="6" cy="14" r="1.5" fill="#FF9F43" />
        <circle cx="18" cy="14" r="1.5" fill="#FF9F43" />
        <defs>
          <linearGradient id="build-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="100%" stopColor="#FEB236" />
          </linearGradient>
        </defs>
      </svg>
    ),
    accentColor: "#FF9F43",
    desc: "I design and build everything: content creation workflows, SEO architecture, multi-platform distribution, and performance dashboards. Fully integrated.",
    investment: "Two 30-minute check-ins",
    outcome: "A complete marketing engine, ready to launch"
  },
  {
    number: "03",
    title: "Launch & Optimize",
    timeline: "Week 4+",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#launch-grad)" stroke="url(#launch-grad-stroke)" strokeWidth="1" strokeLinejoin="round" />
        <path d="M5 20H19" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
        <path d="M8 17H16" stroke="#9B59B6" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="launch-grad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9B59B6" />
            <stop offset="100%" stopColor="#8E44AD" />
          </linearGradient>
          <linearGradient id="launch-grad-stroke" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B983FF" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
      </svg>
    ),
    accentColor: "#9B59B6",
    desc: "Your content starts publishing automatically. I monitor performance, refine based on real data, and the system compounds over time. You focus on your business.",
    investment: "15 minutes per week (optional)",
    outcome: "Marketing that grows while you sleep"
  }
];

export const ProcessSteps: React.FC = () => {
  return (
    <section className="py-32 relative z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center space-y-6 mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border font-sans text-[10px] uppercase tracking-[0.4em] font-black"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            How It Works
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]"
            style={{ color: 'var(--text-body)' }}
          >
            From Chaotic to <br className="hidden md:block" /> 
            <span className="text-brand-gradient">Automated in Four Weeks.</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            No lengthy onboarding. No bloated processes. <span className="font-bold underline decoration-brand-gradient/30 decoration-4 underline-offset-4" style={{ color: 'var(--text-body)' }}>Just three focused steps</span> from kickoff to a system that runs.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) - Enhanced Visibility */}
          <div className="hidden md:block absolute top-[5.5rem] left-0 w-full h-px -z-10" style={{ background: 'linear-gradient(to right, transparent, var(--border-card) 10%, var(--border-card) 90%, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className={`relative group cursor-default rounded-[2.5rem] p-8 lg:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid transparent',
                  backgroundClip: 'padding-box, border-box',
                  backgroundImage: `linear-gradient(var(--bg-surface), var(--bg-surface)), linear-gradient(135deg, var(--border-card), ${step.accentColor}30)`,
                }}
              >
                {/* Subtle Glow Background */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-20"
                  style={{ backgroundColor: step.accentColor }}
                />

                {/* Icon Box */}
                <div className="w-20 h-20 rounded-3xl border shadow flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                     style={{ backgroundColor: 'var(--bg-page)', borderColor: `${step.accentColor}33` }}>
                  <div className="scale-110">{step.icon}</div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="flex-none text-[10px] font-sans font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                        STEP {step.number}
                      </span>
                      <div className="h-px flex-grow" style={{ backgroundColor: 'var(--border-card)' }} />
                      <span className="flex-none text-[10px] font-sans font-black uppercase tracking-widest text-brand-gradient">
                        {step.timeline}
                      </span>
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-brand-gradient transition-colors" style={{ color: 'var(--text-body)' }}>
                      {step.title}
                    </h4>
                  </div>
                  
                  <p className="leading-relaxed font-medium text-base" style={{ color: 'var(--text-muted)' }}>
                    {step.desc}
                  </p>

                  <div className="pt-8 space-y-6">
                    <div className="p-4 rounded-2xl border transition-colors" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: 'var(--text-muted)' }}>Time Investment</span>
                      <span className="font-bold text-sm md:text-base" style={{ color: 'var(--text-body)' }}>{step.investment}</span>
                    </div>
                    <div className="p-4 bg-brand-gradient/10 rounded-2xl border border-brand-gradient/20 group-hover:bg-brand-gradient/20 transition-colors">
                      <span className="block font-sans text-[9px] uppercase tracking-[0.2em] font-black mb-2" style={{ color: 'var(--text-muted)' }}>The Deliverable</span>
                      <span className="font-bold text-brand-gradient text-sm md:text-base">{step.outcome}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
