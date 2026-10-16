import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'eo-theme';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  // URL override if explicitly requested via query parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('theme') === 'dark') return 'dark';
  if (urlParams.get('theme') === 'light') return 'light';

  // Clear legacy persistent dark storage so stale visits do not get locked into dark
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors in restricted contexts
  }

  // Light theme is the unconditional default every time the page loads
  return 'light';
};

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Apply theme class to <html> on mount and on change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const isLight = theme === 'light';

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Too bright? Switch to dark mode' : 'Too dark? Switch to light mode'}
      title={isLight ? 'Too bright? Switch to dark mode' : 'Too dark? Switch to light mode'}
      className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer select-none border shadow-sm hover:shadow-md"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-card)',
        color: 'var(--text-body)',
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: isLight ? 'rgba(201, 123, 10, 0.12)' : 'rgba(240, 180, 41, 0.16)',
          color: 'var(--accent-amber)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -35, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Moon size={12} strokeWidth={2.4} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 35, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -35, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Sun size={12} strokeWidth={2.4} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* Inscribed microcopy prompt */}
      <span
        className="text-[11px] font-bold tracking-tight font-sans transition-colors duration-200"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="hidden sm:inline">
          {isLight ? 'Too bright? Switch to dark' : 'Too dark? Switch to light'}
        </span>
        <span className="inline sm:hidden">
          {isLight ? 'Switch to dark' : 'Switch to light'}
        </span>
      </span>
    </button>
  );
};
