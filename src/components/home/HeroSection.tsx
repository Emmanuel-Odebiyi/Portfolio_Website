import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SiN8N, SiZapier, SiMake, SiOpenai, SiHubspot, SiAirtable } from 'react-icons/si';
import { HeroPhoto } from '../HeroPhoto';

const N8nIcon = SiN8N as any;
const ZapierIcon = SiZapier as any;
const MakeIcon = SiMake as any;
const OpenaiIcon = SiOpenai as any;
const HubspotIcon = SiHubspot as any;
const AirtableIcon = SiAirtable as any;

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-16 md:pb-28 lg:py-40"
      style={{ backgroundColor: 'var(--bg-page)' }}
      data-section="hero"
    >
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--text-body) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 hero-grid-responsive gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Subheadline, CTAs, and Trust Indicators */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8">
            
            {/* Elegant Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans tracking-[0.12em] uppercase font-bold"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-muted)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              Content Marketing Automation Specialist
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
              style={{ color: 'var(--text-body)' }}
            >
              Your Competitors Are <br className="hidden sm:inline" />
              Publishing 40 Articles a Month.{' '}
              <span className="block mt-2 italic font-medium text-[var(--accent-amber)]">
                You're Still Writing One at 11 PM on a Sunday.
              </span>
            </motion.h1>

            {/* Subheadline Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-muted)] font-medium max-w-2xl font-sans"
            >
              I build automated content marketing systems for growing businesses — so you can{' '}
              <strong className="font-bold text-[var(--text-body)]">publish consistently</strong>,{' '}
              <strong className="font-bold text-[var(--text-body)]">rank higher</strong>, and{' '}
              <strong className="font-bold text-[var(--text-body)]">generate revenue</strong> without hiring a team or burning out trying.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch gap-4 w-full sm:w-auto"
            >
              <Link
                to="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all duration-300"
                style={{
                  backgroundColor: 'var(--cta-blue)',
                  boxShadow: '0 4px 14px color-mix(in srgb, var(--cta-blue) 25%, transparent)',
                }}
              >
                See Real Client Results
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-body)] hover:bg-[var(--text-body)] hover:text-[var(--bg-surface)] hover:border-transparent shadow-sm hover:shadow-md"
              >
                Book a Free Strategy Call
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pt-6 w-full border-t"
              style={{ borderColor: 'var(--border-card)' }}
            >
              <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-x-8 lg:gap-y-3">
                {[
                  '520% ROI delivered in 90 days',
                  '65% traffic growth in 3 months',
                  '15+ hours saved every week',
                  '95%+ client retention rate'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-600 shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Editorial Portrait Visual Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            {/* HeroPhoto is the single source of truth for the portrait — see src/components/HeroPhoto.tsx */}
            <HeroPhoto />
          </div>

        </div>

        {/* Full-width Logo Ticker (Harvey & Chatlabs style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 md:mt-24 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
            POWERED BY STANDARD-SETTING TECH
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[var(--text-muted)] opacity-60">
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <N8nIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>n8n</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <ZapierIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Zapier</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <MakeIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Make.com</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <OpenaiIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <HubspotIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>HubSpot</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-sans">
              <AirtableIcon className="w-5 h-5 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Airtable</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
