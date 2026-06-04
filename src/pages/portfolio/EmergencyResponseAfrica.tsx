import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Globe, 
  Settings, 
  MapPin,
  Clock
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
    <div className="bg-[#0B0F19] text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="Emergency Response Africa SEO Case Study | Emmanuel Odebiyi"
        description="How I helped healthcare startup Emergency Response Africa increase organic traffic by 180% and direct emergency calls by 30% through targeted SEO."
        keywords="healthcare startup SEO, local SEO ambulance service, medical schema markup, organic lead generation, Lagos SEO engineer"
      />

      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400 tracking-[0.2em] uppercase">
              <Activity size={12} className="text-rose-400 animate-pulse" />
              Featured Case Study · Healthcare SEO
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Connecting Fast Care With <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400">Those Who Need It.</span>
            </h1>

            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              Emergency Response Africa provides life-saving medical dispatch services, but lacked search discoverability. By engineering a solid local SEO framework and deep on-page optimizations, I boosted their organic traffic by 180% and direct emergency requests by 30%.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Local Search SEO</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Google My Business</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Medical Schemas</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">Conversion CRO</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block text-center lg:text-left">Project Metadata</span>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Client</p>
                    <p className="text-base font-semibold text-white">Emergency Response Africa</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Timeline</p>
                    <p className="text-base font-semibold text-white">60 Days</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Industry</p>
                    <p className="text-base font-semibold text-white">Healthcare / MedTech</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-mono uppercase">Key Metric</p>
                    <p className="text-base font-semibold text-rose-400">+180% Organic</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-center flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <PhoneCall size={20} className="animate-bounce" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-white">+30%</div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Emergency Call Volume</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dense outcomes summary grids */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
            <div className="text-3xl font-black text-rose-400 mb-1">+180%</div>
            <div className="text-sm font-semibold text-white">Organic Traffic Spike</div>
            <div className="text-xs text-zinc-500 font-mono">2 months after changes</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
            <div className="text-3xl font-black text-rose-400 mb-1">10+</div>
            <div className="text-sm font-semibold text-white">Page 1 Target Keywords</div>
            <div className="text-xs text-zinc-500 font-mono">Moved from page 3+</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
            <div className="text-3xl font-black text-rose-400 mb-1">+30%</div>
            <div className="text-sm font-semibold text-white">Emergency Call Requests</div>
            <div className="text-xs text-zinc-500 font-mono">Direct GMB conversion clicks</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center flex flex-col justify-center">
            <div className="text-3xl font-black text-rose-400 mb-1">-25%</div>
            <div className="text-sm font-semibold text-white">Bounce Rate Drop</div>
            <div className="text-xs text-zinc-500 font-mono">Engaging content architecture</div>
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
            src="/images/era_dispatch_dashboard.png" 
            alt="Emergency Response Africa Medical Dispatch Center Dashboard Mockup" 
            width={1280}
            height={800}
            className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
        </motion.div>

        {/* The Problem & Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest">The Problem</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Search Invisibility for Critical Keywords</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              When people need emergency medical care, they turn to Google first. However, despite offering advanced private medical responses, Emergency Response Africa was invisible online:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Missing high-intent keywords: Not ranking for vital searches like 'emergency ambulance Lagos' or 'private ambulance service Abuja'.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Thin service pages: Landing content was sparse, leaving both crawler bots and prospective users without information.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                Core technical bottlenecks: Poor mobile response times (40% slower) and missing structured medical schema elements.
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 to-indigo-500/5 border border-rose-500/20 space-y-6">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">The Solution</span>
            <h3 className="text-3xl font-bold text-white tracking-tight">Deploying The Location-Based Search Architecture</h3>
            <p className="text-zinc-300 font-light leading-relaxed">
              I mapped out and deployed a geo-targeted Local SEO and Schema-rich structure tailored to rapid user medical inquiry needs:
            </p>
            <ul className="space-y-3 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <strong>Local search optimization:</strong> Built geographical target service landing matrices and GMB hooks.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <strong>Educational content guides:</strong> Authored SEO-first problem solvers targeting first-aid and medical emergencies.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <strong>Structured Schema insertion:</strong> Injected structured schemas recognizing local dispatch details directly into code.
              </li>
            </ul>
          </div>
        </div>

        {/* Tabbed Tactic Details */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Implementation Focus</span>
            <h2 className="text-4xl font-bold text-white tracking-tight">The Three-Pronged Execution</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {(['local', 'content', 'technical'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${
                  activeTab === tab 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-xl' 
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                }`}
              >
                {tab === 'local' ? 'Local SEO Optimization' : tab === 'content' ? 'Problem-Solving Content' : 'Technical & Schema'}
              </button>
            ))}
          </div>

          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {tactics[activeTab].title}
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  {tactics[activeTab].desc}
                </p>
                <div className="space-y-3 pt-2">
                  {tactics[activeTab].bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" />
                      <span className="font-light leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 text-center p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center">
                <div className="text-5xl font-black text-rose-400 mb-1">{tactics[activeTab].stat}</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">Impact Result</div>
              </div>
            </div>
          </div>
        </div>

        {/* Localized GMB Mock Visualization */}
        <div className="mb-32 p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-rose-500/10 to-transparent border border-white/10 relative overflow-hidden text-center lg:text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Geotargeted Results</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Winning Local Search Placements
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                When an emergency call request is placed, speed is everything. By capturing top positions in local search bundles and mapping precise services, we allowed patients to trigger a call straight from search results pages.
              </p>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <MapPin size={18} className="text-rose-400" />
                <span className="text-sm font-mono text-zinc-300">Optimized locations: Lagos · Abuja · Port Harcourt</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-zinc-500 uppercase">Search Placements</span>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">Verified #1</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-sm text-white font-medium">'best ambulance service in Lagos'</span>
                  <span className="text-xs font-mono text-rose-400 font-bold">Position #1</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-sm text-white font-medium">'24/7 private ambulance Abuja'</span>
                  <span className="text-xs font-mono text-rose-400 font-bold">Position #2</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-sm text-white font-medium">'emergency medical care Nigeria'</span>
                  <span className="text-xs font-mono text-rose-400 font-bold">Position #1</span>
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
          className="text-center space-y-6 pt-12 border-t border-white/10"
        >
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] block">Healthcare SEO</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Accelerate Your Organic Leads?
          </h2>
          <p className="text-zinc-400 font-light max-w-xl mx-auto">
            Book a free 30-minute system walkthrough and local keyword gap analysis to build search rankings that convert organic views into direct business queries.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 text-white font-black text-lg hover:brightness-110 shadow-2xl shadow-rose-500/20 active:scale-95 transition-all"
          >
            Claim Your Local Strategy Audit
            <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
