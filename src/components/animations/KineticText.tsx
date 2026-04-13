import React from 'react';
import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  type?: 'words' | 'letters';
  delay?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({ text, className = "", type = "words", delay = 0 }) => {
  const elements = type === 'words' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: type === 'words' ? 0.05 : 0.02, 
        delayChildren: delay * 0.1 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: 20,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {elements.map((element, index) => (
        <span key={index} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={child}
            className="will-change-[opacity,transform] translate-z-0"
            style={{ display: 'inline-block', transformOrigin: 'top center' }}
          >
            {element === ' ' ? '\u00A0' : element}
          </motion.span>
          {type === 'words' && index !== elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.span>
  );
};
