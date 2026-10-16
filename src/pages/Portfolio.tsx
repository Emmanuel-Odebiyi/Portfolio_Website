import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  BarChart3, 
  Zap, 
  Globe,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { OptimizedImage } from '../components/common/OptimizedImage';

interface Project {
  number: string;
  title: string;
  subtitle: string;
  industry: string;
  timeline: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  metrics: string;
  metricsLabel: string;
  accent: 'amber' | 'blue' | 'teal';
  path: string;
  image: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'TechFlow Solutions',
    subtitle: '520% ROI in 90 Days',
    industry: 'SaaS / B2B Technology',
    timeline: '90 Days',
    problem: 'Manual, chaotic publishing yielding 8 articles/month with negligible traction, exhausted founders, and stalled customer acquisition.',
    solution: 'Designed and deployed an end-to-end content automation engine: high-intent keyword targeting, automated pipeline, multi-channel distribution.',
    result: 'Output scaled from 8 to 40+ monthly articles. Organic traffic grew 80%. $127,000 in direct revenue. Founder workload reduced to near zero.',
    tags: ['Marketing Automation', 'B2B SaaS', 'Lead Generation'],
    metrics: '520%',
    metricsLabel: 'ROI in 90 Days',
    accent: 'amber',
    path: '/portfolio/techflow-solutions',
    image: '/images/headers/techflow_header.webp'
  },
  {
    number: '02',
    title: 'The Scoove Africa',
    subtitle: '150% Traffic Growth in 4 Months',
    industry: 'Entertainment Media',
    timeline: '4 Months',
    problem: 'Sporadic publishing, keywords languishing at Position 45, and zero systematic SEO or cluster architecture.',
    solution: 'Executed comprehensive keyword gap analysis, full content optimization, strict publishing cadences, and topical cluster architecture.',
    result: 'Organic traffic increased by 150%. 20+ competitive keywords on Google Page 1. Bounce rate down 25%. CTR boosted 40%.',
    tags: ['Technical SEO', 'Content Architecture', 'Media'],
    metrics: '150%',
    metricsLabel: 'Search Traffic Surge',
    accent: 'blue',
    path: '/portfolio/scoove-africa',
    image: '/images/headers/scoove_header.webp'
  },
  {
    number: '03',
    title: 'Emergency Response Africa',
    subtitle: '180% Organic Lead Boost in 60 Days',
    industry: 'Healthcare / MedTech',
    timeline: '60 Days',
    problem: 'Advanced private emergency medical dispatch service, yet virtually invisible online for critical local emergency search queries in Lagos.',
    solution: 'Engineered geo-targeted local keyword architecture, optimized Google Business profiles, and implemented medical schema markup.',
    result: 'Organic leads jumped 180%. Page 1 rankings secured for 10+ high-intent emergency medical terms. Direct emergency dispatch calls up 30%.',
    tags: ['Local SEO', 'MedTech', 'Conversion Ops'],
    metrics: '180%',
    metricsLabel: 'Inbound Lead Increase',
    accent: 'teal',
    path: '/portfolio/emergency-response-africa',
    image: '/images/headers/emergency_response_header.webp'
  }
];

const CATEGORY_FILTERS = ['All', 'Automation', 'SEO'] as const;
type Category = typeof CATEGORY_FILTERS[number];

const PROJECT_CATEGORIES: Record<string, Category[]> = {
  'TechFlow Solutions': ['Automation'],
  'The Scoove Africa': ['SEO'],
  'Emergency Response Africa': ['SEO'],
};

