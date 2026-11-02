import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Check, 
  ChevronRight, 
  Radio, 
  Cpu, 
  Terminal,
  Send,
  MessageSquare
} from 'lucide-react';
import { LiveCounterStrip } from '../components/LiveCounterStrip';
import { CompanyBadge } from '../components/CompanyBadge';
import { PaystackMpesaModal } from '../components/PaystackMpesaModal';

interface LandingViewProps {
  onStartTrial: () => void;
  onExploreDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartTrial,
  onExploreDemo
}) => {
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: string; isTrial: boolean } | null>(null);

  // 6 supported roles with concise metrics
  const supportedRoles = [
    { title: 'Nurses', count: '142 live', code: 'NCK' },
    { title: 'Teachers', count: '188 live', code: 'TSC' },
    { title: 'Drivers', count: '114 live', code: 'BCE' },
    { title: 'Accountants', count: '210 live', code: 'CPA-K' },
    { title: 'Clinical Officers', count: '95 live', code: 'COC' },
    { title: 'Sales Execs', count: '320 live', code: 'FMCG' }
  ];

  const trustedCompanies = [
    'Aga Khan Hospital',
    'Naivas',
    'Java House',
    'Safaricom',
    'KNH',
    'Equity Bank',
    'Brookside',
    'G4S',
    'Bidco'
  ];

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 cyber-grid flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Live Social Proof Telemetry Strip */}
      <LiveCounterStrip initialCount={1482} />

      {/* Futuristic Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        {/* Subtle radial emerald background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Punchy, High-Impact Hero (No Walls of Text) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Status Beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AUTONOMOUS KENYAN JOB AGENT</span>
                <span className="text-emerald-700">|</span>
                <span>GMAIL INTEGRATED</span>
              </div>

              {/* Exact Hero Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                AI That Finds & Applies For Jobs For You <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">While You Sleep</span>
              </h1>

              {/* Exact Subtitle - Crisp & Punchy */}
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                We find real jobs, validate them, and send personalized applications from <strong className="text-white font-semibold">YOUR Gmail</strong>. 500+ Kenyans already getting interviews.
              </p>

              {/* 2 Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartTrial}
                  className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 active:scale-98 text-slate-950 font-bold rounded-xl text-sm font-mono flex items-center justify-center gap-2 glow-emerald transition-all"
                >
                  <span>Get Started — 1 Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreDemo}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/10 active:scale-98 text-slate-200 font-semibold rounded-xl text-sm font-mono flex items-center justify-center gap-2 border border-emerald-500/20 transition-all"
                >
                  <span>Explore Demo — No Login</span>
                </button>
              </div>

              {/* Fast Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Safe Google OAuth
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Direct Inbox Replies
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> M-Pesa STK Push
                </span>
              </div>
            </div>

            {/* Right: Futuristic Live HUD Terminal */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-2xl p-5 space-y-4 glow-emerald-sm relative overflow-hidden">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-bold">KAZ-AGENT // ACTIVE</span>
                  </div>
                  <span className="text-slate-400">5 APPS / DAY</span>
                </div>

                {/* Simulated Live Dispatch Card */}
                <div className="bg-[#0b120e] rounded-xl p-3.5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CompanyBadge company="Aga Khan Hospital" size="sm" />
                      <div>
                        <div className="text-xs font-bold text-white">Aga Khan Hospital</div>
                        <div className="text-[11px] font-mono text-slate-400">Staff Nurse · ICU Ward</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      INTERVIEW CALL
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-white/5 p-2 rounded-lg font-mono">
                    "Please attend oral interview Friday 9:00 AM..."
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span>Sent via user Gmail</span>
                    <span className="text-emerald-400 font-semibold">Status: Replied</span>
                  </div>
                </div>

                {/* Secondary Fast Telemetry */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400">AUTO-APPLY</div>
                    <div className="text-sm font-bold text-emerald-400">ENABLED</div>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400">DISPATCH CYCLE</div>
                    <div className="text-sm font-bold text-white">DAILY 08:00 EAT</div>
                  </div>
                </div>

                {/* Fast Trigger */}
                <button
                  onClick={onExploreDemo}
                  className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl font-mono text-xs font-bold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Launch Live Simulator</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Kenyan Employers Strip (Minimal, Clean) */}
      <section className="py-6 bg-[#060a08] border-y border-emerald-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              Live Scraper Connected to Kenyan Employers:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {trustedCompanies.map((company) => (
              <div
                key={company}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-slate-300 hover:border-emerald-500/30 transition-colors"
              >
                <CompanyBadge company={company} size="sm" />
                <span className="whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Roles Supported (Clean Futuristic Grid) */}
      <section id="roles-section" className="py-14 bg-[#080d0a] border-b border-emerald-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Target Roles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Optimized for Kenyan Professionals
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Scraping 30+ Kenyan portals daily
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {supportedRoles.map((role) => (
              <div
                key={role.title}
                className="glass-card p-4 rounded-xl space-y-2 hover:border-emerald-400/50 transition-all cursor-pointer group"
                onClick={onStartTrial}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {role.code}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-60 group-hover:opacity-100" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {role.title}
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  {role.count}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ 30 more roles scraped daily (Pharmacists, Customer Care, Kitchen Staff, Security, Lab Techs)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Futuristic 3-Step Flow (Zero Fluff) */}
      <section className="py-14 bg-[#070b09] border-b border-emerald-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-md mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Autonomous Pipeline
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Zero resume builder courses. Setup in 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">01 // TARGET</div>
              <h3 className="text-base font-bold text-white">Select Your Kenyan Career</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your profession & credentials (TSC, KMPDB, or BCE Driving License).
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">02 // DISPATCH</div>
              <h3 className="text-base font-bold text-white">Connect Your Gmail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kaz AI auto-generates tailored applications and sends them from your Gmail address.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">03 // INTERVIEW</div>
              <h3 className="text-base font-bold text-white">Receive Direct HR Replies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responses land directly in your Gmail and phone. Filtered for genuine interview invites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Weekly 699, Monthly 999 Most Popular, Yearly 6999) */}
      <section id="pricing-section" className="py-16 bg-[#080d0a] border-b border-emerald-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Pricing · M-Pesa & Paystack
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Simple Kenyan Pricing
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Start with 1-Day Free Trial (5 applications). Upgrade anytime via instant STK push.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Weekly */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">WEEKLY SPRINT</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono tabular-nums">KES 699</span>
                  <span className="text-xs text-slate-400 font-mono">/wk</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>5 applications / day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>1 career role</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct Gmail sending</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan({ name: 'Weekly Sprint', amount: 'KES 699', isTrial: false })}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold rounded-xl border border-white/10 transition-colors"
              >
                Pay KES 699 via M-Pesa
              </button>
            </div>

            {/* Monthly - MOST POPULAR (Glowing) */}
            <div className="glass-card p-6 rounded-2xl border-2 border-emerald-400 glow-emerald relative flex flex-col justify-between space-y-5 bg-[#0e1913]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-400 text-slate-950 font-mono font-bold text-[10px] uppercase rounded-full">
                Most Popular
              </div>
              <div className="space-y-3">
                <div className="text-xs font-mono text-emerald-400">MONTHLY PRO</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono tabular-nums">KES 999</span>
                  <span className="text-xs text-emerald-300 font-mono">/mo</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-emerald-100 pt-2 border-t border-emerald-500/20">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>10 applications / day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Up to 2 career roles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cold-emailing 100+ vetted HRs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>WhatsApp alert integration</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan({ name: 'Monthly Pro', amount: 'KES 999', isTrial: false })}
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs font-bold rounded-xl glow-emerald-sm transition-colors"
              >
                Pay KES 999 via M-Pesa STK
              </button>
            </div>

            {/* Yearly */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">YEARLY UNLIMITED</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono tabular-nums">KES 6,999</span>
                  <span className="text-xs text-slate-400 font-mono">/yr</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-300 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Unlimited daily applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>All 11+ career categories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Save 40% vs monthly</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setSelectedPlan({ name: 'Yearly Unlimited', amount: 'KES 6,999', isTrial: false })}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold rounded-xl border border-white/10 transition-colors"
              >
                Pay KES 6,999 via M-Pesa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Paystack Checkout Modal if Triggered */}
      {selectedPlan && (
        <PaystackMpesaModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => {
            setSelectedPlan(null);
            onStartTrial();
          }}
          planName={selectedPlan.name}
          amount={selectedPlan.amount}
          isTrial={selectedPlan.isTrial}
        />
      )}
    </div>
  );
};
