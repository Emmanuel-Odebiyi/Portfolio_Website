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
    accent: "blue"
  },
  {
    title: "The Scoove Africa",
    subtitle: "65% Traffic Growth in 3 Months",
    industry: "Entertainment Media",
    timeline: "3 Months",
    problem: "Publishing was sporadic. Rankings were stuck at Position 24. Click-through rates were poor. With no systematic approach to keyword targeting or SEO, they had no way to diagnose the problem—let alone fix it.",
    solution: "Executed comprehensive gap analysis, full content optimization of existing articles, set up a systematic publishing schedule with SEO-first targeting, and built a structured topic cluster architecture.",
    result: "Average ranking climbed from Position 24 to Position 9. 25,000+ monthly impressions. Click-through rate improved by 40%.",
    tags: ["SEO", "Content Strategy", "Media"],
    metrics: "65% Growth",
    color: "bg-white/5 backdrop-blur-sm",
    accent: "blue"
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
    color: "bg-white/5 backdrop-blur-sm",
    accent: "amber"
  }
];

const smallResults = [
  {
    title: "Lead Magnet Delivery + CRM Sync",
    desc: "Automated multi-step Zapier workflow to fulfill eBooks instantly and sync contacts to HubSpot.",
    stat: "2.5x Downloads",
    icon: <Mail className="text-brand-gradient" size={20} />
  },
  {
    title: "AI-Powered Content Repurposing",
    desc: "System built using n8n and OpenAI to turn blogs into ready-to-share social snippets.",
    stat: "80% Time Saved",
    icon: <Zap className="text-brand-gradient" size={20} />
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
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEO 
        title="Proven Results | 520% ROI, 65% Traffic Growth, 70% Time Savings"
        description="Real case studies from real clients. TechFlow Solutions: 520% ROI in 90 days. The Scoove Africa: 65% traffic growth in 3 months. See exactly how it was done."
        keywords="marketing automation case studies, content automation results, SEO case studies, automation ROI"
      />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
            Selected Work
          </motion.div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            If You Want Proof, <br />
            <span className="text-gray-500">Here It Is.</span>
          </h1>
          <div className="space-y-4 max-w-2xl">
            <p className="text-2xl text-gray-200 font-medium leading-relaxed">
              520% ROI. 65% traffic growth. 70% time savings.
            </p>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Not estimates. Not projections. Results I delivered — for real businesses, with documented outcomes. Every case study below shows the exact situation, the system I built, and what happened. No cherry-picking. No spin.
            </p>
          </div>
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
              className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 rounded-[4rem] ${project.color} border border-white/10 overflow-hidden shadow-2xl`}
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
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">The Challenge</p>
                    <p className="text-gray-300 font-light leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">The Solution</p>
                    <p className="text-gray-300 font-light leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Key Result</p>
                    <p className="text-2xl font-bold text-white">{project.result}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 border border-white/20 shadow-xl flex items-center justify-center text-${project.accent}-400 group-hover:scale-110 group-hover:bg-white/20 transition-all`}>
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>

              <div className={`relative flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]" />
                <div className="relative text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-48 h-48 rounded-full bg-[#0B0F19]/80 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center border border-white/10"
                  >
                    <span className="text-4xl font-bold text-white">{project.metrics.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
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
      <section className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xl text-gray-400 font-light italic leading-relaxed">
          "Notice something about these case studies? They all have one thing in common: the client took action. They didn't wait for the 'perfect time.' They didn't overthink it. They decided growth was worth investing in, and we made it happen together. Your turn."
        </p>
      </section>
    </div>
  );
}
