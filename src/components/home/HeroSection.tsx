import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileText, ArrowUpRight } from 'lucide-react';
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
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-12 sm:pb-16"
      style={{ backgroundColor: 'var(--bg-page)' }}
      data-section="hero"
    >
      {/* Background Subtle Accent Dot Matrix */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, var(--text-body) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex-1 flex flex-col justify-center">
        {/* Balanced 6 / 6 Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-end">
          
          {/* Left Column: Headline, Subheadline, CTAs, and Audited Statistics */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-7 pb-4 lg:pb-8">
            
            {/* Elegant Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-[0.15em] uppercase font-bold border"
              style={{ 
                backgroundColor: 'var(--bg-surface)', 
                borderColor: 'var(--border-card)', 
                color: 'var(--text-muted)' 
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              Content Systems &amp; Marketing Automation Architect
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04]"
              style={{ color: 'var(--text-body)' }}
            >
              Your Competitors Are <br className="hidden sm:inline" />
              Publishing 40 Articles a Month.{' '}
              <span className="block mt-2 italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
                You're Still Writing One at 11 PM on a Sunday.
              </span>
            </motion.h1>

            {/* Subheadline Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.75 }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-muted)] font-normal max-w-2xl font-sans"
            >
              I build automated content marketing systems for growing businesses — so you can{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>publish consistently</strong>,{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>rank higher</strong>, and{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>generate revenue</strong> without hiring a team or burning out trying.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all duration-300"
                style={{
                  backgroundColor: 'var(--cta-blue)',
                  boxShadow: '0 8px 24px -4px color-mix(in srgb, var(--cta-blue) 35%, transparent)',
                }}
              >
                <span>See Real Client Results</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 border hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-body)',
                }}
              >
                <span>Book a Free Strategy Call</span>
                <ArrowUpRight size={16} className="opacity-60" />
              </Link>
            </motion.div>

            {/* Direct Reference to Writing Samples */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/writing-portfolio"
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200 hover:border-[var(--accent-amber)]"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-muted)'
                }}
              >
                <FileText size={14} style={{ color: 'var(--accent-amber)' }} className="shrink-0" />
                <span>Hiring for content writing or editorial?</span>
                <span className="font-bold underline underline-offset-4 text-[var(--accent-amber)] group-hover:text-[var(--text-body)] transition-colors">
                  Jump straight to Writing Samples →
                </span>
              </Link>
            </motion.div>

            {/* Audited Statistics (Positioned beneath CTAs in Left Column, as requested) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.75 }}
              className="pt-6 w-full border-t space-y-3.5"
              style={{ borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  DOCUMENTED CLIENT RESULTS // PRODUCTION AUDIT
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[var(--accent-teal)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED OUTCOMES
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { stat: '520% ROI', label: 'Delivered in 90 days', client: 'TechFlow Solutions' },
                  { stat: '65% Growth', label: 'Organic traffic in 3 mo', client: 'The Scoove Africa' },
                  { stat: '15+ hrs/wk', label: 'Saved per client', client: 'Automated Operations' },
                  { stat: '$127,000', label: 'Revenue from content', client: 'Direct Attribution' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl border transition-all duration-200 hover:border-[var(--accent-amber)]"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-base sm:text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>
                        {item.stat}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent-amber)] font-bold hidden sm:inline">
                        {item.client}
                      </span>
                    </div>
                    <p className="text-xs font-light text-[var(--text-muted)] mt-0.5 leading-snug">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Editorial Portrait (Unclipped, properly contained) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full items-end self-end relative">
            <HeroPhoto variant="cutout" />
          </div>

        </div>

        {/* Full-width Logo Ticker (Harvey & Chatlabs style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="mt-10 lg:mt-14 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
            POWERED BY STANDARD-SETTING TECH
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[var(--text-muted)] opacity-60">
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <N8nIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>n8n</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <ZapierIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Zapier</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <MakeIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Make.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <OpenaiIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <HubspotIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>HubSpot</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <AirtableIcon className="w-4 h-4 text-current hover:text-[var(--accent-amber)] transition-colors" />
              <span>Airtable</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
