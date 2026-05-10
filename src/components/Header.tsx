import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Target, MessageSquare, Globe, Activity, Calculator, TrendingUp, Cpu, User, Microscope, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'My Story', desc: 'From burnout writer to automation pro', href: '/about#story', icon: <User className="w-4 h-4" /> },
      { name: 'My Approach', desc: 'The systems-first methodology', href: '/about#approach', icon: <Microscope className="w-4 h-4" /> },
      { name: 'My Resume', desc: 'Experience & technical arsenal', href: '/resume', icon: <FileText className="w-4 h-4" /> },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Content Strategy', desc: 'Keyword research & SERP analysis', href: '/services#content', icon: <Target className="w-4 h-4" /> },
      { name: 'Marketing Automation', desc: 'n8n, Zapier & Make workflows', href: '/services#automation', icon: <Zap className="w-4 h-4" /> },
      { name: 'AI Implementation', desc: 'Custom ChatGPT & LLM pipelines', href: '/services#ai', icon: <MessageSquare className="w-4 h-4" /> },
      { name: 'Technical SEO', desc: 'Structure & performance audits', href: '/services#seo', icon: <Globe className="w-4 h-4" /> },
    ]
  },
  { 
    name: 'Tools', 
    href: '/growth-intelligence-lab',
    dropdown: [
      { name: 'Automation Radar', desc: 'Track your growth efficiency', href: '/tools/automation-radar', icon: <Activity className="w-4 h-4" /> },
      { name: 'Autopilot Score', desc: 'Score your business automation', href: '/tools/autopilot-score', icon: <Calculator className="w-4 h-4" /> },
      { name: 'ROI Time Machine', desc: 'Predict your automation returns', href: '/tools/roi-time-machine', icon: <TrendingUp className="w-4 h-4" /> },
      { name: 'Growth Simulator', desc: 'Stress test your marketing scale', href: '/tools/growth-simulator', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const isHomePage  = location.pathname === '/';

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-[300] w-[95%] transition-all duration-500 ease-in-out ${isScrolled ? 'top-3 max-w-5xl' : 'top-6 max-w-7xl'}`}>
      <div 
        className={`w-full transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? 'py-1.5 px-6 bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[1.25rem]'
            : 'py-2 px-8 bg-transparent border-transparent backdrop-blur-sm rounded-[1.5rem]'
        }`}
      >
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Emmanuel Odebiyi Logo" 
                className="h-8 md:h-12 w-auto transition-all invert brightness-0"
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center justify-center gap-6">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative py-4"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1.5 text-sm font-black tracking-tight transition-all relative group ${
                    location.pathname === link.href 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                  <span className={`absolute -bottom-1 left-0 h-[3px] rounded-full bg-brand-gradient transition-all duration-300 ${
                    location.pathname === link.href ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`} />
                </Link>

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[320px]"
                    >
                      <div className="border rounded-[2rem] p-5 shadow-2xl relative z-10 bg-zinc-950/90 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                        <div className="flex flex-col gap-2">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-start gap-4 p-4 rounded-2xl transition-all group/item text-left hover:bg-white/5"
                            >
                              <div className="mt-1 p-2.5 rounded-xl border transition-all bg-white/5 border-white/10 text-white group-hover/item:text-blue-400 group-hover/item:border-blue-400/30">
                                {sub.icon}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-black text-sm tracking-tight text-white">{sub.name}</span>
                                <span className="text-[11px] font-bold leading-snug uppercase tracking-[0.05em] transition-colors text-zinc-400 group-hover/item:text-zinc-300">{sub.desc}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex justify-end items-center gap-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="hidden md:block">
              <Link
                to="/contact"
                className="px-6 py-2 text-sm font-black rounded-xl transition-all relative overflow-hidden group border-none text-zinc-900 hover:text-white"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', boxShadow: '0 4px 20px rgba(245,158,11,0.30)' }}
              >
                <span className="relative z-10">Contact Me</span>
              </Link>
            </motion.div>
            <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
              className="md:hidden bg-[#0B0F19]/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden rounded-b-3xl shadow-2xl"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col gap-2">
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-black text-white hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 flex flex-col gap-3 border-l border-white/10">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-900 hover:text-white font-black rounded-xl text-center shadow-[0_4px_20px_rgba(245,158,11,0.30)] transition-colors">
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
