import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Lab', href: '/growth-intelligence-lab' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash scrolling after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-[200] w-[95%] transition-all duration-500 ease-in-out ${isScrolled ? 'top-3 max-w-5xl' : 'top-6 max-w-7xl'}`}>
      <div 
        className={`w-full transition-all duration-500 transition-opacity duration-500 pointer-events-auto ${
          isScrolled 
            ? 'py-1.5 px-6 bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[1.25rem]' 
            : 'py-2 px-8 bg-white/30 backdrop-blur-lg border border-white/10 shadow-xl rounded-[1.5rem]'
        }`}
      >
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-start"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Emmanuel Odebiyi Logo" 
              className="h-8 md:h-12 w-auto"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centralized */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.href}
                className={`text-sm font-bold transition-all relative group ${
                  location.pathname === link.href 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-brand-gradient transition-all duration-300 ${
                  location.pathname === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex justify-end items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              className="px-6 py-1.5 bg-zinc-900 text-white text-sm font-bold rounded-xl hover:bg-brand-gradient transition-all shadow-lg shadow-zinc-200"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/60 backdrop-blur-2xl border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-zinc-900 hover:text-brand-gradient transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-zinc-900 text-white font-bold rounded-xl text-center"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
};
