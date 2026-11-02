import React, { useState } from 'react';
import { UserProfile, Job, ResponseEmail, Opportunity } from '../types';
import { DEMO_JOBS, DEMO_RESPONSES, DEMO_OPPORTUNITIES } from '../data/mockKenyanData';
import { CompanyBadge } from '../components/CompanyBadge';
import { EmailDetailModal } from '../components/EmailDetailModal';
import { PaystackMpesaModal } from '../components/PaystackMpesaModal';
import { 
  Send, 
  Check, 
  CheckCircle2, 
  Eye, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Filter, 
  ArrowRight, 
  CheckCheck,
  Search,
  RefreshCw,
  Radio,
  Clock
} from 'lucide-react';

interface DashboardViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateToDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigateToDemo
}) => {
  const [autoApplyActive, setAutoApplyActive] = useState<boolean>(userProfile.autoApplyActive);
  const [activeTab, setActiveTab] = useState<'applied' | 'responses' | 'opportunities'>('applied');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Real dynamic jobs list tailored for user
  const [userJobs, setUserJobs] = useState<Job[]>(() => {
    const matched = DEMO_JOBS.filter(j => userProfile.careers.includes(j.category));
    return matched.length > 0 ? matched : DEMO_JOBS.slice(0, 10);
  });

  const [responses, setResponses] = useState<ResponseEmail[]>(() => {
    const matched = DEMO_RESPONSES.filter(r => 
      userProfile.careers.some(c => r.role.toLowerCase().includes(c.toLowerCase()))
    );
    return matched.length > 0 ? matched : DEMO_RESPONSES.slice(0, 4);
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const matched = DEMO_OPPORTUNITIES.filter(o => 
      userProfile.careers.some(c => o.role.toLowerCase().includes(c.toLowerCase()))
    );
    return matched.length > 0 ? matched : DEMO_OPPORTUNITIES.slice(0, 3);
  });

  const [selectedEmail, setSelectedEmail] = useState<ResponseEmail | null>(null);
  const [responseFilter, setResponseFilter] = useState<'all' | 'interview' | 'send_cv'>('all');
  const [sendingJobId, setSendingJobId] = useState<string | null>(null);
  const [justSentJobId, setJustSentJobId] = useState<string | null>(null);
  const [applicationsSentCount, setApplicationsSentCount] = useState<number>(userProfile.applicationsToday || 3);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  const primaryRole = userProfile.careers[0] || 'Professional';

  // Toggle Auto-apply
  const handleToggleAutoApply = () => {
    const newState = !autoApplyActive;
    setAutoApplyActive(newState);
    onUpdateProfile({ autoApplyActive: newState });
  };

  // Manual send action with tick animation
  const handleManualSend = (jobId: string) => {
    if (applicationsSentCount >= userProfile.maxDailyApplications) {
      setShowUpgradeModal(true);
      return;
    }

    setSendingJobId(jobId);
    setTimeout(() => {
      setUserJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: 'Sent' as const } : j))
      );
      setSendingJobId(null);
      setJustSentJobId(jobId);
      setApplicationsSentCount((prev) => prev + 1);

      setTimeout(() => {
        setJustSentJobId(null);
      }, 2500);
    }, 700);
  };

  // Instant Search Refresh
  const handleRunSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1800);
  };

  const filteredResponses = responses.filter((r) => {
    if (responseFilter === 'all') return true;
    return r.category === responseFilter;
  });

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 cyber-grid pb-24">
      
      {/* TOP STICKY BAR: Auto Apply ON/OFF switch + Status */}
      <div className="sticky top-15 z-20 bg-[#0b130e]/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Auto Apply ON/OFF Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-300">Auto-Apply</span>
              <button
                type="button"
                role="switch"
                aria-checked={autoApplyActive}
                onClick={handleToggleAutoApply}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-emerald-500/30 transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  autoApplyActive ? 'bg-emerald-500 glow-emerald-sm' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    autoApplyActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="h-4 w-px bg-emerald-500/20 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${autoApplyActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-emerald-300 font-medium truncate">
                {autoApplyActive ? (
                  <>
                    <span>Auto: 5 apps/day from Gmail</span>
                    <span className="text-emerald-400 ml-1.5 font-bold">· Next batch in 5h 23m</span>
                  </>
                ) : (
                  <span>Manual Mode: Review and click Send on each vacancy</span>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden md:inline">
              {userProfile.googleEmail}
            </span>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold rounded-lg text-xs transition-colors glow-emerald-sm"
            >
              Upgrade (M-Pesa)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* Continuously Active Background Scraper HUD */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 animate-pulse text-emerald-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Active Scraper & Cold-Email Agent
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SCANNING
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  We are searching 30+ sites for <strong className="text-emerald-400">{primaryRole}</strong> jobs, check after 24hrs. We also cold-email 100+ companies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shrink-0 self-end sm:self-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Background daemon running</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setActiveTab('applied')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'applied'
                ? 'bg-[#0f1c15] border-emerald-400 glow-emerald-sm'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 mb-1">
              <span>DISPATCHED TODAY</span>
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {applicationsSentCount}
              </span>
              <span className="text-xs font-mono text-slate-400">/ {userProfile.maxDailyApplications} trial limit</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('responses')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'responses'
                ? 'bg-[#0f1c15] border-emerald-400 glow-emerald-sm'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 mb-1">
              <span>RESPONSES</span>
              <MessageSquare className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {responses.length}
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              Direct recruiter replies
            </p>
          </div>

          <div
            onClick={() => setActiveTab('opportunities')}
            className={`p-4 sm:p-5 rounded-2xl border relative overflow-hidden transition-all cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-gradient-to-br from-emerald-600 to-emerald-900 border-emerald-300 glow-emerald'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 mb-1">
              <span>OPPORTUNITIES</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {opportunities.length}
            </div>
            <p className="text-[11px] font-mono text-emerald-300 mt-1">
              Interview invites & CV requests ⭐
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl max-w-md">
          <button
            onClick={() => setActiveTab('applied')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === 'applied'
                ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jobs ({userJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('responses')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === 'responses'
                ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Responses ({responses.length})
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === 'opportunities'
                ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Opportunities ({opportunities.length}) ⭐
          </button>
        </div>

        {/* TAB 1: Real Jobs Applied */}
        {activeTab === 'applied' && (
          <div className="space-y-3">
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
              {userJobs.map((job) => {
                const isDraft = job.status === 'Draft';
                const isSending = sendingJobId === job.id;
                const isJustSent = justSentJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <CompanyBadge company={job.company} size="md" />
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-white text-sm">{job.role}</h3>
                          <span className="text-xs text-slate-500 font-mono">·</span>
                          <span className="text-xs font-semibold text-emerald-400 font-mono">{job.company}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {job.location}
                          </span>
                          <span>·</span>
                          <span className="text-slate-300 font-semibold">{job.salaryRange}</span>
                          <span>·</span>
                          <span>{job.postedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Action */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      {job.status === 'Replied' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>Replied</span>
                        </span>
                      )}

                      {job.status === 'Viewed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          <Eye className="w-3 h-3 text-blue-400" />
                          <span>Viewed</span>
                        </span>
                      )}

                      {job.status === 'Sent' && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                          isJustSent ? 'bg-emerald-400 text-slate-950 font-bold animate-bounce' : 'bg-white/10 text-slate-300'
                        }`}>
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>{isJustSent ? 'Sent to HR!' : 'Sent'}</span>
                        </span>
                      )}

                      {job.status === 'Not Replied' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Not Replied</span>
                        </span>
                      )}

                      {(isDraft || job.status === 'Not Replied') && (
                        <button
                          disabled={isSending}
                          onClick={() => handleManualSend(job.id)}
                          className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-all glow-emerald-sm"
                        >
                          {isSending ? (
                            <>
                              <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Send</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Responses */}
        {activeTab === 'responses' && (
          <div className="space-y-3">
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
              {filteredResponses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEmail(item)}
                  className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <CompanyBadge company={item.company} size="md" />
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                          {item.company}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {item.badgeLabel}
                        </span>
                        <span className="text-xs font-mono text-slate-500">· {item.timeAgo}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    <button className="px-3 py-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/30 transition-colors flex items-center gap-1">
                      <span>View Thread</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Opportunities */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="glass-card p-5 rounded-2xl border hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CompanyBadge company={opp.company} size="md" />
                        <div>
                          <h4 className="font-extrabold text-white text-base">{opp.company}</h4>
                          <p className="text-xs font-semibold text-emerald-400 font-mono">{opp.role}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                        opp.type === 'Interview'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {opp.type}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-bold text-white">{opp.scheduledDate} at {opp.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-bold text-emerald-300">{opp.salary}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      <strong className="text-white">Action:</strong> {opp.keyNotes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-slate-500">Contact: {opp.contactPerson}</span>
                    <button
                      onClick={() => alert(`Kaz AI interview confirmation dispatched to ${opp.company} HR!`)}
                      className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg text-xs font-mono font-bold transition-colors"
                    >
                      Confirm Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Email Thread Modal */}
      {selectedEmail && (
        <EmailDetailModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
          onConfirmOpportunity={() => {
            setActiveTab('opportunities');
          }}
        />
      )}

      {/* Upgrade M-Pesa Modal */}
      {showUpgradeModal && (
        <PaystackMpesaModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onSuccess={() => {
            onUpdateProfile({ maxDailyApplications: 15 });
            setShowUpgradeModal(false);
          }}
          planName="Monthly Pro"
          amount="KES 999"
          initialPhone={userProfile.whatsappNumber}
          isTrial={false}
        />
      )}
    </div>
  );
};
