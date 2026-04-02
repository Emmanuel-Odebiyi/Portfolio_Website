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
        title="Emmanuel Odebiyi | Content Marketing Automation — 520% ROI, 65% Traffic Growth"
        description="I build automated content marketing systems for growing businesses. Real results: 520% ROI in 90 days, 65% traffic growth in 3 months, 15+ hours saved weekly. See the proof."
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

      {/* Tools Ticker - Compacted */}
      <section className="bg-transparent border-t border-zinc-100/50">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-zinc-400 font-mono text-[10px] uppercase font-black tracking-[0.4em] mb-12">The Tech Stack Base</h2>
          <ToolsTicker tools={tools} />
        </div>
      </section>

      <CTASection />
    </>
  );
}

