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

const proofLedger = [
  {
    metric: '520% ROI',
    client: 'TechFlow Solutions',
    outcome: '90-day automated content engine ($127K revenue)',
  },
  {
    metric: '65% Growth',
    client: 'The Scoove Africa',
    outcome: '3 months organic traffic increase (Pos 24 → 9)',
  },
  {
    metric: '15+ hrs/wk',
    client: 'Operations Recaptured',
    outcome: 'Automated publishing, lead routing & CRM sync',
  },
  {
    metric: '$127,000',
    client: 'Direct Pipeline Revenue',
    outcome: 'Directly attributed to automated search engines',
  },
];

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 lg:pt-36 pb-12 sm:pb-16"
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
        {/* Asymmetric 8 / 4 Editorial Grid (Linear + Works.studio topology) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start lg:items-center">
          
          {/* Main Editorial Statement Column (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left space-y-7 pb-2 lg:pb-6">
            
            {/* Editorial Badge */}
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

            {/* Editorial Statement Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.98]"
              style={{ color: 'var(--text-body)' }}
            >
              Your Competitors Publish <br className="hidden sm:inline" />
              40 Articles a Month.{' '}
              <span className="block mt-2 font-serif italic font-normal" style={{ color: 'var(--accent-amber)' }}>
                You're Still Writing One at 11 PM on a Sunday.
              </span>
            </motion.h1>

            {/* Subheadline Prose */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.75 }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--text-muted)] font-normal max-w-2xl font-sans"
            >
              I build autonomous content marketing engines for B2B SaaS founders and growing companies — so you can{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>publish consistently</strong>,{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>rank Page 1</strong>, and{' '}
              <strong className="font-semibold" style={{ color: 'var(--text-body)' }}>generate revenue</strong> without burning out or hiring an expensive agency.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <Link
                to="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all duration-300"
                style={{
                  backgroundColor: 'var(--cta-blue)',
                  boxShadow: '0 8px 24px -4px color-mix(in srgb, var(--cta-blue) 35%, transparent)',
                }}
              >
                <span>Explore Client Systems &amp; ROI</span>
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
                <span>Book a Strategy Call</span>
                <ArrowUpRight size={16} className="opacity-60" />
              </Link>
            </motion.div>

            {/* Direct Route to Writing Samples */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="w-full sm:w-auto pt-1"
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
                <span>Need B2B SaaS writing &amp; thought leadership samples?</span>
                <span className="font-bold underline underline-offset-4 group-hover:text-[var(--text-body)] transition-colors" style={{ color: 'var(--accent-amber)' }}>
                  View Writing Portfolio →
                </span>
              </Link>
            </motion.div>

          </div>

          {/* Right Rail: System Proof Ledger & Portrait (4 Columns — Raycast / Works.studio Inspired) */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col space-y-6 w-full">
            
            {/* Cutout Portrait (Edge-anchored) */}
            <div className="flex justify-center lg:justify-end w-full">
              <HeroPhoto variant="cutout" maxWidth="w-full max-w-[420px]" />
            </div>

            {/* Tactical System Proof Ledger */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="w-full border rounded-2xl p-6 space-y-4 shadow-sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-card)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--text-muted)' }}>
                  AUDITED PROOF // SYSTEM METRICS
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold" style={{ color: 'var(--accent-teal)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border-card)' }}>
                {proofLedger.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-1 last:pb-1 group/item">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl sm:text-2xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                        {item.metric}
                      </span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--accent-amber)' }}>
                        {item.client}
                      </span>
                    </div>
                    <p className="text-xs font-light mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
                      {item.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

        {/* Full-width Logo Ticker with Hairline Divider */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="mt-12 lg:mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>
            ENGINEERED WITH INDUSTRY-STANDARD ENGINES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[var(--text-muted)] opacity-60">
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <N8nIcon className="w-4 h-4 text-current" />
              <span>n8n</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <ZapierIcon className="w-4 h-4 text-current" />
              <span>Zapier</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <MakeIcon className="w-4 h-4 text-current" />
              <span>Make.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <OpenaiIcon className="w-4 h-4 text-current" />
              <span>OpenAI</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <HubspotIcon className="w-4 h-4 text-current" />
              <span>HubSpot</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold font-sans">
              <AirtableIcon className="w-4 h-4 text-current" />
              <span>Airtable</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
