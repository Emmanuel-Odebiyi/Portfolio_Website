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
        title="Emmanuel Odebiyi — Content Marketing Strategist"
        description="I build automated content marketing systems for growing businesses — so you can publish consistently, rank higher, and generate revenue without hiring a team or burning out trying."
        keywords="content marketing strategist, content automation, SEO systems, B2B content marketing, marketing automation"
        withPersonSchema
      />
      <HeroSection />
      <StatsBar />

      {/* ── Problem Section: Full-screen dissolve ── */}
      <ProblemSection />

      {/* ── Solution Section: Expanding Scroll Accordion ── */}
      <SolutionSection />

      {/* ── Results Section: Typography Reveal ── */}
      <ResultsTypographySection />

      {/* ── Featured Results Section: Bento Case Studies ── */}
      <FeaturedResults />

      <ProcessSteps />
      <ProviderComparison />

      {/* Tools Showcase – Interactive Filterable Grid */}
      <ToolsShowcase />

      {/* Tools Ticker */}
      <section className="bg-transparent border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em] mb-12">Powered By The Best Tools</h2>
          <ToolsTicker tools={tools} />
        </div>
      </section>

      <CTASection />
    </>
  );
}

