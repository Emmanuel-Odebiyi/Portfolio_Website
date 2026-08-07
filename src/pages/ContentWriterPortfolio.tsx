import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  ArrowRight, FileText, Globe, Target, ExternalLink, Quote,
  CheckCircle, X, Send, Loader2, PenTool, BookOpen, ChevronDown,
  ChevronUp, MapPin, Clock, BarChart3, Award, Sparkles, Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { OptimizedImage } from '../components/common/OptimizedImage';
import { HeroPhoto } from '../components/HeroPhoto';

// ──────────────────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────────────────

const herbvityArticles = [
  { title: '26 Fantastic Companion Plants for Knockout Roses', url: 'https://herbvity.com/companion-plants-for-knockout-roses/', topic: 'Gardening' },
  { title: '28 Great Companion Plants For Lambs Ear', url: 'https://herbvity.com/companion-plants-for-lambs-ear/', topic: 'Gardening' },
  { title: '24 Great Companion Plants For Hydrangeas', url: 'https://herbvity.com/companion-plants-for-hydrangeas/', topic: 'Gardening' },
  { title: '30 Great Companion Plants For Boxwoods', url: 'https://herbvity.com/companion-plants-for-boxwoods/', topic: 'Gardening' },
  { title: '26 Great Companion Plants for Peonies', url: 'https://herbvity.com/companion-plants-for-peonies/', topic: 'Gardening' },
  { title: '23 Great Companion Plants for Cherry Trees', url: 'https://herbvity.com/companion-plants-for-cherry-trees/', topic: 'Gardening' },
  { title: '28 Great Companion Plants for Cilantro', url: 'https://herbvity.com/companion-plants-for-cilantro/', topic: 'Gardening' },
  { title: '29 Great Companion Plants For Watermelon', url: 'https://herbvity.com/companion-plants-for-watermelon/', topic: 'Gardening' },
  { title: '23 Great Companion Plants For Asparagus', url: 'https://herbvity.com/companion-plants-for-asparagus/', topic: 'Gardening' },
  { title: '39 Great Companion Plants for Green Beans', url: 'https://herbvity.com/companion-plants-for-green-beans/', topic: 'Gardening' },
  { title: '40 Great Companion Plants for Bell Peppers', url: 'https://herbvity.com/companion-plants-for-bell-peppers/', topic: 'Gardening' },
  { title: '44 Great Companion Plants For Bee Balm', url: 'https://herbvity.com/companion-plants-for-bee-balm/', topic: 'Gardening' },
  { title: '37 Great Companion Plants For Daylilies', url: 'https://herbvity.com/companion-plants-for-daylilies/', topic: 'Gardening' },
  { title: '35 Great Companion Plants for Azaleas', url: 'https://herbvity.com/companion-plants-for-azaleas/', topic: 'Gardening' },
  { title: '22 Great Companion Plants for Snow Peas', url: 'https://herbvity.com/companion-plants-for-snow-peas/', topic: 'Gardening' },
  { title: '12 Disastrous Companion Plants for Fennel', url: 'https://herbvity.com/companion-plants-for-fennel/', topic: 'Gardening' },
  { title: '20 Great Companion Plants for Parsley', url: 'https://herbvity.com/companion-plants-for-parsley/', topic: 'Gardening' },
  { title: '34 Great Companion Plants For Chives', url: 'https://herbvity.com/companion-plants-for-chives/', topic: 'Gardening' },
  { title: '27 Great Companion Plants for Basil', url: 'https://herbvity.com/companion-plants-for-basil/', topic: 'Gardening' },
];

const featuredSample = {
  id: 0,
  title: 'How Topic Clusters and Semantic Search Are Redefining B2B SEO',
  publication: 'StoryChief',
  url: 'https://storychief.io/blog/topic-clusters-semantic-search',
  type: 'SEO Guide',
  industry: 'B2B / MarTech',
  readTime: '7 min',
  excerpt: 'The way search engines evaluate authority has changed. This guide breaks down how topic clusters and semantic SEO work together to move content from invisible to dominant — for B2B brands that need long-term organic traction.',
  highlight: 'Published on StoryChief — Global B2B Content Platform',
  image: '/images/storychief_topic_clusters.webp',
};

