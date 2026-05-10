import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-brand-gradient/10 blur-3xl rounded-full scale-150" />
          <Rocket size={120} className="text-white relative z-10 mx-auto" strokeWidth={1} />
        </motion.div>

        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Looks like you've drifted off course.</h2>
            <p className="text-xl text-gray-400 font-light max-w-md mx-auto leading-relaxed">
              The page you're looking for was either automated into oblivion or never existed in the first place.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/"
            className="px-8 py-4 bg-brand-gradient text-zinc-900 font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link
            to="/portfolio"
            className="px-8 py-4 bg-transparent text-white border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            View Real Results
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
