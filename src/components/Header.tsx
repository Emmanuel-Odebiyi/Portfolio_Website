import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Workflow, Search, Cpu, Globe, Activity, Calculator, TrendingUp, User, Microscope, FileText, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'My Story', desc: 'From burnout writer to automation pro', href: '/my-story', icon: <User className="w-4 h-4" /> },
      { name: 'My Approach', desc: 'The systems-first methodology', href: '/my-approach', icon: <Microscope className="w-4 h-4" /> },
      { name: 'My Resume', desc: 'Experience & technical arsenal', href: '/resume', icon: <FileText className="w-4 h-4" /> },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'AI-Powered Content Systems', desc: 'AI-powered content engines & editorial systems', href: '/services/content-marketing-automation', icon: <Workflow className="w-4 h-4" /> },
      { name: 'Search Engine Visibility', desc: 'Keyword architecture & technical optimization', href: '/services/seo-strategy-optimization', icon: <Search className="w-4 h-4" /> },
      { name: 'Custom Workflow Automation', desc: 'n8n, Zapier & Make integrations', href: '/services/business-process-automation', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  { 
    name: 'Tools', 
    href: '/growth-intelligence-lab',
    dropdown: [
      { name: 'Workday Bottleneck Finder™', desc: 'Pinpoint daily friction & reclaim hours', href: '/tools/automation-radar', icon: <Activity className="w-4 h-4" /> },
      { name: 'Business Freedom Calculator™', desc: 'Benchmark your scaling independence', href: '/tools/autopilot-score', icon: <Calculator className="w-4 h-4" /> },
      { name: 'Time & Dollar Savings Predictor™', desc: 'Reclaimed hours & cash returns forecast', href: '/tools/roi-time-machine', icon: <TrendingUp className="w-4 h-4" /> },
      { name: 'Revenue Scaling Planner™', desc: 'Zero-risk future scaling forecaster', href: '/tools/growth-simulator', icon: <Cpu className="w-4 h-4" /> },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null);
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
  const showBg = isScrolled || !isHomePage;

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-[500] w-[95%] transition-all duration-500 ease-in-out ${isScrolled ? 'top-3 max-w-5xl' : 'top-6 max-w-7xl'}`}>
      <div 
        className={`w-full transition-all duration-500 pointer-events-auto ${
          showBg 
            ? 'py-1.5 px-4 md:px-4 lg:px-6 backdrop-blur-xl border shadow-2xl rounded-[1.25rem]'
            : 'py-2 px-6 md:px-5 lg:px-8 bg-transparent border-transparent backdrop-blur-sm rounded-[1.5rem]'
        }`}
        style={showBg ? {
          backgroundColor: 'color-mix(in srgb, var(--bg-surface) 92%, transparent)',
          borderColor: 'var(--border-card)',
        } : undefined}
      >
        <div className="mx-auto grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-start">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Emmanuel Odebiyi Logo" 
                width={375}
                height={375}
                className="h-8 md:h-12 w-auto transition-all dark:brightness-0 dark:invert"
                style={{ filter: 'var(--logo-filter, none)' }}
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center justify-center md:gap-2.5 lg:gap-6">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative py-4"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center md:gap-1 lg:gap-1.5 text-xs lg:text-sm font-black tracking-tight transition-all relative group`}
                  style={{
                    color: location.pathname === link.href
                      ? 'var(--accent-amber)'
                      : 'var(--text-body)',
                    opacity: location.pathname === link.href ? 1 : 0.7,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href) {
                      (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7';
                    }
                  }}
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
                      <div 
                        className="border rounded-[2rem] p-5 shadow-2xl relative z-10 backdrop-blur-3xl"
                        style={{ 
                          backgroundColor: 'color-mix(in srgb, var(--bg-surface) 95%, transparent)', 
                          borderColor: 'var(--border-card)' 
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-start gap-4 p-4 rounded-2xl transition-all group/item text-left hover:bg-zinc-500/10"
                            >
                              <div 
                                className="mt-1 p-2.5 rounded-xl border transition-all group-hover/item:text-[var(--cta-blue)] group-hover/item:border-[var(--cta-blue)]/30"
                                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                              >
                                {sub.icon}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="font-black text-sm tracking-tight" style={{ color: 'var(--text-body)' }}>{sub.name}</span>
                                <span className="text-[11px] font-bold leading-snug uppercase tracking-[0.05em] transition-colors" style={{ color: 'var(--text-muted)' }}>{sub.desc}</span>
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

          <div className="flex justify-end items-center gap-4 md:gap-6">
            <ThemeToggle />
            {/* Visual divider between toggle and CTA - spaced out to prevent crampness */}
            <span className="hidden md:block w-px h-5 rounded-full mx-3" style={{ backgroundColor: 'var(--border-card)' }} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link
                to="/contact"
                className="inline-block px-4 lg:px-6 py-2.5 text-xs lg:text-sm font-black rounded-xl transition-all relative overflow-hidden group border-none"
                style={{ 
                  background: 'var(--btn-cta-bg)', 
                  color: 'var(--btn-cta-text)',
                  boxShadow: '0 4px 20px var(--btn-cta-shadow)' 
                }}
              >
                <span className="relative z-10">Contact Me</span>
              </Link>
            </motion.div>
            <button className="md:hidden p-2" style={{ color: 'var(--text-body)' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
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
              className="md:hidden backdrop-blur-3xl border-b overflow-hidden rounded-b-3xl shadow-2xl"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--bg-surface) 95%, transparent)', 
                borderColor: 'var(--border-card)' 
              }}
            >
              <div className="px-5 py-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const hasDropdown = !!link.dropdown;
                  const isExpanded = expandedMobileLink === link.name;

                  return (
                    <div 
                      key={link.name} 
                      className="flex flex-col shrink-0 rounded-2xl border overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                    >
                      {hasDropdown ? (
                        <button
                          onClick={() => setExpandedMobileLink(isExpanded ? null : link.name)}
                          className="flex items-center justify-between w-full p-4 text-left font-black transition-colors"
                          style={{ color: 'var(--text-body)' }}
                        >
                          <span className="text-base tracking-tight">{link.name}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                            style={{ color: isExpanded ? 'var(--cta-blue)' : 'var(--text-muted)' }}
                          />
                        </button>
                      ) : (
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-4 font-black transition-colors text-base tracking-tight"
                          style={{ color: 'var(--text-body)' }}
                        >
                          {link.name}
                        </Link>
                      )}

                      <AnimatePresence initial={false}>
                        {hasDropdown && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden border-t"
                            style={{ borderColor: 'var(--border-card)', backgroundColor: 'color-mix(in srgb, var(--bg-surface) 30%, transparent)' }}
                          >
                            <div className="p-3 flex flex-col gap-2">
                              {/* Overview Link */}
                              <Link
                                to={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-zinc-500/10"
                              >
                                <div 
                                  className="p-2 rounded-lg border" 
                                  style={{ 
                                    backgroundColor: 'color-mix(in srgb, var(--cta-blue) 10%, transparent)',
                                    color: 'var(--cta-blue)',
                                    borderColor: 'var(--border-card)' 
                                  }}
                                >
                                  <ArrowRight size={14} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-black text-xs" style={{ color: 'var(--text-body)' }}>Overview</span>
                                  <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Go to {link.name} main page</span>
                                </div>
                              </Link>

                              {/* Dropdown Links */}
                              {link.dropdown?.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-zinc-500/10"
                                >
                                  <div className="mt-0.5 p-2 rounded-lg border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}>
                                    {sub.icon}
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-black text-xs leading-tight" style={{ color: 'var(--text-body)' }}>{sub.name}</span>
                                    <span className="text-[10px] font-medium leading-tight" style={{ color: 'var(--text-muted)' }}>{sub.desc}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Link 
                  to="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full shrink-0 py-3.5 font-black rounded-xl text-center transition-colors mt-2"
                  style={{ 
                    background: 'var(--btn-cta-bg)', 
                    color: 'var(--btn-cta-text)',
                    boxShadow: '0 4px 20px var(--btn-cta-shadow)' 
                  }}
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