const writingSamples = [
  {
    id: 2,
    title: 'Herbs for Anxiety: 7 Natural Remedies That Actually Work',
    publication: 'Herbvity', url: 'https://herbvity.com/author/Emmanuel-Odebiyi/',
    type: 'Long-form Article', industry: 'Health & Wellness', readTime: '8 min',
    excerpt: 'Research-backed guide to herbal anxiety remedies — written to rank for high-intent search terms while genuinely serving readers seeking natural alternatives.',
    accent: 'green',
    image: '/images/herbvity_anxiety_cover.webp',
  },
  {
    id: 3,
    title: 'Natural Remedies for Common Ailments: Evidence-Based Herbal Approaches',
    publication: 'Herbvity', url: 'https://herbvity.com/author/Emmanuel-Odebiyi/',
    type: 'Health Content', industry: 'Health & Wellness', readTime: '10 min',
    excerpt: 'Health content that earns trust without sacrificing search performance — rigorous research made accessible.',
    accent: 'green',
    image: '/images/herbvity_natural_cover.webp',
  },
  {
    id: 4,
    title: 'Content Strategy That Grew Organic Traffic 150% in 4 Months',
    publication: 'The Scoove Africa', url: '/portfolio/scoove-africa',
    type: 'Case Study', industry: 'Entertainment Media', readTime: '5 min',
    excerpt: 'Led end-to-end content strategy for Nigeria\'s digital entertainment platform — taking it from Position 45 to Page 1 for 20+ competitive keywords.',
    accent: 'blue', isInternal: true,
    image: '/images/scoove_writing_cover.webp',
  },
  {
    id: 5,
    title: 'Local SEO Copy That Generated 180% More Organic Leads',
    publication: 'Emergency Response Africa', url: '/portfolio/emergency-response-africa',
    type: 'Local SEO Copy', industry: 'Healthcare / MedTech', readTime: '4 min',
    excerpt: 'Geo-targeted landing page copy that pushed 10+ high-intent healthcare search terms to Page 1 and increased call volume by 30%.',
    accent: 'rose', isInternal: true,
    image: '/images/era_writing_cover.webp',
  },
  {
    id: 6,
    title: 'B2B SaaS Content That Delivered 520% ROI in 90 Days',
    publication: 'TechFlow Solutions', url: '/portfolio/techflow-solutions',
    type: 'Content Strategy', industry: 'B2B SaaS', readTime: '6 min',
    excerpt: 'Designed and wrote a full SEO content system for a B2B SaaS platform — scaling from 8 to 35+ articles monthly and attributing $127K in revenue to content.',
    accent: 'amber', isInternal: true,
    image: '/images/techflow_ga4_traffic.webp',
  },
];

const pillars = [
  {
    icon: PenTool, title: 'Long-Form SEO Writing',
    description: 'Blog posts, pillar pages, comprehensive guides written to rank and hold attention. Articles people read to the end.',
    skills: ['Topic cluster architecture', 'On-page SEO', 'Search intent matching', 'E-E-A-T content'],
  },
  {
    icon: Globe, title: 'Web Copy & Landing Pages',
    description: 'Homepage copy, product pages, service pages — written to convert. The difference is the writing.',
    skills: ['Conversion copy', 'Brand voice matching', 'Value proposition clarity', 'CTA optimization'],
  },
  {
    icon: Target, title: 'Content Strategy & Editing',
    description: 'Editorial planning, content audits, topic architecture built around what your audience searches for.',
    skills: ['Keyword gap analysis', 'Content calendars', 'Editorial briefs', 'Content team management'],
  },
];

