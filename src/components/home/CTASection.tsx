import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section
      id="contact"
      className="relative py-40 grain-overlay overflow-hidden"
      style={{ backgroundColor: '#0a0f1e' }}
    >
      {/* Concentrated aurora glow behind headline */}
      <div
        className="aurora-orb-1 absolute rounded-full pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: 900,
          maxHeight: 900,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(245,158,11,0.20) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-16">

        {/* Headline */}
        <div className="space-y-6">
          <span
            className="inline-block text-[10px] font-mono uppercase tracking-[0.4em] mb-4"
            style={{ color: 'rgba(251,191,36,0.95)' }}
          >
            Next Steps
          </span>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-snug">
            Your Window Is Open. <br />
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 45%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Competitors Are Already Moving.
            </span>
          </h2>
          <p
            className="text-2xl font-light max-w-3xl mx-auto"
            style={{ color: 'rgba(226,232,240,0.9)' }}
          >
            Every week without a system is a week they're showing up where you aren't.
          </p>
          <p
            className="text-sm font-mono uppercase tracking-widest mt-8"
            style={{ color: 'rgba(226,232,240,0.6)' }}
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
              className="relative p-8 rounded-[2rem] text-left space-y-6 flex flex-col justify-between group transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: item.isPrimary
                  ? `linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(217,119,6,0.12) 100%)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${item.borderStyle}`,
                boxShadow: `0 0 40px ${item.glowColor}`,
              }}
            >
              {/* Colored top accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                style={{ background: item.accent, opacity: 0.6 }}
              />

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(241,245,249,0.95)' }}>
                  {item.desc}
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 group-hover:gap-3"
                style={{
                  background: item.isPrimary
                    ? 'linear-gradient(135deg, #2563eb, #f59e0b)'
                    : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${item.borderStyle}`,
                }}
              >
                {item.btn}
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Trust micro-copy */}
        <div
          className="flex justify-center flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(226,232,240,0.7)' }}
        >
          <span className="flex items-center gap-2">
            <span style={{ color: '#f59e0b' }}>✓</span> Free 30-minute call
          </span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
          <span className="flex items-center gap-2">
            <span style={{ color: '#f59e0b' }}>✓</span> No pitch, just strategy
          </span>
        </div>
      </div>
    </section>
  );
};
