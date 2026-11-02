import React, { useState } from 'react';
import { Job, ResponseEmail, Opportunity } from '../types';
import { DEMO_JOBS, DEMO_RESPONSES, DEMO_OPPORTUNITIES } from '../data/mockKenyanData';
import { CompanyBadge } from '../components/CompanyBadge';
import { EmailDetailModal } from '../components/EmailDetailModal';
import { LiveCounterStrip } from '../components/LiveCounterStrip';
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
  Clock, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  CheckCheck,
  AlertCircle,
  Search
} from 'lucide-react';

interface DemoViewProps {
  onStartTrial: () => void;
}

export const DemoView: React.FC<DemoViewProps> = ({ onStartTrial }) => {
  const [autoApplyActive, setAutoApplyActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'applied' | 'responses' | 'opportunities'>('applied');
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS);
  const [selectedEmail, setSelectedEmail] = useState<ResponseEmail | null>(null);
  const [responseFilter, setResponseFilter] = useState<'all' | 'interview' | 'send_cv'>('all');
  const [sendingJobId, setSendingJobId] = useState<string | null>(null);
  const [justSentJobId, setJustSentJobId] = useState<string | null>(null);
  const [appliedCount, setAppliedCount] = useState(500);
  const [jobStatusFilter, setJobStatusFilter] = useState<'all' | 'not_replied' | 'replied' | 'viewed'>('all');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobCategoryFilter, setJobCategoryFilter] = useState<string>('all');
  const [visibleJobCount, setVisibleJobCount] = useState<number>(20);

  // Trigger one-by-one send animation
  const handleSendJob = (jobId: string) => {
    setSendingJobId(jobId);
    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: 'Sent' as const } : j))
      );
      setSendingJobId(null);
      setJustSentJobId(jobId);
      setAppliedCount((prev) => prev + 1);

      setTimeout(() => {
        setJustSentJobId(null);
      }, 2500);
    }, 600);
  };

  const notRepliedCount = jobs.filter((j) => j.status === 'Not Replied' || j.status === 'Draft').length;
  const repliedCount = jobs.filter((j) => j.status === 'Replied').length;
  const viewedCount = jobs.filter((j) => j.status === 'Viewed').length;

  const filteredJobs = jobs.filter((j) => {
    if (jobStatusFilter === 'not_replied') {
      if (j.status !== 'Not Replied' && j.status !== 'Draft') return false;
    } else if (jobStatusFilter === 'replied') {
      if (j.status !== 'Replied') return false;
    } else if (jobStatusFilter === 'viewed') {
      if (j.status !== 'Viewed') return false;
    }

    if (jobCategoryFilter !== 'all' && j.category !== jobCategoryFilter) {
      return false;
    }

    if (jobSearchQuery.trim()) {
      const q = jobSearchQuery.toLowerCase();
      const matchRole = j.role.toLowerCase().includes(q);
      const matchCompany = j.company.toLowerCase().includes(q);
      const matchLoc = j.location.toLowerCase().includes(q);
      if (!matchRole && !matchCompany && !matchLoc) return false;
    }

    return true;
  });

  const filteredResponses = DEMO_RESPONSES.filter((r) => {
    if (responseFilter === 'all') return true;
    return r.category === responseFilter;
  });

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 cyber-grid pb-24">
      {/* ALWAYS VISIBLE TOP STICKY BAR: Auto-Apply ON/OFF Switch */}
      <div className="sticky top-15 z-20 bg-[#0b130e]/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Custom Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-300">Auto-Apply</span>
              <button
                type="button"
                role="switch"
                aria-checked={autoApplyActive}
                onClick={() => setAutoApplyActive(!autoApplyActive)}
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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-medium truncate">
                {autoApplyActive
                  ? 'Auto: Sending 5 applications/day from your Gmail'
                  : 'Manual: Review & send each application'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex text-[11px] font-mono text-slate-400">
              [Fixed Kenya Data]
            </span>
            <button
              onClick={onStartTrial}
              className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold rounded-lg text-xs transition-colors glow-emerald-sm"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Banner with Animated Counter */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CANDIDATE DEMO SIMULATOR // NO LOGIN</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Live Workspace Preview
            </h1>
            <p className="text-xs font-mono text-slate-400 max-w-lg">
              Auto-dispatches tailored applications from your Gmail and captures real recruiter replies.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
            <LiveCounterStrip variant="inline" initialCount={1482} />
            <button
              onClick={onStartTrial}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold font-mono rounded-xl text-xs flex items-center justify-center gap-1.5 glow-emerald-sm transition-all"
            >
              <span>Want this for your Gmail? Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Stats Cards: Jobs Applied: 500, Responses: 170, Opportunities: 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1 */}
          <div
            onClick={() => setActiveTab('applied')}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'applied'
                ? 'bg-[#0f1c15] border-emerald-400 glow-emerald-sm'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-400 mb-1">
              <span>JOBS APPLIED</span>
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {appliedCount}
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              Dispatched via connected Gmail
            </p>
          </div>

          {/* Card 2 */}
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
              170
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              34% reply rate from vetted Kenyan HRs
            </p>
          </div>

          {/* Card 3 - Opportunities (Money View) */}
          <div
            onClick={() => setActiveTab('opportunities')}
            className={`p-4 sm:p-5 rounded-2xl border relative overflow-hidden transition-all cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-gradient-to-br from-emerald-600 to-emerald-900 border-emerald-300 glow-emerald'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300 mb-1">
              <span>OPPORTUNITIES (INTERVIEWS)</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              13
            </div>
            <p className="text-[11px] font-mono text-emerald-300 mt-1">
              Called for interview or requested CV ⭐
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
            Jobs Applied ({appliedCount})
          </button>
          <button
            onClick={() => setActiveTab('responses')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === 'responses'
                ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Responses (170)
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all ${
              activeTab === 'opportunities'
                ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Opportunities (13) ⭐
          </button>
        </div>

        {/* TAB 1: JOBS APPLIED (500 JOBS WITH NOT REPLIED / REPLIED / VIEWED) */}
        {activeTab === 'applied' && (
          <div className="space-y-3">
            {/* Filter Bar & Search */}
            <div className="glass-card rounded-2xl p-3.5 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                {/* Status Sub-Filters */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => {
                      setJobStatusFilter('all');
                      setVisibleJobCount(20);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      jobStatusFilter === 'all'
                        ? 'bg-emerald-400 text-slate-950 glow-emerald-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({appliedCount})
                  </button>
                  <button
                    onClick={() => {
                      setJobStatusFilter('not_replied');
                      setVisibleJobCount(20);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      jobStatusFilter === 'not_replied'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
                    }`}
                  >
                    <span>Not Replied</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                      {notRepliedCount}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setJobStatusFilter('replied');
                      setVisibleJobCount(20);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      jobStatusFilter === 'replied'
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20'
                    }`}
                  >
                    <span>Replied</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                      {repliedCount}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setJobStatusFilter('viewed');
                      setVisibleJobCount(20);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      jobStatusFilter === 'viewed'
                        ? 'bg-blue-400 text-slate-950 font-bold'
                        : 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border border-blue-500/20'
                    }`}
                  >
                    <span>Viewed</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40">
                      {viewedCount}
                    </span>
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={jobSearchQuery}
                    onChange={(e) => {
                      setJobSearchQuery(e.target.value);
                      setVisibleJobCount(20);
                    }}
                    placeholder="Search role, Kenyan employer..."
                    className="w-full pl-8 pr-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Status Explanation Strip */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                <span>
                  Showing {Math.min(visibleJobCount, filteredJobs.length)} of {filteredJobs.length} applications (Total: {appliedCount} dispatched from Gmail · 170 Replied · 330 Awaiting Reply)
                </span>
                <span className="text-emerald-400 hidden md:inline">
                  Click "Send" or "Follow-up" to test real-time 1-by-1 tick
                </span>
              </div>
            </div>

            {/* Jobs List */}
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-white/5">
              {filteredJobs.slice(0, visibleJobCount).map((job) => {
                const isDraft = job.status === 'Draft';
                const isNotReplied = job.status === 'Not Replied';
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
                          <span>·</span>
                          <span className="text-slate-500">{job.source}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill & Action */}
                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                      {job.status === 'Replied' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>Replied</span>
                        </span>
                      )}

                      {job.status === 'Viewed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          <Eye className="w-3 h-3 text-blue-400" />
                          <span>Viewed by HR</span>
                        </span>
                      )}

                      {isNotReplied && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Not Replied</span>
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

                      {/* Interactive Send / Follow-up button to test tick animation */}
                      {(isDraft || isNotReplied) && (
                        <button
                          disabled={isSending}
                          onClick={() => handleSendJob(job.id)}
                          className="px-3 py-1 bg-emerald-400/90 hover:bg-emerald-300 active:scale-95 text-slate-950 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-all glow-emerald-sm"
                          title="Test 1-by-1 email dispatch animation"
                        >
                          {isSending ? (
                            <>
                              <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>{isDraft ? 'Send' : 'Follow-up'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredJobs.length === 0 && (
                <div className="p-8 text-center text-slate-400 font-mono text-xs">
                  No jobs found matching "{jobSearchQuery}". Try clearing search filter.
                </div>
              )}
            </div>

            {/* Pagination / Load More */}
            {visibleJobCount < filteredJobs.length && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setVisibleJobCount((prev) => Math.min(prev + 25, filteredJobs.length))}
                  className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold transition-colors"
                >
                  Load 25 More Jobs ({visibleJobCount} of {filteredJobs.length} shown)
                </button>
                <button
                  onClick={() => setVisibleJobCount(filteredJobs.length)}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-mono font-bold transition-colors"
                >
                  Show All {filteredJobs.length} Jobs
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESPONSES */}
        {activeTab === 'responses' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 glass-card rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Filter className="w-4 h-4 text-slate-500 mr-1" />
                <button
                  onClick={() => setResponseFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    responseFilter === 'all'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  All ({DEMO_RESPONSES.length})
                </button>
                <button
                  onClick={() => setResponseFilter('interview')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    responseFilter === 'interview'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  Interviews (3)
                </button>
                <button
                  onClick={() => setResponseFilter('send_cv')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    responseFilter === 'send_cv'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  CV Requests (2)
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Actionable HR replies only
              </div>
            </div>

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

        {/* TAB 3: OPPORTUNITIES (THE MONEY VIEW) */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#0e1b14] border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>The Money View</span>
                </div>
                <h3 className="text-base font-bold text-white">13 High-Intent Employer Opportunities</h3>
                <p className="text-xs font-mono text-slate-400">
                  Scheduled interviews & direct credential requests.
                </p>
              </div>

              <button
                onClick={onStartTrial}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold text-xs rounded-xl transition-colors glow-emerald-sm shrink-0"
              >
                Get These for Your Gmail
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEMO_OPPORTUNITIES.map((opp) => (
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
                        <span className="text-slate-500">({opp.meetingType})</span>
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
                      onClick={onStartTrial}
                      className="px-3.5 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg text-xs font-mono font-bold transition-colors"
                    >
                      Confirm with Kaz AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Big Bottom Trial Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl text-center space-y-3 glow-emerald-sm border border-emerald-500/25">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Want this running on your Gmail?
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto">
            5 verified applications dispatched every morning while you sleep.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartTrial}
              className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold font-mono rounded-xl text-sm inline-flex items-center gap-2 glow-emerald transition-all"
            >
              <span>Start Free Trial — No Risk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Email Thread Preview Modal */}
      {selectedEmail && (
        <EmailDetailModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
          onConfirmOpportunity={() => {
            setActiveTab('opportunities');
          }}
        />
      )}
    </div>
  );
};