const results = [
  {
    client: 'TechFlow Solutions', industry: 'B2B SaaS',
    metrics: [
      { value: '35+', label: 'articles per month' },
      { value: '→ P1', label: 'avg keyword movement' },
      { value: '$127K', label: 'revenue from content' },
    ],
    accent: 'amber',
  },
  {
    client: 'The Scoove Africa', industry: 'Entertainment Media',
    metrics: [
      { value: '150%', label: 'organic traffic growth' },
      { value: '20+', label: 'new Page 1 rankings' },
      { value: '40%', label: 'CTR improvement' },
    ],
    accent: 'blue',
  },
  {
    client: 'Emergency Response Africa', industry: 'Healthcare',
    metrics: [
      { value: '180%', label: 'organic lead growth' },
      { value: '10+', label: 'Page 1 keywords' },
      { value: '30%', label: 'more direct calls' },
    ],
    accent: 'rose',
  },
];

const testimonials = [
  {
    quote: "Emmanuel didn't just improve our content — he transformed how our entire marketing operation works. The 520% ROI in the first quarter turned our entire board into believers. It's the best strategic investment we made all year.",
    name: 'Sarah Mitchell', role: 'VP of Marketing', company: 'TechFlow Solutions',
    avatar: '/images/testimonials/sarah_mitchell.webp',
    featured: true,
  },
  {
    quote: "I was skeptical that 150% traffic growth in four months was even possible without a full team. It wasn't luck — it was a system. Precise SEO, consistent output, and results we could actually measure.",
    name: 'Olaylide Bolaji-Daniel', role: 'Head of Content', company: 'The Scoove Africa',
    avatar: '/images/testimonials/Bolaji.webp',
    featured: false,
  },
  {
    quote: "Emmanuel's localized health copy transformed how emergency services found us online. Pushing 10+ medical keywords to Page 1 increased direct emergency calls by 30% in under 60 days.",
    name: 'Paul Olaniyi', role: 'Marketing Director', company: 'Emergency Response Africa',
    avatar: '/images/testimonials/paul_olaniyi.webp',
    featured: false,
  },
];

const brands = [
  { 
    name: 'StoryChief', 
    category: 'B2B MarTech Platform', 
    count: 'Published Author', 
    url: 'https://storychief.io/blog/author/emmanuel-odebiyi-ayomide', 
    logo: '/images/logos/storychief.webp',
  },
  { 
    name: 'Herbvity', 
    category: 'Health & Wellness', 
    count: '19 Articles Published', 
    url: 'https://herbvity.com/author/Emmanuel-Odebiyi/', 
    logo: '/images/logos/herbvity.webp',
  },
  { 
    name: 'The Scoove Africa', 
    category: 'Entertainment & Media', 
    count: 'Content & SEO Strategy', 
    url: '/portfolio/scoove-africa', 
    logo: '/images/logos/scoove.webp',
  },
  { 
    name: 'Emergency Response Africa', 
    category: 'Healthcare / MedTech', 
    count: 'Local SEO Copywriting', 
    url: '/portfolio/emergency-response-africa', 
    logo: '/images/logos/era.webp',
  },
  { 
    name: 'TechFlow Solutions', 
    category: 'B2B SaaS', 
    count: '35+ Monthly Articles', 
    url: '/portfolio/techflow-solutions', 
    logo: '/images/logos/techflow.webp',
  },
];

