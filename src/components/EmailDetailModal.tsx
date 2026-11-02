import React, { useState } from 'react';
import { ResponseEmail } from '../types';
import { X, Send, User, Building, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { CompanyBadge } from './CompanyBadge';

interface EmailDetailModalProps {
  email: ResponseEmail | null;
  onClose: () => void;
  onConfirmOpportunity?: (email: ResponseEmail) => void;
}

export const EmailDetailModal: React.FC<EmailDetailModalProps> = ({
  email,
  onClose,
  onConfirmOpportunity
}) => {
  const [replyText, setReplyText] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!email) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setReplyText('');
      if (onConfirmOpportunity) {
        onConfirmOpportunity(email);
      }
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#0c1410] rounded-2xl shadow-2xl border border-emerald-500/25 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-500/15 flex items-start justify-between gap-4 bg-black/40">
          <div className="flex items-center gap-3">
            <CompanyBadge company={email.company} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{email.company}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {email.badgeLabel}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{email.role} · Received {email.timeAgo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thread Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-sm flex-1 font-mono">
          <div className="pb-3 border-b border-white/5">
            <h4 className="font-bold text-white text-sm">{email.subject}</h4>
            <div className="text-xs text-slate-400 mt-1">
              <span>From: <strong className="text-emerald-400">{email.fromName}</strong> &lt;{email.fromEmail}&gt;</span>
            </div>
          </div>

          {email.fullThread.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                msg.sender === 'user'
                  ? 'bg-white/5 border-white/10 ml-4 sm:ml-8'
                  : 'bg-emerald-950/30 border-emerald-500/20 mr-4 sm:mr-8'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  {msg.sender === 'user' ? (
                    <>
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Sent from your Gmail account
                    </>
                  ) : (
                    <>
                      <Building className="w-3.5 h-3.5 text-emerald-400" />
                      {msg.senderName}
                    </>
                  )}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-slate-200 whitespace-pre-line leading-relaxed text-xs">
                {msg.body}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Reply / Action Section */}
        <div className="p-4 bg-black/40 border-t border-emerald-500/15">
          {isSent ? (
            <div className="flex items-center justify-center gap-2 py-3 text-emerald-400 font-mono font-bold text-xs">
              <CheckCircle className="w-4 h-4" />
              Reply dispatched directly via your connected Gmail!
            </div>
          ) : (
            <form onSubmit={handleSendReply} className="space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Quick Reply from your Gmail:</span>
                <span className="text-emerald-400 font-semibold">{email.company} Recruiter</span>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Type reply or note... e.g. "Dear ${email.fromName}, I confirm attendance tomorrow with all requested credentials."`}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-emerald-500/20 focus:border-emerald-400 bg-black/60 text-white focus:outline-hidden"
              />
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setReplyText(`Dear ${email.fromName}, thank you. I confirm I will attend the session and have attached my latest credentials.`)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline text-left"
                >
                  Insert Confirmation Template
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 glow-emerald-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send from Gmail
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
