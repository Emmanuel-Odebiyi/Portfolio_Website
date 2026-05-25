import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  Sparkles,
  Globe
} from 'lucide-react';
import { SEO } from '../../components/SEO';

export default function ScooveAfrica() {
  const [rankingAnim, setRankingAnim] = useState(45);
  const [impressionAnim, setImpressionAnim] = useState(0);

  // Animate counters
  useEffect(() => {
    const rankTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setRankingAnim(prev => {
          if (prev <= 8) { clearInterval(interval); return 8; }
          return prev - 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }, 800);

    const impTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setImpressionAnim(prev => {
          if (prev >= 25000) { clearInterval(interval); return 25000; }
          return prev + 625;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(rankTimer);
      clearTimeout(impTimer);
    };
  }, []);

  const seoTactics = [
    {
      step: "01",
      title: "Keyword Alignment",
      desc: "Swapped out general topics for localized search queries matching immediate intent.",
      before: "A generic entertainment review",
      after: "\"Top 15 Restaurants on Lagos Mainland (2026 Review)\"",
      badge: "Commercial Intent"
    },
    {
      step: "02",
      title: "Topic Cluster Architecture",
      desc: "Structured H1, H2, H3 headings and built dense internal links to relative reviews.",
      before: "Isolated pages without context",
      after: "Interconnected hubs signaling deep topic expertise",
      badge: "Topical Authority"
    },
    {
      step: "03",
      title: "Readability Optimization",
      desc: "Re-formatted posts into brief paragraphs, visual grids, bullets, and sharp calls-to-action.",
      before: "Dense blocks of plain text",
      after: "Immersive layout with interactive media",
      badge: "UX Improvement"
    },
    {
      step: "04",
      title: "Technical Auditing",
      desc: "Compressed images, stripped redundant plugins, and implemented structured schema.",
      before: "PageSpeed Index: 38 (Failed Vitals)",
      after: "PageSpeed Index: 74 (Medical/Structured Schemas)",
      badge: "Web Vitals Pass"
    }
  ];

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="The Scoove Africa SEO Case Study | Emmanuel Odebiyi"
        description="Read how I boosted organic traffic by 150% and moved Google search rankings from Position 45 to #8 for The Scoove Africa."
        keywords="entertainment SEO strategy, organic traffic growth, keyword mapping case study, click-through rate optimization, Lagos SEO specialist"
      />

      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        
        {/* Back navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-16 group font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400 tracking-[0.2em] uppercase">
              <Sparkles size={12} className="text-teal-400" />
              Featured Case Study · SEO Strategy
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Attracting the Right Audience, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">Step by Structured Step.</span>
            </h1>

            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              The Scoove Africa was publishing beautiful, creative articles that weren't optimized for discovery. By aligning content with intent, optimizing structure, and fixing speed barriers, I drove a 150% traffic spike in 4 months.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Local SEO</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">On-Page Strategy</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Topic Clusters</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Media & Entertainment</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block text-center lg:text-left">Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Client</p>
                    <p className="text-base font-semibold text-white">The Scoove Africa</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Timeline</p>
                    <p className="text-base font-semibold text-white">4 Months</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Industry</p>
                    <p className="text-base font-semibold text-white">Entertainment Media</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Key Metric</p>
                    <p className="text-base font-semibold text-teal-400">+150% Traffic</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{impressionAnim.toLocaleString()}+</div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Monthly Search Impressions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counters & Live climbing Simulation */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-10 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Live SERP Climber Demo</span>
            <div className="flex items-end gap-6">
              <div className="text-center">
                <div className="text-sm font-mono text-zinc-500 uppercase mb-2">Starting Spot</div>
                <div className="text-6xl font-black text-red-400 line-through opacity-60">#45</div>
              </div>
              <ArrowRight className="text-zinc-600 mb-3" size={32} />
              <div className="text-center">
                <div className="text-sm font-mono text-zinc-500 uppercase mb-2">Optimized Rank</div>
                <motion.div 
                  animate={{ scale: rankingAnim === 8 ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-7xl font-black text-teal-400"
                >
                  #{rankingAnim}
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <TrendingUp size={12} />
              Target article moved to Page 1 in 90 days!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
              <div className="text-3xl font-black text-teal-400 mb-1">+150%</div>
              <div className="text-sm font-semibold text-white">Organic Traffic</div>
              <div className="text-xs text-zinc-500 font-mono">Within 4 Months</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
              <div className="text-3xl font-black text-teal-400 mb-1">-25%</div>
              <div className="text-sm font-semibold text-white">Bounce Rate</div>
              <div className="text-xs text-zinc-500 font-mono">Longer user sessions</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
              <div className="text-3xl font-black text-teal-400 mb-1">+40%</div>
              <div className="text-sm font-semibold text-white">Click-Through Rate</div>
              <div className="text-xs text-zinc-500 font-mono">Optimized metadata</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
              <div className="text-3xl font-black text-teal-400 mb-1">20+</div>
              <div className="text-sm font-semibold text-white">Page 1 Keywords</div>
              <div className="text-xs text-zinc-500 font-mono">Topical authority hubs</div>
            </div>
          </div>
        </div>

        {/* Full-width interactive preview mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-32 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group bg-zinc-950/40 p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 pointer-events-none" />
          <img 
            src="/images/scoove_analytics.png" 
            alt="The Scoove Africa SEO Ranking Climber and SERP Analytics Mockup" 
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest">The Problem</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Sporadic Publishing & Stagnant Reach</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              Despite publishing excellent, creative local content, the website had a hard time ranking. When I conducted an in-depth audit of their site content, three key gaps stood out:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <strong>Lack of search-intent matching:</strong> Content was written purely on feelings, missing targeted terms.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <strong>Inconsistent structure:</strong> Pages lacked structural H2/H3 layouts, missing metadata, and had poor image tagging.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <strong>High bounce rates:</strong> Readers who landed on the site left quickly as there was no clear internal linking structure to hold them.
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-500/10 to-emerald-500/5 border border-teal-500/20 space-y-6">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">The SEO Strategy</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Structured Content Alignment & Technical Audits</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              I designed a 4-layered framework prioritizing topical authority, readability optimization, and technical performance corrections:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                <strong>Geographical targeting:</strong> Aligned topics with high-intent keywords (e.g. \"best restaurants on Lagos Mainland\").
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                <strong>Topic clustering:</strong> Grouped reviews around core pillars with strict parent/child page relationship structures.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                <strong>Core Speed Auditing:</strong> Compressed heavy imagery, configured browser caching, and set structured article schemas.
              </li>
            </ul>
          </div>
        </div>

        {/* Tactic Table */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Before & After</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Tactic Execution & Enhancements</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {seoTactics.map((tactic, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 hover:border-teal-500/30 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-3 flex items-center gap-4">
                  <div className="text-5xl font-black text-zinc-700 font-mono">{tactic.step}</div>
                  <div>
                    <h4 className="font-bold text-white text-lg leading-snug">{tactic.title}</h4>
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 mt-1 inline-block">
                      {tactic.badge}
                    </span>
                  </div>
                </div>

                <p className="lg:col-span-4 text-zinc-400 font-light text-sm leading-relaxed">
                  {tactic.desc}
                </p>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <p className="text-zinc-500 font-mono uppercase text-[9px] mb-1">Before</p>
                    <p className="text-zinc-400 line-through font-light leading-relaxed">{tactic.before}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/20 text-xs">
                    <p className="text-teal-400 font-mono uppercase text-[9px] mb-1">After Optimization</p>
                    <p className="text-white font-semibold leading-relaxed">{tactic.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Takeaway Bento Grid */}
        <div className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Important Lessons</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">Key Takeaways</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                <Globe size={24} />
              </div>
              <h4 className="font-bold text-white text-lg">Value & Discovery Go Together</h4>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Even the most creative, high-quality copy cannot convert or build an audience if it is not discoverable through organic search parameters.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                <TrendingDown size={24} />
              </div>
              <h4 className="font-bold text-white text-lg">Format for High Cognitive Load</h4>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Dropping bounce rates by 25% was achieved by re-formatting text into responsive lists, micro paragraphs, and clean visual cards that invite reading.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-950/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400">
                <Zap size={24} />
              </div>
              <h4 className="font-bold text-white text-lg">Micro Changes Compound</h4>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Small adjustments like structured metadata, context-rich alt text, and logical internal links create massive search performance leaps.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 pt-12 border-t border-white/10"
        >
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">SEO Engineering</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Build Your Search Visibility?
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Book a free 30-minute search strategy audit and let's uncover your site's keyword potential and competitor ranking gaps.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-teal-500/20 active:scale-95 transition-all"
          >
            Claim Your Free Audit Call
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