const accentMap: Record<string, { border: string; bg: string; badge: string; text: string; dot: string; glow: string }> = {
  amber: { border: 'border-amber-500/25', bg: 'rgba(245,158,11,0.06)', badge: 'bg-amber-500/10 text-amber-500 border border-amber-500/20', text: 'text-amber-500', dot: 'bg-amber-500', glow: 'rgba(245,158,11,0.15)' },
  blue: { border: 'border-blue-500/25', bg: 'rgba(59,130,246,0.06)', badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400', glow: 'rgba(59,130,246,0.15)' },
  green: { border: 'border-emerald-500/25', bg: 'rgba(16,185,129,0.06)', badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', glow: 'rgba(16,185,129,0.15)' },
  rose: { border: 'border-rose-500/25', bg: 'rgba(244,63,94,0.06)', badge: 'bg-rose-500/10 text-rose-400 border border-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-400', glow: 'rgba(244,63,94,0.15)' },
};

// ──────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ──────────────────────────────────────────────────────────────────────────────
function AnimatedStat(props: React.Attributes & { value: string; label: string }) {
  const { value, label } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start gap-1 p-4 sm:p-5 rounded-2xl border"
      style={{ borderColor: 'rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.05)' }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-2xl sm:text-3xl font-bold font-display tabular-nums"
        style={{ color: '#f59e0b' }}
      >
        {value}
      </motion.span>
      <span className="text-xs leading-tight font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FLOATING HIRE CTA
// ──────────────────────────────────────────────────────────────────────────────
function FloatingHireCTA({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onClick}
          id="floating-hire-cta"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95"
          style={{
            backgroundColor: '#f59e0b',
            color: '#0a0a0a',
            boxShadow: '0 8px 32px rgba(245,158,11,0.4)',
          }}
        >
          Hire Me
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

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
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Tell me what you need';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    const subject = encodeURIComponent(`Content Writer Inquiry — ${form.company || form.name}`);
    const body = encodeURIComponent(`Hi Emmanuel,\n\nMy name is ${form.name}${form.company ? ` from ${form.company}` : ''}.\n\n${form.message}\n\nBest,\n${form.name}\n${form.email}`);
    window.open(`mailto:emmanuel@emmanuelodebiyi.name.ng?subject=${subject}&body=${body}`);
    setTimeout(() => setStatus('sent'), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-md rounded-2xl border p-8"
        style={{ backgroundColor: 'var(--bg-card, #111)', borderColor: 'rgba(245,158,11,0.3)', boxShadow: '0 0 80px rgba(245,158,11,0.1), 0 24px 64px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-8 space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 14 }}>
              <CheckCircle className="w-14 h-14 text-amber-500 mx-auto" />
            </motion.div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-body)' }}>Brief sent!</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Your email client should have opened. Alternatively: {' '}
              <a href="mailto:emmanuel@emmanuelodebiyi.name.ng" className="text-amber-500 underline">emmanuel@emmanuelodebiyi.name.ng</a>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Send a brief</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>I respond within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'name', label: 'Your name *', placeholder: 'Sarah', type: 'text' },
                  { name: 'company', label: 'Company', placeholder: 'Acme Inc.', type: 'text' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                    <input
                      type={f.type} name={f.name} value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        borderColor: errors[f.name] ? '#f43f5e' : 'rgba(255,255,255,0.1)',
                        color: 'var(--text-body)',
                      }}
                    />
                    {errors[f.name] && <p className="text-xs text-rose-400 mt-1">{errors[f.name]}</p>}
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Email *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com"
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: errors.email ? '#f43f5e' : 'rgba(255,255,255,0.1)', color: 'var(--text-body)' }}
                />
                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>What do you need? *</label>
                <textarea
                  name="message" rows={4} value={form.message} onChange={handleChange}
                  placeholder="Tell me about the role or project — topic, word count, audience, turnaround..."
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all resize-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: errors.message ? '#f43f5e' : 'rgba(255,255,255,0.1)', color: 'var(--text-body)' }}
                />
                {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                style={{ backgroundColor: '#f59e0b', color: '#0a0a0a' }}
              >
                {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send brief</>}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SAMPLE CARD WITH IMAGE COVER
// ──────────────────────────────────────────────────────────────────────────────
function SampleCard(props: React.Attributes & { sample: typeof writingSamples[0]; index: number }) {
  const { sample, index } = props;
  const accent = accentMap[sample.accent] || accentMap.amber;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group flex flex-col justify-between rounded-2xl border overflow-hidden transition-all ${accent.border}`}
      style={{ backgroundColor: accent.bg }}
    >
      <div>
        {/* Cover Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'var(--bg-surface)' }}>
          <img
            src={sample.image}
            alt={sample.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className={`absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase shadow-md ${accent.badge}`}>
            {sample.type}
          </span>
          <span className="absolute bottom-3 right-3 text-xs text-white/90 font-medium flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-400" />{sample.readTime}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-base font-bold leading-snug group-hover:text-amber-500 transition-colors" style={{ color: 'var(--text-body)' }}>
            {sample.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {sample.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          <BookOpen className="w-3.5 h-3.5 shrink-0 text-amber-500" />
          <span className="truncate max-w-[130px]">{sample.publication}</span>
        </div>
        {sample.isInternal ? (
          <Link to={sample.url} className={`flex items-center gap-1 text-xs font-bold ${accent.text}`}>
            Case study <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <a href={sample.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 text-xs font-bold ${accent.text}`}>
            Read <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────────────────────────────────────
export default function ContentWriterPortfolio() {
  const [showModal, setShowModal] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO
        title="Senior Content Writer & SEO Specialist | Emmanuel Odebiyi"
        description="Emmanuel Odebiyi is a senior content writer and SEO specialist with 5+ years delivering long-form blog posts, web copy, and content strategy for B2B SaaS, media, and healthcare brands."
        keywords="senior content writer, SEO writer for hire, SEO content specialist, B2B content writer, blog writer, content marketing specialist, Emmanuel Odebiyi"
      />

      <AnimatePresence>{showModal && <QuickApplyModal onClose={() => setShowModal(false)} />}</AnimatePresence>
      <FloatingHireCTA onClick={() => setShowModal(true)} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Subtle dot grid bg */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--text-body) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Ambient radial glow */}
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none -z-10 opacity-20"
          style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)', filter: 'blur(70px)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Senior Content Writer &amp; SEO Specialist
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display tracking-tight leading-[1.05]"
                style={{ color: 'var(--text-body)' }}
              >
                Content That Ranks.<br />
                Words That <span style={{ color: '#f59e0b' }}>Convert.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                5+ years writing high-performing long-form articles, web copy, and SEO content strategies for brands in B2B SaaS, healthcare, media, and wellness.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
                  onClick={() => setShowModal(true)}
                  id="hero-hire-me-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#f59e0b', color: '#0a0a0a', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}
                >
                  Hire Me for Writing
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#samples"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-sm font-bold transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-body)' }}
                >
                  View Writing Samples
                  <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Quick stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              >
                {[
                  { value: '150+', label: 'Articles delivered' },
                  { value: '5+', label: 'Years experience' },
                  { value: '65%+', label: 'Avg organic growth' },
                  { value: '520%', label: 'Content ROI (TechFlow)' },
                ].map((s, i) => (
                  <AnimatedStat key={i} value={s.value} label={s.label} />
                ))}
              </motion.div>
            </div>

            {/* Right Column: Full Hero Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroPhoto
                captionLabel="Senior Content Writer & SEO Specialist"
                maxWidth="max-w-full sm:max-w-[440px] lg:max-w-full"
                animateDelay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLISHED ON & TRUSTED BY (CLEAN LOGO STRIP WITH OFFICIAL BRAND LOGOS) ── */}
      <section className="py-10 px-6 border-y" style={{ borderColor: 'var(--border-card)', backgroundColor: 'transparent' }}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-amber-500" />
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>
              Published On &amp; Trusted By
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8">
            {brands.map((b, i) => (
              <motion.a
                key={i}
                href={b.url}
                target={b.url.startsWith('http') ? '_blank' : '_self'}
                rel={b.url.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group flex items-center gap-3 py-2 px-3 rounded-xl transition-all hover:bg-amber-500/5"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl p-1.5 flex items-center justify-center shrink-0 border"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <img
                    src={b.logo}
                    alt={`${b.name} Logo`}
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm sm:text-base group-hover:text-amber-500 transition-colors" style={{ color: 'var(--text-body)' }}>
                      {b.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                    {b.count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WRITER IDENTITY ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#f59e0b' }}>About</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                  The writer<br />behind the results
                </h2>
              </div>
              {/* Quick facts bar */}
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { label: 'Industries written for', value: '6+' },
                  { label: 'Published articles', value: '150+' },
                  { label: 'Avg. client organic growth', value: '65%+' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3 border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'var(--bg-surface)' }}>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{f.label}</span>
                    <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 text-base leading-relaxed font-medium" style={{ color: 'var(--text-muted)' }}>
              <p>
                I fell in love with writing right after secondary school. The idea that words could
                connect brands with the right people, earn trust, and drive real business outcomes
                — that felt like something worth mastering.
              </p>
              <p>
                Over the past five years, I've written for B2B software companies, healthcare
                providers, entertainment media platforms, and wellness brands. The common thread:
                content that needed to rank <em>and</em> content that needed to convert. The good
                ones do both.
              </p>
              <p>
                I write with an SEO skeleton underneath every piece — keyword intent, topic cluster
                positioning, semantic coverage — but the reader never feels it. They just feel like
                they're reading something worth their time.
              </p>
              <blockquote className="border-l-2 border-amber-500 pl-4 italic text-sm font-semibold py-1" style={{ color: 'var(--text-body)' }}>
                "Not just rankings. Not just wordcount. Content that earns traffic and then does something with it."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE & SAMPLES WITH IMAGES ───────────────────────── */}
      <section id="samples" className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>Selected writing work</h2>
            <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
              Every article below is indexed, published, and complete with live proof.
            </p>
          </div>

          {/* Featured Article Card */}
          <motion.a
            href={featuredSample.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group block rounded-3xl border overflow-hidden transition-all relative"
            style={{
              borderColor: 'rgba(245,158,11,0.35)',
              backgroundColor: 'var(--bg-surface)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            <div className="grid md:grid-cols-12 items-center">
              {/* Image half */}
              <div className="md:col-span-6 relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <img
                  src={featuredSample.image}
                  alt={featuredSample.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-500 text-black shadow-lg">
                  ⭐ Featured Article
                </span>
              </div>

              {/* Content half */}
              <div className="md:col-span-6 p-8 lg:p-10 space-y-5">
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <span className="rounded-full px-2.5 py-0.5 font-bold uppercase border border-amber-500/30 text-amber-500 bg-amber-500/10">
                    {featuredSample.type}
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />{featuredSample.readTime} read
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-amber-500 transition-colors" style={{ color: 'var(--text-body)' }}>
                  {featuredSample.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {featuredSample.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500">{featuredSample.highlight}</span>
                  <div className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all group-hover:scale-105" style={{ backgroundColor: '#f59e0b', color: '#0a0a0a' }}>
                    Read Article <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* 5-Card Grid with Rich Cover Images */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {writingSamples.map((s, i) => <SampleCard key={s.id} sample={s} index={i} />)}
          </div>

          {/* Herbvity archive expander */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <button
              onClick={() => setShowArchive(v => !v)}
              id="herbvity-archive-toggle"
              className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/3"
              style={{ backgroundColor: 'var(--bg-surface)' }}
            >
              <div className="space-y-0.5">
                <p className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>
                  + View all 19 published Herbvity articles
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Companion planting &amp; gardening guides — health &amp; wellness niche
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs rounded-full px-2.5 py-1 font-bold" style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                  19 articles
                </span>
                {showArchive ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-amber-500" />}
              </div>
            </button>

            <AnimatePresence>
              {showArchive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-3 grid sm:grid-cols-2 gap-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    {herbvityArticles.map((a, i) => (
                      <motion.a
                        key={i}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="flex items-start gap-2.5 group py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span className="text-xs leading-snug group-hover:text-amber-500 transition-colors font-medium" style={{ color: 'var(--text-muted)' }}>
                          {a.title}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ))}
                  </div>
                  <div className="px-6 pb-5">
                    <a
                      href="https://herbvity.com/author/Emmanuel-Odebiyi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      View full Herbvity archive <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERTISE PILLARS ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>What I do, precisely</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(245,158,11,0.1)' }}
                className="rounded-2xl border p-7 space-y-5 transition-all cursor-default"
                style={{ borderColor: 'rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.04)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(245,158,11,0.15)' }}>
                  <pillar.icon className="w-6 h-6" style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-body)' }}>{pillar.title}</h3>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-muted)' }}>{pillar.description}</p>
                </div>
                <ul className="space-y-2">
                  {pillar.skills.map((s, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />{s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS WALL ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Results</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Real numbers.<br />No projections.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r, i) => {
              const a = accentMap[r.accent] || accentMap.amber;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl border p-7 space-y-6 transition-all ${a.border}`}
                  style={{ backgroundColor: a.bg }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${a.dot}`} />
                    <div>
                      <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>{r.client}</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{r.industry}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {r.metrics.map((m, j) => (
                      <div key={j}>
                        <p className={`text-3xl sm:text-4xl font-bold font-display tabular-nums ${a.text}`}>{m.value}</p>
                        <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS WITH REAL PHOTO AVATARS ──────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>What clients say</h2>
          </div>

          {/* Featured testimonial */}
          {testimonials.filter(t => t.featured).map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 100%)',
                border: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <div className="absolute top-6 right-8 text-8xl font-black pointer-events-none select-none opacity-10" style={{ color: '#f59e0b' }}>"</div>
              <div className="relative space-y-6">
                <Quote className="w-8 h-8 text-amber-500 opacity-60" />
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-semibold" style={{ color: 'var(--text-body)' }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/50 shadow-md"
                  />
                  <div>
                    <p className="font-bold text-base" style={{ color: 'var(--text-body)' }}>{t.name}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}

          {/* Grid of secondary testimonials with photo avatars */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.filter(t => !t.featured).map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="rounded-2xl border p-7 space-y-5 flex flex-col justify-between"
                style={{ borderColor: 'rgba(245,158,11,0.15)', backgroundColor: 'var(--bg-surface)' }}
              >
                <div className="space-y-3">
                  <Quote className="w-5 h-5 text-amber-500 opacity-40" />
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-body)' }}>"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{t.name}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#f59e0b' }}>Skills & Tools</p>
            <h2 className="text-3xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>The craft and the tools</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Content skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Long-form blog writing', 'Web copywriting', 'Case study writing', 'Email sequences', 'LinkedIn content', 'Content strategy', 'Editorial planning', 'Content briefs', 'Proofreading & editing', 'Topic cluster architecture'].map(s => (
                  <span key={s} className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors hover:border-amber-500/40"
                    style={{ borderColor: 'rgba(255,255,255,0.09)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>SEO & research tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Semrush', 'Ahrefs', 'Surfer SEO', 'Frase', 'Google Search Console', 'Google Analytics 4', 'WordPress', 'Keyword research'].map(s => (
                  <span key={s} className="rounded-full border px-3.5 py-1.5 text-xs font-semibold"
                    style={{ borderColor: 'rgba(245,158,11,0.25)', backgroundColor: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, transparent 50%, rgba(245,158,11,0.06) 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }} aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} aria-hidden="true" />

        <div className="relative max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f59e0b' }}>Ready to work?</p>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Let's build something
              <br />
              <span style={{ color: '#f59e0b' }}>worth reading.</span>
            </h2>
            <p className="text-base max-w-md mx-auto font-medium" style={{ color: 'var(--text-muted)' }}>
              Currently open to senior content writing and SEO writing opportunities.
              Remote. Global. Fast turnaround.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setShowModal(true)}
              id="footer-send-brief-btn"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#f59e0b', color: '#0a0a0a', boxShadow: '0 8px 32px rgba(245,158,11,0.4)' }}
            >
              Send me a brief <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-sm font-bold transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-body)' }}
            >
              View full resume <FileText className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            Main site:{' '}
            <Link to="/" className="text-amber-500 hover:underline transition-colors font-bold">
              emmanuelodebiyi.name.ng
            </Link>
            {' · '}
            <a href="mailto:emmanuel@emmanuelodebiyi.name.ng" className="text-amber-500 hover:underline transition-colors font-bold">
              emmanuel@emmanuelodebiyi.name.ng
            </a>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
