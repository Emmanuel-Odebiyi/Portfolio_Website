import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail, ArrowUpRight, Rocket } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Content Automation', href: '/services' },
      { name: 'SEO Strategy', href: '/services' },
      { name: 'AI Workflows', href: '/services' },
      { name: 'Growth Systems', href: '/services' },
    ],
  },
  {
    title: 'Work',
    links: [
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Resume', href: '/resume' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Twitter', href: '#', icon: <Twitter size={14} /> },
      { name: 'LinkedIn', href: '#', icon: <Linkedin size={14} /> },
      { name: 'Instagram', href: '#', icon: <Instagram size={14} /> },
      { name: 'Email', href: 'mailto:emmayoodebiyi001@gmail.com', icon: <Mail size={14} /> },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-white py-32 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-24">
        {/* Brand Section */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Rocket size={24} />
            </div>
            <span className="text-3xl font-bold tracking-tight">Emmanuel Odebiyi</span>
          </div>
          <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-md">
            Helping growing businesses automate their marketing and scale with predictable growth systems.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-white/5 inline-block"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Links Sections */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-8">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link 
                      to={link.href} 
                      className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.icon && <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors">{link.icon}</span>}
                      <span className="text-sm font-medium">{link.name}</span>
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      target={link.href.startsWith('http') ? "_blank" : undefined}
                      rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.icon && <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors">{link.icon}</span>}
                      <span className="text-sm font-medium">{link.name}</span>
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-mono uppercase tracking-[0.5em]">
        <div className="flex items-center gap-4">
          <span>© 2026 Emmanuel Odebiyi</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>All Rights Reserved</span>
        </div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
    </footer>
  );
};
