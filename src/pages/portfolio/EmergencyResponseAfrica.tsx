import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  Activity, 
  MapPin
} from 'lucide-react';
import { SEO } from '../../components/SEO';

export default function EmergencyResponseAfrica() {
  const [activeTab, setActiveTab] = useState<'local' | 'content' | 'technical'>('local');

  const tactics = {
    local: {
      title: "Local SEO & GMB Optimization",
      desc: "Emergency services are highly location-dependent. When patients need immediate transport, they search locally.",
      bullets: [
        "Structured and optimized Google My Business (GMB) listings for Lagos, Abuja, and other core centers.",
        "Programmatically integrated geo-targeted keywords like '24/7 emergency ambulance service in Lagos' into service landing pages.",
        "Established a system for capturing structured client reviews and testimonials, building instant trust."
      ],
      stat: "+30% Phone Calls"
    },
    content: {
      title: "Problem-Solving Blog Strategy",
      desc: "We shifted the focus from generic content to high-value medical guides matching real intent.",
      bullets: [
        "Identified frequent medical emergency queries: 'What to do during a heart attack before an ambulance arrives'.",
        "Wrote rich, readable, and authoritative articles featuring medical facts and clear call-to-actions.",
        "Strategically linked guide pages to core dispatch services, turning reading into conversions."
      ],
      stat: "10+ Page 1 Ranks"
    },
    technical: {
      title: "Core Web Vitals & Medical Schema",
      desc: "Search visibility is constrained by core tech health. We fixed crawlers and loading barriers.",
      bullets: [
        "PageSpeed Optimization: Compressed heavy visual resources and assets, improving site speed by 40%.",
        "Medical structured schemas: Implemented Google-recognized local business and emergency service JSON-LD schemas.",
        "Mobile First: Optimized sizing and click targets for mobile screens since over 70% of traffic is mobile."
      ],
      stat: "-25% Bounce Rate"
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Emergency Response Africa SEO Case Study | Emmanuel Odebiyi"
        description="How I helped healthcare startup Emergency Response Africa increase organic traffic by 180% and direct emergency calls by 30% through targeted SEO."
        keywords="healthcare startup SEO, local SEO ambulance service, medical schema markup, organic lead generation, Lagos SEO engineer"
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
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            >
              <Activity size={12} className="text-rose-500 animate-pulse" />
              Featured Case Study · Healthcare SEO
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display" style={{ color: 'var(--text-body)' }}>
              Connecting Fast Care With <br />
              <span className="italic font-medium text-rose-500">Those Who Need It.</span>
            </h1>

            <p className="text-xl font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              Emergency Response Africa provides life-saving medical dispatch services, but lacked search discoverability. By engineering a solid local SEO framework and deep on-page optimizations, I boosted their organic traffic by 180% and direct emergency requests by 30%.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Local Search SEO", "Google My Business", "Medical Schemas", "Conversion CRO"].map((tag) => (
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
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>Emergency Response Africa</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Timeline</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>60 Days</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Industry</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-body)' }}>Healthcare / MedTech</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Key Metric</p>
                    <p className="text-base font-bold text-rose-500">+180% Organic</p>
                  </div>
                </div>

                <div className="pt-6 border-t text-center flex items-center justify-center gap-4" style={{ borderColor: 'var(--border-card)' }}>
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                    <PhoneCall size={20} className="animate-bounce" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black" style={{ color: 'var(--text-body)' }}>+30%</div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Emergency Call Volume</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dense outcomes summary grids */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
          {[
            { val: '+180%', title: 'Organic Traffic Spike', sub: '2 months after changes' },
            { val: '10+', title: 'Page 1 Target Keywords', sub: 'Moved from page 3+' },
            { val: '+30%', title: 'Emergency Call Requests', sub: 'Direct GMB conversion clicks' },
            { val: '-25%', title: 'Bounce Rate Drop', sub: 'Engaging content architecture' }
          ].map((card, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl border text-center flex flex-col justify-center interactive-card"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="text-3xl font-bold font-display mb-1 text-rose-500">{card.val}</div>
              <div className="text-sm font-bold" style={{ color: 'var(--text-body)' }}>{card.title}</div>
              <div className="text-xs font-sans font-bold" style={{ color: 'var(--text-muted)' }}>{card.sub}</div>
            </div>
          ))}
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
            src="/images/era_dispatch_dashboard.png" 
            alt="Emergency Response Africa Medical Dispatch Center Dashboard Mockup" 
            width={1280}
            height={800}
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Problem & Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 text-left">
          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: '#f43f5e' }}>The Problem</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Search Invisibility for Critical Keywords</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              When people need emergency medical care, they turn to Google first. However, despite offering advanced private medical responses, Emergency Response Africa was invisible online:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-rose-500" />
                <span>Missing high-intent keywords: Not ranking for vital searches like 'emergency ambulance Lagos' or 'private ambulance service Abuja'.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-rose-500" />
                <span>Thin service pages: Landing content was sparse, leaving both crawler bots and prospective users without information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-rose-500" />
                <span>Core technical bottlenecks: Poor mobile response times (40% slower) and missing structured medical schema elements.</span>
              </li>
            </ul>
          </div>

          <div 
            className="p-8 sm:p-12 rounded-3xl border space-y-6"
            style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--accent-blue)' }}>The Solution</span>
            <h3 className="text-3xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Deploying The Location-Based Search Architecture</h3>
            <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
              I mapped out and deployed a geo-targeted Local SEO and Schema-rich structure tailored to rapid user medical inquiry needs:
            </p>
            <ul className="space-y-3 text-sm font-light" style={{ color: 'var(--text-body)' }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Local search optimization:</strong> Built geographical target service landing matrices and GMB hooks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Educational content guides:</strong> Authored SEO-first problem solvers targeting first-aid and medical emergencies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-blue-500" />
                <span><strong>Structured Schema insertion:</strong> Injected structured schemas recognizing local dispatch details directly into code.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tabbed Tactic Details */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] block" style={{ color: 'var(--text-muted)' }}>Implementation Focus</span>
            <h2 className="text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>The Three-Pronged Execution</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {(['local', 'content', 'technical'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--bg-surface-alt)' : 'var(--bg-surface)',
                  borderColor: activeTab === tab ? 'var(--text-body)' : 'var(--border-card)',
                  color: activeTab === tab ? 'var(--text-body)' : 'var(--text-muted)'
                }}
              >
                {tab === 'local' ? 'Local SEO Optimization' : tab === 'content' ? 'Problem-Solving Content' : 'Technical & Schema'}
              </button>
            ))}
          </div>

          <div 
            className="p-8 sm:p-12 rounded-[2.5rem] border backdrop-blur-md shadow-2xl relative overflow-hidden text-left"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                  {tactics[activeTab].title}
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {tactics[activeTab].desc}
                </p>
                <div className="space-y-3 pt-2">
                  {tactics[activeTab].bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-body)' }}>
                      <CheckCircle2 size={16} className="text-rose-500 shrink-0 mt-0.5" />
                      <span className="font-light leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="lg:col-span-4 text-center p-8 rounded-2xl border flex flex-col justify-center items-center"
                style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
              >
                <div className="text-5xl font-bold font-display text-rose-500">{tactics[activeTab].stat}</div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--text-muted)' }}>Impact Result</div>
              </div>
            </div>
          </div>
        </div>

        {/* Localized GMB Mock Visualization */}
        <div 
          className="mb-32 p-10 sm:p-16 rounded-[3rem] border relative overflow-hidden text-center lg:text-left"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans font-bold uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>Geotargeted Results</span>
              <h3 className="text-3xl sm:text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                Winning Local Search Placements
              </h3>
              <p className="font-light leading-relaxed animate-none" style={{ color: 'var(--text-muted)' }}>
                When an emergency call request is placed, speed is everything. By capturing top positions in local search bundles and mapping precise services, we allowed patients to trigger a call straight from search results pages.
              </p>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start" style={{ color: 'var(--text-body)' }}>
                <MapPin size={18} className="text-rose-500" />
                <span className="text-sm font-sans font-bold">Optimized locations: Lagos · Abuja · Port Harcourt</span>
              </div>
            </div>

            <div 
              className="lg:col-span-5 p-6 rounded-2xl border shadow-2xl space-y-4 text-left"
              style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-xs font-sans font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Search Placements</span>
                <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">Verified #1</span>
              </div>
              <div className="space-y-3">
                <div 
                  className="p-3 rounded-lg border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>'best ambulance service in Lagos'</span>
                  <span className="text-xs font-sans font-bold text-rose-500">Position #1</span>
                </div>
                <div 
                  className="p-3 rounded-lg border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>'24/7 private ambulance Abuja'</span>
                  <span className="text-xs font-sans font-bold text-rose-500">Position #2</span>
                </div>
                <div 
                  className="p-3 rounded-lg border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>'emergency medical care Nigeria'</span>
                  <span className="text-xs font-sans font-bold text-rose-500">Position #1</span>
                </div>
              </div>
            </div>
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
          <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] block" style={{ color: 'var(--text-muted)' }}>Healthcare SEO</span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
            Ready to Accelerate Your Organic Leads?
          </h2>
          <p className="font-light max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Book a free 30-minute system walkthrough and local keyword gap analysis to build search rankings that convert organic views into direct business queries.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg hover:brightness-110 shadow-2xl transition-all font-sans font-bold uppercase tracking-wider"
            style={{ 
              backgroundColor: 'var(--btn-cta-bg)', 
              color: 'var(--btn-cta-text)',
              boxShadow: '0 12px 24px -4px var(--btn-cta-shadow)'
            }}
          >
            Claim Your Local Strategy Audit
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
