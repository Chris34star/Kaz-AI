import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'demo' | 'onboarding' | 'dashboard';
  onNavigate: (view: 'landing' | 'demo' | 'onboarding' | 'dashboard') => void;
  hasOnboarded?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  hasOnboarded = false
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080d0a]/85 backdrop-blur-xl border-b border-emerald-500/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        {/* Zone 1: Futuristic Brand Wordmark */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-sm tracking-widest glow-emerald-sm group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-all">
            K
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold tracking-tight text-white font-mono">
              KAZ<span className="text-emerald-400">.AI</span>
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              KENYA
            </span>
          </div>
        </button>

        {/* Zone 2: Punchy Minimal Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-slate-400">
          <button
            onClick={() => onNavigate('landing')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'landing' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              if (currentView !== 'landing') onNavigate('landing');
              setTimeout(() => {
                document.getElementById('roles-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Roles
          </button>
          <button
            onClick={() => {
              if (currentView !== 'landing') onNavigate('landing');
              setTimeout(() => {
                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('demo')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentView === 'demo' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            <span>Live Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          {hasOnboarded && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'dashboard' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('demo')}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            Demo
          </button>
          <button
            onClick={() => onNavigate(hasOnboarded ? 'dashboard' : 'onboarding')}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all glow-emerald-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>{hasOnboarded ? 'Dashboard' : 'Free Trial'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
