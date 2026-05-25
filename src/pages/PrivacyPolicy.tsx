import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, ArrowLeft, ArrowUpRight, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function PrivacyPolicy() {
  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'collect', title: '2. Information I Collect' },
    { id: 'use', title: '3. How Information Is Used' },
    { id: 'security', title: '4. Data Protection Core' },
    { id: 'thirdparty', title: '5. Integrated Subprocessors' },
    { id: 'contact', title: '6. Privacy Concerns' }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0a0f1e] text-[#f8fafc] min-h-screen relative overflow-hidden font-sans">
      <SEO 
        title="Privacy Policy | Emmanuel Odebiyi"
        description="Privacy guidelines and secure data protection protocols governing Emmanuel Odebiyi's portfolio and Growth Intelligence Lab."
        keywords="privacy policy, cookies data usage, GDPR compliance, analytics tracking, information gain security"
      />

      {/* Floating Background Glows */}
      <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Editorial Header */}
        <div className="border-b border-white/5 pb-12 mb-16 text-left max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-400 tracking-[0.2em] uppercase">
              <Eye size={10} className="text-blue-400" />
              Information Governance
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display leading-[0.95]">
              Privacy Policy
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
              <span className="flex items-center gap-1.5"><Clock size={12} /> Last Updated: March 24, 2026</span>
              <span>•</span>
              <span>Emmanuel Odebiyi</span>
            </div>
          </div>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Sticky Left Navigation List */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit space-y-6">
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Privacy Index</h4>
              <p className="text-[10px] text-zinc-600 font-light leading-relaxed">Navigate privacy and tracking protocols.</p>
            </div>
            <nav className="flex flex-col gap-2.5">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-xs text-zinc-500 hover:text-[#60a5fa] transition-all font-mono py-1.5 border-l border-white/5 pl-3 hover:border-blue-500/40"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  {sec.title}
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/5">
              <div className="p-5 rounded-2xl bg-[#0f172a]/30 border border-white/5 space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#60a5fa] block font-bold">Raw Truth</span>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  I respect your inbox. Any corporate detail you input is purely analyzed to build your roadmap and is never sold to marketing aggregators.
                </p>
              </div>
            </div>
          </aside>

          {/* Core Body Columns */}
          <div className="col-span-1 lg:col-span-8 lg:col-start-5 space-y-16">
            
            {/* Introduction Section */}
            <section id="intro" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">1. Introduction</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  To put it as clearly as possible: **I value your privacy.** This privacy charter details exactly how I manage, secure, and review data whenever you interact with my sitemap, utilize my optimization tools, or submit details to obtain growth blue-printing models.
                </p>
              </div>
            </section>

            {/* Information I Collect Section */}
            <section id="collect" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">2. Information I Collect</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  I collect information in two distinct, transparent ways:
                </p>
                <div className="p-6 rounded-2xl bg-[#0f172a]/20 border border-white/5 space-y-4 mt-4">
                  <ul className="space-y-4">
                    <li className="space-y-1">
                      <strong className="text-white text-sm font-semibold block">A. Information You Submit</strong>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed">
                        Whenever you fill out my multi-step growth form, contact me directly, or register for insights, I collect the structural data you input (e.g., name, work email, budget, company URL, objectives).
                      </p>
                    </li>
                    <li className="space-y-1">
                      <strong className="text-white text-sm font-semibold block">B. Automated Activity Logs</strong>
                      <p className="text-zinc-400 text-sm font-light leading-relaxed">
                        To optimize load performance and monitor technical page health, I collect anonymous session markers (e.g., Google Analytics 4) to trace bounce rates, geographical regions, and platform browser agents.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How I Use Your Information Section */}
            <section id="use" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">3. How I Use Your Information</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  The data harvested from your interactions is deployed strictly to:
                </p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Process lead requests and establish direct strategic communication.
                  </li>
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Build and email custom strategic analysis charts and automation pipelines.
                  </li>
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Transmit weekly engineering growth frameworks (if you explicitly opt in).
                  </li>
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    Track interface interactions to improve loading speed and layout balance.
                  </li>
                </ul>
                <p className="text-base text-white font-medium border-l-2 border-blue-500 pl-4 mt-6">
                  I will never rent, trade, lease, or sell your business profiles to automated ad trackers or mailing list aggregators.
                </p>
              </div>
            </section>

            {/* Data Security Section */}
            <section id="security" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">4. Data Security</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  I employ secure transport sockets (SSL/HTTPS) and database protection rules to shield your profile inputs. However, no transmission method over global digital grids can be guaranteed 100% immune from zero-day breaches. While I deploy enterprise-grade practices, I cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Third-Party Services Section */}
            <section id="thirdparty" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">5. Integrated Subprocessors</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  To deliver a seamless responsive application experience, I incorporate trusted B2B platforms to run various operations:
                </p>
                <ul className="space-y-3.5 pl-2 pt-2">
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <strong>Vercel:</strong> Production-grade content hosting and CDN optimization.
                  </li>
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <strong>Formspree & n8n:</strong> Form routing, automated blueprint hooks, and CRM logs.
                  </li>
                  <li className="flex items-start gap-3 text-sm font-light text-zinc-300">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <strong>HubSpot:</strong> Internal client database and strategy tracking.
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="space-y-4 border-t border-white/5 pt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">6. Privacy Inquiries</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  To request complete deletion of your diagnostic history, unsubscribe from growth audits, or log a compliance request:
                </p>
                <div className="pt-4">
                  <a 
                    href="mailto:emmanuelodebiyiwrites@gmail.com" 
                    className="inline-flex items-center gap-2 text-white hover:text-blue-400 font-bold font-mono text-xs uppercase tracking-widest border-b border-blue-500/30 hover:border-blue-400 pb-1 transition-all"
                  >
                    emmanuelodebiyiwrites@gmail.com
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}
