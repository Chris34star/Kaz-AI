import React, { useState } from 'react';
import { Check, ShieldCheck, Smartphone, ArrowRight, Loader2, X } from 'lucide-react';

interface PaystackMpesaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planName?: string;
  amount?: string;
  initialPhone?: string;
  isTrial?: boolean;
}

export const PaystackMpesaModal: React.FC<PaystackMpesaModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  planName = '1-Day Free Trial',
  amount = 'KES 0',
  initialPhone = '0712345678',
  isTrial = true
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [stkStatus, setStkStatus] = useState<'idle' | 'pushing' | 'prompted' | 'success'>('idle');
  const [pinInput, setPinInput] = useState('');

  if (!isOpen) return null;

  const handleInitiateSTK = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setStkStatus('pushing');

    // Simulate STK push trigger
    setTimeout(() => {
      setStkStatus('prompted');
    }, 1500);
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    setStkStatus('pushing');
    setTimeout(() => {
      setStkStatus('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStkStatus('idle');
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0c1410] rounded-2xl shadow-2xl border border-emerald-500/25 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black/50 border-b border-emerald-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center font-bold font-mono text-xs text-emerald-400 border border-emerald-500/30">
              M-PESA
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight text-white font-mono flex items-center gap-1.5">
                Paystack + M-Pesa Gateway
              </h3>
              <p className="text-[11px] font-mono text-emerald-400">Safaricom Instant STK Prompt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 font-mono">
          {stkStatus === 'idle' && (
            <form onSubmit={handleInitiateSTK} className="space-y-4">
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Selected Plan</span>
                  <div className="text-sm font-bold text-white">{planName}</div>
                  <span className="text-[10px] text-emerald-400">Auto-Apply Activated</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400">Amount</span>
                  <div className="text-lg font-black text-emerald-400 tabular-nums">{amount}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Safaricom M-Pesa Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-emerald-400">
                    🇰🇪 +254
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber.replace(/^\+?254/, '').replace(/^0/, '')}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="712 345 678"
                    className="w-full pl-20 pr-4 py-2 text-sm bg-black/60 border border-emerald-500/30 rounded-xl text-white font-mono focus:border-emerald-400 focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  STK push arrives directly to your SIM.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero unauthorized charges. Verified via Central Bank of Kenya.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 glow-emerald-sm transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Send M-Pesa STK Push to Phone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {stkStatus === 'pushing' && (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <h4 className="font-bold text-white text-sm">Dispatched STK Push to Safaricom...</h4>
              <p className="text-xs text-slate-400">
                Pinging handset at +254 {phoneNumber.replace(/^\+?254/, '').replace(/^0/, '')}.
              </p>
            </div>
          )}

          {stkStatus === 'prompted' && (
            <div className="space-y-4">
              <div className="p-4 bg-black rounded-xl border border-emerald-500/30 shadow-inner space-y-3 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-white/10">
                  <span className="font-bold text-emerald-400">SAFARICOM M-PESA STK PUSH</span>
                  <span className="text-slate-400">Sent to Handset</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-white font-bold">
                    Prompt sent to +254 {phoneNumber.replace(/^\+?254/, '').replace(/^0/, '')}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Please check your phone screen and enter your 4-digit M-Pesa PIN to authorize payment of <span className="font-bold text-emerald-400">{amount}</span> to <span className="text-white font-bold">Kaz AI Technologies</span>.
                  </p>
                </div>

                <form onSubmit={handleConfirmPin} className="pt-2 space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] text-slate-400">
                      Enter PIN or Confirm Authorization:
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      autoFocus
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="••••"
                      className="w-full bg-slate-900 border border-slate-700 text-center text-lg tracking-widest text-white py-2 rounded-lg focus:border-emerald-400 focus:outline-hidden font-mono"
                    />
                  </div>

                  <div className="flex gap-2 font-sans">
                    <button
                      type="button"
                      onClick={() => setStkStatus('idle')}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                    >
                      Resend to Phone
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs glow-emerald-sm cursor-pointer"
                    >
                      Authorize Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {stkStatus === 'success' && (
            <div className="py-6 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h4 className="font-bold text-white text-base">Payment Authorized!</h4>
              <p className="text-xs text-slate-400">
                Ref: QA8921NX83 · Instant Activation
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
            <span>Powered by Paystack</span>
            <span className="text-emerald-400">CBK Regulated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
