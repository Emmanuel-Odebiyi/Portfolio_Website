import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight, FileText, Globe, Target, ExternalLink, Quote,
  CheckCircle, X, Send, Loader2, PenTool, BookOpen, ChevronDown,
  ChevronUp, MapPin, Clock, BarChart3, Award, Sparkles, Building2,
  Search, Filter, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { HeroPhoto } from '../components/HeroPhoto';

// ──────────────────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────────────────

const herbvityArticles = [
  { title: '26 Fantastic Companion Plants for Knockout Roses', url: 'https://herbvity.com/companion-plants-for-knockout-roses/', topic: 'Roses & Shrubs', count: '26 Plants' },
  { title: '28 Great Companion Plants For Lambs Ear', url: 'https://herbvity.com/companion-plants-for-lambs-ear/', topic: 'Foliage & Groundcovers', count: '28 Plants' },
  { title: '24 Great Companion Plants For Hydrangeas', url: 'https://herbvity.com/companion-plants-for-hydrangeas/', topic: 'Acid-Loving Flowers', count: '24 Plants' },
  { title: '30 Great Companion Plants For Boxwoods', url: 'https://herbvity.com/companion-plants-for-boxwoods/', topic: 'Evergreens & Borders', count: '30 Plants' },
  { title: '26 Great Companion Plants for Peonies', url: 'https://herbvity.com/companion-plants-for-peonies/', topic: 'Perennials & Blooms', count: '26 Plants' },
  { title: '23 Great Companion Plants for Cherry Trees', url: 'https://herbvity.com/companion-plants-for-cherry-trees/', topic: 'Fruit & Orchard Trees', count: '23 Plants' },
  { title: '28 Great Companion Plants for Cilantro', url: 'https://herbvity.com/companion-plants-for-cilantro/', topic: 'Culinary Herbs', count: '28 Plants' },
  { title: '29 Great Companion Plants For Watermelon', url: 'https://herbvity.com/companion-plants-for-watermelon/', topic: 'Vines & Melons', count: '29 Plants' },
  { title: '23 Great Companion Plants For Asparagus', url: 'https://herbvity.com/companion-plants-for-asparagus/', topic: 'Perennial Vegetables', count: '23 Plants' },
  { title: '39 Great Companion Plants for Green Beans', url: 'https://herbvity.com/companion-plants-for-green-beans/', topic: 'Legumes & Pods', count: '39 Plants' },
  { title: '40 Great Companion Plants for Bell Peppers', url: 'https://herbvity.com/companion-plants-for-bell-peppers/', topic: 'Nightshades & Peppers', count: '40 Plants' },
  { title: '44 Great Companion Plants For Bee Balm', url: 'https://herbvity.com/companion-plants-for-bee-balm/', topic: 'Pollinator Favorites', count: '44 Plants' },
  { title: '37 Great Companion Plants For Daylilies', url: 'https://herbvity.com/companion-plants-for-daylilies/', topic: 'Hardy Perennials', count: '37 Plants' },
  { title: '35 Great Companion Plants for Azaleas', url: 'https://herbvity.com/companion-plants-for-azaleas/', topic: 'Woodland Shrubs', count: '35 Plants' },
  { title: '22 Great Companion Plants for Snow Peas', url: 'https://herbvity.com/companion-plants-for-snow-peas/', topic: 'Cool Season Greens', count: '22 Plants' },
  { title: '12 Disastrous Companion Plants for Fennel', url: 'https://herbvity.com/companion-plants-for-fennel/', topic: 'Allelopathic Warnings', count: '12 Plants' },
  { title: '20 Great Companion Plants for Parsley', url: 'https://herbvity.com/companion-plants-for-parsley/', topic: 'Biennial Herbs', count: '20 Plants' },
  { title: '34 Great Companion Plants For Chives', url: 'https://herbvity.com/companion-plants-for-chives/', topic: 'Alliums & Pest Control', count: '34 Plants' },
  { title: '27 Great Companion Plants for Basil', url: 'https://herbvity.com/companion-plants-for-basil/', topic: 'Companion Staples', count: '27 Plants' },
];

