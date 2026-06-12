import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  BarChart3, 
  Zap, 
  Globe,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const projects = [
  {
    title: "TechFlow Solutions",
    subtitle: "520% ROI in 90 Days",
    industry: "SaaS / B2B Technology",
    timeline: "90 Days",
    problem: "TechFlow Solutions knew content marketing was a growth lever they weren't pulling. But their team was exhausted — publishing 8 articles per month through a manual, chaotic process, seeing little to no traction.",
    solution: "Designed and deployed a full content automation engine: Automated production pipeline targeting high-intent keywords, SEO architecture, and multi-platform distribution (blog, LinkedIn, email).",
    result: "Content output grew from 8 to 40+ articles monthly. Organic traffic increased by 80%. $127,000 in revenue directly attributed to content. Team workload reduced to near zero.",
    tags: ["Automation", "SaaS", "Lead Gen"],
    metrics: "520% ROI",
    accent: "amber",
    path: "/portfolio/techflow-solutions",
    image: "/images/techflow_dashboard.png"
  },
  {
    title: "The Scoove Africa",
    subtitle: "150% Traffic Growth in 4 Months",
    industry: "Entertainment Media",
    timeline: "4 Months",
    problem: "Publishing was sporadic. Rankings were stuck at Position 45. Click-through rates were poor. With no systematic approach to keyword targeting or SEO, they had no way to diagnose the problem—let alone fix it.",
    solution: "Executed comprehensive gap analysis, full content optimization of existing articles, set up a systematic publishing schedule with SEO-first targeting, and built a structured topic cluster architecture.",
    result: "Organic traffic increased by 150%. 20+ new keywords on Google's Page 1. Bounce rate decreased by 25%. CTR boosted by 40%.",
    tags: ["SEO", "Content Strategy", "Media"],
    metrics: "150% Growth",
    accent: "blue",
    path: "/portfolio/scoove-africa",
    image: "/images/scoove_analytics.png"
  },
  {
    title: "Emergency Response Africa",
    subtitle: "180% Organic Lead Boost in 60 Days",
    industry: "Healthcare / MedTech",
    timeline: "60 Days",
    problem: "Offering advanced private emergency medical dispatch, but invisible online for high-intent search queries like 'emergency ambulance Lagos' and constrained by slow mobile page loading speeds.",
    solution: "Built geo-targeted local keyword architecture, optimized GMB listings, deployed local patient testimonial acquisition, and integrated medical services structured Schema markup.",
    result: "Organic traffic grew by 180%. Page 1 rankings achieved for 10+ high-intent healthcare terms. Direct emergency call volume increased by 30%.",
    tags: ["Local SEO", "MedTech", "Conversion"],
    metrics: "180% Growth",
    accent: "blue",
    path: "/portfolio/emergency-response-africa",
    image: "/images/era_dispatch_dashboard.png"
  },
  {
    title: "OAU Library",
    subtitle: "Eliminated 3-Month Backlog With AI",
    industry: "Education / Research",
    timeline: "3 weeks",
    problem: "Drowning in repetitive data extraction and manual indexing tasks.",
    solution: "AI-powered cataloging system using OpenAI API and Python for automated data parsing and relational metadata indexing.",
    result: "91% content cataloging accuracy, 80% time savings, and eliminated the entire 3-month backlog in weeks.",
    tags: ["AI", "Python", "Workflow"],
    metrics: "80% Time Saved",
    accent: "amber",
    path: "/portfolio/oau-library",
    image: "/images/oau_library_automation.png"
  }
];

const CATEGORY_FILTERS = ['All', 'SEO', 'Automation', 'AI'] as const;
type Category = typeof CATEGORY_FILTERS[number];

const PROJECT_CATEGORIES: Record<string, Category[]> = {
  'TechFlow Solutions': ['Automation'],
  'The Scoove Africa': ['SEO'],
  'Emergency Response Africa': ['SEO'],
  'OAU Library': ['AI'],
};

