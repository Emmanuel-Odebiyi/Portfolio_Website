import React from 'react';
import { motion } from 'framer-motion';

export const ScrollMaskText = ({ text, className = '' }: { text: string; className?: string }) => {
  return (
    <motion.span 
      initial={{ opacity: 0.1, filter: 'blur(8px)', y: 20 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
};