const smallResults = [
  {
    title: 'Lead Magnet Delivery + CRM Sync',
    desc: 'Automated multi-step Zapier workflow to fulfill eBooks instantly and sync contacts directly into HubSpot pipelines.',
    stat: '2.5x Downloads',
    icon: <Mail className="text-[var(--accent-amber)]" size={18} />
  },
  {
    title: 'AI Content Repurposing Pipeline',
    desc: 'System built using n8n and OpenAI to transform long-form blogs into ready-to-publish social snippets and newsletters.',
    stat: '80% Time Saved',
    icon: <Zap className="text-[var(--accent-amber)]" size={18} />
  },
  {
    title: 'Analytics & Attribution Dashboard',
    desc: 'Real-time telemetry pulling automated search and pipeline data from GA4, Airtable, and CRM endpoints.',
    stat: '15+ Hrs Saved/Mo',
    icon: <BarChart3 className="text-[var(--accent-amber)]" size={18} />
  },
  {
    title: 'Personal Branding Automation',
    desc: 'Automated scheduling and multi-platform cross-posting workflows for B2B executives and consultants.',
    stat: '3x Consistency',
    icon: <Globe className="text-[var(--accent-amber)]" size={18} />
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filteredProjects = useMemo(() =>
    activeFilter === 'All'
      ? projects
      : projects.filter(p => PROJECT_CATEGORIES[p.title]?.includes(activeFilter)),
  [activeFilter]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Audited Results & Case Studies | Emmanuel Odebiyi"
        description="Real case studies from real clients. TechFlow Solutions: 520% ROI in 90 days. The Scoove Africa: 65% traffic growth in 3 months. See exactly how it was done."
        keywords="marketing automation case studies, content automation results, SEO case studies, automation ROI"
      />

      {/* Hero Section — Works.studio / Linear Editorial Precision */}
      <section className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12 relative z-10 border-b" style={{ borderColor: 'var(--border-card)' }}>
        <div className="space-y-6 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-sans font-bold tracking-widest uppercase"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
            AUDITED CLIENT CASE STUDIES
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.98] font-display" style={{ color: 'var(--text-body)' }}>
            Documented Proof. <br />
            <span className="italic font-serif font-normal" style={{ color: 'var(--accent-amber)' }}>
              Zero Estimates.
            </span>
          </h1>

          <p className="text-lg md:text-xl font-normal leading-relaxed text-[var(--text-muted)] max-w-2xl font-sans">
            Every system below was designed, deployed, and measured in production. Real numbers, real revenue attribution, verified by client dashboards.
          </p>

          {/* Quick Link to Writing Samples */}
          <div className="pt-1">
            <Link
              to="/writing-portfolio"
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 hover:border-[var(--accent-amber)]"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-body)'
              }}
            >
              <FileText className="w-4 h-4 shrink-0 text-[var(--accent-amber)]" />
              <span className="text-[var(--text-muted)]">Looking for editorial articles &amp; B2B thought leadership?</span>
              <span className="font-bold underline underline-offset-4 text-[var(--accent-amber)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                View Writing Portfolio <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full pt-10">
          <div 
            className="border rounded-2xl p-5 text-center shadow-sm space-y-1"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-2xl sm:text-3xl font-bold font-display block" style={{ color: 'var(--text-body)' }}>$2.4M+</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">Cumulative Revenue Linked</span>
          </div>
          <div 
            className="border rounded-2xl p-5 text-center shadow-sm space-y-1"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--accent-amber)] block">70%+</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">Founder Hours Recaptured</span>
          </div>
          <div 
            className="border rounded-2xl p-5 text-center shadow-sm space-y-1"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--accent-teal)] block">95%+</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">Client Retention Rate</span>
          </div>
        </div>
      </section>

      {/* Filter Row — Works.studio Minimalist Tab Styling */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-6" style={{ borderColor: 'var(--border-card)' }}>
          <div className="flex items-center gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border"
                style={{
                  backgroundColor: activeFilter === cat ? 'var(--text-body)' : 'var(--bg-surface)',
                  color: activeFilter === cat ? 'var(--bg-page)' : 'var(--text-muted)',
                  borderColor: activeFilter === cat ? 'var(--text-body)' : 'var(--border-card)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            SHOWING {filteredProjects.length} OF {projects.length} CASE STUDIES
          </span>
        </div>
      </section>

      {/* Asymmetric Case Study Index (Works.studio Inspired Layout) */}
      <section className="max-w-7xl mx-auto px-6 py-8 space-y-12 mb-20">
        <AnimatePresence mode="popLayout">
          {/* 1. Feature Wide Moment (TechFlow Solutions) */}
          {filteredProjects.find(p => p.number === '01') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <Link to="/portfolio/techflow-solutions" className="block p-8 sm:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column (7 cols): Data & Story */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--accent-amber)]">01 • FEATURED CASE STUDY</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">• SaaS / B2B Technology</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-6xl sm:text-7xl lg:text-8xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
                        520% <span className="text-3xl sm:text-4xl font-serif italic font-normal text-[var(--accent-amber)]">ROI</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                        TechFlow Solutions: 90-Day Content Automation Engine
                      </h2>
                    </div>

                    <p className="text-base text-[var(--text-muted)] font-normal leading-relaxed max-w-xl">
                      Automated high-intent editorial production, scaling output from 8 to 40+ monthly articles while attributing $127,000 in direct revenue to content.
                    </p>

                    <div className="pt-2 flex items-center gap-2 font-bold text-sm text-[var(--cta-blue)] group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Explore Technical Architecture &amp; GA4 Proof</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Right Column (5 cols): Cinematic Snapshot */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-xl overflow-hidden border aspect-[16/10]" style={{ borderColor: 'var(--border-card)' }}>
                      <OptimizedImage
                        src="/images/headers/techflow_header.webp"
                        alt="TechFlow Solutions Case Study"
                        width={600}
                        height={375}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs font-mono">
                        <span>TIMELINE: 90 DAYS</span>
                        <span className="text-amber-400 font-bold">$127K REVENUE</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          )}

          {/* 2. Asymmetric Dual Columns (The Scoove Africa & Emergency Response Africa) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.filter(p => p.number !== '01').map((project) => (
              <motion.div
                key={project.number}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <Link to={project.path} className="p-8 flex flex-col justify-between h-full space-y-6">
                  
                  {/* Visual Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--accent-amber)]">{project.number} • AUDIT BREAKDOWN</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[var(--text-muted)]">{project.industry}</span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border aspect-[16/9]" style={{ borderColor: 'var(--border-card)' }}>
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold font-mono text-white bg-black/70 backdrop-blur-sm border border-white/10">
                        {project.metrics}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono font-bold uppercase text-[var(--text-muted)]">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] font-normal leading-relaxed">
                      {project.result}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="pt-4 border-t flex items-center justify-between text-xs font-bold" style={{ borderColor: 'var(--border-card)' }}>
                    <span className="text-[var(--text-muted)]">TIMELINE: {project.timeline}</span>
                    <span className="flex items-center gap-1.5 text-[var(--cta-blue)] group-hover:translate-x-1 transition-transform">
                      Read Breakdown <ArrowRight size={14} />
                    </span>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* Micro Results Ledger — Raycast Clean Data Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24 border-t pt-16" style={{ borderColor: 'var(--border-card)' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">ACTIVE WORKFLOW ARCHITECTURES</span>
            <h2 className="text-3xl font-bold font-display tracking-tight mt-1" style={{ color: 'var(--text-body)' }}>
              Micro Systems &amp; Workflow Automations
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            Smaller targeted workflow implementations that eliminate manual operations in under 14 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallResults.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-6 space-y-4 shadow-sm hover:border-[var(--text-muted)] transition-colors"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                  {item.icon}
                </div>
                <span className="font-mono text-xs font-bold text-[var(--accent-amber)]">{item.stat}</span>
              </div>
              <h4 className="font-bold text-sm font-display" style={{ color: 'var(--text-body)' }}>{item.title}</h4>
              <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