const smallResults = [
  {
    title: "Lead Magnet Delivery + CRM Sync",
    desc: "Automated multi-step Zapier workflow to fulfill eBooks instantly and sync contacts to HubSpot.",
    stat: "2.5x Downloads",
    icon: <Mail style={{ color: 'var(--accent-amber)' }} size={20} />
  },
  {
    title: "AI-Powered Content Repurposing",
    desc: "System built using n8n and OpenAI to turn blogs into ready-to-share social snippets.",
    stat: "80% Time Saved",
    icon: <Zap style={{ color: 'var(--accent-amber)' }} size={20} />
  },
  {
    title: "Analytics Dashboard Automation",
    desc: "Real-time dashboards with automated data pulls from GA4, Airtable, and HubSpot.",
    stat: "15+ Hrs Saved/Mo",
    icon: <BarChart3 style={{ color: 'var(--accent-amber)' }} size={20} />
  },
  {
    title: "Personal Branding Automation",
    desc: "Automated scheduling and cross-posting workflows for a solo consultant.",
    stat: "3x Consistency",
    icon: <Globe style={{ color: 'var(--accent-amber)' }} size={20} />
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
        title="Proven Results & Case Studies | Emmanuel Odebiyi"
        description="Real case studies from real clients. TechFlow Solutions: 520% ROI in 90 days. The Scoove Africa: 65% traffic growth in 3 months. See exactly how it was done."
        keywords="marketing automation case studies, content automation results, SEO case studies, automation ROI"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-8 md:pb-12 mb-12 md:mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left Column: Narrative (Span 7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold tracking-widest uppercase text-center"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              Selected Work
            </motion.div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display text-center" style={{ color: 'var(--text-body)' }}>
              If you want proof, <br />
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>here it is.</span>
            </h1>
            <div className="space-y-4 max-w-2xl flex flex-col items-center">
              <p className="text-2xl font-medium leading-relaxed text-center" style={{ color: 'var(--text-body)' }}>
                520% ROI. 65% traffic growth. 70% time savings.
              </p>
              <p className="text-xl font-light leading-relaxed text-center" style={{ color: 'var(--text-muted)' }}>
                Not estimates. Not projections. Results I delivered — for real businesses, with documented outcomes. Every case study below shows the exact situation, the system I built, and what happened. No cherry-picking. No spin.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Stats Console (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 p-8 rounded-[2rem] border shadow-2xl space-y-8"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-card)' }}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-amber)' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent-amber)' }}></span>
                </span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Global Ledger</span>
              </div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Verified Outcomes</span>
            </div>

            <div className="space-y-6">
              {/* Stat 1 */}
              <div className="space-y-1 group/stat">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold font-display tracking-tight transition-colors group-hover/stat:text-[var(--accent-amber)]" style={{ color: 'var(--text-body)' }}>$2.4M+</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Automation Yield</span>
                </div>
                <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Direct & attributed client revenue growth captured in 2025.</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1 pt-6 border-t group/stat" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold font-display tracking-tight transition-colors group-hover/stat:text-[var(--accent-amber)]" style={{ color: 'var(--text-body)' }}>70%+</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Time Recaptured</span>
                </div>
                <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Average operational manual process hours completely saved.</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1 pt-6 border-t group/stat" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold font-display tracking-tight transition-colors group-hover/stat:text-[var(--accent-amber)]" style={{ color: 'var(--text-body)' }}>150%</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Traffic Growth</span>
                </div>
                <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Average SEO crawl CTR increase across published platforms.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-32">
        {/* Category Filter Tabs with animated layoutId pill */}
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="relative px-5 py-2 rounded-full text-sm font-sans font-bold transition-colors duration-200 outline-none"
              style={{ color: activeFilter === cat ? 'var(--bg-page)' : 'var(--text-muted)' }}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--text-body)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-12">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to={project.path} className="block group">
                  <div
                    className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 rounded-[2rem] border overflow-hidden shadow-2xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <div className={`space-y-10 relative z-10 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 rounded-full border text-[10px] font-sans font-bold uppercase tracking-widest"
                              style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold font-display leading-snug" style={{ color: 'var(--text-body)' }}>
                          {project.subtitle}
                        </h3>
                        <p className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                          {project.title} • {project.industry}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <p className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>The Challenge</p>
                          <p className="font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{project.problem}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>The Solution</p>
                          <p className="font-light leading-relaxed" style={{ color: 'var(--text-body)' }}>{project.solution}</p>
                        </div>
                      </div>

                      <div className="pt-8 border-t" style={{ borderColor: 'var(--border-card)' }}>
                        <div 
                          className="p-6 rounded-2xl border-l-2 space-y-2"
                          style={{
                            borderLeftColor: project.accent === 'blue' ? 'var(--cta-blue)' : 'var(--accent-amber)',
                            backgroundColor: 'var(--bg-page)',
                            borderColor: 'var(--border-card)'
                          }}
                        >
                          <p className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Key Outcome & ROI</p>
                          <p className="text-base font-semibold leading-relaxed" style={{ color: 'var(--text-body)' }}>{project.result}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col justify-between space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative rounded-[2rem] overflow-hidden border aspect-[16/10] flex items-center justify-center" style={{ borderColor: 'var(--border-card)' }}>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          width={600}
                          height={375}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)', opacity: 0.4 }} />
                        
                        <div 
                          className="absolute bottom-6 right-6 px-6 py-3 rounded-2xl border shadow-xl flex flex-col items-end"
                          style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                        >
                          <span className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{project.metrics}</span>
                          <span className="text-[9px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Proven Outcome</span>
                        </div>
                      </div>

                      <div className="flex items-center lg:justify-end justify-start">
                        <div 
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border text-sm font-bold shadow-xl transition-all duration-300 hover:brightness-110"
                          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                        >
                          <span>Read Case Study</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* More Results - Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-32">
        <div className="text-center space-y-4 mb-20">
          <span className="font-sans font-bold text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Micro Case Studies</span>
          <h2 className="text-4xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>More client results.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallResults.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] border space-y-6 group transition-all"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div 
                className="w-10 h-10 rounded-xl border shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold leading-snug" style={{ color: 'var(--text-body)' }}>{item.title}</h3>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                <p className="text-xl font-bold" style={{ color: 'var(--accent-amber)' }}>{item.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resume CTA Section - High Priority */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-32">
        <div 
          className="border rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left"
          style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight leading-tight" style={{ color: 'var(--text-body)' }}>
                Want to see the <br />
                <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>full picture?</span>
              </h2>
              <p className="text-xl font-light leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
                My portfolio shows the results, but my resume tells the story of how I built the expertise to deliver them. Explore my full professional background, certifications, and career trajectory.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link 
                  to="/resume"
                  className="group px-10 py-5 font-bold rounded-2xl transition-all shadow-2xl flex items-center gap-3 border"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  <FileText size={20} /> 
                  <span>Explore Full Background & Resume</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div 
                className="aspect-[3/4] w-80 mx-auto rounded-3xl border p-8 space-y-6 rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="h-4 w-2/3 rounded-full" style={{ backgroundColor: 'var(--border-card)' }} />
                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full" style={{ backgroundColor: 'var(--bg-page)' }} />
                  <div className="h-2 w-full rounded-full" style={{ backgroundColor: 'var(--bg-page)' }} />
                  <div className="h-2 w-5/6 rounded-full" style={{ backgroundColor: 'var(--bg-page)' }} />
                </div>
                <div className="pt-8 space-y-4">
                  <div className="h-12 w-full rounded-xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--accent-amber)' }} />
                  <div className="h-12 w-full rounded-xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final P.S. Section */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">
        <p className="text-xl font-light italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          "Notice something about these case studies? They all have one thing in common: the client took action. They didn't wait for the 'perfect time.' They didn't overthink it. They decided growth was worth investing in, and we made it happen together. Your turn."
        </p>
      </section>
    </div>
  );
}
