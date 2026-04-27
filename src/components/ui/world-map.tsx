"use client";

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 3,
  loop = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  // Defaulting to light mode color for now as we are in a predominantly light-themed About page
  const isDark = false; 

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFFFF40" : "#00000020",
      shape: "circle",
      backgroundColor: isDark ? "black" : "white",
    }),
    [map, isDark]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay = 0.5;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2; 
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="w-full aspect-[2/1] relative overflow-visible">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-contain opacity-40 filter drop-shadow-sm"
        alt="world map"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="20%" stopColor="#2563eb" stopOpacity="1" />
            <stop offset="80%" stopColor="#4f46e5" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="#2563eb"
                strokeWidth="1"
                strokeOpacity="0.15"
              />
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2.5"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: loop ? [0, 0, 1, 1, 0] : 1 }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, (i * staggerDelay) / fullCycleDuration, (i * staggerDelay + animationDuration) / fullCycleDuration, (totalAnimationTime) / fullCycleDuration, 1],
                  ease: "easeInOut",
                  repeat: loop ? Infinity : 0,
                }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              {/* Pulsing Start Point (Nigeria) */}
              <circle cx={startPoint.x} cy={startPoint.y} r="4" fill="#2563eb" className="animate-ping opacity-75" />
              <circle cx={startPoint.x} cy={startPoint.y} r="3.5" fill="#2563eb" />
              
              {/* End Points */}
              <circle cx={endPoint.x} cy={endPoint.y} r="3" fill="#4f46e5" />
              
              {showLabels && dot.start.label && (
                <text x={startPoint.x} y={startPoint.y + 16} className={`fill-zinc-400 font-mono ${labelClassName}`} textAnchor="middle">
                  {dot.start.label}
                </text>
              )}
              {showLabels && dot.end.label && (
                <text x={endPoint.x} y={endPoint.y - 10} className={`fill-zinc-900 font-bold ${labelClassName}`} textAnchor="middle">
                  {dot.end.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
