import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { 
  CodeBracketIcon, 
  CodeBracketSquareIcon, 
  BoltIcon, 
  PaintBrushIcon, 
  PlayCircleIcon,
  CogIcon, 
  CpuChipIcon, 
  EnvelopeIcon,
  MagnifyingGlassIcon, 
  PencilSquareIcon, 
  PaperAirplaneIcon, 
  BriefcaseIcon,
  ChartBarIcon, 
  GlobeAltIcon, 
  FireIcon,
  ServerStackIcon
} from '@heroicons/react/24/solid';

interface Tool {
  name: string;
  Icon: React.ElementType;
  description: string;
  category: 'frontend' | 'automation' | 'marketing' | 'analytics';
}

const tools: Tool[] = [
  // — Frontend —
  { name: 'React 19', Icon: CodeBracketIcon, description: 'Component-based UI with hooks and concurrent features', category: 'frontend' },
  { name: 'TypeScript', Icon: CodeBracketSquareIcon, description: 'Type-safe JavaScript for scalable, maintainable code', category: 'frontend' },
  { name: 'Vite', Icon: BoltIcon, description: 'Lightning-fast build tooling and dev server', category: 'frontend' },
  { name: 'Tailwind CSS v4', Icon: PaintBrushIcon, description: 'Utility-first CSS framework for rapid UI development', category: 'frontend' },
  { name: 'Framer Motion', Icon: PlayCircleIcon, description: 'Production-ready animations and micro-interactions', category: 'frontend' },
  // — Automation —
  { name: 'Zapier', Icon: CogIcon, description: 'No-code workflow automation connecting 5,000+ apps', category: 'automation' },
  { name: 'Make (Integromat)', Icon: ServerStackIcon, description: 'Visual automation builder for complex multi-step flows', category: 'automation' },
  { name: 'n8n', Icon: CpuChipIcon, description: 'Self-hostable workflow automation with code capabilities', category: 'automation' },
  { name: 'Formspree', Icon: EnvelopeIcon, description: 'Serverless form backend with spam protection', category: 'automation' },
  // — Marketing —
  { name: 'SEO Systems', Icon: MagnifyingGlassIcon, description: 'Programmatic SEO, topic clusters, and content pipelines', category: 'marketing' },
  { name: 'Content Ops', Icon: PencilSquareIcon, description: 'AI-augmented content production at scale', category: 'marketing' },
  { name: 'Email Marketing', Icon: PaperAirplaneIcon, description: 'Lifecycle campaigns with behavioural triggers and segmentation', category: 'marketing' },
  { name: 'LinkedIn Outreach', Icon: BriefcaseIcon, description: 'Automated prospecting and engagement sequences', category: 'marketing' },
  // — Analytics —
  { name: 'Google Analytics 4', Icon: ChartBarIcon, description: 'Event-based analytics and audience insights', category: 'analytics' },
  { name: 'Ahrefs', Icon: GlobeAltIcon, description: 'SEO research, backlink analysis, and rank tracking', category: 'analytics' },
  { name: 'Hotjar', Icon: FireIcon, description: 'Heatmaps, session recordings, and UX feedback', category: 'analytics' },
];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: Tool[], reverse?: boolean, speed?: number }) => {
  // Multiply items to ensure we fill even ultra-wide displays. 
  // Array(6) gives 6 copies total. Rotating by 50% shifts exactly 3 copies.
  const repeatedItems = Array(6).fill(items).flat();

  return (
    <div className="flex overflow-hidden relative w-full group py-2">
       <motion.div
         animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
         transition={{ 
           duration: speed, 
           ease: 'linear', 
           repeat: Infinity,
         }}
         className="flex gap-4 sm:gap-6 w-max shrink-0 px-2 sm:px-3"
       >
         {repeatedItems.map((tool, i) => (
           <div 
             key={i} 
             title={tool.name}
             className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl shrink-0 hover:bg-white/10 hover:scale-[1.02] transition-all cursor-pointer group/item shadow-sm hover:shadow-md backdrop-blur-sm"
           >
              <span className="grayscale group-hover/item:grayscale-0 transition-all opacity-50 group-hover/item:opacity-100 text-white">
                <tool.Icon className="w-8 h-8 text-current" />
              </span>
           </div>
         ))}
       </motion.div>
    </div>
  );
}

export function ToolsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const row1 = tools.slice(0, 8);
  const row2 = tools.slice(8);

  return (
    <>
      <section className="relative py-32 overflow-hidden bg-[#0B0F19] text-white flex flex-col items-center justify-center">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
          <div className="w-[800px] h-[400px] bg-brand-gradient/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 px-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Over 500 integrations
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
              Use pre-built nodes for common apps. Custom API connections for everything else.
            </p>
          </motion.div>

          {/* Marquee Container with fade edge masks */}
          <div className="w-full relative">
            <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col gap-2">
              <MarqueeRow items={row1} speed={60} />
              <MarqueeRow items={row2} speed={65} reverse />
            </div>
          </div>
          
          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-brand-gradient hover:bg-deep-space-blue-400 text-white text-sm font-semibold rounded-xl transition-all shadow-[0_4px_20px_rgba(0,166,255,0.2)] hover:shadow-[0_8px_30px_rgba(0,166,255,0.3)]"
            >
              Browse all integrations
            </button>
          </motion.div>
        </div>
      </section>

      {/* Integrations Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-12 md:py-24">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0B0F19] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] backdrop-blur-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:px-8 border-b border-white/10 shrink-0">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Tools & Integrations</h3>
                  <p className="text-gray-400 text-sm">The core stack running the automated systems.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Scrollable Tool Grid */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <style>{`
                  .custom-scroll::-webkit-scrollbar { width: 8px; }
                  .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                  .custom-scroll::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 4px; }
                  .custom-scroll::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }
                `}</style>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 custom-scroll">
                  {tools.map((tool, i) => (
                    <div 
                      key={i} 
                      className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-sm transition-all group backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm text-gray-400">
                        <tool.Icon className="w-6 h-6 text-current" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1 group-hover:text-brand-gradient transition-colors">{tool.name}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
