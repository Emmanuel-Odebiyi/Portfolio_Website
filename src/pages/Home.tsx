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

