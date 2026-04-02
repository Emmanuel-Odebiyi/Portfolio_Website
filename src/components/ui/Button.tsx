import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, asChild, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-zinc-900 text-white hover:bg-brand-gradient shadow-xl shadow-zinc-100 hover:shadow-[0_10px_40px_-5px_rgba(79,70,229,0.4)] border border-transparent hover:border-white/20",
      secondary: "bg-transparent text-zinc-900 border-2 border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white shadow-sm hover:shadow-xl",
      ghost: "bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
      link: "bg-transparent text-zinc-900 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-xl",
      md: "h-14 px-8 py-4 text-base",
      lg: "h-16 px-10 py-5 text-lg rounded-3xl",
    };

    // If implementing an icon or generic wrapper, we'd use MotionType, but passing native html works for standard props.
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ translateY: -2 }}
        whileTap={{ scale: 0.97 }}
        {...(props as unknown as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
