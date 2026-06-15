import React, { useState, useEffect, lazy, Suspense } from 'react';

const AuroraCanvas = lazy(() => import('./AuroraCanvas'));

export const Aurora: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 z-[-1] pointer-events-none aurora-canvas-container transition-colors duration-500"
        style={{
          backgroundColor: isDark ? '#111f2e' : '#f4f5f7',
          backgroundImage: isDark 
            ? 'radial-gradient(circle at 50% -20%, rgba(217, 119, 6, 0.18), transparent 65%), radial-gradient(circle at 15% 85%, rgba(59, 125, 235, 0.12), transparent 55%)'
            : 'radial-gradient(circle at 50% -20%, rgba(217, 119, 6, 0.10), transparent 65%), radial-gradient(circle at 15% 85%, rgba(59, 125, 235, 0.08), transparent 55%)'
        }}
      />
    );
  }

  const bgColor = isDark ? '#111f2e' : '#f4f5f7';

  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none aurora-canvas-container transition-colors duration-500"
      style={{ 
        backgroundColor: bgColor,
        backgroundImage: isDark 
          ? 'radial-gradient(circle at 50% -25%, rgba(217, 119, 6, 0.18), transparent 65%), radial-gradient(circle at 15% 85%, rgba(59, 125, 235, 0.12), transparent 55%)'
          : 'radial-gradient(circle at 50% -25%, rgba(217, 119, 6, 0.10), transparent 65%), radial-gradient(circle at 15% 85%, rgba(59, 125, 235, 0.08), transparent 55%)'
      }}
    >
      <Suspense fallback={null}>
        <AuroraCanvas isDark={isDark} bgColor={bgColor} />
      </Suspense>
    </div>
  );
};

