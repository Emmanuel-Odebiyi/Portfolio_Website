import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
      after: "Interconnected hubs signaling topic expertise",
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
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="The Scoove Africa SEO Case Study | Emmanuel Odebiyi"
        description="Read how I boosted organic traffic by 150% and moved Google search rankings from Position 45 to #8 for The Scoove Africa."
        keywords="entertainment SEO strategy, organic traffic growth, keyword mapping case study, click-through rate optimization, Lagos SEO specialist"
      />

      <div className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        
        {/* Back navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 transition-colors mb-16 group font-sans font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
            >
              <Sparkles size={12} />
              Featured Case Study · SEO Strategy
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display" style={{ color: 'var(--text-body)' }}>
              Attracting the Right Audience, <br />
              <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>Step by Structured Step.</span>
            </h1>

            <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              The Scoove Africa was publishing beautiful, creative articles that weren't optimized for discovery. By aligning content with intent, optimizing structure, and fixing speed barriers, I drove a 150% traffic spike in 4 months.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Local SEO", "On-Page Strategy", "Topic Clusters", "Media & Entertainment"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 rounded-full border text-xs font-sans font-bold uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div 
              className="p-8 rounded-[2.5rem] border backdrop-blur-md shadow-2xl relative overflow-hidden text-left"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="space-y-6">
                <span className="text-xs font-sans font-bold uppercase tracking-widest block text-center lg:text-left" style={{ color: 'var(--text-muted)' }}>Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Client</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>The Scoove Africa</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Timeline</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>4 Months</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Industry</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>Entertainment Media</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Key Metric</p>
                    <p className="text-base font-bold" style={{ color: 'var(--accent-teal)' }}>+150% Traffic</p>
                  </div>
                </div>

                <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>{impressionAnim.toLocaleString()}+</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Monthly Search Impressions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {[
            { val: '+150%', title: 'Organic Traffic', sub: 'Within 4 Months' },
            { val: '-25%', title: 'Bounce Rate', sub: 'Longer user sessions' },
            { val: '+40%', title: 'Click-Through Rate', sub: 'Optimized metadata' },
            { val: '20+', title: 'Page 1 Keywords', sub: 'Topical authority hubs' }
          ].map((card, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl border text-center flex flex-col justify-center interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-3xl font-bold font-display mb-1" style={{ color: 'var(--accent-teal)' }}>{card.val}</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{card.title}</div>
              <div className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Live climbing Simulation */}
        <div className="mb-32 max-w-3xl mx-auto">
          <div 
            className="p-10 rounded-[2.5rem] border backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-6 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Live SERP Climber Demo</span>
            <div className="flex items-end gap-6">
              <div className="text-center">
                <div className="text-sm font-sans font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Starting Spot</div>
                <div className="text-6xl font-bold font-display line-through opacity-40" style={{ color: 'var(--text-body)' }}>#45</div>
              </div>
              <ArrowRight className="mb-3" size={32} style={{ color: 'var(--border-card)' }} />
              <div className="text-center">
                <div className="text-sm font-sans font-bold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Optimized Rank</div>
                <motion.div 
                  animate={{ scale: rankingAnim === 8 ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-7xl font-bold font-display"
                  style={{ color: 'var(--accent-teal)' }}
                >
                  #{rankingAnim}
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans font-bold" style={{ color: 'var(--accent-teal)' }}>
              <TrendingUp size={12} />
              Target article moved to Page 1 in 90 days!
            </div>
          </div>
        </div>

        {/* Full-width interactive preview mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-32 rounded-[2.5rem] overflow-hidden border shadow-2xl relative group p-4"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <img 
            src="/images/scoove_analytics.png" 
            alt="The Scoove Africa SEO Ranking Climber and SERP Analytics Mockup" 
            width={1280}
            height={800}
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Challenge & The Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 text-left">
          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--color-danger)' }}>The Problem</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Sporadic Publishing & Stagnant Reach</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              Despite publishing excellent, creative local content, the website had a hard time ranking. When I conducted an in-depth audit of their site content, three key gaps stood out:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span><strong>Lack of search-intent matching:</strong> Content was written purely on feelings, missing targeted terms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span><strong>Inconsistent structure:</strong> Pages lacked structural H2/H3 layouts, missing metadata, and had poor image tagging.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-danger)' }} />
                <span><strong>High bounce rates:</strong> Readers who landed on the site left quickly as there was no clear internal linking structure to hold them.</span>
              </li>
            </ul>
          </div>

          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-teal)' }}>The SEO Strategy</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Structured Content Alignment & Technical Audits</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              I designed a 4-layered framework prioritizing topical authority, readability optimization, and technical performance corrections:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-teal)' }} />
                <span><strong>Geographical targeting:</strong> Aligned topics with high-intent keywords (e.g. \"best restaurants on Lagos Mainland\").</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-teal)' }} />
                <span><strong>Topic clustering:</strong> Grouped reviews around core pillars with parent/child relationship structures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent-teal)' }} />
                <span><strong>Core Speed Auditing:</strong> Compressed heavy imagery, configured browser caching, and set structured article schemas.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tactic Table */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Before & After</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Tactic Execution & Enhancements</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 text-left">
            {seoTactics.map((tactic, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl border transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="lg:col-span-3 flex items-center gap-4">
                  <div className="text-5xl font-bold font-sans" style={{ color: 'var(--border-card)' }}>{tactic.step}</div>
                  <div>
                    <h3 className="font-bold text-lg leading-snug" style={{ color: 'var(--text-body)' }}>{tactic.title}</h3>
                    <span 
                      className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border mt-1 inline-block"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
                    >
                      {tactic.badge}
                    </span>
                  </div>
                </div>

                <p className="lg:col-span-4 font-light text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {tactic.desc}
                </p>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border text-xs" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                    <p className="font-sans font-bold uppercase text-[9px] mb-1" style={{ color: 'var(--text-muted)' }}>Before</p>
                    <p className="font-light leading-relaxed line-through" style={{ color: 'var(--text-muted)' }}>{tactic.before}</p>
                  </div>
                  <div className="p-4 rounded-xl border text-xs" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
                    <p className="font-sans font-bold uppercase text-[9px] mb-1" style={{ color: 'var(--accent-teal)' }}>After Optimization</p>
                    <p className="font-bold leading-relaxed" style={{ color: 'var(--text-body)' }}>{tactic.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Takeaway Bento Grid */}
        <div className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Important Lessons</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Key Takeaways</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: <Globe size={24} />, title: 'Value & Discovery Go Together', desc: 'Even the most creative, high-quality copy cannot convert or build an audience if it is not discoverable through organic search parameters.' },
              { icon: <TrendingDown size={24} />, title: 'Format for High Cognitive Load', desc: 'Dropping bounce rates by 25% was achieved by re-formatting text into responsive lists, micro paragraphs, and clean visual cards that invite reading.' },
              { icon: <Zap size={24} />, title: 'Micro Changes Compound', desc: 'Small adjustments like structured metadata, context-rich alt text, and logical internal links create massive search performance leaps.' }
            ].map((takeaway, i) => (
              <div 
                key={i}
                className="p-8 rounded-3xl border space-y-4 interactive-card"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div 
                  className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--accent-teal)' }}
                >
                  {takeaway.icon}
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-body)' }}>{takeaway.title}</h3>
                <p className="font-light text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{takeaway.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6 pt-12 border-t"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>SEO Engineering</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display" style={{ color: 'var(--text-body)' }}>
            Ready to Build Your Search Visibility?
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Book a free 30-minute search strategy audit and let's uncover your site's keyword potential and competitor ranking gaps.
          </p>
          <Link 
            to="/contact"
            className="btn-cta text-lg cursor-pointer"
          >
            Claim Your Free Audit Call
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
