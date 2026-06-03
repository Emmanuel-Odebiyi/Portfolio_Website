import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface MagneticPullProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  key?: React.Key;
}

export const MagneticPull = ({ 
  children, 
  strength = 0.5, 
  radius = 0,
  className 
}: MagneticPullProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  
  const transformX = useSpring(mouseX, springConfig);
  const transformY = useSpring(mouseY, springConfig);

  const x = useTransform(transformX, [-100, 100], [-20 * strength, 20 * strength]);
  const y = useTransform(transformY, [-100, 100], [-20 * strength, 20 * strength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // distance from center
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    mouseX.set(dx);
    mouseY.set(dy);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y, borderRadius: radius }}
      className={cn("inline-block cursor-pointer relative", className)}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};
