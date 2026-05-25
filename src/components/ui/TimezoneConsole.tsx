import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Wifi, 
  Cpu, 
  ShieldAlert, 
  Globe2, 
  ArrowUpRight,
  TrendingUp,
  Zap,
  Activity
} from 'lucide-react';

interface ZoneData {
  letter: string;
  name: string;
  location: string;
  offsetHours: number; // Offset relative to UTC
  type: 'base' | 'overlap' | 'async';
  desc: string;
  color: string;
  glowingColor: string;
}

const ZONES: ZoneData[] = [
  {
    letter: 'A',
    name: 'Alpha',
    location: 'Lagos, Nigeria',
    offsetHours: 1,
    type: 'base',
    desc: 'Base Station · Operations Command Center',
    color: 'from-amber-400 to-orange-500',
    glowingColor: 'rgba(245,158,11,0.4)',
  },
  {
    letter: 'Z',
    name: 'Zulu',
    location: 'London, United Kingdom',
    offsetHours: 0,
    type: 'overlap',
    desc: 'Direct Synchronous Operations · Zero Lag',
    color: 'from-blue-400 to-indigo-500',
    glowingColor: 'rgba(56,189,248,0.4)',
  },
  {
    letter: 'R',
    name: 'Romeo',
    location: 'New York, United States',
    offsetHours: -5,
    type: 'overlap',
    desc: 'Core US Overlap · 4h Shared Working Window',
    color: 'from-sky-400 to-blue-600',
    glowingColor: 'rgba(14,165,233,0.4)',
  },
  {
    letter: 'S',
    name: 'Sierra',
    location: 'Chicago, United States',
    offsetHours: -6,
    type: 'overlap',
    desc: 'Central US Overlap · Structured Sync Handoffs',
    color: 'from-cyan-400 to-sky-500',
    glowingColor: 'rgba(34,211,238,0.4)',
  },
  {
    letter: 'H',
    name: 'Hotel',
    location: 'Singapore',
    offsetHours: 8,
    type: 'async',
    desc: 'Asynchronous Operations · Next-Day Deliverables',
    color: 'from-emerald-400 to-teal-500',
    glowingColor: 'rgba(52,211,153,0.4)',
  },
  {
    letter: 'I',
    name: 'India',
    location: 'Tokyo, Japan',
    offsetHours: 9,
    type: 'async',
    desc: 'Asynchronous Execution · Full Pipeline Continuity',
    color: 'from-purple-400 to-pink-500',
    glowingColor: 'rgba(192,132,252,0.4)',
  },
];

export function TimezoneConsole() {
  const [activeZone, setActiveZone] = useState<string>('A');
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate local time for a specific UTC offset
  const getZoneTime = (offset: number) => {
    // Get UTC milliseconds
    const utcMs = time.getTime() + (time.getTimezoneOffset() * 60000);
    // Add offset in milliseconds
    const zoneDate = new Date(utcMs + (3600000 * offset));
    return zoneDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getZoneStatus = (type: string) => {
    switch (type) {
      case 'base': return 'OPERATIONS STATION';
      case 'overlap': return 'ACTIVE OVERLAP';
      case 'async': return 'ASYNC PIPELINE';
      default: return '';
    }
  };

  const activeZoneData = ZONES.find(z => z.letter === activeZone) || ZONES[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 select-none">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em]">Operations Console</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Nautical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Timezone Availability</span>
          </h3>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-xs text-gray-300">Base Time: <strong className="text-white font-bold">{getZoneTime(1)} (LAGOS)</strong></span>
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Map Visual Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[2.5rem] bg-zinc-950/60 border border-white/10 relative overflow-hidden h-[500px]">
          {/* Halftone / Scanning effect background */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/0 to-transparent pointer-events-none" />

          {/* Top Panel Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Globe2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Base Link</p>
                <p className="text-sm font-bold text-white uppercase">{activeZoneData.location}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest border border-white/15 bg-white/5 ${
              activeZoneData.type === 'base' ? 'text-amber-400 border-amber-500/30' :
              activeZoneData.type === 'overlap' ? 'text-blue-400 border-blue-500/30' : 'text-emerald-400 border-emerald-500/30'
            }`}>
              {getZoneStatus(activeZoneData.type)}
            </span>
          </div>

          {/* Animated Signal Graph / Waves */}
          <div className="relative z-10 flex items-center justify-center py-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Radar Rings radiating from center */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: ring * 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                />
              ))}

              {/* Core Terminal Radar Line */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-t-blue-500/30 border-r-transparent border-b-transparent border-l-transparent pointer-events-none"
              />

              {/* Central Glowing Base Ring */}
              <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-20">
                <span className="text-4xl font-black text-white font-mono tracking-tighter">A</span>
                <span className="text-[7px] font-mono text-amber-500 uppercase tracking-widest mt-1">BASE STATION</span>
              </div>

              {/* Target Satellite Node Orbiting */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-4 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-blue-400">{activeZoneData.letter}</span>
              </motion.div>
            </div>
          </div>

          {/* Footer Panel Info Card */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-gray-400 tracking-wider">ROUTING DESCRIPTION</span>
              <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            </div>
            <p className="text-white font-bold leading-snug">{activeZoneData.desc}</p>
          </div>
        </div>

        {/* Right Side: Interactive Timezone Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ZONES.map((zone) => {
            const isActive = activeZone === zone.letter;
            return (
              <motion.div
                key={zone.letter}
                onClick={() => setActiveZone(zone.letter)}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`p-6 rounded-[2rem] bg-zinc-950/40 border transition-all duration-500 relative overflow-hidden cursor-pointer flex flex-col justify-between h-[155px] ${
                  isActive 
                    ? 'border-blue-500/50 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.25)] bg-white/5' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Background Glow on hover/active */}
                <div 
                  className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full blur-[40px] pointer-events-none transition-opacity duration-700" 
                  style={{ 
                    background: zone.glowingColor,
                    opacity: isActive ? 1 : 0.2
                  }} 
                />

                {/* Top Row: Zone Letter and real-time clock */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${zone.color} flex items-center justify-center text-zinc-950 font-black font-mono shadow-md`}>
                      {zone.letter}
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-mono uppercase text-sm tracking-wide">{zone.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{zone.location.split(',')[0]}</p>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm tracking-tight text-white/90">
                    {getZoneTime(zone.offsetHours)}
                  </div>
                </div>

                {/* Bottom Row: Details and status bar */}
                <div className="space-y-2 mt-4 z-10">
                  <p className="text-[10px] text-gray-300 leading-tight line-clamp-1">{zone.desc.split(' · ')[0]}</p>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : '15%' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${zone.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infrastructure SLA Bento Card Grid (Below Console) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        {/* Card 1: 100% Infrastructure Redundancy */}
        <div className="p-6 rounded-[2rem] bg-zinc-950/40 border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-400">
            <Wifi className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Full Redundancy Guarantee</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dual high-speed Fiber ISP (failover within 50ms) paired with hybrid solar backup. Zero power grid dependency.
            </p>
          </div>
        </div>

        {/* Card 2: Async Protocol */}
        <div className="p-6 rounded-[2rem] bg-zinc-950/40 border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Asynchronous Protocols</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Standardized, structured handoffs inside Git + Linear daily. Status audits executed precisely at Zulu-08:00.
            </p>
          </div>
        </div>

        {/* Card 3: Secure Systems compliance */}
        <div className="p-6 rounded-[2rem] bg-zinc-950/40 border border-white/10 flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Enterprise Readiness</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              GDPR-compliant setups, secure local environment, and smooth invoicing via global contracting platforms.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
