import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2 } from 'lucide-react';

interface LiveCounterStripProps {
  initialCount?: number;
  className?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export const LiveCounterStrip: React.FC<LiveCounterStripProps> = ({
  initialCount = 1482,
  className = '',
  variant = 'banner'
}) => {
  const [count, setCount] = useState(initialCount);
  const [lastActivity, setLastActivity] = useState<string>('Registered Nurse application sent to Aga Khan Hospital');

  const recentEvents = [
    'ICU Nurse application sent to Aga Khan Hospital (Nairobi)',
    'Logistics Driver application sent to Naivas (Sameer Hub)',
    'Accounts Officer application sent to Equity Bank (Upper Hill)',
    'High School Teacher credentials sent to Brookside Secondary',
    'Clinical Officer application sent to Kenyatta National Hospital',
    'Customer Care Executive sent to Safaricom PLC',
    'Dispensing Pharmacist profile delivered to MP Shah Hospital'
  ];

  useEffect(() => {
    // Tick smoothly every 4-8 seconds
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
      const randomEvent = recentEvents[Math.floor(Math.random() * recentEvents.length)];
      setLastActivity(randomEvent);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  if (variant === 'card') {
    return (
      <div className={`p-4 bg-[#0e1612]/90 border border-emerald-500/20 rounded-2xl ${className}`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Live Dispatch Telemetry</span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DISPATCH ACTIVE
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-mono">emails sent today</span>
        </div>
        <div className="mt-2 text-xs text-slate-400 truncate flex items-center gap-1.5 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{lastActivity}</span>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-[#0e1612] border border-emerald-500/30 rounded-full text-xs text-emerald-300 font-mono ${className}`}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <span className="font-bold text-white tabular-nums">{count.toLocaleString()}</span>
        <span className="text-slate-400">emails dispatched</span>
      </div>
    );
  }

  return (
    <div className={`w-full bg-[#080d0a] text-slate-300 py-2 px-4 border-b border-emerald-500/15 ${className}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-slate-400">KENYA DISPATCH:</span>
          <span className="font-bold text-emerald-400 tabular-nums">
            {count.toLocaleString()}
          </span>
          <span className="text-slate-400 hidden sm:inline">applications sent today</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px] truncate">
          <span className="text-slate-500 hidden md:inline">Last dispatch:</span>
          <span className="text-emerald-300 truncate max-w-xs">{lastActivity}</span>
        </div>
      </div>
    </div>
  );
};
