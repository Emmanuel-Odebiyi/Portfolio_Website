import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, TrendingUp, Zap, Search, Cpu, Layers, Rocket, Bot } from 'lucide-react';
import { SiN8N, SiZapier, SiMake } from 'react-icons/si';

import { ToolsTicker, Tool } from '../components/ToolsTicker';
import { ProviderComparison } from '../components/ProviderComparison';
import { ProcessSteps } from '../components/ProcessSteps';
import { ToolsShowcase } from '../components/ToolsShowcase';
import { SEO } from '../components/SEO';

import { HeroSection } from '../components/home/HeroSection';
import { StatsBar } from '../components/home/StatsBar';
import { CTASection } from '../components/home/CTASection';
import { ProblemSection } from '../components/home/ProblemSection';
import { SolutionSection } from '../components/home/SolutionSection';
import { ResultsTypographySection } from '../components/home/ResultsTypographySection';
import { AutomationInAction } from '../components/home/AutomationInAction';
import { IntegrationTicker } from '../components/home/IntegrationTicker';
import FeaturedResults from '../components/home/FeaturedResults';

const tools: Tool[] = [
  { name: "SEO & Analytics", icon: <Search size={24} /> },
  { name: "Automation", icon: <Zap size={24} /> },
  { name: "AI Systems", icon: <Cpu size={24} /> },
  { name: "Scaling", icon: <Rocket size={24} /> },
  { name: "Zapier", icon: <Layers size={24} /> },
  { name: "Make.com", icon: <Layers size={24} /> },
  { name: "Airtable", icon: <Layers size={24} /> },
  { name: "ChatGPT", icon: <Bot size={24} /> },
  { name: "Ahrefs", icon: <Search size={24} /> },
  { name: "Semrush", icon: <Search size={24} /> },
  { name: "LinkedIn", icon: <Share2 size={24} /> },
  { name: "Growth Engines", icon: <TrendingUp size={24} /> },
];


export default function Home() {
  return (
    <>
      <SEO
        title="Emmanuel Odebiyi | Content Marketing Automation"
        description="I build automated content marketing systems. Real results: 520% ROI in 90 days, 65% traffic growth in 3 months, and 15+ hours saved weekly."
        keywords="content marketing strategist, content automation, SEO systems, B2B content marketing, marketing automation"
        withPersonSchema
      />
      <HeroSection />
      <StatsBar />

      {/* ── Problem Section ── */}
      <ProblemSection />

      {/* ── Solution Section ── */}
      <SolutionSection />

      {/* ── Results Section ── */}
      <ResultsTypographySection />

      {/* ── Automation In Action ── */}
      <AutomationInAction />

      {/* ── Featured Results ── */}
      <FeaturedResults />

      {/* ── Process Steps ── */}
      <ProcessSteps />

      {/* ── Comparison Section ── */}
      <ProviderComparison />

      {/* ── Client Testimonials ── */}
      <section className="py-24 border-t" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em]" style={{ color: 'var(--text-muted)' }}>Upwork Verified</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--text-body)' }}>Client Success Stories</h2>
            <p className="font-light text-sm max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Real feedback from project managers and founders on content strategy, SEO execution, and workflow quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                quote: "Emmanuel is a bright spirit with oozing positivity. Everytime he submits work it's with a positive attitude and enthusiasm. He is thorough in his research and asks questions if he has any need to. I would be happy to work with him again in the future and I believe anyone else who gets the opportunity to as well is lucky.",
                name: "Brock Yates",
                title: "Operational Project Manager, Mel Technologies LLC (Switzerland)",
                image: "/images/testimonials/Brock.jpg"
              },
              {
                quote: "Emmanuel delivered great articles and content workflows, taking his time to research the subject thoroughly before designing our search strategy. The better you guide and the more precise you describe your tasks, the better output you'll get. Thank you, Emmanuel.",
                name: "Phillip Stemann",
                title: "Founder, Planzer.io",
                image: "/images/testimonials/Phillip.jpg"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="p-8 rounded-[2rem] border shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden backdrop-blur-sm"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="absolute top-6 right-8 text-4xl select-none opacity-[0.03] dark:opacity-[0.06] font-display pointer-events-none" style={{ color: 'var(--text-body)' }}>“</div>
                
                <p className="text-base font-light leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border" 
                    style={{ borderColor: 'var(--border-card)' }}
                  />
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--text-body)' }}>{testimonial.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 hover:text-[var(--accent-amber)] font-bold font-sans text-xs uppercase tracking-widest transition-colors"
              style={{ color: 'var(--text-body)' }}
            >
              See all testimonials <span className="text-sm font-sans font-bold">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Integration Ticker ── */}
      <IntegrationTicker />

      {/* Core Tech Stack - Static 3-Logo Shared Background Layout */}
      <section className="border-t" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="flex flex-col items-center gap-12">
            <h2 className="font-sans text-xs sm:text-sm uppercase font-black tracking-[0.45em]" style={{ color: 'var(--text-muted)' }}>Powered By:</h2>
            
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-12 py-10 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)', borderColor: 'var(--border-card)' }}>
              {[
                { name: 'n8n', icon: SiN8N, color: '#FF6C37' },
                { name: 'Zapier', icon: SiZapier, color: '#FF4A00' },
                { name: 'Make.com', icon: SiMake, color: '#E51284' }
              ].map((tool, i) => {
                const IconComponent = tool.icon as any;
                return (
                  <div key={i} className="flex items-center gap-4 group cursor-default">
                    <div className="p-3 w-14 h-14 rounded-xl shadow-sm border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}>
                      <div className="absolute inset-0 bg-transparent group-hover:bg-brand-gradient/5 transition-colors duration-500 pointer-events-none" />
                      <IconComponent color={tool.color} className="w-8 h-8 object-contain transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <span className="text-2xl md:text-3xl font-black tracking-tighter italic opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-body)' }}>
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

