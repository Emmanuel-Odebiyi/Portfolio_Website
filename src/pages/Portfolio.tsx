import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  Download, 
  FileText, 
  BarChart3, 
  Zap, 
  Search, 
  Cpu, 
  Workflow,
  CheckCircle2,
  Globe,
  Mail,
  Linkedin,
  Twitter
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
    color: "bg-white/5 backdrop-blur-sm",
    accent: "blue",
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
    color: "bg-white/5 backdrop-blur-sm",
    accent: "teal",
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
    color: "bg-white/5 backdrop-blur-sm",
    accent: "rose",
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
    color: "bg-white/5 backdrop-blur-sm",
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
    icon: <Mail className="text-blue-400" size={20} />
  },
  {
    title: "AI-Powered Content Repurposing",
    desc: "System built using n8n and OpenAI to turn blogs into ready-to-share social snippets.",
    stat: "80% Time Saved",
    icon: <Zap className="text-yellow-400" size={20} />
  },
  {
    title: "Analytics Dashboard Automation",
    desc: "Real-time dashboards with automated data pulls from GA4, Airtable, and HubSpot.",
    stat: "15+ Hrs Saved/Mo",
    icon: <BarChart3 className="text-amber-500" size={20} />
  },
  {
    title: "Personal Branding Automation",
    desc: "Automated scheduling and cross-posting workflows for a solo consultant.",
    stat: "3x Consistency",
    icon: <Globe className="text-rose-500" size={20} />
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
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEO 
        title="Proven Results | 520% ROI, 65% Traffic Growth, 70% Time Savings"
        description="Real case studies from real clients. TechFlow Solutions: 520% ROI in 90 days. The Scoove Africa: 65% traffic growth in 3 months. See exactly how it was done."
        keywords="marketing automation case studies, content automation results, SEO case studies, automation ROI"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-12 mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Narrative (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Selected Work
            </motion.div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] font-display">
              If You Want Proof, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400">Here It Is.</span>
            </h1>
            <div className="space-y-4 max-w-2xl">
              <p className="text-2xl text-gray-200 font-medium leading-relaxed">
                520% ROI. 65% traffic growth. 70% time savings.
              </p>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Not estimates. Not projections. Results I delivered — for real businesses, with documented outcomes. Every case study below shows the exact situation, the system I built, and what happened. No cherry-picking. No spin.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Stats Console (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-8"
          >
            {/* Background glowing effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Global Ledger</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Verified Outcomes</span>
            </div>

            <div className="space-y-6">
              {/* Stat 1 */}
              <div className="space-y-1 group/stat">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-black text-white tracking-tight group-hover/stat:text-blue-400 transition-colors">$2.4M+</span>
                  <span className="text-[10px] font-mono text-blue-400 uppercase">Automation Yield</span>
                </div>
                <p className="text-xs text-zinc-400 font-light">Direct & attributed client revenue growth captured in 2025.</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1 border-t border-white/5 pt-6 group/stat">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-black text-white tracking-tight group-hover/stat:text-teal-400 transition-colors">70%+</span>
                  <span className="text-[10px] font-mono text-teal-400 uppercase">Time Recaptured</span>
                </div>
                <p className="text-xs text-zinc-400 font-light">Average operational manual process hours completely saved.</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1 border-t border-white/5 pt-6 group/stat">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-black text-white tracking-tight group-hover/stat:text-rose-400 transition-colors">150%</span>
                  <span className="text-[10px] font-mono text-rose-400 uppercase">Traffic Growth</span>
                </div>
                <p className="text-xs text-zinc-400 font-light">Average SEO crawl CTR increase across published platforms.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        {/* Category Filter Tabs with animated layoutId pill */}
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="relative px-5 py-2 rounded-full text-sm font-mono font-bold transition-colors duration-200 outline-none"
              style={{ color: activeFilter === cat ? '#0B0F19' : 'rgba(161,161,170,1)' }}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-white"
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
                    className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 rounded-[4rem] ${project.color} border border-white/10 hover:border-white/20 overflow-hidden shadow-2xl transition-all`}
                  >
                    <div className={`space-y-10 relative z-10 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white leading-snug">
                          {project.subtitle}
                        </h3>
                        <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                          {project.title} • {project.industry}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest text-zinc-500">The Challenge</p>
                          <p className="text-gray-300 font-light leading-relaxed">{project.problem}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest text-zinc-500">The Solution</p>
                          <p className="text-gray-300 font-light leading-relaxed">{project.solution}</p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <div className={`p-6 rounded-2xl border-l-2 ${
                          project.accent === 'blue' ? 'border-blue-500 bg-blue-500/5' :
                          project.accent === 'teal' ? 'border-teal-500 bg-teal-500/5' :
                          project.accent === 'rose' ? 'border-rose-500 bg-rose-500/5' : 'border-amber-500 bg-amber-500/5'
                        } space-y-2`}>
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Key Outcome & ROI</p>
                          <p className="text-base font-semibold text-white leading-relaxed">{project.result}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col justify-between space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[16/10] bg-zinc-950 flex items-center justify-center">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                        
                        <div className="absolute bottom-6 right-6 px-6 py-3 rounded-2xl bg-[#0B0F19]/90 border border-white/10 backdrop-blur-md shadow-xl flex flex-col items-end">
                          <span className="text-2xl font-black text-white">{project.metrics}</span>
                          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Proven Outcome</span>
                        </div>
                      </div>

                      <div className="flex items-center lg:justify-end justify-start">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white shadow-xl group-hover:bg-white/10 group-hover:border-white/25 transition-all duration-300">
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

      {/* More Results - Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em]">Micro Case Studies</h2>
          <h3 className="text-4xl font-bold text-white tracking-tight">More Client Results</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallResults.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xl font-bold text-brand-gradient">{item.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resume CTA Section - High Priority */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Want to see the <br />
                <span className="text-brand-gradient">full picture?</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                My portfolio shows the results, but my resume tells the story of how I built the expertise to deliver them. Explore my full professional background, certifications, and career trajectory.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link 
                  to="/resume"
                  className="group px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 border border-white/20 transition-all shadow-2xl flex items-center gap-3"
                >
                  <FileText size={20} /> 
                  <span>Explore Full Background & Resume</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-[3/4] w-80 mx-auto bg-white/5 rounded-3xl border border-white/10 p-8 space-y-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="h-4 w-2/3 bg-white/20 rounded-full" />
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                  <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                </div>
                <div className="pt-8 space-y-4">
                  <div className="h-12 w-full bg-brand-gradient/20 rounded-xl border border-indigo-500/30" />
                  <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10" />
                </div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gradient/20 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Final P.S. Section */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">
        <p className="text-xl text-gray-400 font-light italic leading-relaxed">
          "Notice something about these case studies? They all have one thing in common: the client took action. They didn't wait for the 'perfect time.' They didn't overthink it. They decided growth was worth investing in, and we made it happen together. Your turn."
        </p>
      </section>
    </div>
  );
}
