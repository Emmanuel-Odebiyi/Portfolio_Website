import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section
      id="contact"
      className="relative py-40 grain-overlay overflow-hidden"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}
    >

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-16">

        {/* Headline */}
        <div className="space-y-6">
          <span
            className="inline-block text-[10px] font-sans uppercase tracking-[0.4em] mb-4"
            style={{ color: 'var(--accent-amber)' }}
          >
            Next Steps
          </span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>
            Your Window Is Open. <br />
            <span>Your Competitors Are Already Moving.</span>
          </h2>
          <p
            className="text-2xl font-light max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Every week without a system is a week they're showing up where you aren't.
          </p>
          <p
            className="text-sm font-sans uppercase tracking-widest mt-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Availability: May 2026 Booking Now (Limited by Design)
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Free Strategy Call',
              desc: '30 Minutes. No pitch. Just honest conversation about whether automation is the right move.',
              btn: 'Book Your Call →',
              accent: '#f59e0b',
              borderStyle: 'rgba(217,119,6,0.3)',
              glowColor: 'rgba(217,119,6,0.15)',
              isPrimary: true,
            },
            {
              title: 'Custom Proposal',
              desc: "Tell me about your business. I'll send back a clear action plan and investment breakdown.",
              btn: 'Request Proposal →',
              accent: '#2563eb',
              borderStyle: 'rgba(37,99,235,0.25)',
              glowColor: 'rgba(37,99,235,0.10)',
              isPrimary: false,
            },
            {
              title: 'Paid Audit ($500)',
              desc: 'A complete, no-fluff analysis of your content, SEO, and automation opportunities.',
              btn: 'Book Your Audit →',
              accent: '#059669',
              borderStyle: 'rgba(5,150,105,0.25)',
              glowColor: 'rgba(5,150,105,0.10)',
              isPrimary: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative p-8 rounded-[2rem] text-left space-y-6 flex flex-col justify-between group transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid transparent',
                backgroundClip: 'padding-box, border-box',
                backgroundImage: `linear-gradient(var(--bg-surface), var(--bg-surface)), ${
                  item.isPrimary
                    ? 'linear-gradient(135deg, rgba(37,99,235,0.4), rgba(245,158,11,0.4))'
                    : 'linear-gradient(135deg, var(--border-card), var(--border-card))'
                }`,
              }}
            >
              {/* Colored top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                style={{ background: item.accent, opacity: 0.6 }}
              />

              <div className="space-y-4">
                <h4 className="text-xl font-bold" style={{ color: 'var(--text-body)' }}>{item.title}</h4>
                <p className="font-light leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    item.isPrimary
                      ? 'hover:opacity-90'
                      : 'hover:bg-[var(--text-body)] hover:text-[var(--bg-surface)] hover:border-transparent'
                  }`}
                  style={{
                    background: item.isPrimary
                      ? 'linear-gradient(135deg, #2563eb, #f59e0b)'
                      : 'var(--bg-page)',
                    border: item.isPrimary
                      ? `1px solid transparent`
                      : `1px solid var(--border-card)`,
                    color: item.isPrimary ? '#fff' : 'var(--text-body)',
                  }}
                >
                  {item.btn}
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Trust micro-copy */}
        <div
          className="flex justify-center flex-wrap items-center gap-8 font-sans text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="flex items-center gap-2 font-bold">
            <span style={{ color: 'var(--accent-amber)' }}>✓</span> Free 30-minute call
          </span>
          <span style={{ color: 'var(--border-card)' }}>|</span>
          <span className="flex items-center gap-2 font-bold">
            <span style={{ color: 'var(--accent-amber)' }}>✓</span> No pitch, just strategy
          </span>
        </div>
      </div>
    </section>
  );
};
