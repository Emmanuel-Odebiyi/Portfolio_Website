import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Workflow image imports (alternating n8n / Make / Zapier) ─────────────────
import img01 from '../../assets/workflows/n8n-social-media-content-factory-workflow.png';
import img02 from '../../assets/workflows/make-notion-google-calendar-automation.png';
import img03 from '../../assets/workflows/zapier-biz-dev-call-briefer-agent.png';
import img04 from '../../assets/workflows/n8n-langflow-chatbot-integration-workflow.png';
import img05 from '../../assets/workflows/make-stripe-klicktipp-payment-automation.png';
import img06 from '../../assets/workflows/zapier-linkedin-ads-idea-generation-zap.png';
import img07 from '../../assets/workflows/n8n-ai-strategy-optimization-workflow.png';
import img08 from '../../assets/workflows/make-video-publishing-traffic-funnel.png';
import img09 from '../../assets/workflows/zapier-linkedin-webhook-calendar-zap.png';
import img10 from '../../assets/workflows/n8n-seo-article-content-pipeline.png';
import img11 from '../../assets/workflows/make-google-sheets-wordpress-blog-automation.png';
import img12 from '../../assets/workflows/n8n-online-marketing-weekly-report.png';
import img13 from '../../assets/workflows/make-wordpress-social-media-chatgpt.png';

interface Card {
  src: string;
  alt: string;
  platform: 'n8n' | 'make' | 'zapier';
  label: string;
}

const CARDS: Card[] = [
  { src: img01, platform: 'n8n',    alt: 'n8n social media content factory workflow',            label: 'Social Media Content Factory'   },
  { src: img02, platform: 'make',   alt: 'Make Notion to Google Calendar automation',             label: 'Notion → Google Calendar Sync'  },
  { src: img03, platform: 'zapier', alt: 'Zapier Biz Dev Call Briefer AI agent',                 label: 'Biz Dev Call Briefer'           },
  { src: img04, platform: 'n8n',    alt: 'n8n Langflow chatbot integration workflow',             label: 'Langflow Chatbot Integration'   },
  { src: img05, platform: 'make',   alt: 'Make Stripe KlickTipp payment automation',             label: 'Stripe → KlickTipp Payments'    },
  { src: img06, platform: 'zapier', alt: 'Zapier LinkedIn Ads idea generation',                  label: 'LinkedIn Ads → Idea Pipeline'   },
  { src: img07, platform: 'n8n',    alt: 'n8n AI strategy optimization workflow',                label: 'AI Strategy Optimization'       },
  { src: img08, platform: 'make',   alt: 'Make video publishing traffic funnel',                 label: 'Video Publishing Traffic Funnel'},
  { src: img09, platform: 'zapier', alt: 'Zapier LinkedIn webhook Google Calendar',              label: 'LinkedIn Ads → Calendar CRM'    },
  { src: img10, platform: 'n8n',    alt: 'n8n SEO article content pipeline',                     label: 'SEO Article Content Pipeline'   },
  { src: img11, platform: 'make',   alt: 'Make Google Sheets WordPress blog automation',         label: 'Google Sheets → WordPress Blog' },
  { src: img12, platform: 'n8n',    alt: 'n8n online marketing weekly report workflow',          label: 'Weekly Marketing Report'        },
  { src: img13, platform: 'make',   alt: 'Make WordPress social posts via ChatGPT',              label: 'WordPress → Social via ChatGPT' },
];

const BADGE: Record<Card['platform'], { label: string; color: string; bg: string }> = {
  n8n:    { label: 'n8n',    color: '#ff6d3a', bg: 'rgba(255,109,58,0.15)' },
  make:   { label: 'Make',   color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  zapier: { label: 'Zapier', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
};

// Auto-advance interval in ms — fast enough to notice, smooth enough to feel natural
const INTERVAL = 2800;
// Number of stacked cards visible behind the active one
const STACK_DEPTH = 3;

export const WorkflowCardStack: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = CARDS.length;

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive(prev => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(next, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next, active]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Card stack ──────────────────────────────────────────────────── */}
      <div
        className="relative w-full rounded-2xl"
        style={{ height: 'clamp(280px, 38vw, 540px)' }}
      >
        {/* Behind cards — depth illusion */}
        {Array.from({ length: STACK_DEPTH }).map((_, si) => {
          const behindIdx = (active + si + 1) % total;
          const d = si + 1;
          return (
            <div
              key={`behind-${behindIdx}-${d}`}
              className="absolute inset-0 rounded-2xl overflow-hidden border"
              style={{
                transform: `translateY(${d * 10}px) scale(${1 - d * 0.04})`,
                zIndex: STACK_DEPTH - si,
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-card)',
                opacity: 1 - d * 0.2,
                transition: 'transform 0.5s cubic-bezier(0.34,1.2,0.64,1)',
              }}
            >
              <img
                src={CARDS[behindIdx].src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-top"
                style={{ opacity: 0.35 }}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Active front card */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`front-${active}`}
            className="absolute inset-0 rounded-2xl overflow-hidden border"
            style={{
              zIndex: STACK_DEPTH + 2,
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-card)',
              boxShadow: '0 24px 64px -12px rgba(0,0,0,0.3), 0 4px 20px -4px rgba(0,0,0,0.15)',
            }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <img
              src={CARDS[active].src}
              alt={CARDS[active].alt}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />

            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
            />

            {/* Platform badge + label */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide"
                style={{
                  color: BADGE[CARDS[active].platform].color,
                  backgroundColor: BADGE[CARDS[active].platform].bg,
                  backdropFilter: 'blur(8px)',
                }}
              >
                {BADGE[CARDS[active].platform].label}
              </span>
              <span
                className="text-[10px] font-semibold text-white/90 px-2 py-1 rounded-full text-right max-w-[58%] leading-tight"
                style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                {CARDS[active].label}
              </span>
            </div>

            {/* Pause overlay hint */}
            {paused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-3 right-3 text-[9px] font-mono text-white/60 bg-black/30 px-2 py-0.5 rounded-full"
              >
                paused
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress bar + controls ──────────────────────────────────────── */}
      <div className="mt-4 flex items-center gap-3">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95"
          style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1.5L3 5l4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0">
          {CARDS.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full focus:outline-none cursor-pointer"
                style={{
                  width: isActive ? '16px' : '6px',
                  backgroundColor: isActive ? 'var(--accent-amber)' : 'var(--border-card)',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Counter */}
        <span
          className="text-[10px] font-mono shrink-0 tabular-nums"
          style={{ color: 'var(--text-muted)' }}
        >
          {String(active + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
        </span>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next"
          className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95"
          style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 1.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
