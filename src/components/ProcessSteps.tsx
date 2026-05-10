import React from 'react';
import { motion } from 'motion/react';
import { Target, Settings, Zap } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Strategy Session",
    timeline: "Week 1",
    icon: <Target size={32} className="text-[#FF6B6B]" />,
    accentColor: "#FF6B6B",
    desc: "A 90-minute deep dive into your business, audience, and goals. I audit your current marketing, identify the gaps, and map your path to systematic growth.",
    investment: "90 minutes",
    outcome: "A clear, custom roadmap — no guesswork"
  },
  {
    number: "02",
    title: "System Build",
    timeline: "Weeks 2–4",
    icon: <Settings size={32} className="text-[#FF9F43]" />,
    accentColor: "#FF9F43",
    desc: "I design and build everything: content creation workflows, SEO architecture, multi-platform distribution, and performance dashboards. Fully integrated.",
    investment: "Two 30-minute check-ins",
    outcome: "A complete marketing engine, ready to launch"
  },
  {
    number: "03",
    title: "Launch & Optimize",
    timeline: "Week 4+",
    icon: <Zap size={32} className="text-[#9B59B6]" />,
    accentColor: "#9B59B6",
    desc: "Your content starts publishing automatically. I monitor performance, refine based on real data, and the system compounds over time. You focus on your business.",
    investment: "15 minutes per week (optional)",
    outcome: "Marketing that grows while you sleep"
  }
];

export const ProcessSteps: React.FC = () => {
  return (
    <section className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center space-y-6 mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black"
          >
            How It Works
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]"
          >
            From Chaotic to <br className="hidden md:block" /> 
            <span className="text-brand-gradient">Automated in Four Weeks.</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            No lengthy onboarding. No bloated processes. <span className="text-white font-bold underline decoration-brand-gradient/30 decoration-4 underline-offset-4">Just three focused steps</span> from kickoff to a system that runs.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) - Enhanced Visibility */}
          <div className="hidden md:block absolute top-[5.5rem] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative group cursor-default border border-white/10 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:bg-white/10 hover:-translate-y-2 overflow-hidden"
              >
                {/* Subtle Glow Background */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-20"
                  style={{ backgroundColor: step.accentColor }}
                />

                {/* Icon Box */}
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-xl shadow-black/50 flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                     style={{ borderColor: `${step.accentColor}44` }}>
                  <div className="scale-110">{step.icon}</div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="flex-none text-[10px] font-mono font-black uppercase tracking-widest text-gray-500">
                        STEP {step.number}
                      </span>
                      <div className="h-px flex-grow bg-white/10" />
                      <span className="flex-none text-[10px] font-mono font-black uppercase tracking-widest text-brand-gradient">
                        {step.timeline}
                      </span>
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none group-hover:text-brand-gradient transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed font-medium text-base">
                    {step.desc}
                  </p>

                  <div className="pt-8 space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                      <span className="block text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] font-black mb-2">Time Investment</span>
                      <span className="font-bold text-white text-sm md:text-base">{step.investment}</span>
                    </div>
                    <div className="p-4 bg-brand-gradient/10 rounded-2xl border border-brand-gradient/20 group-hover:bg-brand-gradient/20 transition-colors">
                      <span className="block text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] font-black mb-2">The Deliverable</span>
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
