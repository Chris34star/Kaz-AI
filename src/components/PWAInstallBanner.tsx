import React, { useState } from 'react';
import { Download, Smartphone, Bell, X, Check, Share2, PlusSquare } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const handleInstallSimulate = () => {
    setIsInstalled(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-16 sm:bottom-5 right-4 sm:right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2 bg-[#0c1410]/90 hover:bg-[#121f18] text-white rounded-full shadow-lg border border-emerald-500/30 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 glow-emerald-sm"
          title="Install Kaz AI App"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Install PWA</span>
          <span className="sm:hidden">App</span>
        </button>
      </div>

      {/* Install Instruction / Permission Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0c1410] rounded-2xl shadow-2xl border border-emerald-500/30 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 text-center relative font-mono">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-xl mx-auto flex items-center justify-center text-emerald-400 font-black text-xl mb-3 glow-emerald-sm">
                K
              </div>

              <h3 className="font-black text-white text-base">Install Kaz AI</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Real-time alerts whenever a Kenyan recruiter requests your CV.
              </p>
            </div>

            <div className="px-5 pb-5 space-y-3 font-mono">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-white">
                  <Bell className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Push & WhatsApp Dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Safaricom / Airtel data friendly</span>
                </div>
              </div>

              {isInstalled ? (
                <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-emerald-500/30">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to your Home Screen!</span>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleInstallSimulate}
                    className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 glow-emerald-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install to Phone</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center">
                    Tap Share → "Add to Home Screen" on iOS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
