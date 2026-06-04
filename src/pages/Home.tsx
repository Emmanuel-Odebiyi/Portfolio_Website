import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, TrendingUp, Zap, Search, Cpu, Layers, Rocket, Bot } from 'lucide-react';

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
      <section className="bg-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="flex flex-col items-center gap-12">
            <h2 className="text-gray-500 font-mono text-[10px] uppercase font-black tracking-[0.5em]">Powered By:</h2>
            
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-12 py-10 rounded-[3rem] bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10">
              {[
                { name: 'n8n', icon: 'https://cdn.simpleicons.org/n8n' },
                { name: 'Zapier', icon: 'https://cdn.simpleicons.org/zapier' },
                { name: 'Make.com', icon: 'https://cdn.simpleicons.org/make' }
              ].map((tool, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="p-3 w-14 h-14 bg-white/10 rounded-xl shadow-sm border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-transparent group-hover:bg-brand-gradient/5 transition-colors duration-500 pointer-events-none" />
                    <img src={tool.icon} alt={tool.name} width={32} height={32} className="w-8 h-8 object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tighter italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

