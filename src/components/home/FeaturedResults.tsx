import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Heart, TrendingUp } from 'lucide-react';

export const FeaturedResults = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
          <div className="max-w-2xl text-left">
            <span className="text-xs font-mono tracking-widest text-[var(--accent-amber)] uppercase font-bold block mb-3">Proven Impact</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4 font-display" style={{ color: 'var(--text-body)' }}>
              Real Businesses. <span className="italic font-medium text-[var(--accent-amber)]">Real Numbers.</span>
            </h2>
            <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Verifiable commercial results built on custom-built content automation systems.
            </p>
          </div>
          
          <div className="shrink-0 flex items-center gap-2 border px-4 py-2 rounded-full" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>A Few Wins</span>
          </div>
        </div>

        {/* Case Studies: Two Large Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Case Study 1: TechFlow Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-card)'
            }}
          >
            <div className="space-y-6 text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent-amber)' }}>
                Case Study: TechFlow Solutions
              </span>
              
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                520% ROI <span className="italic font-medium text-[var(--accent-amber)]">in 90 Days.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">The Challenge</span>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    8 blog posts monthly, stagnant organic traffic, and a severely overloaded internal team.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">What I Built</span>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    A custom content automation engine with integrated SEO and automatic multi-platform distribution.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">Key Outcomes</span>
                <ul className="space-y-2">
                  {[
                    '40+ articles published monthly (up from 8)',
                    '80% increase in organic traffic velocity',
                    '$127,000 in directly attributed revenue'
                  ].map((outcome, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-body)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between border-t mt-8" style={{ borderColor: 'var(--border-card)' }}>
              <Link 
                to="/portfolio/techflow-solutions" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider group hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md hover:bg-[var(--text-body)] hover:text-[var(--bg-page)] hover:border-[var(--text-body)]"
                style={{ 
                  backgroundColor: 'var(--bg-surface-alt)', 
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-body)' 
                }}
              >
                Read Full Case Study 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs font-mono font-bold text-[var(--text-muted)]">Attributed Revenue: $127k</span>
            </div>
          </motion.div>

          {/* Case Study 2: The Scoove Africa */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-[2rem] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-card)'
            }}
          >
            <div className="space-y-6 text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--accent-blue)' }}>
                Case Study: The Scoove Africa
              </span>
              
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
                65% Traffic Growth <span className="italic font-medium text-[var(--accent-blue)]">in 3 Months.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">The Challenge</span>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    Inconsistent publishing, search rankings stuck at Position 24, and no structured keyword strategy.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">What I Built</span>
                  <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    A systematic content targeting workflow with automated SEO tagging and cluster internal linking.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">Key Outcomes</span>
                <ul className="space-y-2">
                  {[
                    'Average ranking climbed from Position 24 to Position 9',
                    '25,000+ monthly impressions generated',
                    '40% improvement in search click-through rate (CTR)'
                  ].map((outcome, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-body)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-between border-t mt-8" style={{ borderColor: 'var(--border-card)' }}>
              <Link 
                to="/portfolio/scoove-africa" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider group hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-md hover:bg-[var(--text-body)] hover:text-[var(--bg-page)] hover:border-[var(--text-body)]"
                style={{ 
                  backgroundColor: 'var(--bg-surface-alt)', 
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-body)' 
                }}
              >
                Read Full Case Study 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs font-mono font-bold text-[var(--text-muted)]">SEO Imp: Pos 24 → Pos 9</span>
            </div>
          </motion.div>

        </div>

        {/* Global Performance Metrics Footer Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 lg:mt-12">
          {[
            { label: 'Reclaimed Time', val: '15+ Hours', desc: 'Saved every single week', icon: <Clock className="w-4 h-4 text-[var(--accent-amber)]" /> },
            { label: 'Traffic Growth', val: '50–65%', desc: 'Within 3–6 months avg', icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
            { label: 'Client Retention', val: '95%+', desc: 'Ongoing partnerships', icon: <Heart className="w-4 h-4 text-rose-500" /> },
            { label: 'Average ROI', val: '300-520%', desc: 'Proven commercial value', icon: <ShieldCheck className="w-4 h-4 text-[var(--accent-blue)]" /> }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl border flex flex-col justify-between text-left"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.icon}
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</span>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold block" style={{ color: 'var(--text-body)' }}>{stat.val}</span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium leading-tight block mt-0.5">{stat.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedResults;
