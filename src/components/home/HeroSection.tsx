import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-transparent">
      {/* 
        Background 3D Mesh / Aurora will be loaded here later. 
        For now, the parent page will load the 3D element behind this content.
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-800 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-deep-space-blue-500 animate-pulse" />
            Content Marketing Automation Specialist
          </motion.div>

          <div className="mb-14 space-y-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.05] text-zinc-900"
            >
              Your Competitors Are <br />
              <span className="text-deep-space-blue-500">Publishing 40+ Articles.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.2 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-full h-px bg-zinc-400" />
              </div>
              <h2 className="relative z-10 text-2xl sm:text-4xl md:text-5xl lg:text-5xl text-zinc-400 font-bold tracking-tight bg-[#f8fafc] px-8">
                While you're still writing one at 11 PM on a Sunday.
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light">
              I build <span className="text-deep-space-blue-500 font-semibold text-xl">automated content marketing systems</span> for growing businesses — so you can <strong className="font-bold text-zinc-900">publish consistently</strong>, <strong className="font-bold text-zinc-900">rank higher</strong>, and <strong className="font-bold text-zinc-900">generate revenue</strong> without hiring a team or burning out trying.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                See Real Client Results →
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                Book a Free Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
