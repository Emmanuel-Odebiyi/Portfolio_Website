import React from 'react';
import { motion } from 'motion/react';
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

const projects = [
  {
    title: "TechFlow Solutions",
    subtitle: "520% ROI in 90 Days With Automated Content",
    industry: "SaaS / B2B Technology",
    timeline: "6 months",
    problem: "SaaS startup struggled with manual content distribution, leading to inefficiencies and missed opportunities.",
    solution: "Built automated workflows using Zapier, Airtable, and Make.com to streamline publishing and qualify inbound leads.",
    result: "180+ qualified leads, 60+ hours saved/month, 22% increase in top-funnel conversions.",
    tags: ["Automation", "SaaS", "Lead Gen"],
    metrics: "520% ROI",
    color: "bg-emerald-50",
    accent: "emerald"
  },
  {
    title: "The Scoove Africa",
    subtitle: "65% Organic Traffic Growth (Without Ads)",
    industry: "Entertainment Media",
    timeline: "3 months",
    problem: "Publishing regularly but failing to capture search intent or rank for high-value keywords.",
    solution: "End-to-end keyword research and automated SEO content pipelines.",
    result: "65% organic traffic gain, 40+ articles/month scaled, top-10 rankings for key terms.",
    tags: ["SEO", "Content Strategy", "Media"],
    metrics: "65% Growth",
    color: "bg-indigo-50",
    accent: "indigo"
  },
  {
    title: "OAU Library",
    subtitle: "Eliminated 3-Month Backlog With AI",
    industry: "Education / Research",
    timeline: "3 months",
    problem: "Drowning in repetitive data extraction and manual research tasks.",
    solution: "AI-powered system using OpenAI API and Python for automated data processing.",
    result: "91% content accuracy, 80% time savings, eliminated entire backlog in weeks.",
    tags: ["AI", "Python", "Workflow"],
    metrics: "80% Time Saved",
    color: "bg-amber-50",
    accent: "amber"
  }
];

const smallResults = [
  {
    title: "Lead Magnet Delivery + CRM Sync",
    desc: "Automated multi-step Zapier workflow to fulfill eBooks instantly and sync contacts to HubSpot.",
    stat: "2.5x Downloads",
    icon: <Mail className="text-emerald-500" size={20} />
  },
  {
    title: "AI-Powered Content Repurposing",
    desc: "System built using n8n and OpenAI to turn blogs into ready-to-share social snippets.",
    stat: "80% Time Saved",
    icon: <Zap className="text-indigo-500" size={20} />
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
  return (
    <div className="pt-32 pb-20 bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Selected Work
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
            The Numbers Don't Lie. <br />
            <span className="text-zinc-300">Neither Do My Clients.</span>
          </h1>
          <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
            520% ROI. 65% traffic growth. 70% time savings. These aren't projections—they're results I've delivered for businesses like yours.
          </p>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 rounded-[4rem] ${project.color} border border-zinc-100 overflow-hidden`}
            >
              <div className={`space-y-10 relative z-10 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/80 border border-zinc-100 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                    {project.subtitle}
                  </h3>
                  <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                    {project.title} • {project.industry}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">The Challenge</p>
                    <p className="text-zinc-600 font-light leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">The Solution</p>
                    <p className="text-zinc-600 font-light leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200/50 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Key Result</p>
                    <p className="text-2xl font-bold text-zinc-900">{project.result}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-${project.accent}-500 group-hover:scale-110 transition-transform`}>
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>

              <div className={`relative flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[3rem]" />
                <div className="relative text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-48 h-48 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border border-zinc-100"
                  >
                    <span className="text-4xl font-bold text-zinc-900">{project.metrics.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      {project.metrics.split(' ').slice(1).join(' ')}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Results - Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Micro Case Studies</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">More Client Results</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallResults.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 space-y-6 group hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 border-t border-zinc-200/50">
                <p className="text-xl font-bold text-emerald-600">{item.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resume CTA Section - High Priority */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Want to see the <br />
                <span className="text-emerald-500">full picture?</span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl">
                My portfolio shows the results, but my resume tells the story of how I built the expertise to deliver them. Explore my full professional background, certifications, and career trajectory.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link 
                  to="/resume"
                  className="group px-10 py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-3"
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
                  <div className="h-12 w-full bg-emerald-500/20 rounded-xl border border-emerald-500/30" />
                  <div className="h-12 w-full bg-white/5 rounded-xl border border-white/10" />
                </div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Final P.S. Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xl text-zinc-500 font-light italic leading-relaxed">
          "Notice something about these case studies? They all have one thing in common: the client took action. They didn't wait for the 'perfect time.' They didn't overthink it. They decided growth was worth investing in, and we made it happen together. Your turn."
        </p>
      </section>
    </div>
  );
}
