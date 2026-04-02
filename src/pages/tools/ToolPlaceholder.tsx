import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

export default function ToolPlaceholder() {
  const { toolId } = useParams();
  
  const toolNames: Record<string, string> = {
    'automation-radar': 'Automation Radar™',
    'autopilot-score': 'Full Autopilot Score™',
    'roi-time-machine': 'ROI Time Machine™',
    'growth-simulator': 'Growth Simulator™'
  };

  const name = toolNames[toolId || ''] || 'Interactive Tool';

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 max-w-2xl"
      >
        <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-center text-zinc-400 mx-auto">
          <Construction size={40} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight">
            {name}
          </h1>
          <p className="text-xl text-zinc-500 font-light leading-relaxed">
            This interactive tool is currently being calibrated for maximum precision. 
            Check back soon to diagnose and scale your business growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            to="/growth-intelligence-lab"
            className="flex items-center gap-2 text-zinc-900 font-bold hover:text-brand-gradient transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Lab
          </Link>
          
          <Link
            to="/services"
            className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
