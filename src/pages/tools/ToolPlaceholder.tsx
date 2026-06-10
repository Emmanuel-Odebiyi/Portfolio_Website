import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { SEO } from '../../components/SEO';

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
    <div className="min-h-screen pt-32 pb-20 bg-[var(--bg-page)] text-[var(--text-body)] flex flex-col items-center justify-center px-6 text-center transition-colors duration-300">
      <SEO 
        title={`${name} Under Calibration | Emmanuel Odebiyi`}
        description={`Interactive scaling tool ${name} is currently under development. Check back soon for the live operations diagnostic.`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 max-w-2xl"
      >
        <div 
          className="w-24 h-24 rounded-[2rem] border flex items-center justify-center mx-auto"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
        >
          <Construction size={40} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
            {name}
          </h1>
          <p className="text-xl font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            This interactive tool is currently being calibrated for maximum precision. 
            Check back soon to diagnose and scale your business growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            to="/growth-intelligence-lab"
            className="flex items-center gap-2 font-bold transition-all hover-glow-text text-[var(--text-body)]"
          >
            <ArrowLeft size={20} />
            Back to Lab
          </Link>
          
          <Link
            to="/services"
            className="btn-cta"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
