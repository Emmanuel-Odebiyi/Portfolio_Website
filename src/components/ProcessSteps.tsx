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
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center space-y-6 mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]"
          >
            How It Works
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900"
          >
            From Chaotic to Automated in Four Weeks
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-500 font-light leading-relaxed"
          >
            No lengthy onboarding. No bloated processes. Just three focused steps from kickoff to a system that runs.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-100 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative group cursor-default border border-zinc-100/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: `${step.accentColor}08` }} // Extremely subtle (apx 3% opacity tint) overlaying white page
              >
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:-translate-y-2 transition-all duration-300"
                     style={{ borderColor: `${step.accentColor}33` }}>
                  {step.icon}
                </div>

                <div className="text-center md:text-left space-y-6">
                  <div className="space-y-2">
                    <span className="text-deep-space-blue-500 font-mono text-xs font-bold tracking-widest uppercase">
                      STEP {step.number} • {step.timeline}
                    </span>
                    <h4 className="text-2xl font-bold text-zinc-900">{step.title}</h4>
                  </div>
                  
                  <p className="text-zinc-500 leading-relaxed font-light">
                    {step.desc}
                  </p>

                  <div className="pt-6 border-t border-zinc-100 space-y-4 text-sm">
                    <div>
                      <span className="block text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1">Your Time Investment</span>
                      <span className="font-semibold text-zinc-900">{step.investment}</span>
                    </div>
                    <div>
                      <span className="block text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1">What You Walk Away With</span>
                      <span className="font-semibold text-deep-space-blue-600">{step.outcome}</span>
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
