import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, ArrowLeft, ArrowUpRight, Scale, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function TermsOfService() {
  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'use', title: '2. Use of Site & Tools' },
    { id: 'ip', title: '3. Intellectual Property' },
    { id: 'liability', title: '4. Limitation of Liability' },
    { id: 'contact', title: '5. Technical Contact' }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0a0f1e] text-[#f8fafc] min-h-screen relative overflow-hidden font-sans">
      <SEO 
        title="Terms of Service | Emmanuel Odebiyi"
        description="Terms and conditions for accessing Emmanuel Odebiyi's portfolio website, interactive optimization tools, and B2B growth consulting services."
        keywords="terms of service, legal compliance, growth consulting terms, interactive sitemap policies"
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
              <Scale size={10} className="text-blue-400" />
              Operational Compliance
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display leading-[0.95]">
              Terms of Service
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
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Legal Index</h4>
              <p className="text-[10px] text-zinc-600 font-light leading-relaxed">Jump to a specific regulatory section below.</p>
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
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#60a5fa] block font-bold">Summary Goal</span>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  These terms establish operational clarity. If you use my templates or calculators, you agree to respect my code patterns and general benchmarks.
                </p>
              </div>
            </div>
          </aside>

          {/* Core Body Columns */}
          <div className="col-span-1 lg:col-span-8 lg:col-start-5 space-y-16">
            
            {/* Agreement Section */}
            <section id="agreement" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">1. Agreement to Terms</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  By accessing this website, you explicitly agree to be bound by these Terms of Service, all applicable laws, and regulations. If you disagree with or cannot fulfill any part of these protocols, you are prohibited from utilizing this website, downloading source templates, or using diagnostic calculations.
                </p>
              </div>
            </section>

            {/* Use of Site & Tools Section */}
            <section id="use" className="space-y-5 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">2. Use of Site and Tools</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  All dynamic calculators, automation maps, and reports provided in the **Growth Intelligence Lab** are for strategic diagnostic and educational purposes only. They model projections based on generalized market benchmarks and my own operational results—they are not guaranteed financial predictions.
                </p>
                <div className="p-6 rounded-2xl bg-[#0f172a]/20 border border-white/5 space-y-3 mt-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">Usage Restrictions:</span>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3.5 text-sm font-light text-zinc-300">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      You may not utilize this domain or custom tools for illegal, malicious, or scraping operations.
                    </li>
                    <li className="flex items-start gap-3.5 text-sm font-light text-zinc-300">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      You may not attempt to reverse-engineer, inject script payloads, or rip structural databases.
                    </li>
                    <li className="flex items-start gap-3.5 text-sm font-light text-zinc-300">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      All tools are delivered on an "as-is" basis; usage occurs purely at your own operational risk.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property Section */}
            <section id="ip" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">3. Intellectual Property</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  All structural systems, design palettes, interface mechanics, copywriting, graphic layouts, custom scripts, and underlying workflow logic on this site are the exclusive intellectual property of **Emmanuel Odebiyi** unless otherwise stated. 
                </p>
                <p>
                  You are granted a limited license to explore the portfolio. However, you may not redistribute, commercialize, or white-label any portion of this site's proprietary assets without explicit prior written authorization.
                </p>
              </div>
            </section>

            {/* Limitation of Liability Section */}
            <section id="liability" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">4. Limitation of Liability</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  Under no circumstances shall Emmanuel Odebiyi or this website be held liable for any operational losses, database corruption, software glitches, or missed growth benchmarks arising out of your use of, or inability to use, the materials, calculators, and automation frameworks provided on this domain.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="space-y-4 border-t border-white/5 pt-12 scroll-mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">5. Legal and Technical Contacts</h2>
              <div className="text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  For questions regarding these operational terms, compliance audits, or intellectual property clearance, please reach out directly:
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
