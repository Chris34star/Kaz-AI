import React from 'react';
import { MessageCircle, ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050806] border-t border-emerald-500/10 text-slate-400 py-8 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
            K
          </div>
          <span className="font-extrabold text-white text-sm">Kaz AI</span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-500">Nairobi, Kenya</span>
        </div>

        {/* Quick WhatsApp Support */}
        <a
          href="https://wa.me/254700123456?text=Hi%20Kaz%20AI%2C%20I%20have%20a%20question%20about%20my%20applications"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Support: +254 700 123 456</span>
        </a>

        {/* Security & Copyright */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Paystack · M-Pesa STK</span>
          <span>·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
