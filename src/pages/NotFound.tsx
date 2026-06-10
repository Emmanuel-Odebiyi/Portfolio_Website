import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      <SEO 
        title="404 Page Not Found | Emmanuel Odebiyi"
        description="Drifted off course. The page you are looking for has been moved or automated into space."
      />

      {/* Floating Aurora Glows */}
      <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] bg-[var(--cta-blue)]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] bg-[var(--accent-amber)]/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="max-w-xl w-full text-center space-y-12 relative z-10">
        
        {/* Floating Animated Compass Hero */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Compass Rings */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--cta-blue)]/5 to-[var(--accent-amber)]/5 blur-3xl rounded-full scale-150 animate-pulse" />
          
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--border-card)] flex items-center justify-center mx-auto shadow-2xl relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--cta-blue)] to-[var(--accent-amber)] rounded-[2.6rem] blur-md opacity-10" />
            <Compass size={72} className="relative z-10 animate-spin" style={{ animationDuration: '30s', color: 'var(--text-body)' }} strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* Text Block */}
        <div className="space-y-6">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono tracking-[0.2em] uppercase"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
            >
              <Sparkles size={10} className="text-[var(--accent-amber)] animate-pulse" />
              Sitemap Offline
            </motion.div>
            
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none mt-2 font-display">
              <span className="text-amber-gradient font-bold">
                404
              </span>
            </h1>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-sans" style={{ color: 'var(--text-body)' }}>
              Drifted Off Course
            </h2>
            <p className="text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The framework you are looking for has either been refactored, automated into space, or never existed in the sitemap.
            </p>
          </div>
        </div>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto"
        >
          <Link
            to="/"
            className="btn-cta w-full flex items-center justify-center gap-2 group font-mono text-xs uppercase tracking-widest text-center"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Return Home
          </Link>
          
          <Link
            to="/portfolio"
            className="w-full px-6 py-4 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] border border-[var(--border-card)] text-[var(--text-body)] rounded-2xl transition-all font-mono text-xs uppercase tracking-widest text-center hover-glow-text"
          >
            View Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