const featuredSample = {
  id: 0,
  catalogNum: 'CAT-01 // LEAD ESSAY',
  title: 'How Topic Clusters and Semantic Search Are Redefining B2B SEO',
  publication: 'StoryChief',
  publicationCategory: 'Global B2B Content Marketing Platform',
  url: 'https://storychief.io/blog/topic-clusters-semantic-search',
  type: 'SEO Strategy & MarTech Guide',
  industry: 'B2B SaaS / MarTech',
  readTime: '7 min read',
  date: 'Published on StoryChief Official Blog',
  excerpt: 'The way search engines evaluate domain authority has fundamentally evolved. This guide details how topic cluster architecture and semantic entity mapping replace obsolete keyword-stuffing tactics to deliver predictable, compounding organic pipeline for B2B brands.',
  highlight: 'Published Author on StoryChief (Global B2B Platform)',
  image: '/images/storychief_topic_clusters.webp',
  coreTakeaways: [
    'How Google Hummingbird and RankBrain prioritize contextual entity graphs over raw keywords',
    'Step-by-step topic cluster blueprints: Pillar page, sub-cluster spokes, and bi-directional internal linking',
    'Practical pipeline attribution: Converting informational traffic into high-intent MQLs'
  ]
};

type CatalogCategory = 'All' | 'B2B SaaS' | 'Wellness & Botanical' | 'Case Studies';

const writingSamples = [
  {
    id: 2,
    catalogNum: 'CAT-02 // HERBAL RESEARCH',
    title: 'Herbs for Anxiety: 7 Natural Remedies That Actually Work',
    publication: 'Herbvity',
    url: 'https://herbvity.com/author/Emmanuel-Odebiyi/',
    category: 'Wellness & Botanical' as CatalogCategory,
    type: 'Research Article',
    industry: 'Health & Wellness',
    readTime: '8 min read',
    excerpt: 'A research-backed guide to botanical anxiety interventions. Structured with clinical references to rank for high-intent search queries while providing genuine guidance for readers seeking evidence-based natural alternatives.',
    accent: 'green',
    image: '/images/herbvity_anxiety_cover.webp',
    isInternal: false,
    proofPoint: 'Ranked for competitive natural health search queries'
  },
  {
    id: 3,
    catalogNum: 'CAT-03 // CLINICAL SEO',
    title: 'Natural Remedies for Common Ailments: Evidence-Based Herbal Approaches',
    publication: 'Herbvity',
    url: 'https://herbvity.com/author/Emmanuel-Odebiyi/',
    category: 'Wellness & Botanical' as CatalogCategory,
    type: 'E-E-A-T Guide',
    industry: 'Health & Wellness',
    readTime: '10 min read',
    excerpt: 'Medical-grade health editorial that earns reader trust without sacrificing search engine performance. Built with strict E-E-A-T criteria, peer-reviewed citations, and clear layperson breakdowns.',
    accent: 'green',
    image: '/images/herbvity_natural_cover.webp',
    isInternal: false,
    proofPoint: 'Complies with rigorous Google YMYL & E-E-A-T guidelines'
  },
  {
    id: 4,
    catalogNum: 'CAT-04 // EDITORIAL SCALE',
    title: 'Content Strategy That Grew Organic Traffic 150% in 4 Months',
    publication: 'The Scoove Africa',
    url: '/portfolio/scoove-africa',
    category: 'Case Studies' as CatalogCategory,
    type: 'Documented Case Study',
    industry: 'Entertainment Media',
    readTime: '5 min read',
    excerpt: 'Directed the complete content editorial strategy for a digital entertainment platform. Moved 20+ competitive search terms from Position 45 straight to Page 1, reducing bounce rates by 25%.',
    accent: 'blue',
    isInternal: true,
    image: '/images/scoove_writing_cover.webp',
    proofPoint: '150% traffic growth in 4 months with 20+ Page 1 rankings'
  },
  {
    id: 5,
    catalogNum: 'CAT-05 // CONVERSION COPY',
    title: 'Local SEO Copy That Generated 180% More Organic Leads',
    publication: 'Emergency Response Africa',
    url: '/portfolio/emergency-response-africa',
    category: 'Case Studies' as CatalogCategory,
    type: 'Conversion Copy & Local SEO',
    industry: 'Healthcare / MedTech',
    readTime: '4 min read',
    excerpt: 'Geo-targeted landing page copy and structured medical schema that propelled 10+ high-urgency healthcare queries to Google Page 1 and increased emergency dispatch call volume by 30%.',
    accent: 'teal',
    isInternal: true,
    image: '/images/era_writing_cover.webp',
    proofPoint: '180% inbound lead increase and 30% direct call growth'
  },
  {
    id: 6,
    catalogNum: 'CAT-06 // REVENUE ENGINE',
    title: 'B2B SaaS Content That Delivered 520% ROI in 90 Days',
    publication: 'TechFlow Solutions',
    url: '/portfolio/techflow-solutions',
    category: 'B2B SaaS' as CatalogCategory,
    type: 'Content System & Strategy',
    industry: 'B2B SaaS',
    readTime: '6 min read',
    excerpt: 'Engineered a full-funnel content production system for a high-growth SaaS platform. Scaled output from 8 to 40+ monthly articles and directly attributed $127,000 in customer pipeline revenue.',
    accent: 'amber',
    isInternal: true,
    image: '/images/techflow_ga4_traffic.webp',
    proofPoint: '$127,000 direct revenue attributed to content system'
  },
];

