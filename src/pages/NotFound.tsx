import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      <SEO 
        title="404 Page Not Found | Emmanuel Odebiyi"
        description="Drifted off course. The page you are looking for has been moved or automated into space."
      />

      {/* Floating Aurora Glows */}
      <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="max-w-xl w-full text-center space-y-12 relative z-10">
        
        {/* Floating Animated Compass Hero */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Compass Rings */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl rounded-full scale-150 animate-pulse" />
          
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
            className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-[#0f172a]/80 border border-white/10 flex items-center justify-center mx-auto shadow-2xl relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.6rem] blur-md opacity-20" />
            <Compass size={72} className="text-zinc-200 relative z-10 animate-spin" style={{ animationDuration: '30s' }} strokeWidth={1} />
          </motion.div>
        </motion.div>

        {/* Text Block */}
        <div className="space-y-6">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-400 tracking-[0.2em] uppercase"
            >
              <Sparkles size={10} className="text-blue-400" />
              Sitemap Offline
            </motion.div>
            
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500">
                404
              </span>
            </h1>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
              Drifted Off Course
            </h2>
            <p className="text-sm md:text-base text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
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
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-2 group font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Return Home
          </Link>
          
          <Link
            to="/portfolio"
            className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-2xl transition-all font-mono text-xs uppercase tracking-widest text-center"
          >
            View Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
