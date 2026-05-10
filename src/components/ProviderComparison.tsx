import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Building2, UserX, MousePointer2, Users } from 'lucide-react';

const comparisonData = [
  {
    title: "Agencies",
    icon: <Building2 size={24} className="text-brand-gradient" />,
    advantages: [
      "You work directly with me — not a rotating junior team",
      "30–50% lower cost — no inflated agency overhead",
      "Faster results — no internal bureaucracy slowing things down",
      "Month-to-month — no 6-month commitments or lock-in clauses"
    ]
  },
  {
    title: "Freelancers",
    icon: <UserX size={24} className="text-brand-gradient" />,
    advantages: [
      "Complete systems — not fragmented, one-off deliverables",
      "Strategic thinking — not just execution without a plan",
      "Reliable, long-term partnership — not a disappearing act",
      "Integrated approach — everything works together, by design"
    ]
  },
  {
    title: "DIY",
    icon: <MousePointer2 size={24} className="text-brand-gradient" />,
    advantages: [
      "Expert-built from day one — no learning curves on your time",
      "Proven frameworks — not trial-and-error guesswork",
      "Hours back every week — not another project on your plate",
      "Focus on results — not mastering 12 different tools"
    ]
  },
  {
    title: "In-House Hiring",
    icon: <Users size={24} className="text-brand-gradient" />,
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
    <section className="py-32 bg-transparent text-white relative overflow-hidden z-10">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-gradient/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-24 cursor-default">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-[0.4em] font-black"
          >
            The Difference
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white max-w-4xl mx-auto leading-[1.1]"
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
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 lg:p-10 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="flex items-center gap-5 mb-10 pb-8 border-b border-white/10">
                <div className="p-4 bg-white/5 rounded-2xl shadow-sm border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {col.icon}
                </div>
                <h4 className="text-xl lg:text-2xl font-black text-white tracking-tight italic opacity-80 group-hover:opacity-100 transition-opacity">vs. {col.title}</h4>
              </div>
              
              <ul className="space-y-8">
                {col.advantages.map((adv, j) => {
                  // Logic to highlight "crucial" parts of the text
                  const parts = adv.split(' — ');
                  return (
                    <li key={j} className="flex gap-4 items-start group/item">
                      <div className="mt-1 flex-none w-5 h-5 rounded-full bg-brand-gradient/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        <CheckCircle2 size={12} className="text-brand-gradient" />
                      </div>
                      <span className="text-gray-400 text-sm lg:text-base leading-relaxed font-medium group-hover/item:text-white transition-colors">
                        {parts.length > 1 ? (
                          <>
                            <span className="font-bold text-white">{parts[0]}</span>
                            <span className="opacity-60 block mt-1 text-xs lg:text-sm font-semibold">— {parts[1]}</span>
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
