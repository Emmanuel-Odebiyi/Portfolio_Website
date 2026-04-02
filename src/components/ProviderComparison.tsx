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
    <section className="py-32 bg-white text-zinc-900 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gradient/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-24 cursor-default">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-brand-gradient font-mono font-bold text-xs uppercase tracking-[0.3em] bg-brand-gradient/10 px-4 py-1.5 rounded-full"
          >
            The Difference
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 max-w-4xl mx-auto"
          >
            Why This Works When Everything Else Hasn't
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {comparisonData.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-200">
                <div className="p-3 bg-zinc-100 rounded-xl">
                  {col.icon}
                </div>
                <h4 className="text-xl font-bold text-zinc-900">vs. {col.title}</h4>
              </div>
              
              <ul className="space-y-6">
                {col.advantages.map((adv, j) => (
                  <li key={j} className="flex gap-4 group">
                    <CheckCircle2 size={20} className="text-brand-gradient shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-zinc-600 text-sm leading-relaxed group-hover:text-zinc-900 transition-colors">
                      {adv}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
