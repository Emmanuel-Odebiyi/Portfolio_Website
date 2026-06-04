import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.svg';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Resume', href: '/resume' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Content Automation', href: '/services/content-marketing-automation' },
      { name: 'SEO Strategy', href: '/services/seo-strategy-optimization' },
      { name: 'Process Automation', href: '/services/business-process-automation' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Twitter / X', href: 'https://x.com/Bobowrites_', icon: <Twitter size={16} /> },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-odebiyi', icon: <Linkedin size={16} /> },
      { name: 'Instagram', href: 'https://www.instagram.com/emmanuelodebiyi_/', icon: <Instagram size={16} /> },
      { name: 'Email', href: 'mailto:emmanuelodebiyiwrites@gmail.com', icon: <Mail size={16} /> },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0F19] text-white pt-24 pb-12 px-6 overflow-hidden relative border-t border-white/10">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 relative z-10">
        
        {/* Brand Section (Left) */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Emmanuel Odebiyi Logo" 
                width={375}
                height={375}
                className="h-20 md:h-32 w-auto brightness-0 invert"
              />
            </div>
            
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-sm">
              Helping growing businesses automate their marketing and scale with predictable growth systems.
            </p>
            
            <Link
              to="/contact"
              className="btn-primary"
            >
              Start a Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Links Sections (Middle & Right) */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 font-semibold">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => {
                const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto');
                const LinkPattern = (
                  <span className="group flex items-center gap-3 text-gray-400 hover:text-brand-gradient transition-all duration-300 w-fit">
                    {link.icon && (
                      <span className="text-gray-500 group-hover:text-brand-gradient transition-colors duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                        {link.icon}
                      </span>
                    )}
                    <span className="text-sm font-medium relative overflow-hidden group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                      {/* Hover underline effect */}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gradient origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </span>
                  </span>
                );

                return (
                  <li key={link.name}>
                    {isExternal ? (
                      <a 
                        href={link.href} 
                        target={link.href.startsWith('http') ? "_blank" : undefined}
                        rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="block"
                      >
                        {LinkPattern}
                      </a>
                    ) : (
                      <Link to={link.href} className="block">
                        {LinkPattern}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Emmanuel Odebiyi</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>All Rights Reserved</span>
        </div>
        <div className="flex gap-8">
          <Link to="/privacy" className="hover:text-brand-gradient transition-colors duration-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-gradient transition-colors duration-300">Terms of Service</Link>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
    </footer>
  );
};
