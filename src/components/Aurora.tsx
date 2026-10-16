import React, { useState, useEffect } from 'react';

/**
 * StudioBackground (formerly Aurora)
 * Ultra-high-performance, studio-grade background layer.
 * Zero WebGL overhead, zero Three.js bundle dependency (saves ~884KB).
 * Renders a crisp, subtle tactile dot matrix on the warm ivory canvas.
 */
export const Aurora: React.FC = () => {
  const [isDark, setIsDark] = useState(() => 
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--bg-page)',
        backgroundImage: isDark
          ? 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
          : 'radial-gradient(circle, rgba(14, 28, 42, 0.035) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  );
};

export default Aurora;