const brands = [
  {
    name: 'StoryChief',
    category: 'Global MarTech Platform',
    detail: 'Published Author',
    url: 'https://storychief.io/blog/author/emmanuel-odebiyi-ayomide',
    logo: '/images/logos/storychief.webp',
  },
  {
    name: 'Herbvity',
    category: 'Health & Botanical Media',
    detail: '19 Indexed Articles',
    url: 'https://herbvity.com/author/Emmanuel-Odebiyi/',
    logo: '/images/logos/herbvity.webp',
  },
  {
    name: 'The Scoove Africa',
    category: 'Digital Entertainment Platform',
    detail: '150% Traffic Growth',
    url: '/portfolio/scoove-africa',
    logo: '/images/logos/scoove.webp',
  },
  {
    name: 'Emergency Response Africa',
    category: 'Healthcare Dispatch Network',
    detail: '180% Inbound Leads',
    url: '/portfolio/emergency-response-africa',
    logo: '/images/logos/era.webp',
  },
  {
    name: 'TechFlow Solutions',
    category: 'B2B SaaS Platform',
    detail: '520% Content ROI',
    url: '/portfolio/techflow-solutions',
    logo: '/images/logos/techflow.webp',
  },
];

const testimonials = [
  {
    quote: "Emmanuel transformed how our entire marketing operation works. The 520% ROI in the first quarter turned our leadership team into believers. It is the best strategic content investment we made all year.",
    name: 'Sarah Mitchell',
    role: 'VP of Marketing',
    company: 'TechFlow Solutions',
    avatar: '/images/testimonials/sarah_mitchell.webp',
    metric: '520% ROI in 90 Days'
  },
  {
    quote: "I was skeptical that 150% traffic growth in four months was possible without an army of writers. It was not luck: it was a system. Precise SEO, consistent output, and results we could measure.",
    name: 'Olaylide Bolaji-Daniel',
    role: 'Head of Content',
    company: 'The Scoove Africa',
    avatar: '/images/testimonials/Bolaji.webp',
    metric: 'Position 45 → Page 1'
  },
  {
    quote: "Emmanuel's localized health copy transformed how emergency services found us online. Pushing 10+ medical keywords to Page 1 increased direct emergency dispatch calls by 30% in under 60 days.",
    name: 'Paul Olaniyi',
    role: 'Marketing Director',
    company: 'Emergency Response Africa',
    avatar: '/images/testimonials/paul_olaniyi.webp',
    metric: '30% Increase in Emergency Calls'
  },
];

const pillars = [
  {
    catalogNum: '01',
    title: 'Editorial & Long-Form SEO',
    description: 'Deep-dive guides, pillar articles, and technical breakdowns crafted to rank on Page 1 and maintain reader engagement from the first sentence to the final CTA.',
    deliverables: ['Semantic entity coverage', 'Topic cluster architecture', 'Search intent satisfaction', 'E-E-A-T research citations']
  },
  {
    catalogNum: '02',
    title: 'High-Conversion Web Copy',
    description: 'Value proposition messaging, product pages, and conversion landing pages designed to eliminate sales resistance and turn cold readers into qualified leads.',
    deliverables: ['Value proposition clarity', 'Objection handling structure', 'Audience voice calibration', 'Frictionless call to actions']
  },
  {
    catalogNum: '03',
    title: 'Content Strategy & Editorial Systems',
    description: 'Systematic editorial calendars, keyword gap analysis, and content operations workflows that produce compounding organic compounding without chaos.',
    deliverables: ['Competitive keyword gap audits', 'Structured editorial briefs', 'Production workflow automation', 'GA4 revenue attribution']
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// QUICK APPLY MODAL
// ──────────────────────────────────────────────────────────────────────────────
function QuickApplyModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Your name is required';
    if (!form.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please provide a valid email';
    if (!form.message.trim()) errs.message = 'Please share a brief summary of your project or role';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    const subject = encodeURIComponent(`Content Writing Inquiry: ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Hello Emmanuel,\n\nMy name is ${form.name}${form.company ? ` from ${form.company}` : ''}.\n\nProject details:\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    );
    window.open(`mailto:emmanuel@emmanuel.name.ng?subject=${subject}&body=${body}`);
    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(14,28,42,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="relative w-full max-w-lg rounded-2xl border p-8 shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-card)',
          color: 'var(--text-body)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'rgba(201,123,10,0.15)' }}>
              <CheckCircle className="w-8 h-8" style={{ color: 'var(--accent-amber)' }} />
            </div>
            <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
              Brief Prepared
            </h3>
            <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Your default email client opened with the project details. If it did not launch automatically, reach out directly at:
            </p>
            <a
              href="mailto:emmanuel@emmanuel.name.ng"
              className="inline-block font-mono text-sm font-bold underline"
              style={{ color: 'var(--accent-amber)' }}
            >
              emmanuel@emmanuel.name.ng
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: 'var(--accent-amber)' }}>
                Direct Inquiry
              </span>
              <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                Start an Editorial Project
              </h3>
              <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                Share your publishing goals, target audience, or timeline. You will receive a response within 24 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold font-mono uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Mitchell"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent-amber)]"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      borderColor: errors.name ? '#ef4444' : 'var(--border-card)',
                      color: 'var(--text-body)',
                    }}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold font-mono uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    Company / Publication
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. TechFlow SaaS"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent-amber)]"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      borderColor: 'var(--border-card)',
                      color: 'var(--text-body)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold font-mono uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sarah@company.com"
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[var(--accent-amber)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    borderColor: errors.email ? '#ef4444' : 'var(--border-card)',
                    color: 'var(--text-body)',
                  }}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold font-mono uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                  Project Scope or Requirements *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you building? Mention your target topics, approximate article count, or strategic goals..."
                  className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all resize-none focus:border-[var(--accent-amber)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    borderColor: errors.message ? '#ef4444' : 'var(--border-card)',
                    color: 'var(--text-body)',
                  }}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1 font-medium">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                style={{ backgroundColor: 'var(--accent-amber)', color: '#0E1C2A' }}
              >
                {status === 'sending' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Project Brief</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FLOATING HIRE CTA
// ──────────────────────────────────────────────────────────────────────────────
function FloatingHireCTA({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          onClick={onClick}
          id="floating-hire-cta"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border"
          style={{
            backgroundColor: 'var(--accent-amber)',
            borderColor: 'rgba(14,28,42,0.2)',
            color: '#0E1C2A',
            boxShadow: '0 12px 32px rgba(201,123,10,0.35)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#0E1C2A] animate-pulse" />
          <span>Hire for Writing</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN CONTENT WRITER PORTFOLIO COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function ContentWriterPortfolio() {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('All');
  const [plantSearch, setPlantSearch] = useState('');
  const [isBotanicalExpanded, setIsBotanicalExpanded] = useState(false);

  // Filtered samples
  const filteredSamples = useMemo(() => {
    if (activeCategory === 'All') return writingSamples;
    return writingSamples.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  // Filtered Herbvity botanical articles
  const filteredHerbvity = useMemo(() => {
    if (!plantSearch.trim()) return herbvityArticles;
    const q = plantSearch.toLowerCase();
    return herbvityArticles.filter(
      a => a.title.toLowerCase().includes(q) || a.topic.toLowerCase().includes(q)
    );
  }, [plantSearch]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO
        title="Senior Content Writer & SEO Specialist | Emmanuel Odebiyi"
        description="Senior content writer and SEO strategist with 5+ years delivering published B2B SaaS guides, authoritative topic clusters, and high-conversion copy for StoryChief, Herbvity, and The Scoove Africa."
        keywords="senior content writer, B2B SaaS content writer, SEO content specialist, StoryChief writer, topic cluster architecture, Emmanuel Odebiyi"
      />

      <AnimatePresence>
        {showModal && <QuickApplyModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <FloatingHireCTA onClick={() => setShowModal(true)} />

      {/* ── 01. HERO: WORKS STUDIO / EDITORIAL READING ROOM AESTHETIC ────────── */}
      <section className="relative pt-36 sm:pt-40 lg:pt-44 pb-16 px-6 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left 7 Columns: Editorial Headline, Authority Proof & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Editorial Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-muted)',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
                <span>EDITORIAL WRITING &amp; TOPIC CLUSTERS</span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="space-y-3"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.98] font-display" style={{ color: 'var(--text-body)' }}>
                  Content That Ranks. <br />
                  <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
                    Words That Convert.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-normal leading-relaxed max-w-2xl pt-2 font-sans" style={{ color: 'var(--text-muted)' }}>
                  5+ years authoring authoritative B2B SaaS guides, research-backed health clusters, and conversion landing pages. Published on global platforms including StoryChief, Herbvity, and The Scoove Africa.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <button
                  onClick={() => setShowModal(true)}
                  id="hero-hire-me-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent-amber)',
                    color: '#0E1C2A',
                    boxShadow: '0 4px 20px rgba(201,123,10,0.3)',
                  }}
                >
                  <span>Commission an Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-4 text-sm font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-body)',
                  }}
                >
                  <span>Explore Catalog</span>
                  <ChevronDown className="w-4 h-4" />
                </a>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-4 text-sm font-medium transition-all hover:bg-black/5 dark:hover:bg-white/5"
                  style={{
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Automation Work</span>
                </Link>
              </motion.div>

              {/* Audited Proof Metrics (Kept strictly on left column per user rule) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="pt-6 border-t"
                style={{ borderColor: 'var(--border-card)' }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { metric: '150+', label: 'Delivered Articles', sub: 'Across 6 Industries' },
                    { metric: '520%', label: 'Content ROI', sub: 'TechFlow Solutions' },
                    { metric: '19', label: 'Indexed Guides', sub: 'Herbvity Botanical Cluster' },
                    { metric: '65%+', label: 'Avg Traffic Growth', sub: '3-Month Compounding' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-card)',
                      }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--accent-amber)' }}>
                        {stat.metric}
                      </div>
                      <div className="text-xs font-bold font-sans mt-1" style={{ color: 'var(--text-body)' }}>
                        {stat.label}
                      </div>
                      <div className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {stat.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right 5 Columns: Clean Cutout Portrait (Unclipped Containment) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroPhoto
                captionLabel="Senior Content Writer &amp; SEO Specialist"
                maxWidth="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px]"
                animateDelay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. MASTHEAD: PUBLISHED ON & TRUSTED PARTNERS ─────────────────────── */}
      <section className="py-10 px-6 border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Published On &amp; Editorial Partners
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-4 sm:gap-6">
              {brands.map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  target={b.url.startsWith('http') ? '_blank' : '_self'}
                  rel={b.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="group flex items-center gap-3 p-2.5 rounded-xl border transition-all hover:border-[var(--accent-amber)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <div className="w-8 h-8 rounded-lg p-1 flex items-center justify-center shrink-0 border"
                    style={{ borderColor: 'var(--border-card)', backgroundColor: '#ffffff' }}>
                    <img
                      src={b.logo}
                      alt={`${b.name} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold font-sans group-hover:text-[var(--accent-amber)] transition-colors" style={{ color: 'var(--text-body)' }}>
                      {b.name}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      {b.detail}
                    </span>
                  </div>
                  {b.url.startsWith('http') && (
                    <ExternalLink className="w-3 h-3 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-amber)' }} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. FEATURED ARTICLE: STORYCHIEF MARTECH CENTERPIECE ──────────────── */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                {featuredSample.catalogNum}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Featured Editorial Publication
              </h2>
            </div>
            <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {featuredSample.date}
            </div>
          </div>

          {/* Magazine-style Feature Spread */}
          <div
            className="rounded-2xl border overflow-hidden transition-all shadow-md"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-card)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left 6 Columns: Editorial Synopsis & Strategic Breakdown */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 text-left">
                <div className="space-y-6">
                  
                  {/* Meta tag pill */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(201,123,10,0.12)',
                        color: 'var(--accent-amber)',
                        border: '1px solid rgba(201,123,10,0.25)',
                      }}
                    >
                      {featuredSample.type}
                    </span>
                    <span className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-amber)' }} />
                      {featuredSample.readTime}
                    </span>
                    <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-muted)' }}>
                      Published on StoryChief.io
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight leading-snug" style={{ color: 'var(--text-body)' }}>
                    {featuredSample.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-base sm:text-lg leading-relaxed font-sans" style={{ color: 'var(--text-muted)' }}>
                    {featuredSample.excerpt}
                  </p>

                  {/* Key Editorial Takeaways */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-body)' }}>
                      Core Frameworks Explored in the Article:
                    </div>
                    <ul className="space-y-2">
                      {featuredSample.coreTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans" style={{ color: 'var(--text-muted)' }}>
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-amber)' }} />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="text-xs font-mono font-bold" style={{ color: 'var(--accent-amber)' }}>
                    {featuredSample.highlight}
                  </div>
                  <a
                    href={featuredSample.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer border"
                    style={{
                      backgroundColor: 'var(--accent-amber)',
                      borderColor: 'rgba(14,28,42,0.2)',
                      color: '#0E1C2A',
                    }}
                  >
                    <span>Read on StoryChief</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Official Publication Cover */}
              <div
                className="lg:col-span-5 relative min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l overflow-hidden flex items-center justify-center"
                style={{
                  borderColor: 'var(--border-card)',
                  backgroundColor: 'var(--bg-page)',
                }}
              >
                <img
                  src={featuredSample.image}
                  alt={featuredSample.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-sm border border-white/20">
                  Global Syndication
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. BOTANICAL REPOSITORY: HERBVITY 19-ARTICLE TOPIC CLUSTER ───────── */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-teal)' }}>
                PROGRAMMATIC TOPIC CLUSTER ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Herbvity Botanical SEO Repository
              </h2>
              <p className="text-base leading-relaxed max-w-2xl font-sans" style={{ color: 'var(--text-muted)' }}>
                19 comprehensive companion planting and botanical medicine guides authored for Herbvity. Built as an interconnected topical mesh with zero cannibalization, capturing high-intent search volume across gardening and natural health queries.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <div className="p-4 rounded-xl border text-left" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span style={{ color: 'var(--text-muted)' }}>Indexed Articles</span>
                  <span className="font-bold" style={{ color: 'var(--accent-teal)' }}>19 of 19 Live</span>
                </div>
                <div className="w-full h-1.5 rounded-full mt-2 overflow-hidden bg-black/10 dark:bg-white/10">
                  <div className="h-full rounded-full w-full" style={{ backgroundColor: 'var(--accent-teal)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={plantSearch}
                onChange={e => setPlantSearch(e.target.value)}
                placeholder="Search plants or herbs (e.g. roses, cilantro, bell peppers, basil)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border outline-none font-sans"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-body)',
                }}
              />
              {plantSearch && (
                <button
                  onClick={() => setPlantSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-muted)' }}>
                Showing {filteredHerbvity.length} of 19 guides
              </span>
              <a
                href="https://herbvity.com/author/Emmanuel-Odebiyi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{
                  borderColor: 'var(--border-card)',
                  color: 'var(--accent-teal)',
                }}
              >
                <span>Author Archive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Botanical Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(isBotanicalExpanded ? filteredHerbvity : filteredHerbvity.slice(0, 9)).map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 rounded-xl border transition-all hover:border-[var(--accent-teal)] hover:shadow-sm text-left"
                style={{
                  backgroundColor: 'var(--bg-page)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md border" style={{ borderColor: 'var(--border-card)', color: 'var(--accent-teal)', backgroundColor: 'var(--bg-surface)' }}>
                      {article.topic}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{article.count}</span>
                  </div>
                  <h4 className="text-sm font-bold font-sans line-clamp-2 group-hover:text-[var(--accent-teal)] transition-colors" style={{ color: 'var(--text-body)' }}>
                    {article.title}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t flex items-center justify-between text-[11px] font-mono" style={{ borderColor: 'var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>herbvity.com</span>
                  <span className="inline-flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--accent-teal)' }}>
                    <span>Read Guide</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Expander Toggle */}
          {filteredHerbvity.length > 9 && (
            <div className="text-center pt-2">
              <button
                onClick={() => setIsBotanicalExpanded(prev => !prev)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-page)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-body)',
                }}
              >
                <span>{isBotanicalExpanded ? 'Collapse Cluster' : `View All ${filteredHerbvity.length} Guides`}</span>
                {isBotanicalExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 05. CATALOG OF SELECTED WRITING PIECES ───────────────────────────── */}
      <section id="catalog" className="py-20 px-6 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                PUBLISHED WRITING CATALOG
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                Selected Articles &amp; Case Studies
              </h2>
              <p className="text-sm font-sans max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Every sample below represents published work with verifiable organic performance, live links, or documented revenue attribution.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}>
              {(['All', 'B2B SaaS', 'Wellness & Botanical', 'Case Studies'] as CatalogCategory[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'border shadow-xs'
                      : 'hover:text-[var(--text-body)]'
                  }`}
                  style={
                    activeCategory === cat
                      ? {
                          backgroundColor: 'var(--accent-amber)',
                          borderColor: 'rgba(14,28,42,0.2)',
                          color: '#0E1C2A',
                        }
                      : { color: 'var(--text-muted)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSamples.map((sample, idx) => (
              <article
                key={sample.id}
                className="group flex flex-col justify-between rounded-2xl border overflow-hidden transition-all hover:border-[var(--accent-amber)] hover:shadow-lg text-left"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <div>
                  {/* Article Cover Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-page)' }}>
                    <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs border border-white/20">
                      {sample.catalogNum}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[var(--accent-amber)]" />
                      {sample.readTime}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-bold" style={{ color: 'var(--accent-amber)' }}>{sample.publication}</span>
                      <span>{sample.industry}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display leading-snug group-hover:text-[var(--accent-amber)] transition-colors" style={{ color: 'var(--text-body)' }}>
                      {sample.title}
                    </h3>

                    <p className="text-xs leading-relaxed font-sans line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                      {sample.excerpt}
                    </p>

                    <div className="p-2.5 rounded-lg border text-[11px] font-mono" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}>
                      <span className="font-bold text-[var(--text-body)]">Outcome:</span> {sample.proofPoint}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 py-4 border-t flex items-center justify-between text-xs font-mono font-bold" style={{ borderColor: 'var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {sample.isInternal ? 'Documented System' : 'Indexed Article'}
                  </span>
                  {sample.isInternal ? (
                    <Link
                      to={sample.url}
                      className="inline-flex items-center gap-1 text-[var(--accent-amber)] hover:underline"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={sample.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--accent-amber)] hover:underline"
                    >
                      <span>Read Publication</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06. EDITORIAL PHILOSOPHY & THE CRAFT ─────────────────────────────── */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Columns: Manifesto */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
                THE WRITING PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                The Invisible SEO Skeleton
              </h2>
              <div className="space-y-4 text-sm leading-relaxed font-sans" style={{ color: 'var(--text-muted)' }}>
                <p>
                  Most SEO content feels like a robotic checklist created for algorithms rather than humans. It bores the reader, damages brand equity, and inflates bounce rates.
                </p>
                <p>
                  My approach embeds the technical SEO skeleton underneath natural, engaging prose. The reader experiences a clear, compelling story that answers their problem. Meanwhile, search engines discover comprehensive semantic entity coverage, structured schema, and deep topic authority.
                </p>
                <blockquote className="p-4 rounded-xl border-l-2 font-serif italic text-base"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    borderLeftColor: 'var(--accent-amber)',
                    color: 'var(--text-body)',
                  }}
                >
                  "Rankings get visitors through the door. Convincing, authoritative writing turns them into customers."
                </blockquote>
              </div>
            </div>

            {/* Right 7 Columns: Precision Pillars */}
            <div className="lg:col-span-7 space-y-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border text-left space-y-3"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-amber)' }}>
                      {pillar.catalogNum} // SERVICE CORE
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Production Ready
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display" style={{ color: 'var(--text-body)' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--text-muted)' }}>
                    {pillar.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {pillar.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono border"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          borderColor: 'var(--border-card)',
                          color: 'var(--text-body)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. VERIFIED CLIENT TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
              VERIFIED CLIENT OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Proof From Editorial Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-8 rounded-2xl border text-left space-y-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-6 h-6 opacity-40" style={{ color: 'var(--accent-amber)' }} />
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: 'rgba(201,123,10,0.12)',
                        color: 'var(--accent-amber)',
                      }}
                    >
                      {t.metric}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed font-sans font-medium" style={{ color: 'var(--text-body)' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border"
                    style={{ borderColor: 'var(--border-card)' }}
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold font-display" style={{ color: 'var(--text-body)' }}>
                      {t.name}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {t.role}, {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08. FINAL COMMISSION CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-amber)' }}>
              AVAILABLE FOR NEW EDITORIAL PROJECTS
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Ready to Publish Content <br />
              <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
                That Actually Moves the Needle?
              </span>
            </h2>
            <p className="text-base font-sans max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Open to senior content writing retainers, technical SaaS guides, and comprehensive SEO topic cluster architectures. Remote worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              id="footer-commission-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg border"
              style={{
                backgroundColor: 'var(--accent-amber)',
                borderColor: 'rgba(14,28,42,0.2)',
                color: '#0E1C2A',
                boxShadow: '0 8px 30px rgba(201,123,10,0.3)',
              }}
            >
              <span>Send Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/resume"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-sm font-sans font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5"
              style={{
                borderColor: 'var(--border-card)',
                color: 'var(--text-body)',
              }}
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </Link>
          </div>

          <div className="pt-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <span>Direct contact: </span>
            <a
              href="mailto:emmanuel@emmanuel.name.ng"
              className="font-bold underline transition-colors hover:text-[var(--accent-amber)]"
              style={{ color: 'var(--text-body)' }}
            >
              emmanuel@emmanuel.name.ng
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
